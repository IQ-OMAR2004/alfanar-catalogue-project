export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Bolt the three bushing plates with washers and nuts and torque to 26.5 Nm">
      <style>{`
        @keyframes ga21-turn { 0% { transform: rotate(-24deg) } 60% { transform: rotate(12deg) } 80% { transform: rotate(12deg) } 100% { transform: rotate(-24deg) } }
        @keyframes ga21-arc { 0% { stroke-dashoffset: 150 } 60% { stroke-dashoffset: 34 } 80% { stroke-dashoffset: 34 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga21-spark { 0%,58% { opacity: 0; transform: scale(0.4) } 64% { opacity: 1; transform: scale(1) } 78% { opacity: 1; transform: scale(1) } 82%,100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga21-stamp { 0%,55% { opacity: 0.35 } 66% { opacity: 1 } 80% { opacity: 1 } 90%,100% { opacity: 0.35 } }
        .ga21-wrench { transform-box: fill-box; transform-origin: 92% 50%; transform: rotate(-24deg); }
        .ga21-wrench--anim { animation: ga21-turn 3s ease-in-out infinite; }
        .ga21-arc--anim { animation: ga21-arc 3s ease-in-out infinite; }
        .ga21-spark { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga21-spark--anim { animation: ga21-spark 3s ease-in-out infinite; }
        .ga21-stamp { opacity: 0.35; }
        .ga21-stamp--anim { animation: ga21-stamp 3s ease-in-out infinite; }
        .ga21-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga21-stage" data-paused={paused ? '' : undefined}>
        {/* mounting flange the plates bolt onto */}
        <rect x="26" y="40" width="40" height="160" rx="8" fill="var(--navy)" />
        <rect x="34" y="48" width="24" height="144" rx="5" fill="var(--slate)" opacity="0.6" />

        {/* 3 bushing plates seated on the flange */}
        <g>
          <rect x="58" y="52" width="120" height="40" rx="6" fill="var(--accent)" opacity="0.92" />
          <rect x="58" y="100" width="120" height="40" rx="6" fill="var(--accent)" opacity="0.92" />
          <rect x="58" y="148" width="120" height="40" rx="6" fill="var(--accent)" opacity="0.92" />
          {/* bushing stub on each plate */}
          <circle cx="140" cy="72" r="13" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="3" />
          <circle cx="140" cy="120" r="13" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="3" />
          <circle cx="140" cy="168" r="13" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="3" />
        </g>

        {/* washer + nut bolting points (12x) */}
        <g fill="var(--ink2)">
          <path d="M74 64 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
          <path d="M104 80 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
          <path d="M74 112 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
          <path d="M104 128 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
          <path d="M74 160 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
          <path d="M104 176 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" />
        </g>

        {/* target nut (middle plate) with torque progress arc */}
        <circle cx="84" cy="120" r="11" fill="var(--panel-2)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M78 120 l6 -3.5 l6 3.5 v7 l-6 3.5 l-6 -3.5 z" fill="var(--ink2)" />
        <circle cx="84" cy="120" r="20" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 84 120)" className={anim('ga21-arc')} />

        {/* "click" spark when torque reaches target */}
        <g className={anim('ga21-spark')} transform="translate(84 120)">
          <path d="M0 -26 l3 -8 M0 26 l3 8 M-26 0 l-8 -3 M26 0 l8 3 M18 -18 l6 -6 M-18 18 l-6 6"
            stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 17 mm socket + torque wrench driving the nut */}
        <g className={anim('ga21-wrench')}>
          <rect x="84" y="113" width="124" height="14" rx="7" fill="var(--ink2)" />
          <circle cx="90" cy="120" r="12" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="3" />
          <rect x="200" y="110" width="10" height="20" rx="3" fill="var(--ink)" />
        </g>

        {/* spec badges */}
        <rect x="216" y="44" width="80" height="26" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="256" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">17 mm</text>
        <g className={anim('ga21-stamp')}>
          <rect x="216" y="78" width="80" height="30" rx="7" fill="var(--ok)" />
          <text x="256" y="98" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#fff">26.5 Nm</text>
        </g>
        <rect x="216" y="116" width="80" height="26" rx="7" fill="var(--accent2)" />
        <text x="256" y="134" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">12x</text>
      </g>
    </svg>
  )
}
