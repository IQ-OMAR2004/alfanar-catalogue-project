// CSD Commissioning — surge arrester leakage current test.
// The EHV/HV test set energises the arrester at its rated voltage. The earth
// strap is deliberately DISCONNECTED first so the whole leakage current is
// forced through the clamp meter, which reads it. Criterion 30 mA. The
// disconnect is animated because forgetting it is what makes the reading wrong.
// Loop ~6s.
import { Caption, Earth, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-lk"
      label="High voltage set energising a surge arrester with the earth strap disconnected so a clamp meter reads the whole leakage current, which must not exceed 30 milliamps"
    >
      <style>{`
        .cs-lk[data-paused] * { animation-play-state: paused !important; }
        /* the earth strap swings away first */
        .cs-strap--anim { animation: cs-strap 6s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes cs-strap {
          0%, 6%    { transform: rotate(0deg); }
          20%, 92%  { transform: rotate(-42deg); }
          100%      { transform: rotate(0deg); }
        }
        .cs-warnx--anim { animation: cs-warnx 6s linear infinite; }
        @keyframes cs-warnx { 0%,12% { opacity: 0; } 22%,92% { opacity: 1; } 100% { opacity: 0; } }
        /* then the HV is applied and the current flows through the clamp */
        .cs-hv--anim { animation: cs-hv 6s linear infinite; }
        @keyframes cs-hv { 0%,24% { opacity: 0.15; } 34%,92% { opacity: 1; } 100% { opacity: 0.15; } }
        .cs-dash--anim { animation: cs-dash 1s linear infinite; }
        @keyframes cs-dash { to { stroke-dashoffset: -24; } }
        .cs-read--anim { animation: cs-read 6s linear infinite; }
        @keyframes cs-read { 0%,40% { opacity: 0.2; } 50%,92% { opacity: 1; } 100% { opacity: 0.2; } }
        .cs-lamp--anim { animation: cs-lamp 1.1s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      <rect x="0" y="200" width="320" height="40" fill="#B9BDB6" />

      {/* ---- HV test vehicle / set ---- */}
      <g transform="translate(16 108)">
        <rect x="0" y="0" width="104" height="62" rx="6" fill="#DDE3E7" stroke="#9AA3AB" strokeWidth="2" />
        <rect x="10" y="10" width="46" height="26" rx="3" fill="#22282C" />
        <text x="33" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5BE39B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>HV ON</text>
        <circle cx="76" cy="18" r="6" fill="#D8352A" className={anim('cs-lamp')} />
        <circle cx="92" cy="18" r="6" fill="#1F9D6B" />
        <rect x="66" y="34" width="30" height="16" rx="3" fill="#9AA3AB" />
        <rect x="8" y="44" width="46" height="12" rx="3" fill="#C4CBD1" />
        <circle cx="22" cy="70" r="10" fill="#3A4048" stroke={INK} strokeWidth="1.8" />
        <circle cx="82" cy="70" r="10" fill="#3A4048" stroke={INK} strokeWidth="1.8" />
        <Caption x={52} y={100} size={10.5}>EHV / HV tester</Caption>
      </g>

      {/* ---- HV lead to the arrester top ---- */}
      <g className={anim('cs-hv')}>
        <path d="M120 118 L168 118 L168 56" fill="none" stroke="#D8352A" strokeWidth="2.8"
          strokeDasharray="8 6" className={anim('cs-dash')} />
      </g>

      {/* ---- arrester ---- */}
      <g transform="translate(168 56)">
        <rect x="-11" y="-10" width="22" height="10" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.3" />
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse key={i} cx="0" cy={8 + i * 13} rx="17" ry="4.6" fill="#DDE3E7" stroke={INK} strokeWidth="1.3" />
        ))}
        <rect x="-7" y="4" width="14" height="88" fill="#DDE3E7" stroke={INK} strokeWidth="1.1" />
        <rect x="-13" y="92" width="26" height="10" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.3" />
      </g>

      {/* ---- earth strap, disconnected for the measurement ---- */}
      <g transform="translate(168 158)">
        <circle cx="0" cy="0" r="4" fill={INK} />
        <g className={anim('cs-strap')}>
          <line x1="0" y1="0" x2="0" y2="30" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="30" r="3.4" fill="#D8352A" />
        </g>
      </g>
      <Earth x={168} y={196} scale={0.85} />
      <g className={anim('cs-warnx')} transform="translate(196 176)">
        <circle cx="0" cy="0" r="11" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.8" />
        <path d="M-4.5 -4.5 L4.5 4.5 M4.5 -4.5 L-4.5 4.5" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <Caption x={168} y={228} size={10.5}>earth disconnected</Caption>

      {/* ---- clamp meter on the leakage path ---- */}
      <g transform="translate(240 120)" className={anim('cs-hv')}>
        <path d="M-76 38 L-14 38" fill="none" stroke="#E3B505" strokeWidth="2.6"
          strokeDasharray="7 5" className={anim('cs-dash')} />
        <rect x="-14" y="6" width="56" height="64" rx="7" fill="#E8C31B" stroke="#A88F13" strokeWidth="2" />
        <path d="M2 6 a16 16 0 1 1 24 0" fill="none" stroke="#A88F13" strokeWidth="7" />
        <rect x="-6" y="22" width="40" height="22" rx="3" fill="#22282C" />
        <text x="14" y="38" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#5BE39B"
          className={anim('cs-read')} style={{ fontFamily: 'var(--font-mono, monospace)' }}>18 mA</text>
        <circle cx="14" cy="56" r="5" fill="#A88F13" />
      </g>

      <g className={anim('cs-read')}>
        <rect x="212" y="200" width="96" height="22" rx="11" fill="#DCEEF9" stroke="#0A6FA8" strokeWidth="1.4" />
        <text x="260" y="215" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>≤ 30 mA</text>
      </g>
    </Stage>
  )
}
