// Case 1 — Step 9: "Dismantle: remove the closing sheets"
// A pale cream-green cover plate with a bright aluminium ring flange lifts OFF
// the grey tank; the black O-ring seal is highlighted lifting out of its groove;
// perimeter nuts back off around the rim. Loop ~4.8s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const nutAngles = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cream-green closing sheet with aluminium ring flange lifting off the tank, the black O-ring seal rising out of its groove, perimeter nuts backing off"
    >
      <style>{`
        .c1s9-stage[data-paused] * { animation-play-state: paused !important; }
        /* nuts back off (spin) first */
        .c1s9-nuts--anim { animation: c1s9-nuts 4.8s ease-in-out infinite; transform-origin: 130px 128px; }
        @keyframes c1s9-nuts {
          0%      { transform: rotate(0deg); }
          30%,100%{ transform: rotate(-120deg); }
        }
        /* closing sheet lifts up and away */
        .c1s9-sheet--anim { animation: c1s9-sheet 4.8s ease-in-out infinite; }
        @keyframes c1s9-sheet {
          0%,28%   { transform: translate(0,0); }
          60%,100% { transform: translate(0,-58px); }
        }
        /* black O-ring lifts a touch later + glows */
        .c1s9-oring--anim { animation: c1s9-oring 4.8s ease-in-out infinite; }
        @keyframes c1s9-oring {
          0%,34%   { transform: translate(0,0); }
          66%,100% { transform: translate(0,-36px); }
        }
        .c1s9-glow--anim { animation: c1s9-glow 4.8s ease-in-out infinite; }
        @keyframes c1s9-glow {
          0%,40%   { opacity: 0; }
          70%,100% { opacity: 1; }
        }
        .c1s9-arr--anim { animation: c1s9-arr 4.8s ease-in-out infinite; }
        @keyframes c1s9-arr {
          0%,20%   { opacity: 0; }
          40%,80%  { opacity: 1; }
          100%     { opacity: 0; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* ===== grey tank body with the sealing flange face (front view) ===== */}
      <g transform="translate(0 0)">
        <rect x="70" y="118" width="120" height="96" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* flange rim the cover seals against */}
        <ellipse cx="130" cy="128" rx="58" ry="16" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        {/* dark O-ring groove opening */}
        <ellipse cx="130" cy="128" rx="42" ry="10" fill="#A9AEA6" />
        <ellipse cx="130" cy="128" rx="30" ry="6.5" fill="#5A6058" />
      </g>

      {/* extraction arrow */}
      <g className={anim('c1s9-arr')} style={reduced ? { opacity: 1 } : undefined}>
        <path d="M 130 100 v -30 M 122 80 l 8 -10 l 8 10" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="c1s9-stage" data-paused={paused ? '' : undefined}>
        {/* ===== black O-ring lifting out of the groove (highlighted) ===== */}
        <g className={anim('c1s9-oring')} style={reduced ? { transform: 'translate(0,-36px)' } : undefined}>
          <ellipse cx="130" cy="128" rx="42" ry="10" fill="none" stroke="#222" strokeWidth="6" />
          <ellipse cx="130" cy="128" rx="42" ry="10" fill="none" stroke="#444" strokeWidth="2" opacity="0.6" />
          {/* accent glow ring on the O-ring */}
          <g className={anim('c1s9-glow')} style={reduced ? { opacity: 1 } : undefined}>
            <ellipse cx="130" cy="128" rx="46" ry="12.5" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />
          </g>
        </g>

        {/* ===== the closing sheet (cover plate) lifting off ===== */}
        <g className={anim('c1s9-sheet')} style={reduced ? { transform: 'translate(0,-58px)' } : undefined}>
          {/* cream-green plate */}
          <ellipse cx="130" cy="128" rx="58" ry="16" fill="#DFE4D2" stroke="#8A9089" strokeWidth="2.2" />
          {/* black O-ring loop around the rim of the plate */}
          <ellipse cx="130" cy="128" rx="54" ry="14" fill="none" stroke="#222" strokeWidth="3" />
          {/* bright aluminium ring flange in the middle */}
          <ellipse cx="130" cy="127" rx="30" ry="8" fill="#C9CED4" stroke="#8A9099" strokeWidth="1.8" />
          <ellipse cx="130" cy="127" rx="16" ry="4.2" fill="#AEB4B9" stroke="#8A9099" strokeWidth="1.2" />
          {/* perimeter nuts (back off / spin) */}
          <g className={anim('c1s9-nuts')} style={reduced ? undefined : undefined}>
            {nutAngles.map((a) => {
              const rad = (a * Math.PI) / 180
              const cx = 130 + 50 * Math.cos(rad)
              const cy = 128 + 13 * Math.sin(rad)
              return <circle key={a} cx={cx} cy={cy} r="2.6" fill="#6E767E" stroke="#3A3F3B" strokeWidth="1" />
            })}
          </g>
        </g>
      </g>
    </svg>
  )
}
