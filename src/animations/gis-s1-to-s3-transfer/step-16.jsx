// GIS S1→S3 Case 1 — Step 16: "Assemble: fit the circuit breaker"
// Nearer to the real tank: the tall grey GIS enclosure (open top, stud rows,
// internal pole mounts) receives the VCB — grey control-box top with two black
// knobs, red/amber pilots, INC. marker and three brown epoxy poles — lowered
// straight down on the crane (yellow girder, blue hoist, dashed chain), kept
// clear of the sides. Warning triangle: suspended load. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Overhead crane lowering the circuit breaker with three brown epoxy poles straight down into the open top of the tall grey GIS tank, kept clear of the sides"
    >
      <style>{`
        .c1s16-stage[data-paused] * { animation-play-state: paused !important; }
        .c1s16-drop--anim { animation: c1s16-drop 5s ease-in-out infinite; }
        @keyframes c1s16-drop {
          0%      { transform: translateY(-34px); }
          48%     { transform: translateY(0); }
          84%     { transform: translateY(0); }
          100%    { transform: translateY(-34px); }
        }
        .c1s16-chain--anim { animation: c1s16-chain 1.6s linear infinite; }
        @keyframes c1s16-chain { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:16} }
        .c1s16-clr--anim { animation: c1s16-clr 5s ease-in-out infinite; }
        @keyframes c1s16-clr {
          0%,40%   { opacity: 0.2; }
          55%,80%  { opacity: 0.9; }
          100%     { opacity: 0.2; }
        }
        .c1s16-warn--anim { animation: c1s16-warn 2s ease-in-out infinite; }
        @keyframes c1s16-warn { 0%,100%{opacity:0.65} 50%{opacity:1} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* warning triangle — suspended load */}
      <g className={anim('c1s16-warn')} transform="translate(298 22)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== crane girder (yellow) + trolley ===== */}
      <rect x="20" y="12" width="240" height="15" rx="3" fill="#F2B826" stroke="#B98812" strokeWidth="2" />
      <rect x="26" y="16" width="228" height="4" rx="2" fill="#FFDA6B" opacity="0.7" />
      <rect x="123" y="8" width="30" height="10" rx="2" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="1.8" />

      {/* ===== tall grey GIS tank (open top) ===== */}
      <g>
        <rect x="82" y="92" width="156" height="120" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="82" y="92" width="14" height="120" fill="#C2C6BF" opacity="0.7" />
        <rect x="224" y="92" width="14" height="120" fill="#A9AEA6" opacity="0.55" />
        {/* open rim */}
        <rect x="78" y="84" width="164" height="14" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="90" y="88" width="140" height="6" rx="3" fill="#8A9089" />
        {/* inner dark cavity */}
        <rect x="96" y="96" width="128" height="26" rx="3" fill="#8A9089" opacity="0.5" />
        {/* side stud rows */}
        {[0,1,2,3,4].map((i) => <circle key={`l${i}`} cx="89" cy={110 + i * 20} r="1.7" fill="#9BA19A" />)}
        {[0,1,2,3,4].map((i) => <circle key={`r${i}`} cx="231" cy={110 + i * 20} r="1.7" fill="#9BA19A" />)}
        {/* three internal pole mount rings on the floor */}
        {[128, 160, 192].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="198" rx="12" ry="4.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
            <ellipse cx={cx} cy="198" rx="6" ry="2.3" fill="#5B6167" />
          </g>
        ))}
      </g>

      <g className="c1s16-stage" data-paused={paused ? '' : undefined}>
        {/* clearance guides (breaker must stay off the sides) */}
        <g className={anim('c1s16-clr')} style={reduced ? { opacity: 0.9 } : undefined}>
          <line x1="100" y1="104" x2="100" y2="200" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 4" />
          <line x1="220" y1="104" x2="220" y2="200" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 4" />
        </g>

        {/* ===== hoist + breaker (descend together) ===== */}
        <g className={anim('c1s16-drop')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <line x1="138" y1="18" x2="138" y2="48" stroke="#5A6068" strokeWidth="3" strokeDasharray="4 3" />
          <line className={anim('c1s16-chain')} x1="138" y1="18" x2="138" y2="48" stroke="#8A9099" strokeWidth="1.6" strokeDasharray="4 4"
            style={reduced ? { opacity: 0.6 } : undefined} />
          {/* blue hoist block */}
          <rect x="123" y="48" width="30" height="18" rx="3" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="2" />
          <rect x="129" y="52" width="18" height="4" rx="2" fill="#4A8ED0" opacity="0.7" />
          {/* slings + fixture bar */}
          <line x1="129" y1="66" x2="112" y2="80" stroke="#5A6068" strokeWidth="2.4" />
          <line x1="147" y1="66" x2="164" y2="80" stroke="#5A6068" strokeWidth="2.4" />
          <rect x="102" y="78" width="72" height="8" rx="2" fill="#6E767E" stroke="#4B5157" strokeWidth="1.5" />

          {/* --- VCB body --- */}
          <rect x="106" y="86" width="64" height="30" rx="3" fill="#DADED8" stroke="#8A9089" strokeWidth="2" />
          <circle cx="120" cy="101" r="4.2" fill="#1E2226" stroke="#000" strokeWidth="1" />
          <circle cx="136" cy="101" r="4.2" fill="#1E2226" stroke="#000" strokeWidth="1" />
          <circle cx="152" cy="95" r="2.4" fill="#C0392B" />
          <circle cx="160" cy="95" r="2.4" fill="#E8C020" />
          <rect x="150" y="104" width="14" height="8" rx="1.5" fill="#0B0D0E" />
          <text x="157" y="111" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#3FD46C">0</text>
          <text x="112" y="84" fontFamily="var(--font-mono)" fontSize="6.5" fill="#C0392B">INC.</text>

          {/* three brown epoxy poles hanging below the box, aligned to the floor mounts */}
          {[128, 160, 192].map((cx) => (
            <g key={cx}>
              <rect x={cx - 6} y="116" width="12" height="70" rx="5" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" />
              <rect x={cx - 3.5} y="120" width="3" height="60" rx="1.5" fill="#9B5240" opacity="0.8" />
              <rect x={cx - 3} y="184" width="6" height="8" rx="1.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}
