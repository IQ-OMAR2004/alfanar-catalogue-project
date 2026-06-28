import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import Icon from '../components/Icon.jsx'
import DeviceToggle from '../components/DeviceToggle.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { LOCALES } from '../i18n/locales.js'

// First screen: pick a language. Big flag + native-name targets, glove-friendly.
// Heading shows in every language so a worker recognises their own.
export default function LanguageGate({ onSelect }) {
  const { setLang } = useI18n()

  const pick = (code) => {
    setLang(code)
    onSelect?.(code)
  }

  return (
    <motion.section
      className="screen gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="gate-brand"
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo height={66} />
        <span className="gate-tagline mono">Work Instructions</span>
      </motion.div>

      <div className="gate-heads">
        <h1 className="gate-heading display">Choose your language</h1>
        <p className="gate-heading-native">اختر لغتك · اپنی زبان منتخب کریں · अपनी भाषा चुनें</p>
      </div>

      <ul className="gate-grid">
        {LOCALES.map((l, i) => (
          <motion.li
            key={l.code}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 * i + 0.15, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <button
              type="button"
              className="gate-card"
              onClick={() => pick(l.code)}
              lang={l.code}
              dir={l.dir}
            >
              <span className="gate-flag" aria-hidden="true">{l.flag}</span>
              <span className="gate-native display">{l.native}</span>
              <span className="gate-en mono">{l.name}</span>
              <span className="gate-go" aria-hidden="true">
                <Icon name={l.dir === 'rtl' ? 'chevron-left' : 'chevron-right'} size={24} />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="gate-foot-row">
        <DeviceToggle withLabel />
        <p className="gate-foot mono">EST. 1976 · THE POWER OF EXCELLENCE</p>
      </div>
    </motion.section>
  )
}
