// Animation registry. Each step's `media.src` (e.g. "lv-box-wiring/step-1")
// resolves to the default export of src/animations/lv-box-wiring/step-1.jsx.
//
// Eager glob: all step animations are bundled into the app (they are tiny
// SVG/CSS components) so step transitions are instant and the whole set is
// precached for offline use — no async chunk fetch on the factory floor.
//
// Each animation module default-exports a React component with the signature:
//   function StepAnimation({ paused, reduced }) -> <svg>…</svg>
// where `paused` freezes the loop (center-tap) and `reduced` renders a calm,
// representative still for prefers-reduced-motion.
const modules = import.meta.glob('./**/*.jsx', { eager: true })

export function resolveAnimation(src) {
  if (!src) return null
  const mod = modules[`./${src}.jsx`]
  return mod ? mod.default : null
}

export const hasAnimation = (src) => Boolean(resolveAnimation(src))
