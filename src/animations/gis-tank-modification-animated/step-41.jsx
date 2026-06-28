export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Evacuating air from the tank with a vacuum pump down to 0.8 mbar">
      <style>{`
        @keyframes ga41-flow { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -28 } }
        @keyframes ga41-suck { 0% { transform: translateX(0); opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { transform: translateX(96px); opacity: 0 } }
        @keyframes ga41-needle { 0% { transform: rotate(46deg) } 55% { transform: rotate(-44deg) } 100% { transform: rotate(46deg) } }
        @keyframes ga41-blink { 0% { opacity: 1 } 45% { opacity: 1 } 55% { opacity: .25 } 95% { opacity: .25 } 100% { opacity: 1 } }
        @keyframes ga41-warn { 0% { opacity: .45 } 50% { opacity: 1 } 100% { opacity: .45 } }
        .ga41-flow--anim { animation: ga41-flow 1.2s linear infinite; }
        .ga41-p1--anim { animation: ga41-suck 3s linear infinite; }
        .ga41-p2--anim { animation: ga41-suck 3s linear infinite; animation-delay: 1s; }
        .ga41-p3--anim { animation: ga41-suck 3s linear infinite; animation-delay: 2s; }
        .ga41-needle { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(46deg); }
        .ga41-needle--anim { animation: ga41-needle 3s ease-in-out infinite; }
        .ga41-led { opacity: 1; }
        .ga41-led--anim { animation: ga41-blink 3s linear infinite; }
        .ga41-warn { opacity: .45; }
        .ga41-warn--anim { animation: ga41-warn 3s ease-in-out infinite; }
        .ga41-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga41-stage" data-paused={paused ? '' : undefined}>
        {/* GIS tank on the left */}
        <rect x="24" y="78" width="78" height="96" rx="12" fill="var(--accent)" opacity="0.9" />
        <rect x="36" y="92" width="54" height="68" rx="8" fill="var(--panel-2)" opacity="0.5" />
        {/* outlet port on the tank */}
        <rect x="100" y="118" width="16" height="16" rx="3" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />

        {/* DN8 hose: tank -> pump (flow arrows run toward pump) */}
        <path d="M116 126 H210" fill="none" stroke="var(--ink2)" strokeWidth="7" strokeLinecap="round" />
        <path d="M116 126 H210" fill="none" stroke="var(--accent2)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="10 18" className={anim('ga41-flow')} />

        {/* extracted-air particles travelling out of the tank */}
        <g transform="translate(120 126)">
          <circle cx="0" cy="-7" r="3.4" fill="var(--sky)" className={anim('ga41-p1')} />
          <circle cx="0" cy="6" r="3" fill="var(--sky)" className={anim('ga41-p2')} />
          <circle cx="0" cy="0" r="2.6" fill="var(--sky)" className={anim('ga41-p3')} />
        </g>

        {/* vacuum pump body */}
        <rect x="210" y="92" width="86" height="92" rx="10" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />
        <rect x="210" y="118" width="20" height="16" rx="3" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />

        {/* gauge screen with falling needle */}
        <circle cx="253" cy="124" r="22" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
        <path d="M236 134 A22 22 0 0 1 270 134" fill="none" stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" />
        <g className={anim('ga41-needle')}>
          <rect x="251" y="110" width="4" height="22" rx="2" fill="var(--warn)" />
        </g>
        <circle cx="253" cy="132" r="4" fill="var(--ink)" />

        {/* green start button (blinks) */}
        <circle cx="240" cy="166" r="9" fill="var(--ok)" className={anim('ga41-led')} />

        {/* target read-out */}
        <rect x="206" y="194" width="92" height="26" rx="7" fill="var(--accent)" />
        <text x="252" y="212" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--on-accent)">0.8 mbar</text>

        {/* hazard warning glyph */}
        <g className={anim('ga41-warn')} transform="translate(52 40)">
          <path d="M0 -16 L16 14 H-16 Z" fill="var(--warn)" stroke="var(--ink2)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="-2.5" y="-7" width="5" height="12" rx="2" fill="var(--ink)" />
          <circle cx="0" cy="9" r="2.6" fill="var(--ink)" />
        </g>
      </g>
    </svg>
  )
}
