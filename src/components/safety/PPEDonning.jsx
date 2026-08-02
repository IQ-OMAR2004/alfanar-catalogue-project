import { AnimatePresence, motion } from 'framer-motion'
import PPEArt, { hasPPEArt } from '../PPEArt.jsx'
import Icon from '../Icon.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

// VERSION A — "putting it on".
// A worker figure that gets kitted out one item at a time, in the order the
// zone data already sorts its PPE into (cap → helmet → eyes → ears → mask →
// sleeves → gloves). Everything already fitted stays on, so at the end of the
// loop the figure shows the complete kit for the zone — which is the thing a
// worker actually has to match before walking in.
//
// The items are the full-colour <PPEArt> illustrations, not outline glyphs, so
// the hard hat looks like a hard hat from across the aisle. Each is anchored in
// percentages of the stage, so the figure scales with the panel and the helmet
// never drifts off the head.

// Each item is placed where it is actually worn, sized to the body part it
// covers — not parked in a badge beside the figure. Coordinates are the centre
// of the item in % of the stage; `w` is its width in % of the stage, derived
// from the figure's own geometry (head at 50%/24% about 30% wide, ears at
// 35% and 65%, shoulders at 38%, hands at 23% and 77%, feet at 90%).
//
// Hearing protection is a SINGLE entry spanning the head: one headband
// defender with a cup over each ear, worn and drawn as one piece of equipment.
const ANCHORS = {
  safety_helmet: [{ x: 50, y: 16.5, w: 36 }],
  safety_cap: [{ x: 50, y: 18.5, w: 32 }],
  arc_flash_hood: [{ x: 50, y: 22, w: 42 }],
  hearing_protection: [{ x: 50, y: 24, w: 42 }],
  face_shield: [{ x: 50, y: 25, w: 38 }],
  safety_glasses: [{ x: 50, y: 25, w: 29 }],
  dust_mask: [{ x: 50, y: 29.5, w: 26 }],
  hi_vis: [{ x: 50, y: 50, w: 46 }],
  arm_sleeves: [{ x: 28, y: 54, w: 15 }, { x: 72, y: 54, w: 15 }],
  gloves: [{ x: 23, y: 83, w: 17 }, { x: 77, y: 83, w: 17 }],
  insulated_gloves: [{ x: 23, y: 83, w: 17 }, { x: 77, y: 83, w: 17 }],
  safety_boots: [{ x: 42, y: 90, w: 17 }, { x: 58, y: 90, w: 17 }],
  fume_extraction: [{ x: 84, y: 30, w: 20 }],
}

// Where each item flies in from, so the motion reads like the real gesture:
// head gear drops from above, gloves and boots come up from below, sleeves and
// the vest slide inwards.
const ENTRY = {
  safety_helmet: { y: -42, x: 0 },
  safety_cap: { y: -36, x: 0 },
  hearing_protection: { y: -34, x: 0 },
  safety_glasses: { y: -24, x: 0 },
  face_shield: { y: -28, x: 0 },
  arc_flash_hood: { y: -38, x: 0 },
  dust_mask: { y: -20, x: 0 },
  hi_vis: { y: -26, x: 0 },
  arm_sleeves: { y: 22, x: 24 },
  fume_extraction: { y: 0, x: 26 },
  safety_boots: { y: 32, x: 0 },
  insulated_gloves: { y: 34, x: 0 },
  gloves: { y: 34, x: 0 },
}

const size = (w) => `${w}%`

export default function PPEDonning({ items, index, color, reduced = false }) {
  const { t } = useI18n()
  const active = items[index]

  return (
    <div className="donning" style={{ '--zone': color }}>
      <div className="donning-stage">
        <WorkerFigure />

        {items.map((item, i) => {
          if (i > index) return null // not fitted yet
          const spots = ANCHORS[item] || [{ x: 50, y: 50 }]
          const isNew = i === index
          const from = ENTRY[item] || { y: -24, x: 0 }
          return spots.map((spot, s) => (
              <motion.span
                key={`${item}-${s}`}
                className="donning-item"
                data-new={isNew || undefined}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  inlineSize: size(spot.w),
                }}
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.55,
                        x: `calc(-50% + ${s === 1 ? -from.x : from.x}px)`,
                        y: `calc(-50% + ${from.y}px)`,
                      }
                }
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 21, mass: 0.75 }
                }
              >
                {/* the art fills the placement box, so it is sized to the body
                    part it covers rather than to a badge */}
                {hasPPEArt(item) ? (
                  <PPEArt name={item} size="100%" />
                ) : (
                  <Icon name={item} size="100%" />
                )}
              </motion.span>
          ))
        })}

        {/* A soft halo marks whichever item just went on. */}
        {!reduced && (
          <AnimatePresence>
            {(ANCHORS[active] || []).map((spot, s) => (
              <motion.span
                key={`pulse-${index}-${s}`}
                className="donning-pulse"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  inlineSize: `${spot.w * 1.15}%`,
                  aspectRatio: '1',
                }}
                initial={{ opacity: 0.55, scale: 0.7 }}
                animate={{ opacity: 0, scale: 1.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="donning-caption">
        <span className="donning-caption-no mono">
          {t('safety.step', { current: index + 1, total: items.length })}
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="donning-caption-name display">{t(`ppe.${active}`)}</p>
            <p className="donning-caption-action">{t(`ppeAction.${active}`)}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// A plain worker seen from the front — deliberately featureless so it reads as
// "any worker", and drawn in flat neutral tones rather than a skin colour, with
// only enough shape (head, neck, shoulders, arms, hands, legs, feet) for the
// PPE to have somewhere convincing to land.
function WorkerFigure() {
  const BODY = 'currentColor'
  return (
    <svg className="donning-figure" viewBox="0 0 200 260" aria-hidden="true">
      <defs>
        <linearGradient id="donning-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={BODY} stopOpacity="0.30" />
          <stop offset="45%" stopColor={BODY} stopOpacity="0.16" />
          <stop offset="100%" stopColor={BODY} stopOpacity="0.30" />
        </linearGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="100" cy="250" rx="54" ry="6" fill={BODY} opacity="0.14" />

      {/* legs + boots */}
      <path d="M84 168h32l4 62a4 4 0 0 1-4 4h-12l-4-50-4 50H88a4 4 0 0 1-4-4z"
        fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="2" strokeLinejoin="round" />

      {/* torso: shoulders tapering to the waist */}
      <path d="M100 100c-18 0-32 7-38 18l-6 54h88l-6-54c-6-11-20-18-38-18z"
        fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.55" strokeWidth="2.4" strokeLinejoin="round" />

      {/* arms hanging at the sides */}
      <path d="M62 122 50 178l-3 30M138 122l12 56 3 30"
        fill="none" stroke={BODY} strokeOpacity="0.5" strokeWidth="11" strokeLinecap="round" />

      {/* hands */}
      <circle cx="46" cy="216" r="11" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="154" cy="216" r="11" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="2" />

      {/* neck + head */}
      <path d="M92 88h16v14H92z" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="2" />
      <ellipse cx="100" cy="62" rx="30" ry="33" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.55" strokeWidth="2.4" />
      {/* ears — the headband defender sits over these */}
      <ellipse cx="70" cy="64" rx="5" ry="8" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="1.8" />
      <ellipse cx="130" cy="64" rx="5" ry="8" fill="url(#donning-body)" stroke={BODY} strokeOpacity="0.5" strokeWidth="1.8" />
    </svg>
  )
}
