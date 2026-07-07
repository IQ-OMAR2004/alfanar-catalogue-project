# GIS Case 1 (S1→S3 transfer) — animation style guide (realistic equipment)

Goal: every step animation must look like the REAL equipment in the Case-1
photographs (public/media/gis-case1/img1…21.jpg), so a worker instantly
recognises what he is looking at. No abstract boxes.

## Component contract (identical to the other GIS animations)
- File `step-N.jsx`, default export `function StepAnimation({ paused = false, reduced = false })`.
- Root `<svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="...">`.
- Prefix every `@keyframes` and class uniquely per step: `c1s7-…` for step 7 (c1 = case 1). Files bundle together; collisions break loops.
- Helper: `const anim = (base) => (reduced ? base : `${base} ${base}--anim`)`.
- Wrap the moving scene in `<g className="c1sN-stage" data-paused={paused ? '' : undefined}>` and include `.c1sN-stage[data-paused] * { animation-play-state: paused !important; }`.
- `reduced` = a calm representative still (no motion classes). Loops 3–5 s, ease-in-out, infinite, ONE clear primary action.
- Text: `fontFamily="var(--font-mono)"`, size 8–15, values/labels only — no sentences.

## Realistic palette (literal colours — equipment must look real)
Theme tokens ONLY for backdrop/labels: `var(--panel)` card bg, `var(--ink2)` captions, `var(--accent)` highlight arrows/badges, `var(--warn)` hazards, `var(--on-accent)` badge text.

- GIS tank / enclosure (RAL 7035 grey): fill `#D7DAD4`, shade `#C2C6BF`, dark `#A9AEA6`, outline `#7C837B` (2–2.5). Cover plates `#E1E4DE`, outline `#8A9089`; stud rows = r≈2 circles `#9BA19A`.
- **DS/ES mechanism** (img1–3): grey control box `#E1E4DE`; red STATUS-INDICATOR label `#C0392B` with white text; a round dial with red "ES CLOSE/OPEN" + blue "DS" arrows; brass chain sprockets `#C9A227` linked by a dark chain (dashed `#5A6068`); grey ribbon of control wires `#9FB6CC` at the top; harting connectors = beige blocks `#D8CBA6` labelled A/D/E.
- **Internal busbars (BB)** (img4–7): silver-plated flat bars `#D9DDE0` with a soft iridescent sheen, holes at the ends, outline `#8A9099`.
- **Circuit breaker (VCB)** (img8–10): grey control box top `#DADED8` with two black knobs `#1E2226`, red `#C0392B` + amber pilots, a small counter window; the three breaker POLES below = brown epoxy cylinders `#7C3A2B`/highlight `#9B5240`; all on a BLUE trolley/frame `#2C6FB4` with a draw-bar; red "INC." marker text.
- **Cable bushings** (img11–12): brown epoxy CONE (wide hex flange top, tapering down) `#7C3A2B` body, `#9B5240` highlight, top flange ring with brass bolt dots `#C9A227`, hollow dark socket in the centre. Stand upright on white foam `#EDEAE0`.
- **Closing sheets / cover plates** (img13–14): pale cream-green plate `#Dfe4d2` with a black O-ring loop `#222` around the rim, a bright aluminium ring flange `#C9CED4` in the middle, perimeter stud holes.
- **Empty tank / scrap** (img15): open grey enclosure showing internal flange rings (circles with bolt-dot rings) on the floor; yellow/red floor tape.
- **Cleaning** (img16): worker arm in a dark sleeve with a GREEN chemical gauntlet `#2E9E5B` reaching through a round bushing hole; white tissue `#F2F2EE`; methanol bottle `#FFFFFF` with red flammable diamond `#C0392B`.
- **CTs** (img17–18): tan/brown toroidal ring `#B98C55` (current transformer) wrapped in clear film, black secondary wires `#26292C` coiled around it, on white foam.
- **Zeolite housing / cover rings** (img19–20): bright machined aluminium ring flange `#C9CED4` with a ring of bolt holes and an inner threaded bore; grey outline.
- **DILO SF6 analyzer** (img21): black hard case `#26292C`, ORANGE faceplate `#E0701F` with "SF6" text and a dark LCD screen, yellow port caps `#E8C020`, chrome quick-couplings, a coiled grey sample hose.
- **SF6 gas machine**: orange cart `#E0701F`/`#B85812`, black wheels, dark control panel `#1E2226` with small switches; black hose `#26292C`.
- Crane: girder `#F2B826`, hoist `#2C6FB4`, chain dashed `#5A6068`, hook steel.
- Fasteners/tools: steel `#AEB4B9`/`#6E767E`; ratchet/Allen handles `#2B2F33`; impact wrench body Milwaukee-red `#D8452B`.
- O-rings/seals `#222`; grease sheen `#9FD8A8` @0.5; floor band `#B9BDB6` with yellow stripe `#F2B826` at y≈214.

## Story per step (production-manager clarity)
- Show the ACTION (part lifting in/out, tool turning, wiping, gas flow) with an
  accent arrow/glow pointing exactly where the worker acts.
- Dismantle steps: part moves OUT/up and away. Assemble steps: part moves IN/down
  into the tank. Keep the S1 vs S3 sense consistent.
- Value badges where the step names one (20 min, 0.8 mbar, ≥99.75%, −25 °C,
  1 mm gap, P1↑/P2↓). Use mono font.
- Hazard steps: small warning triangle `var(--warn)` in a corner.
- Prefer flat fills + the shade tones above; gradients sparingly. 4–10 shapes,
  readable at kiosk size.
