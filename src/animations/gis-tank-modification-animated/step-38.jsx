export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Crimp the CT terminal wiring with R Y B phase lugs, then fit and torque the CT cover plate">
      <style>{`
        @keyframes ga38-crimp { 0% { transform: rotate(-14deg) } 46% { transform: rotate(0deg) } 60% { transform: rotate(0deg) } 100% { transform: rotate(-14deg) } }
        @keyframes ga38-jaw { 0% { transform: rotate(11deg) } 46% { transform: rotate(0deg) } 60% { transform: rotate(0deg) } 100% { transform: rotate(11deg) } }
        @keyframes ga38-squeeze { 0% { transform: scaleX(1) } 46% { transform: scaleX(0.72) } 60% { transform: scaleX(0.72) } 100% { transform: scaleX(1) } }
        @keyframes ga38-spark { 0%,46% { opacity: 0; transform: scale(0.4) } 52% { opacity: 1; transform: scale(1) } 64% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga38-stamp { 0%,50% { opacity: 0.4 } 60% { opacity: 1 } 100% { opacity: 0.4 } }
        .ga38-tool { transform-box: fill-box; transform-origin: 92% 50%; transform: rotate(-14deg); }
        .ga38-tool--anim { animation: ga38-crimp 3s ease-in-out infinite; }
        .ga38-jaw { transform-box: fill-box; transform-origin: 92% 50%; transform: rotate(11deg); }
        .ga38-jaw--anim { animation: ga38-jaw 3s ease-in-out infinite; }
        .ga38-lug { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga38-lug--anim { animation: ga38-squeeze 3s ease-in-out infinite; }
        .ga38-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga38-spark--anim { animation: ga38-spark 3s ease-in-out infinite; }
        .ga38-tag { opacity: 0.4; }
        .ga38-tag--anim { animation: ga38-stamp 3s ease-in-out infinite; }
        .ga38-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga38-stage" data-paused={paused ? '' : undefined}>
        {/* CT cover plate fitted to the tank wall */}
        <rect x="30" y="150" width="118" height="72" rx="8" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="3" />
        {/* seated O-ring sheen on the plate edge */}
        <rect x="36" y="156" width="106" height="60" rx="6" fill="none" stroke="var(--ok)" strokeWidth="2" opacity="0.7" />
        {/* 8x M10 cover bolt heads */}
        <circle cx="46" cy="166" r="5" fill="var(--ink2)" />
        <circle cx="89" cy="160" r="5" fill="var(--ink2)" />
        <circle cx="132" cy="166" r="5" fill="var(--ink2)" />
        <circle cx="46" cy="186" r="5" fill="var(--ink2)" />
        <circle cx="132" cy="186" r="5" fill="var(--ink2)" />
        <circle cx="46" cy="206" r="5" fill="var(--ink2)" />
        <circle cx="89" cy="212" r="5" fill="var(--ink2)" />
        <circle cx="132" cy="206" r="5" fill="var(--ink2)" />
        {/* CT label stuck on the plate */}
        <rect x="66" y="178" width="40" height="20" rx="4" fill="var(--accent2)" />
        <text x="86" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--on-accent)">CT</text>

        {/* three R / Y / B phase wires feeding the terminal */}
        <path d="M232 70 q-70 4 -118 0" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        <path d="M232 92 q-70 0 -118 0" fill="none" stroke="var(--accent2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M232 114 q-70 -4 -118 0" fill="none" stroke="var(--sky)" strokeWidth="6" strokeLinecap="round" />
        {/* phase letters */}
        <text x="104" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--ink)">R</text>
        <text x="104" y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--ink)">Y</text>
        <text x="104" y="118" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--ink)">B</text>

        {/* the 6 mm lug being crimped on the centre (Y) wire */}
        <g className={anim('ga38-lug')}>
          <rect x="214" y="84" width="30" height="16" rx="4" fill="var(--navy)" stroke="var(--ink)" strokeWidth="2" />
        </g>
        <circle cx="250" cy="92" r="7" fill="none" stroke="var(--navy)" strokeWidth="4" />

        {/* crimp click spark at the jaws */}
        <g className={anim('ga38-spark')} transform="translate(229 70)">
          <path d="M0 -10 L3 -3 L10 -3 L4 2 L6 9 L0 4 L-6 9 L-4 2 L-10 -3 L-3 -3 Z" fill="var(--warn)" />
        </g>

        {/* crimp tool — two jaws pivoting shut on the lug */}
        <g className={anim('ga38-tool')}>
          <rect x="222" y="74" width="62" height="9" rx="4" fill="var(--ink2)" />
          <path d="M222 78 l-10 -3 l0 8 z" fill="var(--ink2)" />
        </g>
        <g className={anim('ga38-jaw')}>
          <rect x="222" y="101" width="62" height="9" rx="4" fill="var(--ink2)" />
          <path d="M222 106 l-10 3 l0 -8 z" fill="var(--ink2)" />
        </g>
        {/* tool grips / handle hint */}
        <rect x="276" y="70" width="12" height="44" rx="5" fill="var(--slate)" />

        {/* wire count badge */}
        <rect x="32" y="26" width="64" height="30" rx="8" fill="var(--accent)" />
        <text x="64" y="47" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="700" fill="var(--on-accent)">27x</text>

        {/* 6 mm lug spec badge */}
        <rect x="106" y="26" width="68" height="30" rx="8" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />
        <text x="140" y="47" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--ink)">6 mm</text>

        {/* torque value stamp for the cover bolts */}
        <g className={anim('ga38-tag')}>
          <rect x="158" y="188" width="134" height="32" rx="8" fill="var(--accent2)" />
          <text x="225" y="210" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="700" fill="var(--on-accent)">26.48 Nm</text>
        </g>

        {/* M10 x8 bolt note */}
        <text x="225" y="152" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--ink)">M10 x8</text>
      </g>
    </svg>
  )
}
