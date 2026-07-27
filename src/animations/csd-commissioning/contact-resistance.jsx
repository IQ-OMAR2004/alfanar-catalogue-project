// CSD Commissioning — contact resistance test (circuit breaker, earthing
// switch and ring main unit share this connection).
// 100 A is injected across the closed contact of one phase for a minute and the
// set reads the resistance across it. The phase under test walks R → Y → B.
// Loop ~12s.
import { Caption, CurrentSet, INK, Locator, PHASE, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-cr"
      label="Contact resistance set injecting 100 amps across the closed contact of one phase, repeated for each phase"
    >
      <style>{`
        .cs-cr[data-paused] * { animation-play-state: paused !important; }
        ${['r', 'y', 'b'].map((p, i) => `
        .cs-c-${p}--anim { animation: cs-c-${p} 12s linear infinite; opacity: 0; }
        @keyframes cs-c-${p} {
          0%, ${i * 33.33}%            { opacity: 0; }
          ${i * 33.33 + 1}%, ${(i + 1) * 33.33 - 1}% { opacity: 1; }
          ${(i + 1) * 33.33}%, 100%    { opacity: 0; }
        }`).join('')}
        /* heavy current: fat, fast dashes both ways round the loop */
        .cs-amp--anim { animation: cs-amp 0.55s linear infinite; }
        @keyframes cs-amp { to { stroke-dashoffset: -30; } }
        .cs-glow--anim { animation: cs-glow 1s ease-in-out infinite; }
        @keyframes cs-glow { 0%,100% { opacity: 0.25; r: 7px; } 50% { opacity: 0.75; r: 11px; } }
        .cs-lamp--anim { animation: cs-lamp 0.9s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      <Locator cx="96" cy="118" r="82" />

      {/* three phases, contacts CLOSED for this test */}
      <g transform="translate(54 68)">
        {[0, 9, 18].map((dy, i) => (
          <line key={i} x1="-16" y1={dy} x2="112" y2={dy} stroke="#8A6A4A" strokeWidth="2.4" />
        ))}
        {[['R', 0], ['Y', 42], ['B', 84]].map(([k, cx]) => (
          <g key={k} transform={`translate(${cx} 0)`}>
            <text x="0" y="42" textAnchor="middle" fontSize="17" fontWeight="700" fill={PHASE[k]}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>{k}</text>
            <line x1="0" y1="18" x2="0" y2="96" stroke={INK} strokeWidth="3" />
            <circle cx="0" cy="96" r="4" fill="#9AA3AB" stroke={INK} strokeWidth="1.4" />
          </g>
        ))}
        <rect x="-14" y="90" width="112" height="12" rx="3" fill="none" stroke={INK} strokeWidth="2" />
      </g>

      {/* injection loop onto the phase under test */}
      {[
        { p: 'r', cx: 54 },
        { p: 'y', cx: 96 },
        { p: 'b', cx: 138 },
      ].map(({ p, cx }) => (
        <g key={p} className={reduced ? (p === 'r' ? undefined : 'cs-hide2') : anim(`cs-c-${p}`)}>
          {/* current out and back — the two heavy leads of the set */}
          <path
            d={`M${cx} 74 L${cx} 40 L236 40 L236 106`}
            fill="none" stroke="#D8352A" strokeWidth="3.4"
            strokeDasharray="10 6" className={anim('cs-amp')}
          />
          <path
            d={`M${cx} 158 L${cx} 190 L236 190 L236 150`}
            fill="none" stroke="#1E2226" strokeWidth="3.4"
            strokeDasharray="10 6" className={anim('cs-amp')}
          />
          <circle cx={cx} cy="74" r="5" fill="none" stroke="#D8352A" strokeWidth="2.2" />
          <circle cx={cx} cy="158" r="5" fill="none" stroke="#1E2226" strokeWidth="2.2" />
          {/* the contact being measured */}
          <circle cx={cx} cy="116" r="9" fill="#D8352A" opacity="0.3" className={anim('cs-glow')} />
        </g>
      ))}
      <style>{'.cs-hide2 { display: none; }'}</style>

      <CurrentSet x={216} y={98} value="µΩ" lampClass={anim('cs-lamp')} />

      <g>
        <rect x="222" y="62" width="62" height="20" rx="10" fill="#DCEEF9" stroke="#0A6FA8" strokeWidth="1.4" />
        <text x="253" y="76" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>100 A</text>
      </g>

      <Caption x={96} y={216}>1 min per phase</Caption>
      <Caption x={252} y={216}>record & evaluate</Caption>
    </Stage>
  )
}
