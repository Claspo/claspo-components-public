<!-- refreshed: 2026-06-03 -->
# Architecture

**Analysis Date:** 2026-06-03

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│              Claspo platform (editor + widget runtime)                   │
│  Consumes bundles from `@claspo/components` / `claspo-widgets-plugin`   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ loads ESM + registers custom elements
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Built artifacts (`out/`)                              │
│  Per-component: `SysFooComponent/SysFooComponent.js`                     │
│  Global: `window.clComponentClass_SysFooComponent`                       │
│  Optional script subset: `out/script/` (rollup, stripped manifests)      │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ implements
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              `src/Sys*Component/` (this repository)                      │
│  SysFooComponent.js  +  SysFoo.manifest.js  +  styles/templates/assets   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ extends
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  `@claspo/renderer` SDK                                                  │
│  `WcElement` / `WcControlledElement` — lifecycle, props, shadow DOM      │
│  `@claspo/common` — DOM/utils/handlers                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component layer | Responsibility | Location |
|-----------------|----------------|----------|
| Manifest | Editor UI models, default props/styles, i18n, validation schema | `src/Sys*/Sys*.manifest.js` |
| Component class | DOM template, runtime behavior, prop observation | `src/Sys*/Sys*Component.js` |
| Supporting modules | Templates, overlay styles, form controls, validators | Same folder (e.g. `componentTemplate.js`, `InputFormControl.js`) |
| Build (webpack) | One ESM bundle per `src/` subdirectory; asset copy; global class export | `webpack.config.js` |
| Build (rollup) | Lightweight ESM for a fixed “built-in” subset with editor fields stripped from manifests | `rollup.script.config.js` |
| Platform SDK | Registration, services injection, adaptive styles, form system | `@claspo/renderer` (dependency) |

## Pattern Overview

**Overall:** Sys* Web Component modules — one folder per component, manifest-driven configuration, class extends renderer SDK base.

**Key Characteristics:**
- Every shipped component lives under `src/Sys{Name}Component/` with entry file `Sys{Name}Component.js`.
- Registration contract is `static define = { name, model, manifest }` on the component class.
- Runtime behavior uses `connectedCallback` / `disconnectedCallback`, `observeProps`, and `this.services` from `@claspo/renderer`.
- Editor and runtime share the same manifest object; rollup can emit a slim runtime-only manifest for script embedding.

## Layers

**Manifest layer:**
- Purpose: Declares component metadata for the Claspo editor and default document model.
- Location: `src/Sys*Component/Sys*.manifest.js` (23 manifests; naming is `Sys{Name}.manifest.js`, not always matching folder suffix — e.g. `SysDropdown.manifest.js` in `SysDropdownInputComponent/`).
- Contains: `name`, `componentType`, `version`, `contextMenuModel`, `floatingControlsModel`, `propertyPaneModel`, `props` (defaults), `adaptiveStyles`, `i18n`, `i18nPropPaths`, validation/control definitions for form fields.
- Depends on: `@claspo/renderer/sdk/ManifestUtils`, `@claspo/renderer/sdk/ModelStyleUtils`.
- Used by: Component class (`manifest = …`), platform document model, rollup script build.

**Component implementation layer:**
- Purpose: Custom element behavior, internal HTML, event wiring, form integration.
- Location: `src/Sys*Component/Sys*Component.js`.
- Contains: Class extending `WcElement` or `WcControlledElement`, optional `constructor` HTML seed, lifecycle hooks, helpers co-located in the same directory.
- Depends on: Manifest, `@claspo/renderer` SDK utilities, `@claspo/common` utilities.
- Used by: Webpack entry per directory; exposed as `window.clComponentClass_Sys{Name}Component`.

**Layout / composition layer:**
- Purpose: Structural widgets (containers, columns, slides) that host child components.
- Location: `src/SysContainerComponent/`, `src/SysColumnsComponent/`, `src/SysColumnComponent/`, `src/SysSlideComponent/`, `src/SysInAppColumnsComponent/`.
- Pattern: `SysBaseContainerComponent` extends `WcElement`; `SysContainerComponent` adds responsive rules; `SysColumnsComponent` exposes render outlet; `SysInAppColumnsComponent` subclasses columns with alternate manifest.

**Build / distribution layer:**
- Purpose: Produce publishable `out/` npm package (`npm run build` → webpack + rollup).
- Location: `webpack.config.js`, `rollup.script.config.js`, output `out/`.
- Depends on: Node ≥ 18.16, `@claspo/common`, `@claspo/renderer` (or local aliases via `USE_LOCAL_SOURCES=1`).

## Sys*Component Pattern

### Directory and class naming

Use this layout for every system component:

```text
src/SysExampleComponent/
├── SysExampleComponent.js      # default export class SysExampleComponent
├── SysExample.manifest.js      # default export manifest object
├── SysExample.styles.js        # optional (see SysButtonComponent)
├── assets/                     # optional icons/images
└── *.spec.js                   # optional Jest tests co-located
```

Webpack discovers components by scanning **directories** under `src/` (`webpack.config.js` lines 16–32). Each directory becomes entry `./src/{DirName}/{DirName}.js`.

### `static define` registration

Every component class declares platform registration metadata:

```javascript
static define = {
  name: 'sys-button',           // custom element tag base (platform adds suffixes)
  model: SysButtonManifest.name, // e.g. "SysButtonComponent"
  manifest: SysButtonManifest,
};
manifest = SysButtonManifest;
```

Reference: `src/SysButtonComponent/SysButtonComponent.js` lines 12–18.

The platform reads `define` when registering the custom element and binding document nodes to component models.

### WcElement vs WcControlledElement

| Base class | Import | Use when |
|------------|--------|----------|
| `WcElement` | `@claspo/renderer/sdk/WcElement` | Display, layout, actions without form control registration |
| `WcControlledElement` | `@claspo/renderer/sdk/WcControlledElement` | Inputs, selects, consent, any field that registers with `services.form` |

**WcElement components (15):** `SysButton`, `SysText`, `SysImage`, `SysVideo`, `SysSocial`, `SysSlider`, `SysSlide`, `SysColumns`, `SysColumn`, `SysContainer` (via `SysBaseContainerComponent`), `SysCountdownTimer`, `SysPromoCode`, `SysInAppColumns` (extends `SysColumnsComponent`).

**WcControlledElement components (10):** `SysInput`, `SysTextArea`, `SysDate`, `SysDropdownInput`, `SysPhoneInput`, `SysRadioGroup`, `SysCheckboxList`, `SysChoiceButtons`, `SysConsent`, `SysCalendar`.

Form controls typically delegate to a helper (e.g. `InputFormControl` in `src/SysInputComponent/InputFormControl.js`) that calls `this.services.form.registerControl` and validation from manifest `control` sections.

### Manifest contract (prescriptive)

When adding or extending a manifest, include at minimum:

- `name`: string matching editor model (`Sys{Name}Component`).
- `componentType`: platform enum (e.g. `BUTTON`, `INPUT`).
- `version`: semver string.
- `props`: default `styles`, `content`, `handlers`, `control` as required by component type.
- `adaptiveStyles`: use `cloneStylesToAllEnvs` from `@claspo/renderer/sdk/ModelStyleUtils`.
- Editor panels: `contextMenuModel`, `floatingControlsModel`, `propertyPaneModel` via `cloneControlsToAllEnvs` from `@claspo/renderer/sdk/ManifestUtils`.
- `i18n` + `i18nPropPaths` for translatable fields and validation messages.

Example manifest entry point: `src/SysButtonComponent/SysButton.manifest.js`.

Rollup script build **strips** editor-only manifest keys for a subset of built-ins: `contextMenuModel`, `floatingControlsModel`, `propertyPaneModel`, `i18nPropertyPaneModel`, `props`, `metaDescription` (`rollup.script.config.js` lines 13–20). Do not rely on those fields in script-only consumers.

### Internal DOM conventions

- Target sub-elements with `cl-element="…"` (e.g. `button`, `input`, `label`).
- Inline editor hooks: `cl-inline-edit="content, text"` on editable regions.
- Apply adaptive layout via `this.applyAutoAdaptiveStyles(next.adaptiveStyles, next.styles)` inside `observeProps`.
- React to desktop/mobile via `this.observeEnvironment` where orientation or breakpoint matters (`src/SysColumnsComponent/SysColumnsComponent.js`).

### Services (injected by renderer)

Access platform capabilities only through `this.services` inside component methods:

| Service | Typical use in components |
|---------|---------------------------|
| `form` | Register controls, validation (`WcControlledElement`) |
| `eventEmitter` | Cross-component events (e.g. submit lifecycle on button) |
| `trackingService` | Analytics (`FormButtonClick_*`) |
| `config` | Render mode, language, environment |
| `context` | Merge tags / contextual data |

Do not instantiate platform services inside component code.

## Data Flow

### Widget render path

1. Host loads bundled module from `out/SysFooComponent/SysFooComponent.js` (or plugin mirror).
2. Webpack footer assigns `window.clComponentClass_SysFooComponent` (`webpack.config.js` lines 112–121).
3. Platform instantiates class, connects custom element, injects `services` and document model.
4. `connectedCallback` runs: `super.connectedCallback()`, build DOM if needed, subscribe `observeProps` / `observeEnvironment`.
5. On prop changes, component updates DOM, styles, and form state; may emit tracking or handler actions via manifest `handlers`.

### Editor → document model

1. Manifest defines default `props` and control definitions.
2. User edits via `propertyPaneModel` controls mapped to prop paths.
3. Serialized document stores component instance props; runtime `getProps()` reflects current state.

### Form submit path (example: button)

1. User clicks button (`src/SysButtonComponent/SysButtonComponent.js` click listener).
2. Handlers from props may include `SUBSCRIBE_CONTACT` / `REQUEST` actions.
3. Component listens to `eventEmitter` topics: `SUBMIT_REQUEST_STARTED`, `SUBMIT_REQUEST_FINISHED`, `SET_SUBSCRIBE_CONTACT_BUTTON_AS_INVALID`, etc.
4. UI shows loader, success icon, or error tooltip using manifest i18n keys.

**State management:** No local Redux/NgRx — state lives in the Claspo document model and form service; components react via `observeProps` and platform events.

## Key Abstractions

**`static define`:**
- Purpose: Single registration point for custom element name, model id, manifest reference.
- Examples: All `src/Sys*Component/Sys*Component.js` files with `static define`.
- Pattern: Duplicated `manifest` instance property for instance methods (`getTranslationsMap(this.manifest.i18n)`).

**Manifest-driven styling:**
- Purpose: Separate presentation defaults from TypeScript/JS logic.
- Examples: `props.styles`, `props.adaptiveStyles` in manifests; applied in components via `applyAutoAdaptiveStyles`.
- Pattern: `cloneStylesToAllEnvs` / per-element `styleAttributes` on `host`, `button`, `input`, etc.

**Co-located decomposition:**
- Purpose: Keep large components maintainable without changing webpack entry.
- Examples: `src/SysDropdownInputComponent/componentTemplate.js`, `src/SysRadioGroupComponent/componentTemplate.js`, `src/SysDateComponent/getTemplate.js`.
- Pattern: Main class imports static template/style factories; webpack bundles them via import graph from single entry file.

## Entry Points

**Per-component webpack entry:**
- Location: `src/{ComponentDir}/{ComponentDir}.js` (auto-discovered).
- Triggers: `npm run build`, `npm run dev`.
- Responsibilities: Produce ESM library chunk + copy `assets/`.

**Rollup script subset:**
- Location: `rollup.script.config.js` — fixed list `builtInComponents` (text, container, columns, column, image, input, button).
- Triggers: `npm run build:script` after webpack.
- Responsibilities: `out/script/` tree with `preserveModules`, stripped manifests for embed script.

**Tests:**
- Location: `jest.config.js` — co-located `*.spec.js` under `src/` and `tests/utils.js`.
- Triggers: `npm test`.

## Architectural Constraints

- **Threading:** Single-threaded browser; no workers in component code.
- **Global state:** Built bundles attach component classes to `window.clComponentClass_*` only; no other globals required by components.
- **Method binding:** Babel plugin `babel-plugin-arrow-methods.js` converts class methods to arrow properties on the **main** component class file (matching `src/Foo/Foo.js`) except `constructor`, `connectedCallback`, `disconnectedCallback`, and static methods — required for Firefox iframe `this` binding (aligned with `@claspo/renderer` WcElement rules).
- **Module format:** Webpack `output.module: true` (ESM); consumers must load as modules.
- **Local development:** `USE_LOCAL_SOURCES=1` resolves `@claspo/common` and `@claspo/renderer` from `../esputnik-forms-frontend/*/out` (`webpack.config.js` alias).
- **Gamification:** `BaseGamifiedComponent` is **not** in this repository; gamified widgets live in `claspo-widgets-plugin`. This repo ships standard Sys* form and layout components only.

## Anti-Patterns

### Regular class methods on component classes

**What happens:** Methods defined as `methodName() { }` on `SysFooComponent` (except lifecycle) may lose `this` in Firefox when the widget runs inside an iframe.

**Why it's wrong:** Breaks access to `this.services`, `getProps`, and DOM helpers at runtime.

**Do this instead:** Rely on `babel-plugin-arrow-methods.js` for `src/SysFooComponent/SysFooComponent.js`, or assign arrow function properties manually; keep `connectedCallback` / `disconnectedCallback` as standard methods.

### Duplicating manifest editor models in component code

**What happens:** Hard-coded default styles or control definitions in the component class diverge from manifest `props`.

**Why it's wrong:** Editor defaults and runtime fallbacks disagree; document migration breaks.

**Do this instead:** Put defaults in `Sys*.manifest.js` `props` / `adaptiveStyles`; use manifest `i18n` for user-visible strings (`getTranslationsMap`, `getTranslation`).

### Calling platform APIs without `services`

**What happens:** Direct HTTP, global Claspo objects, or ad-hoc DOM queries outside shadow root helpers.

**Why it's wrong:** Breaks testability and render-mode differences (STATIC vs UPDATING).

**Do this instead:** Use `this.services.*`, `this.getElement()`, `this.getRootElement()`, `this.getHostElement()` from `WcElement`.

## Error Handling

**Strategy:** Validation and submit errors flow through form service and `eventEmitter`; UI shows tooltips or invalid styles.

**Patterns:**
- Form fields: validation config in manifest `control.validation`; helpers like `setInvalidStyle` from `@claspo/renderer/sdk/FormUtils` (`src/SysButtonComponent/SysButtonComponent.js` `showErrorTooltip`).
- Async submit: listen for `SUBMIT_REQUEST_*` events; disable control and show loader/success state.
- i18n errors: resolve keys via `this.getTranslationsMap(this.manifest.i18n)` or `getTranslation(this.services.config, this.manifest.i18n, key)`.

## Cross-Cutting Concerns

**Logging:** No shared logger in-repo; avoid `console.log` in production paths (project quality expectation).

**Validation:** Declared in manifest; enforced by `WcControlledElement` + form helpers (e.g. `src/SysTextAreaComponent/validators/maxLength.js`).

**Authentication:** Not handled in components; platform session is outside this package.

**Accessibility:** Form components set ARIA attributes in `observeProps` (e.g. `aria-required`, `aria-labelledby` in `src/SysInputComponent/SysInputComponent.js`).

**Internationalization:** Manifest `i18n` maps per locale; components resolve at runtime through renderer helpers.

---

*Architecture analysis: 2026-06-03*
