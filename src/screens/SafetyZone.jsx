import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import PPEBadge from '../components/PPEBadge.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import ModeToggle from '../components/ModeToggle.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import PPEDonning from '../components/safety/PPEDonning.jsx'
import PPESpotlight from '../components/safety/PPESpotlight.jsx'
import { useSequence } from '../components/safety/useSequence.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { ZONES } from '../content/safety/zones.js'

// What a worker must be wearing before entering one zone, played as a looping
// animation. Two styles are built and switchable side by side while the shop
// decides which one it wants — see <PPEDonning> and <PPESpotlight>.
const VIEWS = [
  { id: 'donning', icon: 'safety', label: 'safety.donning' },
  { id: 'spotlight', icon: 'zoom', label: 'safety.spotlight' },
]

export default function SafetyZone({ zone, onBack, onPickZone, onSwitchSection }) {
  const { t, tr } = useI18n()
  const reduced = useReducedMotion()
  const [view, setView] = useState('donning')

  const items = zone.ppe
  const seq = useSequence(items.length, {
    stepMs: view === 'donning' ? 1500 : 2600,
    holdMs: view === 'donning' ? 2600 : 3000,
    reduced,
  })

  const i = ZONES.findIndex((z) => z.id === zone.id)
  const prev = ZONES[(i - 1 + ZONES.length) % ZONES.length]
  const next = ZONES[(i + 1) % ZONES.length]

  return (
    <section className="screen safety-zone" style={{ '--zone': zone.color }}>
      <header className="zone-head">
        <button type="button" className="btn btn--ghost zone-back" onClick={onBack}>
          <Icon name="map" size={22} />
          <span>{t('safety.back')}</span>
        </button>

        <div className="zone-title-wrap">
          <span className="zone-no mono">{t('safety.zone', { n: zone.no })}</span>
          <h1 className="zone-title display">{tr(zone.name)}</h1>
        </div>

        <div className="zone-head-controls">
          {/* Both animation styles are live — this picks between them. */}
          <div className="view-toggle" role="group" aria-label={t('safety.view')}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className="view-toggle-btn"
                data-on={view === v.id || undefined}
                onClick={() => {
                  setView(v.id)
                  seq.replay()
                }}
              >
                <Icon name={v.icon} size={18} />
                <span>{t(v.label)}</span>
              </button>
            ))}
          </div>
          <SectionSwitcher section="safety" onSwitch={onSwitchSection} compact />
          <LangSwitcher compact />
          <ModeToggle />
        </div>
      </header>

      <div className="zone-body">
        <div className="zone-anim">
          {view === 'donning' ? (
            <PPEDonning items={items} index={seq.index} color={zone.color} reduced={reduced} />
          ) : (
            <PPESpotlight
              items={items}
              index={seq.index}
              color={zone.color}
              onPick={seq.goTo}
              reduced={reduced}
            />
          )}

          <div className="zone-anim-controls">
            <button
              type="button"
              className="ctl-btn"
              onClick={seq.togglePause}
              aria-label={seq.paused ? t('nav.next') : t('step.paused')}
            >
              <Icon name={seq.paused ? 'play' : 'pause'} size={20} />
            </button>
            <button
              type="button"
              className="ctl-btn"
              onClick={seq.replay}
              aria-label={t('safety.replay')}
            >
              <Icon name="replay" size={20} />
            </button>
          </div>
        </div>

        <aside className="zone-side">
          <div className="zone-side-block">
            <span className="zone-side-label mono">{t('safety.before')}</span>
            <p className="zone-side-lead">{t('safety.order')}</p>
          </div>

          <ol className="zone-ppe-list">
            {items.map((item, n) => (
              <li key={item}>
                <button
                  type="button"
                  className="zone-ppe-row"
                  data-on={n === seq.index || undefined}
                  data-done={n < seq.index || undefined}
                  onClick={() => seq.goTo(n)}
                >
                  <span className="zone-ppe-no mono">{n + 1}</span>
                  <PPEBadge item={item} />
                  {n === seq.index && <Icon name="chevron-right" size={18} className="zone-ppe-go" />}
                </button>
              </li>
            ))}
          </ol>

          <p className="zone-note mono">
            <Icon name="shield" size={14} />
            <span>{t('safety.note')}</span>
          </p>

          <nav className="zone-nav">
            <button type="button" className="btn btn--ghost" onClick={() => onPickZone(prev.id)}>
              <Icon name="chevron-left" size={20} />
              <span>{t('safety.prev')}</span>
            </button>
            <button type="button" className="btn btn--primary" onClick={() => onPickZone(next.id)}>
              <span>{t('safety.next')}</span>
              <Icon name="chevron-right" size={20} />
            </button>
          </nav>
        </aside>
      </div>
    </section>
  )
}
