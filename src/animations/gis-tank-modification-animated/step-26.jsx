export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Clean the conductor with sandpaper, then install the busbar onto the CT support plate with M12 bolts">
      <style>{`
        @keyframes ga26-sand { 0% { transform: translateX(-30px) } 50% { transform: translateX(30px) } 100% { transform: translateX(-30px) } }
        @keyframes ga26-shine { 0% { opacity: 0 } 20% { opacity: 0 } 45% { opacity: 0.9 } 70% { opacity: 0 } 100% { opacity: 0 } }
        @keyframes ga26-spark { 0%,18% { opacity: 0; transform: scale(0.4) } 30% { opacity: 1; transform: scale(1) } 46% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0; transform: scale(0.4) } }
        @keyframes ga26-seat { 0% { transform: translateY(-30px); opacity: 0.55 } 45% { transform: translateY(0); opacity: 1 } 85% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(-30px); opacity: 0.55 } }
        @keyframes ga26-bolt { 0%,45% { opacity: 0; transform: scale(0.3) } 60%,85% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(0.3) } }
        @keyframes ga26-tag { 0%,45% { opacity: 0.4 } 62%,85% { opacity: 1 } 100% { opacity: 0.4 } }
        .ga26-pad { transform-box: fill-box; transform-origin: 50% 50%; transform: translateX(-30px); }
        .ga26-pad--anim { animation: ga26-sand 3s ease-in-out infinite; }
        .ga26-shine { opacity: 0; }
        .ga26-shine--anim { animation: ga26-shine 3s ease-in-out infinite; }
        .ga26-spk { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga26-spk--anim { animation: ga26-spark 3s ease-in-out infinite; }
        .ga26-bar { transform-box: fill-box; transform-origin: 50% 50%; transform: translateY(0); }
        .ga26-bar--anim { animation: ga26-seat 3s ease-in-out infinite; }
        .ga26-blt { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga26-blt--anim { animation: ga26-bolt 3s ease-in-out infinite; }
        .ga26-spec { opacity: 0.4; }
        .ga26-spec--anim { animation: ga26-tag 3s ease-in-out infinite; }
        .ga26-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga26-stage" data-paused={paused ? '' : undefined}>
        {/* CT support plate the busbar mounts onto */}
        <rect x="44" y="150" width="232" height="58" rx="10" fill="var(--navy)" />
        <rect x="52" y="158" width="216" height="42" rx="7" fill="var(--panel-2)" />
        {/* upstands / lugs that receive the busbar bolts */}
        <rect x="78" y="138" width="26" height="24" rx="4" fill="var(--slate)" />
        <rect x="216" y="138" width="26" height="24" rx="4" fill="var(--slate)" />

        {/* the conductor strip being cleaned (top half of frame) */}
        <rect x="56" y="58" width="208" height="22" rx="6" fill="var(--accent)" opacity="0.9" />
        {/* polished shine sweeping across the cleaned conductor */}
        <rect x="86" y="60" width="60" height="18" rx="5" fill="#fff" className={anim('ga26-shine')} />

        {/* sandpaper pad sweeping back and forth */}
        <g className={anim('ga26-pad')}>
          <rect x="138" y="40" width="46" height="18" rx="4" fill="var(--accent2)" stroke="var(--ink2)" strokeWidth="2" />
          <line x1="146" y1="49" x2="176" y2="49" stroke="var(--on-accent)" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
          {/* abrasion sparks at the contact line */}
          <g className={anim('ga26-spk')}>
            <line x1="161" y1="58" x2="161" y2="68" stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="150" y1="60" x2="146" y2="68" stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="172" y1="60" x2="176" y2="68" stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* the busbar lowering and seating onto the support plate */}
        <g className={anim('ga26-bar')}>
          <rect x="74" y="116" width="172" height="26" rx="6" fill="var(--accent)" stroke="var(--on-accent)" strokeWidth="2" />
          {/* M12 bolt holes / seats on the busbar ends */}
          <circle cx="91" cy="129" r="6" fill="var(--navy)" opacity="0.55" />
          <circle cx="229" cy="129" r="6" fill="var(--navy)" opacity="0.55" />
          {/* installed M12 bolt heads dropping in */}
          <g className={anim('ga26-blt')}>
            <path d="M91 121 l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7 z" fill="var(--ink2)" />
            <path d="M229 121 l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7 z" fill="var(--ink2)" />
          </g>
        </g>

        {/* grit spec badge */}
        <rect x="44" y="186" width="86" height="26" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="87" y="204" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">700-1000</text>

        {/* bolt spec stamp */}
        <g className={anim('ga26-spec')}>
          <rect x="190" y="186" width="86" height="26" rx="7" fill="var(--accent2)" />
          <text x="233" y="204" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">M12x35</text>
        </g>
      </g>
    </svg>
  )
}
