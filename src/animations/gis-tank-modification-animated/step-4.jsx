// GIS Tank Modification — Step 4: "Install the ES/DS tank"
// Yellow crane girder with blue hoist and dashed chain lowers the ES/DS tank
// onto the main tank. The black O-ring is highlighted with a green grease
// sheen; guide pins align the tanks; warning triangle (suspended load). ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Overhead crane lowering the ES/DS tank onto the main tank; greased O-ring highlighted and guide pins aligning the flanges"
    >
      <style>{`
        .g4-stage[data-paused] * { animation-play-state: paused !important; }

        /* hoisted ES/DS tank lowers slowly onto the main tank, dwells, lifts back */
        .g4-lower--anim { animation: g4-lower 5s ease-in-out infinite; }
        @keyframes g4-lower {
          0%       { transform: translateY(0); }
          50%,84%  { transform: translateY(44px); }
          100%     { transform: translateY(0); }
        }
        /* chain hook block follows (same motion, chain drawn long enough) */
        .g4-oring--anim { animation: g4-oring 5s ease-in-out infinite; }
        @keyframes g4-oring {
          0%,10%   { opacity: 0.4; }
          30%,60%  { opacity: 1; }
          84%,100% { opacity: 0.4; }
        }
        /* grease sheen shimmer on the O-ring */
        .g4-sheen--anim { animation: g4-sheen 2.5s ease-in-out infinite; }
        @keyframes g4-sheen {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.75; }
        }
        /* alignment glow on the guide pins as flanges meet */
        .g4-pins--anim { animation: g4-pins 5s ease-in-out infinite; }
        @keyframes g4-pins {
          0%,34%   { opacity: 0.9; }
          56%,100% { opacity: 0.25; }
        }
        .g4-warn--anim { animation: g4-warn 2.5s ease-in-out infinite; }
        @keyframes g4-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
        /* ok tick once seated */
        .g4-ok--anim { animation: g4-ok 5s ease-in-out infinite; }
        @keyframes g4-ok {
          0%,55%   { opacity: 0; transform: scale(0.6); }
          64%,82%  { opacity: 1; transform: scale(1); }
          92%,100% { opacity: 0; transform: scale(0.6); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="222" width="320" height="18" fill="#B9BDB6" />

      {/* ===== crane: yellow girder + blue hoist trolley ===== */}
      <rect x="0" y="14" width="320" height="14" fill="#F2B826" stroke="#B98A12" strokeWidth="2" />
      <path d="M 20 28 v -14 M 60 28 v -14 M 100 28 v -14 M 140 28 v -14 M 180 28 v -14 M 220 28 v -14 M 260 28 v -14 M 300 28 v -14" stroke="#B98A12" strokeWidth="1.5" opacity="0.6" />
      <g transform="translate(160 28)">
        <rect x="-22" y="0" width="44" height="18" rx="3" fill="#2C6FB4" stroke="#1D4C7E" strokeWidth="2" />
        <circle cx="-13" cy="18" r="4.5" fill="#1D4C7E" />
        <circle cx="13" cy="18" r="4.5" fill="#1D4C7E" />
      </g>

      {/* warning triangle — suspended load */}
      <g className={anim('g4-warn')} transform="translate(290 56)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== main tank (fixed, below) ===== */}
      <g transform="translate(88 150)">
        <rect x="0" y="0" width="144" height="72" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* top mating flange with stud row */}
        <rect x="-4" y="-8" width="152" height="10" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        {[12, 40, 68, 96, 124].map((cx) => (
          <circle key={cx} cx={cx + 8} cy="-3" r="2" fill="#9BA19A" />
        ))}
        {/* bolted cover on the front */}
        <rect x="20" y="14" width="104" height="44" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[28, 52, 76, 100, 116].map((cx) => (
          <circle key={cx} cx={cx} cy="19" r="1.8" fill="#9BA19A" />
        ))}
        {[28, 52, 76, 100, 116].map((cx) => (
          <circle key={'b' + cx} cx={cx} cy="53" r="1.8" fill="#9BA19A" />
        ))}
      </g>

      <g className="g4-stage" data-paused={paused ? '' : undefined}>
        {/* O-ring seated in the main tank flange groove, greased sheen */}
        <g className={anim('g4-oring')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="94" y="139.5" width="132" height="4" rx="2" fill="#222222" />
          <rect className={anim('g4-sheen')} x="94" y="139" width="132" height="5" rx="2.5" fill="#9FD8A8" opacity="0.5" style={reduced ? { opacity: 0.5 } : undefined} />
          {/* callout to the O-ring */}
          <path d="M 60 120 q 20 12 32 20" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
          <text x="22" y="118" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">O-RING</text>
        </g>

        {/* guide pins on the main tank flange */}
        <g className={anim('g4-pins')} style={reduced ? { opacity: 0.6 } : undefined}>
          <rect x="106" y="106" width="4" height="36" rx="2" fill="#6E767E" />
          <rect x="210" y="106" width="4" height="36" rx="2" fill="#6E767E" />
          <circle cx="108" cy="104" r="3.4" fill="var(--accent)" />
          <circle cx="212" cy="104" r="3.4" fill="var(--accent)" />
        </g>

        {/* ===== hoisted ES/DS tank (lowering) ===== */}
        <g className={anim('g4-lower')}>
          {/* chain from hoist, dashed */}
          <line x1="160" y1="46" x2="160" y2="66" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
          {/* hook */}
          <path d="M 160 66 q 0 8 -6 8 q -6 0 -5 -6" fill="none" stroke="#5A6068" strokeWidth="3.5" strokeLinecap="round" />
          {/* sling chains to the tank lugs */}
          <line x1="158" y1="72" x2="120" y2="90" stroke="#5A6068" strokeWidth="2.5" strokeDasharray="4 3" />
          <line x1="158" y1="72" x2="200" y2="90" stroke="#5A6068" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* ES/DS tank body */}
          <g transform="translate(96 90)">
            <rect x="0" y="0" width="128" height="42" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
            {/* lifting lugs */}
            <path d="M 20 0 l 4 -8 h 4 l 4 8 Z" fill="#C2C6BF" stroke="#7C837B" strokeWidth="1.6" />
            <path d="M 96 0 l 4 -8 h 4 l 4 8 Z" fill="#C2C6BF" stroke="#7C837B" strokeWidth="1.6" />
            {/* ES/DS mechanism housing on top */}
            <rect x="44" y="-14" width="40" height="14" rx="3" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
            {/* bottom mating flange with stud row + pin holes */}
            <rect x="-4" y="40" width="136" height="9" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
            {[10, 38, 66, 94, 120].map((cx) => (
              <circle key={cx} cx={cx + 4} cy="44.5" r="2" fill="#9BA19A" />
            ))}
            <rect x="9" y="41" width="6" height="7" fill="#8A9089" />
            <rect x="113" y="41" width="6" height="7" fill="#8A9089" />
            {/* label */}
            <rect x="12" y="10" width="34" height="10" rx="1.5" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
            <rect x="12" y="10" width="5" height="10" fill="#C0392B" />
            <text x="32" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#1E2226">ES/DS</text>
          </g>
        </g>

        {/* down arrow guidance */}
        <g opacity="0.9">
          <path d="M 56 78 v 42" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
          <path d="M 48 112 l 8 12 l 8 -12" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* seated OK tick */}
        <g className={anim('g4-ok')} style={reduced ? { opacity: 0 } : { transformOrigin: '262px 150px' }}>
          <circle cx="262" cy="150" r="11" fill="#2E9E4F" />
          <path d="M 256.5 150 l 4 4.5 l 7.5 -9" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
