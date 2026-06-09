# External Integrations

**Analysis Date:** 2026-06-03

## APIs & External Services

**Claspo platform (primary — all components):**
- `@claspo/renderer` — Web Component SDK, form system, overlays, i18n, actions, preview modes
  - SDK entrypoints used across repo: `sdk/WcElement`, `sdk/WcControlledElement`, `sdk/HtmlStyleUtils`, `sdk/OverlayUtils`, `sdk/ManifestUtils`, `sdk/ModelStyleUtils`, `sdk/TranslationUtils`, `sdk/FormUtils`, `sdk/TooltipUtils`, `sdk/PreviewMode`, `sdk/context/ContextEvents`, `action/SysActionTypes`, `form/FormControlEvents`, `common/SysEventTypes`, `common/WaitForKeyboardHide`, `backward-compatibility/deprecatedCheckboxVariablesMap`, `wc-renderer/icons/*`
- `@claspo/common` — DOM and utility helpers (`dom/insertHtmlIntoElement`, `dom/copyToClipboard`, `async/debounce`, `utils/objectSort`, `handler/HandlerTypes`, etc.)
  - Auth: not applicable in this library; host application authenticates users
  - Version pins: `@claspo/renderer` `18.7.3`, `@claspo/common` `7.3.0` in `package.json`

**YouTube (embedded video):**
- `SysVideoComponent` loads `https://www.youtube.com/embed/{videoId}` in an `<iframe>` with optional autoplay/mute query params (`src/SysVideoComponent/SysVideoComponent.js`)
  - SDK/Client: native iframe + URL construction only (no YouTube Data API)
  - Auth: none

**Social sharing (link-out, no OAuth):**
- `SysSocialComponent` builds third-party share URLs via `src/SysSocialComponent/shareManager.js`:
  - Facebook: `https://www.facebook.com/sharer/sharer.php?u=`
  - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=`
  - Twitter/X intent: `https://twitter.com/intent/tweet?url=`
  - Pinterest: `https://www.pinterest.com/pin/create/button/?url=`
  - WhatsApp: `https://wa.me/?text=`
  - Email: `mailto:?body=&subject=`
- Platform profile links (Instagram, etc.) are configured in manifest defaults (`src/SysSocialComponent/SysSocial.manifest.js`); icons are local SVG assets

**Remote asset fetch (runtime):**
- `SysImageComponent` uses browser `fetch(inlineSVGUrl)` to inline remote SVG into the shadow tree (`src/SysImageComponent/SysImageComponent.js`)
  - No fixed API host; URL comes from widget/document model at runtime

**Not integrated in this repository:**
- REST/GraphQL backends, payment, CRM, analytics SDKs beyond injected `trackingService`, cloud storage SDKs, phone validation libraries (e.g. libphonenumber) — phone validation is regex-based in `src/SysPhoneInputComponent/validators/phone.js`

## Data Storage

**Databases:**
- None — stateless component library

**File Storage:**
- Build output: local `out/` (gitignored)
- Static bundled assets: per-component `src/Sys*/assets/` copied to `out/Sys*Component/assets/`
- Country metadata: `src/SysPhoneInputComponent/assets/json/country-code-options.json` (shipped with bundle)

**Caching:**
- None at library level; host runtime may cache loaded ESM modules and S3 artifacts

## Authentication & Identity

**Auth Provider:**
- Custom (host Claspo application) — components receive `this.services` from renderer; no tokens or session handling in `claspo-components`

**Platform services consumed at runtime (injected by host):**

| Service | Typical use in this repo | Example files |
|---------|--------------------------|---------------|
| `form` | Register controls, validation, submit lifecycle | `src/SysConsentComponent/SysConsentComponent.js`, `src/SysDateComponent/SysDateComponent.js`, `src/SysPhoneInputComponent/SysPhoneInputComponent.js` |
| `config` | Preview mode, devMode, i18n, timer persistence hooks | `src/SysVideoComponent/SysVideoComponent.js`, `src/SysCountdownTimerComponent/SysCountdownTimerComponent.js` |
| `context` | Promo codes, component records | `src/SysPromoCodeComponent/SysPromoCodeComponent.js`, `src/SysInputComponent/SysInputComponent.js` |
| `state` | Phone country code selection | `src/SysPhoneInputComponent/SysPhoneInputComponent.js` |
| `eventEmitter` | Submit events, resource loaded, invalid submit | `src/SysButtonComponent/SysButtonComponent.js`, `src/SysImageComponent/SysImageComponent.js` |
| `trackingService` | Form/button/promo analytics | `src/SysButtonComponent/SysButtonComponent.js`, `src/SysPromoCodeComponent/SysPromoCodeComponent.js` |

## Monitoring & Observability

**Error Tracking:**
- None in-library; host may wrap runtime

**Logs:**
- `console.log` in webpack config for discovered components (`webpack.config.js`) — build-time only

**Analytics:**
- Delegated to `this.services.trackingService` (implementation in `@claspo/renderer` / host), e.g. `send('FormButtonClick_[Name]')`, `trackClick`, `trackTargetAction` in `src/SysButtonComponent/SysButtonComponent.js` and `src/SysPromoCodeComponent/SysPromoCodeComponent.js`

## CI/CD & Deployment

**Hosting:**
- npm registry — public package `@claspo/components` (`npm run package` publishes from `out/`)
- GitHub public mirror `Claspo/claspo-components-public` synced on `package.json` version change

**CI Pipeline:**
- GitHub Actions: `.github/workflows/sync-to-public.yml`
  - Triggers: push to `main` when `package.json` changes, or `workflow_dispatch`
  - Node 20, rsync to public repo, tag + GitHub Release via `gh` CLI
  - Secrets (names only): `PUBLIC_REPO_TOKEN`, optional `SYNC_GIT_NAME`, `SYNC_GIT_EMAIL` — values not stored in repo

**Downstream consumption (sibling repos, not in this package):**
- `claspo-widgets-plugin` bundles `@claspo/components` with custom widgets
- `esputnik-forms-frontend` supplies `@claspo/renderer` / `@claspo/common` builds for local dev alias

## Environment Configuration

**Required env vars:**
- None for building or running components in isolation
- CI requires GitHub secrets for public-repo sync (see workflow above)
- Local `USE_LOCAL_SOURCES=1` is a build-time flag, not an env file

**Secrets location:**
- GitHub Actions secrets for sync workflow
- npm publish credentials on developer/CI machine (not committed; `.npmrc` not present in repo)

## Webhooks & Callbacks

**Incoming:**
- None — library has no HTTP server

**Outgoing:**
- Browser navigation: social share URLs, `mailto:` links (`src/SysSocialComponent/shareManager.js`)
- YouTube iframe embed requests (browser loads Google CDN)
- Optional `fetch()` for user-configured image/SVG URLs (`src/SysImageComponent/SysImageComponent.js`)
- Form submit and CRM actions are dispatched through renderer `handlers` / `SysActionTypes` (e.g. `SUBSCRIBE_CONTACT`, `REQUEST` in `src/SysButtonComponent/SysButtonComponent.js`) — actual HTTP calls occur in host runtime, not in this repo

## Event Bus Integration

Components subscribe and emit via `this.services.eventEmitter` for cross-component coordination:

- Submit flow: `SUBMIT_REQUEST_STARTED`, `SUBMIT_REQUEST_FINISHED`, `SUBMIT_REQUEST_ERROR_WITHOUT_VIEW` (`src/SysButtonComponent/SysButtonComponent.js`)
- Validation: `SET_SUBSCRIBE_CONTACT_BUTTON_AS_INVALID`, `INVALID_CONTACT_DATA_SUBMIT_ATTEMPT` (`src/SysButtonComponent/SysButtonComponent.js`, `src/SysDateComponent/SysDateComponent.js`)
- Resources: `VIEW_COMPONENT_RESOURCES_LOADED` (`src/SysImageComponent/SysImageComponent.js`, `src/SysSliderComponent/SysSliderComponent.js`)
- Promo: `SysEventTypes.PROMO_CODE_SHOWN` emit (`src/SysPromoCodeComponent/SysPromoCodeComponent.js`)

## i18n

- Manifest `i18n` blocks and translation keys in component JS (e.g. `src/SysDateComponent/SysDateComponent.js` uses `getTranslation(this.services.config, ...)`)
- Widget languages resolved via `@claspo/renderer/sdk/TranslationUtils` (`src/SysPhoneInputComponent/PhoneInputMenu.js`, `src/SysInputComponent/InputFormControl.js`)
- No external translation SaaS in this repo

---

*Integration audit: 2026-06-03*
