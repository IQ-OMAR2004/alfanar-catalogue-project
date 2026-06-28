import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useDevice } from '../device/DeviceProvider.jsx'

// Switches between the wall-mounted kiosk layout and a portrait phone layout.
// `withLabel` renders a wider pill (used on the language gate) instead of the
// bare icon button (used in the top-bar control clusters).
export default function DeviceToggle({ withLabel = false }) {
  const { isPhone, toggle } = useDevice()
  const { t } = useI18n()
  const label = isPhone ? t('a11y.kioskView') : t('a11y.phoneView')

  if (withLabel) {
    return (
      <button
        type="button"
        className="device-pill"
        onClick={toggle}
        aria-pressed={isPhone}
      >
        <Icon name={isPhone ? 'monitor' : 'phone'} size={22} />
        <span>{isPhone ? t('gate.kiosk') : t('gate.phone')}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="ctl-btn device-toggle"
      onClick={toggle}
      aria-pressed={isPhone}
      aria-label={t('a11y.deviceToggle')}
      title={label}
    >
      <Icon name={isPhone ? 'monitor' : 'phone'} size={24} />
    </button>
  )
}
