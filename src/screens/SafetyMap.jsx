import { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar.jsx'
import Icon from '../components/Icon.jsx'
import ReviewRibbon from '../components/ReviewRibbon.jsx'
import Credit from '../components/Credit.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { asset } from '../utils/asset.js'
import { ZONES, MAP_SRC } from '../content/safety/zones.js'

// The plant plan from the controlled PPE deck, with every zone as a real
// target on top of it. Hotspots are placed in fractions of the image, so they
// stay on their zone at any panel size — nothing is hard-coded in pixels.
//
// The plan is dense line-work, so the picture is never the only way in: the
// list beside it names every zone, and hovering or focusing either one lights
// up the other.
export default function SafetyMap({ onPick, onSwitchSection }) {
  const { t, tr } = useI18n()
  const [hot, setHot] = useState(null)

  return (
    <section className="screen safety-map">
      <TopBar>
        <SectionSwitcher section="safety" onSwitch={onSwitchSection} />
      </TopBar>

      <div className="tasks-head">
        <div>
          <h1 className="tasks-heading display">{t('safety.heading')}</h1>
          <p className="tasks-sub">{t('safety.sub')}</p>
        </div>
        <ReviewRibbon />
      </div>

      <div className="safety-body">
        <div className="safety-plan">
          <div className="safety-plan-inner">
            <img
              className="safety-plan-img"
              src={asset(MAP_SRC)}
              alt=""
              draggable="false"
            />
            {ZONES.map((z) => {
              const [x0, y0, x1, y1] = z.rect
              return (
                <button
                  key={z.id}
                  type="button"
                  className="safety-hot"
                  data-on={hot === z.id || undefined}
                  style={{
                    left: `${x0 * 100}%`,
                    top: `${y0 * 100}%`,
                    width: `${(x1 - x0) * 100}%`,
                    height: `${(y1 - y0) * 100}%`,
                    '--zone': z.color,
                  }}
                  onClick={() => onPick(z.id)}
                  onPointerEnter={() => setHot(z.id)}
                  onPointerLeave={() => setHot(null)}
                  onFocus={() => setHot(z.id)}
                  onBlur={() => setHot(null)}
                  aria-label={`${t('safety.zone', { n: z.no })} — ${tr(z.name)}`}
                >
                  <span className="safety-hot-no mono">{z.no}</span>
                </button>
              )
            })}
          </div>
        </div>

        <ul className="safety-legend">
          <li className="safety-legend-head mono">{t('safety.legend')}</li>
          {ZONES.map((z, i) => (
            <motion.li
              key={z.id}
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.24 }}
            >
              <button
                type="button"
                className="safety-legend-item"
                data-on={hot === z.id || undefined}
                style={{ '--zone': z.color }}
                onClick={() => onPick(z.id)}
                onPointerEnter={() => setHot(z.id)}
                onPointerLeave={() => setHot(null)}
                onFocus={() => setHot(z.id)}
                onBlur={() => setHot(null)}
              >
                <span className="safety-legend-swatch mono">{z.no}</span>
                <span className="safety-legend-name">{tr(z.name)}</span>
                <span className="safety-legend-count mono">
                  {t('safety.items', { n: z.ppe.length })}
                </span>
                <Icon name="chevron-right" size={18} className="safety-legend-go" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Credit />
    </section>
  )
}
