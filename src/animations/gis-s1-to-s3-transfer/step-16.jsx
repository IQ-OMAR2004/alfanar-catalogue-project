// GIS S1→S3 Case 1 — Step 16: "Assemble: fit the circuit breaker"
// Overhead crane (yellow girder, blue hoist, dashed chain) lowers the VCB — grey
// control box top with two black knobs, three brown epoxy poles — straight DOWN
// into the open grey S3 tank, kept clear of the sides. Warning triangle:
// suspended load. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Overhead crane lowering the circuit breaker with three brown epoxy poles straight down into the open grey S3 tank, kept clear of the sides"
    >
      <style>{`
        .c1s16-stage[data-paused] * { animation-play-state: paused !important; }

        /* whole breaker + hoist descend into the tank, then hold */
        .c1s16-drop--anim { animation: c1s16-drop 5s ease-in-out infinite; }
        @keyframes c1s16-drop {
          0%      { transform: translateY(-30px); }
          46%     { transform: translateY(0); }
          82%     { transform: translateY(0); }
          100%    { transform: translateY(-30px); }
        }
        /* chain dashes travel to show paying out / hauling in */
        .c1s16-chain--anim { animation: c1s16-chain 1.6s linear infinite; }
        @keyframes c1s16-chain {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 16; }
        }
        /* clearance guides blink near the tank walls */
        .c1s16-clr--anim { animation: c1s16-clr 5s ease-in-out infinite; }
        @keyframes c1s16-clr {
          0%,40%   { opacity: 0.2; }
          55%,80%  { opacity: 0.9; }
          100%     { opacity: 0.2; }
        }
        .c1s16-warn--anim { animation: c1s16-warn 2s ease-in-out infinite; }
        @keyframes c1s16-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
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

      {/* ===== crane girder (yellow) across the top ===== */}
      <rect x="20" y="14" width="230" height="16" rx="3" fill="#F2B826" stroke="#B98812" strokeWidth="2" />
      <rect x="26" y="18" width="218" height="4" rx="2" fill="#FFDA6B" opacity="0.7" />
      {/* trolley on the girder above the tank */}
      <rect x="120" y="10" width="30" height="10" rx="2" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="1.8" />

      {/* ===== open grey S3 tank ===== */}
      <g transform="translate(84 96)">
        <rect x="0" y="18" width="152" height="106" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* open rim */}
        <rect x="-4" y="8" width="160" height="16" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="6" y="12" width="140" height="8" rx="3" fill="#A9AEA6" />
        {/* inner dark cavity */}
        <rect x="12" y="26" width="128" height="30" rx="3" fill="#A9AEA6" opacity="0.55" />
        {/* breaker mount pads at the bottom */}
        <rect x="34" y="104" width="84" height="8" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.3" />
      </g>

      <g className="c1s16-stage" data-paused={paused ? '' : undefined}>
        {/* clearance guides (breaker must stay off the sides) */}
        <g className={anim('c1s16-clr')} style={reduced ? { opacity: 0.9 } : undefined}>
          <line x1="96" y1="118" x2="96" y2="196" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 4" />
          <line x1="224" y1="118" x2="224" y2="196" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 4" />
        </g>

        {/* ===== hoist + breaker (descend together) ===== */}
        <g className={anim('c1s16-drop')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          {/* dashed lifting chain from trolley to hoist */}
          <line x1="135" y1="20" x2="135" y2="52" stroke="#5A6068" strokeWidth="3" strokeDasharray="4 3" />
          <line
            className={anim('c1s16-chain')}
            x1="135"
            y1="20"
            x2="135"
            y2="52"
            stroke="#8A9099"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            style={reduced ? { opacity: 0.6 } : undefined}
          />
          {/* blue hoist block */}
          <rect x="120" y="52" width="30" height="20" rx="3" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="2" />
          <rect x="126" y="56" width="18" height="5" rx="2" fill="#4A8ED0" opacity="0.7" />
          {/* two slings to the fixture */}
          <line x1="126" y1="72" x2="110" y2="86" stroke="#5A6068" strokeWidth="2.4" />
          <line x1="144" y1="72" x2="160" y2="86" stroke="#5A6068" strokeWidth="2.4" />
          {/* lifting fixture bar */}
          <rect x="100" y="84" width="70" height="8" rx="2" fill="#6E767E" stroke="#4B5157" strokeWidth="1.5" />

          {/* --- VCB body --- */}
          {/* grey control box top */}
          <rect x="104" y="92" width="62" height="30" rx="3" fill="#DADED8" stroke="#8A9089" strokeWidth="2" />
          {/* two black knobs */}
          <circle cx="118" cy="107" r="4.2" fill="#1E2226" stroke="#000" strokeWidth="1" />
          <circle cx="134" cy="107" r="4.2" fill="#1E2226" stroke="#000" strokeWidth="1" />
          {/* red + amber pilots */}
          <circle cx="150" cy="101" r="2.4" fill="#C0392B" />
          <circle cx="158" cy="101" r="2.4" fill="#E8C020" />
          {/* small counter window */}
          <rect x="148" y="110" width="14" height="8" rx="1.5" fill="#0B0D0E" />
          <text x="155" y="117" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#3FD46C">0</text>
          {/* red INC. marker */}
          <text x="110" y="90" fontFamily="var(--font-mono)" fontSize="6.5" fill="#C0392B">INC.</text>

          {/* three brown epoxy poles hanging below the box */}
          {[116, 135, 154].map((cx) => (
            <g key={cx}>
              <rect x={cx - 6} y="122" width="12" height="46" rx="5" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" />
              <rect x={cx - 3.5} y="126" width="3" height="38" rx="1.5" fill="#9B5240" opacity="0.8" />
              {/* bottom contact stub */}
              <rect x={cx - 3} y="166" width="6" height="8" rx="1.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}
