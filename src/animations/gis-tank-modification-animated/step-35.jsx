export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Crane the breaker down into the tank with the balancing fixture, clear of the sides">
      <style>{`
        @keyframes ga35-lower { 0% { transform: translateY(-46px) } 50% { transform: translateY(0) } 100% { transform: translateY(-46px) } }
        @keyframes ga35-sway { 0% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } 100% { transform: rotate(-3deg) } }
        @keyframes ga35-warn { 0% { opacity: .25 } 50% { opacity: 1 } 100% { opacity: .25 } }
        @keyframes ga35-edge { 0% { opacity: 0 } 50% { opacity: .9 } 100% { opacity: 0 } }
        .ga35-rig { transform-box: fill-box; transform-origin: 50% 0%; }
        .ga35-rig--anim { animation: ga35-lower 3.2s ease-in-out infinite; }
        .ga35-sway--anim { transform-box: fill-box; transform-origin: 50% 0%; animation: ga35-sway 3.2s ease-in-out infinite; }
        .ga35-warn--anim { animation: ga35-warn 1.6s ease-in-out infinite; }
        .ga35-edge--anim { animation: ga35-edge 3.2s ease-in-out infinite; }
        .ga35-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga35-stage" data-paused={paused ? '' : undefined}>
        {/* overhead crane beam */}
        <rect x="40" y="20" width="240" height="12" rx="4" fill="var(--slate)" />
        <rect x="150" y="20" width="20" height="10" rx="3" fill="var(--ink2)" />

        {/* tank (open box the breaker lowers into) */}
        <path d="M64 120 L64 214 L256 214 L256 120" fill="var(--panel-2)" stroke="var(--navy)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" />
        <rect x="58" y="116" width="204" height="10" rx="3" fill="var(--navy)" />
        {/* clearance hint markers on the inner walls */}
        <g className={anim('ga35-edge')}>
          <path d="M78 132 L72 138 M78 138 L72 132" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
          <path d="M248 132 L242 138 M248 138 L242 132" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* rig: chain + fixture + breaker, descends as one unit */}
        <g className={anim('ga35-rig')}>
          <g className={anim('ga35-sway')}>
            {/* chain block */}
            <line x1="160" y1="32" x2="160" y2="62" stroke="var(--ink2)" strokeWidth="3" strokeDasharray="4 4" />
            <rect x="150" y="62" width="20" height="16" rx="3" fill="var(--slate)" />
            {/* balancing fixture (spreader bar) */}
            <line x1="160" y1="78" x2="160" y2="90" stroke="var(--ink2)" strokeWidth="3" />
            <rect x="108" y="90" width="104" height="9" rx="4" fill="var(--accent2)" />
            <line x1="120" y1="99" x2="120" y2="112" stroke="var(--ink2)" strokeWidth="2.5" />
            <line x1="200" y1="99" x2="200" y2="112" stroke="var(--ink2)" strokeWidth="2.5" />
            {/* the breaker body */}
            <rect x="112" y="112" width="96" height="52" rx="6" fill="var(--accent)" />
            <rect x="124" y="124" width="72" height="14" rx="3" fill="var(--on-accent)" opacity="0.85" />
            <circle cx="136" cy="152" r="5" fill="var(--panel)" />
            <circle cx="184" cy="152" r="5" fill="var(--panel)" />
          </g>
        </g>

        {/* fastener spec badge */}
        <rect x="20" y="186" width="74" height="30" rx="6" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2" />
        <text x="57" y="199" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">4x M10</text>
        <text x="57" y="211" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">26.5 Nm</text>

        {/* caution glyph */}
        <g className={anim('ga35-warn')}>
          <path d="M286 188 L300 214 L272 214 Z" fill="var(--warn)" stroke="var(--warn)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="284" y="198" width="4" height="8" rx="2" fill="#fff" />
          <rect x="284" y="208" width="4" height="4" rx="2" fill="#fff" />
        </g>
      </g>
    </svg>
  )
}
