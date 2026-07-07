// Case 1 — Step 14: "Assemble: fit the DS/ES"
// The grey DS/ES mechanism (round dial, brass chain sprockets, A/D/E Harting
// blocks) lowers DOWN into the S3 tank along two guide pins. The black O-ring in
// the flange groove is highlighted with a green grease sheen; the Harting
// control wires reconnect. Warning triangle: pinched O-ring / suspended part.
// Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Grey DS/ES mechanism with dial and chain sprockets lowering into the S3 tank on guide pins, black O-ring greased, Harting connectors reconnected"
    >
      <style>{`
        .c1s14-stage[data-paused] * { animation-play-state: paused !important; }
        /* DS/ES box descends onto the flange along the guide pins */
        .c1s14-drop--anim { animation: c1s14-drop 5s ease-in-out infinite; }
        @keyframes c1s14-drop {
          0%,10%   { transform: translate(0,-52px); }
          60%,100% { transform: translate(0,0); }
        }
        .c1s14-arr--anim { animation: c1s14-arr 5s ease-in-out infinite; }
        @keyframes c1s14-arr {
          0%,8%    { opacity: 0; }
          20%,55%  { opacity: 1; }
          70%,100% { opacity: 0; }
        }
        /* O-ring green grease sheen glows once seated */
        .c1s14-grease--anim { animation: c1s14-grease 5s ease-in-out infinite; }
        @keyframes c1s14-grease {
          0%,55%   { opacity: 0; }
          70%,90%  { opacity: 1; }
          100%     { opacity: 0.4; }
        }
        /* harting wires reconnect: dashes flow into the connectors */
        .c1s14-wire--anim { animation: c1s14-wire 1.2s linear infinite; }
        @keyframes c1s14-wire { 0%{stroke-dashoffset:14;} 100%{stroke-dashoffset:0;} }
        /* status indicator confirms after seating */
        .c1s14-status--anim { animation: c1s14-status 5s ease-in-out infinite; }
        @keyframes c1s14-status { 0%,68%{opacity:.3;} 80%,100%{opacity:1;} }
        .c1s14-warn--anim { animation: c1s14-warn 2.3s ease-in-out infinite; }
        @keyframes c1s14-warn { 0%,100%{opacity:.65;} 50%{opacity:1;} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* warning triangle — pinched O-ring / suspended part */}
      <g className={anim('c1s14-warn')} transform="translate(294 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* down arrow — assembly direction */}
      <g className={anim('c1s14-arr')} transform="translate(150 46)" style={reduced ? { opacity: 0 } : undefined}>
        <path d="M 0 -12 v 24 M -8 4 l 8 10 l 8 -10" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ===== S3 tank with the open flange + O-ring groove (front) ===== */}
      <g transform="translate(0 0)">
        <rect x="70" y="150" width="180" height="64" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* flange face */}
        <rect x="82" y="150" width="156" height="14" rx="3" fill="#C2C6BF" stroke="#8A9089" strokeWidth="1.6" />
        {/* black O-ring in its groove */}
        <rect x="88" y="154" width="144" height="6" rx="3" fill="#222" />
        {/* green grease sheen on the O-ring */}
        <rect className={anim('c1s14-grease')} x="88" y="153" width="144" height="7" rx="3.5" fill="#9FD8A8" style={reduced ? { opacity: 0.4 } : undefined} />
        {/* two guide pins standing up from the flange */}
        <rect x="96" y="118" width="4" height="34" rx="2" fill="#8A9099" stroke="#6E767E" strokeWidth="1" />
        <rect x="220" y="118" width="4" height="34" rx="2" fill="#8A9099" stroke="#6E767E" strokeWidth="1" />
      </g>

      <g className="c1s14-stage" data-paused={paused ? '' : undefined}>
        <g className={anim('c1s14-drop')} style={reduced ? { transform: 'translate(0,-16px)' } : undefined}>
          {/* ===== DS/ES mechanism box ===== */}
          <g transform="translate(84 58)">
            {/* grey control box */}
            <rect x="0" y="0" width="152" height="66" rx="5" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2.2" />
            {/* guide-pin holes at the base corners */}
            <circle cx="14" cy="60" r="3" fill="#A9AEA6" stroke="#7C837B" strokeWidth="1.2" />
            <circle cx="138" cy="60" r="3" fill="#A9AEA6" stroke="#7C837B" strokeWidth="1.2" />

            {/* grey ribbon of control wires at the top */}
            <rect x="30" y="-8" width="92" height="8" rx="3" fill="#9FB6CC" stroke="#7E93A8" strokeWidth="1.2" />
            {[36, 46, 56, 66, 76, 86, 96, 106, 116].map((wx) => (
              <line key={wx} x1={wx} y1="-8" x2={wx} y2="0" stroke="#7E93A8" strokeWidth="1" />
            ))}

            {/* red STATUS-INDICATOR label */}
            <g className={anim('c1s14-status')} style={reduced ? { opacity: 1 } : undefined}>
              <rect x="8" y="8" width="44" height="14" rx="2" fill="#C0392B" />
              <text x="30" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#FFFFFF">STATUS</text>
            </g>

            {/* round dial: red ES arrows + blue DS arrows */}
            <g transform="translate(84 30)">
              <circle cx="0" cy="0" r="18" fill="#F2F2EE" stroke="#6E767E" strokeWidth="2" />
              <path d="M -10 -6 A 12 12 0 0 1 8 -8" fill="none" stroke="#C0392B" strokeWidth="2.4" markerEnd="" />
              <path d="M 8 -8 l 2 4 l -4 1 Z" fill="#C0392B" />
              <path d="M -8 8 A 12 12 0 0 0 10 6" fill="none" stroke="#2C6FB4" strokeWidth="2.4" />
              <path d="M 10 6 l 2 -4 l -4 -1 Z" fill="#2C6FB4" />
              <text x="0" y="2" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#3A3F3B">ES</text>
              <circle cx="0" cy="0" r="2.4" fill="#2B2F33" />
            </g>

            {/* brass chain sprockets linked by a dark chain */}
            <g transform="translate(122 32)">
              <circle cx="0" cy="0" r="8" fill="#C9A227" stroke="#9A7A18" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="3" fill="#8A6D12" />
              <circle cx="18" cy="12" r="6" fill="#C9A227" stroke="#9A7A18" strokeWidth="1.4" />
              <circle cx="18" cy="12" r="2.2" fill="#8A6D12" />
              <path d="M -6 6 L 12 17" fill="none" stroke="#5A6068" strokeWidth="2.4" strokeDasharray="3 2" />
            </g>

            {/* Harting connector blocks A / D / E along the base */}
            {[{ x: 24, l: 'A' }, { x: 62, l: 'D' }, { x: 100, l: 'E' }].map(({ x, l }) => (
              <g key={l} transform={`translate(${x} 48)`}>
                <rect x="0" y="0" width="20" height="12" rx="2" fill="#D8CBA6" stroke="#A89A6E" strokeWidth="1.4" />
                <text x="10" y="9" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#5A5230">{l}</text>
              </g>
            ))}
          </g>
        </g>

        {/* ===== Harting control wires reconnecting to A/D/E ===== */}
        {[
          { x1: 118, y1: 40, x2: 108, y2: 106 },
          { x1: 150, y1: 34, x2: 146, y2: 106 },
          { x1: 182, y1: 40, x2: 184, y2: 106 },
        ].map((w, i) => (
          <path
            key={i}
            className={anim('c1s14-wire')}
            d={`M ${w.x1} ${w.y1} Q ${(w.x1 + w.x2) / 2} ${(w.y1 + w.y2) / 2 - 10} ${w.x2} ${w.y2}`}
            fill="none"
            stroke="#9FB6CC"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="6 8"
            style={reduced ? { opacity: 0.6 } : undefined}
          />
        ))}
      </g>
    </svg>
  )
}
