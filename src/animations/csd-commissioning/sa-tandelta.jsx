// CSD Commissioning — surge arrester dissipation factor (tan δ) test.
// The power-factor set energises the arrester and resolves the current into its
// capacitive and resistive parts; the phasor sweeps out the small loss angle δ
// and the readout settles at the 0.5% criterion. Loop ~5s.
import { Caption, Earth, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-td"
      label="Power factor test set measuring the dissipation factor of a surge arrester; the loss angle is drawn and the reading settles at 0.5 percent"
    >
      <style>{`
        .cs-td[data-paused] * { animation-play-state: paused !important; }
        .cs-hv--anim { animation: cs-hv 1.1s linear infinite; }
        @keyframes cs-hv { to { stroke-dashoffset: -26; } }
        /* the loss angle opens out, then holds */
        .cs-delta--anim { animation: cs-delta 5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes cs-delta {
          0%, 10%   { transform: rotate(0deg); }
          40%, 88%  { transform: rotate(15deg); }
          100%      { transform: rotate(0deg); }
        }
        .cs-arc--anim { animation: cs-arc 5s linear infinite; }
        @keyframes cs-arc { 0%,14% { opacity: 0; } 44%,88% { opacity: 1; } 100% { opacity: 0; } }
        .cs-val--anim { animation: cs-val 5s linear infinite; }
        @keyframes cs-val { 0%,44% { opacity: 0.2; } 54%,92% { opacity: 1; } 100% { opacity: 0.2; } }
        .cs-lamp--anim { animation: cs-lamp 1.2s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      {/* ---- power factor / tan delta set ---- */}
      <g transform="translate(24 76)">
        <rect x="0" y="0" width="96" height="96" rx="6" fill="#DDE3E7" stroke="#9AA3AB" strokeWidth="2" />
        {/* the manual's switch bank: GST / UST / GST */}
        <rect x="10" y="10" width="76" height="20" rx="3" fill="#EDF1F4" stroke="#9AA3AB" strokeWidth="1.2" />
        {['GST', 'UST', 'GST'].map((t, i) => (
          <text key={i} x={22 + i * 26} y="24" textAnchor="middle" fontSize="8" fill={INK}
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>{t}</text>
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={22 + i * 26} cy="38" r="4" fill="#9AA3AB" stroke={INK} strokeWidth="1.2" />
        ))}
        {/* dials */}
        <circle cx="26" cy="64" r="12" fill="#EDF1F4" stroke={INK} strokeWidth="1.4" />
        <line x1="26" y1="64" x2="26" y2="55" stroke={INK} strokeWidth="2" />
        <circle cx="58" cy="64" r="12" fill="#EDF1F4" stroke={INK} strokeWidth="1.4" />
        <line x1="58" y1="64" x2="65" y2="58" stroke={INK} strokeWidth="2" />
        <circle cx="84" cy="58" r="5" fill="#D8352A" className={anim('cs-lamp')} />
        <rect x="74" y="70" width="16" height="16" rx="2" fill="#2E86C8" />
        <Caption x={48} y={112} size={10.5}>power factor set</Caption>
      </g>

      {/* ---- HV lead to the arrester ---- */}
      <path d="M120 92 L168 92 L168 62" fill="none" stroke="#D8352A" strokeWidth="2.6"
        strokeDasharray="8 6" className={anim('cs-hv')} />

      {/* ---- arrester ---- */}
      <g transform="translate(168 62)">
        <rect x="-11" y="-10" width="22" height="10" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.3" />
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse key={i} cx="0" cy={8 + i * 13} rx="17" ry="4.6" fill="#DDE3E7" stroke={INK} strokeWidth="1.3" />
        ))}
        <rect x="-7" y="4" width="14" height="88" fill="#DDE3E7" stroke={INK} strokeWidth="1.1" />
        <rect x="-13" y="92" width="26" height="10" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.3" />
        <line x1="0" y1="102" x2="0" y2="112" stroke={INK} strokeWidth="2.2" />
      </g>
      <Earth x={168} y={174} scale={0.9} />

      {/* ---- phasor diagram: the loss angle ---- */}
      <g transform="translate(258 150)">
        <line x1="0" y1="0" x2="0" y2="-72" stroke="#C9D2DA" strokeWidth="1.6" />
        <line x1="0" y1="0" x2="52" y2="0" stroke="#C9D2DA" strokeWidth="1.6" />
        {/* capacitive current, vertical */}
        <line x1="0" y1="0" x2="0" y2="-62" stroke="#2E86C8" strokeWidth="2.6" />
        <text x="-8" y="-64" textAnchor="end" fontSize="9.5" fill="#2E86C8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>Ic</text>
        {/* total current tips over by the loss angle */}
        <g className={anim('cs-delta')}>
          <line x1="0" y1="0" x2="0" y2="-62" stroke="#D8352A" strokeWidth="2.6" />
          <circle cx="0" cy="-62" r="3" fill="#D8352A" />
        </g>
        <path d="M0 -34 a34 34 0 0 0 9 -2" fill="none" stroke="#C0392B" strokeWidth="2"
          className={anim('cs-arc')} />
        <text x="16" y="-26" fontSize="11" fontWeight="700" fill="#C0392B"
          className={anim('cs-arc')} style={{ fontFamily: 'var(--font-mono, monospace)' }}>δ</text>
      </g>

      {/* ---- readout ---- */}
      <g className={anim('cs-val')}>
        <rect x="222" y="184" width="76" height="24" rx="12" fill="#DCEEF9" stroke="#0A6FA8" strokeWidth="1.4" />
        <text x="260" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0A6FA8"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>tan δ 0.5%</text>
      </g>
    </Stage>
  )
}
