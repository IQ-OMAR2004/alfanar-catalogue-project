// GIS S1→S3 Case 1 — Step 17: "Assemble: fit cable bushing #1"
// Nearer to the real tank: the tall grey GIS enclosure shows the two round
// aluminium-flanged bushing openings on its lower face (as in the shop photos).
// A brown epoxy CONE bushing (hex flange, brass bolt ring, hollow socket)
// descends on guide pins and seats into the LEFT opening; grease sheen on the
// flange; an Allen key drives the button-head screws. "#1" badge. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A brown epoxy cone cable bushing lowered on guide pins into the left round aluminium-flanged opening of the grey GIS tank, screws driven with an Allen key"
    >
      <style>{`
        .c1s17-stage[data-paused] * { animation-play-state: paused !important; }
        .c1s17-drop--anim { animation: c1s17-drop 5s ease-in-out infinite; }
        @keyframes c1s17-drop {
          0%   { transform: translateY(-64px); opacity: 0.85; }
          40%  { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .c1s17-grease--anim { animation: c1s17-grease 5s ease-in-out infinite; }
        @keyframes c1s17-grease {
          0%,40% { opacity: 0; }
          52%    { opacity: 0.55; }
          100%   { opacity: 0.55; }
        }
        .c1s17-key--anim { animation: c1s17-key 5s ease-in-out infinite; transform-origin: center; }
        @keyframes c1s17-key {
          0%,55%  { opacity: 0; transform: rotate(0deg); }
          62%     { opacity: 1; }
          100%    { opacity: 1; transform: rotate(300deg); }
        }
        .c1s17-badge--anim { animation: c1s17-badge 5s ease-in-out infinite; }
        @keyframes c1s17-badge { 0%,45%{opacity:0} 60%,100%{opacity:1} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* ===== tall grey GIS enclosure ===== */}
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

        {/* the TWO round bushing openings (aluminium ring flanges) on the lower face */}
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

      <g className="c1s17-stage" data-paused={paused ? '' : undefined}>
        <circle className={anim('c1s17-grease')} cx="135" cy="158" r="21" fill="#9FD8A8"
          style={reduced ? { opacity: 0.5 } : undefined} />

        <line x1="126" y1="70" x2="126" y2="150" stroke="#AEB4B9" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        <line x1="144" y1="70" x2="144" y2="150" stroke="#AEB4B9" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

        {/* ===== brown epoxy CONE bushing descending into the left opening ===== */}
        <g className={anim('c1s17-drop')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <path d="M 116 150 L 122 140 H 148 L 154 150 L 148 160 H 122 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
          {[[122,157],[130,143],[140,143],[148,157]].map(([bx,by],i)=>(<circle key={i} cx={bx} cy={by} r="1.8" fill="#C9A227" />))}
          <path d="M 122 150 L 148 150 L 141 116 L 129 116 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M 130 150 L 134 150 L 132 118 Z" fill="#9B5240" opacity="0.8" />
          <ellipse cx="135" cy="117" rx="6.5" ry="2.6" fill="#3B221A" stroke="#5A2A1F" strokeWidth="1" />
        </g>

        {/* Allen key driving a flange screw (appears once seated) */}
        <g className={anim('c1s17-key')} transform="translate(112 168)" style={reduced ? { opacity: 1 } : undefined}>
          <path d="M 0 -8 v 8 h 8" fill="none" stroke="#2B2F33" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* #1 badge */}
        <g className={anim('c1s17-badge')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="245" y="150" width="52" height="24" rx="6" fill="var(--accent)" />
          <text x="271" y="167" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--on-accent)">#1</text>
        </g>
      </g>
    </svg>
  )
}
