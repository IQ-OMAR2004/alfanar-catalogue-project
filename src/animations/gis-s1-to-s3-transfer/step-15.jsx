// GIS S1→S3 Case 1 — Step 15: "Assemble: fit the internal busbars (BB)"
// Silver-plated flat busbars lower INTO the open S3 tank and bolt onto the
// joint; a ratchet handle spins on the bolt head; each bolt gets a red witness
// mark; a small square of sandpaper polishes a plated contact face. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Silver-plated internal busbar lowering into the S3 tank and bolted; a ratchet turns the joint and each bolt is marked red; sandpaper polishing a contact face"
    >
      <style>{`
        .c1s15-stage[data-paused] * { animation-play-state: paused !important; }

        /* busbar descends into the tank and settles onto the joint */
        .c1s15-bar--anim { animation: c1s15-bar 4.5s ease-in-out infinite; }
        @keyframes c1s15-bar {
          0%      { transform: translateY(-42px); opacity: 0.35; }
          38%     { transform: translateY(0); opacity: 1; }
          100%    { transform: translateY(0); opacity: 1; }
        }
        /* ratchet rocks back and forth once the bar is seated */
        .c1s15-rat--anim { animation: c1s15-rat 0.7s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes c1s15-rat {
          0%,100% { transform: rotate(-16deg); }
          50%     { transform: rotate(14deg); }
        }
        .c1s15-tool--anim { animation: c1s15-tool 4.5s ease-in-out infinite; }
        @keyframes c1s15-tool {
          0%,42%  { opacity: 0; }
          50%,88% { opacity: 1; }
          100%    { opacity: 0; }
        }
        /* red witness marks appear on the bolts */
        .c1s15-mark--anim { animation: c1s15-mark 4.5s ease-in-out infinite; }
        @keyframes c1s15-mark {
          0%,60%   { opacity: 0; }
          72%,100% { opacity: 1; }
        }
        /* sandpaper polishes the contact face left-right */
        .c1s15-sand--anim { animation: c1s15-sand 1.1s ease-in-out infinite; }
        @keyframes c1s15-sand {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(9px); }
        }
        .c1s15-sheen--anim { animation: c1s15-sheen 4.5s ease-in-out infinite; }
        @keyframes c1s15-sheen {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.6; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* ===== open grey S3 tank ===== */}
      <g transform="translate(70 84)">
        {/* tank body, open top */}
        <rect x="0" y="18" width="180" height="118" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* open rim */}
        <rect x="-4" y="8" width="188" height="16" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="6" y="12" width="168" height="8" rx="3" fill="#A9AEA6" />
        {/* inner shadow */}
        <rect x="14" y="26" width="152" height="20" rx="3" fill="#A9AEA6" opacity="0.5" />
        {/* two mounting insulators / joint posts on the tank floor */}
        <rect x="40" y="96" width="16" height="30" rx="2" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.5" />
        <rect x="124" y="96" width="16" height="30" rx="2" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.5" />
        <rect x="36" y="90" width="24" height="8" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
        <rect x="120" y="90" width="24" height="8" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
      </g>

      <g className="c1s15-stage" data-paused={paused ? '' : undefined}>
        {/* accent guide arrow — busbar goes DOWN into the tank */}
        <path
          className={anim('c1s15-sheen')}
          d="M 160 64 v 20"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeDasharray="4 3"
          style={reduced ? { opacity: 0.5 } : undefined}
        />

        {/* ===== descending silver-plated busbar ===== */}
        <g className={anim('c1s15-bar')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <g transform="translate(108 178)">
            {/* flat plated bar spanning the two posts */}
            <rect x="0" y="0" width="104" height="14" rx="3" fill="#D9DDE0" stroke="#8A9099" strokeWidth="2" />
            {/* iridescent sheen strip */}
            <rect className={anim('c1s15-sheen')} x="6" y="2.5" width="92" height="3.5" rx="1.8" fill="#EAF2F6" style={reduced ? { opacity: 0.4 } : undefined} />
            {/* end holes / bolt seats */}
            <circle cx="8" cy="7" r="3.2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.3" />
            <circle cx="96" cy="7" r="3.2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.3" />
            {/* bolt heads */}
            <circle cx="8" cy="7" r="2" fill="#6E767E" />
            <circle cx="96" cy="7" r="2" fill="#6E767E" />
            {/* red witness marks on each bolt */}
            <g className={anim('c1s15-mark')} style={reduced ? { opacity: 1 } : undefined}>
              <line x1="8" y1="4" x2="8" y2="12" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" />
              <line x1="96" y1="4" x2="96" y2="12" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ===== ratchet spinning on the right joint ===== */}
        <g className={anim('c1s15-tool')} style={reduced ? { opacity: 1 } : undefined} transform="translate(204 160)">
          <g className={anim('c1s15-rat')} style={reduced ? { transform: 'rotate(-8deg)' } : undefined}>
            {/* socket head */}
            <circle cx="0" cy="0" r="7" fill="#6E767E" stroke="#4B5157" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#2B2F33" />
            {/* handle */}
            <rect x="4" y="-4" width="40" height="8" rx="4" fill="#2B2F33" stroke="#111417" strokeWidth="1.2" transform="rotate(-24)" />
          </g>
        </g>

        {/* ===== sandpaper polishing a spare contact face (bottom-left) ===== */}
        <g transform="translate(24 176)">
          {/* spare bar being polished */}
          <rect x="0" y="8" width="46" height="12" rx="3" fill="#D9DDE0" stroke="#8A9099" strokeWidth="1.8" />
          <rect className={anim('c1s15-sheen')} x="4" y="10.5" width="38" height="3" rx="1.5" fill="#EAF2F6" style={reduced ? { opacity: 0.4 } : undefined} />
          {/* sandpaper block */}
          <g className={anim('c1s15-sand')} style={reduced ? { transform: 'translateX(4px)' } : undefined}>
            <rect x="6" y="1" width="18" height="9" rx="2" fill="#C8A15A" stroke="#8A6B33" strokeWidth="1.4" />
            <line x1="9" y1="6" x2="21" y2="6" stroke="#8A6B33" strokeWidth="0.8" opacity="0.6" />
          </g>
        </g>
      </g>
    </svg>
  )
}
