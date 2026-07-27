import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

// VERSION A — "putting it on".
// A worker figure that gets kitted out one item at a time, in the order the
// zone data already sorts its PPE into (cap → helmet → eyes → ears → mask →
// sleeves → gloves). Everything already fitted stays on, so at the end of the
// loop the figure shows the complete kit for the zone — which is the thing a
// worker actually has to match before walking in.
//
// Each item is anchored in percentages of the stage, so the figure scales with
// the panel and the helmet never drifts off the head.

// Anchor points: one entry per PPE item, each a list of {x, y} in % of the
// stage. Two entries = a left/right pair (ears, arms, hands).
// Derived from the figure's own geometry (viewBox 0 0 200 250): head centre
// (100,72) r34, forearms around y≈170, hands at (33,228) and (167,228).
// Spaced so that a zone needing the whole kit still reads cleanly: the head
// carries up to five items, so each anchor is at least one badge apart from its
// neighbours. The helmet sits above the cap because that is the order they go
// on — cap first, hard hat over it.
const ANCHORS = {
  safety_helmet: [{ x: 50, y: 7 }],
  safety_cap: [{ x: 50, y: 17 }],
  safety_glasses: [{ x: 50, y: 27 }],
  hearing_protection: [{ x: 30, y: 29 }, { x: 70, y: 29 }],
  dust_mask: [{ x: 50, y: 38 }],
  arm_sleeves: [{ x: 23, y: 67 }, { x: 77, y: 67 }],
  insulated_gloves: [{ x: 16.5, y: 91 }, { x: 83.5, y: 91 }],
  gloves: [{ x: 16.5, y: 91 }, { x: 83.5, y: 91 }],
}

// Where each item flies in from, so the motion reads like the real gesture:
// head gear drops from above, gloves come up from below, sleeves slide inwards.
const ENTRY = {
  safety_cap: { y: -34, x: 0 },
  safety_helmet: { y: -40, x: 0 },
  safety_glasses: { y: -22, x: 0 },
  hearing_protection: { y: 0, x: 34 },
  dust_mask: { y: -18, x: 0 },
  arm_sleeves: { y: 26, x: 20 },
  insulated_gloves: { y: 34, x: 0 },
  gloves: { y: 34, x: 0 },
}

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
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.5,
                      x: `calc(-50% + ${s === 1 ? -from.x : from.x}px)`,
                      y: `calc(-50% + ${from.y}px)`,
                    }
              }
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 320, damping: 22, mass: 0.7 }
              }
            >
              <Icon name={item} size={54} />
            </motion.span>
          ))
        })}

        {/* A soft pulse marks whichever item just went on. */}
        {!reduced && (
          <AnimatePresence>
            {(ANCHORS[active] || []).map((spot, s) => (
              <motion.span
                key={`pulse-${index}-${s}`}
                className="donning-pulse"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                initial={{ opacity: 0.55, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
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

// Plain, non-branded worker outline — deliberately featureless so it reads as
// "any worker", and drawn in the panel's own ink colour rather than a skin tone.
function WorkerFigure() {
  const S = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  return (
    <svg className="donning-figure" viewBox="0 0 200 250" aria-hidden="true">
      {/* head + neck */}
      <circle cx="100" cy="72" r="34" {...S} />
      <path d="M88 104v12M112 104v12" {...S} />
      {/* shoulders and torso */}
      <path d="M100 116c-22 0-38 8-44 20l-8 74h104l-8-74c-6-12-22-20-44-20z" {...S} />
      {/* arms */}
      <path d="M56 136 38 200l-4 22M144 136l18 64 4 22" {...S} />
      {/* hands */}
      <circle cx="33" cy="228" r="9" {...S} />
      <circle cx="167" cy="228" r="9" {...S} />
      {/* floor shadow */}
      <ellipse cx="100" cy="243" rx="52" ry="5" fill="currentColor" opacity="0.12" stroke="none" />
    </svg>
  )
}
