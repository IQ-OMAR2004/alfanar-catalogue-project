// GIS Tank Modification — Step 25: "Fix the rear-side cover & apply the door labels"
// Rear-side cover bolted on (bolts pop in around the perimeter), then a white
// label with a red bar is applied straight onto the door along a dashed
// alignment guide line; a serial-check badge confirms. ~5s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const boltDelays = [0, 0.18, 0.36, 0.54, 0.72, 0.9]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Rear-side cover being bolted, then a door label applied straight along an alignment guide, serial verified"
    >
      <style>{`
        .g25-stage[data-paused] * { animation-play-state: paused !important; }

        /* cover slides onto the rear side, then bolts pop in */
        .g25-cover--anim { animation: g25-cover 5s ease-in-out infinite; }
        @keyframes g25-cover {
          0%       { transform: translateX(-26px); opacity: 0.4; }
          14%,100% { transform: translateX(0); opacity: 1; }
        }
        .g25-bolt--anim { animation: g25-bolt 5s ease-in-out infinite; }
        @keyframes g25-bolt {
          0%,16%   { opacity: 0; transform: scale(0.2); }
          22%,100% { opacity: 1; transform: scale(1); }
        }
        /* dashed alignment guide appears on the door */
        .g25-guide--anim { animation: g25-guide 5s ease-in-out infinite; }
        @keyframes g25-guide {
          0%,34%   { opacity: 0; }
          42%,78%  { opacity: 0.9; }
          86%,100% { opacity: 0; }
        }
        /* label floats down onto the door, level with the guide */
        .g25-label--anim { animation: g25-label 5s ease-in-out infinite; }
        @keyframes g25-label {
          0%,38%   { transform: translateY(-34px) rotate(-6deg); opacity: 0; }
          46%      { transform: translateY(-16px) rotate(-3deg); opacity: 1; }
          58%,100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        /* serial-check badge after the label is on */
        .g25-serial--anim { animation: g25-serial 5s ease-in-out infinite; }
        @keyframes g25-serial {
          0%,62%   { opacity: 0; transform: scale(0.6); }
          70%,88%  { opacity: 1; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.6); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== rear/side tank body (left half) ===== */}
      <rect x="24" y="34" width="118" height="180" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* upper bolted rectangular cover already in place */}
      <rect x="38" y="44" width="90" height="66" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        {[46, 66, 86, 106].map((x) => (
          <circle key={'t' + x} cx={x + 2} cy="50" r="2" />
        ))}
        {[46, 66, 86, 106].map((x) => (
          <circle key={'b' + x} cx={x + 2} cy="104" r="2" />
        ))}
      </g>

      {/* ===== door face (right half) where the label goes ===== */}
      <rect x="176" y="34" width="120" height="180" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="188" y="46" width="96" height="156" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      {/* door handle hint */}
      <circle cx="276" cy="124" r="5" fill="#1E2226" />
      {/* two pilot lights */}
      <circle cx="200" cy="56" r="3.5" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />
      <circle cx="212" cy="56" r="3.5" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />

      <g className="g25-stage" data-paused={paused ? '' : undefined}>
        {/* ===== rear-side lower cover sliding into place ===== */}
        <g className={anim('g25-cover')} style={reduced ? undefined : undefined}>
          <rect x="38" y="126" width="90" height="76" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        </g>
        {/* bolts popping in around the cover */}
        {[
          [46, 134], [83, 134], [120, 134],
          [46, 194], [83, 194], [120, 194],
        ].map(([x, y], i) => (
          <g
            key={i}
            className={anim('g25-bolt')}
            style={
              reduced
                ? { opacity: 1 }
                : { animationDelay: `${boltDelays[i]}s`, transformOrigin: `${x}px ${y}px` }
            }
          >
            <circle cx={x} cy={y} r="3.2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
          </g>
        ))}

        {/* ===== dashed alignment guide line on the door ===== */}
        <line
          className={anim('g25-guide')}
          style={reduced ? { opacity: 0.9 } : undefined}
          x1="196" y1="106" x2="276" y2="106"
          stroke="var(--accent)" strokeWidth="1.8" strokeDasharray="6 5"
        />

        {/* ===== white label with red bar, applied straight ===== */}
        <g className={anim('g25-label')} style={reduced ? undefined : undefined}>
          <rect x="204" y="110" width="64" height="34" rx="2" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
          <rect x="204" y="110" width="64" height="8" fill="#C0392B" />
          <line x1="210" y1="126" x2="262" y2="126" stroke="#A9AEA6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="210" y1="134" x2="248" y2="134" stroke="#C2C6BF" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ===== serial-check badge ===== */}
        <g className={anim('g25-serial')} style={reduced ? { opacity: 1 } : { transformOrigin: '236px 172px' }}>
          <rect x="196" y="158" width="80" height="26" rx="6" fill="var(--accent)" />
          <text x="230" y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">S/N ✓</text>
        </g>
      </g>
    </svg>
  )
}
