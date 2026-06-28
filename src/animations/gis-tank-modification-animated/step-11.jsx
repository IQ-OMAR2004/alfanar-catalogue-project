export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Sling the new tank and lift it off the pallet with the overhead crane">
      <style>{`
        @keyframes ga11-hoist { 0% { transform: translateY(0) } 50% { transform: translateY(-30px) } 100% { transform: translateY(0) } }
        @keyframes ga11-sway { 0% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } 100% { transform: rotate(-3deg) } }
        @keyframes ga11-trolley { 0% { transform: translateX(0) } 50% { transform: translateX(8px) } 100% { transform: translateX(0) } }
        @keyframes ga11-pulse { 0% { opacity: 0.35 } 50% { opacity: 1 } 100% { opacity: 0.35 } }
        .ga11-rig { transform-box: fill-box; transform-origin: 50% 0%; }
        .ga11-rig--anim { animation: ga11-hoist 3.2s ease-in-out infinite; }
        .ga11-load { transform-box: fill-box; transform-origin: 50% 6%; transform: rotate(-3deg); }
        .ga11-load--anim { animation: ga11-sway 3.2s ease-in-out infinite; }
        .ga11-trolley { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga11-trolley--anim { animation: ga11-trolley 3.2s ease-in-out infinite; }
        .ga11-warn { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga11-warn--anim { animation: ga11-pulse 1.6s ease-in-out infinite; }
        .ga11-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga11-stage" data-paused={paused ? '' : undefined}>
        {/* overhead crane runway beam */}
        <rect x="24" y="26" width="272" height="16" rx="4" fill="var(--navy)" />
        <rect x="24" y="22" width="272" height="6" rx="3" fill="var(--slate)" />

        {/* trolley riding the beam */}
        <g className={anim('ga11-trolley')}>
          <rect x="138" y="42" width="44" height="14" rx="4" fill="var(--slate)" />
          <circle cx="148" cy="44" r="4" fill="var(--ink2)" />
          <circle cx="172" cy="44" r="4" fill="var(--ink2)" />

          {/* everything below the trolley raises together */}
          <g className={anim('ga11-rig')}>
            {/* hoist cable + hook block */}
            <rect x="158" y="56" width="4" height="34" rx="2" fill="var(--ink2)" />
            <rect x="150" y="88" width="20" height="14" rx="4" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />
            <path d="M160 102 q-7 0 -7 7 q0 6 6 6" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />

            {/* slung load: chains, shackles, tank */}
            <g className={anim('ga11-load')}>
              {/* steel chains in a V to the shackles */}
              <path d="M160 114 L112 150" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
              <path d="M160 114 L208 150" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
              {/* safety shackles */}
              <circle cx="112" cy="152" r="5" fill="none" stroke="var(--accent2)" strokeWidth="3" />
              <circle cx="208" cy="152" r="5" fill="none" stroke="var(--accent2)" strokeWidth="3" />
              {/* the new tank */}
              <rect x="96" y="156" width="128" height="56" rx="14" fill="var(--accent)" opacity="0.94" />
              <circle cx="160" cy="184" r="15" fill="none" stroke="var(--on-accent)" strokeWidth="3" opacity="0.5" />
              <rect x="120" y="150" width="10" height="8" rx="2" fill="var(--slate)" />
              <rect x="190" y="150" width="10" height="8" rx="2" fill="var(--slate)" />
            </g>
          </g>
        </g>

        {/* empty pallet left behind on the floor */}
        <rect x="40" y="216" width="84" height="6" rx="2" fill="var(--slate)" />
        <rect x="40" y="206" width="84" height="6" rx="2" fill="var(--slate)" opacity="0.7" />
        <rect x="48" y="212" width="6" height="6" fill="var(--slate)" />
        <rect x="79" y="212" width="6" height="6" fill="var(--slate)" />
        <rect x="110" y="212" width="6" height="6" fill="var(--slate)" />

        {/* keep-clear caution glyph */}
        <g className={anim('ga11-warn')}>
          <path d="M278 196 l16 26 h-32 z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="276" y="206" width="4" height="8" rx="1.5" fill="var(--ink)" />
          <circle cx="278" cy="218" r="1.8" fill="var(--ink)" />
        </g>
      </g>
    </svg>
  )
}
