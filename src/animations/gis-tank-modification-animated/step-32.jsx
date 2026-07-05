// GIS Tank Modification — Step 32: "Fix the top bushing plate"
// Panel roof, top view: the bushing plate lowers on with a chamfer-inside
// orientation cue, then a torque wrench works evenly around the bolts
// ("26.5 Nm"); each torqued bolt is marked red. ~6.5s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const C = { x: 160, y: 118 } // plate centre
  const boltAngles = [-90, 0, 90, 180] // cross-pattern order: N, E, S, W
  const boltR = 42
  const bolts = boltAngles.map((deg) => ({
    deg,
    x: C.x + boltR * Math.cos((deg * Math.PI) / 180),
    y: C.y + boltR * Math.sin((deg * Math.PI) / 180),
  }))

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Top bushing plate fitted chamfer-inside, then torqued evenly around the bolts to 26.5 Nm and marked red"
    >
      <style>{`
        .g32-stage[data-paused] * { animation-play-state: paused !important; }

        /* plate lowers into place (scale = descending in top view) */
        .g32-plate--anim { animation: g32-plate 6.5s ease-in-out infinite; transform-origin: ${C.x}px ${C.y}px; }
        @keyframes g32-plate {
          0%       { transform: scale(1.25); opacity: 0.55; }
          14%,100% { transform: scale(1); opacity: 1; }
        }
        /* chamfer-inside orientation cue flashes early */
        .g32-cham--anim { animation: g32-cham 6.5s ease-in-out infinite; }
        @keyframes g32-cham {
          0%,4%    { opacity: 0; }
          10%,26%  { opacity: 1; }
          32%,100% { opacity: 0; }
        }
        /* torque wrench hops bolt to bolt in a cross pattern */
        .g32-tool--anim { animation: g32-tool 6.5s ease-in-out infinite; transform-origin: ${C.x}px ${C.y}px; }
        @keyframes g32-tool {
          0%,26%   { transform: rotate(-90deg); opacity: 0; }
          30%,38%  { transform: rotate(-90deg); opacity: 1; }
          44%,52%  { transform: rotate(0deg); opacity: 1; }
          58%,66%  { transform: rotate(90deg); opacity: 1; }
          72%,80%  { transform: rotate(180deg); opacity: 1; }
          86%,100% { transform: rotate(180deg); opacity: 0; }
        }
        /* red marks pop onto each bolt after its torque */
        .g32-mark--anim { animation: g32-mark 6.5s ease-in-out infinite; }
        @keyframes g32-mark {
          0%,38%   { opacity: 0; transform: scale(0.3); }
          44%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.3); }
        }
        /* Nm badge visible during the torque sequence */
        .g32-nm--anim { animation: g32-nm 6.5s ease-in-out infinite; }
        @keyframes g32-nm {
          0%,24%   { opacity: 0; transform: translateY(6px); }
          32%,88%  { opacity: 1; transform: translateY(0); }
          96%,100% { opacity: 0; transform: translateY(6px); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />

      {/* ===== panel roof, top view ===== */}
      <rect x="60" y="34" width="200" height="170" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* roof stud rows */}
      <g fill="#9BA19A">
        {[80, 120, 160, 200, 240].map((x) => (
          <circle key={'t' + x} cx={x} cy="42" r="2" />
        ))}
        {[80, 120, 160, 200, 240].map((x) => (
          <circle key={'b' + x} cx={x} cy="196" r="2" />
        ))}
      </g>
      {/* bushing opening in the roof (below the plate) */}
      <circle cx={C.x} cy={C.y} r="30" fill="#8C4A38" stroke="#6E3A2C" strokeWidth="2" />
      <circle cx={C.x} cy={C.y} r="14" fill="#A75E48" />
      <circle cx={C.x} cy={C.y} r="6" fill="#C8CCC9" stroke="#8A9089" strokeWidth="1.2" />

      <g className="g32-stage" data-paused={paused ? '' : undefined}>
        {/* ===== the top bushing plate lowering on ===== */}
        <g className={anim('g32-plate')} style={reduced ? undefined : undefined}>
          <circle cx={C.x} cy={C.y} r="52" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2.5" />
          {/* chamfered inner edge (double ring = chamfer inside) */}
          <circle cx={C.x} cy={C.y} r="32" fill="none" stroke="#A9AEA6" strokeWidth="4" />
          <circle cx={C.x} cy={C.y} r="28" fill="#8C4A38" stroke="#6E3A2C" strokeWidth="1.5" />
          <circle cx={C.x} cy={C.y} r="6" fill="#C8CCC9" stroke="#8A9089" strokeWidth="1.2" />
          {/* the four fixing bolts */}
          {bolts.map((b) => (
            <g key={b.deg}>
              <circle cx={b.x} cy={b.y} r="5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.8" />
              <path d={`M ${b.x - 3} ${b.y} h 6 M ${b.x} ${b.y - 3} v 6`} stroke="#6E767E" strokeWidth="1.2" />
            </g>
          ))}
        </g>

        {/* ===== chamfer-inside orientation cue ===== */}
        <g className={anim('g32-cham')} style={reduced ? { opacity: 0.9 } : undefined}>
          <path d={`M ${C.x + 66} ${C.y - 40} q -18 8 -30 22`} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M ${C.x + 36} ${C.y - 18} l 8 -1 M ${C.x + 36} ${C.y - 18} l 2 -8`} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x={C.x + 56} y={C.y - 62} width="76" height="18" rx="5" fill="var(--accent)" />
          <text x={C.x + 94} y={C.y - 49} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">chamfer in</text>
        </g>

        {/* ===== torque wrench rotating around the bolt circle ===== */}
        <g className={anim('g32-tool')} style={reduced ? { opacity: 0 } : undefined}>
          {/* wrench positioned at the E bolt (rotated by keyframes) */}
          <g transform={`translate(${C.x + boltR} ${C.y})`}>
            <circle cx="0" cy="0" r="7" fill="none" stroke="#6E767E" strokeWidth="3.5" />
            <rect x="6" y="-3" width="34" height="6" rx="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
            <rect x="34" y="-4" width="10" height="8" rx="2.5" fill="#D8452B" stroke="#2B2F33" strokeWidth="1" />
          </g>
        </g>

        {/* ===== red torque marks on each bolt (staggered with the wrench) ===== */}
        {bolts.map((b, i) => (
          <path
            key={b.deg}
            className={anim('g32-mark')}
            style={
              reduced
                ? { opacity: 1 }
                : { animationDelay: `${i * 0.91}s`, transformOrigin: `${b.x}px ${b.y}px` }
            }
            d={`M ${b.x - 7} ${b.y + 7} L ${b.x + 7} ${b.y - 7}`}
            stroke="#C0392B" strokeWidth="3" strokeLinecap="round" fill="none"
          />
        ))}

        {/* ===== "26.5 Nm" badge ===== */}
        <g className={anim('g32-nm')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="112" y="212" width="96" height="24" rx="6" fill="var(--accent)" />
          <text x="160" y="229" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">26.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
