import { motion } from 'framer-motion'
import TopBar from '../components/TopBar.jsx'
import Icon from '../components/Icon.jsx'
import ReviewRibbon from '../components/ReviewRibbon.jsx'
import Credit from '../components/Credit.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { QUALITY_AREAS } from '../content/quality/index.js'

// The quality side's entry screen: the four things a worker or an inspector
// might come here for — the plan that says what gets tested, the punch list
// from the last factory acceptance test, what a damaged panel actually looks
// like, and the meaning of the marks on the work-instruction photographs.
export default function QualityHome({ onPick, onSwitchSection }) {
  const { t, tr } = useI18n()

  return (
    <section className="screen quality-home">
      <TopBar>
        <SectionSwitcher section="quality" onSwitch={onSwitchSection} />
      </TopBar>

      <div className="tasks-head">
        <div>
          <h1 className="tasks-heading display">{t('quality.heading')}</h1>
          <p className="tasks-sub">{t('quality.sub')}</p>
        </div>
        <ReviewRibbon />
      </div>

      <ul className="quality-grid">
        {QUALITY_AREAS.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.06 * i + 0.05, type: 'spring', stiffness: 240, damping: 24 }}
          >
            <button
              type="button"
              className="quality-card"
              style={{ '--area': a.color }}
              onClick={() => onPick(a.id)}
            >
              <span className="quality-card-icon">
                <Icon name={a.icon} size={40} />
              </span>
              <span className="quality-card-body">
                <span className="quality-card-title display">{tr(a.title)}</span>
                <span className="quality-card-sub">{tr(a.sub)}</span>
              </span>
              <span className="quality-card-meta mono">
                {a.meta.order || a.meta.doc}
              </span>
              <span className="quality-card-go" aria-hidden="true">
                <Icon name="chevron-right" size={22} />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <Credit />
    </section>
  )
}
