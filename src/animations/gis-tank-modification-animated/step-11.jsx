export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Crane lowering the tank onto the base and bolting it with M16 bolts and a 24 mm socket">
      <style>{`
        @keyframes g11-lower { 0% { transform: translateY(-34px) } 55% { transform: translateY(0) } 100% { transform: translateY(0) } }
        @keyframes g11-spin { 0%,55% { transform: rotate(0deg); opacity: 0 } 60% { opacity: 1 } 100% { transform: rotate(-720deg); opacity: 1 } }
        @keyframes g11-glow { 0%,50% { opacity: 0 } 70% { opacity: 1 } 100% { opacity: 0.6 } }
        .g11-tank--anim { animation: g11-lower 4.5s ease-in-out infinite; }
        .g11-socket { transform-box: fill-box; transform-origin: 50% 50%; }
        .g11-socket--anim { animation: g11-spin 4.5s ease-in-out infinite; }
        .g11-glow--anim { animation: g11-glow 4.5s ease-in-out infinite; }
        .g11-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g11-stage" data-paused={paused ? '' : undefined}>
        {/* floor + crane girder */}
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        <rect x="0" y="14" width="320" height="12" fill="#F2B826" stroke="#C8991F" strokeWidth="1.5" />
        <rect x="128" y="26" width="34" height="16" rx="3" fill="#2C6FB4" />
        {/* base frame */}
        <rect x="96" y="190" width="128" height="20" rx="2" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
        <rect x="104" y="196" width="10" height="8" fill="#6E767E" />
        <rect x="206" y="196" width="10" height="8" fill="#6E767E" />
        {/* tank descending on chains */}
        <g className={anim('g11-tank')}>
          <line x1="145" y1="42" x2="120" y2="72" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          <line x1="145" y1="42" x2="196" y2="72" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          {/* ALFA-G tank body */}
          <rect x="110" y="72" width="98" height="116" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          <rect x="120" y="82" width="78" height="44" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
          {[0,1,2,3,4].map((i) => <circle key={i} cx={126 + i * 16.5} cy="87" r="2" fill="#9BA19A" />)}
          <circle cx="140" cy="155" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
          <circle cx="176" cy="155" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
          {/* legs */}
          <rect x="116" y="188" width="10" height="6" fill="#7C837B" />
          <rect x="192" y="188" width="10" height="6" fill="#7C837B" />
        </g>
        {/* alignment glow on base holes */}
        <circle className={anim('g11-glow')} cx="109" cy="200" r="8" fill="none" stroke="var(--accent)" strokeWidth="3" />
        {/* ratchet + 24mm socket on the fixing bolt */}
        <g transform="translate(248 196)">
          <g className={anim('g11-socket')}>
            <circle r="12" fill="none" stroke="#6E767E" strokeWidth="4" strokeDasharray="5 4" />
          </g>
          <rect x="9" y="-5" width="44" height="10" rx="5" fill="#6E767E" transform="rotate(-30)" />
          <text x="0" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">24mm</text>
        </g>
        {/* badges */}
        <g>
          <rect x="18" y="60" width="70" height="24" rx="7" fill="var(--accent)" />
          <text x="53" y="77" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--on-accent)">M16×40</text>
        </g>
        <g>
          <polygon points="286,44 302,72 270,72" fill="var(--warn)" />
          <text x="286" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#FFFFFF">!</text>
        </g>
      </g>
    </svg>
  )
}
