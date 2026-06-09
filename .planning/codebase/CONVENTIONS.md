# Coding Conventions

**Analysis Date:** 2026-06-03

## Naming Patterns

**Directories:**
- One folder per component: `src/Sys[Name]Component/` (e.g. `src/SysButtonComponent/`)
- Supporting modules live beside the main class: `componentTemplate.js`, `getStyleElement.js`, `validators/`

**Files:**
- Main class: `Sys[Name]Component.js` — must match folder name (webpack entry: `src/Sys[Name]Component/Sys[Name]Component.js`)
- Manifest: `Sys[Name].manifest.js` (PascalCase after `Sys`, no `Component` suffix in manifest filename)
- Styles: `Sys[Name].styles.js`, `componentStyle.js`, `*Styles.js`, or `getStyleElement.js` depending on component
- Templates: `componentTemplate.js` or inline HTML string in `constructor()`
- Translation maps: `*Translations.js` (e.g. `selectOptionTranslations.js`) — default export object keyed by locale
- Types/helpers: `camelCase.js` (e.g. `social.types.js`, `dateUtils.js`)

**Classes:**
- `export default class Sys[Name]Component extends WcElement | WcControlledElement | SysBaseContainerComponent`
- Inner helpers: PascalCase classes (`PhoneInputMenu`, `EmailSuggesting`) or plain functions in separate files

**Custom elements:**
- `static define.name`: kebab-case platform tag (e.g. `sys-button`, `sys-dropdown-input`)
- `static define.model`: manifest `name` field (e.g. `SysButtonComponent`)

**Manifest:**
- `name`: `Sys[Name]Component` string matching class
- `componentType`: uppercase enum string (`BUTTON`, `INPUT`, etc.)
- `version`: semver string on manifest root

**DOM / platform attributes:**
- Internal targeting: `cl-element="button"`, `cl-inline-edit="content, text"`
- Document tree: `cl-type`, `cl-path`, `cl-id` on child nodes where needed

## Code Style

**Formatting:**
- No root ESLint or Prettier config — match surrounding files in the same component folder
- JavaScript (ES modules); TypeScript only via `ts-loader` for stray `.ts` in webpack, not used in `src/` component code
- Semicolons used inconsistently; follow the file you edit (most component files use semicolons)
- Indentation: 2 spaces in manifests and most components; some legacy blocks use 4 spaces — do not reformat unrelated lines

**Line length:**
- No enforced limit; keep lines readable (~90–120 chars) like existing code

**Build-time transforms (must align with conventions):**
- Webpack applies `babel-plugin-arrow-methods.js` to the main component class only (`src/SysXComponent/SysXComponent.js` where class name equals folder basename)
- Instance methods become arrow class properties at build time; **author regular methods in source** — the plugin converts them
- Excluded from arrow transform: `constructor`, `connectedCallback`, `disconnectedCallback`, static methods, getters/setters
- Also applied: `@babel/plugin-transform-class-properties`
- **Call bound methods with `()`** after build (e.g. `this.isRTL()` not `this.isRTL`)

## Import Organization

**Order (observed pattern):**
1. Local manifest/styles/template (`./SysButton.manifest`, `./componentTemplate`)
2. `@claspo/renderer` SDK (`WcElement`, `WcControlledElement`, utils)
3. `@claspo/common` utilities (`HandlerTypes`, DOM helpers)
4. Sibling component modules (`./getStyleElement`, `./validators/phone`)

**Path style:**
- Relative imports for same-folder files: `"./SysButton.manifest"`
- Package imports: `@claspo/renderer/...`, `@claspo/common/...`
- No path aliases in this repo; local dev can point `@claspo/*` to `../esputnik-forms-frontend/*/out` via `USE_LOCAL_SOURCES=1`

**Exports:**
- Default export for component class and manifest
- Named exports for validators and small utilities (`export function phone()`)
- **No barrel `index.js` files** — import concrete files

## Component Structure

**Required for every new component:**
1. `src/Sys[Name]Component/Sys[Name]Component.js` — extends appropriate base
2. `src/Sys[Name]Component/Sys[Name].manifest.js` — editor/runtime model
3. `static define = { name, model, manifest }` on the class
4. `connectedCallback()` calls `super.connectedCallback()` then wires listeners/DOM
5. `disconnectedCallback()` removes listeners/observers when used
6. `observeProps((prev, next) => { ... })` in `connectedCallback` for reactive prop-driven UI (form/control components)

**Base class choice:**
- `WcElement` — display/layout (button, text, image, slider, social, video, columns)
- `WcControlledElement` — form controls (input, dropdown, phone, date, consent, checkbox list, radio group, choice buttons, calendar)
- `SysBaseContainerComponent` — container/column layout (`SysContainerComponent`, `SysColumnComponent`)

**HTML templates:**
- Prefer `componentTemplate.js` default-exporting a template string for a11y-heavy markup; import into component or test
- Or set `this.getRootElement().innerHTML` in `constructor()` with embedded `<style>` from `*.styles.js`
- Use `cl-element` selectors; query via `this.getElement('input')` from SDK

**Styles:**
- Inject via `<style>${styles}</style>` in shadow root or dedicated `getStyleElement()` returning style string
- Adaptive structure in manifest: `adaptiveStyles.desktop` / `mobile` with `element` + `styleAttributes`
- Use manifest helpers: `cloneControlsToAllEnvs`, `cloneStylesToAllEnvs` from `@claspo/renderer`

**Services (via `this.services` after mount):**
- `eventEmitter`, `form`, `context`, `config`, `trackingService`, `mergeTagsProcessorFactory` — use platform APIs instead of ad hoc globals

## Error Handling

**Validators** (`src/SysPhoneInputComponent/validators/phone.js`, `src/SysTextAreaComponent/validators/maxLength.js`):
- Export factory: `export function phone() { return (value) => ({ isValid, errorKey? }); }`
- Invalid: `{ isValid: false, errorKey: 'PHONE_INVALID_NUMBER' }`
- Valid: `{ isValid: true }`

**Runtime warnings:**
- Use `console.warn` sparingly for migration/default paths (see `src/SysSocialComponent/propsMapper.js`)
- Do not leave `console.log` in committed code

**User-facing errors:**
- Tooltip/error UI in component DOM; keys from manifest/i18n, not hardcoded UI strings in logic when avoidable

## Logging

**Framework:** `console.warn` only where migration paths need visibility

**Patterns:**
- No structured logger in this package
- Analytics via `this.services.trackingService.send(...)` in components (e.g. `SysButtonComponent`)

## Comments

**When to comment:**
- Non-obvious business rules (email typo domains in `EmailSuggesting.spec.js` reference BE cases)
- Build/plugin behavior documented in `babel-plugin-arrow-methods.js` header
- Avoid narrating obvious code

**TODO:**
- Rare; if added, include ticket/context (one `/*TODO*/` in `src/SysRadioGroupComponent/componentStyle.js`)

## Function Design

**Size:**
- Large components (e.g. `SysButtonComponent.js`, `SysDropdownInputComponent.js`) are acceptable; extract helpers to sibling files when logic is reusable or testable in isolation (`PhoneInputMenu.js`, `EmailSuggesting.js`)

**Parameters:**
- Manifest-driven props via `this.getProps()` — do not thread parallel prop objects
- `observeProps` callbacks: `(prev, next) =>` compare relevant slices before DOM work

**Return values:**
- DOM builders return `HTMLElement` nodes
- Validators return result objects, not thrown errors

## Module Design

**Webpack bundling:**
- Each `src/Sys*Component/` folder is a separate entry; output `out/Sys[Name]Component/Sys[Name]Component.js`
- Global registration appended: `window.clComponentClass_Sys[Name]Component = ...`
- Assets copied from `src/Sys[Name]Component/assets/` → `out/.../assets/`

**Dependencies:**
- Runtime: `@claspo/common`, `@claspo/renderer` (pinned in `package.json`)
- Do not add duplicate renderer logic — extend SDK classes

**i18n:**
- Locale maps as default-export objects in `*Translations.js` files with keys `en`, `ru`, `uk`, etc.
- Add all locales present in sibling translation files when introducing new keys

## Testing-related conventions

- Co-locate specs: `*.spec.js` next to the module under test
- Template/a11y tests import `componentTemplate` or duplicate minimal HTML consistent with production markup
- See `TESTING.md` for Jest patterns

---

*Convention analysis: 2026-06-03*
