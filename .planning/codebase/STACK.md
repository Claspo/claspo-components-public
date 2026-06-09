# Technology Stack

**Analysis Date:** 2026-06-03

## Languages

**Primary:**
- JavaScript (ES modules) — all component implementations, manifests, styles-as-JS strings, and build configs under `src/` and repo root (`webpack.config.js`, `rollup.script.config.js`, `babel.config.js`)

**Secondary:**
- JSON — static assets such as `src/SysPhoneInputComponent/assets/json/country-code-options.json` (~2.5k lines of country/dial-code metadata)
- SVG — component icons and placeholders under each `src/Sys*Component/assets/`

**Not used in source:**
- TypeScript — `webpack.config.js` includes a `ts-loader` rule, but the repository has no `tsconfig.json` and no `.ts` source files; components are plain `.js`

## Runtime

**Environment:**
- Node.js `>=18.16.0` (declared in `package.json` `engines`)
- CI uses Node 20 (`.github/workflows/sync-to-public.yml`)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

**Browser runtime:**
- Custom elements (Web Components) executed in the end-user browser; the host Claspo widget runtime (`@claspo/renderer`) injects platform `services` and registers elements

## Frameworks

**Core:**
- `@claspo/renderer` `18.7.3` — Web Component base classes (`WcElement`, `WcControlledElement`), manifests, overlays, form integration, tracking hooks, preview modes
- `@claspo/common` `7.3.0` — shared DOM/utils/async helpers consumed by components
- Native Web APIs — Shadow DOM patterns via renderer base classes, `ResizeObserver`, `fetch`, `MutationObserver`, `document`/`window` DOM APIs

**Testing:**
- Jest `^29.7.0` with `jest-environment-jsdom` — unit tests co-located as `*.spec.js` under `src/`
- `babel-jest` — transpiles tests; `transformIgnorePatterns` whitelists `@claspo/*` packages (`jest.config.js`)

**Build/Dev:**
- Webpack `^5.99.9` — primary production build; one ESM bundle per component directory plus root `src/*.js` entries (`webpack.config.js`)
- Rollup `^4.39.0` — secondary `build:script` pipeline for a subset of “built-in” components into `out/script/` (`rollup.script.config.js`)
- Babel `^7.27.x` — `@babel/preset-env` for JS; custom `babel-plugin-arrow-methods.js` converts class methods to arrow properties on main component classes (Firefox iframe `this` binding)
- `copy-webpack-plugin` — copies per-component `assets/` into `out/`
- `cross-env` — sets `dev=1` for watch builds

## Key Dependencies

**Critical (runtime, published with package):**
- `@claspo/renderer` `18.7.3` — required peer-style platform; components extend `sdk/WcElement` or `sdk/WcControlledElement` and import SDK utilities from paths like `@claspo/renderer/sdk/HtmlStyleUtils`
- `@claspo/common` `7.3.0` — DOM insertion, debounce, sorting, clipboard, timezone helpers

**Build-only (devDependencies):**
- `webpack`, `webpack-cli`, `babel-loader`, `@babel/core`, `@babel/preset-env`
- `jest`, `babel-jest`, `jsdom`, `jest-environment-jsdom`

**Bundled output contract:**
- Webpack `output.library.type: 'module'` writes ESM to `out/`
- Post-build hook appends `window.clComponentClass_${ComponentName} = ...` for dynamic loading by the Claspo host (`webpack.config.js` custom plugin)

## Configuration

**Environment:**
- No `.env` in repository; components do not read process env vars
- Runtime configuration comes from injected `this.services.config` (provided by `@claspo/renderer` host), e.g. `devMode`, `PreviewMode.CABINET_PREVIEW`, relative timer callbacks (`src/SysCountdownTimerComponent/SysCountdownTimerComponent.js`, `src/SysVideoComponent/SysVideoComponent.js`)

**Build:**
- `webpack.config.js` — discovers all folders under `src/`, multi-entry ESM build to `out/`
- `USE_LOCAL_SOURCES=1` — webpack alias to sibling monorepo `../esputnik-forms-frontend/common/out` and `../esputnik-forms-frontend/renderer/out` (`dev:local`, `build:local`)
- `rollup.script.config.js` — strips editor-only manifest fields (`propertyPaneModel`, `i18nPropertyPaneModel`, etc.) for script bundle
- `babel.config.js` — Jest/babel baseline preset
- `.gitignore` — ignores `node_modules`, `out`

**npm scripts (`package.json`):**
- `dev` / `dev:local` — webpack watch after `prebuild` (clears `out/`)
- `build` / `build:local` — webpack + `rollup -c rollup.script.config.js`
- `test` — Jest with `--no-cache`
- `bundle` — `npm i`, test, build
- `package` — full bundle, copy `package.json`/`LICENSE.md`/`README.md` into `out/`, `npm publish --access=public`

## Platform Requirements

**Development:**
- Node `>=18.16.0`
- npm install at repo root
- Optional: local `@claspo/*` builds from `../esputnik-forms-frontend` when using `*:local` scripts
- Published install: `npm i @claspo/components` (see `README.md`, https://www.npmjs.com/package/@claspo/components)

**Production:**
- Artifact: `out/` directory (per-component ESM JS + copied `assets/`)
- Consumed by Claspo widget runtime / `claspo-widgets-plugin` / S3 upload pipelines in sibling repos — not a standalone server
- npm package `@claspo/components` (public registry per `npm publish --access=public` in `package` script)
- Mirror sync to `Claspo/claspo-components-public` on version bump via GitHub Actions (`.github/workflows/sync-to-public.yml`)

## Component Inventory (23 widgets)

Each lives in `src/Sys{Name}Component/` with `Sys{Name}Component.js`, `Sys{Name}.manifest.js`, and optional `assets/`:

| Component folder | Base class |
|------------------|------------|
| `SysButtonComponent` | `WcElement` |
| `SysCalendarComponent` | `WcControlledElement` |
| `SysCheckboxListComponent` | `WcControlledElement` |
| `SysChoiceButtonsComponent` | `WcControlledElement` |
| `SysColumnComponent` | (layout; uses renderer constants) |
| `SysColumnsComponent` | `WcElement` |
| `SysConsentComponent` | `WcControlledElement` |
| `SysContainerComponent` | `WcElement` (`SysBaseContainerComponent`) |
| `SysCountdownTimerComponent` | `WcElement` |
| `SysDateComponent` | `WcControlledElement` |
| `SysDropdownInputComponent` | `WcControlledElement` |
| `SysImageComponent` | `WcElement` |
| `SysInAppColumnsComponent` | layout variant |
| `SysInputComponent` | `WcControlledElement` |
| `SysPhoneInputComponent` | `WcControlledElement` |
| `SysPromoCodeComponent` | `WcElement` |
| `SysRadioGroupComponent` | `WcControlledElement` |
| `SysSlideComponent` | `WcElement` |
| `SysSliderComponent` | `WcElement` |
| `SysSocialComponent` | `WcElement` |
| `SysTextAreaComponent` | `WcControlledElement` |
| `SysTextComponent` | `WcElement` |
| `SysVideoComponent` | `WcElement` |

Rollup `build:script` subset (editor script path): Text, Container, Columns, Column, Image, Input, Button — see `builtInComponents` in `rollup.script.config.js`.

---

*Stack analysis: 2026-06-03*
