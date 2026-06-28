export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Fitting the bushing plate to the lower tank, chamfered holes inside, then checking the seating">
      <style>{`
        @keyframes ga20-drop { 0% { transform: translateY(-46px) } 60% { transform: translateY(0) } 70% { transform: translateY(-3px) } 100% { transform: translateY(-46px) } }
        @keyframes ga20-seat { 0%,55% { opacity: 0 } 72% { opacity: 1 } 92% { opacity: 1 } 100% { opacity: 0 } }
        @keyframes ga20-pulse { 0%,55% { opacity: 0; transform: scale(.6) } 74% { opacity: .9; transform: scale(1) } 100% { opacity: 0; transform: scale(1.5) } }
        @keyframes ga20-bob { 0% { transform: translateY(0) } 50% { transform: translateY(-3px) } 100% { transform: translateY(0) } }
        .ga20-plate { transform: translateY(-46px); }
        .ga20-plate--anim { animation: ga20-drop 3.2s ease-in-out infinite; }
        .ga20-check--anim { animation: ga20-seat 3.2s ease-in-out infinite; }
        .ga20-ring { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga20-ring--anim { animation: ga20-pulse 3.2s ease-out infinite; }
        .ga20-arrow--anim { animation: ga20-bob 3.2s ease-in-out infinite; }
        .ga20-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga20-stage" data-paused={paused ? '' : undefined}>
        {/* tank lower wall (target seat) */}
        <rect x="78" y="120" width="164" height="100" rx="10" fill="var(--panel)" stroke="var(--slate)" strokeWidth="3" />
        <rect x="92" y="138" width="136" height="14" rx="4" fill="var(--panel-2)" />
        {/* seat opening on tank where plate lands */}
        <rect x="96" y="154" width="128" height="20" rx="4" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" strokeDasharray="6 6" />

        {/* descending bushing plate */}
        <g className={anim('ga20-plate')}>
          {/* flat outer face (left = outside) */}
          <rect x="92" y="150" width="136" height="30" rx="5" fill="var(--accent)" />
          <rect x="92" y="150" width="9" height="30" rx="3" fill="var(--accent2)" opacity="0.85" />
          {/* chamfered holes (inside) — cones */}
          <g fill="var(--bg)" stroke="var(--navy)" strokeWidth="2">
            <circle cx="128" cy="165" r="7" />
            <circle cx="160" cy="165" r="7" />
            <circle cx="192" cy="165" r="7" />
          </g>
          <g fill="var(--panel-2)">
            <circle cx="128" cy="165" r="3.4" />
            <circle cx="160" cy="165" r="3.4" />
            <circle cx="192" cy="165" r="3.4" />
          </g>
          {/* seat-confirm ring + check pulse over the plate */}
          <circle className={anim('ga20-ring')} cx="160" cy="165" r="22" fill="none" stroke="var(--ok)" strokeWidth="3" />
          <g className={anim('ga20-check')} transform="translate(206 150)">
            <circle cx="0" cy="0" r="11" fill="var(--ok)" />
            <path d="M -5 0 L -1.5 4 L 5 -4.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* down arrow guiding the fit */}
        <g className={anim('ga20-arrow')} fill="var(--ink2)">
          <rect x="156" y="34" width="8" height="40" rx="3" />
          <path d="M 142 70 L 178 70 L 160 92 Z" />
        </g>

        {/* side labels: outside (flat) vs inside (chamfer) */}
        <text x="44" y="118" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)" textAnchor="middle">FLAT</text>
        <text x="44" y="131" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)" textAnchor="middle">OUT</text>
        <text x="284" y="118" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" textAnchor="middle">CHAMF</text>
        <text x="284" y="131" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)" textAnchor="middle">IN</text>
      </g>
    </svg>
  )
}
