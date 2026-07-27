import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import Icon from '../components/Icon.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import ModeToggle from '../components/ModeToggle.jsx'
import DeviceToggle from '../components/DeviceToggle.jsx'
import Credit from '../components/Credit.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Second screen: after picking a language, a worker chooses what they came for
// — to be guided through a job, or to check what PPE their area requires. The
// same choice stays available everywhere from <SectionSwitcher>.
export default function SectionGate({ onPick }) {
  const { t } = useI18n()

  const cards = [
    {
      id: 'wi',
      icon: 'instructions',
      title: t('section.wi'),
      sub: t('section.wiSub'),
    },
    {
      id: 'safety',
      icon: 'safety',
      title: t('section.safety'),
      sub: t('section.safetySub'),
    },
  ]

  return (
    <section className="screen sections">
      <div className="sections-top">
        <Logo height={44} />
        <div className="topbar-controls">
          <DeviceToggle />
          <LangSwitcher />
          <ModeToggle />
        </div>
      </div>

      <div className="sections-body">
        <div className="sections-heads">
          <h1 className="sections-heading display">{t('section.heading')}</h1>
          <p className="sections-sub">{t('section.sub')}</p>
        </div>

        <ul className="sections-grid">
          {cards.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 * i + 0.1, type: 'spring', stiffness: 250, damping: 24 }}
            >
              <button
                type="button"
                className={`section-card section-card--${c.id}`}
                onClick={() => onPick(c.id)}
              >
                <span className="section-card-icon">
                  <Icon name={c.icon} size={54} />
                </span>
                <span className="section-card-title display">{c.title}</span>
                <span className="section-card-sub">{c.sub}</span>
                <span className="section-card-go" aria-hidden="true">
                  <Icon name="chevron-right" size={24} />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Credit />
    </section>
  )
}
