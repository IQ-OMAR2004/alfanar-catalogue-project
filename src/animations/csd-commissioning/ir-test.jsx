// CSD Commissioning — insulation resistance test (shared by the circuit
// breaker, the earthing switch and the ring main unit; all three use the same
// connection).
// 5 kV DC goes onto one phase while the other two sit at earth; the test runs
// for a minute and the window settles above 100 MΩ. The phase under test walks
// R → Y → B, which is exactly what "repeat for phase Y and B" means. Loop ~12s.
import { Caption, Earth, INK, Locator, Megger, PHASE, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-ir"
      label="Insulation tester injecting 5 kilovolts DC into one phase while the other two phases are earthed; the reading settles above 100 megaohms"
    >
      <style>{`
        .cs-ir[data-paused] * { animation-play-state: paused !important; }
        /* which phase is under test — one third of the loop each */
        ${['r', 'y', 'b'].map((p, i) => `
        .cs-live-${p}--anim { animation: cs-live-${p} 12s linear infinite; opacity: 0; }
        @keyframes cs-live-${p} {
          0%, ${i * 33.33}%            { opacity: 0; }
          ${i * 33.33 + 1}%, ${(i + 1) * 33.33 - 1}% { opacity: 1; }
          ${(i + 1) * 33.33}%, 100%    { opacity: 0; }
        }`).join('')}
        .cs-flow--anim { animation: cs-flow 0.9s linear infinite; }
        @keyframes cs-flow { to { stroke-dashoffset: -28; } }
        .cs-lamp--anim { animation: cs-lamp 1.1s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .cs-val--anim { animation: cs-val 4s ease-in-out infinite; }
        @keyframes cs-val { 0%,28% { opacity: 0.2; } 40%,92% { opacity: 1; } 100% { opacity: 0.2; } }
        .cs-hv--anim { animation: cs-hv 1.6s ease-in-out infinite; }
        @keyframes cs-hv { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
      `}</style>

      <Locator cx="96" cy="118" r="82" />

      {/* three phases into the device; contacts open (device isolated) */}
      <g transform="translate(54 68)">
        {[0, 9, 18].map((dy, i) => (
          <line key={i} x1="-16" y1={dy} x2="112" y2={dy} stroke="#8A6A4A" strokeWidth="2.4" />
        ))}
        {[['R', 0], ['Y', 42], ['B', 84]].map(([k, cx]) => (
          <g key={k} transform={`translate(${cx} 0)`}>
            <text x="0" y="42" textAnchor="middle" fontSize="17" fontWeight="700" fill={PHASE[k]}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>{k}</text>
            <line x1="0" y1="18" x2="0" y2="48" stroke={INK} strokeWidth="3" />
            <line x1="0" y1="54" x2="11" y2="82" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="86" x2="0" y2="96" stroke={INK} strokeWidth="3" />
            <circle cx="0" cy="96" r="4" fill="#9AA3AB" stroke={INK} strokeWidth="1.4" />
          </g>
        ))}
        <rect x="-14" y="90" width="112" height="12" rx="3" fill="none" stroke={INK} strokeWidth="2" />
      </g>

      {/* HV lead to the phase under test + earth links on the other two */}
      {[
        { p: 'r', cx: 54, others: [96, 138] },
        { p: 'y', cx: 96, others: [54, 138] },
        { p: 'b', cx: 138, others: [54, 96] },
      ].map(({ p, cx, others }) => (
        <g key={p} className={reduced ? (p === 'r' ? undefined : 'cs-hide') : anim(`cs-live-${p}`)}>
          {/* red HV lead from the tester's line terminal */}
          <path
            d={`M${cx} 86 L${cx} 44 L232 44 L232 118`}
            fill="none" stroke="#D8352A" strokeWidth="2.6"
            strokeDasharray="8 6" className={anim('cs-flow')}
          />
          <circle cx={cx} cy="86" r="5" fill="none" stroke="#D8352A" strokeWidth="2.2" />
          {/* the other two phases bonded to earth */}
          {others.map((ox) => (
            <path
              key={ox}
              d={`M${ox} 86 L${ox} 178 L188 178`}
              fill="none" stroke={INK} strokeWidth="2.2" strokeDasharray="5 5"
            />
          ))}
          {others.map((ox) => <circle key={`d${ox}`} cx={ox} cy="86" r="3.6" fill={INK} />)}
        </g>
      ))}
      <style>{'.cs-hide { display: none; }'}</style>

      <Earth x={188} y={178} scale={1.1} />

      <Megger x={218} y={104} value="> 100 MΩ" label="" lampClass={anim('cs-lamp')} />

      {/* HV marker */}
      <g className={anim('cs-hv')}>
        <rect x="228" y="66" width="66" height="20" rx="10" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.4" />
        <text x="261" y="80" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#C0392B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>5 kV DC</text>
      </g>

      <Caption x={96} y={216}>1 min per phase</Caption>
      <Caption x={252} y={216}>&gt; 100 MΩ</Caption>
    </Stage>
  )
}
