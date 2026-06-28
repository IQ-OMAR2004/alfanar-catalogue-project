export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Removing the 62 M10 nuts, opening the covers and lifting out the busbar">
      <style>{`
        @keyframes ga4-spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(-360deg) } }
        @keyframes ga4-nutlift { 0% { transform: translateY(0); opacity: 1 } 60% { transform: translateY(-26px); opacity: 1 } 80%,100% { transform: translateY(-26px); opacity: 0 } }
        @keyframes ga4-doorL { 0% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga4-doorR { 0% { transform: rotate(0deg) } 50% { transform: rotate(30deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga4-bus { 0% { transform: translateY(0); opacity: 1 } 35% { transform: translateY(0); opacity: 1 } 60% { transform: translateY(-14px); opacity: 1 } 85%,100% { transform: translateY(-14px); opacity: 0.85 } }
        @keyframes ga4-count { 0%,40% { opacity: 0.55 } 50% { opacity: 1 } 100% { opacity: 0.55 } }
        .ga4-socket { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga4-socket--anim { animation: ga4-spin 3s linear infinite; }
        .ga4-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga4-nut--anim { animation: ga4-nutlift 3s ease-in-out infinite; }
        .ga4-doorL { transform-box: fill-box; transform-origin: 0% 50%; }
        .ga4-doorL--anim { animation: ga4-doorL 3s ease-in-out infinite; }
        .ga4-doorR { transform-box: fill-box; transform-origin: 100% 50%; }
        .ga4-doorR--anim { animation: ga4-doorR 3s ease-in-out infinite; }
        .ga4-busbar { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga4-busbar--anim { animation: ga4-bus 3s ease-in-out infinite; }
        .ga4-badge--anim { animation: ga4-count 3s ease-in-out infinite; }
        .ga4-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga4-stage" data-paused={paused ? '' : undefined}>
        {/* tank body */}
        <rect x="44" y="64" width="232" height="148" rx="12" fill="var(--panel)" stroke="var(--slate)" strokeWidth="3" />
        {/* opened busbar (lifting out) */}
        <g className={anim('ga4-busbar')}>
          <rect x="96" y="108" width="128" height="20" rx="6" fill="var(--accent)" />
          <rect x="118" y="100" width="12" height="36" rx="3" fill="var(--accent2)" />
          <rect x="190" y="100" width="12" height="36" rx="3" fill="var(--accent2)" />
        </g>
        {/* hinged covers swinging open */}
        <g className={anim('ga4-doorL')}>
          <rect x="50" y="96" width="58" height="108" rx="7" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
          <circle cx="96" cy="150" r="3.5" fill="var(--ink2)" />
        </g>
        <g className={anim('ga4-doorR')}>
          <rect x="212" y="96" width="58" height="108" rx="7" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
          <circle cx="224" cy="150" r="3.5" fill="var(--ink2)" />
        </g>
        {/* nut being removed */}
        <g transform="translate(238 56)">
          <g className={anim('ga4-nut')}>
            <polygon points="0,-10 8.7,-5 8.7,5 0,10 -8.7,5 -8.7,-5" fill="var(--navy)" stroke="var(--ink2)" strokeWidth="2" />
          </g>
        </g>
        {/* ratchet + 17mm socket spinning */}
        <g transform="translate(238 56)">
          <g className={anim('ga4-socket')}>
            <circle r="15" fill="none" stroke="var(--ink2)" strokeWidth="4" strokeDasharray="6 5" />
          </g>
          <rect x="12" y="-7" width="56" height="14" rx="7" fill="var(--ink2)" transform="rotate(-34)" />
        </g>
        {/* count badge */}
        <g className={anim('ga4-badge')}>
          <rect x="48" y="22" width="58" height="26" rx="8" fill="var(--accent)" />
          <text x="77" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fontWeight="700" fill="var(--on-accent)">62x</text>
        </g>
        {/* socket size tag */}
        <text x="272" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink2)">17mm</text>
      </g>
    </svg>
  )
}
