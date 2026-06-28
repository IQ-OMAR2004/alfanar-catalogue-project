export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Fit the four CT support rods, add an M12 nut and washer on each, and bring them up to the CT top level">
      <style>{`
        @keyframes ga29-seat { 0% { transform: translateY(-46px); opacity: 0 } 22% { opacity: 1 } 60%,88% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-46px); opacity: 0 } }
        @keyframes ga29-spin { 0% { transform: rotate(0deg) } 60%,88% { transform: rotate(150deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga29-level { 0% { opacity: 0.3 } 60% { opacity: 0.3 } 72% { opacity: 1 } 100% { opacity: 0.3 } }
        @keyframes ga29-dash { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -16 } }
        .ga29-drop { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; transform: translateY(-46px); }
        .ga29-drop--anim { animation: ga29-seat 3s ease-in-out infinite; }
        .ga29-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga29-nut--anim { animation: ga29-spin 3s ease-in-out infinite; }
        .ga29-d2 { animation-delay: 0.5s; }
        .ga29-d3 { animation-delay: 1s; }
        .ga29-d4 { animation-delay: 1.5s; }
        .ga29-level { opacity: 0.3; }
        .ga29-level--anim { animation: ga29-level 3s ease-in-out infinite; }
        .ga29-leveldash--anim { animation: ga29-dash 1.6s linear infinite; }
        .ga29-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga29-stage" data-paused={paused ? '' : undefined}>
        {/* CT support plate base */}
        <rect x="34" y="176" width="252" height="22" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
        {/* nut sets fixed on the plate, one per rod */}
        <rect x="60" y="168" width="20" height="12" rx="3" fill="var(--ink2)" />
        <rect x="124" y="168" width="20" height="12" rx="3" fill="var(--ink2)" />
        <rect x="188" y="168" width="20" height="12" rx="3" fill="var(--ink2)" />
        <rect x="252" y="168" width="20" height="12" rx="3" fill="var(--ink2)" />

        {/* dashed CT-top target level line the rods must reach */}
        <g className={anim('ga29-level')}>
          <line x1="34" y1="62" x2="286" y2="62" stroke="var(--accent2)" strokeWidth="2.5"
            strokeDasharray="9 7" className={anim('ga29-leveldash')} />
          <rect x="34" y="44" width="84" height="16" rx="5" fill="var(--accent2)" />
          <text x="76" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">CT TOP</text>
        </g>

        {/* four threaded support rods reaching the level */}
        {[70, 134, 198, 262].map((x) => (
          <g key={x}>
            <rect x={x - 5} y="62" width="10" height="106" rx="4" fill="var(--slate)" />
            {[72, 86, 100, 114, 128, 142, 156].map((y) => (
              <line key={y} x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="var(--bg)" strokeWidth="2" opacity="0.55" />
            ))}
          </g>
        ))}

        {/* M12 washer + hex nut seating onto each rod, staggered */}
        {[
          { x: 70, c: 'ga29-drop' },
          { x: 134, c: 'ga29-drop ga29-d2' },
          { x: 198, c: 'ga29-drop ga29-d3' },
          { x: 262, c: 'ga29-drop ga29-d4' },
        ].map(({ x, c }) => (
          <g key={x} className={anim(c)}>
            {/* plane washer */}
            <ellipse cx={x} cy="86" rx="16" ry="6" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
            {/* hex nut tightening down */}
            <g className={anim('ga29-nut')} style={{ transformOrigin: `${x}px 76px` }}>
              <path d={`M${x} 64 l13 7 v10 l-13 7 l-13 -7 v-10 z`} fill="var(--accent)" stroke="var(--navy)" strokeWidth="2" />
              <circle cx={x} cy="76" r="5" fill="var(--navy)" />
            </g>
          </g>
        ))}

        {/* count / spec badge */}
        <rect x="196" y="44" width="90" height="26" rx="8" fill="var(--accent)" />
        <text x="241" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
          fontWeight="700" fill="var(--on-accent)">M12 · 4x</text>
      </g>
    </svg>
  )
}
