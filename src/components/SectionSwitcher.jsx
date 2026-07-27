import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Sits next to the language switcher on every screen: one press moves between
// the work-instruction side of the kiosk and the safety side. It always shows
// where it takes you, not where you are, so it reads the same as a signpost.
//
//   section  'wi' | 'safety' — the section currently open
//   onSwitch (nextSection) => void
//   compact  icon only (the step screen's control row)
export default function SectionSwitcher({ section, onSwitch, compact = false }) {
  const { t } = useI18n()
  const next = section === 'safety' ? 'wi' : 'safety'
  const label = next === 'safety' ? t('section.toSafety') : t('section.toWi')

  return (
    <button
      type="button"
      className={`ctl-btn section-switch${compact ? ' section-switch--compact' : ''}`}
      data-to={next}
      onClick={() => onSwitch(next)}
      aria-label={t('a11y.sectionSwitch')}
      title={label}
    >
      <Icon name={next === 'safety' ? 'safety' : 'instructions'} size={22} />
      {!compact && <span className="section-switch-label">{label}</span>}
    </button>
  )
}
