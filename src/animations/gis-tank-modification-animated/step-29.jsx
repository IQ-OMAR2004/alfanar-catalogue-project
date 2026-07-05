// GIS Tank Modification — Step 29: "Resolve all QC1 comments"
// QC1 report list: red comment items turn green one by one as a spanner moves
// down and fixes each point; a red-marker stroke is re-applied to a re-torqued
// fastener; ends with an all-green glow. ~6s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const items = [0, 1, 2] // three QC comments

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="QC1 report items turning from red to green as each comment is fixed; re-torqued bolt re-marked with red marker"
    >
      <style>{`
        .g29-stage[data-paused] * { animation-play-state: paused !important; }

        /* red status dots fade out one by one */
        .g29-red--anim { animation: g29-red 6s ease-in-out infinite; }
        @keyframes g29-red {
          0%,14%   { opacity: 1; }
          20%,92%  { opacity: 0; }
          98%,100% { opacity: 1; }
        }
        /* green status dots fade in one by one */
        .g29-grn--anim { animation: g29-grn 6s ease-in-out infinite; }
        @keyframes g29-grn {
          0%,14%   { opacity: 0; transform: scale(0.4); }
          20%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.4); }
        }
        /* spanner steps down the list, one fix per item */
        .g29-tool--anim { animation: g29-tool 6s ease-in-out infinite; }
        @keyframes g29-tool {
          0%,8%    { transform: translate(0,0) rotate(0deg); }
          12%      { transform: translate(0,0) rotate(-16deg); }
          16%      { transform: translate(0,0) rotate(0deg); }
          24%,30%  { transform: translate(0,26px) rotate(0deg); }
          34%      { transform: translate(0,26px) rotate(-16deg); }
          38%      { transform: translate(0,26px) rotate(0deg); }
          46%,52%  { transform: translate(0,52px) rotate(0deg); }
          56%      { transform: translate(0,52px) rotate(-16deg); }
          60%,66%  { transform: translate(0,52px) rotate(0deg); }
          80%,100% { transform: translate(0,0) rotate(0deg); opacity: 0; }
        }
        /* red marker stroke re-drawn on the fastener */
        .g29-mark--anim { stroke-dasharray: 26; animation: g29-mark 6s ease-in-out infinite; }
        @keyframes g29-mark {
          0%,60%   { stroke-dashoffset: 26; }
          72%,92%  { stroke-dashoffset: 0; }
          98%,100% { stroke-dashoffset: 26; }
        }
        /* final all-green glow */
        .g29-all--anim { animation: g29-all 6s ease-in-out infinite; }
        @keyframes g29-all {
          0%,76%   { opacity: 0; transform: scale(0.6); }
          84%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.6); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== QC1 report sheet (left) ===== */}
      <g>
        <rect x="30" y="36" width="130" height="150" rx="5" fill="#FFFFFF" stroke="#8A9089" strokeWidth="2" />
        <rect x="30" y="36" width="130" height="20" rx="5" fill="#C0392B" />
        <text x="95" y="51" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#fff">QC1</text>
        {items.map((i) => (
          <g key={i}>
            {/* item text line */}
            <line x1="62" y1={78 + i * 26} x2="146" y2={78 + i * 26} stroke="#A9AEA6" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="62" y1={85 + i * 26} x2="122" y2={85 + i * 26} stroke="#C2C6BF" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* ===== panel corner with the re-marked fastener (right) ===== */}
      <g>
        <rect x="196" y="60" width="100" height="150" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="206" y="72" width="80" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        <g fill="#9BA19A">
          {[80, 98, 116, 134].map((y) => (
            <circle key={'a' + y} cx="211" cy={y} r="2" />
          ))}
          {[80, 98, 116, 134].map((y) => (
            <circle key={'b' + y} cx="281" cy={y} r="2" />
          ))}
        </g>
        {/* the re-torqued fastener */}
        <circle cx="246" cy="106" r="7" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
        <path d="M 242 106 h 8 M 246 102 v 8" stroke="#6E767E" strokeWidth="1.4" />
        {/* CT plate hint below */}
        <circle cx="246" cy="180" r="15" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle
            key={deg}
            cx={246 + 11 * Math.cos((deg * Math.PI) / 180)}
            cy={180 + 11 * Math.sin((deg * Math.PI) / 180)}
            r="1.5"
            fill="#A9AEA6"
          />
        ))}
      </g>

      <g className="g29-stage" data-paused={paused ? '' : undefined}>
        {/* status dots: red → green, staggered per item */}
        {items.map((i) => (
          <g key={i}>
            <circle
              className={anim('g29-red')}
              style={reduced ? { opacity: 0 } : { animationDelay: `${i * 1.3}s` }}
              cx="50" cy={80 + i * 26} r="6" fill="#C0392B"
            />
            <circle
              className={anim('g29-grn')}
              style={
                reduced
                  ? { opacity: 1 }
                  : { animationDelay: `${i * 1.3}s`, transformOrigin: `50px ${80 + i * 26}px` }
              }
              cx="50" cy={80 + i * 26} r="6" fill="#2E9E5B"
            />
          </g>
        ))}

        {/* spanner working down the list */}
        <g className={anim('g29-tool')} style={reduced ? { opacity: 0 } : { transformOrigin: '176px 80px' }}>
          <g transform="translate(166 74)">
            <rect x="0" y="2" width="26" height="5" rx="2.5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
            <path d="M 0 4.5 a 5.5 5.5 0 1 1 -1 -3.4" fill="none" stroke="#6E767E" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>

        {/* red-marker stroke re-applied across the fastener */}
        <path
          className={anim('g29-mark')}
          style={reduced ? undefined : undefined}
          d="M 236 114 L 256 98"
          fill="none" stroke="#C0392B" strokeWidth="3.5" strokeLinecap="round"
        />

        {/* final all-green badge */}
        <g className={anim('g29-all')} style={reduced ? { opacity: 1 } : { transformOrigin: '95px 202px' }}>
          <rect x="46" y="190" width="98" height="24" rx="6" fill="#2E9E5B" />
          <text x="95" y="207" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#fff">0 open ✓</text>
        </g>
      </g>
    </svg>
  )
}
