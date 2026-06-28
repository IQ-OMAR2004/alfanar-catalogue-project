export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Testing SF6 gas purity and dew point with an analyzer connected by a self-closing hose">
      <style>{`
        @keyframes ga43-flow { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -28 } }
        @keyframes ga43-needle { 0% { transform: rotate(-34deg) } 55% { transform: rotate(30deg) } 100% { transform: rotate(-34deg) } }
        @keyframes ga43-blink { 0%,100% { opacity: 1 } 50% { opacity: 0.25 } }
        @keyframes ga43-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        @keyframes ga43-pop { 0%,8% { opacity: 0; transform: scale(0.6) } 26%,82% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(0.6) } }
        @keyframes ga43-pulse { 0%,100% { opacity: 0.45 } 50% { opacity: 0.95 } }
        .ga43-flow--anim { animation: ga43-flow 1.1s linear infinite; }
        .ga43-needle { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-34deg); }
        .ga43-needle--anim { animation: ga43-needle 3.0s ease-in-out infinite; }
        .ga43-led--anim { animation: ga43-blink 1.1s ease-in-out infinite; }
        .ga43-analyzer { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga43-analyzer--anim { animation: ga43-bob 3.0s ease-in-out infinite; }
        .ga43-check { transform-box: fill-box; transform-origin: 50% 50%; opacity: 1; }
        .ga43-check--anim { animation: ga43-pop 3.0s ease-in-out infinite; }
        .ga43-warn--anim { animation: ga43-pulse 1.6s ease-in-out infinite; }
        .ga43-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga43-stage" data-paused={paused ? '' : undefined}>
        {/* tank port on the left */}
        <rect x="22" y="118" width="46" height="62" rx="8" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        <rect x="62" y="138" width="16" height="22" rx="4" fill="var(--slate)" />
        <text x="45" y="200" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)" textAnchor="middle">SF6</text>

        {/* self-closing hose: tank -> analyzer */}
        <path d="M78 149 C 120 149, 132 110, 168 110" fill="none" stroke="var(--slate)" strokeWidth="7" strokeLinecap="round" />
        <path d="M78 149 C 120 149, 132 110, 168 110" fill="none" stroke="var(--accent)" strokeWidth="3"
          strokeLinecap="round" strokeDasharray="6 22" className={anim('ga43-flow')} />

        {/* analyzer body */}
        <g className={anim('ga43-analyzer')}>
          <rect x="166" y="70" width="116" height="104" rx="12" fill="var(--panel)" stroke="var(--accent)" strokeWidth="3" />
          {/* gauge */}
          <circle cx="206" cy="112" r="26" fill="var(--bg)" stroke="var(--slate)" strokeWidth="2" />
          <path d="M186 124 A26 26 0 0 1 226 124" fill="none" stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" />
          <g className={anim('ga43-needle')}>
            <rect x="204" y="92" width="4" height="22" rx="2" fill="var(--accent2)" />
          </g>
          <circle cx="206" cy="112" r="4" fill="var(--ink)" />
          {/* readout panel */}
          <rect x="240" y="86" width="34" height="22" rx="4" fill="var(--bg)" stroke="var(--slate)" strokeWidth="1.5" />
          <text x="257" y="101" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ok)" textAnchor="middle">99.8%</text>
          <rect x="240" y="116" width="34" height="22" rx="4" fill="var(--bg)" stroke="var(--slate)" strokeWidth="1.5" />
          <text x="257" y="131" fontFamily="var(--font-mono)" fontSize="9" fill="var(--sky)" textAnchor="middle">-28C</text>
          {/* status LED */}
          <circle cx="178" cy="158" r="5" fill="var(--ok)" className={anim('ga43-led')} />
          <text x="226" y="162" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)" textAnchor="middle">PURITY</text>
        </g>

        {/* hazard warning glyph */}
        <g className={anim('ga43-warn')}>
          <path d="M44 28 L62 60 L26 60 Z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="42" y="40" width="4" height="11" rx="2" fill="var(--ink)" />
          <circle cx="44" cy="55" r="2.4" fill="var(--ink)" />
        </g>

        {/* pass check badge */}
        <g className={anim('ga43-check')}>
          <circle cx="276" cy="44" r="16" fill="var(--ok)" />
          <path d="M268 45 l6 6 l11 -13" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
