export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Lay the breaker O-ring in a true circle and grease it, checking for misalignment">
      <style>{`
        @keyframes ga34-sheen { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -440 } }
        @keyframes ga34-drop { 0% { transform: translateY(-26px); opacity: 0 } 18% { opacity: 1 } 70% { transform: translateY(36px); opacity: 1 } 100% { transform: translateY(36px); opacity: 0 } }
        @keyframes ga34-sweep { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes ga34-pulse { 0% { opacity: 0.35 } 50% { opacity: 1 } 100% { opacity: 0.35 } }
        @keyframes ga34-seat { 0% { r: 64 } 50% { r: 60 } 100% { r: 64 } }
        .ga34-sheen--anim { animation: ga34-sheen 3s linear infinite; }
        .ga34-drop--anim { transform-box: fill-box; animation: ga34-drop 2.8s ease-in infinite; }
        .ga34-sweep { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga34-sweep--anim { animation: ga34-sweep 3.2s linear infinite; }
        .ga34-warn--anim { animation: ga34-pulse 2.8s ease-in-out infinite; }
        .ga34-ring--anim { animation: ga34-seat 3s ease-in-out infinite; }
        .ga34-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga34-stage" data-paused={paused ? '' : undefined}>
        {/* mounting plate */}
        <rect x="40" y="40" width="200" height="160" rx="14" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        <circle cx="140" cy="120" r="80" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />

        {/* groove the O-ring seats into */}
        <circle cx="140" cy="120" r="64" fill="none" stroke="var(--slate)" strokeWidth="8" opacity="0.45" />

        {/* the O-ring laid as a true circle */}
        <circle cx="140" cy="120" r="64" fill="none" stroke="var(--accent)" strokeWidth="9" className={anim('ga34-ring')} />
        {/* grease sheen travelling around the ring */}
        <circle cx="140" cy="120" r="64" fill="none" stroke="var(--accent2)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray="34 406" className={anim('ga34-sheen')} />

        {/* grease / silicone oil drop applied onto the ring */}
        <g className={anim('ga34-drop')}>
          <path d="M140 50 c-7 9 -12 15 -12 22 a12 12 0 0 0 24 0 c0 -7 -5 -13 -12 -22 z"
            fill="var(--accent2)" />
        </g>

        {/* inspection magnifier sweeping the ring */}
        <g transform="translate(140 120)">
          <g className={anim('ga34-sweep')}>
            <g transform="translate(64 0)">
              <circle cx="0" cy="0" r="15" fill="var(--sky)" opacity="0.35" stroke="var(--ink2)" strokeWidth="3" />
              <rect x="9" y="9" width="18" height="6" rx="3" fill="var(--ink2)" transform="rotate(45 9 9)" />
            </g>
          </g>
        </g>

        {/* check badge - correctly fitted */}
        <g transform="translate(214 178)">
          <circle cx="0" cy="0" r="16" fill="var(--ok)" />
          <path d="M-7 0 l5 6 l9 -12" fill="none" stroke="#fff" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* hazard glyph - misalignment causes gas leak */}
        <g transform="translate(58 58)" className={anim('ga34-warn')}>
          <path d="M0 -15 L15 12 L-15 12 Z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="-1.6" y="-7" width="3.2" height="11" rx="1.6" fill="var(--ink)" />
          <circle cx="0" cy="8" r="1.8" fill="var(--ink)" />
        </g>

        <text x="160" y="216" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          fill="var(--ink2)">O-RING</text>
      </g>
    </svg>
  )
}
