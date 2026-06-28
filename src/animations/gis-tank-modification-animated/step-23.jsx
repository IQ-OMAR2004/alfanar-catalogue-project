export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Torquing the bushing busbar nuts to 47 newton metres with an Allen socket and extension rod">
      <style>{`
        @keyframes ga23-turn { 0% { transform: rotate(-26deg) } 55% { transform: rotate(16deg) } 100% { transform: rotate(-26deg) } }
        @keyframes ga23-arc { 0% { stroke-dashoffset: 168 } 55% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 168 } }
        @keyframes ga23-click { 0%,52% { opacity: 0; transform: scale(0.4) } 60% { opacity: 1; transform: scale(1) } 74% { opacity: 0; transform: scale(1.25) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga23-stamp { 0%,52% { opacity: 0.35 } 62% { opacity: 1 } 100% { opacity: 0.35 } }
        .ga23-tool { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-26deg); }
        .ga23-tool--anim { animation: ga23-turn 3s ease-in-out infinite; }
        .ga23-arc--anim { animation: ga23-arc 3s ease-in-out infinite; }
        .ga23-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga23-spark--anim { animation: ga23-click 3s ease-in-out infinite; }
        .ga23-tag { opacity: 0.35; }
        .ga23-tag--anim { animation: ga23-stamp 3s ease-in-out infinite; }
        .ga23-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga23-stage" data-paused={paused ? '' : undefined}>
        {/* bushing flange base */}
        <rect x="40" y="150" width="240" height="20" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        {/* two bushings rising up */}
        <rect x="92" y="118" width="26" height="36" rx="4" fill="var(--navy)" />
        <rect x="202" y="118" width="26" height="36" rx="4" fill="var(--navy)" />
        {/* busbar fitted across both bushings */}
        <rect x="80" y="100" width="160" height="22" rx="6" fill="var(--accent)" opacity="0.92" />
        {/* seated nuts on the busbar */}
        <circle cx="105" cy="111" r="9" fill="var(--ink2)" />
        <circle cx="215" cy="111" r="9" fill="var(--ink2)" />

        {/* torque progress arc around the working nut */}
        <circle cx="105" cy="111" r="25" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="168" strokeDashoffset="168" transform="rotate(-90 105 111)" className={anim('ga23-arc')} />

        {/* Allen socket + extension rod turning the nut */}
        <g className={anim('ga23-tool')}>
          <rect x="98" y="40" width="14" height="68" rx="6" fill="var(--slate)" />
          <rect x="95" y="98" width="20" height="16" rx="4" fill="var(--ink)" />
          <rect x="100" y="34" width="10" height="12" rx="3" fill="var(--ink2)" />
        </g>

        {/* click spark at the click point */}
        <g className={anim('ga23-spark')}>
          <g transform="translate(105 111)">
            <line x1="-15" y1="0" x2="-26" y2="0" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="0" x2="26" y2="0" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="-15" x2="0" y2="-26" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
            <line x1="11" y1="-11" x2="19" y2="-19" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
            <line x1="-11" y1="-11" x2="-19" y2="-19" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* torque value stamp */}
        <g className={anim('ga23-tag')}>
          <rect x="196" y="186" width="86" height="32" rx="8" fill="var(--accent2)" />
          <text x="239" y="208" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="18"
            fontWeight="700" fill="var(--on-accent)">47 Nm</text>
        </g>

        {/* size badge */}
        <rect x="40" y="186" width="68" height="32" rx="8" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        <text x="74" y="208" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15"
          fontWeight="700" fill="var(--ink)">8 mm</text>
      </g>
    </svg>
  )
}
