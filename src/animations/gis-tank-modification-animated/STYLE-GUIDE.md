# GIS Tank Modification — animation style guide (realistic equipment)

Goal: every step animation must look like the REAL ALFA-G GIS equipment on the
alfanar factory floor (see the controlled document photos), so the worker
instantly recognises what he is looking at. Schematic boxes are NOT acceptable.

## Component contract (unchanged)
- File: `step-N.jsx`, default export `function StepAnimation({ paused = false, reduced = false })`.
- Root: `<svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="...">`.
- All `@keyframes`/class names MUST be prefixed uniquely per step: `gN-...`
  (e.g. step 7 → `g7-spin`). Files are bundled together; collisions break loops.
- Pattern: `const anim = (base) => (reduced ? base : `${base} ${base}--anim`)`;
  wrap stage in `<g className="gN-stage" data-paused={paused ? '' : undefined}>`
  and include `.gN-stage[data-paused] * { animation-play-state: paused !important; }`.
- `reduced` = a calm representative still (no motion classes applied).
- Loops: 3–5 s, ease-in-out, infinite. One clear primary action per step.

## Realistic equipment palette (literal colors — equipment must look real)
Theme tokens are ONLY for backdrop/labels: `var(--panel)` bg card, `var(--ink2)`
captions, `var(--accent)` highlight arrows/badges, `var(--warn)` hazards,
`var(--on-accent)` badge text, `var(--font-mono)` for values.

- Panel/tank body (RAL 7035 grey): fill `#D7DAD4`, shade `#C2C6BF`, dark shade `#A9AEA6`, outline `#7C837B` (strokeWidth 2–2.5).
- Cover plates: `#E1E4DE` with outline `#8A9089`; stud rows = small circles r=2 `#9BA19A` evenly spaced around the perimeter.
- CT terminal plates: two circles side by side, face `#EDEFEA`, outline `#8A9089`, ring of ~12 bolt dots `#A9AEA6` + inner grid of terminal dots.
- Bushings (epoxy): cone/stack shape `#8C4A38`, highlight `#A75E48`, metal tip `#C8CCC9`.
- Copper busbar: `#C08040`, highlight `#D9975B`.
- Steel/fasteners/tools: `#AEB4B9`, dark steel `#6E767E`; tool handles `#D8452B` (Milwaukee-red impact wrench) or `#2B2F33`.
- Crane: girder `#F2B826` (yellow) with hoist `#2C6FB4` (blue), chain = dashed `#5A6068` line.
- SF6 gas machine: orange cart `#E0701F`, darker `#B85812`, black wheels, front panel `#1E2226` with small coloured switches; hose = black `#26292C` curve.
- O-rings/seals: `#222` ring; grease sheen `#9FD8A8` at 0.5 opacity.
- Zeolite bag: `#D9CBA8` sack with tie; scale: grey box with mono readout.
- LV box: same RAL grey with black knobs `#1E2226` and red pilot lights `#C0392B`.
- Labels/stickers: white `#FFFFFF` rect with thin `#C0392B` or `#0A82C6` bar.
- Floor line: `#F2B826` yellow marking stripe on `#B9BDB6` floor band (y≈214–224).

## The ALFA-G panel silhouette (reuse everywhere, keep proportions)
Front view (photos p.1): a TALL panel ~90w × 190h centred; from top to bottom:
1. small top bushing housing / circular cover on the roof,
2. upper LV box (grey, black knobs, 2 red pilot lights),
3. mid tank section with a large bolted cover (stud row perimeter),
4. lower section with the TWO round CT terminal plates side by side,
5. bottom bolted strip + feet.
Side/rear view: tall flat tank with 2 large bolted rectangular covers.
Draw the panel at whatever crop suits the step (zoom into the relevant zone),
but keep these recognisable features in frame.

## Production-manager storytelling (each step)
- Show the ACTION (tool turning, part moving into place) + a mono value badge
  when the document gives one (torque Nm, 20 min, 0.8 mbar, 0.05 MPa, ≥99.75%).
- Use an accent arrow/glow to point exactly where the worker must act.
- Hazard steps: small warning triangle `var(--warn)` in a corner.
- Text: `fontFamily="var(--font-mono)"`, size 11–15, keep it minimal (values,
  sizes like "17mm", counts like "×4"). No sentences inside the SVG.
