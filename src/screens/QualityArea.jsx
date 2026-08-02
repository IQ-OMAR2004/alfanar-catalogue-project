import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import ModeToggle from '../components/ModeToggle.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import MediaPlayer from '../components/MediaPlayer.jsx'
import MarkKey from '../components/quality/MarkKey.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { asset } from '../utils/asset.js'

// One quality area, rendered from its own shape: the ITP is a table of tests,
// the punch list is a cleared/not-cleared ledger, the defect report is a
// gallery of damage, and the marking key is a legend. They share the header,
// the document strip and the "open the controlled original" behaviour.
export default function QualityArea({ area, onBack, onSwitchSection }) {
  const { t, tr } = useI18n()
  const [page, setPage] = useState(null) // index into area.pages, or null

  return (
    <section className="screen quality-area" style={{ '--area': area.color }}>
      <header className="zone-head">
        <button type="button" className="btn btn--ghost zone-back" onClick={onBack}>
          <Icon name="quality" size={20} />
          <span>{t('quality.back')}</span>
        </button>

        <div className="zone-title-wrap">
          <span className="quality-doc mono">{area.meta.doc}</span>
          <h1 className="zone-title display">{tr(area.title)}</h1>
        </div>

        <div className="zone-head-controls">
          <SectionSwitcher section="quality" onSwitch={onSwitchSection} compact />
          <LangSwitcher compact />
          <ModeToggle />
        </div>
      </header>

      {/* document identity — the order, project and date this came from */}
      <ul className="quality-meta">
        {Object.entries(area.meta).map(([k, v]) => (
          <li key={k} className="mono"><span>{k}</span> {v}</li>
        ))}
      </ul>

      <div className="quality-body">
        {area.id === 'itp' && <ItpTable area={area} />}
        {area.id === 'fat' && <PunchList area={area} />}
        {area.id === 'defects' && <DefectReport area={area} />}
        {area.id === 'marks' && <MarkKey area={area} />}
      </div>

      {area.pages?.length > 0 && (
        <div className="quality-pages">
          <span className="quality-pages-label mono">{t('quality.original')}</span>
          <div className="quality-pages-strip">
            {area.pages.map((src, i) => (
              <button
                key={src}
                type="button"
                className="quality-page-thumb"
                data-on={page === i || undefined}
                onClick={() => setPage(page === i ? null : i)}
                aria-label={t('quality.page', { n: i + 1 })}
              >
                <img src={asset(src)} alt="" loading="lazy" />
                <span className="mono">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {page != null && (
        <div className="quality-page-view">
          <MediaPlayer media={{ type: 'image', src: area.pages[page] }} />
        </div>
      )}
    </section>
  )
}

// ---------------------------------------------------------------- ITP table
function ItpTable({ area }) {
  const { t, tr } = useI18n()
  return (
    <div className="q-scroll">
      <ul className="itp-list">
        {area.items.map((it, i) => (
          <motion.li
            key={it.no}
            className="itp-row"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: Math.min(i * 0.03, 0.25), duration: 0.24 }}
          >
            <span className="itp-no mono">{it.no}</span>
            <div className="itp-main">
              <p className="itp-test">{tr(it.test)}</p>
              <p className="itp-proc mono">{it.proc}</p>
              <p className="itp-accept">
                <Icon name="check" size={14} />
                <span>{tr(it.accept)}</span>
              </p>
            </div>
            <div className="itp-side">
              <span className="itp-std mono">{it.std}</span>
              <span className={`itp-type itp-type--${it.type.toLowerCase()} mono`}>
                {t(`quality.type.${it.type}`)}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

// ------------------------------------------------------------- punch list
function PunchList({ area }) {
  const { t, tr } = useI18n()
  return (
    <div className="q-scroll">
      <ul className="punch-list">
        {area.items.map((it, i) => (
          <motion.li
            key={it.no}
            className="punch-row"
            data-cleared={it.cleared || undefined}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.24 }}
          >
            <span className="punch-no mono">{it.no}</span>
            <div className="punch-main">
              <p className="punch-desc">{tr(it.desc)}</p>
              <p className="punch-reply mono">{tr(it.reply)}</p>
            </div>
            <div className="punch-side">
              <span className="punch-state mono">
                <Icon name={it.cleared ? 'check' : 'warning'} size={14} />
                {it.cleared ? t('quality.cleared') : t('quality.notCleared')}
              </span>
              <span className="punch-date mono">{it.on}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

// ------------------------------------------------------------ defect report
function DefectReport({ area }) {
  const { t, tr } = useI18n()
  const STATE_ICON = { ok: 'check', damaged: 'warning', na: 'x' }
  return (
    <div className="q-scroll">
      <p className="q-intro">{tr(area.intro)}</p>

      <h2 className="q-subhead mono">{t('quality.visual')}</h2>
      <ul className="defect-grid">
        {area.observations.map((o, i) => (
          <motion.li
            key={o.no}
            className="defect-card"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.26 }}
          >
            <div className="defect-shot">
              <MediaPlayer media={{ type: 'image', src: o.photo }} />
            </div>
            <div className="defect-text">
              <span className="defect-no mono">{o.no}</span>
              <p className="defect-name">{tr(o.name)}</p>
              <p className="defect-action mono">{tr(o.action)}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <h2 className="q-subhead mono">{t('quality.functional')}</h2>
      <ul className="func-list">
        {area.functional.map((f) => (
          <li key={f.id} className="func-row" data-state={f.state}>
            <span className="func-id mono">{f.id}</span>
            <span className="func-name">{tr(f.name)}</span>
            <span className="func-state mono">
              <Icon name={STATE_ICON[f.state]} size={14} />
              {t(`quality.state.${f.state}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
