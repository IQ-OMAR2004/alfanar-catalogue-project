export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Undo the 18 Allen screws and lift the lower bushing and plate off the tank">
      <style>{`
        @keyframes ga9-turn { 0% { transform: rotate(-26deg) } 50% { transform: rotate(20deg) } 100% { transform: rotate(-26deg) } }
        @keyframes ga9-lift { 0%,12% { transform: translateY(0) } 60%,76% { transform: translateY(-34px) } 100% { transform: translateY(0) } }
        @keyframes ga9-screw { 0%,18% { transform: translateY(0); opacity: 0.95 } 52% { transform: translateY(-16px); opacity: 1 } 70%,100% { transform: translateY(-30px); opacity: 0 } }
        @keyframes ga9-gap { 0%,12% { opacity: 0 } 60%,76% { opacity: 0.55 } 100% { opacity: 0 } }
        @keyframes ga9-pulse { 0%,100% { opacity: 0.5 } 50% { opacity: 1 } }
        .ga9-key { transform-box: fill-box; transform-origin: 50% 100%; transform: rotate(-26deg); }
        .ga9-key--anim { animation: ga9-turn 3s ease-in-out infinite; }
        .ga9-bush { transform: translateY(0); }
        .ga9-bush--anim { animation: ga9-lift 3s ease-in-out infinite; }
        .ga9-scr { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga9-scr--anim { animation: ga9-screw 3s ease-in-out infinite; }
        .ga9-scr2--anim { animation: ga9-screw 3s ease-in-out infinite; animation-delay: 0.35s; }
        .ga9-gap--anim { animation: ga9-gap 3s ease-in-out infinite; }
        .ga9-badge--anim { animation: ga9-pulse 2s ease-in-out infinite; }
        .ga9-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga9-stage" data-paused={paused ? '' : undefined}>
        {/* tank body the bushing sits on */}
        <rect x="48" y="150" width="224" height="68" rx="12" fill="var(--accent)" />
        <rect x="48" y="150" width="224" height="68" rx="12" fill="none" stroke="var(--navy)" strokeWidth="2.5" opacity="0.5" />
        {/* mounting flange / opening the bushing was bolted into */}
        <rect x="92" y="142" width="136" height="14" rx="5" fill="var(--slate)" />

        {/* parting-line gap that opens as the bushing lifts away */}
        <rect x="100" y="132" width="120" height="6" rx="3" fill="var(--warn)" className={anim('ga9-gap')} />

        {/* the lower bushing + plate, lifting up and away */}
        <g className={anim('ga9-bush')}>
          {/* plate */}
          <rect x="88" y="120" width="144" height="18" rx="6" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2.5" />
          {/* bushing cone */}
          <path d="M132 120 L120 58 Q120 50 128 50 L192 50 Q200 50 200 58 L188 120 Z"
            fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="148" y1="64" x2="142" y2="116" stroke="var(--ink2)" strokeWidth="2" opacity="0.5" />
          <line x1="172" y1="64" x2="178" y2="116" stroke="var(--ink2)" strokeWidth="2" opacity="0.5" />
          <ellipse cx="160" cy="52" rx="34" ry="6" fill="var(--slate)" />

          {/* two of the 18 button-head screws backing out of the plate */}
          <g className={anim('ga9-scr')}>
            <circle cx="104" cy="129" r="5" fill="var(--ink)" />
            <path d="M101.5 129 l5 0 M104 126.5 l0 5" stroke="var(--on-accent)" strokeWidth="1.6" />
          </g>
          <g className={anim('ga9-scr2')}>
            <circle cx="216" cy="129" r="5" fill="var(--ink)" />
            <path d="M213.5 129 l5 0 M216 126.5 l0 5" stroke="var(--on-accent)" strokeWidth="1.6" />
          </g>
        </g>

        {/* ratchet + 5mm Allen key working a screw */}
        <g className={anim('ga9-key')}>
          <rect x="156" y="118" width="8" height="40" rx="3" fill="var(--ink2)" />
          <rect x="142" y="108" width="36" height="16" rx="7" fill="var(--ink)" />
          <circle cx="160" cy="116" r="5" fill="var(--panel-2)" />
        </g>

        {/* count badge: 18 screws to remove */}
        <g className={anim('ga9-badge')}>
          <rect x="232" y="42" width="56" height="30" rx="8" fill="var(--panel)" stroke="var(--accent2)" strokeWidth="2.5" />
          <text x="260" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16"
            fill="var(--accent2)">18x</text>
        </g>

        {/* tool spec stamp */}
        <text x="44" y="62" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">5 mm</text>
      </g>
    </svg>
  )
}
