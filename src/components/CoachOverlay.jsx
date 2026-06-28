import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// One-time coaching overlay shown the first time a worker enters step mode.
// Demonstrates the gestures (mirrored for RTL) so the invisible interactions
// don't fail first-time users. "Seen" state is persisted by App.
export default function CoachOverlay({ open, onDismiss, rtl }) {
  const { t } = useI18n()
  const forwardGlyph = rtl ? 'chevron-left' : 'chevron-right'
  const backGlyph = rtl ? 'chevron-right' : 'chevron-left'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="coach"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onPointerDown={onDismiss}
        >
          {/* back side — always inline-start (dir mirrors it physically) */}
          <motion.div
            className="coach-side coach-side--back"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Icon name={backGlyph} size={64} />
            <span>{t('nav.previous')}</span>
            <small>{t('coach.tapBack')}</small>
          </motion.div>

          {/* forward side — always inline-end */}
          <motion.div
            className="coach-side coach-side--forward"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Icon name={forwardGlyph} size={64} />
            <span>{t('nav.next')}</span>
            <small>{t('coach.tapForward')}</small>
          </motion.div>

          {/* center card */}
          <motion.div
            className="coach-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.05 }}
          >
            <h2 className="display">{t('coach.title')}</h2>
            <ul>
              <li>
                <span className="coach-bullet"><Icon name="replay" size={22} /></span>
                {t('coach.center')}
              </li>
              <li>
                <span className="coach-bullet"><Icon name="x" size={22} /></span>
                {t('coach.quit')}
              </li>
            </ul>
            <button type="button" className="btn btn--primary btn--lg" onClick={onDismiss}>
              {t('coach.gotIt')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
