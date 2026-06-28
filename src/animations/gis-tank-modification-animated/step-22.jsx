export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Grease and fit the cable bushing, then torque the M8 bolts to 13.5 Newton metres">
      <style>{`
        @keyframes ga22-seat { 0% { transform: translateY(-26px) } 45% { transform: translateY(0) } 100% { transform: translateY(0) } }
        @keyframes ga22-sheen { 0% { opacity: 0 } 50% { opacity: 0.85 } 100% { opacity: 0 } }
        @keyframes ga22-turn { 0% { transform: rotate(-24deg) } 55% { transform: rotate(16deg) } 100% { transform: rotate(-24deg) } }
        @keyframes ga22-arc { 0% { stroke-dashoffset: 150 } 55% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga22-drop { 0% { transform: translateY(-6px); opacity: 0 } 25% { opacity: 1 } 70% { transform: translateY(14px); opacity: 1 } 100% { transform: translateY(14px); opacity: 0 } }
        @keyframes ga22-click { 0%,50% { opacity: 0; transform: scale(0.5) } 60% { opacity: 1; transform: scale(1) } 75% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0 } }
        .ga22-bush { transform-box: fill-box; transform-origin: 50% 50%; transform: translateY(0); }
        .ga22-bush--anim { animation: ga22-seat 3s ease-in-out infinite; }
        .ga22-sheen { opacity: 0; }
        .ga22-sheen--anim { animation: ga22-sheen 3s ease-in-out infinite; }
        .ga22-wr { transform-box: fill-box; transform-origin: 84% 50%; transform: rotate(-24deg); }
        .ga22-wr--anim { animation: ga22-turn 3s ease-in-out infinite; }
        .ga22-arc--anim { animation: ga22-arc 3s ease-in-out infinite; }
        .ga22-drop { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga22-drop--anim { animation: ga22-drop 3s ease-in-out infinite; }
        .ga22-click { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .ga22-click--anim { animation: ga22-click 3s ease-in-out infinite; }
        .ga22-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga22-stage" data-paused={paused ? '' : undefined}>
        {/* mounting plate the bushing seats onto */}
        <rect x="34" y="132" width="150" height="74" rx="10" fill="var(--navy)" />
        <rect x="42" y="140" width="134" height="58" rx="7" fill="var(--panel-2)" />
        {/* circular bushing bore / contact area with grease sheen */}
        <circle cx="109" cy="169" r="30" fill="var(--slate)" opacity="0.55" />
        <circle cx="109" cy="169" r="30" fill="var(--accent2)" className={anim('ga22-sheen')} />

        {/* guide pins flanking the bore */}
        <rect x="62" y="150" width="5" height="38" rx="2.5" fill="var(--ink2)" />
        <rect x="151" y="150" width="5" height="38" rx="2.5" fill="var(--ink2)" />

        {/* the bushing lowering and seating into the bore */}
        <g className={anim('ga22-bush')}>
          <ellipse cx="109" cy="169" rx="27" ry="11" fill="var(--accent)" />
          <rect x="82" y="138" width="54" height="32" rx="8" fill="var(--accent)" />
          <ellipse cx="109" cy="138" rx="27" ry="10" fill="var(--accent)" stroke="var(--on-accent)" strokeWidth="2" />
          <ellipse cx="109" cy="138" rx="13" ry="5" fill="var(--navy)" opacity="0.6" />
          {/* M8 bolt heads around the flange */}
          <circle cx="86" cy="158" r="4.5" fill="var(--ink2)" />
          <circle cx="132" cy="158" r="4.5" fill="var(--ink2)" />
        </g>

        {/* torque arc filling toward target */}
        <circle cx="132" cy="158" r="24" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 132 158)" className={anim('ga22-arc')} />

        {/* impact / torque wrench driving the M8 bolt */}
        <g className={anim('ga22-wr')}>
          <rect x="132" y="151" width="76" height="14" rx="7" fill="var(--ink2)" />
          <circle cx="138" cy="158" r="11" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="3" />
          <path d="M138 151 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--panel)" transform="translate(-5 0)" />
        </g>

        {/* click spark at the wrench */}
        <g className={anim('ga22-click')}>
          <path d="M132 130 l3 9 l9 -2 l-7 7 l5 8 l-9 -4 l-5 8 l-1 -10 l-9 1 l8 -5 z" fill="var(--warn)" />
        </g>

        {/* Loctite bottle + drop near the bolt thread */}
        <rect x="232" y="150" width="22" height="34" rx="5" fill="var(--accent2)" />
        <rect x="238" y="143" width="10" height="9" rx="2" fill="var(--ink2)" />
        <g className={anim('ga22-drop')}>
          <path d="M243 188 q-4 6 0 9 q4 -3 0 -9 z" fill="var(--accent2)" />
        </g>

        {/* spec badges */}
        <rect x="200" y="46" width="100" height="26" rx="7" fill="var(--ok)" />
        <text x="250" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#fff">13.5 Nm</text>
        <rect x="200" y="80" width="100" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="250" y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)">M8x20</text>
        <rect x="200" y="112" width="100" height="24" rx="7" fill="var(--accent2)" />
        <text x="250" y="128" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">LOCTITE 401</text>
      </g>
    </svg>
  )
}
