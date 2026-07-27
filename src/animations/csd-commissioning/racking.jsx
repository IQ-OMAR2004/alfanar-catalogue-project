// CSD Commissioning — verification of breaker indications while racking in and
// out. The racking handle turns, the truck travels between TEST and SERVICE,
// and the three indications on the front plate are checked as it moves: the
// spring CHARGED/DISCHARGED flag, the CLOSED/OPEN flag, and the operations
// counter stepping on. Loop ~8s.
import { Caption, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-rk"
      label="Racking handle turning as the breaker truck travels between test and service position, while the charged, closed and counter indications are checked"
    >
      <style>{`
        .cs-rk[data-paused] * { animation-play-state: paused !important; }
        .cs-handle--anim { animation: cs-handle 1.6s linear infinite; transform-origin: 0 0; }
        @keyframes cs-handle { to { transform: rotate(360deg); } }
        /* truck travels in, holds, travels out */
        .cs-truck--anim { animation: cs-truck 8s ease-in-out infinite; }
        @keyframes cs-truck {
          0%, 6%    { transform: translateX(0); }
          32%, 62%  { transform: translateX(46px); }
          88%, 100% { transform: translateX(0); }
        }
        .cs-charged--anim { animation: cs-charged 8s linear infinite; }
        @keyframes cs-charged { 0%,30% { opacity: 0.25; } 36%,86% { opacity: 1; } 92%,100% { opacity: 0.25; } }
        .cs-closed--anim { animation: cs-closed 8s linear infinite; }
        @keyframes cs-closed { 0%,44% { opacity: 0.25; } 50%,80% { opacity: 1; } 86%,100% { opacity: 0.25; } }
        .cs-count--anim { animation: cs-count 8s steps(1) infinite; }
        @keyframes cs-count { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        .cs-count2--anim { animation: cs-count2 8s steps(1) infinite; }
        @keyframes cs-count2 { 0%,49% { opacity: 0; } 50%,100% { opacity: 1; } }
        .cs-pos--anim { animation: cs-pos 8s linear infinite; }
        @keyframes cs-pos { 0%,26% { opacity: 0.2; } 34%,60% { opacity: 1; } 68%,100% { opacity: 0.2; } }
      `}</style>

      {/* cubicle */}
      <rect x="26" y="30" width="268" height="176" rx="5" fill="#B9C2C9" stroke={INK} strokeWidth="2" />
      <rect x="38" y="42" width="244" height="152" rx="3" fill="#C9D0D6" stroke="#9AA3AB" strokeWidth="1.4" />

      {/* rails the truck runs on */}
      <line x1="52" y1="182" x2="268" y2="182" stroke="#9AA3AB" strokeWidth="3" />
      <line x1="52" y1="176" x2="268" y2="176" stroke="#9AA3AB" strokeWidth="1.6" strokeDasharray="6 6" />

      {/* TEST / SERVICE markers */}
      <g className={anim('cs-pos')}>
        <text x="196" y="198" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>SERVICE</text>
      </g>
      <text x="96" y="198" textAnchor="middle" fontSize="10" fill="#7A8794"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}>TEST</text>

      {/* the breaker truck + front plate */}
      <g className={anim('cs-truck')}>
        <g transform="translate(60 58)">
          <rect x="0" y="0" width="118" height="118" rx="4" fill="#DDE3E7" stroke={INK} strokeWidth="2" />

          {/* rating plate */}
          <rect x="10" y="10" width="40" height="24" rx="2" fill="#FFFFFF" stroke="#9AA3AB" strokeWidth="1.2" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="14" y1={16 + i * 5} x2="46" y2={16 + i * 5} stroke="#9AA3AB" strokeWidth="1" />
          ))}

          {/* CLOSE / OPEN pushbuttons */}
          <circle cx="86" cy="20" r="8" fill="#1F9D6B" stroke={INK} strokeWidth="1.5" />
          <circle cx="86" cy="44" r="8" fill="#D8352A" stroke={INK} strokeWidth="1.5" />

          {/* CHARGED / DISCHARGED flag */}
          <rect x="10" y="46" width="26" height="14" rx="2" fill="#EDF1F4" stroke={INK} strokeWidth="1.4" />
          <rect x="11" y="47" width="24" height="12" rx="1.5" fill="#E3B505" className={anim('cs-charged')} />

          {/* CLOSED / OPEN flag */}
          <rect x="10" y="66" width="26" height="14" rx="2" fill="#EDF1F4" stroke={INK} strokeWidth="1.4" />
          <rect x="11" y="67" width="24" height="12" rx="1.5" fill="#1F9D6B" className={anim('cs-closed')} />

          {/* operations counter */}
          <rect x="10" y="88" width="34" height="16" rx="2" fill="#22282C" stroke={INK} strokeWidth="1.4" />
          <text x="27" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5BE39B"
            className={anim('cs-count')} style={{ fontFamily: 'var(--font-mono, monospace)' }}>0041</text>
          <text x="27" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5BE39B"
            className={anim('cs-count2')} style={{ fontFamily: 'var(--font-mono, monospace)' }}>0042</text>

          {/* racking socket + handle */}
          <circle cx="86" cy="86" r="9" fill="#8E959C" stroke={INK} strokeWidth="1.6" />
          <g transform="translate(86 86)">
            <g className={anim('cs-handle')}>
              <line x1="0" y1="0" x2="26" y2="0" stroke={INK} strokeWidth="4" strokeLinecap="round" />
              <circle cx="26" cy="0" r="4.5" fill={INK} />
            </g>
          </g>
        </g>
      </g>

      <Caption x={160} y={222}>check every indication as the truck travels</Caption>
    </Stage>
  )
}
