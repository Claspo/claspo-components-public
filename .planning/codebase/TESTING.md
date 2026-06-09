# Testing Patterns

**Analysis Date:** 2026-06-03

## Test Framework

**Runner:**
- Jest `^29.7.0`
- Config: `jest.config.js`

**Environment:**
- `jest-environment-jsdom` (`^30.0.0-beta.3`) — DOM APIs, `customElements`, `KeyboardEvent`

**Transform:**
- `babel-jest` with `babel.config.js` (`@babel/preset-env`, `targets.node: 'current'`)
- Transforms `.js` / `.jsx`; `transformIgnorePatterns` allow transpiling `@claspo/*` in `node_modules`

**Assertion library:**
- Jest built-in `expect` only (no Chai/Jasmine)

**Run commands:**
```bash
npm test                              # all tests, --no-cache
npm test -- path/to/file.spec.js      # single file
npm run bundle                        # npm i && npm test && npm run build (CI-like gate before publish)
```

**Coverage:**
- Not configured in `jest.config.js` — no coverage thresholds or `collectCoverage` in repo
- View coverage: add temporarily to `jest.config.js` or run `npx jest --coverage` locally

## Test File Organization

**Location:**
- Co-located with source under `src/Sys[Name]Component/*.spec.js`
- Shared helpers: `tests/utils.js` (only `createMockProps` / `createMockEmitter` today)

**Naming:**
- `*.spec.js` suffix (16 files in repo)
- Descriptive prefix matching module: `componentTemplate.spec.js`, `SysDateComponent.spec.js`, `PhoneInputMenu.spec.js`

**Structure:**
```
claspo-components/
├── jest.config.js
├── babel.config.js
├── tests/
│   └── utils.js                 # shared mocks for full component mount
└── src/
    └── Sys[Name]Component/
        ├── Sys[Name]Component.js
        ├── componentTemplate.js
        ├── componentTemplate.spec.js   # a11y markup tests
        └── Sys[Name]Component.spec.js    # behavior tests (where present)
```

## Test Structure

**Suite organization:**
```javascript
import Target from './Target';

describe('SysExampleComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new Target();
    // stub getProps, getElement, DOM parent
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('describes expected behavior', () => {
    expect(...).toBe(...);
  });
});
```

**Patterns in use:**
- **Template/a11y suites:** parse HTML with `document.createElement('div')` + `innerHTML`, assert `role`, `aria-*`, `aria-labelledby` (`src/SysCheckboxListComponent/componentTemplate.spec.js`, `src/SysInputComponent/SysInputComponentTemplate.spec.js`)
- **Prototype/unit slices:** call `SysDateComponent.prototype.method.call(componentLike, ...)` without full mount (`src/SysDateComponent/SysDateComponent.spec.js`)
- **Class behavior with mocks:** `new SysDropdownInputComponent()`, stub `getProps`/`getElement`/`registeredControl` (`src/SysDropdownInputComponent/SysDropdownInputComponent.spec.js`)
- **Pure logic:** import utility class, no DOM (`src/SysInputComponent/EmailSuggesting.spec.js`)
- **Full custom element:** `customElements.define` + `new Component()` + append to `document.body` (`src/SysSliderComponent/SysSliderComponent.spec.js`)
- **GIVEN/WHEN/THEN** comments in slider tests for multi-step behavior

**Setup / teardown:**
- `beforeEach` / `afterEach` for DOM cleanup (`document.body.innerHTML = ''`)
- `beforeAll` / `afterAll` for global listeners (slider `cl-props-request`)
- `jest.useFakeTimers()` / `jest.useRealTimers()` for intervals (date, slider)
- `jest.clearAllMocks()`, `jest.clearAllTimers()` in `afterEach` where mocks/timers used

**Assertion style:**
- `expect(x).toBe(y)`, `.toEqual()`, `.toHaveBeenCalledWith()`, `.not.toHaveBeenCalled()`
- DOM: `querySelector`, `getAttribute`, `classList.contains`, `document.activeElement`

## Mocking

**Framework:** `jest.mock()` at top of file (hoisted)

**Patterns:**
```javascript
jest.mock('@claspo/renderer/sdk/HtmlStyleUtils', () => ({
  applyInputLabelStyles: jest.fn(),
  getStylesFromElement: jest.fn(() => ({ height: '40px' })),
  setStylesToElement: jest.fn((el, styles) => Object.assign(el.style, styles)),
}));

jest.mock('@claspo/renderer/sdk/WcElement', () => ({
  __esModule: true,
  default: class MockWcElement {
    constructor() {
      this.rootElement = document.createElement('div');
    }
    getRootElement() { return this.rootElement; }
  },
}));
```

**Partial component stubbing (preferred for large components):**
```javascript
component.getProps = jest.fn(() => ({ control: { options: { ... } } }));
component.getElement = jest.fn((name) => name === 'input' ? inputElement : null);
component.createOverlay = jest.fn();
```

**Shared props mock (`tests/utils.js`):**
```javascript
import { createMockProps } from '../../tests/utils';

window.addEventListener('cl-props-request', (event) => {
  event.detail.props = createMockProps({ content: { slideIndex: 0 } });
});
```
- Builds `model`, `services` (form, context, eventEmitter, config, mergeTagsProcessorFactory)
- Override via `createMockProps({ content: { ... } })`

**DOM polyfills in tests:**
- `HTMLElement.prototype.scrollIntoView = jest.fn()` when code calls it (`PhoneInputMenu.spec.js`)

**What to mock:**
- `@claspo/renderer` heavy utilities (`HtmlStyleUtils`, `TranslationUtils`, `WaitForKeyboardHide`)
- Parent `WcElement` when testing social/link builders in isolation
- Network/config: `getConfig: () => 'http://localhost:9590/bundled-components/'` for asset URLs

**What NOT to mock:**
- Template HTML under test (real `componentTemplate` import)
- Keyboard/focus behavior when that is the subject — use real `KeyboardEvent` and `document.activeElement`
- Validators’ string logic (`EmailSuggesting`) — test real implementation

## Fixtures and Factories

**Test data:**
- Inline objects in `it()` blocks
- Country/option lists defined in spec (`PhoneInputMenu.spec.js`)
- Story-style vectors in `EmailSuggesting.spec.js` (typo domains → expected suggestion)

**Location:**
- `tests/utils.js` — only shared factory today
- No `__fixtures__` directory; add component-local constants at top of spec if reused

## Coverage

**Requirements:** None enforced in CI or `package.json`

**Gate before publish:**
- `npm run bundle` runs `npm test` then `npm run build`
- GitHub workflow `.github/workflows/sync-to-public.yml` syncs on version bump — does not run tests in workflow file; local `bundle` is the quality gate before `npm run package`

## Test Types

**Unit tests:**
- Pure functions/classes: `EmailSuggesting.suggestEmailSync`
- Single methods via `prototype.call`

**Component/DOM tests (primary style):**
- Accessibility contracts on static templates
- Keyboard navigation, ARIA roles, overlay open/close
- Slider navigation, RTL, fake timers

**Integration tests:**
- Not present as separate suite; closest is `SysSliderComponent.spec.js` with `cl-props-request` + mounted custom element

**E2E tests:**
- Not used in this repository (Playwright lives in `esputnik-forms-frontend/in-app`)

## Common Patterns

**Async testing:**
- Most tests synchronous
- Fake timers: `jest.advanceTimersByTime(ms)` after setup (`SysSliderComponent.spec.js`)

**Custom elements:**
```javascript
if (!customElements.get('sys-dropdown-input')) {
  customElements.define('sys-dropdown-input', SysDropdownInputComponent);
}
```
Register once per file before tests that need upgraded element behavior.

**@testing-library/dom:**
- Used in `src/SysSliderComponent/SysSliderComponent.spec.js` (`fireEvent.keyDown`)
- Transitive dependency via lockfile — not listed in `package.json` devDependencies; prefer native `dispatchEvent` / `KeyboardEvent` for new tests unless adding `@testing-library/dom` explicitly to `devDependencies`

**Error testing:**
- Validators: assert return object shape, not exceptions
- Event `defaultPrevented` for keyboard handlers

## Components with tests (2026-06-03)

| Component | Spec files |
|-----------|------------|
| `SysCheckboxListComponent` | `componentTemplate.spec.js` |
| `SysChoiceButtonsComponent` | `componentTemplate.spec.js` |
| `SysConsentComponent` | `SysConsentComponentTemplate.spec.js` |
| `SysCalendarComponent` | `getTemplate.spec.js` |
| `SysDateComponent` | `SysDateComponent.spec.js`, `getTemplate.spec.js` |
| `SysDropdownInputComponent` | `SysDropdownInputComponent.spec.js`, `componentTemplate.spec.js` |
| `SysInputComponent` | `EmailSuggesting.spec.js`, `SysInputComponentTemplate.spec.js` |
| `SysPhoneInputComponent` | `PhoneInputMenu.spec.js`, `getTemplate.spec.js` |
| `SysRadioGroupComponent` | `componentTemplate.spec.js` |
| `SysSliderComponent` | `SysSliderComponent.spec.js` |
| `SysSocialComponent` | `SysSocialComponent.spec.js` |
| `SysTextAreaComponent` | `SysTextAreaComponentTemplate.spec.js` |

**23 component folders; 16 spec files** — no tests yet for: `SysButtonComponent`, `SysColumnComponent`, `SysColumnsComponent`, `SysContainerComponent`, `SysCountdownTimerComponent`, `SysImageComponent`, `SysInAppColumnsComponent`, `SysPromoCodeComponent`, `SysSlideComponent`, `SysTextComponent`, `SysVideoComponent`, and others without a row above.

## Where to add new tests

**New form/control component:**
- `componentTemplate.spec.js` — ARIA, labels, roles on exported template
- `Sys[Name]Component.spec.js` — keyboard/overlay/control integration with targeted `jest.mock` of renderer utils

**New utility module:**
- Co-located `ModuleName.spec.js` next to `ModuleName.js`

**New validator:**
- Spec file beside validator or under `validators/*.spec.js` with table-driven `it` cases

**Reusable mount helpers:**
- Extend `tests/utils.js` only when second spec needs the same `createMockProps` shape

---

*Testing analysis: 2026-06-03*
