export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Checking SF6 gas purity with the analyzer — purity at least 99.75%, dew point at most minus 25 degrees">
      <style>{`
        @keyframes g10-screen1 { 0%,45% { opacity: 1 } 50%,95% { opacity: 0 } 100% { opacity: 1 } }
        @keyframes g10-screen2 { 0%,45% { opacity: 0 } 50%,95% { opacity: 1 } 100% { opacity: 0 } }
        @keyframes g10-flow { 0% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 0 } }
        @keyframes g10-check { 0%,40% { opacity: 0.35; transform: scale(0.9) } 55% { opacity: 1; transform: scale(1.12) } 70%,100% { opacity: 1; transform: scale(1) } }
        .g10-s1--anim { animation: g10-screen1 4s ease-in-out infinite; }
        .g10-s2--anim { animation: g10-screen2 4s ease-in-out infinite; }
        .g10-hose--anim { animation: g10-flow 1.6s linear infinite; }
        .g10-check { transform-box: fill-box; transform-origin: 50% 50%; }
        .g10-check--anim { animation: g10-check 4s ease-in-out infinite; }
        .g10-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g10-stage" data-paused={paused ? '' : undefined}>
        {/* floor */}
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        {/* tank (right, RAL 7035, stud rows + CT plates) */}
        <rect x="212" y="42" width="92" height="172" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="222" y="56" width="72" height="70" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
        {[0,1,2,3,4].map((i) => <circle key={`t${i}`} cx={228 + i * 15} cy="61" r="2" fill="#9BA19A" />)}
        {[0,1,2,3,4].map((i) => <circle key={`b${i}`} cx={228 + i * 15} cy="121" r="2" fill="#9BA19A" />)}
        <circle cx="240" cy="166" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
        <circle cx="278" cy="166" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
        {[240, 278].map((cx) => [0,1,2,3,4,5,6,7].map((i) => (
          <circle key={`${cx}-${i}`} cx={cx + 13 * Math.cos((i * Math.PI) / 4)} cy={166 + 13 * Math.sin((i * Math.PI) / 4)} r="1.6" fill="#A9AEA6" />
        )))}
        {/* gas valve fitting */}
        <rect x="200" y="130" width="12" height="10" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
        {/* analyzer (grey box with screen) */}
        <rect x="34" y="96" width="128" height="96" rx="8" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="34" y="96" width="128" height="14" rx="7" fill="#A9AEA6" />
        <rect x="46" y="118" width="104" height="46" rx="4" fill="#1E2226" />
        {/* screen readouts alternating */}
        <g className={anim('g10-s1')}>
          <text x="98" y="138" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#6FE39A">SF6 99.79%</text>
          <text x="98" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#9FB6CC">min 99.75%</text>
        </g>
        <g className={anim('g10-s2')}>
          <text x="98" y="138" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#6FE39A">DP −31 °C</text>
          <text x="98" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#9FB6CC">max −25 °C</text>
        </g>
        <circle cx="58" cy="178" r="4" fill="#1F9D6B" />
        <circle cx="74" cy="178" r="4" fill="#3A4046" />
        {/* self-closing hose, gas flow pulsing */}
        <path d="M 162 140 C 180 140 186 135 200 135" fill="none" stroke="#26292C" strokeWidth="6" strokeLinecap="round" />
        <path className={anim('g10-hose')} d="M 162 140 C 180 140 186 135 200 135" fill="none" stroke="#6FE39A" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round" />
        {/* pass check */}
        <g className={anim('g10-check')}>
          <circle cx="176" cy="86" r="14" fill="#1F9D6B" />
          <path d="M 169 86 L 174 92 L 184 80" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* certified-only hazard */}
        <g>
          <polygon points="30,44 46,72 14,72" fill="var(--warn)" />
          <text x="30" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#FFFFFF">!</text>
        </g>
        <text x="98" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink2)">SF6 analyzer</text>
      </g>
    </svg>
  )
}
