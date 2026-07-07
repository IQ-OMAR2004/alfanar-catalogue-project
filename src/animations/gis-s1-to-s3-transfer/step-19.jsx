// GIS S1→S3 Case 1 — Step 19: "Assemble: fit the closing sheets"
// The pale cream-green closing sheet (cover plate) with its black O-ring laid as
// a true circle (green grease sheen) lowers ONTO the tank opening; then a socket
// tightens the perimeter nuts in a cross pattern (1→3→2→4). Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  // perimeter nut positions around the cover (top view ellipse)
  const nuts = [
    { x: 0, y: -30, o: 1 },   // top
    { x: 58, y: 0, o: 3 },    // right
    { x: 0, y: 30, o: 2 },    // bottom
    { x: -58, y: 0, o: 4 },   // left
    { x: 41, y: -21 }, { x: 41, y: 21 }, { x: -41, y: 21 }, { x: -41, y: -21 },
  ]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cream-green closing sheet with a black O-ring laid in a true circle lowering onto the tank opening, then perimeter nuts tightened in a cross pattern"
    >
      <style>{`
        .c1s19-stage[data-paused] * { animation-play-state: paused !important; }

        /* cover plate descends onto the flange */
        .c1s19-cover--anim { animation: c1s19-cover 5s ease-in-out infinite; }
        @keyframes c1s19-cover {
          0%      { transform: translateY(-46px); opacity: 0.4; }
          38%     { transform: translateY(0); opacity: 1; }
          100%    { transform: translateY(0); opacity: 1; }
        }
        /* green grease sheen on the O-ring shimmers */
        .c1s19-grease--anim { animation: c1s19-grease 3s ease-in-out infinite; }
        @keyframes c1s19-grease {
          0%,100% { opacity: 0.35; }
          50%     { opacity: 0.75; }
        }
        /* cross-pattern tightening highlight: 1 -> 3 -> 2 -> 4 */
        .c1s19-n1--anim { animation: c1s19-blink 5s ease-in-out infinite; animation-delay: 2.0s; }
        .c1s19-n3--anim { animation: c1s19-blink 5s ease-in-out infinite; animation-delay: 2.6s; }
        .c1s19-n2--anim { animation: c1s19-blink 5s ease-in-out infinite; animation-delay: 3.2s; }
        .c1s19-n4--anim { animation: c1s19-blink 5s ease-in-out infinite; animation-delay: 3.8s; }
        @keyframes c1s19-blink {
          0%,6%    { opacity: 0; transform: scale(0.6); }
          3%       { opacity: 1; transform: scale(1.5); }
          12%,100% { opacity: 0; transform: scale(0.6); }
        }
        /* socket wrench hops between nuts (simple rock) */
        .c1s19-sock--anim { animation: c1s19-sock 1.25s ease-in-out infinite; transform-origin: 50% 100%; }
        @keyframes c1s19-sock {
          0%,100% { transform: rotate(-15deg); }
          50%     { transform: rotate(15deg); }
        }
        .c1s19-tool--anim { animation: c1s19-tool 5s ease-in-out infinite; }
        @keyframes c1s19-tool {
          0%,40%  { opacity: 0; }
          50%,92% { opacity: 1; }
          100%    { opacity: 0; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* cross-pattern caption badge */}
      <g transform="translate(258 30)">
        <rect x="-52" y="-15" width="104" height="28" rx="8" fill="var(--accent)" />
        <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">1·3·2·4</text>
      </g>

      {/* ===== tank body with the open flange (top view of the opening) ===== */}
      <g transform="translate(120 150)">
        {/* tank shoulder */}
        <rect x="-84" y="20" width="168" height="66" rx="8" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* aluminium flange ring around the opening */}
        <ellipse cx="0" cy="0" rx="72" ry="36" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
        {/* O-ring laid as a TRUE circle in the groove */}
        <ellipse cx="0" cy="0" rx="58" ry="29" fill="none" stroke="#222" strokeWidth="5" />
        {/* green grease sheen on the O-ring */}
        <ellipse className={anim('c1s19-grease')} cx="0" cy="0" rx="58" ry="29" fill="none" stroke="#9FD8A8" strokeWidth="2" style={reduced ? { opacity: 0.55 } : undefined} />
        {/* dark inner cavity */}
        <ellipse cx="0" cy="0" rx="46" ry="22" fill="#A9AEA6" opacity="0.55" />
        {/* perimeter stud holes */}
        {nuts.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3.4" fill="#8A9089" stroke="#6E767E" strokeWidth="1" />
        ))}
      </g>

      <g className="c1s19-stage" data-paused={paused ? '' : undefined}>
        {/* accent arrow — cover goes DOWN */}
        <path d="M 120 66 v 18" stroke="var(--accent)" strokeWidth="3" strokeDasharray="4 3" opacity="0.6" />

        {/* ===== descending cream-green closing sheet ===== */}
        <g className={anim('c1s19-cover')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <g transform="translate(120 150)">
            {/* cover plate */}
            <ellipse cx="0" cy="0" rx="70" ry="35" fill="#DFE4D2" stroke="#8A9089" strokeWidth="2.5" />
            {/* bright aluminium centre ring flange */}
            <ellipse cx="0" cy="0" rx="26" ry="13" fill="#C9CED4" stroke="#8A9089" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="14" ry="7" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
            {/* black O-ring around the rim of the cover */}
            <ellipse cx="0" cy="0" rx="60" ry="30" fill="none" stroke="#222" strokeWidth="4" />
            {/* perimeter nuts */}
            {nuts.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r="4" fill="#6E767E" stroke="#4B5157" strokeWidth="1.2" />
                <circle cx={n.x} cy={n.y} r="1.6" fill="#2B2F33" />
              </g>
            ))}
            {/* cross-pattern tightening highlights on the four cardinal nuts */}
            <circle className={anim('c1s19-n1')} cx="0" cy="-30" r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={reduced ? { opacity: 0 } : undefined} />
            <circle className={anim('c1s19-n3')} cx="58" cy="0" r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={reduced ? { opacity: 0 } : undefined} />
            <circle className={anim('c1s19-n2')} cx="0" cy="30" r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={reduced ? { opacity: 0 } : undefined} />
            <circle className={anim('c1s19-n4')} cx="-58" cy="0" r="6" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={reduced ? { opacity: 0 } : undefined} />
          </g>
        </g>

        {/* ===== socket wrench tightening a nut ===== */}
        <g className={anim('c1s19-tool')} style={reduced ? { opacity: 1 } : undefined} transform="translate(120 108)">
          <g className={anim('c1s19-sock')} style={reduced ? { transform: 'rotate(0deg)' } : undefined}>
            <rect x="-4" y="-2" width="8" height="34" rx="3" fill="#2B2F33" stroke="#111417" strokeWidth="1.2" />
            <circle cx="0" cy="34" r="6" fill="#6E767E" stroke="#4B5157" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </svg>
  )
}
