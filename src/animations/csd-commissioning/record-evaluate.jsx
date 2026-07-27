// CSD Commissioning — record the measured values and evaluate them.
// The last step of a test: readings come off the instrument onto the test form,
// each line is checked against its acceptance criterion, and the form is signed
// off. A value that lands outside the criterion is shown being flagged rather
// than ticked, because that is the decision the step is really about. Loop ~8s.
import { Caption, INK, Stage } from './parts.jsx'

const ROWS = [
  { label: 'IR', ok: true },
  { label: 'CR', ok: true },
  { label: 'TIME', ok: true },
  { label: 'FUNC', ok: false },
]

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-rec"
      label="Measured values written onto the test form and each one checked against its acceptance criterion before the form is signed"
    >
      <style>{`
        .cs-rec[data-paused] * { animation-play-state: paused !important; }
        ${ROWS.map((_, i) => `
        .cs-row${i}--anim { animation: cs-row${i} 8s linear infinite; }
        @keyframes cs-row${i} { 0%, ${10 + i * 14}% { opacity: 0; } ${16 + i * 14}%, 94% { opacity: 1; } 100% { opacity: 0; } }
        .cs-mark${i}--anim { animation: cs-mark${i} 8s linear infinite; }
        @keyframes cs-mark${i} { 0%, ${20 + i * 14}% { opacity: 0; } ${26 + i * 14}%, 94% { opacity: 1; } 100% { opacity: 0; } }`).join('')}
        .cs-sign--anim { animation: cs-sign 8s linear infinite; }
        @keyframes cs-sign { 0%,74% { opacity: 0; } 82%,94% { opacity: 1; } 100% { opacity: 0; } }
        .cs-pen--anim { animation: cs-pen 8s ease-in-out infinite; }
        @keyframes cs-pen {
          0%, 10%   { transform: translate(0, 0); }
          26%       { transform: translate(0, 26px); }
          44%       { transform: translate(0, 52px); }
          62%       { transform: translate(0, 78px); }
          82%, 100% { transform: translate(-30px, 104px); }
        }
        .cs-lamp--anim { animation: cs-lamp 1.3s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
      `}</style>

      {/* the instrument the numbers come from */}
      <g transform="translate(22 78)">
        <rect x="0" y="0" width="84" height="62" rx="6" fill="#DDE3E7" stroke="#9AA3AB" strokeWidth="2" />
        <rect x="10" y="10" width="46" height="26" rx="3" fill="#22282C" />
        <text x="33" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5BE39B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>128 MΩ</text>
        <circle cx="70" cy="18" r="5" fill="#1F9D6B" className={anim('cs-lamp')} />
        <rect x="10" y="44" width="64" height="10" rx="3" fill="#C4CBD1" />
        <Caption x={42} y={80} size={10.5}>reading</Caption>
      </g>

      {/* arrow onto the form */}
      <path d="M112 108 L146 108 M138 102 l8 6 -8 6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* the test form */}
      <g transform="translate(154 34)">
        <rect x="0" y="0" width="144" height="176" rx="5" fill="#FFFFFF" stroke="#9AA3AB" strokeWidth="2" />
        <rect x="0" y="0" width="144" height="22" rx="5" fill="#0A6FA8" />
        <text x="72" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>TEST FORM</text>

        {ROWS.map((r, i) => (
          <g key={r.label} transform={`translate(0 ${36 + i * 26})`}>
            <text x="12" y="10" fontSize="10" fill={INK}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>{r.label}</text>
            <line x1="44" y1="6" x2="104" y2="6" stroke="#D5DBE0" strokeWidth="1.4" />
            {/* the value written in */}
            <text x="48" y="10" fontSize="10" fill={INK} className={anim(`cs-row${i}`)}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>
              {['128 MΩ', '46 µΩ', '14.6 ms', 'recheck'][i]}
            </text>
            {/* pass tick or flag against the criterion */}
            <g className={anim(`cs-mark${i}`)}>
              {r.ok ? (
                <path d="M114 6 l5 6 10 -13" fill="none" stroke="#1F9D6B" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <g transform="translate(122 4)">
                  <path d="M0 -8 L8 6 L-8 6 Z" fill="#C0392B" />
                  <rect x="-1" y="-4" width="2" height="6" rx="1" fill="#FFFFFF" />
                  <circle cx="0" cy="4" r="1.1" fill="#FFFFFF" />
                </g>
              )}
            </g>
          </g>
        ))}

        {/* signature */}
        <g className={anim('cs-sign')}>
          <path d="M16 156 q10 -12 20 0 q10 12 22 -6 q8 -10 16 2" fill="none" stroke={INK}
            strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="164" x2="112" y2="164" stroke="#D5DBE0" strokeWidth="1.4" />
        </g>
      </g>

      {/* the pen travelling down the form */}
      <g className={anim('cs-pen')} transform="translate(292 62)">
        <path d="M0 0 l14 -22 6 4 -14 22 -7 3z" fill="#2E86C8" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      </g>

      <Caption x={160} y={228}>evaluate every value against its criterion</Caption>
    </Stage>
  )
}
