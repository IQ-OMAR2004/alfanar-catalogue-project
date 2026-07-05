export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Lowering the upper LV box onto the panel top and checking its door swings freely">
      <style>{`
        @keyframes g12-lower { 0% { transform: translateY(-30px); opacity: 0.9 } 45% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(0) } }
        @keyframes g12-door { 0%,50% { transform: rotate(0deg) } 70% { transform: rotate(-38deg) } 90%,100% { transform: rotate(0deg) } }
        @keyframes g12-bolt { 0%,45% { opacity: 0 } 60%,100% { opacity: 1 } }
        .g12-box--anim { animation: g12-lower 4.5s ease-in-out infinite; }
        .g12-door { transform-box: fill-box; transform-origin: 0% 50%; }
        .g12-door--anim { animation: g12-door 4.5s ease-in-out infinite; }
        .g12-bolt--anim { animation: g12-bolt 4.5s ease-in-out infinite; }
        .g12-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g12-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        {/* panel body below (mid + CT zone) */}
        <rect x="112" y="112" width="98" height="102" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="122" y="122" width="78" height="40" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
        {[0,1,2,3,4].map((i) => <circle key={i} cx={128 + i * 16.5} cy="127" r="2" fill="#9BA19A" />)}
        <circle cx="142" cy="188" r="13" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
        <circle cx="178" cy="188" r="13" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
        {/* upper LV box lowering into place */}
        <g className={anim('g12-box')}>
          <rect x="112" y="52" width="98" height="58" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* door with knobs + red pilots */}
          <g className={anim('g12-door')}>
            <rect x="118" y="58" width="86" height="46" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
            <circle cx="164" cy="74" r="4.5" fill="#1E2226" />
            <circle cx="182" cy="74" r="4.5" fill="#1E2226" />
            <circle cx="132" cy="90" r="3.5" fill="#C0392B" />
            <circle cx="132" cy="78" r="3.5" fill="#C0392B" />
            <rect x="192" y="78" width="5" height="14" rx="2" fill="#6E767E" />
          </g>
        </g>
        {/* fixing bolts appearing after seating */}
        <g className={anim('g12-bolt')}>
          <circle cx="118" cy="110" r="3.5" fill="#6E767E" />
          <circle cx="204" cy="110" r="3.5" fill="#6E767E" />
          <path d="M 230 104 L 236 111 L 248 96" fill="none" stroke="#1F9D6B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* guide arrow */}
        <path d="M 76 66 L 104 80" fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" markerEnd="none" />
        <polygon points="108,82 96,82 102,72" fill="var(--accent)" />
        <text x="58" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink2)">LV box</text>
        <text x="256" y="140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">17mm</text>
      </g>
    </svg>
  )
}
