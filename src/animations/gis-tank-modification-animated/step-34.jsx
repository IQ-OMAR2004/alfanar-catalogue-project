export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Transferring the finished panel on the trolley to the packing section with its final QC release and documents">
      <style>{`
        @keyframes g34-roll { 0% { transform: translateX(-46px) } 60% { transform: translateX(28px) } 100% { transform: translateX(28px) } }
        @keyframes g34-wheel { 0% { transform: rotate(0deg) } 60% { transform: rotate(540deg) } 100% { transform: rotate(540deg) } }
        @keyframes g34-done { 0%,60% { opacity: 0; transform: scale(0.8) } 72% { opacity: 1; transform: scale(1.12) } 82%,100% { opacity: 1; transform: scale(1) } }
        .g34-rig--anim { animation: g34-roll 5s ease-in-out infinite; }
        .g34-wheel { transform-box: fill-box; transform-origin: 50% 50%; }
        .g34-wheel--anim { animation: g34-wheel 5s ease-in-out infinite; }
        .g34-done { transform-box: fill-box; transform-origin: 50% 50%; }
        .g34-done--anim { animation: g34-done 5s ease-in-out infinite; }
        .g34-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="g34-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="206" width="320" height="34" fill="#B9BDB6" />
        <rect x="0" y="206" width="320" height="4" fill="#F2B826" />
        {/* packing zone (right): crate + sign */}
        <rect x="240" y="146" width="64" height="60" fill="#C9A96A" stroke="#9C7C43" strokeWidth="2" />
        <line x1="240" y1="176" x2="304" y2="176" stroke="#9C7C43" strokeWidth="2" />
        <line x1="272" y1="146" x2="272" y2="206" stroke="#9C7C43" strokeWidth="2" />
        <rect x="238" y="118" width="70" height="20" rx="5" fill="var(--accent)" />
        <text x="273" y="132" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--on-accent)">PACKING</text>
        {/* panel on red trolley rolling right */}
        <g className={anim('g34-rig')}>
          <rect x="58" y="66" width="86" height="118" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          <rect x="66" y="74" width="70" height="32" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
          <circle cx="78" cy="86" r="3" fill="#C0392B" />
          <circle cx="94" cy="86" r="3.5" fill="#1E2226" />
          {[0,1,2,3].map((i) => <circle key={i} cx={72 + i * 20} cy="114" r="2" fill="#9BA19A" />)}
          <circle cx="86" cy="152" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
          <circle cx="118" cy="152" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
          {/* green release tag */}
          <rect x="132" y="70" width="26" height="16" rx="3" fill="#1F9D6B" transform="rotate(8 145 78)" />
          <text x="145" y="82" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" fill="#FFFFFF" transform="rotate(8 145 78)">QC</text>
          {/* trolley */}
          <rect x="50" y="184" width="102" height="10" rx="3" fill="#C0392B" stroke="#8A2A20" strokeWidth="1.5" />
          <g className={anim('g34-wheel')}><circle cx="66" cy="200" r="7" fill="#2B2F33" /><line x1="66" y1="194" x2="66" y2="206" stroke="#7C837B" strokeWidth="2" /></g>
          <g className={anim('g34-wheel')}><circle cx="136" cy="200" r="7" fill="#2B2F33" /><line x1="136" y1="194" x2="136" y2="206" stroke="#7C837B" strokeWidth="2" /></g>
        </g>
        {/* documentation pack */}
        <rect x="18" y="112" width="34" height="44" rx="3" fill="#FFFFFF" stroke="#8A9089" strokeWidth="2" />
        <line x1="24" y1="124" x2="46" y2="124" stroke="#A9AEA6" strokeWidth="2" />
        <line x1="24" y1="132" x2="46" y2="132" stroke="#A9AEA6" strokeWidth="2" />
        <line x1="24" y1="140" x2="40" y2="140" stroke="#A9AEA6" strokeWidth="2" />
        <text x="35" y="170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)">docs</text>
        {/* completion check */}
        <g className={anim('g34-done')}>
          <circle cx="196" cy="52" r="17" fill="#1F9D6B" />
          <path d="M 187 52 L 193 59 L 206 44" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* pinch-point hazard */}
        <g>
          <polygon points="30,44 46,72 14,72" fill="var(--warn)" />
          <text x="30" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#FFFFFF">!</text>
        </g>
      </g>
    </svg>
  )
}
