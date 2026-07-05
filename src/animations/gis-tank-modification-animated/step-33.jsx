export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="After a passed test the discharged panel is unbolted and craned off the testing base">
      <style>{`
        @keyframes g33-pass { 0%,15% { opacity: 0.3 } 25%,100% { opacity: 1 } }
        @keyframes g33-unbolt { 0%,25% { opacity: 1; transform: translateY(0) } 40% { transform: translateY(-12px); opacity: 1 } 50%,100% { opacity: 0; transform: translateY(-12px) } }
        @keyframes g33-lift { 0%,50% { transform: translateY(0) } 90%,100% { transform: translateY(-30px) } }
        .g33-pass--anim { animation: g33-pass 5s ease-in-out infinite; }
        .g33-bolt--anim { animation: g33-unbolt 5s ease-in-out infinite; }
        .g33-panel--anim { animation: g33-lift 5s ease-in-out infinite; }
        .g33-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g33-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
        <rect x="0" y="214" width="320" height="4" fill="#F2B826" />
        {/* crane */}
        <rect x="0" y="12" width="320" height="12" fill="#F2B826" stroke="#C8991F" strokeWidth="1.5" />
        <rect x="130" y="24" width="34" height="14" rx="3" fill="#2C6FB4" />
        {/* testing base stays on floor */}
        <rect x="98" y="192" width="126" height="18" rx="2" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
        <text x="161" y="230" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">testing base</text>
        {/* bolts lifting out first */}
        <g className={anim('g33-bolt')}>
          <circle cx="108" cy="198" r="4" fill="#6E767E" />
          <circle cx="214" cy="198" r="4" fill="#6E767E" />
        </g>
        {/* panel lifting off */}
        <g className={anim('g33-panel')}>
          <line x1="147" y1="38" x2="122" y2="70" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          <line x1="147" y1="38" x2="198" y2="70" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          <rect x="112" y="70" width="96" height="120" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          <rect x="120" y="78" width="80" height="34" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
          <circle cx="132" cy="90" r="3" fill="#C0392B" />
          <circle cx="150" cy="90" r="3.5" fill="#1E2226" />
          {[0,1,2,3].map((i) => <circle key={i} cx={128 + i * 22} cy="122" r="2" fill="#9BA19A" />)}
          <circle cx="142" cy="160" r="13" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
          <circle cx="178" cy="160" r="13" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
        </g>
        {/* test passed lamp */}
        <g className={anim('g33-pass')}>
          <rect x="228" y="84" width="86" height="42" rx="8" fill="#1F9D6B" />
          <text x="271" y="101" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#FFFFFF">TEST PASSED</text>
          <text x="271" y="117" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#DFF7EA">discharged</text>
        </g>
        {/* do-not-touch hazard until released */}
        <g>
          <polygon points="36,84 52,112 20,112" fill="var(--warn)" />
          <text x="36" y="107" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#FFFFFF">!</text>
          <text x="36" y="128" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)">wait for</text>
          <text x="36" y="139" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)">release</text>
        </g>
      </g>
    </svg>
  )
}
