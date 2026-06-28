export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Set the tank on the floor, peel off all the wrapping, and inspect the surface">
      <style>{`
        @keyframes ga12-peel { 0% { transform: translate(0,0) rotate(0deg); opacity: 1 } 45% { transform: translate(34px,-6px) rotate(20deg); opacity: 1 } 70% { transform: translate(64px,22px) rotate(46deg); opacity: 0.5 } 100% { transform: translate(0,0) rotate(0deg); opacity: 1 } }
        @keyframes ga12-glass { 0% { transform: translate(0,0) } 50% { transform: translate(54px,18px) } 100% { transform: translate(0,0) } }
        @keyframes ga12-shine { 0% { opacity: 0 } 8% { opacity: 0.9 } 22% { opacity: 0 } 100% { opacity: 0 } }
        @keyframes ga12-check { 0% { opacity: 0 } 72% { opacity: 0 } 82% { opacity: 1 } 100% { opacity: 1 } }
        .ga12-wrap { transform-box: fill-box; transform-origin: 50% 100%; }
        .ga12-wrap--anim { animation: ga12-peel 3.2s ease-in-out infinite; }
        .ga12-glass { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga12-glass--anim { animation: ga12-glass 3.2s ease-in-out infinite; }
        .ga12-shine { opacity: 0; }
        .ga12-shine--anim { animation: ga12-shine 3.2s ease-in-out infinite; }
        .ga12-check { opacity: 0; }
        .ga12-check--anim { animation: ga12-check 3.2s ease-in-out infinite; }
        .ga12-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga12-stage" data-paused={paused ? '' : undefined}>
        {/* floor line — the tank is set down */}
        <rect x="30" y="190" width="260" height="10" rx="4" fill="var(--slate)" />
        <rect x="48" y="200" width="20" height="10" rx="2" fill="var(--slate)" opacity="0.6" />
        <rect x="252" y="200" width="20" height="10" rx="2" fill="var(--slate)" opacity="0.6" />

        {/* the clean tank resting on the floor */}
        <rect x="74" y="100" width="146" height="90" rx="20" fill="var(--accent)" opacity="0.94" />
        <circle cx="147" cy="145" r="22" fill="none" stroke="var(--on-accent)" strokeWidth="3" opacity="0.5" />
        <rect x="216" y="120" width="26" height="14" rx="4" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />

        {/* inspection shine sweep across the exposed surface */}
        <g className={anim('ga12-shine')}>
          <path d="M96 110 l16 0 l-40 70 l-16 0 z" fill="#fff" opacity="0.6" />
        </g>

        {/* wrapping film peeling off the tank */}
        <g className={anim('ga12-wrap')}>
          <path d="M74 100 q40 -16 146 0 l0 26 q-72 -16 -146 0 z" fill="var(--panel)" stroke="var(--ink2)"
            strokeWidth="2" opacity="0.85" />
          <path d="M86 104 l128 0" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
        </g>

        {/* magnifier inspecting for damage */}
        <g className={anim('ga12-glass')}>
          <circle cx="120" cy="150" r="20" fill="var(--sky)" opacity="0.28" stroke="var(--ink2)" strokeWidth="3" />
          <rect x="133" y="163" width="26" height="9" rx="4" fill="var(--ink2)"
            transform="rotate(40 133 163)" />
        </g>

        {/* inspect-OK badge appears at end of sweep */}
        <g className={anim('ga12-check')}>
          <circle cx="248" cy="170" r="17" fill="var(--ok)" />
          <path d="M240 170 l6 7 l11 -14" fill="none" stroke="#fff" strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* label */}
        <rect x="30" y="40" width="78" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="69" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">INSPECT</text>
      </g>
    </svg>
  )
}
