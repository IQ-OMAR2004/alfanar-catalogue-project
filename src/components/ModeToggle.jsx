import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useTheme } from '../hooks/useTheme.js'

// Manual light/dark switch (persists; respects system until first toggle).
export default function ModeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="ctl-btn mode-toggle"
      onClick={toggle}
      aria-label={t('a11y.themeToggle')}
      aria-pressed={isDark}
      title={isDark ? t('a11y.lightMode') : t('a11y.darkMode')}
    >
      <span className="ctl-icon" data-on={isDark}>
        <Icon name="sun" size={26} />
        <Icon name="moon" size={24} />
      </span>
    </button>
  )
}
