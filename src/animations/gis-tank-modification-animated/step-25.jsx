export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Install the CT support plate and torque the M12 bolts to 47.5 Newton metres">
      <style>{`
        @keyframes ga25-seat { 0% { transform: translateY(-26px) } 45% { transform: translateY(0) } 100% { transform: translateY(0) } }
        @keyframes ga25-down { 0% { opacity: 1; transform: translateY(-26px) } 44% { opacity: 1; transform: translateY(0) } 60% { opacity: 0 } 100% { opacity: 0 } }
        @keyframes ga25-turn { 0% { transform: rotate(-24deg) } 8% { transform: rotate(-24deg) } 60% { transform: rotate(16deg) } 100% { transform: rotate(-24deg) } }
        @keyframes ga25-spin { 0% { transform: rotate(0deg) } 8% { transform: rotate(0deg) } 100% { transform: rotate(280deg) } }
        @keyframes ga25-arc { 0% { stroke-dashoffset: 150 } 8% { stroke-dashoffset: 150 } 60% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 40 } }
        @keyframes ga25-click { 0% { opacity: 0; transform: scale(0.4) } 60% { opacity: 0 } 66% { opacity: 1; transform: scale(1.15) } 80% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0 } }
        .ga25-plate { transform-box: fill-box; transform-origin: 50% 50%; transform: translateY(-12px); }
        .ga25-plate--anim { animation: ga25-seat 3.2s ease-in-out infinite; }
        .ga25-arrow { transform-box: fill-box; transform-origin: 50% 50%; transform: translateY(-12px); }
        .ga25-arrow--anim { animation: ga25-down 3.2s ease-in-out infinite; }
        .ga25-wr { transform-box: fill-box; transform-origin: 16% 50%; transform: rotate(-24deg); }
        .ga25-wr--anim { animation: ga25-turn 3.2s ease-in-out infinite; }
        .ga25-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga25-nut--anim { animation: ga25-spin 3.2s ease-in-out infinite; }
        .ga25-arc--anim { animation: ga25-arc 3.2s ease-in-out infinite; }
        .ga25-click { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga25-click--anim { animation: ga25-click 3.2s ease-in-out infinite; }
        .ga25-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga25-stage" data-paused={paused ? '' : undefined}>
        {/* tank wall / mounting boss the plate seats onto */}
        <rect x="34" y="150" width="150" height="68" rx="12" fill="var(--navy)" />
        <rect x="42" y="158" width="134" height="52" rx="8" fill="var(--panel-2)" />
        {/* foam strip on the edge to avoid scratches */}
        <rect x="44" y="146" width="130" height="9" rx="4.5" fill="var(--accent2)" opacity="0.9" />
        <rect x="50" y="148" width="118" height="2.5" rx="1.25" fill="var(--on-accent)" opacity="0.4" />

        {/* CT support plate seating down into place */}
        <g className={anim('ga25-plate')}>
          <rect x="58" y="120" width="100" height="22" rx="5" fill="var(--accent)" opacity="0.95" />
          {/* four M12 bolt holes / heads on the plate */}
          <circle cx="74" cy="131" r="3.6" fill="var(--navy)" opacity="0.55" />
          <circle cx="100" cy="131" r="3.6" fill="var(--navy)" opacity="0.55" />
          <circle cx="126" cy="131" r="3.6" fill="var(--navy)" opacity="0.55" />
          <circle cx="148" cy="131" r="3.6" fill="var(--navy)" opacity="0.55" />
        </g>

        {/* down arrow showing the plate seating in */}
        <g className={anim('ga25-arrow')}>
          <path d="M28 110 v18 h-6 l9 12 9 -12 h-6 v-18 z" fill="var(--ok)" />
        </g>

        {/* torque target: socket on a bolt with arc filling to spec */}
        <g transform="translate(238 132)">
          <circle r="30" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
          {/* progress arc filling to 47.5 Nm target */}
          <circle r="24" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90)" className={anim('ga25-arc')} />
          {/* hex nut being driven */}
          <g className={anim('ga25-nut')}>
            <path d="M0 -13 l11 6.5 v13 l-11 6.5 l-11 -6.5 v-13 z" fill="var(--ink2)" />
            <circle r="4" fill="var(--panel-2)" />
          </g>
          {/* click spark when target reached */}
          <g className={anim('ga25-click')}>
            <path d="M0 -34 v8 M24 -24 l-6 6 M34 0 h-8 M24 24 l-6 -6 M0 34 v-8 M-24 24 l6 -6 M-34 0 h8 M-24 -24 l6 6"
              stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* Allen socket + spanner driving the bolt */}
        <g className={anim('ga25-wr')}>
          <rect x="252" y="125" width="48" height="13" rx="6.5" fill="var(--ink2)" />
          <circle cx="261" cy="131.5" r="10" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="3" />
        </g>

        {/* spec badges */}
        <rect x="22" y="24" width="84" height="24" rx="7" fill="var(--accent)" />
        <text x="64" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">47.5 Nm</text>
        <rect x="116" y="24" width="78" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="155" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">4x M12</text>
        <rect x="204" y="24" width="92" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="250" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)">10 mm HEX</text>
      </g>
    </svg>
  )
}
