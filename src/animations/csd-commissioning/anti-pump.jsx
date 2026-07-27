// CSD Commissioning — anti-pump (Y-relay) function verification.
// A finger holds the close pushbutton in. The breaker closes once; the
// anti-pump relay picks up, seals in, and opens its contact in the close
// circuit — so however long the signal is held, no second close happens. That
// "one close only" behaviour is the whole point of the check. Loop ~7s.
import { Caption, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-ap"
      label="Close pushbutton held in: the breaker closes once, the anti-pump relay seals in and opens its contact in the close circuit, blocking any further close"
    >
      <style>{`
        .cs-ap[data-paused] * { animation-play-state: paused !important; }
        /* finger presses and stays down */
        .cs-finger--anim { animation: cs-finger 7s ease-in-out infinite; }
        @keyframes cs-finger {
          0%, 8%    { transform: translateY(-16px); }
          16%, 92%  { transform: translateY(0); }
          100%      { transform: translateY(-16px); }
        }
        .cs-btn--anim { animation: cs-btn 7s ease-in-out infinite; }
        @keyframes cs-btn { 0%,8% { opacity: 0.55; } 16%,92% { opacity: 1; } 100% { opacity: 0.55; } }
        /* close signal flows only in the first moment */
        .cs-sig--anim { animation: cs-sig 7s linear infinite; }
        @keyframes cs-sig { 0%,14% { opacity: 0.15; } 18%,30% { opacity: 1; } 34%,100% { opacity: 0.15; } }
        .cs-dash--anim { animation: cs-dash 0.7s linear infinite; }
        @keyframes cs-dash { to { stroke-dashoffset: -22; } }
        /* relay energises and seals in */
        .cs-coil--anim { animation: cs-coil 7s linear infinite; }
        @keyframes cs-coil { 0%,26% { opacity: 0.25; } 32%,92% { opacity: 1; } 100% { opacity: 0.25; } }
        /* the contact in the close circuit opens and stays open */
        .cs-nc--anim { animation: cs-nc 7s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes cs-nc {
          0%, 28%   { transform: rotate(0deg); }
          36%, 92%  { transform: rotate(-26deg); }
          100%      { transform: rotate(0deg); }
        }
        /* breaker closes once, then nothing */
        .cs-cb--anim { animation: cs-cb 7s ease-in-out infinite; }
        @keyframes cs-cb { 0%,20% { opacity: 0.25; } 26%,92% { opacity: 1; } 100% { opacity: 0.25; } }
        .cs-block--anim { animation: cs-block 7s ease-in-out infinite; }
        @keyframes cs-block { 0%,40% { opacity: 0; } 50%,92% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      {/* ---- close pushbutton with a finger on it ---- */}
      <g transform="translate(58 74)">
        <circle cx="0" cy="0" r="30" fill="#2A2E33" stroke={INK} strokeWidth="2" />
        <circle cx="0" cy="0" r="21" fill="#D8352A" stroke="#7A1C15" strokeWidth="2" className={anim('cs-btn')} />
        <g className={anim('cs-finger')}>
          <path d="M-8 -58 q8 -14 16 0 l0 22 q-8 8 -16 0z" fill="#E8D5C0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M-14 -34 q14 10 28 0 l0 12 q-14 8 -28 0z" fill="#E8D5C0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        </g>
        <Caption x={0} y={52}>CLOSE held</Caption>
      </g>

      {/* ---- close circuit ---- */}
      <g transform="translate(110 60)">
        {/* supply rail */}
        <line x1="0" y1="0" x2="176" y2="0" stroke={INK} strokeWidth="2" />
        <text x="-6" y="4" textAnchor="end" fontSize="11" fill="#5A6672"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>+</text>

        {/* close signal path */}
        <g className={anim('cs-sig')}>
          <path d="M20 0 L20 30" fill="none" stroke="#D8352A" strokeWidth="2.6"
            strokeDasharray="7 5" className={anim('cs-dash')} />
        </g>

        {/* anti-pump normally-closed contact, opens when the relay seals in */}
        <g transform="translate(20 34)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={INK} strokeWidth="2.4" />
          <g transform="translate(0 6)">
            <line x1="0" y1="0" x2="0" y2="20" stroke={INK} strokeWidth="2.6" strokeLinecap="round"
              className={anim('cs-nc')} />
          </g>
          <line x1="0" y1="28" x2="0" y2="34" stroke={INK} strokeWidth="2.4" />
          <text x="10" y="20" fontSize="10" fill="#5A6672"
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>52Y</text>
        </g>

        {/* close coil */}
        <g transform="translate(20 74)">
          <path d="M-9 0 q9 -12 18 0 q9 -12 18 0" fill="none" stroke={INK} strokeWidth="2.2"
            transform="rotate(90 0 0)" />
          <circle cx="0" cy="18" r="7" fill="none" stroke={INK} strokeWidth="2" className={anim('cs-cb')} />
          <text x="14" y="22" fontSize="10" fill="#5A6672"
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>52C</text>
        </g>

        {/* anti-pump relay coil, sealed in */}
        <g transform="translate(120 34)" className={anim('cs-coil')}>
          <rect x="-26" y="0" width="52" height="30" rx="4" fill="#EAF4E9" stroke="#1F9D6B" strokeWidth="2" />
          <text x="0" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1F9D6B"
            style={{ fontFamily: 'var(--font-mono, monospace)' }}>52Y</text>
          <circle cx="0" cy="-8" r="4" fill="#1F9D6B" />
        </g>
        <line x1="120" y1="0" x2="120" y2="34" stroke={INK} strokeWidth="2" />
        <line x1="120" y1="64" x2="120" y2="112" stroke={INK} strokeWidth="2" />

        {/* return rail */}
        <line x1="0" y1="112" x2="176" y2="112" stroke={INK} strokeWidth="2" />
        <line x1="20" y1="98" x2="20" y2="112" stroke={INK} strokeWidth="2" />
        <text x="-6" y="116" textAnchor="end" fontSize="11" fill="#5A6672"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>−</text>
      </g>

      {/* verdict */}
      <g className={anim('cs-block')} transform="translate(160 208)">
        <rect x="-92" y="-16" width="184" height="26" rx="13" fill="#EAF4E9" stroke="#1F9D6B" strokeWidth="1.6" />
        <text x="0" y="2" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1F9D6B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>one close only — no pumping</text>
      </g>
    </Stage>
  )
}
