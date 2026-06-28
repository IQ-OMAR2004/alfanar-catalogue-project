export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Removing the 62 M10 nuts from the back covers with a 17 mm socket and ratchet">
      <style>{`
        @keyframes ga14-unscrew { 0% { transform: rotate(0deg) } 50% { transform: rotate(-26deg) } 100% { transform: rotate(0deg) } }
        @keyframes ga14-lift { 0%,18% { transform: translateY(0); opacity: 1 } 60% { transform: translateY(-30px); opacity: 1 } 86%,100% { transform: translateY(-30px); opacity: 0 } }
        @keyframes ga14-count { 0%,40% { opacity: .55 } 65% { opacity: 1 } 100% { opacity: .55 } }
        @keyframes ga14-noflash { 0%,49% { opacity: .35 } 50%,99% { opacity: 1 } 100% { opacity: .35 } }
        .ga14-socket { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga14-socket--anim { animation: ga14-unscrew 3s ease-in-out infinite; }
        .ga14-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga14-nut--anim { animation: ga14-lift 3s ease-in-out infinite; }
        .ga14-badge--anim { animation: ga14-count 3s ease-in-out infinite; }
        .ga14-no--anim { animation: ga14-noflash 1.6s steps(1) infinite; }
        .ga14-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga14-stage" data-paused={paused ? '' : undefined}>
        {/* back cover panel with stud holes */}
        <rect x="30" y="40" width="150" height="160" rx="8" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        {[60, 100, 140].map((cy) =>
          [56, 100, 154].map((cx) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
          ))
        )}
        {/* the active stud location (target) */}
        <circle cx="100" cy="100" r="11" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.7" />

        {/* lifted nut + washers leaving the stud */}
        <g className={anim('ga14-nut')}>
          <ellipse cx="100" cy="116" rx="13" ry="3.4" fill="var(--slate)" opacity="0.5" />
          <ellipse cx="100" cy="112" rx="12" ry="3.4" fill="var(--ink2)" opacity="0.8" />
          <polygon points="100,90 113,97 113,107 100,114 87,107 87,97"
            fill="var(--accent2)" stroke="var(--ink)" strokeWidth="1.5" />
        </g>

        {/* 17 mm socket + ratchet, rotating loose */}
        <g className={anim('ga14-socket')}>
          <polygon points="100,82 116,91 116,109 100,118 84,109 84,91"
            fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
          <rect x="93" y="50" width="14" height="38" rx="4" fill="var(--ink2)" />
          <rect x="93" y="46" width="64" height="13" rx="6" fill="var(--ink2)" />
          <circle cx="151" cy="52" r="6" fill="var(--slate)" />
        </g>

        {/* count badge */}
        <g className={anim('ga14-badge')}>
          <rect x="206" y="44" width="86" height="40" rx="10" fill="var(--accent)" />
          <text x="249" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="24"
            fontWeight="700" fill="var(--on-accent)">62x</text>
        </g>
        <text x="206" y="102" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink2)">M10 nut</text>
        <text x="206" y="120" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink2)">17 mm</text>

        {/* bin for hardware */}
        <path d="M210 158 h74 l-7 44 h-60 z" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        <rect x="206" y="150" width="82" height="10" rx="4" fill="var(--slate)" />
        <circle cx="234" cy="176" r="4" fill="var(--accent2)" />
        <circle cx="252" cy="186" r="4" fill="var(--accent2)" />
        <circle cx="266" cy="172" r="4" fill="var(--accent2)" />

        {/* NO impact wrench warning */}
        <g className={anim('ga14-no')}>
          <circle cx="62" cy="206" r="15" fill="var(--warn)" />
          <rect x="50" y="201" width="24" height="6" rx="3" fill="#fff" transform="rotate(45 62 206)" />
          <text x="84" y="204" fontFamily="var(--font-mono)" fontSize="11" fill="var(--warn)">NO impact</text>
          <text x="84" y="217" fontFamily="var(--font-mono)" fontSize="11" fill="var(--warn)">wrench</text>
        </g>
      </g>
    </svg>
  )
}
