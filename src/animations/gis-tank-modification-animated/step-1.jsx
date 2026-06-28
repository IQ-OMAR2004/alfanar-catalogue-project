export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Bring the GIS tank in on the handling trolley and set it on the clean floor">
      <style>{`
        @keyframes ga1-roll { 0% { transform: translateX(-34px) } 60% { transform: translateX(0) } 100% { transform: translateX(-34px) } }
        @keyframes ga1-spin { 0% { transform: rotate(0deg) } 60% { transform: rotate(310deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga1-settle { 0% { transform: translateY(-2.5px) } 30% { transform: translateY(0) } 70% { transform: translateY(0) } 100% { transform: translateY(-2.5px) } }
        @keyframes ga1-dash { 0% { transform: translateX(0) rotate(-6deg) } 60% { transform: translateX(72px) rotate(-6deg) } 100% { transform: translateX(0) rotate(-6deg) } }
        @keyframes ga1-blink { 0%,72% { opacity: 0 } 80%,96% { opacity: 1 } 100% { opacity: 0 } }
        @keyframes ga1-pulse { 0%,100% { opacity: 0.45 } 50% { opacity: 1 } }
        .ga1-rig { transform: translateX(-34px); }
        .ga1-rig--anim { animation: ga1-roll 3.2s ease-in-out infinite; }
        .ga1-wheel { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga1-wheel--anim { animation: ga1-spin 3.2s ease-in-out infinite; }
        .ga1-tank { transform-box: fill-box; transform-origin: 50% 100%; }
        .ga1-tank--anim { animation: ga1-settle 3.2s ease-in-out infinite; }
        .ga1-tag { transform-box: fill-box; transform-origin: 50% 0%; }
        .ga1-tag--anim { animation: ga1-dash 3.2s ease-in-out infinite; }
        .ga1-ok--anim { animation: ga1-blink 3.2s ease-in-out infinite; }
        .ga1-warn--anim { animation: ga1-pulse 1.6s ease-in-out infinite; }
        .ga1-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga1-stage" data-paused={paused ? '' : undefined}>
        {/* floor */}
        <line x1="22" y1="196" x2="298" y2="196" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />
        <rect x="118" y="190" width="84" height="6" rx="3" fill="var(--ok)" opacity="0.4" />

        {/* caution glyph */}
        <g className={anim('ga1-warn')}>
          <path d="M40 40 L58 72 L22 72 Z" fill="none" stroke="var(--warn)" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="38.5" y="50" width="3" height="12" rx="1.5" fill="var(--warn)" />
          <circle cx="40" cy="67" r="2" fill="var(--warn)" />
        </g>

        {/* rolling rig: trolley + tank */}
        <g className={anim('ga1-rig')}>
          {/* tank */}
          <g className={anim('ga1-tank')}>
            <rect x="96" y="78" width="84" height="92" rx="14" fill="var(--accent)" />
            <rect x="96" y="78" width="84" height="92" rx="14" fill="none" stroke="var(--navy)" strokeWidth="2.5" opacity="0.5" />
            <rect x="110" y="62" width="56" height="18" rx="6" fill="var(--slate)" />
            <circle cx="138" cy="116" r="15" fill="none" stroke="var(--on-accent)" strokeWidth="3" opacity="0.85" />
            <text x="138" y="121" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11"
              fill="var(--on-accent)" opacity="0.9">SF6</text>

            {/* QC passed tag flying onto the tank */}
            <g className={anim('ga1-tag')}>
              <rect x="150" y="86" width="40" height="26" rx="5" fill="var(--panel)" stroke="var(--ok)" strokeWidth="2.5" />
              <path className={anim('ga1-ok')} d="M158 99 l5 6 l11 -12" fill="none" stroke="var(--ok)"
                strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="170" y="103" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9"
                fill="var(--ok)" className={anim('ga1-tag')} opacity="0">QC</text>
            </g>
          </g>

          {/* trolley deck + handle */}
          <rect x="84" y="170" width="108" height="11" rx="4" fill="var(--ink)" />
          <path d="M84 175 L60 138" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="136" r="5" fill="none" stroke="var(--ink)" strokeWidth="4" />

          {/* wheels */}
          <g className={anim('ga1-wheel')} style={{ transformOrigin: '108px 188px' }}>
            <circle cx="108" cy="188" r="11" fill="var(--panel-2)" stroke="var(--ink)" strokeWidth="3" />
            <line x1="108" y1="180" x2="108" y2="196" stroke="var(--ink)" strokeWidth="2" />
            <line x1="100" y1="188" x2="116" y2="188" stroke="var(--ink)" strokeWidth="2" />
          </g>
          <g className={anim('ga1-wheel')} style={{ transformOrigin: '168px 188px' }}>
            <circle cx="168" cy="188" r="11" fill="var(--panel-2)" stroke="var(--ink)" strokeWidth="3" />
            <line x1="168" y1="180" x2="168" y2="196" stroke="var(--ink)" strokeWidth="2" />
            <line x1="160" y1="188" x2="176" y2="188" stroke="var(--ink)" strokeWidth="2" />
          </g>
        </g>

        {/* target placement marker on the floor */}
        <g opacity="0.7">
          <path d="M232 178 l0 18 l18 0" fill="none" stroke="var(--accent2)" strokeWidth="3" strokeLinecap="round" />
          <path d="M286 178 l0 18 l-18 0" fill="none" stroke="var(--accent2)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
