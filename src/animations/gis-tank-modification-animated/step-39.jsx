export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Fill each zeolite bag to 1.5 kilograms on the scale and fit it into the filter cover">
      <style>{`
        @keyframes ga39-fall { 0% { transform: translateY(-30px); opacity: 0 } 14% { opacity: 1 } 78% { transform: translateY(26px); opacity: 1 } 100% { transform: translateY(26px); opacity: 0 } }
        @keyframes ga39-swell { 0% { transform: scaleY(0.86) } 50% { transform: scaleY(1) } 100% { transform: scaleY(0.86) } }
        @keyframes ga39-needle { 0% { transform: rotate(-46deg) } 50% { transform: rotate(40deg) } 100% { transform: rotate(-46deg) } }
        @keyframes ga39-press { 0% { transform: translateY(0) } 50% { transform: translateY(2.5px) } 100% { transform: translateY(0) } }
        @keyframes ga39-tag { 0%,46% { opacity: 0.4 } 58% { opacity: 1 } 100% { opacity: 0.4 } }
        .ga39-grain { transform-box: fill-box; }
        .ga39-g1--anim { animation: ga39-fall 2.8s linear infinite; }
        .ga39-g2--anim { animation: ga39-fall 2.8s linear infinite; animation-delay: -0.9s; }
        .ga39-g3--anim { animation: ga39-fall 2.8s linear infinite; animation-delay: -1.8s; }
        .ga39-bag { transform-box: fill-box; transform-origin: 50% 0%; }
        .ga39-bag--anim { animation: ga39-swell 2.8s ease-in-out infinite; }
        .ga39-needle { transform-box: fill-box; transform-origin: 50% 100%; transform: rotate(-46deg); }
        .ga39-needle--anim { animation: ga39-needle 2.8s ease-in-out infinite; }
        .ga39-pan { transform-box: fill-box; }
        .ga39-pan--anim { animation: ga39-press 2.8s ease-in-out infinite; }
        .ga39-tag { opacity: 0.4; }
        .ga39-tag--anim { animation: ga39-tag 2.8s ease-in-out infinite; }
        .ga39-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga39-stage" data-paused={paused ? '' : undefined}>
        {/* funnel feeding zeolite into the bag */}
        <path d="M118 30 L182 30 L160 58 L140 58 Z" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" strokeLinejoin="round" />

        {/* zeolite grains pouring down into the bag */}
        <g className={anim('ga39-grain ga39-g1')}><circle cx="150" cy="62" r="3.5" fill="var(--accent2)" /></g>
        <g className={anim('ga39-grain ga39-g2')}><circle cx="160" cy="62" r="3" fill="var(--accent2)" /></g>
        <g className={anim('ga39-grain ga39-g3')}><circle cx="156" cy="62" r="3.5" fill="var(--accent2)" /></g>

        {/* the zeolite bag, swelling as it fills, sitting on the pan */}
        <g className={anim('ga39-pan')}>
          <g className={anim('ga39-bag')}>
            <path d="M134 70 L166 70 L172 132 L128 132 Z" fill="var(--accent)" opacity="0.92"
              stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
            <rect x="138" y="64" width="24" height="10" rx="3" fill="var(--navy)" />
          </g>
          {/* weighing pan + post */}
          <rect x="112" y="132" width="76" height="9" rx="4" fill="var(--slate)" />
        </g>

        {/* scale body */}
        <rect x="96" y="141" width="108" height="48" rx="10" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2" />

        {/* analogue dial with sweeping needle */}
        <circle cx="124" cy="166" r="20" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        <path d="M104 166 a20 20 0 0 1 40 0" fill="none" stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" />
        <g className={anim('ga39-needle')}>
          <rect x="122.5" y="150" width="3" height="16" rx="1.5" fill="var(--warn)" />
        </g>
        <circle cx="124" cy="166" r="3" fill="var(--ink)" />

        {/* digital target readout */}
        <rect x="150" y="152" width="46" height="28" rx="5" fill="var(--bg)" stroke="var(--slate)" strokeWidth="2" />
        <text x="173" y="171" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="var(--ok)">1.5kg</text>

        {/* the filter cover / case the filled bag is fitted into */}
        <g transform="translate(244 96)">
          <rect x="-30" y="0" width="60" height="86" rx="10" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
          <rect x="-20" y="14" width="40" height="58" rx="6" fill="var(--accent)" opacity="0.9" stroke="var(--ink)" strokeWidth="2" />
          {/* six cover screws */}
          <circle cx="-22" cy="6" r="3.4" fill="var(--ink2)" />
          <circle cx="0" cy="6" r="3.4" fill="var(--ink2)" />
          <circle cx="22" cy="6" r="3.4" fill="var(--ink2)" />
          <circle cx="-22" cy="80" r="3.4" fill="var(--ink2)" />
          <circle cx="0" cy="80" r="3.4" fill="var(--ink2)" />
          <circle cx="22" cy="80" r="3.4" fill="var(--ink2)" />
        </g>
        <path d="M210 134 l22 0" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" markerEnd="" />
        <path d="M226 128 l8 6 l-8 6" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* 20-minute time warning tag */}
        <g className={anim('ga39-tag')}>
          <rect x="34" y="194" width="96" height="26" rx="8" fill="var(--warn)" />
          <text x="82" y="212" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--ink)">&lt; 20 min</text>
        </g>

        {/* Loctite + screw count badge */}
        <rect x="190" y="194" width="98" height="26" rx="8" fill="var(--accent2)" />
        <text x="239" y="212" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--on-accent)">6x SCREW</text>
      </g>
    </svg>
  )
}
