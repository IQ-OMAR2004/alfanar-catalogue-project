import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Sits next to the language switcher on every screen and moves between the
// three sides of the kiosk. With two sections a straight toggle was enough;
// with three it opens a small menu instead, so a worker always sees where they
// are and every destination is one press away rather than two.
export const SECTIONS = [
  { id: 'wi', icon: 'instructions', label: 'section.toWi' },
  { id: 'safety', icon: 'safety', label: 'section.toSafety' },
  { id: 'quality', icon: 'quality', label: 'section.toQuality' },
]

export default function SectionSwitcher({ section, onSwitch, compact = false }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SECTIONS.find((s) => s.id === section) || SECTIONS[0]

  useEffect(() => {
    if (!open) return undefined
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
    <div className="section-switch-wrap" ref={ref}>
      <button
        type="button"
        className={`ctl-btn section-switch${compact ? ' section-switch--compact' : ''}`}
        data-to={section}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('a11y.sectionSwitch')}
        title={t(current.label)}
      >
        <Icon name={current.icon} size={22} />
        {!compact && <span className="section-switch-label">{t(current.label)}</span>}
      </button>

      {open && (
        <ul className="section-menu" role="menu">
          {SECTIONS.map((s) => (
            <li key={s.id} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={s.id === section}
                className="section-option"
                data-active={s.id === section || undefined}
                data-to={s.id}
                onClick={() => {
                  setOpen(false)
                  if (s.id !== section) onSwitch(s.id)
                }}
              >
                <Icon name={s.icon} size={22} />
                <span>{t(s.label)}</span>
                {s.id === section && <Icon name="check" size={18} className="section-check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
