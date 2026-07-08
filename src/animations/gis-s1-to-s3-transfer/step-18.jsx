// GIS S1→S3 Case 1 — Step 18: "Assemble: fit cable bushing #2"
// Nearer to the real tank: same tall grey GIS enclosure with the two round
// aluminium-flanged openings. Bushing #1 is already seated in the LEFT opening;
// the SECOND brown epoxy cone bushing descends into the RIGHT opening — both
// openings now filled. A green tick confirms gas-tight; "#2" badge. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  // a fitted brown cone bushing sitting flush in an opening at (cx, cy=158)
  const Fitted = ({ cx }) => (
    <g>
      <path d={`M ${cx-19} 150 L ${cx-13} 140 H ${cx+13} L ${cx+19} 150 L ${cx+13} 160 H ${cx-13} Z`} fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
      {[[cx-13,157],[cx-5,143],[cx+5,143],[cx+13,157]].map(([bx,by],i)=>(<circle key={i} cx={bx} cy={by} r="1.8" fill="#C9A227" />))}
      <ellipse cx={cx} cy="150" rx="7" ry="2.8" fill="#3B221A" stroke="#5A2A1F" strokeWidth="1" />
    </g>
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="The second brown epoxy cone cable bushing lowered into the right opening of the grey GIS tank; bushing one is already fitted in the left opening, both now gas-tight"
    >
      <style>{`
        .c1s18-stage[data-paused] * { animation-play-state: paused !important; }
        .c1s18-drop--anim { animation: c1s18-drop 5s ease-in-out infinite; }
        @keyframes c1s18-drop {
          0%   { transform: translateY(-64px); opacity: 0.85; }
          40%  { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .c1s18-tick--anim { animation: c1s18-tick 5s ease-in-out infinite; }
        @keyframes c1s18-tick {
          0%,60% { opacity: 0; transform: scale(0.7); }
          72%    { opacity: 1; transform: scale(1.1); }
          82%,100% { opacity: 1; transform: scale(1); }
        }
        .c1s18-badge--anim { animation: c1s18-badge 5s ease-in-out infinite; }
        @keyframes c1s18-badge { 0%,45%{opacity:0} 60%,100%{opacity:1} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* ===== tall grey GIS enclosure (same as step 17) ===== */}
      <g>
        <rect x="86" y="40" width="148" height="172" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="86" y="40" width="14" height="172" fill="#C2C6BF" opacity="0.7" />
        <rect x="220" y="40" width="14" height="172" fill="#A9AEA6" opacity="0.55" />
        <rect x="82" y="30" width="156" height="14" rx="3" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        {[0,1,2,3,4,5,6,7].map((i) => <circle key={`t${i}`} cx={98 + i * 18} cy="37" r="1.8" fill="#9BA19A" />)}
        {[0,1,2,3,4,5,6].map((i) => <circle key={`l${i}`} cx="93" cy={58 + i * 22} r="1.7" fill="#9BA19A" />)}
        {[0,1,2,3,4,5,6].map((i) => <circle key={`r${i}`} cx="227" cy={58 + i * 22} r="1.7" fill="#9BA19A" />)}
        <rect x="108" y="56" width="104" height="60" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
        {[0,1,2,3,4,5].map((i) => <circle key={`cbt${i}`} cx={118 + i * 16} cy="61" r="1.5" fill="#9BA19A" />)}
        {[0,1,2,3,4,5].map((i) => <circle key={`cbb${i}`} cx={118 + i * 16} cy="111" r="1.5" fill="#9BA19A" />)}

        {[[135, 158], [185, 158]].map(([cx, cy], k) => (
          <g key={k}>
            <circle cx={cx} cy={cy} r="24" fill="#C9CED4" stroke="#7C837B" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="24" fill="none" stroke="#EDEFF2" strokeWidth="1" opacity="0.7" />
            <circle cx={cx} cy={cy} r="13" fill="#8A9089" />
            <circle cx={cx} cy={cy} r="13" fill="#4B5157" opacity="0.5" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4
              return <circle key={i} cx={cx + 19 * Math.cos(a)} cy={cy + 19 * Math.sin(a)} r="1.7" fill="#6E767E" />
            })}
          </g>
        ))}
        <rect x="96" y="212" width="12" height="6" fill="#7C837B" />
        <rect x="212" y="212" width="12" height="6" fill="#7C837B" />
      </g>

      {/* bushing #1 already fitted in the LEFT opening */}
      <Fitted cx={135} />

      <g className="c1s18-stage" data-paused={paused ? '' : undefined}>
        {/* guide pins into the RIGHT opening */}
        <line x1="176" y1="70" x2="176" y2="150" stroke="#AEB4B9" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        <line x1="194" y1="70" x2="194" y2="150" stroke="#AEB4B9" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

        {/* ===== bushing #2 descending into the RIGHT opening ===== */}
        <g className={anim('c1s18-drop')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <path d="M 166 150 L 172 140 H 198 L 204 150 L 198 160 H 172 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
          {[[172,157],[180,143],[190,143],[198,157]].map(([bx,by],i)=>(<circle key={i} cx={bx} cy={by} r="1.8" fill="#C9A227" />))}
          <path d="M 172 150 L 198 150 L 191 116 L 179 116 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M 180 150 L 184 150 L 182 118 Z" fill="#9B5240" opacity="0.8" />
          <ellipse cx="185" cy="117" rx="6.5" ry="2.6" fill="#3B221A" stroke="#5A2A1F" strokeWidth="1" />
        </g>

        {/* gas-tight tick over both seated flanges */}
        <g className={anim('c1s18-tick')} transform="translate(160 188)" style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="0" cy="0" r="12" fill="#1F9D6B" />
          <path d="M -6 0 L -1 5 L 7 -5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* #2 badge */}
        <g className={anim('c1s18-badge')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="245" y="150" width="52" height="24" rx="6" fill="var(--accent)" />
          <text x="271" y="167" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--on-accent)">#2</text>
        </g>
      </g>
    </svg>
  )
}
