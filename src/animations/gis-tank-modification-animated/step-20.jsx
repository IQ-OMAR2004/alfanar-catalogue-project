// GIS Tank Modification — Step 20: "Fix the rear-side top tank-to-tank support bracket"
// Loop: a flat tie bracket lowers across the top rear corners of two adjacent
// tanks, a square alignment indicator confirms it sits square, then a torque
// wrench sweeps and "clicks" (flash + CLICK badge) on each bolt.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Tank-to-tank support bracket bolted across the rear top of two tanks, square alignment indicator, torque wrench click"
    >
      <style>{`
        .g20-stage[data-paused] * { animation-play-state: paused !important; }

        /* bracket lowers into place across the two tank tops */
        .g20-bracket--anim { animation: g20-bracket 4.5s ease-in-out infinite; }
        @keyframes g20-bracket {
          0%       { transform: translateY(-42px); }
          22%,100% { transform: translateY(0); }
        }

        /* square alignment indicator: draws, wiggles square, turns solid */
        .g20-square--anim { animation: g20-square 4.5s ease-in-out infinite; }
        @keyframes g20-square {
          0%,22%  { opacity: 0; transform: rotate(4deg); }
          30%     { opacity: 1; transform: rotate(4deg); }
          38%     { transform: rotate(-2deg); }
          46%,72% { opacity: 1; transform: rotate(0deg); }
          80%,100%{ opacity: 0; transform: rotate(0deg); }
        }

        /* torque wrench sweeps on the bolt then "clicks" (small kickback) */
        .g20-wrench--anim { animation: g20-wrench 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g20-wrench {
          0%,44%  { transform: rotate(38deg); opacity: 0; }
          50%     { transform: rotate(38deg); opacity: 1; }
          66%     { transform: rotate(-6deg); }
          70%     { transform: rotate(-10deg); }  /* the click kick */
          72%     { transform: rotate(-4deg); }
          82%     { transform: rotate(-4deg); opacity: 1; }
          90%,100%{ transform: rotate(-4deg); opacity: 0; }
        }

        /* click flash + badge */
        .g20-click--anim { animation: g20-click 4.5s ease-in-out infinite; }
        @keyframes g20-click {
          0%,68%  { opacity: 0; transform: scale(0.6); }
          72%     { opacity: 1; transform: scale(1.15); }
          80%     { opacity: 1; transform: scale(1); }
          90%,100%{ opacity: 0; transform: scale(0.7); }
        }

        /* bolts rotate tight under the wrench */
        .g20-bolt--anim { animation: g20-bolt 4.5s ease-in-out infinite; }
        @keyframes g20-bolt {
          0%,48%   { transform: rotate(0deg); }
          70%,100% { transform: rotate(240deg); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== rear-top corner of two adjacent tanks ===== */}
      {/* left tank */}
      <rect x="18" y="96" width="128" height="118" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="18" y="96" width="128" height="12" fill="#C2C6BF" />
      <g fill="#9BA19A">
        <circle cx="34" cy="102" r="2" /><circle cx="62" cy="102" r="2" /><circle cx="90" cy="102" r="2" /><circle cx="118" cy="102" r="2" />
      </g>
      <rect x="34" y="126" width="96" height="60" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="41" cy="133" r="2" /><circle cx="65" cy="133" r="2" /><circle cx="89" cy="133" r="2" /><circle cx="113" cy="133" r="2" /><circle cx="123" cy="133" r="2" />
        <circle cx="41" cy="179" r="2" /><circle cx="65" cy="179" r="2" /><circle cx="89" cy="179" r="2" /><circle cx="113" cy="179" r="2" /><circle cx="123" cy="179" r="2" />
      </g>
      {/* right tank */}
      <rect x="174" y="96" width="128" height="118" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="174" y="96" width="128" height="12" fill="#C2C6BF" />
      <g fill="#9BA19A">
        <circle cx="190" cy="102" r="2" /><circle cx="218" cy="102" r="2" /><circle cx="246" cy="102" r="2" /><circle cx="274" cy="102" r="2" />
      </g>
      <rect x="190" y="126" width="96" height="60" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="197" cy="133" r="2" /><circle cx="221" cy="133" r="2" /><circle cx="245" cy="133" r="2" /><circle cx="269" cy="133" r="2" /><circle cx="279" cy="133" r="2" />
        <circle cx="197" cy="179" r="2" /><circle cx="221" cy="179" r="2" /><circle cx="245" cy="179" r="2" /><circle cx="269" cy="179" r="2" /><circle cx="279" cy="179" r="2" />
      </g>

      <g className="g20-stage" data-paused={paused ? '' : undefined}>
        {/* ===== tie bracket spanning the two tank tops ===== */}
        <g className={a('g20-bracket', 'g20-bracket--anim')}>
          <rect x="108" y="84" width="104" height="14" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2.5" />
          {/* down-turned ends hooking each tank flange */}
          <rect x="108" y="96" width="10" height="10" fill="#9BA1A6" stroke="#6E767E" strokeWidth="1.8" />
          <rect x="202" y="96" width="10" height="10" fill="#9BA1A6" stroke="#6E767E" strokeWidth="1.8" />
          {/* slotted holes */}
          <rect x="122" y="88" width="12" height="6" rx="3" fill="#6E767E" />
          <rect x="186" y="88" width="12" height="6" rx="3" fill="#6E767E" />
          {/* bolts through the slots */}
          <g transform="translate(128 91)">
            <g className={a('g20-bolt', 'g20-bolt--anim')}>
              <path d="M -4.6 0 L -2.3 -4 h 4.6 L 4.6 0 L 2.3 4 h -4.6 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
              <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke="#6E767E" strokeWidth="1.3" />
            </g>
          </g>
          <g transform="translate(192 91)">
            <g className={a('g20-bolt', 'g20-bolt--anim')}>
              <path d="M -4.6 0 L -2.3 -4 h 4.6 L 4.6 0 L 2.3 4 h -4.6 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
              <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke="#6E767E" strokeWidth="1.3" />
            </g>
          </g>
        </g>

        {/* ===== square alignment indicator over the bracket ===== */}
        <g
          className={a('g20-square', 'g20-square--anim')}
          style={reduced ? { opacity: 0.8 } : { transformOrigin: '160px 91px' }}
          fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round"
        >
          {/* set-square glyph at the bracket centre */}
          <rect x="146" y="72" width="28" height="28" strokeDasharray="5 4" />
          <path d="M 152 94 v -14 h 14" strokeDasharray="none" />
        </g>

        {/* ===== torque wrench on the right bolt (pivot 192,91) ===== */}
        <g transform="translate(192 91)">
          <g className={a('g20-wrench', 'g20-wrench--anim')} style={reduced ? { opacity: 0 } : undefined}>
            <circle r="7.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
            <circle r="2.8" fill="#6E767E" />
            <rect x="6" y="-3.5" width="58" height="7" rx="3.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
            {/* torque scale window */}
            <rect x="22" y="-2.2" width="14" height="4.4" rx="1.5" fill="#1E2226" />
            <rect x="46" y="-4" width="18" height="8" rx="4" fill="#D8452B" />
          </g>
        </g>

        {/* click flash + CLICK badge */}
        <g className={a('g20-click', 'g20-click--anim')} style={reduced ? { opacity: 0 } : { transformOrigin: '192px 91px' }}>
          <g stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="204" y1="76" x2="210" y2="70" />
            <line x1="208" y1="86" x2="216" y2="84" />
            <line x1="198" y1="72" x2="200" y2="64" />
          </g>
          <rect x="218" y="58" width="62" height="20" rx="5" fill="var(--accent)" />
          <text x="249" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">CLICK</text>
        </g>
      </g>

      {/* mono badges */}
      <rect x="18" y="26" width="120" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
      <text x="78" y="41" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">TANK↔TANK</text>
      <rect x="18" y="54" width="120" height="20" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1" />
      <text x="78" y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">SQUARE ∟</text>
    </svg>
  )
}
