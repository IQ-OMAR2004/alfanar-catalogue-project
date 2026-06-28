export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  // sparkle positions left in the wiped path
  const sparks = [{ x: 96, y: 96 }, { x: 130, y: 110 }, { x: 168, y: 100 }, { x: 200, y: 116 }]
  // dust specks being vacuumed up from the bottom
  const dust = [{ x: 92, y: 168 }, { x: 118, y: 176 }, { x: 150, y: 170 }, { x: 178, y: 178 }]
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Wiping the tank interior clean with methanol and tissue, then vacuuming dust from the bottom">
      <style>{`
        @keyframes ga17-wipe { 0% { transform: translate(0,0) rotate(-6deg) } 50% { transform: translate(118px,18px) rotate(6deg) } 100% { transform: translate(0,0) rotate(-6deg) } }
        @keyframes ga17-drip { 0% { transform: translateY(0); opacity: 0 } 25% { opacity: 1 } 100% { transform: translateY(22px); opacity: 0 } }
        @keyframes ga17-spark { 0% { opacity: 0; transform: scale(0.4) } 40% { opacity: 1; transform: scale(1) } 80% { opacity: 0; transform: scale(0.4) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga17-suck { 0% { opacity: 0.9; transform: translate(0,0) scale(1) } 100% { opacity: 0; transform: translate(0,-44px) scale(0.3) } }
        @keyframes ga17-glow { 0% { opacity: 0.3 } 50% { opacity: 1 } 100% { opacity: 0.3 } }
        .ga17-cloth { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga17-cloth--anim { animation: ga17-wipe 3.2s ease-in-out infinite; }
        .ga17-drip { transform-box: fill-box; opacity: 0; }
        .ga17-drip--anim { animation: ga17-drip 3.2s ease-in-out infinite; }
        .ga17-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga17-spark--anim { animation: ga17-spark 3.2s ease-in-out infinite; }
        .ga17-dust { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga17-dust--anim { animation: ga17-suck 2.6s linear infinite; }
        .ga17-glow--anim { animation: ga17-glow 3.2s ease-in-out infinite; }
        .ga17-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga17-stage" data-paused={paused ? '' : undefined}>
        {/* open tank cavity being cleaned */}
        <rect x="56" y="58" width="172" height="146" rx="14" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="3" />
        <rect x="68" y="70" width="148" height="122" rx="9" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        {/* clean-sheen on the bottom (the spot that must end spotless) */}
        <rect x="74" y="160" width="136" height="26" rx="6" fill="var(--ok)" opacity="0.3" className={anim('ga17-glow')} />

        {/* sparkle trail left behind by the wipe */}
        {sparks.map((s, i) => (
          <g key={i} className={anim('ga17-spark')} style={reduced ? undefined : { animationDelay: `${i * 0.5}s` }}>
            <path d={`M${s.x} ${s.y - 6} l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z`} fill="var(--ok)" />
          </g>
        ))}

        {/* dust specks rising into the vacuum nozzle */}
        {dust.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="3" fill="var(--ink2)" className={anim('ga17-dust')}
            style={reduced ? undefined : { animationDelay: `${i * 0.6}s` }} />
        ))}

        {/* methanol drips falling from the cloth */}
        <g className={anim('ga17-drip')}>
          <path d="M120 128 c-4 6 -4 9 0 9 c4 0 4 -3 0 -9 z" fill="var(--sky)" />
        </g>

        {/* tissue / cloth sweeping across the surface */}
        <g className={anim('ga17-cloth')}>
          <path d="M88 100 l30 -8 l8 26 l-30 10 z" fill="var(--accent)" opacity="0.92" />
          <path d="M92 104 l22 -6 l5 17 l-22 7 z" fill="none" stroke="var(--on-accent)" strokeWidth="2" opacity="0.5" />
          {/* worker's gloved hold (chemical glove) */}
          <rect x="100" y="84" width="16" height="14" rx="4" fill="var(--navy)" />
        </g>

        {/* vacuum nozzle reaching to the bottom */}
        <path d="M236 40 l14 0 l0 96 l-22 22 l-16 -6 l24 -22 z" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />
        <rect x="234" y="34" width="20" height="12" rx="4" fill="var(--ink2)" />
        {/* methanol bottle label */}
        <rect x="246" y="180" width="56" height="34" rx="6" fill="var(--panel)" stroke="var(--accent2)" strokeWidth="2" />
        <text x="274" y="201" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--accent2)">CH3OH</text>

        {/* status beacon */}
        <circle cx="274" cy="60" r="7" fill="var(--beacon-soft)" className={anim('ga17-glow')} />
      </g>
    </svg>
  )
}
