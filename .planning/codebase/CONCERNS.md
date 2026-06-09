# Codebase Concerns

**Analysis Date:** 2026-06-03

## Tech Debt

**Oversized manifest files:**
- Issue: Component configuration lives in monolithic `.manifest.js` files (property pane models, i18n, validation, styles) that are hard to review, diff, and reuse.
- Files: `src/SysInputComponent/SysInput.manifest.js` (~1114 lines), `src/SysCountdownTimerComponent/SysCountdownTimer.manifest.js` (~1011), `src/SysCheckboxListComponent/SysCheckboxList.manifest.js` (~731), `src/SysDropdownInputComponent/SysDropdown.manifest.js` (~593), `src/SysDateComponent/SysDate.manifest.js` (~592)
- Impact: Regressions in editor/runtime behavior are easy to miss; onboarding cost is high.
- Fix approach: Split manifests by concern (props schema, property pane, i18n) or generate pane models from a smaller schema; keep public `static define` contract unchanged.

**Dual build pipelines with different surface area:**
- Issue: Full widget bundles are produced by Webpack (`webpack.config.js` → `out/`), while a separate Rollup pass (`rollup.script.config.js` → `out/script/`) only covers seven “built-in” components and strips manifest fields for script embedding.
- Files: `webpack.config.js`, `rollup.script.config.js`, `package.json` (`build:script`)
- Impact: Two code paths to maintain; behavior can diverge between `out/` bundles and `out/script/` modules.
- Fix approach: Document which consumers use which output; align stripping/minification rules; add smoke tests per output target.

**Incomplete Babel arrow-method transform scope:**
- Issue: Custom plugin `babel-plugin-arrow-methods.js` only rewrites methods on the main component class when `className === filename` (e.g. `SysPhoneInputComponent.js`). Helper classes in sibling files (e.g. `PhoneInputMenu.js`, `Swiper.js`) keep classic methods.
- Files: `babel-plugin-arrow-methods.js`, `src/SysPhoneInputComponent/PhoneInputMenu.js`, `src/SysSliderComponent/Swiper.js`
- Impact: Known Firefox/iframe `this` binding issues for web components may still affect submodules not transformed (parent platform docs require arrow methods on `WcElement` subclasses).
- Fix approach: Extend plugin to all `src/**/*.js` classes extending platform base classes, or enforce arrow functions manually in helper modules.

**Duplicate custom element name for columns variants:**
- Issue: `SysColumnsComponent` and `SysInAppColumnsComponent` both register `name: 'sys-columns'` with different manifests/models.
- Files: `src/SysColumnsComponent/SysColumnsComponent.js`, `src/SysInAppColumnsComponent/SysInAppColumnsComponent.js`
- Impact: Whichever bundle registers last wins at runtime; wrong manifest/model if both load in one page.
- Fix approach: Use distinct `static define.name` values (e.g. `sys-in-app-columns`) and coordinate with `@claspo/renderer` registration, or guarantee mutual exclusion at bundle composition time.

**Stale inline TODO in styles:**
- Issue: Commented padding/margin experiment left as `/*TODO*/` in production styles.
- Files: `src/SysRadioGroupComponent/componentStyle.js` (line ~67)
- Impact: Unclear whether radio option hit-area styling is finished; risk of accidental uncomment without tests.
- Fix approach: Resolve design in manifest/styles or remove dead commented block.

**Internal SDK gap report committed to repo root:**
- Issue: Large requirements doc (`REPORT_26.01T13:19_CODEX_COMPONENT_SDK_REQUIREMENTS.md`) tracks undocumented SDK surface but is not part of `.planning/` or published docs.
- Files: `REPORT_26.01T13:19_CODEX_COMPONENT_SDK_REQUIREMENTS.md`
- Impact: Drift between report and code; contributors may not find it.
- Fix approach: Move to `docs/` or `.planning/` and link from `README.md`; trim or regenerate on SDK changes.

**Webpack always logs component list:**
- Issue: `console.log` on every build lists all component folders.
- Files: `webpack.config.js` (lines 26–27)
- Impact: Noisy CI logs; minor hygiene issue.
- Fix approach: Gate behind `isDev` or remove.

**Webpack `cache: false`:**
- Issue: Both top-level and `resolve.cache` disable caching.
- Files: `webpack.config.js`
- Impact: Slower local/CI builds as component count grows.
- Fix approach: Enable persistent cache in dev; keep production cache policy explicit.

**TypeScript loader without TypeScript sources:**
- Issue: Webpack configures `ts-loader` for `.ts` files but the repo is entirely `.js`.
- Files: `webpack.config.js`
- Impact: Dead configuration; confusion for contributors expecting TS.
- Fix approach: Remove unused rule or migrate critical modules to TS incrementally.

## Known Bugs

**Social share URLs not encoded:**
- Symptoms: Share links built as `` `...?u=${url}` `` without `encodeURIComponent`; special characters in `shareUrl` or `window.location.href` can break URLs or alter query parsing.
- Files: `src/SysSocialComponent/shareManager.js`, `src/SysSocialComponent/propsMapper.js` (`prepareOptionsForSharingMode`)
- Trigger: `control.mode === SHARE` with external URL containing `&`, `#`, or non-ASCII characters.
- Workaround: Sanitize/encode URLs upstream in editor or renderer before props reach the component.

**SysInAppColumns vs SysColumns registration collision (latent):**
- Symptoms: Unexpected columns behavior if both component bundles register the same tag.
- Files: `src/SysInAppColumnsComponent/SysInAppColumnsComponent.js`, `src/SysColumnsComponent/SysColumnsComponent.js`
- Trigger: Loading both webpack entry bundles on one host page.
- Workaround: Ensure widget plugin/config loads only one columns implementation per surface.

## Security Considerations

**User-controlled href and image URLs (social):**
- Risk: Platform `url` and `platform.image` flow into `<a href>` and `<img src>` without additional validation in the component.
- Files: `src/SysSocialComponent/SysSocialComponent.js`, `src/SysSocialComponent/SocialUrlManager.js`
- Current mitigation: `rel="noopener noreferrer"` on links; invalid platforms filtered in `propsMapper.js` / `socialConditions.js`.
- Recommendations: Allowlist URL schemes (`https:`, `mailto:`); block `javascript:`; encode share URLs in `shareManager.js`.

**Inline SVG fetched and injected via innerHTML:**
- Risk: If `inlineSVGUrl` points to attacker-controlled content, parsed SVG injected into DOM can execute script in some browsers/contexts.
- Files: `src/SysImageComponent/SysImageComponent.js` (fetch → `innerHTML = inlineSVG.trim()`)
- Current mitigation: URLs typically come from trusted Claspo asset pipeline.
- Recommendations: CSP on host page; sanitize SVG server-side; use DOMParser + strip `<script>`/event handlers before insert.

**Widespread innerHTML templates in constructors:**
- Risk: Template strings in components assume trusted static markup; dynamic segments must not include unsanitized editor content.
- Files: Most `src/Sys*Component/Sys*Component.js` (e.g. `SysInputComponent.js`, `SysButtonComponent.js`, `SysDateComponent.js`)
- Current mitigation: User-facing text usually bound via controlled APIs / `insertHtmlIntoElement` from `@claspo/common`.
- Recommendations: Prefer `insertHtmlIntoElement` consistently; audit any interpolated prop values in templates.

**Public repo sync via rsync:**
- Risk: `.github/workflows/sync-to-public.yml` mirrors almost the entire tree to `claspo-components-public` on version bump; only a short exclude list (`.github/`, `node_modules/`, etc.).
- Files: `.github/workflows/sync-to-public.yml`
- Current mitigation: Excludes `requirements/`, `sync_utils/`; no `.env` in repo.
- Recommendations: Expand excludes for internal-only paths (`REPORT_*.md`, `.planning/`); add pre-sync secret scan.

## Performance Bottlenecks

**Large per-component manifests parsed at build time:**
- Problem: Every manifest is a large JS module compiled into each bundle.
- Files: `src/SysInputComponent/SysInput.manifest.js`, `src/SysCountdownTimerComponent/SysCountdownTimer.manifest.js`
- Cause: Editor metadata co-located with runtime manifest export.
- Improvement path: Lazy-load editor-only manifest slices in editor builds only (Rollup strip is partial).

**SysDateComponent complexity:**
- Problem: ~852 lines with overlays, month dropdown, keyboard guards, and multiple `setTimeout`/`window` listeners.
- Files: `src/SysDateComponent/SysDateComponent.js`
- Cause: Full date UX (manual input + dropdown + validation) in one class.
- Improvement path: Extract overlay module; ensure teardown mirrors `SysDropdownInputComponent` patterns.

**Slider autoplay timers:**
- Problem: `setTimeout` chains for slide rotation (`slideSwitchTimeout`); depends on `window.clSliderSpeed` global override.
- Files: `src/SysSliderComponent/SysSliderComponent.js` (e.g. `window.clSliderSpeed ?? 300`)
- Cause: Autoplay and resize handling in single component.
- Improvement path: Document global; use `requestAnimationFrame` or renderer config service instead of `window` implicit API.

**Phone input country JSON asset:**
- Problem: `country-code-options.json` (~48KB, ~2587 lines) copied per build for every widget using phone input.
- Files: `src/SysPhoneInputComponent/assets/json/country-code-options.json`, `webpack.config.js` (CopyWebpackPlugin)
- Cause: Static include list bundled with component assets.
- Improvement path: Shared CDN asset or lazy fetch once per page via `services` cache.

**Image inline SVG fetch on load:**
- Problem: Network fetch + DOM rewrite for inline SVG mode blocks `componentResourceManager` pending counter.
- Files: `src/SysImageComponent/SysImageComponent.js`
- Cause: Synchronous-looking render path until fetch completes.
- Improvement path: Cache by URL; timeout and fallback image already partially handled in `.catch`.

## Fragile Areas

**Lifecycle cleanup inconsistency:**
- Files with `disconnectedCallback` cleanup: `src/SysDateComponent/SysDateComponent.js`, `src/SysDropdownInputComponent/SysDropdownInputComponent.js`, `src/SysSliderComponent/SysSliderComponent.js`, `src/SysPhoneInputComponent/SysPhoneInputComponent.js`, `src/SysCalendarComponent/SysCalendarComponent.js`, `src/SysCountdownTimerComponent/SysCountdownTimerComponent.js`, `src/SysPromoCodeComponent/SysPromoCodeComponent.js`, `src/SysVideoComponent/SysVideoComponent.js`, `src/SysImageComponent/SysImageComponent.js`, `src/SysInputComponent/SysInputComponent.js`, `src/SysButtonComponent/SysButtonComponent.js`, `src/SysContainerComponent/SysContainerComponent.js`, `src/SysColumnComponent/SysColumnComponent.js`, `src/SysContainerComponent/SysBaseContainerComponent.js`
- Components without `disconnectedCallback` (rely only on DOM removal): `src/SysSocialComponent/SysSocialComponent.js`, `src/SysRadioGroupComponent/SysRadioGroupComponent.js`, `src/SysCheckboxListComponent/SysCheckboxListComponent.js`, `src/SysChoiceButtonsComponent/SysChoiceButtonsComponent.js`, `src/SysTextComponent/SysTextComponent.js`, `src/SysTextAreaComponent/SysTextAreaComponent.js`, `src/SysConsentComponent/SysConsentComponent.js`, `src/SysColumnsComponent/SysColumnsComponent.js`, `src/SysSlideComponent/SysSlideComponent.js`
- Why fragile: `window`/`document` listeners and timers in complex components may leak if platform does not destroy custom elements aggressively.
- Safe modification: Mirror `removeEscapeKeyupGuard` / `clearInterval` patterns from `SysDateComponent` when adding listeners.
- Test coverage: Only `SysSliderComponent.spec.js` asserts listener removal among behavioral tests.

**Dropdown overlay listener graph:**
- Files: `src/SysDropdownInputComponent/SysDropdownInputComponent.js`
- Why fragile: Mix of per-option `addEventListener`, backdrop click, input handlers, and capture-phase `window` keyup guard.
- Safe modification: Always pair `addEscapeKeyupGuard` with `removeEscapeKeyupGuard` in `disconnectedCallback` (already present); extend tests beyond template specs.

**Props migration side effects (social):**
- Files: `src/SysSocialComponent/propsMapper.js`
- Why fragile: Mutates invalid props at runtime with `console.warn` / `console.error` instead of failing fast.
- Safe modification: Add unit tests for each invalid props branch; align with manifest defaults.

## Scaling Limits

**Tight coupling to @claspo/renderer and @claspo/common:**
- Current capacity: Single pinned versions in `package.json` (`@claspo/common` `7.3.0`, `@claspo/renderer` `18.7.3`).
- Limit: Any renderer SDK breaking change requires coordinated release of this package and all consumers (`claspo-widgets-plugin`, in-app, editor).
- Scaling path: Semver range with compatibility tests; `USE_LOCAL_SOURCES` alias for monorepo dev (`webpack.config.js`).

**Per-component global registration:**
- Current capacity: Webpack plugin appends `window.clComponentClass_${ComponentName}` per bundle (`webpack.config.js`).
- Limit: Global namespace pollution; name collisions if third-party plugins use same pattern.
- Scaling path: ES module exports only; registry API on renderer.

**23 parallel webpack entries:**
- Current capacity: One entry per folder under `src/` (~23 components).
- Limit: Build time grows linearly; `cache: false` amplifies cost.
- Scaling path: Shared chunks, persistent cache, optional component subsets for dev.

## Dependencies at Risk

**jest-environment-jsdom@30 beta:**
- Risk: Pre-release test environment (`^30.0.0-beta.3` in `package.json`) may change behavior or break on install.
- Impact: Flaky or breaking CI/local `npm test` without code changes.
- Migration plan: Pin stable `jest-environment-jsdom@29` aligned with `jest@29.7.0`.

**@claspo/renderer / @claspo/common exact pins:**
- Risk: No patch-level flexibility; security fixes require manual bump and retest of all components.
- Impact: Widget runtime mismatch if consumer resolves different renderer version.
- Migration plan: Document supported renderer range; add integration test job against latest compatible renderer.

## Missing Critical Features

**Automated test gate in CI:**
- Problem: Only workflow is public sync (`.github/workflows/sync-to-public.yml`); no job runs `npm test` on PR/push.
- Blocks: Regressions ship until `npm run bundle` is run manually before publish.

**Lint/format enforcement:**
- Problem: No ESLint, Prettier, or root TypeScript project in repo.
- Blocks: Consistent import style, accidental `console.log`, and unsafe patterns are not caught pre-commit.

**Published SDK documentation:**
- Problem: `README.md` is minimal install blurb; component/SDK contract undocumented in-repo for consumers.
- Blocks: Safe extension by plugin authors without reading `@claspo/renderer` source.

## Test Coverage Gaps

**No spec file at all (10 of 23 component folders):**
- What's not tested: Runtime behavior, `observeProps`, form integration, teardown.
- Files: `src/SysButtonComponent/`, `src/SysColumnComponent/`, `src/SysColumnsComponent/`, `src/SysContainerComponent/`, `src/SysCountdownTimerComponent/`, `src/SysImageComponent/`, `src/SysInAppColumnsComponent/`, `src/SysPromoCodeComponent/`, `src/SysSlideComponent/`, `src/SysTextComponent/`
- Risk: High-traffic UI (button, text, image, countdown) can break silently.
- Priority: High for `SysButtonComponent`, `SysInputComponent` (only template/email tests), `SysImageComponent`, `SysCountdownTimerComponent`

**Template-only specs (markup snapshot, not behavior):**
- What's not tested: Event handlers, validation, overlay open/close, form control registration.
- Files: `src/SysCheckboxListComponent/componentTemplate.spec.js`, `src/SysChoiceButtonsComponent/componentTemplate.spec.js`, `src/SysConsentComponent/SysConsentComponentTemplate.spec.js`, `src/SysRadioGroupComponent/componentTemplate.spec.js`, `src/SysTextAreaComponent/SysTextAreaComponentTemplate.spec.js`, `src/SysInputComponent/SysInputComponentTemplate.spec.js`, `src/SysDropdownInputComponent/componentTemplate.spec.js`, `src/SysCalendarComponent/getTemplate.spec.js`, `src/SysDateComponent/getTemplate.spec.js`
- Risk: HTML structure can pass while interaction logic regresses.
- Priority: Medium

**Behavioral coverage present but narrow:**
- What's tested: `src/SysDateComponent/SysDateComponent.spec.js`, `src/SysDropdownInputComponent/SysDropdownInputComponent.spec.js`, `src/SysInputComponent/EmailSuggesting.spec.js`, `src/SysPhoneInputComponent/PhoneInputMenu.spec.js`, `src/SysSocialComponent/SysSocialComponent.spec.js`, `src/SysSliderComponent/SysSliderComponent.spec.js`
- Risk: ~70% of components lack behavioral tests; `jest.config.js` has no coverage thresholds.
- Priority: High for form controls (`SysCalendarComponent`, `SysPhoneInputComponent` beyond menu, `SysPromoCodeComponent`)

**Rollup script outputs untested:**
- What's not tested: Stripped manifests in `out/script/` after `strip-script-manifest-fields` plugin.
- Files: `rollup.script.config.js`, `out/script/` (build artifact)
- Risk: Script embed consumers miss required manifest fields.
- Priority: Medium

---

*Concerns audit: 2026-06-03*
