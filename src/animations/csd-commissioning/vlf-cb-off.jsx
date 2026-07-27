// CSD Commissioning — VLF high-voltage test with the circuit breaker OFF.
// Same connection as the breaker-ON test, but the contacts are open: the test
// voltage now stresses the open gap of the breaker as well as the insulation,
// so this is the second half of the HV test and gets its own reading. Loop ~10s.
import { Caption, Earth, INK, Locator, PHASE, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-voff"
      label="Very low frequency test set applying three times the phase voltage for one minute with the circuit breaker open, stressing the open contact gap"
    >
      <style>{`
        .cs-voff[data-paused] * { animation-play-state: paused !important; }
        ${['r', 'y', 'b'].map((p, i) => `
        .cs-w-${p}--anim { animation: cs-w-${p} 10s linear infinite; opacity: 0; }
        @keyframes cs-w-${p} {
          0%, ${i * 33.33}%            { opacity: 0; }
          ${i * 33.33 + 1}%, ${(i + 1) * 33.33 - 1}% { opacity: 1; }
          ${(i + 1) * 33.33}%, 100%    { opacity: 0; }
        }`).join('')}
        .cs-slow--anim { animation: cs-slow 2.4s linear infinite; }
        @keyframes cs-slow { to { stroke-dashoffset: -30; } }
        .cs-wave--anim { animation: cs-wave 3.2s ease-in-out infinite; }
        @keyframes cs-wave { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
        /* the open gap is the thing under stress — mark it breathing */
        .cs-gap--anim { animation: cs-gap 1.8s ease-in-out infinite; }
        @keyframes cs-gap { 0%,100% { opacity: 0.3; } 50% { opacity: 0.9; } }
        .cs-leak--anim { animation: cs-leak 3.3s linear infinite; }
        @keyframes cs-leak { 0%,20% { opacity: 0.2; } 30%,92% { opacity: 1; } 100% { opacity: 0.2; } }
        .cs-lamp--anim { animation: cs-lamp 1.2s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      <Locator cx="84" cy="112" r="72" tone="#F7EFD6" />

      {/* three phases — contacts OPEN (breaker OFF) */}
      <g transform="translate(48 64)">
        {[0, 9, 18].map((dy, i) => (
          <line key={i} x1="-14" y1={dy} x2="98" y2={dy} stroke="#8A6A4A" strokeWidth="2.2" />
        ))}
        {[['R', 0], ['Y', 36], ['B', 72]].map(([k, cx]) => (
          <g key={k} transform={`translate(${cx} 0)`}>
            <text x="0" y="40" textAnchor="middle" fontSize="15" fontWeight="700" fill={PHASE[k]}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}>{k}</text>
            <line x1="0" y1="18" x2="0" y2="46" stroke={INK} strokeWidth="2.8" />
            {/* the open gap under test */}
            <circle cx="4" cy="56" r="9" fill="#C0392B" opacity="0.3" className={anim('cs-gap')} />
            <line x1="0" y1="52" x2="12" y2="80" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            <line x1="0" y1="84" x2="0" y2="92" stroke={INK} strokeWidth="2.8" />
            <circle cx="0" cy="92" r="3.6" fill="#9AA3AB" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}
        <rect x="-12" y="86" width="96" height="11" rx="3" fill="none" stroke={INK} strokeWidth="1.8" />
      </g>

      <g>
        <rect x="34" y="30" width="98" height="18" rx="9" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.4" />
        <text x="83" y="43" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#C0392B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>BREAKER OFF</text>
      </g>

      {[
        { p: 'r', cx: 48, others: [84, 120] },
        { p: 'y', cx: 84, others: [48, 120] },
        { p: 'b', cx: 120, others: [48, 84] },
      ].map(({ p, cx, others }) => (
        <g key={p} className={reduced ? (p === 'r' ? undefined : 'cs-hide6') : anim(`cs-w-${p}`)}>
          <path
            d={`M${cx} 82 L${cx} 58 L206 58 L206 108`}
            fill="none" stroke="#D8352A" strokeWidth="2.8"
            strokeDasharray="9 7" className={anim('cs-slow')}
          />
          <circle cx={cx} cy="82" r="5" fill="none" stroke="#D8352A" strokeWidth="2.2" />
          {others.map((ox) => (
            <path key={ox} d={`M${ox} 96 L${ox} 176 L166 176`} fill="none" stroke={INK}
              strokeWidth="2.2" strokeDasharray="5 5" />
          ))}
          {others.map((ox) => <circle key={`f${ox}`} cx={ox} cy="96" r="3.4" fill={INK} />)}
        </g>
      ))}
      <style>{'.cs-hide6 { display: none; }'}</style>

      <Earth x={166} y={176} scale={1} />

      <g transform="translate(196 96)">
        <rect x="0" y="0" width="104" height="72" rx="6" fill="#DDE3E7" stroke="#9AA3AB" strokeWidth="2" />
        <rect x="0" y="-12" width="104" height="14" rx="4" fill="#C4CBD1" stroke="#9AA3AB" strokeWidth="1.4" />
        <rect x="10" y="12" width="46" height="30" rx="3" fill="#22282C" />
        <g className={anim('cs-wave')}>
          <path d="M14 30 q7 -12 14 0 q7 12 14 0 q7 -12 14 0" fill="none" stroke="#5BE39B" strokeWidth="2" />
        </g>
        <circle cx="74" cy="18" r="6" fill="#1F9D6B" className={anim('cs-lamp')} />
        <circle cx="90" cy="18" r="6" fill="#D8352A" />
        <rect x="66" y="34" width="30" height="10" rx="2" fill="#9AA3AB" />
        <rect x="10" y="50" width="84" height="12" rx="3" fill="#C4CBD1" />
        <text x="52" y="86" textAnchor="middle" fontSize="10.5" fill="#5A6672"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>VLF test set</text>
      </g>

      <g>
        <rect x="196" y="52" width="104" height="20" rx="10" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.4" />
        <text x="248" y="66" textAnchor="middle" fontSize="11" fontWeight="700" fill="#C0392B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>3 Uo · 1 min</text>
      </g>

      <g className={anim('cs-leak')}>
        <rect x="196" y="196" width="104" height="22" rx="11" fill="#DCEEF9" stroke="#0A6FA8" strokeWidth="1.4" />
        <text x="248" y="211" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>leakage &lt; 10 µA</text>
      </g>

      <Caption x={84} y={210}>open gap under test</Caption>
    </Stage>
  )
}
