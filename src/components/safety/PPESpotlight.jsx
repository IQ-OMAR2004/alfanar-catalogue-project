import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'

// VERSION B — "item by item".
// One piece of PPE at a time, large, with its name and what to do with it. No
// figure: the item itself is the whole picture, which reads from further away
// across a shop floor than a small icon on a body does. A filmstrip underneath
// shows what has been covered and what is still to come, and is tappable.
export default function PPESpotlight({ items, index, color, onPick, reduced = false }) {
  const { t } = useI18n()
  const active = items[index]

  return (
    <div className="spotlight" style={{ '--zone': color }}>
      <div className="spotlight-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="spotlight-card"
            initial={reduced ? false : { opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06, y: -14 }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 26 }}
          >
            <span className="spotlight-ring" aria-hidden="true" />
            <span className="spotlight-icon">
              <Icon name={active} size={140} />
            </span>
            <span className="spotlight-no mono">
              {t('safety.step', { current: index + 1, total: items.length })}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="spotlight-caption">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-text`}
            initial={reduced ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="spotlight-name display">{t(`ppe.${active}`)}</p>
            <p className="spotlight-action">{t(`ppeAction.${active}`)}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="spotlight-strip">
        {items.map((item, i) => (
          <li key={item}>
            <button
              type="button"
              className="spotlight-chip"
              data-on={i === index || undefined}
              data-done={i < index || undefined}
              onClick={() => onPick?.(i)}
              aria-label={t(`ppe.${item}`)}
              aria-current={i === index || undefined}
            >
              <Icon name={item} size={26} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
