import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// High-contrast hazard strip for steps flagged `hazard: true`. Reads the
// step's localized `warning` text. The triangle pulses subtly to draw the eye
// from a metre away (calmed by prefers-reduced-motion).
export default function SafetyBanner({ text }) {
  const { t } = useI18n()
  if (!text) return null
  return (
    <div className="safety-banner" role="alert">
      <span className="safety-banner-ic">
        <Icon name="warning" size={30} />
      </span>
      <span className="safety-banner-text">
        <span className="safety-banner-label mono">{t('step.warning')}</span>
        <span className="safety-banner-msg">{text}</span>
      </span>
    </div>
  )
}
