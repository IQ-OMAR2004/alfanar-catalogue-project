// GIS Tank Modification — Step 31: "Fix the cable & cable dummy plug"
// Zoom on the lower CT / cable bushing zone: the test cable is fitted to the
// first bushing, then black dummy plugs are pushed into each remaining round
// bushing until every hole is closed — "all closed ✓". ~6s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const bushX = [92, 152, 212, 272] // four round bushing openings
  const bushY = 132

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Test cable fitted to one bushing and black dummy plugs pushed into every remaining bushing until all are closed"
    >
      <style>{`
        .g31-stage[data-paused] * { animation-play-state: paused !important; }

        /* the test cable rises and plugs into bushing #1 */
        .g31-cable--anim { animation: g31-cable 6s ease-in-out infinite; }
        @keyframes g31-cable {
          0%       { transform: translateY(46px); }
          6%       { transform: translateY(46px); }
          20%,100% { transform: translateY(0); }
        }
        /* dummy plugs push in one by one (staggered via delay) */
        .g31-plug--anim { animation: g31-plug 6s ease-in-out infinite; }
        @keyframes g31-plug {
          0%,26%   { transform: translateY(52px); opacity: 0.9; }
          38%,100% { transform: translateY(0); opacity: 1; }
        }
        /* per-bushing green ring once closed */
        .g31-ring--anim { animation: g31-ring 6s ease-in-out infinite; }
        @keyframes g31-ring {
          0%,40%   { opacity: 0; transform: scale(0.5); }
          48%,90%  { opacity: 0.9; transform: scale(1); }
          97%,100% { opacity: 0; transform: scale(0.5); }
        }
        /* final "all closed" badge */
        .g31-all--anim { animation: g31-all 6s ease-in-out infinite; }
        @keyframes g31-all {
          0%,72%   { opacity: 0; transform: scale(0.6); }
          80%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.6); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== lower tank wall with the row of round CT/cable bushings ===== */}
      <rect x="24" y="46" width="272" height="130" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* perimeter stud rows */}
      <g fill="#9BA19A">
        {[48, 88, 128, 168, 208, 248, 288].map((x) => (
          <circle key={'t' + x} cx={x} cy="54" r="2" />
        ))}
        {[48, 88, 128, 168, 208, 248, 288].map((x) => (
          <circle key={'b' + x} cx={x} cy="168" r="2" />
        ))}
      </g>

      {/* four round bushing terminal plates */}
      {bushX.map((x) => (
        <g key={x}>
          <circle cx={x} cy={bushY} r="22" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <circle
              key={deg}
              cx={x + 18 * Math.cos((deg * Math.PI) / 180)}
              cy={bushY + 18 * Math.sin((deg * Math.PI) / 180)}
              r="1.6"
              fill="#A9AEA6"
            />
          ))}
          {/* epoxy bushing throat visible in the opening */}
          <circle cx={x} cy={bushY} r="11" fill="#8C4A38" stroke="#6E3A2C" strokeWidth="1.5" />
          <circle cx={x} cy={bushY} r="5" fill="#C8CCC9" stroke="#8A9089" strokeWidth="1" />
        </g>
      ))}

      <g className="g31-stage" data-paused={paused ? '' : undefined}>
        {/* ===== test cable into bushing #1 ===== */}
        <g className={anim('g31-cable')} style={reduced ? undefined : undefined}>
          {/* cable body coming up from the floor */}
          <path d={`M ${bushX[0]} 214 V ${bushY + 24}`} stroke="#26292C" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* cable termination head seated on the bushing */}
          <rect x={bushX[0] - 9} y={bushY + 2} width="18" height="24" rx="4" fill="#1E2226" stroke="#000" strokeWidth="1.2" />
          <rect x={bushX[0] - 6} y={bushY - 4} width="12" height="8" rx="2" fill="#6E767E" />
        </g>

        {/* ===== black dummy plugs into bushings 2–4 ===== */}
        {bushX.slice(1).map((x, i) => (
          <g
            key={x}
            className={anim('g31-plug')}
            style={reduced ? undefined : { animationDelay: `${i * 0.7}s` }}
          >
            <circle cx={x} cy={bushY} r="10" fill="#1E2226" stroke="#000" strokeWidth="1.5" />
            <circle cx={x} cy={bushY} r="4" fill="#3A3F44" />
            {/* pull tab */}
            <rect x={x - 2.5} y={bushY - 3} width="5" height="6" rx="1.5" fill="#5A6068" />
          </g>
        ))}

        {/* green rings confirming each closed bushing */}
        {bushX.map((x, i) => (
          <circle
            key={x}
            className={anim('g31-ring')}
            style={
              reduced
                ? { opacity: 0.9 }
                : { animationDelay: `${i * 0.55}s`, transformOrigin: `${x}px ${bushY}px` }
            }
            cx={x} cy={bushY} r="26" fill="none" stroke="#2E9E5B" strokeWidth="2.5"
          />
        ))}

        {/* accent arrow pointing to the plug row */}
        <g stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M 212 78 v 22" />
          <path d="M 212 100 l -5 -7 M 212 100 l 5 -7" />
        </g>

        {/* ===== "all closed ✓" badge ===== */}
        <g className={anim('g31-all')} style={reduced ? { opacity: 1 } : { transformOrigin: '160px 32px' }}>
          <rect x="102" y="18" width="116" height="24" rx="6" fill="#2E9E5B" />
          <text x="160" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#fff">all closed ✓</text>
        </g>
      </g>
    </svg>
  )
}
