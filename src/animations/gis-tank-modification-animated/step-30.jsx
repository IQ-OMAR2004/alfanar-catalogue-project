export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Stacking insulation plate, washers and cap nut, then torquing to 47.5 Nm">
      <style>{`
        @keyframes ga30-drop1 { 0% { transform: translateY(-58px); opacity: 0 } 18% { transform: translateY(0); opacity: 1 } 90% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-58px); opacity: 0 } }
        @keyframes ga30-drop2 { 0% { transform: translateY(-58px); opacity: 0 } 18% { transform: translateY(-58px); opacity: 0 } 34% { transform: translateY(0); opacity: 1 } 92% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-58px); opacity: 0 } }
        @keyframes ga30-drop3 { 0% { transform: translateY(-58px); opacity: 0 } 34% { transform: translateY(-58px); opacity: 0 } 50% { transform: translateY(0); opacity: 1 } 94% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-58px); opacity: 0 } }
        @keyframes ga30-turn { 0% { transform: rotate(-20deg) } 50% { transform: rotate(-20deg) } 66% { transform: rotate(12deg) } 82% { transform: rotate(-20deg) } 100% { transform: rotate(-20deg) } }
        @keyframes ga30-spark { 0% { opacity: 0; transform: scale(0.4) } 66% { opacity: 0; transform: scale(0.4) } 72% { opacity: 1; transform: scale(1) } 80% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga30-arc { 0% { stroke-dashoffset: 150 } 50% { stroke-dashoffset: 150 } 72% { stroke-dashoffset: 36 } 88% { stroke-dashoffset: 36 } 100% { stroke-dashoffset: 150 } }
        .ga30-d1--anim { animation: ga30-drop1 3.2s ease-in-out infinite; }
        .ga30-d2--anim { animation: ga30-drop2 3.2s ease-in-out infinite; }
        .ga30-d3--anim { animation: ga30-drop3 3.2s ease-in-out infinite; }
        .ga30-wrench { transform-box: fill-box; transform-origin: 50% 88%; transform: rotate(-20deg); }
        .ga30-wrench--anim { animation: ga30-turn 3.2s ease-in-out infinite; }
        .ga30-spark { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga30-spark--anim { animation: ga30-spark 3.2s ease-in-out infinite; }
        .ga30-arc--anim { animation: ga30-arc 3.2s ease-in-out infinite; }
        .ga30-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga30-stage" data-paused={paused ? '' : undefined}>
        {/* central stud / bolt going up through the stack */}
        <rect x="153" y="64" width="14" height="138" rx="3" fill="var(--slate)" />

        {/* base: aluminium plate seated on tank flange */}
        <rect x="44" y="178" width="232" height="22" rx="5" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />

        {/* layer 1: orange insulation plate */}
        <g className={anim('ga30-d1')}>
          <rect x="58" y="150" width="204" height="24" rx="5" fill="var(--accent)" />
        </g>

        {/* layer 2: plastic washer (wide) */}
        <g className={anim('ga30-d2')}>
          <ellipse cx="160" cy="138" rx="44" ry="9" fill="var(--accent2)" stroke="var(--ink2)" strokeWidth="2" />
        </g>

        {/* layer 3: spring washer + cap nut */}
        <g className={anim('ga30-d3')}>
          <ellipse cx="160" cy="120" rx="30" ry="7" fill="var(--sky)" stroke="var(--ink2)" strokeWidth="2" />
          <path d="M138 110 h44 v-12 a22 14 0 0 0 -44 0 z" fill="var(--navy)" />
          <ellipse cx="160" cy="98" rx="22" ry="9" fill="var(--navy)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        {/* spanner turning on the cap nut */}
        <g className={anim('ga30-wrench')}>
          <rect x="153" y="98" width="13" height="96" rx="6" fill="var(--ink2)" />
          <path d="M138 96 a22 12 0 0 1 44 0 l-9 0 a13 7 0 0 0 -26 0 z" fill="var(--ink2)" />
        </g>

        {/* torque arc filling near the nut */}
        <circle cx="160" cy="98" r="30" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 160 98)" className={anim('ga30-arc')} />

        {/* click spark */}
        <g className={anim('ga30-spark')} transform="translate(196 78)">
          <path d="M0 -11 L3 -3 L11 -3 L4 2 L7 10 L0 5 L-7 10 L-4 2 L-11 -3 L-3 -3 Z" fill="var(--warn)" />
        </g>

        {/* torque value stamp */}
        <rect x="222" y="186" width="74" height="26" rx="6" fill="var(--panel)" stroke="var(--ok)" strokeWidth="2" />
        <text x="259" y="204" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--ok)">47.5 Nm</text>

        {/* spanner size badge */}
        <text x="28" y="40" fontFamily="var(--font-mono)" fontSize="14" fill="var(--ink)">19mm</text>
      </g>
    </svg>
  )
}
