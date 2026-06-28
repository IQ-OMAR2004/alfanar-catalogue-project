import Logo from './Logo.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import ModeToggle from './ModeToggle.jsx'
import DeviceToggle from './DeviceToggle.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Persistent top chrome for the non-step screens: the official alfanar logo on
// the leading side, language + theme controls on the trailing side. The
// language switcher and theme toggle stay available everywhere.
export default function TopBar({ showTitle = true, children }) {
  const { t } = useI18n()
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <Logo height={40} />
        {showTitle && (
          <span className="topbar-tag">
            <span className="topbar-divider" aria-hidden="true" />
            <span className="topbar-sub mono">{t('app.subtitle')}</span>
          </span>
        )}
      </div>

      <div className="topbar-controls">
        {children}
        <DeviceToggle />
        <LangSwitcher />
        <ModeToggle />
      </div>
    </header>
  )
}
