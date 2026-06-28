export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Crane the disconnector down onto the new tank, seat the O-ring and set the 2 guide pins">
      <style>{`
        @keyframes ga31-lower { 0%,8% { transform: translateY(-30px) } 60%,80% { transform: translateY(0) } 100% { transform: translateY(-30px) } }
        @keyframes ga31-chain { 0%,8% { transform: translateY(-30px) } 60%,80% { transform: translateY(0) } 100% { transform: translateY(-30px) } }
        @keyframes ga31-pin { 0%,55% { transform: translateY(-22px); opacity: 0 } 68% { opacity: 1 } 84%,100% { transform: translateY(0); opacity: 1 } }
        @keyframes ga31-ring { 0%,55% { opacity: 0 } 70% { opacity: 0.9 } 86% { opacity: 1 } 100% { opacity: 0.9 } }
        @keyframes ga31-warn { 0%,100% { opacity: 0.45 } 50% { opacity: 1 } }
        @keyframes ga31-sheen { 0%,60% { opacity: 0 } 78% { opacity: 0.85 } 100% { opacity: 0 } }
        .ga31-load { transform: translateY(-30px); }
        .ga31-load--anim { animation: ga31-lower 3.2s ease-in-out infinite; }
        .ga31-chain { transform: translateY(-30px); }
        .ga31-chain--anim { animation: ga31-chain 3.2s ease-in-out infinite; }
        .ga31-pin { transform-box: fill-box; transform-origin: 50% 100%; transform: translateY(-22px); opacity: 0; }
        .ga31-pin--anim { animation: ga31-pin 3.2s ease-in-out infinite; }
        .ga31-pin2--anim { animation: ga31-pin 3.2s ease-in-out infinite; animation-delay: 0.25s; }
        .ga31-ring { opacity: 0; }
        .ga31-ring--anim { animation: ga31-ring 3.2s ease-in-out infinite; }
        .ga31-sheen { opacity: 0; }
        .ga31-sheen--anim { animation: ga31-sheen 3.2s ease-in-out infinite; }
        .ga31-warn--anim { animation: ga31-warn 1.8s ease-in-out infinite; }
        .ga31-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga31-stage" data-paused={paused ? '' : undefined}>
        {/* overhead crane rail */}
        <rect x="40" y="22" width="240" height="9" rx="4" fill="var(--slate)" />
        <rect x="150" y="22" width="22" height="13" rx="3" fill="var(--ink2)" />

        {/* new tank receiving the DS */}
        <rect x="64" y="158" width="192" height="60" rx="12" fill="var(--accent)" />
        <rect x="64" y="158" width="192" height="60" rx="12" fill="none" stroke="var(--navy)" strokeWidth="2.5" opacity="0.5" />
        {/* fixing flange + O-ring groove on top of the tank */}
        <rect x="108" y="150" width="104" height="12" rx="4" fill="var(--slate)" />
        {/* guide-pin holes */}
        <circle cx="118" cy="156" r="4" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="1.6" />
        <circle cx="202" cy="156" r="4" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="1.6" />

        {/* O-ring seating into its groove with grease sheen — the hazard focus */}
        <g className={anim('ga31-ring')}>
          <ellipse cx="160" cy="153" rx="38" ry="7" fill="none" stroke="var(--ok)" strokeWidth="4" />
          <ellipse cx="160" cy="153" rx="38" ry="7" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.6" className={anim('ga31-sheen')} />
        </g>

        {/* chain block + hook lowering with the load */}
        <g className={anim('ga31-chain')}>
          <line x1="161" y1="35" x2="161" y2="70" stroke="var(--ink2)" strokeWidth="3" strokeDasharray="3 4" />
          <rect x="151" y="62" width="20" height="16" rx="4" fill="var(--ink)" />
          <path d="M161 78 q-9 4 0 12 q9 -4 0 -12 z" fill="none" stroke="var(--ink2)" strokeWidth="3" />
        </g>

        {/* the DS (disconnector) module being craned down */}
        <g className={anim('ga31-load')}>
          {/* lifting slings */}
          <path d="M161 88 L132 116 M161 88 L190 116" stroke="var(--ink2)" strokeWidth="2.5" />
          {/* DS body */}
          <rect x="124" y="112" width="74" height="40" rx="8" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2.5" />
          <rect x="138" y="96" width="46" height="20" rx="6" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2.5" />
          {/* bushing stub (must never touch the tank) */}
          <rect x="152" y="120" width="18" height="30" rx="4" fill="var(--navy)" opacity="0.85" />
          <text x="161" y="135" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">DS</text>

          {/* 2 guide pins dropping into the holes */}
          <g className={anim('ga31-pin')}>
            <rect x="115" y="138" width="6" height="22" rx="3" fill="var(--accent2)" />
            <path d="M115 138 l3 -5 l3 5 z" fill="var(--accent2)" />
          </g>
          <g className={anim('ga31-pin2')}>
            <rect x="199" y="138" width="6" height="22" rx="3" fill="var(--accent2)" />
            <path d="M199 138 l3 -5 l3 5 z" fill="var(--accent2)" />
          </g>
        </g>

        {/* hazard glyph: verify the O-ring */}
        <g className={anim('ga31-warn')}>
          <path d="M280 50 l16 28 h-32 z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="278.4" y="60" width="3.2" height="9" rx="1.6" fill="var(--ink)" />
          <circle cx="280" cy="73" r="1.9" fill="var(--ink)" />
        </g>
        <text x="280" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--warn)">O-RING</text>

        {/* count badge: 2 guide pins */}
        <rect x="28" y="44" width="48" height="26" rx="8" fill="var(--panel)" stroke="var(--accent2)" strokeWidth="2.5" />
        <text x="52" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--accent2)">2x</text>
      </g>
    </svg>
  )
}
