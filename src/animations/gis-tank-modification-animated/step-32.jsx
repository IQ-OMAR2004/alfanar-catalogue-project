export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Bolt the disconnector and upper busbar with a 19 mm spanner, torque carefully to avoid SF6 gas leakage">
      <style>{`
        @keyframes ga32-swing { 0% { transform: rotate(-24deg) } 50% { transform: rotate(16deg) } 100% { transform: rotate(-24deg) } }
        @keyframes ga32-arc { 0% { stroke-dashoffset: 150 } 50% { stroke-dashoffset: 36 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga32-nut { 0% { transform: rotate(0deg) } 50% { transform: rotate(40deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga32-pulse { 0%,55% { opacity: 0.35 } 65% { opacity: 1 } 80% { opacity: 0.35 } 100% { opacity: 0.35 } }
        @keyframes ga32-stamp { 0%,52% { opacity: 0.4 } 62% { opacity: 1 } 100% { opacity: 0.4 } }
        .ga32-spanner { transform-box: fill-box; transform-origin: 50% 90%; transform: rotate(-24deg); }
        .ga32-spanner--anim { animation: ga32-swing 3s ease-in-out infinite; }
        .ga32-arc--anim { animation: ga32-arc 3s ease-in-out infinite; }
        .ga32-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga32-nut--anim { animation: ga32-nut 3s ease-in-out infinite; }
        .ga32-warn { opacity: 0.35; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga32-warn--anim { animation: ga32-pulse 3s ease-in-out infinite; }
        .ga32-tag { opacity: 0.4; }
        .ga32-tag--anim { animation: ga32-stamp 3s ease-in-out infinite; }
        .ga32-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga32-stage" data-paused={paused ? '' : undefined}>
        {/* tank wall the DS bolts onto */}
        <rect x="30" y="150" width="260" height="22" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        {/* upper busbar laid across, fixed with bolts */}
        <rect x="58" y="92" width="204" height="22" rx="7" fill="var(--accent)" opacity="0.92" />
        {/* disconnector (DS) body bridging busbar to tank */}
        <rect x="118" y="112" width="84" height="40" rx="6" fill="var(--navy)" />
        <text x="160" y="138" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--on-accent)">DS</text>
        {/* row of busbar bolt heads */}
        <circle cx="74" cy="103" r="6" fill="var(--ink2)" />
        <circle cx="110" cy="103" r="6" fill="var(--ink2)" />
        <circle cx="160" cy="103" r="6" fill="var(--ink2)" />
        <circle cx="210" cy="103" r="6" fill="var(--ink2)" />
        <circle cx="246" cy="103" r="6" fill="var(--ink2)" />

        {/* torque progress arc around the working nut */}
        <circle cx="226" cy="138" r="22" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 226 138)" className={anim('ga32-arc')} />

        {/* the hex nut being driven on the DS fixing */}
        <g className={anim('ga32-nut')}>
          <path d="M226 124 l12 7 l0 14 l-12 7 l-12 -7 l0 -14 z" fill="var(--ink2)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        {/* 19 mm spanner swinging on the nut */}
        <g className={anim('ga32-spanner')}>
          <rect x="219" y="36" width="14" height="80" rx="6" fill="var(--slate)" />
          <path d="M214 116 a12 12 0 1 0 24 0 l-5 0 a7 7 0 1 1 -14 0 z" fill="var(--ink2)" />
          <rect x="221" y="30" width="10" height="10" rx="3" fill="var(--ink)" />
        </g>

        {/* hazard warning glyph — SF6 leak caution */}
        <g className={anim('ga32-warn')}>
          <path d="M50 188 l18 -34 l18 34 z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="65" y="163" width="6" height="13" rx="3" fill="var(--ink)" />
          <circle cx="68" cy="182" r="3.2" fill="var(--ink)" />
        </g>
        <rect x="92" y="178" width="60" height="24" rx="7" fill="var(--panel)" stroke="var(--warn)" strokeWidth="2" />
        <text x="122" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--ink)">SF6</text>

        {/* bolt count badge */}
        <rect x="32" y="42" width="60" height="30" rx="8" fill="var(--accent2)" />
        <text x="62" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="700" fill="var(--on-accent)">18x</text>

        {/* torque value stamp */}
        <g className={anim('ga32-tag')}>
          <rect x="200" y="178" width="86" height="32" rx="8" fill="var(--accent2)" />
          <text x="243" y="200" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="18" fontWeight="700" fill="var(--on-accent)">47 Nm</text>
        </g>

        {/* spanner size badge */}
        <rect x="228" y="42" width="60" height="30" rx="8" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        <text x="258" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--ink)">19 mm</text>
      </g>
    </svg>
  )
}
