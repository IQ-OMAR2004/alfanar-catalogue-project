# Content data model

Everything the kiosk shows is data. Non-developers edit these files; no markup
changes required. **All four languages must be present for every visible
string.** Non-English strings are machine-drafted and flagged for native-speaker
+ SME review.

## A task file — `src/content/tasks/<task-id>.js`

```js
export default {
  id: 'lv-box-wiring',        // unique, kebab-case; also the URL-ish key
  order: 1,                   // sort position in the task grid
  icon: 'lv-box',             // key in src/components/Icon.jsx
  difficulty: 'intermediate', // 'basic' | 'intermediate' | 'advanced'
  ppe: ['insulated_gloves', 'safety_glasses'], // keys in ui.json > ppe
  estimatedTotalMin: 18,      // shown on the card; ideally == sum(step.estMin)
  placeholder: true,          // true => shows "pending SME review" ribbon

  title: { en: 'Wire the LV Box', ar: '…', ur: '…', hi: '…' },
  summary: { en: 'One short line…', ar: '…', ur: '…', hi: '…' }, // card subtitle

  steps: [
    {
      id: 1,                  // 1-based, sequential
      estMin: 3,              // per-step estimate (whole minutes)
      hazard: true,           // true => safety banner is emphasised
      // Media slot — format-agnostic. SVG/CSS now; swap to video|gif|lottie
      // later by changing only `type`/`src`. `src` (for type:'svg') resolves
      // to src/animations/<src>.jsx via the registry.
      media: { type: 'svg', src: 'lv-box-wiring/step-1' },

      title:        { en: 'Isolate power', ar: '…', ur: '…', hi: '…' },
      instructions: {         // 1–4 short, imperative, action-first lines
        en: ['Switch the main breaker OFF.', 'Lock and tag the isolator.'],
        ar: ['…'], ur: ['…'], hi: ['…'],
      },
      // OPTIONAL — omit the whole field if the step has no hazard.
      warning: { en: 'Do not proceed until the tester reads 0 V.', ar: '…', ur: '…', hi: '…' },
    },
  ],
}
```

### Rules
- `media.src` MUST match an animation file at `src/animations/<src>.jsx`.
- Fallback chain for any `{en,ar,ur,hi}` field: requested → English → first
  available (never blank). Implemented in `src/i18n/I18nProvider.jsx`.
- Numerals: Western digits everywhere (kiosk decision). Don't hard-code numbers
  into strings; the UI composes them.
- Add a task: drop a new `tasks/<id>.js` file — it's auto-discovered.
- Add a language: extend `locales.js`, add the locale block to `ui.json`, and add
  the key to every `{…}` content field.

## App-chrome strings — `src/content/ui.json`
Dotted keys, `{placeholder}` interpolation, accessed via `t('step.of', {current,total})`.
