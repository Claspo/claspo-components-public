# Codebase Structure

**Analysis Date:** 2026-06-03

## Directory Layout

```text
claspo-components/
├── src/                          # All Sys* components (webpack entries = subdirs)
│   ├── SysButtonComponent/
│   ├── SysInputComponent/
│   └── … (25 component directories)
├── tests/                        # Shared Jest helpers
│   └── utils.js
├── out/                          # Build output (gitignored); published npm artifact
│   ├── Sys*Component/            # Per-component ESM bundles + assets
│   └── script/                   # Rollup subset with stripped manifests
├── requirements/                 # Product/requirements docs (non-runtime)
├── release-notes/                # Version history
├── webpack.config.js             # Multi-entry component bundler
├── rollup.script.config.js       # Built-in script bundle + manifest stripping
├── babel-plugin-arrow-methods.js # Component class method transform
├── babel.config.js
├── jest.config.js
├── package.json
├── CLAUDE.md / README.md
└── .planning/codebase/           # GSD architecture docs (this folder)
```

## Directory Purposes

**`src/`:**
- Purpose: Sole source tree for all web components shipped by this package.
- Contains: One subdirectory per component; only directories are webpack entries (no loose `src/*.js` entry files in current tree).
- Key pattern: `Sys{Name}Component/Sys{Name}Component.js` + `Sys{Name}.manifest.js`.

**`src/Sys*Component/` (25 directories):**
- Purpose: Encapsulate one Claspo system component end-to-end.
- Contains: Main class, manifest, styles/templates, `assets/`, optional `validators/`, `*.spec.js`.
- Key files: `{Name}Component.js`, `Sys*.manifest.js`.

**`tests/`:**
- Purpose: Cross-component Jest utilities.
- Contains: `tests/utils.js` — shared setup/helpers for specs.
- Key files: `tests/utils.js`.

**`out/`:**
- Purpose: Production build consumed by npm and widget pipeline.
- Contains: Mirrored `Sys*Component/` bundles, `script/` rollup output, copied `package.json` on publish.
- Generated: Yes (`npm run build`).
- Committed: No (cleaned by `prebuild`).

**`requirements/` / `release-notes/`:**
- Purpose: Documentation and release tracking; not imported by build.
- Contains: Markdown requirements and release notes.

## Component Inventory

| Directory | Main class | Base class | Manifest file |
|-----------|------------|------------|---------------|
| `src/SysButtonComponent/` | `SysButtonComponent` | `WcElement` | `SysButton.manifest.js` |
| `src/SysCalendarComponent/` | `SysCalendarComponent` | `WcControlledElement` | `SysCalendar.manifest.js` |
| `src/SysCheckboxListComponent/` | `SysCheckboxListComponent` | `WcControlledElement` | `SysCheckboxList.manifest.js` |
| `src/SysChoiceButtonsComponent/` | `SysChoiceButtonsComponent` | `WcControlledElement` | `SysChoiceButtons.manifest.js` |
| `src/SysColumnComponent/` | `SysColumnComponent` | `WcElement` | `SysColumn.manifest.js` |
| `src/SysColumnsComponent/` | `SysColumnsComponent` | `WcElement` | `SysColumns.manifest.js` |
| `src/SysConsentComponent/` | `SysConsentComponent` | `WcControlledElement` | `SysConsent.manifest.js` |
| `src/SysContainerComponent/` | `SysContainerComponent` | `SysBaseContainerComponent` → `WcElement` | `SysContainer.manifest.js` |
| `src/SysCountdownTimerComponent/` | `SysCountdownTimerComponent` | `WcElement` | `SysCountdownTimer.manifest.js` |
| `src/SysDateComponent/` | `SysDateComponent` | `WcControlledElement` | `SysDate.manifest.js` |
| `src/SysDropdownInputComponent/` | `SysDropdownInputComponent` | `WcControlledElement` | `SysDropdown.manifest.js` |
| `src/SysImageComponent/` | `SysImageComponent` | `WcElement` | `SysImage.manifest.js` |
| `src/SysInAppColumnsComponent/` | `SysInAppColumnsComponent` | extends `SysColumnsComponent` | `SysInAppColumns.manifest.js` |
| `src/SysInputComponent/` | `SysInputComponent` | `WcControlledElement` | `SysInput.manifest.js` |
| `src/SysPhoneInputComponent/` | `SysPhoneInputComponent` | `WcControlledElement` | `SysPhoneInput.manifest.js` |
| `src/SysPromoCodeComponent/` | `SysPromoCodeComponent` | `WcElement` | `SysPromoCode.manifest.js` |
| `src/SysRadioGroupComponent/` | `SysRadioGroupComponent` | `WcControlledElement` | `SysRadioGroup.manifest.js` |
| `src/SysSlideComponent/` | `SysSlideComponent` | `WcElement` | `SysSlide.manifest.js` |
| `src/SysSliderComponent/` | `SysSliderComponent` | `WcElement` | `SysSlider.manifest.js` |
| `src/SysSocialComponent/` | `SysSocialComponent` | `WcElement` | `SysSocial.manifest.js` |
| `src/SysTextAreaComponent/` | `SysTextAreaComponent` | `WcControlledElement` | `SysTextArea.manifest.js` |
| `src/SysTextComponent/` | `SysTextComponent` | `WcElement` | `SysText.manifest.js` |
| `src/SysVideoComponent/` | `SysVideoComponent` | `WcElement` | `SysVideo.manifest.js` |

**Internal base (not a webpack root by itself):** `src/SysContainerComponent/SysBaseContainerComponent.js` — shared container behavior; exported only via `SysContainerComponent` entry.

**Subclass without duplicate webpack entry:** `SysInAppColumnsComponent` extends `SysColumnsComponent` but is its own directory and bundle.

## Key File Locations

**Entry Points:**
- `src/{SysName}Component/{SysName}Component.js`: Webpack entry and default export class for each component.
- `webpack.config.js`: Discovers all `src/` subdirectories and builds `out/{Dir}/{Dir}.js`.

**Configuration:**
- `package.json`: Scripts (`dev`, `build`, `test`, `package`), dependencies `@claspo/common`, `@claspo/renderer`.
- `webpack.config.js`: ESM output, babel-loader, asset copy, `window.clComponentClass_*` injection.
- `rollup.script.config.js`: Secondary build for seven built-in components + stripped manifests.
- `jest.config.js`: jsdom, transform `@claspo/*` from `node_modules`.
- `babel.config.js` + `babel-plugin-arrow-methods.js`: Preset env + component method transform.

**Core Logic:**
- Manifests: `src/Sys*/Sys*.manifest.js` — editor + defaults (23 files).
- Form integration: `src/SysInputComponent/InputFormControl.js`, similar patterns in other `WcControlledElement` folders.
- Layout: `src/SysContainerComponent/SysContainerComponent.js`, `src/SysColumnsComponent/SysColumnsComponent.js`.

**Testing:**
- Co-located: `src/**/*.spec.js` (16 spec files).
- Shared: `tests/utils.js`.

## Naming Conventions

**Files:**
- Component class file: `Sys{Name}Component.js` — class name must match file name (babel arrow plugin enforces this).
- Manifest: `Sys{Name}.manifest.js` or shortened name (`SysDropdown.manifest.js`); default export object.
- Styles: `Sys{Name}.styles.js`, `componentStyle.js`, `getStyleElement.js`, or `*Styles.js` per component convention.
- Templates: `componentTemplate.js`, `getTemplate.js` for HTML string factories.
- Tests: `*.spec.js` beside the module under test, or `{Component}Template.spec.js`.

**Directories:**
- Folder name equals main class name: `SysButtonComponent/` (PascalCase + `Component` suffix).
- Webpack uses directory name for output path: `out/SysButtonComponent/SysButtonComponent.js`.

**Custom element `static define.name`:**
- kebab-case with `sys-` prefix: `sys-button`, `sys-input`, `sys-dropdown-input` (`src/Sys*Component.js`).

**Global bundle symbol:**
- `window.clComponentClass_Sys{Name}Component` — folder name with `Component` suffix if missing (`webpack.config.js` `componentFolderName`).

## Where to Add New Code

**New system component (full webpack bundle):**
1. Create `src/SysNewThingComponent/`.
2. Add `SysNewThingComponent.js` extending `WcElement` or `WcControlledElement`.
3. Add `SysNewThing.manifest.js` with full manifest contract (see `ARCHITECTURE.md`).
4. Implement `static define` and `manifest = …`.
5. Add `assets/` if the editor needs icons.
6. Run `npm run dev` — webpack auto-picks up new directories under `src/`.
7. Add `*.spec.js` next to complex template/helper logic.

**New helper for an existing component:**
- Place in the same `src/Sys*Component/` folder; import from `Sys*Component.js` only (do not add a second webpack entry).

**New validator or translation map:**
- `src/Sys*Component/validators/` or `*Translations.js` at component root (see `src/SysPhoneInputComponent/selectCountryCodeTranslations.js`).

**Do not add gamified components here:**
- Use `claspo-widgets-plugin` for `BaseGamifiedComponent` widgets (wheel, scratch card, etc.).

**Manifest-only changes:**
- Edit `src/Sys*/Sys*.manifest.js`; avoid duplicating defaults in the component class.

**Built-in script subset:**
- If the component must ship in `out/script/`, add it to `builtInComponents` in `rollup.script.config.js` and accept manifest field stripping for runtime embeds.

## Typical Folder Shapes

**Minimal (text/media):**
```text
SysTextComponent/
├── SysTextComponent.js
├── SysText.manifest.js
├── TextRoller.js              # optional behavior helper
└── assets/img/
```

**Form control:**
```text
SysInputComponent/
├── SysInputComponent.js
├── SysInput.manifest.js
├── InputFormControl.js
├── getStyleElement.js
├── EmailSuggesting.js
└── assets/img/
```

**Decomposed UI (dropdown/date):**
```text
SysDropdownInputComponent/
├── SysDropdownInputComponent.js
├── SysDropdown.manifest.js
├── componentTemplate.js
├── componentStyle.js
├── componentTemplate.spec.js
└── assets/img/
```

**Layout:**
```text
SysColumnsComponent/
├── SysColumnsComponent.js
├── SysColumns.manifest.js
├── getStyleElement.js
└── assets/img/               # column frame SVGs
```

## Build Output Layout

After `npm run build`:

```text
out/
├── SysButtonComponent/
│   ├── SysButtonComponent.js    # ESM + window.clComponentClass_* assignment
│   └── assets/                  # copied from src
├── … (one folder per src subdirectory)
└── script/
    ├── SysTextComponent/
    ├── SysContainerComponent/
    └── … (rollup preserveModules mirror; stripped manifests)
```

Publish flow (`npm run package`): copies `package.json`, `LICENSE.md`, `README.md` into `out/` and runs `npm publish` from `out/`.

## Special Directories

**`node_modules/@claspo/renderer` / `@claspo/common`:**
- Purpose: Platform SDK and shared utilities; not modified in this repo.
- Committed: No.
- Local override: `npm run dev:local` / `build:local` with `USE_LOCAL_SOURCES=1`.

**`.planning/codebase/`:**
- Purpose: GSD-generated reference for planners/executors.
- Generated: By `/gsd-map-codebase`.
- Committed: Per project policy.

**`out/`:**
- Purpose: Build artifact directory.
- Generated: Yes.
- Committed: No.

## Import Paths (prescriptive)

Use package imports from published SDKs — never relative paths into `node_modules`:

```javascript
import WcElement from '@claspo/renderer/sdk/WcElement';
import WcControlledElement from '@claspo/renderer/sdk/WcControlledElement';
import { cloneControlsToAllEnvs } from '@claspo/renderer/sdk/ManifestUtils';
import { cloneStylesToAllEnvs } from '@claspo/renderer/sdk/ModelStyleUtils';
import insertHtmlIntoElement from '@claspo/common/dom/insertHtmlIntoElement';
```

Manifest files import only renderer manifest/style utilities; component files may import both `@claspo/renderer` and `@claspo/common` as needed.

## Related Repositories

| Repo | Relationship |
|------|----------------|
| `esputnik-forms-frontend` | Source of `@claspo/renderer` and `@claspo/common` when using `USE_LOCAL_SOURCES=1` |
| `claspo-widgets-plugin` | Additional/custom components; same webpack patterns, includes gamification |
| `claspo-ui` | Angular apps; consumes published components indirectly via platform |

---

*Structure analysis: 2026-06-03*
