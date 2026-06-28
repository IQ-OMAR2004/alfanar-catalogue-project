export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  // Bolt positions around the rear cover perimeter; sequence = do one, skip one (even pressure).
  const bolts = [
    { x: 96, y: 70 }, { x: 160, y: 62 }, { x: 224, y: 70 },
    { x: 236, y: 130 }, { x: 224, y: 190 }, { x: 160, y: 198 },
    { x: 96, y: 190 }, { x: 84, y: 130 },
  ]
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Closing the rear cover and tightening the M10 bolts in sequence to 26.5 Nm">
      <style>{`
        @keyframes ga40-shut { 0% { transform: translateX(34px); opacity: .55 } 30% { transform: translateX(0); opacity: 1 } 100% { transform: translateX(0); opacity: 1 } }
        @keyframes ga40-b0 { 0%,100% { fill: var(--slate) } 6%,16% { fill: var(--ok) } }
        @keyframes ga40-b1 { 0%,100% { fill: var(--slate) } 30%,40% { fill: var(--ok) } }
        @keyframes ga40-b2 { 0%,100% { fill: var(--slate) } 54%,64% { fill: var(--ok) } }
        @keyframes ga40-b3 { 0%,100% { fill: var(--slate) } 78%,88% { fill: var(--ok) } }
        @keyframes ga40-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes ga40-stamp { 0%,46% { opacity: .35 } 56%,100% { opacity: 1 } }
        .ga40-cover { transform-box: fill-box; transform-origin: 0% 50%; }
        .ga40-cover--anim { animation: ga40-shut 3.2s ease-in-out infinite; }
        .ga40-bolt { fill: var(--slate); }
        .ga40-bolt--anim.ga40-s0 { animation: ga40-b0 3.2s linear infinite; }
        .ga40-bolt--anim.ga40-s1 { animation: ga40-b1 3.2s linear infinite; }
        .ga40-bolt--anim.ga40-s2 { animation: ga40-b2 3.2s linear infinite; }
        .ga40-bolt--anim.ga40-s3 { animation: ga40-b3 3.2s linear infinite; }
        .ga40-socket { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga40-socket--anim { animation: ga40-spin 3.2s linear infinite; }
        .ga40-stamp { opacity: .35; }
        .ga40-stamp--anim { animation: ga40-stamp 3.2s ease-in-out infinite; }
        .ga40-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga40-stage" data-paused={paused ? '' : undefined}>
        {/* tank opening / flange frame behind the cover */}
        <rect x="64" y="44" width="192" height="152" rx="12" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="3" />
        {/* the rear cover panel sliding shut */}
        <g className={anim('ga40-cover')}>
          <rect x="72" y="50" width="176" height="140" rx="10" fill="var(--panel)" stroke="var(--accent)" strokeWidth="3" />
          <rect x="120" y="104" width="80" height="32" rx="6" fill="var(--accent)" opacity="0.85" />
          {/* M10 bolts around the perimeter, lighting up in skip-one sequence */}
          {bolts.map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r="9" fill="var(--navy)" />
              <circle cx={b.x} cy={b.y} r="6"
                className={anim(`ga40-bolt ga40-s${i % 4}`)} />
            </g>
          ))}
        </g>
        {/* rotating socket on the bolt currently being torqued */}
        <g transform="translate(160 62)">
          <g className={anim('ga40-socket')}>
            <path d="M0 -15 L13 -7.5 L13 7.5 L0 15 L-13 7.5 L-13 -7.5 Z" fill="none"
              stroke="var(--ink2)" strokeWidth="4" />
            <line x1="0" y1="-15" x2="0" y2="15" stroke="var(--ink2)" strokeWidth="3" />
          </g>
        </g>
        {/* M10 count badge */}
        <g>
          <rect x="22" y="22" width="58" height="30" rx="8" fill="var(--accent2)" />
          <text x="51" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--on-accent)">M10</text>
        </g>
        {/* torque value stamp */}
        <g className={anim('ga40-stamp')}>
          <rect x="206" y="190" width="92" height="28" rx="8" fill="var(--accent)" />
          <text x="252" y="209" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--on-accent)">26.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
