import { motion } from 'framer-motion'
import { useI18n } from '../../i18n/I18nProvider.jsx'

// The annotation vocabulary from the GIS work-instruction photographs, drawn
// rather than screenshotted so it stays crisp at kiosk size and can pulse the
// way the real marks are meant to catch your eye.
//
// The shapes are the ones actually used in the document: an isosceles triangle
// carrying "!" in red (92 of them) or yellow (33), a numbered green circle for
// the working sequence, and the two marker-pen colours that record who signed
// a torqued joint off.

function Triangle({ color, glyph }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <path d="M24 5 45 42H3z" fill={color} stroke="#2C343B" strokeWidth="2" strokeLinejoin="round" />
      <text
        x="24" y="37" textAnchor="middle" fontSize="20" fontWeight="700"
        fill={color === '#FFD400' ? '#2C343B' : '#FFFFFF'}
        style={{ fontFamily: 'var(--font-mono, monospace)' }}
      >
        {glyph}
      </text>
    </svg>
  )
}

function NumberCircle({ color }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <circle cx="24" cy="24" r="19" fill={color} stroke="#2C343B" strokeWidth="2" />
      <text
        x="24" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1E2A16"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}
      >
        1
      </text>
    </svg>
  )
}

// A bolt and nut with a marker stripe across both — the real "it is done" sign.
function MarkerStripe({ color }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <circle cx="24" cy="26" r="14" fill="#C9D0D6" stroke="#6E7B87" strokeWidth="1.8" />
      <path d="M24 12 36 19v14l-12 7-12-7V19z" fill="#9AA3AB" stroke="#5E6B77" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="24" cy="26" r="5.5" fill="#7A8794" stroke="#5E6B77" strokeWidth="1.4" />
      <path d="M13 34 35 16" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default function MarkKey({ area }) {
  const { t, tr } = useI18n()

  return (
    <div className="q-scroll">
      <p className="q-intro">{t('quality.marksIntro')}</p>

      <ul className="mark-list">
        {area.keys.map((k, i) => (
          <motion.li
            key={k.id}
            className="mark-row"
            style={{ '--mark': k.color }}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: Math.min(i * 0.06, 0.35), duration: 0.26 }}
          >
            <span className="mark-glyph" data-kind={k.kind}>
              {k.kind === 'triangle' && <Triangle color={k.color} glyph={k.glyph} />}
              {k.kind === 'circle' && <NumberCircle color={k.color} />}
              {k.kind === 'marker' && <MarkerStripe color={k.color} />}
            </span>
            <div className="mark-text">
              <p className="mark-name display">{tr(k.name)}</p>
              <p className="mark-means">{tr(k.means)}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* the two marker colours only mean something together */}
      <div className="mark-note">
        <span className="mark-note-label mono">{t('quality.bothMarks')}</span>
        <p>{t('quality.bothMarksBody')}</p>
      </div>
    </div>
  )
}
