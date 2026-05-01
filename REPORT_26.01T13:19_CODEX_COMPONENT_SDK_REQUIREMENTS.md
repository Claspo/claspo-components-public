# Claspo components SDK documentation requirements (source review)

## Scope reviewed
- Component source folders under `src/` (manifest, component class, templates, styles, helpers).
- Build/export behavior in `webpack.config.js`.
- Form/validation helpers inside component folders (e.g. input validators, phone validator).

## SDK areas to document (core, must-have)
- Component packaging and registration
    - Folder and entry file naming convention (`SysXComponent/SysXComponent.js`).
    - `static define` contract (`name`, `model`, `manifest`) and how renderer loads it.
    - Build output behavior: each component bundle + global `window.clComponentClass_*` assignment.
    - Asset resolution via `this.assets()` and `assets/` folder copying.
- Base component API (renderer SDK surface used here)
    - `WcElement` and `WcControlledElement` lifecycle: `connectedCallback`, `disconnectedCallback`.
    - Data/model accessors: `getProps`, `getModel`, `getElement`, `getRootElement`, `getHostElement`,
      `getParentComponent`.
    - Observers: `observeProps`, `observeEnvironment`, `observeShared`.
    - Rendering modes: `isStaticRenderMode`, `isUpdatingRenderMode`.
    - Styling hooks: `applyAutoAdaptiveStyles`, `applyAdaptiveStyles`, `applyStylesToElement`.
    - Resource tracking: `componentResourceManager`, `viewResourceManager`, `VIEW_COMPONENT_RESOURCES_LOADED`.
    - Utilities exposed on component: `mergeTagsProcessor`, `htmlDocumentObject`.
- Services injected into components
    - `services.form` (control register/get/has).
    - `services.config` (preview modes, relative timer helpers).
    - `services.context` (records, KV map, events).
    - `services.eventEmitter` (component events).
    - `services.state` (cross-component state like country code).
    - `services.trackingService` (send, trackClick, trackTargetAction).
- Manifest schema (top-level)
    - Identification: `name`, `componentType`, `version`, `metaDescription`.
    - UI builder models: `contextMenuModel`, `floatingControlsModel`, `propertyPaneModel`.
    - I18n config: `i18n`, `i18nPropertyPaneModel`, `i18nPropPaths`.
    - Events: `events.dispatch`, `events.listen`.
    - Mapping/integration: `mappingTypes`, `integrationName`, `integrationNamePropPath`.
    - Resource loading: `waitForResourcesLoad`, `resourcesPropPaths` (incl. `:ENV` token).
    - Auto-contrast rules: `autoContrast` schema and `*ContrastEnabled` flags.
    - Behavior flags: `focusParentOnClick`, `preventDraggable`, `recursiveRemove`, `canStack`,
      `syncContentComponentName`.
- Props schema (common)
    - `content` (text, placeholders, flags, runtime options).
    - `control` (name, integrationName, defaultValue, validation, options).
    - `styles` and `adaptiveStyles` structure (`element`, `styleAttributes`, `classes`,
      `markerStyleAttributes`, `placeholderStyleAttributes`, `hoverStyleAttributes`).
    - `handlers` and action format (see `HandlerTypes` + `SysActionTypes` usage).
- Form control + validation SDK
    - `createControlWithValidation` contract, validators, callbacks, and `setValue` options (`silent`,
      `skipValidation`).
    - Validation keys and translation mapping.
    - Stored value formats for selects (JSON with `id` + `exportId`) and multi-select (map of `id` ->
      `exportId`).
    - Label controls auto-registration (consent).
- Overlay/menu SDK
    - Overlay utilities (`createMenuOverlay`, overlay styles, hover colors).
    - Search behavior for dropdowns (threshold, no-matches option).
    - Reusable style lists (`overlayContentStyles`, `dropdownMenuOptionLabelStyles`).
- Content editing + merge tags
    - `cl-inline-edit` usage and editable content mapping.
    - Merge tags processing contract.
    - Text roller config format and static vs updating rendering.

## Component-specific doc requirements (must-have)
- SysButton
    - `content.text`, icon styling, text alignment mapping.
    - Handler flow: `HandlerTypes.CLICK`, `SysActionTypes.SUBSCRIBE_CONTACT` / `REQUEST`.
    - Event names used: `SET_SUBSCRIBE_CONTACT_BUTTON_AS_INVALID/VALID`, `CONTACT_DATA_SUBMIT`.
- SysInput
    - `mappingTypes` (TEXT/INTEGER/FLOAT), `control.validation` + restrict free domains.
    - Email suggestion UX (`suggestionLabel`, provider list).
    - Input validators and error keys.
- SysTextArea
    - Max length validator (5000), placeholder usage.
- SysDate
    - `askYear`, placeholders, validation keys, date format without year (`--MM-DD`).
    - Month dropdown overlay behavior and i18n keys.
- SysCalendar
    - `onlyInFuture`, validator `SYS_CALENDAR`, mapping type DATE.
- SysPhoneInput
    - `control.countryCode`, `countriesPriority` (included list + allowOnly flag).
    - Country data source (`assets/json/country-code-options.json`) and flag sprite.
    - `services.state.currentCountryCode` usage.
    - Context record schema + phone validator.
- SysDropdownInput
    - `control.options` structure (id, label, exportId, sort).
    - Alphabetic sort toggle + search behavior.
    - Stored value format: JSON with `id` + `exportId`.
- SysRadioGroup
    - Options structure + `integrationName` mapping for radio name.
    - Marker styling (`markerStyleAttributes`) and `optionWrapper` adaptive styles.
    - Stored value format: JSON with `id` + `exportId`.
- SysCheckboxList
    - Options structure + marker styles + deprecated CSS variable mapping.
    - Stored value format: map of `id` -> `exportId`.
- SysConsent
    - Checkbox marker styling, required validation, label control registration.
    - Deprecated marker variable mapping behavior.
- SysPromoCode
    - `content.text`, `iconContent`, `countAsTargetAction`.
    - Copy-to-clipboard, tooltip translations, and context integration (`promoCode`, `lastPromoCode`).
- SysCountdownTimer
    - `endDate`, `timeZone`, `mode`, `lengthFromTheStart`, `showAgain*`, `format`.
    - Config hooks for relative timers (`get/store/clearRelativeTimerViewDate`).
- SysSlider
    - `sliderMode`, `slideIndex`, `isSlidingIntervalEnabled`, `slidingInterval`, `loopSlides`, `showArrows`,
      `showIndicator`.
    - Swiping behavior and `window.clSliderSpeed` override.
- SysSlide
    - Action handlers on slides, resource loading for background (`resourcesPropPaths`).
- SysColumns / SysInAppColumns
    - Responsive stacking rules, `isResponsive`, proportions and mobile orientation behavior.
- SysColumn
    - `content.size` (flexGrow), empty state attribute, responsive min sizes.
- SysContainer
    - `isResponsive`, aspect-ratio based direction switching.
- SysImage
    - `control.imageSource.url`, SVG vs raster handling.
    - Positioning modes (fixed/sticky) and positioning props.
    - Resource loading behavior and placeholders.
- SysVideo
    - `videoId`, `autoplay`, `aspectRatio`, `videoPreviewImageUrl`, `showPlayButton`.
    - Preview cover behavior and editor/preview differences.
- SysText
    - `content.text`, merge tags, and text roller config.
- SysSocial
    - `control.options` schema (type, order, url, image, props), `mode` (FOLLOW/SHARE).
    - Share URL templates and internal vs external link types.
    - Icon size per environment and icon shape rules.

## Questions / clarifications
- Primary audience: component authors, widget integrators, or both?
- Should docs include builder-specific property pane schema and `displayCondition`/`propPathCondition`
  expressions?
- Do you want separate pages per component or a single SDK guide with component reference tables?
- Should we document `@claspo/renderer` SDK APIs referenced here, or only this package’s usage surface?
- Preferred language for the final docs (EN or RU)?
