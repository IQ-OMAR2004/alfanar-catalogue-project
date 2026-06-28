export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Bolting the CB and DS busbars together and torquing to 47.5 Nm">
      <style>{`
        @keyframes ga36-turn { 0% { transform: rotate(-20deg) } 55% { transform: rotate(12deg) } 100% { transform: rotate(-20deg) } }
        @keyframes ga36-arc { 0% { stroke-dashoffset: 150 } 55% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga36-spark { 0% { opacity: 0; transform: scale(.4) } 50% { opacity: 0; transform: scale(.4) } 60% { opacity: 1; transform: scale(1) } 72% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0; transform: scale(1.3) } }
        @keyframes ga36-stamp { 0% { opacity: .35 } 55% { opacity: .35 } 64% { opacity: 1 } 100% { opacity: .35 } }
        .ga36-wrench { transform-box: fill-box; transform-origin: 50% 88%; transform: rotate(-20deg); }
        .ga36-wrench--anim { animation: ga36-turn 3s ease-in-out infinite; }
        .ga36-arc--anim { animation: ga36-arc 3s ease-in-out infinite; }
        .ga36-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga36-spark--anim { animation: ga36-spark 3s ease-in-out infinite; }
        .ga36-stamp { opacity: .35; }
        .ga36-stamp--anim { animation: ga36-stamp 3s ease-in-out infinite; }
        .ga36-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga36-stage" data-paused={paused ? '' : undefined}>
        {/* two busbars meeting */}
        <rect x="26" y="120" width="100" height="26" rx="5" fill="var(--accent)" opacity="0.9" />
        <rect x="196" y="120" width="98" height="26" rx="5" fill="var(--accent2)" opacity="0.9" />
        {/* washer / bolt stack overlap in the middle */}
        <rect x="120" y="116" width="80" height="34" rx="6" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />
        <line x1="138" y1="120" x2="138" y2="146" stroke="var(--ink2)" strokeWidth="3" />
        <line x1="182" y1="120" x2="182" y2="146" stroke="var(--ink2)" strokeWidth="3" />

        {/* gap dimension 85 mm */}
        <line x1="120" y1="100" x2="200" y2="100" stroke="var(--ink2)" strokeWidth="2" />
        <line x1="120" y1="94" x2="120" y2="106" stroke="var(--ink2)" strokeWidth="2" />
        <line x1="200" y1="94" x2="200" y2="106" stroke="var(--ink2)" strokeWidth="2" />
        <text x="160" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink)">85 mm</text>

        {/* progress arc around the bolt being torqued */}
        <circle cx="160" cy="133" r="24" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 160 133)" className={anim('ga36-arc')} />
        <circle cx="160" cy="133" r="9" fill="var(--navy)" />

        {/* rotating socket / wrench on the bolt */}
        <g className={anim('ga36-wrench')}>
          <rect x="152" y="40" width="16" height="98" rx="7" fill="var(--ink2)" />
          <rect x="146" y="120" width="28" height="26" rx="6" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />
        </g>

        {/* click spark at the bolt */}
        <g className={anim('ga36-spark')} transform="translate(160 133)">
          <path d="M0 -18 L4 -4 L18 -3 L6 4 L9 18 L0 9 L-9 18 L-6 4 L-18 -3 L-4 -4 Z" fill="var(--warn)" />
        </g>

        {/* torque value stamp */}
        <g className={anim('ga36-stamp')}>
          <rect x="206" y="176" width="92" height="34" rx="8" fill="var(--accent)" />
          <text x="252" y="199" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fill="var(--on-accent)">47.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
