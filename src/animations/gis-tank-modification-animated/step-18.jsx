export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  const bx = [78, 120, 162]
  const by = [70, 100, 130]
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Clean the bushing plate and O-ring, grease it, then fit the plate to the tank">
      <style>{`
        @keyframes ga18-seat { 0%,14% { transform: translateY(-26px) } 64%,82% { transform: translateY(0) } 100% { transform: translateY(-26px) } }
        @keyframes ga18-wipe { 0% { transform: translateX(0) rotate(-8deg) } 50% { transform: translateX(96px) rotate(8deg) } 100% { transform: translateX(0) rotate(-8deg) } }
        @keyframes ga18-spark { 0%,30% { opacity: 0; transform: scale(0.4) } 55% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga18-sheen { 0% { stroke-dashoffset: 150 } 100% { stroke-dashoffset: 0 } }
        @keyframes ga18-ok { 0%,70% { opacity: 0; transform: scale(0.5) } 84%,100% { opacity: 1; transform: scale(1) } }
        .ga18-plate { transform-box: fill-box; transform: translateY(-26px); }
        .ga18-plate--anim { animation: ga18-seat 3.2s ease-in-out infinite; }
        .ga18-wipe { transform-box: fill-box; transform-origin: 50% 50%; transform: translateX(0) rotate(-8deg); }
        .ga18-wipe--anim { animation: ga18-wipe 3.2s ease-in-out infinite; }
        .ga18-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga18-spark--anim { animation: ga18-spark 3.2s ease-in-out infinite; }
        .ga18-sheen { stroke-dasharray: 150; stroke-dashoffset: 150; }
        .ga18-sheen--anim { animation: ga18-sheen 3.2s linear infinite; }
        .ga18-ok { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga18-ok--anim { animation: ga18-ok 3.2s ease-in-out infinite; }
        .ga18-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga18-stage" data-paused={paused ? '' : undefined}>
        {/* lower side of the tank receiving the plate */}
        <rect x="46" y="158" width="180" height="60" rx="12" fill="var(--navy)" />
        <rect x="54" y="150" width="164" height="16" rx="8" fill="var(--slate)" opacity="0.85" />
        {/* greased O-ring groove with travelling sheen */}
        <rect x="58" y="148" width="156" height="9" rx="4.5" fill="var(--accent2)" opacity="0.9" />
        <rect x="62" y="150" width="148" height="5" rx="2.5" fill="none" stroke="var(--on-accent)"
          strokeWidth="2.4" opacity="0.7" className={anim('ga18-sheen')} />

        {/* the bushing plate with its 9 bushings, lowered onto the tank */}
        <g className={anim('ga18-plate')}>
          <rect x="56" y="56" width="160" height="88" rx="10" fill="var(--accent)" opacity="0.95" />
          <rect x="64" y="64" width="144" height="72" rx="7" fill="var(--panel-2)" />
          {by.map((cy) =>
            bx.map((cx) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="13" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2.4" />
                <circle cx={cx} cy={cy} r="5" fill="var(--slate)" />
              </g>
            ))
          )}
          {/* wiping cloth sweeping across the plate, with sparkle trail */}
          <g className={anim('ga18-wipe')}>
            <rect x="62" y="44" width="34" height="22" rx="6" fill="var(--ink)" opacity="0.85" />
            <rect x="68" y="48" width="22" height="5" rx="2.5" fill="var(--panel)" opacity="0.6" />
          </g>
          <g className={anim('ga18-spark')}>
            <path d="M150 48 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="var(--ok)" />
          </g>
        </g>

        {/* count badge: 9 bushings */}
        <rect x="236" y="56" width="62" height="26" rx="8" fill="var(--accent2)" />
        <text x="267" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
          fill="var(--on-accent)">9x</text>
        {/* grease badge */}
        <rect x="236" y="90" width="62" height="26" rx="8" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="267" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11"
          fill="var(--ink)">GREASE</text>

        {/* seated confirmation */}
        <g className={anim('ga18-ok')}>
          <circle cx="267" cy="146" r="16" fill="var(--ok)" />
          <path d="M259 146 l5 6 l11 -12" fill="none" stroke="#fff" strokeWidth="3.4"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
