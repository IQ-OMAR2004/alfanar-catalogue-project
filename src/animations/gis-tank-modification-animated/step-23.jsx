export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Testing the door interlock: the door is blocked while the interlock is engaged, then opens when released">
      <style>{`
        @keyframes g23-doorTry { 0%,10% { transform: rotate(0deg) } 22% { transform: rotate(-6deg) } 30% { transform: rotate(0deg) } 38% { transform: rotate(-6deg) } 46%,55% { transform: rotate(0deg) } 75% { transform: rotate(-42deg) } 92%,100% { transform: rotate(0deg) } }
        @keyframes g23-cam { 0%,50% { transform: rotate(0deg) } 60%,88% { transform: rotate(70deg) } 100% { transform: rotate(0deg) } }
        @keyframes g23-blocked { 0%,10% { opacity: 0 } 20%,45% { opacity: 1 } 55%,100% { opacity: 0 } }
        @keyframes g23-released { 0%,55% { opacity: 0 } 65%,90% { opacity: 1 } 100% { opacity: 0 } }
        .g23-door { transform-box: fill-box; transform-origin: 0% 50%; }
        .g23-door--anim { animation: g23-doorTry 6s ease-in-out infinite; }
        .g23-cam { transform-box: fill-box; transform-origin: 50% 50%; }
        .g23-cam--anim { animation: g23-cam 6s ease-in-out infinite; }
        .g23-blocked--anim { animation: g23-blocked 6s ease-in-out infinite; }
        .g23-released--anim { animation: g23-released 6s ease-in-out infinite; }
        .g23-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g23-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        {/* panel frame */}
        <rect x="60" y="34" width="130" height="180" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* door (hinged left) */}
        <g className={anim('g23-door')}>
          <rect x="70" y="46" width="108" height="156" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
          {[0,1,2,3].map((i) => <circle key={`l${i}`} cx="76" cy={60 + i * 42} r="2" fill="#9BA19A" />)}
          <rect x="164" y="112" width="6" height="20" rx="2" fill="#6E767E" />
          <circle cx="120" cy="70" r="3.5" fill="#C0392B" />
        </g>
        {/* interlock assembly (right of door) */}
        <rect x="188" y="104" width="26" height="44" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        <g className={anim('g23-cam')}>
          <rect x="192" y="120" width="26" height="9" rx="3" fill="#C0392B" stroke="#8A2A20" strokeWidth="1.5" />
        </g>
        <circle cx="201" cy="124" r="3" fill="#3A4046" />
        {/* status labels */}
        <g className={anim('g23-blocked')}>
          <rect x="226" y="82" width="80" height="26" rx="8" fill="var(--warn)" />
          <text x="266" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="#FFFFFF">LOCKED</text>
        </g>
        <g className={anim('g23-released')}>
          <rect x="226" y="82" width="80" height="26" rx="8" fill="#1F9D6B" />
          <text x="266" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="#FFFFFF">OPEN</text>
        </g>
        {/* full-cycle test note + hazard */}
        <text x="266" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">test full</text>
        <text x="266" y="143" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">cycle</text>
        <g>
          <polygon points="278,174 294,202 262,202" fill="var(--warn)" />
          <text x="278" y="197" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#FFFFFF">!</text>
        </g>
      </g>
    </svg>
  )
}
