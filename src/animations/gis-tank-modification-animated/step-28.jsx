export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Stacking current transformers with insulation rubbers on the support, keeping a one millimetre gap above the plate">
      <style>{`
        @keyframes ga28-drop { 0% { transform: translateY(-58px); opacity: 0 } 14% { opacity: 1 } 46%,84% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-58px); opacity: 0 } }
        @keyframes ga28-pulse { 0%,40% { opacity: 0.3 } 60% { opacity: 1 } 100% { opacity: 0.3 } }
        @keyframes ga28-flow { 0% { stroke-dashoffset: 60 } 100% { stroke-dashoffset: 0 } }
        @keyframes ga28-rods { 0%,46% { opacity: 0.35 } 70% { opacity: 1 } 100% { opacity: 0.35 } }
        .ga28-ct { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga28-ct--anim { animation: ga28-drop 3.2s ease-in-out infinite; }
        .ga28-gap { opacity: 0.3; }
        .ga28-gap--anim { animation: ga28-pulse 3.2s ease-in-out infinite; }
        .ga28-wire--anim { animation: ga28-flow 3.2s linear infinite; }
        .ga28-rodline { opacity: 0.35; }
        .ga28-rodline--anim { animation: ga28-rods 3.2s ease-in-out infinite; }
        .ga28-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga28-stage" data-paused={paused ? '' : undefined}>
        {/* base support plate */}
        <rect x="60" y="190" width="200" height="20" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />

        {/* two supporting rods rising from the plate */}
        <rect x="84" y="78" width="9" height="114" rx="4" fill="var(--slate)" />
        <rect x="227" y="78" width="9" height="114" rx="4" fill="var(--slate)" />
        {/* wire leading through the rods */}
        <path d="M93 112 Q160 96 227 112" fill="none" stroke="var(--accent2)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray="60" className={anim('ga28-wire')} />

        {/* stack: rubber - CT - rubber - rubber - CT - rubber (bottom to top) */}
        {/* bottom rubber pad on the support */}
        <rect x="96" y="176" width="128" height="10" rx="3" fill="var(--warn)" opacity="0.9" />
        {/* first CT ring */}
        <rect x="92" y="148" width="136" height="28" rx="8" fill="var(--navy)" />
        <ellipse cx="160" cy="162" rx="26" ry="10" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        {/* paired rubbers between the CTs */}
        <rect x="96" y="138" width="128" height="9" rx="3" fill="var(--warn)" opacity="0.9" />
        <rect x="96" y="128" width="128" height="9" rx="3" fill="var(--warn)" opacity="0.9" />

        {/* second CT being lowered into place */}
        <g className={anim('ga28-ct')}>
          <rect x="92" y="98" width="136" height="28" rx="8" fill="var(--accent)" opacity="0.95" />
          <ellipse cx="160" cy="112" rx="26" ry="10" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
          {/* one rubber on top of the upper CT */}
          <rect x="96" y="90" width="128" height="9" rx="3" fill="var(--warn)" />
        </g>

        {/* 1 mm gap callout above the plate */}
        <g className={anim('ga28-gap')}>
          <line x1="246" y1="176" x2="246" y2="190" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="242" y1="176" x2="250" y2="176" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="242" y1="190" x2="250" y2="190" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="256" y="170" width="46" height="26" rx="7" fill="var(--ok)" />
          <text x="279" y="188" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
            fontWeight="700" fill="var(--on-accent)">1 mm</text>
        </g>

        {/* rod-through-wire highlight badge */}
        <g className={anim('ga28-rodline')}>
          <rect x="18" y="170" width="58" height="26" rx="7" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
          <text x="47" y="188" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
            fontWeight="700" fill="var(--ink)">3x CT</text>
        </g>
      </g>
    </svg>
  )
}
