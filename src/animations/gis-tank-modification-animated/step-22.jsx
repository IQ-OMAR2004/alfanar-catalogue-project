export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Fixing the CVI bracket so the voltage indicator window is visible from the operator side">
      <style>{`
        @keyframes g22-fit { 0% { transform: translateX(46px); opacity: 0.85 } 45% { transform: translateX(0); opacity: 1 } 100% { transform: translateX(0) } }
        @keyframes g22-lamp { 0%,50% { opacity: 0.25 } 65% { opacity: 1 } 80%,100% { opacity: 0.25 } }
        @keyframes g22-sight { 0%,45% { opacity: 0 } 65%,90% { opacity: 1 } 100% { opacity: 0 } }
        .g22-cvi--anim { animation: g22-fit 4s ease-in-out infinite; }
        .g22-lamp--anim { animation: g22-lamp 4s ease-in-out infinite; }
        .g22-sight--anim { animation: g22-sight 4s ease-in-out infinite; }
        .g22-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g22-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        {/* panel front (operator side) */}
        <rect x="72" y="34" width="110" height="180" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="82" y="44" width="90" height="52" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
        <circle cx="98" cy="60" r="4" fill="#1E2226" />
        <circle cx="98" cy="76" r="3.5" fill="#C0392B" />
        {[0,1,2,3].map((i) => <circle key={i} cx={92 + i * 22} cy="106" r="2" fill="#9BA19A" />)}
        <rect x="82" y="116" width="90" height="60" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
        {/* CVI bracket sliding in */}
        <g className={anim('g22-cvi')}>
          <rect x="126" y="128" width="40" height="34" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
          <rect x="132" y="134" width="28" height="16" rx="3" fill="#1E2226" />
          {/* 3 CVI lamps (L1 L2 L3) */}
          <circle className={anim('g22-lamp')} cx="139" cy="142" r="3" fill="#FF5A4E" />
          <circle className={anim('g22-lamp')} cx="146" cy="142" r="3" fill="#FF5A4E" style={reduced ? undefined : { animationDelay: '0.25s' }} />
          <circle className={anim('g22-lamp')} cx="153" cy="142" r="3" fill="#FF5A4E" style={reduced ? undefined : { animationDelay: '0.5s' }} />
          <text x="146" y="158" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#3C4B5B">L1 L2 L3</text>
          <circle cx="131" cy="132" r="2" fill="#6E767E" />
          <circle cx="161" cy="158" r="2" fill="#6E767E" />
        </g>
        {/* operator eye + sight line */}
        <g className={anim('g22-sight')}>
          <line x1="252" y1="120" x2="170" y2="142" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 5" />
          <polygon points="176,138 176,148 166,143" fill="var(--accent)" />
        </g>
        <ellipse cx="262" cy="118" rx="13" ry="8" fill="none" stroke="var(--ink2)" strokeWidth="2.5" />
        <circle cx="262" cy="118" r="3.5" fill="var(--ink2)" />
        <text x="262" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">operator</text>
        <g>
          <rect x="212" y="52" width="58" height="24" rx="7" fill="var(--accent)" />
          <text x="241" y="69" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--on-accent)">CVI</text>
        </g>
      </g>
    </svg>
  )
}
