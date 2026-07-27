// CSD Commissioning — OPEN and CLOSE timing test (circuit breaker, earthing
// switch, ring main unit).
// The analyzer drives the close coil and the trip coil from the DC panel and
// times the contacts. The three phase contacts snap closed, then open, and the
// readout prints a travel time under the 20 ms limit. Loop ~6s.
import { Analyzer, Caption, Earth, INK, Locator, PHASE, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-tm"
      label="Breaker analyzer wired to the close and trip coils, timing the three phase contacts as they close and open in under 20 milliseconds"
    >
      <style>{`
        .cs-tm[data-paused] * { animation-play-state: paused !important; }
        /* contacts: closed for the first half of the loop, open for the rest */
        .cs-blade--anim { animation: cs-blade 6s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes cs-blade {
          0%, 8%     { transform: rotate(19deg); }
          14%, 54%   { transform: rotate(0deg); }
          60%, 100%  { transform: rotate(19deg); }
        }
        .cs-close--anim { animation: cs-close 6s linear infinite; }
        @keyframes cs-close { 0%,8% { opacity: 0.2; } 11%,20% { opacity: 1; } 24%,100% { opacity: 0.2; } }
        .cs-trip--anim { animation: cs-trip 6s linear infinite; }
        @keyframes cs-trip { 0%,50% { opacity: 0.2; } 54%,64% { opacity: 1; } 68%,100% { opacity: 0.2; } }
        .cs-read--anim { animation: cs-read 6s linear infinite; }
        @keyframes cs-read { 0%,20% { opacity: 0.2; } 26%,96% { opacity: 1; } 100% { opacity: 0.2; } }
        .cs-lamp--anim { animation: cs-lamp 1.2s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .cs-sig--anim { animation: cs-sig 0.8s linear infinite; }
        @keyframes cs-sig { to { stroke-dashoffset: -24; } }
      `}</style>

      <Locator cx="76" cy="112" r="66" />

      {/* three phase contacts */}
      <g transform="translate(44 64)">
        {[0, 9, 18].map((dy, i) => (
          <line key={i} x1="-14" y1={dy} x2="80" y2={dy} stroke="#8A6A4A" strokeWidth="2.2" />
        ))}
        {[['R', 0], ['Y', 32], ['B', 64]].map(([k, cx]) => (
          <g key={k} transform={`translate(${cx} 0)`}>
            <text x="0" y="40" textAnchor="middle" fontSize="15" fontWeight="700" fill={PHASE[k]}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>{k}</text>
            <line x1="0" y1="18" x2="0" y2="46" stroke={INK} strokeWidth="2.8" />
            <g transform="translate(0 48)">
              <line x1="0" y1="0" x2="0" y2="30" stroke={INK} strokeWidth="2.8" strokeLinecap="round"
                className={anim('cs-blade')} />
            </g>
            <line x1="0" y1="80" x2="0" y2="90" stroke={INK} strokeWidth="2.8" />
            <circle cx="0" cy="90" r="3.6" fill="#9AA3AB" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}
        <rect x="-12" y="84" width="88" height="11" rx="3" fill="none" stroke={INK} strokeWidth="1.8" />
      </g>

      <Earth x={44} y={186} scale={0.85} />

      {/* timing leads from the contacts to the analyzer */}
      <path d="M44 160 L44 174 M76 160 L76 178 L150 178" fill="none" stroke="#2E86C8" strokeWidth="2" strokeDasharray="6 5" className={anim('cs-sig')} />
      <path d="M108 160 L108 170 L150 170" fill="none" stroke="#E3B505" strokeWidth="2" strokeDasharray="6 5" className={anim('cs-sig')} />

      <Analyzer x={150} y={78} value="14.6 ms" lampClass={anim('cs-lamp')} />
      <g className={anim('cs-read')}>
        <rect x="208" y="86" width="44" height="16" rx="8" fill="#DCEEF9" />
      </g>

      {/* close coil / trip coil to the DC panel */}
      <g transform="translate(196 24)">
        <text x="34" y="0" textAnchor="middle" fontSize="10" fill="#5A6672"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>close coil</text>
        <path d="M0 8 q6 -9 12 0 q6 -9 12 0 q6 -9 12 0" fill="none" stroke={INK} strokeWidth="2"
          className={anim('cs-close')} />
        <text x="34" y="30" textAnchor="middle" fontSize="10" fill="#5A6672"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>trip coil</text>
        <path d="M0 38 q6 -9 12 0 q6 -9 12 0 q6 -9 12 0" fill="none" stroke={INK} strokeWidth="2"
          className={anim('cs-trip')} />
        <line x1="40" y1="8" x2="66" y2="8" stroke="#D8352A" strokeWidth="2" />
        <line x1="40" y1="38" x2="66" y2="38" stroke="#1E2226" strokeWidth="2" />
        <text x="84" y="12" textAnchor="middle" fontSize="9.5" fill="#5A6672">+ DC</text>
        <text x="84" y="42" textAnchor="middle" fontSize="9.5" fill="#5A6672">− DC</text>
      </g>

      <Caption x={76} y={214}>OPEN / CLOSE</Caption>
      <Caption x={224} y={214}>&lt; 20 msec</Caption>
    </Stage>
  )
}
