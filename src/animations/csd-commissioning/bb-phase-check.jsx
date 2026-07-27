// CSD Commissioning — busbar phase checking.
// 1 kV DC from the IR tester goes onto one end of a busbar; the far end is
// shorted to earth through a switch. Closing the switch completes the loop and
// the reading falls to zero, which proves both ends are the same phase. The
// phase under test walks R → Y → B. Loop ~12s.
import { Caption, Earth, INK, Megger, PHASE, Stage } from './parts.jsx'

const BARS = [
  { k: 'B', y: 62 },
  { k: 'Y', y: 88 },
  { k: 'R', y: 114 },
]

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-bp"
      label="One kilovolt DC applied to one end of a busbar with the far end shorted to earth; the reading falls to zero, proving both ends are the same phase"
    >
      <style>{`
        .cs-bp[data-paused] * { animation-play-state: paused !important; }
        ${['b', 'y', 'r'].map((p, i) => `
        .cs-p-${p}--anim { animation: cs-p-${p} 12s linear infinite; opacity: 0; }
        @keyframes cs-p-${p} {
          0%, ${i * 33.33}%            { opacity: 0; }
          ${i * 33.33 + 1}%, ${(i + 1) * 33.33 - 1}% { opacity: 1; }
          ${(i + 1) * 33.33}%, 100%    { opacity: 0; }
        }`).join('')}
        .cs-flow--anim { animation: cs-flow 0.8s linear infinite; }
        @keyframes cs-flow { to { stroke-dashoffset: -26; } }
        /* the shorting switch closes a moment into each phase */
        .cs-sw--anim { animation: cs-sw 4s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes cs-sw { 0%,14% { transform: rotate(-32deg); } 22%,92% { transform: rotate(0deg); } 100% { transform: rotate(-32deg); } }
        .cs-zero--anim { animation: cs-zero 4s linear infinite; }
        @keyframes cs-zero { 0%,22% { opacity: 0.15; } 30%,92% { opacity: 1; } 100% { opacity: 0.15; } }
        .cs-lamp--anim { animation: cs-lamp 1.1s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      {/* three busbars */}
      {BARS.map(({ k, y }) => (
        <g key={k}>
          <text x="26" y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={PHASE[k]}
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>{k}</text>
          <line x1="40" y1={y} x2="196" y2={y} stroke={PHASE[k]} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      ))}

      {/* per-phase test connection */}
      {BARS.map(({ k, y }, i) => {
        const p = k.toLowerCase()
        return (
          <g key={p} className={reduced ? (k === 'R' ? undefined : 'cs-hide3') : anim(`cs-p-${p}`)}>
            {/* HV lead from the far end up to the tester */}
            <path
              d={`M196 ${y} L226 ${y} L226 128`}
              fill="none" stroke="#D8352A" strokeWidth="2.6"
              strokeDasharray="8 6" className={anim('cs-flow')}
            />
            <circle cx="196" cy={y} r="4.5" fill="none" stroke="#D8352A" strokeWidth="2" />

            {/* near end: the switch to be closed / shorted, down to earth */}
            <path d={`M40 ${y} L40 ${y + 26}`} fill="none" stroke={INK} strokeWidth="2.4" />
            <g transform={`translate(40 ${y + 26})`}>
              <line x1="0" y1="0" x2="22" y2="0" stroke={INK} strokeWidth="2.4" strokeLinecap="round"
                className={anim('cs-sw')} />
              <circle cx="0" cy="0" r="2.6" fill={INK} />
              <circle cx="22" cy="0" r="2.6" fill={INK} />
            </g>
            <path d={`M62 ${y + 26} L62 174`} fill="none" stroke={INK} strokeWidth="2.4" />
            <text x="74" y={y + 30} fontSize="9.5" fill="#5A6672"
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>close / short</text>
          </g>
        )
      })}
      <style>{'.cs-hide3 { display: none; }'}</style>

      <Earth x={62} y={174} scale={1} />

      <Megger x={228} y={112} value="0 Ω" lampClass={anim('cs-lamp')} />
      <g className={anim('cs-zero')}>
        <rect x="238" y="176" width="76" height="20" rx="10" fill="#EAF4E9" stroke="#1F9D6B" strokeWidth="1.4" />
        <text x="276" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F9D6B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>same phase</text>
      </g>

      <g>
        <rect x="228" y="72" width="74" height="20" rx="10" fill="#DCEEF9" stroke="#0A6FA8" strokeWidth="1.4" />
        <text x="265" y="86" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>1 kV DC</text>
      </g>

      <Caption x={112} y={218}>resistance must read zero</Caption>
    </Stage>
  )
}
