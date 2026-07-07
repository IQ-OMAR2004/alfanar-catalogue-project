// Case 1 — Step 6: "Dismantle: remove the circuit breaker"
// Overhead crane (yellow girder, blue hoist, dashed chain) with a CB lifting
// fixture raises the VCB — grey control-box top with two black knobs + red pilot,
// three brown epoxy poles below — straight UP out of the grey tank and onto a
// BLUE trolley marked "INC.". Warning triangle: suspended load. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Overhead crane lifting the vacuum circuit breaker with its brown epoxy poles straight up out of the tank onto a blue INC. trolley"
    >
      <style>{`
        .c1s6-stage[data-paused] * { animation-play-state: paused !important; }

        /* the breaker rises out of the tank and traverses to the blue trolley */
        .c1s6-cb--anim { animation: c1s6-cb 5s ease-in-out infinite; }
        @keyframes c1s6-cb {
          0%      { transform: translate(0px,0px); }
          38%     { transform: translate(0px,-70px); }
          70%,100%{ transform: translate(126px,-70px); }
        }
        /* the hoist trolley on the girder moves with the load */
        .c1s6-hoist--anim { animation: c1s6-hoist 5s ease-in-out infinite; }
        @keyframes c1s6-hoist {
          0%,38%  { transform: translateX(0px); }
          70%,100%{ transform: translateX(126px); }
        }
        /* dashed chain shimmer */
        .c1s6-chain--anim { animation: c1s6-chain 1.2s linear infinite; }
        @keyframes c1s6-chain { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -12; } }
        /* red pilot lamp on the VCB */
        .c1s6-pilot--anim { animation: c1s6-pilot 1.6s ease-in-out infinite; }
        @keyframes c1s6-pilot { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        .c1s6-warn--anim { animation: c1s6-warn 2.25s ease-in-out infinite; }
        @keyframes c1s6-warn { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* warning triangle — suspended load */}
      <g className={anim('c1s6-warn')} transform="translate(20 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== crane girder (yellow) across the top ===== */}
      <rect x="16" y="14" width="288" height="14" rx="2" fill="#F2B826" stroke="#B98C1A" strokeWidth="2" />
      <rect x="16" y="14" width="288" height="4" rx="2" fill="#FFD35A" />
      {/* girder end stops */}
      <rect x="14" y="10" width="8" height="22" rx="2" fill="#B98C1A" />
      <rect x="298" y="10" width="8" height="22" rx="2" fill="#B98C1A" />

      {/* ===== grey tank the breaker comes out of (left) ===== */}
      <g transform="translate(30 118)">
        <rect x="0" y="0" width="104" height="94" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="0" y="0" width="14" height="94" rx="5" fill="#C2C6BF" opacity="0.5" />
        <rect x="14" y="-4" width="76" height="12" rx="3" fill="#C2C6BF" stroke="#8A9089" strokeWidth="2" />
        {[22, 38, 54, 70, 82].map((cx) => (
          <circle key={cx} cx={cx} cy="2" r="1.8" fill="#8A9089" />
        ))}
        <text x="52" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3C423C">S1</text>
      </g>

      {/* ===== blue INC. trolley (right, destination) ===== */}
      <g transform="translate(196 168)">
        <rect x="0" y="8" width="104" height="16" rx="3" fill="#2C6FB4" stroke="#1E4E82" strokeWidth="2.5" />
        <rect x="0" y="8" width="104" height="5" rx="2.5" fill="#3D86CE" />
        {/* cushion pad */}
        <rect x="14" y="2" width="76" height="8" rx="3" fill="#D8CBA6" />
        {/* draw-bar */}
        <path d="M 102 14 q 20 -2 22 -26" fill="none" stroke="#1E4E82" strokeWidth="4.5" strokeLinecap="round" />
        {/* INC. marker */}
        <rect x="34" y="12" width="36" height="10" rx="2" fill="#FFFFFF" />
        <text x="52" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#C0392B">INC.</text>
        {/* wheels */}
        <circle cx="22" cy="30" r="9" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="82" cy="30" r="9" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="22" cy="30" r="2.8" fill="#AEB4B9" />
        <circle cx="82" cy="30" r="2.8" fill="#AEB4B9" />
      </g>

      <g className="c1s6-stage" data-paused={paused ? '' : undefined}>
        {/* hoist trolley on the girder */}
        <g className={anim('c1s6-hoist')} style={reduced ? { transform: 'translateX(126px)' } : undefined}>
          <rect x="58" y="26" width="24" height="14" rx="2" fill="#2C6FB4" stroke="#1E4E82" strokeWidth="2" />
          <circle cx="64" cy="27" r="3" fill="#1E2226" />
          <circle cx="76" cy="27" r="3" fill="#1E2226" />
        </g>

        {/* ===== VCB + fixture (lifts as one group) ===== */}
        <g className={anim('c1s6-cb')} style={reduced ? { transform: 'translate(126px,-70px)' } : undefined}>
          {/* dashed lift chain from girder to fixture */}
          <path className={anim('c1s6-chain')} d="M 70 40 L 70 96" fill="none" stroke="#5A6068" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
          {/* CB lifting fixture (spreader bar) */}
          <rect x="44" y="96" width="52" height="8" rx="2" fill="#6E767E" stroke="#4A5157" strokeWidth="1.6" />
          <path d="M 52 104 L 70 96 L 88 104" fill="none" stroke="#4A5157" strokeWidth="1.6" />

          {/* grey VCB control-box top */}
          <g transform="translate(48 104)">
            <rect x="0" y="0" width="44" height="26" rx="3" fill="#DADED8" stroke="#8A9089" strokeWidth="2" />
            <rect x="0" y="0" width="7" height="26" rx="3" fill="#C7CCC6" opacity="0.6" />
            {/* two black knobs */}
            <circle cx="12" cy="13" r="4.6" fill="#1E2226" stroke="#000" strokeWidth="1" />
            <circle cx="26" cy="13" r="4.6" fill="#1E2226" stroke="#000" strokeWidth="1" />
            {/* red pilot */}
            <g className={anim('c1s6-pilot')} style={reduced ? { opacity: 1 } : undefined}>
              <circle cx="37" cy="8" r="2.6" fill="#C0392B" />
            </g>
            {/* small counter window */}
            <rect x="33" y="15" width="8" height="7" rx="1" fill="#0B0D0E" />
          </g>

          {/* three brown epoxy breaker poles below */}
          {[52, 66, 80].map((cx, i) => (
            <g key={i} transform={`translate(${cx} 130)`}>
              <rect x="-5" y="0" width="10" height="40" rx="5" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" />
              <rect x="-2.6" y="3" width="3" height="34" rx="1.5" fill="#9B5240" opacity="0.85" />
              {/* pole cap */}
              <circle cx="0" cy="40" r="4.4" fill="#5A2A1F" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}
