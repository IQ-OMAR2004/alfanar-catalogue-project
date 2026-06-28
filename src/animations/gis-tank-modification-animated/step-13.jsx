export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  // 4x4 grid of bolt holes on the CT terminal plate
  const cols = [86, 120, 154, 188]
  const rows = [70, 102, 134, 166]
  const holes = []
  rows.forEach((cy) => cols.forEach((cx) => holes.push({ cx, cy })))
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Removing the sixteen bolts and lifting off the CT terminal plate with a 17 mm socket and ratchet">
      <style>{`
        @keyframes ga13-plate { 0% { transform: translate(0,0); opacity: 1 } 50% { transform: translate(0,0); opacity: 1 } 70% { transform: translate(40px,-18px); opacity: 0.85 } 100% { transform: translate(0,0); opacity: 1 } }
        @keyframes ga13-ratchet { 0% { transform: rotate(-26deg) } 50% { transform: rotate(18deg) } 100% { transform: rotate(-26deg) } }
        @keyframes ga13-arc { 0% { stroke-dashoffset: 150 } 50% { stroke-dashoffset: 30 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga13-rise { 0% { transform: translateY(0); opacity: 0 } 30% { opacity: 1 } 100% { transform: translateY(-26px); opacity: 0 } }
        @keyframes ga13-blink { 0% { opacity: 0.25 } 50% { opacity: 1 } 100% { opacity: 0.25 } }
        .ga13-plate { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga13-plate--anim { animation: ga13-plate 3.2s ease-in-out infinite; }
        .ga13-ratchet { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-26deg); }
        .ga13-ratchet--anim { animation: ga13-ratchet 3.2s ease-in-out infinite; }
        .ga13-arc--anim { animation: ga13-arc 3.2s ease-in-out infinite; }
        .ga13-rise--anim { animation: ga13-rise 3.2s ease-in-out infinite; }
        .ga13-blink--anim { animation: ga13-blink 3.2s ease-in-out infinite; }
        .ga13-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga13-stage" data-paused={paused ? '' : undefined}>
        {/* tank wall behind the plate */}
        <rect x="60" y="48" width="160" height="140" rx="8" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        {/* CT terminal plate lifting off */}
        <g className={anim('ga13-plate')}>
          <rect x="68" y="54" width="144" height="128" rx="7" fill="var(--panel)" stroke="var(--accent)" strokeWidth="3" />
          {holes.map((h, i) => (
            <circle key={i} cx={h.cx} cy={h.cy} r="6" fill="none" stroke="var(--ink2)" strokeWidth="2" />
          ))}
        </g>
        {/* count badge */}
        <g>
          <rect x="68" y="192" width="62" height="26" rx="6" fill="var(--accent)" />
          <text x="99" y="210" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fontWeight="700" fill="var(--on-accent)">16x</text>
        </g>
        {/* size stamp */}
        <g>
          <rect x="140" y="192" width="72" height="26" rx="6" fill="none" stroke="var(--accent2)" strokeWidth="2" />
          <text x="176" y="210" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--accent2)">17 mm</text>
        </g>
        {/* loosen progress arc around active bolt */}
        <circle cx="188" cy="102" r="20" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 188 102)" className={anim('ga13-arc')} />
        {/* rising bolt (removed) */}
        <g className={anim('ga13-rise')}>
          <rect x="183" y="92" width="10" height="14" rx="2" fill="var(--accent)" />
          <circle cx="188" cy="90" r="4" fill="var(--ink2)" />
        </g>
        {/* ratchet driving the active bolt */}
        <g className={anim('ga13-ratchet')}>
          {/* socket head over the nut */}
          <circle cx="188" cy="102" r="13" fill="var(--navy)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="188" cy="102" r="5" fill="var(--slate)" />
          {/* handle */}
          <rect x="182" y="102" width="12" height="92" rx="6" fill="var(--ink2)" />
          <rect x="180" y="186" width="16" height="14" rx="4" fill="var(--slate)" />
        </g>
        {/* status indicator */}
        <circle cx="250" cy="64" r="7" fill="var(--beacon-soft)" className={anim('ga13-blink')} />
      </g>
    </svg>
  )
}
