# alfanar — Factory Work-Instruction Kiosk

A premium, touch-first, **multilingual standard-work-instruction (SWI) kiosk** for
the factory floor. A worker picks a task and is walked through it one full-screen
step at a time — each step shows a **looping animated demonstration**, short
**written instructions**, and an **estimated time** — navigating with simple
left/right taps and a double-tap-to-quit gesture.

Built as an **offline-first React + Vite PWA**, designed for a **wall-mounted
landscape touchscreen running fullscreen in kiosk mode**.

> ⚠️ **Content is realistic placeholder, pending SME review.** The four procedures
> and their step text are technically plausible drafts authored for the demo —
> **not** verified work instructions. Non-English strings are machine-drafted and
> flagged for native-speaker review. Confirm everything with a subject-matter
> expert before any real shop-floor use.

---

## Quick start

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build -> dist/ (generates the service worker)
npm run preview    # serve the production build (offline PWA, fullscreen-ready)
```

The app targets a **large landscape touchscreen**. In a normal desktop browser,
make the window wide/landscape (or use device toolbar at e.g. 1280×800) to see
the intended layout. Portrait/phone is intentionally out of scope for v1.

---

## Launching as a fullscreen kiosk

The app requests Fullscreen + a screen Wake Lock on first touch, and hardens
against stray input (no context menu, pinch-zoom, double-tap-zoom, pull-to-
refresh, or browser back/forward). For an unattended wall panel, also launch the
browser in kiosk mode so there is no address bar or chrome:

**Chrome / Chromium / Edge**
```bash
google-chrome --kiosk --app=http://<host>/ \
  --disable-pinch --overscroll-history-navigation=0 \
  --noerrdialogs --disable-translate --no-first-run
```

**Notes**
- Serve the built `dist/` over HTTP(S) (Fullscreen, Wake Lock and the service
  worker need a secure context — `localhost` or `https`). `npm run preview` works.
- Install it as a PWA (Add to Home Screen / Install) for a frameless launcher.
- A dedicated kiosk-browser app (e.g. a digital-signage / kiosk OS) is the most
  robust option for a permanent installation.
- Mount the panel so the **bottom-leading corner stays in reach** — that corner
  is the double-tap quit target.

---

## How it works (interaction model)

On the step screen (see `src/screens/StepView.jsx`):

| Action | Gesture |
|---|---|
| **Next step** | tap the **forward** side · swipe · `→`/`←` key · last step finishes the task |
| **Previous step** | tap the **back** side · swipe · arrow key (disabled on step 1) |
| **Replay animation** | tap the **center** · `Space`/`Enter` |
| **Quit to tasks** | **double-tap the bottom-leading corner** (or `Esc`) → confirm dialog |

**RTL mirroring (decision A):** in Arabic & Urdu the *forward* side is the **left**
(so "advance" still feels natural), and the chevrons point the right way per
locale. English & Hindi keep forward = right. The whole layout mirrors via logical
CSS properties.

Other behaviours: a one-time **coach overlay** explains the gestures on first
launch; faint persistent chevrons + a corner quit hint keep them discoverable;
the kiosk **auto-resets to task selection after 3 minutes** of inactivity.

---

## Editing content (no code required)

All tasks, steps, timings, media references and translations are **data**. See
`src/content/SCHEMA.md` for the full model.

### Add / edit a task
Drop a file in `src/content/tasks/<your-id>.js` (it's auto-discovered and sorted
by `order`). Follow the shape in `SCHEMA.md` — give every visible string in all
four languages. English is the fallback for any missing translation.

### Add a language
1. Add the locale to `src/i18n/locales.js` (code, native name, `dir`, flag, font).
2. Add a matching block to `src/content/ui.json` (app-chrome strings).
3. Add the new language key to every `{ en, ar, ur, hi, … }` field in the task
   files. Load its webfont in `index.html` and map it in `src/styles/global.css`.

### Swap real media into a step (video / gif / lottie)
The media slot is **format-agnostic** (`src/components/MediaPlayer.jsx`). Change a
step's `media` field — no screen code changes:
```js
media: { type: 'video', src: '/media/lv-box/step-1.mp4', poster: '/media/lv-box/step-1.jpg' }
// type: 'svg' (current) | 'video' | 'gif' | 'image'  — lottie hook is ready to wire
```
For the current `type: 'svg'`, `src` resolves to a component at
`src/animations/<src>.jsx`. Real footage just drops into `public/media/…` and the
type changes — the player handles the rest.

---

## Languages, direction & fonts

| Language | Code | Direction | Font |
|---|---|---|---|
| English | `en` | LTR | IBM Plex Sans / Poppins |
| العربية (Arabic) | `ar` | **RTL** | Tajawal |
| اردو (Urdu) | `ur` | **RTL** | Noto Nastaliq Urdu |
| हिन्दी (Hindi) | `hi` | LTR | Noto Sans Devanagari |

Fallback chain for any string: requested → English → first available (never
blank). Numerals are Western digits everywhere (a deliberate consistency choice).

---

## Design system

Tokens are lifted from the alfanar brand book into `src/styles/tokens.css`
(light **and** dark): the beacon blue `#0A82C6`, deep navy, mist surfaces, the
faint 34px technical grid, the signature blue-glow shadow, and the mono uppercase
micro-labels. The progress fill and focus glow read as a *guiding beacon* — the
alfanar = lighthouse motif. Theme respects `prefers-color-scheme`, can be toggled
manually, and the choice persists.

---

## Accessibility

- WCAG-AA contrast in both light and dark modes.
- Large touch targets (≥ 56–64px), no fine motor precision required.
- Fully keyboard operable (arrows, Space/Enter, Esc).
- Honors `prefers-reduced-motion` — animations render a calm still.
- Optional per-step **audio narration** (Web Speech) for low-literacy workers;
  hidden automatically where the device has no voice for the chosen language.
  The hook (`src/hooks/useSpeech.js`) is a clean slot for recorded narration later.

---

## Project structure

```
src/
├─ App.jsx                 screen state machine (gate → tasks → step → complete)
├─ main.jsx                entry + PWA service-worker registration
├─ screens/                LanguageGate · TaskGrid · StepView · Complete
├─ components/             ProgressBeacon · TapZones · MediaPlayer · SafetyBanner
│                          PPEBadge · TimeChip · ModeToggle · LangSwitcher
│                          CoachOverlay · ConfirmDialog · AudioButton · TopBar · Icon
├─ animations/<task>/      hand-authored SVG/CSS step animations (swappable slots)
├─ content/
│  ├─ tasks/<id>.js        one file per task (auto-discovered)
│  ├─ ui.json              app-chrome strings × 4 languages
│  └─ SCHEMA.md            the content data model
├─ i18n/                   locale list + provider (dir handling, fallback chain)
├─ hooks/                  useWakeLock · useFullscreen · useIdleReset
│                          useKioskGuards · useTheme · useReducedMotion · useSpeech
└─ styles/                 tokens.css · global.css · components.css · screens.css
```

---

## Tech & browser support

React 18 · Vite 5 · framer-motion (screen transitions only) · vite-plugin-pwa
(Workbox). Target the latest Chromium-based kiosk browser. Fullscreen API, Wake
Lock and `prefers-reduced-motion` degrade gracefully where unsupported.

## Out of scope for v1 (v2 candidates)
Supervisor authoring UI, sign-in / accounts, usage analytics, server sync,
printing, completion sign-off records.
