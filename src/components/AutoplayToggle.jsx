import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Auto-play toggle: when on, the guided steps advance on their own every
// AUTOPLAY_MS (see StepView) and the kiosk loops from task to task — an
// unattended "attract"/training-loop mode. Tap once to stop.
export default function AutoplayToggle({ on, onToggle }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      className="ctl-btn autoplay-toggle"
      data-on={on || undefined}
      onClick={onToggle}
      aria-label={t('a11y.autoplay')}
      aria-pressed={on}
      title={on ? t('a11y.autoplayOn') : t('a11y.autoplayOff')}
    >
      <Icon name={on ? 'pause' : 'play'} size={on ? 22 : 22} />
    </button>
  )
}
