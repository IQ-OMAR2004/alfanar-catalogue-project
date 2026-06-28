import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { LOCALES } from '../i18n/locales.js'

// Compact current-language button that opens a popover of all four languages
// (big flag + native name targets — easy to hit with gloves). Stays available
// on every screen.
export default function LangSwitcher({ compact = false }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LOCALES.find((l) => l.code === lang) || LOCALES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lang-switch" ref={ref}>
      <button
        type="button"
        className={`ctl-btn lang-trigger${compact ? ' lang-trigger--compact' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('a11y.langSwitch')}
      >
        <Icon name="globe" size={22} />
        {!compact && (
          <>
            <span className="lang-trigger-name" lang={current.code}>
              {current.native}
            </span>
            <Icon name="chevron-right" size={16} className="lang-caret" />
          </>
        )}
      </button>

      {open && (
        <ul className="lang-menu" role="menu">
          {LOCALES.map((l) => (
            <li key={l.code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={l.code === lang}
                className="lang-option"
                data-active={l.code === lang}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                lang={l.code}
                dir={l.dir}
              >
                <span className="lang-flag" aria-hidden="true">
                  {l.flag}
                </span>
                <span className="lang-native">{l.native}</span>
                {l.code === lang && (
                  <Icon name="check" size={20} className="lang-check" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
