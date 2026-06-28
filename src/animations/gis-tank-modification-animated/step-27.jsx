export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  // three CTs at these x centres
  const cts = [78, 160, 242]
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Verify each current transformer direction: P1 faces up and P2 faces down on all three CTs">
      <style>{`
        @keyframes ga27-sweep { 0% { transform: translateX(0) } 50% { transform: translateX(164px) } 100% { transform: translateX(0) } }
        @keyframes ga27-up { 0%,100% { transform: translateY(0); opacity:.55 } 50% { transform: translateY(-5px); opacity:1 } }
        @keyframes ga27-down { 0%,100% { transform: translateY(0); opacity:.55 } 50% { transform: translateY(5px); opacity:1 } }
        @keyframes ga27-pop { 0%,30% { transform: scale(0); opacity:0 } 45%,100% { transform: scale(1); opacity:1 } }
        @keyframes ga27-ping { 0%,100% { opacity:.9 } 50% { opacity:.25 } }
        .ga27-glass { transform: translateX(0); }
        .ga27-glass--anim { animation: ga27-sweep 3.2s ease-in-out infinite; }
        .ga27-up--anim { animation: ga27-up 3.2s ease-in-out infinite; }
        .ga27-down--anim { animation: ga27-down 3.2s ease-in-out infinite; }
        .ga27-tick { transform-box: fill-box; transform-origin: 50% 50%; transform: scale(1); }
        .ga27-tick--anim { animation: ga27-pop 3.2s ease-in-out infinite; }
        .ga27-tick.ga27-t1--anim { animation-delay: 0s; }
        .ga27-tick.ga27-t2--anim { animation-delay: .5s; }
        .ga27-tick.ga27-t3--anim { animation-delay: 1s; }
        .ga27-glow--anim { animation: ga27-ping 3.2s ease-in-out infinite; }
        .ga27-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga27-stage" data-paused={paused ? '' : undefined}>
        {/* baseline rail */}
        <rect x="30" y="186" width="260" height="8" rx="4" fill="var(--slate)" opacity="0.5" />

        {cts.map((cx, i) => (
          <g key={i}>
            {/* CT body (ring core) */}
            <rect x={cx - 26} y="78" width="52" height="108" rx="10" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
            <ellipse cx={cx} cy="132" rx="18" ry="22" fill="none" stroke="var(--accent)" strokeWidth="4" />
            {/* P1 top terminal + up arrow */}
            <g className={anim('ga27-up')} style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
              <rect x={cx - 6} y="56" width="12" height="20" rx="3" fill="var(--accent)" />
              <path d={`M ${cx} 40 L ${cx - 9} 54 L ${cx + 9} 54 Z`} fill="var(--ok)" />
            </g>
            <text x={cx} y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--ink)">P1</text>
            {/* P2 bottom terminal + down arrow */}
            <g className={anim('ga27-down')} style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
              <rect x={cx - 6} y="186" width="12" height="18" rx="3" fill="var(--accent2)" />
              <path d={`M ${cx} 216 L ${cx - 9} 204 L ${cx + 9} 204 Z`} fill="var(--warn)" />
            </g>
            <text x={cx} y="172" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--ink)">P2</text>
            {/* verified tick badge */}
            <g className={anim(`ga27-tick ga27-t${i + 1}`)}>
              <circle cx={cx + 18} cy="86" r="11" fill="var(--ok)" />
              <path d={`M ${cx + 12} 86 L ${cx + 16} 90 L ${cx + 24} 81`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        ))}

        {/* sweeping magnifier */}
        <g className={anim('ga27-glass')}>
          <circle cx="78" cy="132" r="30" fill="var(--beacon-soft)" stroke="var(--ink2)" strokeWidth="4" className={anim('ga27-glow')} />
          <circle cx="78" cy="132" r="30" fill="none" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
          <rect x="98" y="150" width="34" height="9" rx="4" fill="var(--ink2)" transform="rotate(45 100 154)" />
        </g>

        {/* label */}
        <text x="160" y="32" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--ink)">P1 up / P2 down  x3</text>
      </g>
    </svg>
  )
}
