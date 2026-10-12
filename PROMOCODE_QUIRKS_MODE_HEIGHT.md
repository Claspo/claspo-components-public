# Promocode stretches over the content below it on pages without a doctype

- XPlanner: https://app.ardas.ua/xplanner/do/view/task?oid=16119974
- Slack: https://yespo-reteno.slack.com/archives/C025ZH6RSCE/p1788858115205639?thread_ts=1788423672.043749&cid=C025ZH6RSCE
- Date: 2026-10-02

## Problem

eSputnik account 90598, widgets 34616 and 34618 (gift box game → "Бонус відкрито!" page). On iPhones the Promocode box stretches down and its text lands on top of the explanation text below it. The editor and the preview look correct.

It shows only when all three hold:

1. the customer page has no doctype (quirks mode, `document.compatMode === 'BackCompat'`);
2. the browser is WebKit (Safari, and every browser on iOS);
3. the Promocode host has no explicit height in its model (older / migrated widgets).

A Promocode freshly added from the palette has `height: auto` and is not affected.

## Root cause

Same mechanism as the earlier quirks-mode height fix in https://github.com/Claspo/claspo-components/pull/59.

The inner `.text` button had `height: 100%`. In a quirks-mode document WebKit resolves a percentage height past an auto-height block and against the nearest flex ancestor. Here that is the view's inner wrapper, so the button became as tall as the whole view (148px) while the host stayed content-sized (43px), and the button overflowed onto the next component.

Promocode already has a guard, `handleSafariHeightIssue()`, which turns a host `height: auto` into `fit-content` and thereby stops the quirk. It fires only on a literal `'auto'`. In the affected widgets the host has no `height` key at all, so the guard does nothing.

It is not specific to iOS 26: WebKit 16.4 behaves the same.

## Fix

`src/SysPromoCodeComponent/promocodeStyles.js` — the host height reaches `.text` through flex sizing instead of a percentage:

```css
:host {
  display: flex;
  flex-direction: column;
}

.text {
  flex: 1 1 auto;   /* was: height: 100% */
}
```

`min-height: 20px` on `.text` is kept, so the box still clamps to a fixed host smaller than its content. `handleSafariHeightIssue()` is unchanged.

`src/SysPromoCodeComponent/promocodeStyles.spec.js` pins the flex host, `flex: 1 1 auto` on `.text`, and the absence of a percentage height.

## Test results

Widget 35545 (a copy of the customer widget), success view. "Button" is the inner `.text`, "host" is the component element.

| Browser | Page | Before | After |
|---|---|---|---|
| Real iPhone 15, iOS 26, Safari 26.6.1 (BrowserStack) | no doctype | button 146px, host 41px, 95px overlap | 41px / 41px, no overlap |
| Real iPhone 15, iOS 26, Safari 26.6.1 (BrowserStack) | with doctype | – | 41px / 41px, no overlap |
| Playwright WebKit 26.0 | no doctype | button 148px, host 43px, 95px overlap | 43px / 43px, no overlap |
| Playwright WebKit 16.4 | no doctype | button 148px, host 43px, 95px overlap | 43px / 43px, no overlap |
| Playwright WebKit 26.0 and 16.4 | with doctype | correct | correct, same sizes |
| Chromium 145 | no doctype, with doctype | correct | correct, same sizes |
| Playwright WebKit build 2368 ("26.6", trunk) | no doctype | correct | correct |

The trunk WebKit build no longer shows the bug even with the old stylesheet, while shipped Safari 26.6.1 still does. A later Safari may stop showing it on its own; current and older devices need the fix.

Size modes were compared before and after in WebKit 26.0, WebKit 16.4 and Chromium, in quirks and standards mode: hug, fixed 200×80, fixed 200×24 (smaller than the content), fill height, hug width. Sizes are identical.

Unit tests: 23 suites, 123 tests pass.

## How it was tested without a real subscription

The checks ran against the live prod pages with Playwright:

- the subscribe request and the prize `reserve-reward` / `reward` requests were answered locally;
- all other write requests (events) were blocked;
- the edited stylesheet from `promocodeStyles.js` was swapped into the live Promocode bundle in memory, so the real source CSS ran in the real runtime before any publish;
- on the real iPhone the script first confirmed that the local answers were in effect and would have stopped before the submit otherwise.

## How to reproduce (QA, after deploy)

1. Use a WebKit browser: iPhone Safari / Chrome / Telegram in-app browser, or BrowserStack iPhone 15 · iOS 26.
2. Open https://olegart.pp.ua/sites/es/prod/projects/project-41312-quirks.html?esDebugForm=35545&esIgnoreRules=true
3. Enter a test email, press the button, pick a gift box → "Бонус відкрито!".
4. Before the fix: the dotted Promocode box is about 148px tall and its text sits on top of "Що робити далі? …". After the fix: the box is about 43px tall and the text is 10px below it.
5. Control: the same steps on https://olegart.pp.ua/sites/es/prod/index_uk.html?esDebugForm=35545&esIgnoreRules=true must stay correct.

Use this widget or a copy of it. The manual path submits a real subscription in test account 41312.

## Release

Publish `@claspo/components` → bump it in `claspo-widgets-plugin` and upload the bundled components (stage, then prod; Claspo and eSputnik statics) → bump in `in-app-plugin`, `claspo-editor`, `esng`, `claspo-ui`, `esputnik-site-script-client`.
