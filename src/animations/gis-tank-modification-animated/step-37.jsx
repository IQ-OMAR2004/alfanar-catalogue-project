export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Bolt and torque the CB-to-CT busbar joints to 47 newton-metres, holding a 40 millimetre gap">
      <style>{`
        @keyframes ga37-turn { 0% { transform: rotate(-26deg) } 55% { transform: rotate(16deg) } 100% { transform: rotate(-26deg) } }
        @keyframes ga37-arc { 0% { stroke-dashoffset: 150 } 55% { stroke-dashoffset: 44 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga37-pop { 0% { transform: scale(0.6); opacity: 0 } 50% { transform: scale(1); opacity: 1 } 92% { transform: scale(1); opacity: 1 } 100% { transform: scale(0.6); opacity: 0 } }
        @keyframes ga37-blink { 0%,40% { opacity: 0.25 } 55% { opacity: 1 } 100% { opacity: 0.25 } }
        .ga37-wrench { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-26deg); }
        .ga37-wrench--anim { animation: ga37-turn 3s ease-in-out infinite; }
        .ga37-arc--anim { animation: ga37-arc 3s ease-in-out infinite; }
        .ga37-click { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga37-click--anim { animation: ga37-pop 3s ease-in-out infinite; }
        .ga37-led--anim { animation: ga37-blink 3s ease-in-out infinite; }
        .ga37-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga37-stage" data-paused={paused ? '' : undefined}>
        {/* CT support pipe (inner reference) */}
        <rect x="26" y="40" width="16" height="160" rx="8" fill="var(--slate)" opacity="0.7" />
        <text x="34" y="214" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)" textAnchor="middle">CT</text>

        {/* gap callout: conductor 40mm from support pipe */}
        <line x1="42" y1="120" x2="78" y2="120" stroke="var(--warn)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M48 114 L42 120 L48 126" fill="none" stroke="var(--warn)" strokeWidth="2" />
        <path d="M72 114 L78 120 L72 126" fill="none" stroke="var(--warn)" strokeWidth="2" />
        <text x="60" y="110" fontFamily="var(--font-mono)" fontSize="11" fill="var(--warn)" textAnchor="middle">40 mm</text>

        {/* CT-side busbar (small joint, 6 bolts) */}
        <rect x="78" y="98" width="74" height="44" rx="6" fill="var(--accent)" opacity="0.92" />
        {[0, 1, 2].map((c) => [0, 1].map((r) => (
          <circle key={`ct-${c}-${r}`} cx={94 + c * 22} cy={112 + r * 18} r="4.5"
            fill="var(--navy)" stroke="var(--on-accent)" strokeWidth="1.2" />
        )))}
        <text x="115" y="158" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)" textAnchor="middle">6x M12</text>

        {/* VCB-side busbar (12 bolts) */}
        <rect x="156" y="92" width="118" height="56" rx="6" fill="var(--accent2)" opacity="0.92" />
        {[0, 1, 2, 3, 4, 5].map((c) => [0, 1].map((r) => (
          <circle key={`cb-${c}-${r}`} cx={170 + c * 18} cy={108 + r * 24} r="4.5"
            fill="var(--navy)" stroke="var(--on-accent)" strokeWidth="1.2" />
        )))}
        <text x="215" y="166" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)" textAnchor="middle">12x M12 / VCB</text>

        {/* torque progress arc on the active bolt */}
        <circle cx="170" cy="108" r="22" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 170 108)" className={anim('ga37-arc')} />

        {/* ratchet + socket turning on the active bolt */}
        <g className={anim('ga37-wrench')}>
          <circle cx="170" cy="108" r="11" fill="none" stroke="var(--ink)" strokeWidth="4" />
          <rect x="165" y="108" width="10" height="84" rx="5" fill="var(--ink2)" />
          <rect x="161" y="186" width="18" height="14" rx="4" fill="var(--ink)" />
        </g>

        {/* "click" spark when target torque reached */}
        <g className={anim('ga37-click')} transform="translate(196 86)">
          <path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="var(--beacon-soft)" />
        </g>

        {/* torque value stamp + ok LED */}
        <rect x="208" y="178" width="86" height="34" rx="8" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />
        <circle cx="224" cy="195" r="5" fill="var(--ok)" className={anim('ga37-led')} />
        <text x="262" y="200" fontFamily="var(--font-mono)" fontSize="16" fill="var(--ink)" textAnchor="middle">47 Nm</text>
      </g>
    </svg>
  )
}
