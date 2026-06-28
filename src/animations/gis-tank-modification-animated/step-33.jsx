export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  // 8 bolt positions evenly around the disc (face-on view)
  const cx = 132, cy = 124, r = 64
  const bolts = Array.from({ length: 8 }, (_, i) => {
    const a = (-90 + i * 45) * (Math.PI / 180)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Fit the bursting disc and tighten its eight M8 nuts to 14.70 Nm">
      <style>{`
        @keyframes ga33-seat { 0% { transform: scale(0.78); opacity: 0 } 24% { transform: scale(1); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes ga33-orbit { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes ga33-turn { 0% { transform: rotate(-26deg) } 50% { transform: rotate(16deg) } 100% { transform: rotate(-26deg) } }
        @keyframes ga33-arc { 0% { stroke-dashoffset: 402 } 24% { stroke-dashoffset: 402 } 100% { stroke-dashoffset: 0 } }
        @keyframes ga33-warn { 0% { opacity: 0.45 } 50% { opacity: 1 } 100% { opacity: 0.45 } }
        @keyframes ga33-shine { 0% { transform: translateX(-26px); opacity: 0 } 30% { opacity: 0.9 } 60% { transform: translateX(26px); opacity: 0 } 100% { transform: translateX(26px); opacity: 0 } }
        .ga33-disc { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga33-disc--anim { animation: ga33-seat 3.2s ease-in-out infinite; }
        .ga33-orbit { transform-box: fill-box; transform-origin: ${cx}px ${cy}px; }
        .ga33-orbit--anim { animation: ga33-orbit 3.2s linear infinite; }
        .ga33-socket { transform-box: fill-box; transform-origin: 50% 50%; transform: rotate(-26deg); }
        .ga33-socket--anim { animation: ga33-turn 0.8s ease-in-out infinite; }
        .ga33-arc--anim { animation: ga33-arc 3.2s ease-in-out infinite; }
        .ga33-warn { opacity: 0.45; }
        .ga33-warn--anim { animation: ga33-warn 1.6s ease-in-out infinite; }
        .ga33-shine { opacity: 0; }
        .ga33-shine--anim { animation: ga33-shine 3.2s ease-in-out infinite; }
        .ga33-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga33-stage" data-paused={paused ? '' : undefined}>
        {/* tank flange ring the disc seats onto */}
        <circle cx={cx} cy={cy} r="82" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="64" fill="none" stroke="var(--ink2)" strokeWidth="2" strokeDasharray="5 6" opacity="0.6" />

        {/* the bursting disc dropping / seating in */}
        <g className={anim('ga33-disc')}>
          <circle cx={cx} cy={cy} r="58" fill="var(--accent)" stroke="var(--navy)" strokeWidth="3" />
          <circle cx={cx} cy={cy} r="34" fill="none" stroke="var(--on-accent)" strokeWidth="2.5" opacity="0.7" />
          <circle cx={cx} cy={cy} r="14" fill="var(--navy)" />
          {/* clean sheen sweeping across the disc */}
          <g clipPath="url(#ga33-clip)">
            <rect x={cx - 6} y={cy - 58} width="12" height="116" rx="6" fill="#fff" opacity="0.5"
              className={anim('ga33-shine')} />
          </g>
        </g>
        <clipPath id="ga33-clip"><circle cx={cx} cy={cy} r="58" /></clipPath>

        {/* eight M8 nuts + spring washers seated in a ring */}
        {bolts.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r="9" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
            <path d={`M${b.x} ${b.y - 7} l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7 z`}
              fill="var(--slate)" stroke="var(--navy)" strokeWidth="1.5" />
          </g>
        ))}

        {/* socket + ratchet orbiting the ring, spinning on the current nut */}
        <g className={anim('ga33-orbit')}>
          <g transform={`translate(${cx} ${cy - r})`}>
            {/* torque arc that fills as the socket spins */}
            <g className={anim('ga33-socket')}>
              <circle cx="0" cy="0" r="13" fill="none" stroke="var(--ok)" strokeWidth="4"
                strokeLinecap="round" strokeDasharray="60 60" />
              <rect x="-5" y="-5" width="10" height="10" rx="2" fill="var(--ink)" />
              <rect x="-4" y="0" width="8" height="44" rx="4" fill="var(--ink2)" />
            </g>
          </g>
        </g>

        {/* overall torque progress arc around the disc */}
        <circle cx={cx} cy={cy} r="64" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="402" strokeDashoffset="402" transform={`rotate(-90 ${cx} ${cy})`}
          className={anim('ga33-arc')} />

        {/* hazard glyph: improper torque risks gas leak */}
        <g className={anim('ga33-warn')} transform="translate(268 50)">
          <path d="M0 -18 L17 12 L-17 12 Z" fill="var(--warn)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="-2.5" y="-9" width="5" height="13" rx="2" fill="var(--navy)" />
          <circle cx="0" cy="8" r="2.6" fill="var(--navy)" />
        </g>

        {/* spec badges */}
        <rect x="236" y="180" width="74" height="26" rx="8" fill="var(--accent)" />
        <text x="273" y="198" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          fontWeight="700" fill="var(--on-accent)">M8 · 8x</text>
        <rect x="236" y="146" width="74" height="26" rx="6" fill="var(--panel)" stroke="var(--ok)" strokeWidth="2" />
        <text x="273" y="164" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ok)">14.70 Nm</text>
        <text x="22" y="36" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink)">13mm</text>
      </g>
    </svg>
  )
}
