// CSD Commissioning — surge arrester test set-up.
// Two things the manual asks for before any arrester measurement: stand the
// CALIBRATED instrument on a firm, level, dry base (the spirit bubble centres),
// and wipe every bushing of the arresters clean (the cloth sweeps down a stack
// and the dirt marks disappear). Loop ~7s.
import { Caption, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-ss"
      label="Calibrated test instrument levelled on a firm dry base, and a cloth wiping the arrester bushings clean"
    >
      <style>{`
        .cs-ss[data-paused] * { animation-play-state: paused !important; }
        .cs-bub--anim { animation: cs-bub 7s ease-in-out infinite; }
        @keyframes cs-bub {
          0%, 6%    { transform: translateX(-11px); }
          34%, 100% { transform: translateX(0); }
        }
        .cs-ok--anim { animation: cs-ok 7s linear infinite; }
        @keyframes cs-ok { 0%,32% { opacity: 0; } 40%,100% { opacity: 1; } }
        /* cloth sweeps down the stack */
        .cs-cloth--anim { animation: cs-cloth 3.5s ease-in-out infinite; }
        @keyframes cs-cloth {
          0%       { transform: translateY(-4px); }
          100%     { transform: translateY(96px); }
        }
        ${[0, 1, 2, 3].map((i) => `
        .cs-dirt${i}--anim { animation: cs-dirt${i} 3.5s linear infinite; }
        @keyframes cs-dirt${i} { 0%, ${18 + i * 20}% { opacity: 0.75; } ${26 + i * 20}%, 100% { opacity: 0; } }`).join('')}
        .cs-cal--anim { animation: cs-cal 2.2s ease-in-out infinite; }
        @keyframes cs-cal { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>

      {/* ground / bench */}
      <rect x="0" y="196" width="320" height="44" fill="#B9BDB6" />
      <rect x="24" y="182" width="130" height="16" rx="3" fill="#8E959C" stroke={INK} strokeWidth="1.6" />

      {/* ---- levelled instrument ---- */}
      <g transform="translate(34 118)">
        <rect x="0" y="0" width="110" height="64" rx="6" fill="#DDE3E7" stroke="#9AA3AB" strokeWidth="2" />
        <rect x="10" y="10" width="52" height="28" rx="3" fill="#22282C" />
        <text x="36" y="29" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5BE39B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>READY</text>
        <circle cx="82" cy="18" r="6" fill="#1F9D6B" />
        <circle cx="98" cy="18" r="6" fill="#9AA3AB" />
        {/* calibration sticker */}
        <g className={anim('cs-cal')}>
          <rect x="70" y="34" width="34" height="18" rx="3" fill="#EAF4E9" stroke="#1F9D6B" strokeWidth="1.4" />
          <text x="87" y="47" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1F9D6B"
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>CAL</text>
        </g>
        {/* spirit level */}
        <g transform="translate(10 48)">
          <rect x="0" y="0" width="52" height="12" rx="6" fill="#EDF1F4" stroke={INK} strokeWidth="1.4" />
          <line x1="21" y1="1" x2="21" y2="11" stroke={INK} strokeWidth="1" />
          <line x1="31" y1="1" x2="31" y2="11" stroke={INK} strokeWidth="1" />
          <circle cx="26" cy="6" r="4" fill="#5BE39B" className={anim('cs-bub')} />
        </g>
      </g>
      <g className={anim('cs-ok')}>
        <text x="89" y="212" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1F9D6B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>firm · level · dry</text>
      </g>

      {/* ---- arrester being wiped ---- */}
      <g transform="translate(214 44)">
        {/* stack of sheds */}
        <rect x="-7" y="0" width="14" height="10" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.4" />
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} cx="0" cy={18 + i * 13} rx="21" ry="5.4" fill="#DDE3E7" stroke={INK} strokeWidth="1.4" />
        ))}
        <rect x="-9" y="14" width="18" height="118" fill="#DDE3E7" stroke={INK} strokeWidth="1.2" />
        <rect x="-16" y="130" width="32" height="12" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.4" />
        <line x1="0" y1="142" x2="0" y2="152" stroke={INK} strokeWidth="2.4" />
        <line x1="-12" y1="152" x2="12" y2="152" stroke={INK} strokeWidth="2.6" />
        <line x1="-8" y1="157" x2="8" y2="157" stroke={INK} strokeWidth="2.6" />
        <line x1="-4" y1="162" x2="4" y2="162" stroke={INK} strokeWidth="2.6" />

        {/* dirt marks that get wiped away */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={i % 2 ? 9 : -9} cy={26 + i * 26} rx="5" ry="3.4"
            fill="#8A6A4A" className={anim(`cs-dirt${i}`)} />
        ))}

        {/* the cloth */}
        <g className={anim('cs-cloth')}>
          <path d="M-26 14 q10 -10 20 0 q10 10 20 0 l0 16 q-10 10 -20 0 q-10 -10 -20 0z"
            fill="#EDF1F4" stroke="#9AA3AB" strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      </g>

      <Caption x={214} y={222}>clean every bushing</Caption>
    </Stage>
  )
}
