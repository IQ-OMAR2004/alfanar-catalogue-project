export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Unbolt and lift the CT support plate out of the tank using foam to protect the surface">
      <style>{`
        @keyframes ga16-ratchet { 0% { transform: rotate(-20deg) } 55% { transform: rotate(14deg) } 100% { transform: rotate(-20deg) } }
        @keyframes ga16-spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes ga16-lift { 0% { transform: translate(0,0) } 50% { transform: translate(34px,-44px) } 100% { transform: translate(0,0) } }
        @keyframes ga16-arrow { 0% { opacity: 0; transform: translateY(4px) } 35% { opacity: 1 } 70% { opacity: 1; transform: translateY(-8px) } 100% { opacity: 0; transform: translateY(-8px) } }
        .ga16-rk { transform-box: fill-box; transform-origin: 88% 50%; transform: rotate(-20deg); }
        .ga16-rk--anim { animation: ga16-ratchet 3s ease-in-out infinite; }
        .ga16-bolt { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga16-bolt--anim { animation: ga16-spin 3s linear infinite; }
        .ga16-plate { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga16-plate--anim { animation: ga16-lift 3s ease-in-out infinite; }
        .ga16-arrow { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga16-arrow--anim { animation: ga16-arrow 3s ease-in-out infinite; }
        .ga16-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga16-stage" data-paused={paused ? '' : undefined}>
        {/* tank body with open top, surface to protect */}
        <rect x="30" y="120" width="150" height="96" rx="14" fill="var(--navy)" />
        <rect x="38" y="128" width="134" height="80" rx="10" fill="var(--panel-2)" />
        {/* tank rim / inner surface line */}
        <rect x="38" y="128" width="134" height="14" rx="7" fill="var(--slate)" opacity="0.7" />

        {/* foam sheet cushioning the tank rim */}
        <rect x="40" y="116" width="132" height="12" rx="6" fill="var(--accent2)" opacity="0.85" />
        <rect x="46" y="118" width="120" height="3" rx="1.5" fill="var(--on-accent)" opacity="0.4" />

        {/* CT support plate being lifted out */}
        <g className={anim('ga16-plate')}>
          <rect x="56" y="146" width="98" height="20" rx="5" fill="var(--accent)" opacity="0.95" />
          <circle cx="74" cy="156" r="4" fill="var(--navy)" opacity="0.5" />
          <circle cx="136" cy="156" r="4" fill="var(--navy)" opacity="0.5" />
          {/* bolt head on the plate, spinning loose */}
          <g className={anim('ga16-bolt')}>
            <path d="M105 156 l7 -4 l7 4 v8 l-7 4 l-7 -4 z" fill="var(--ink2)" />
            <circle cx="112" cy="160" r="2.4" fill="var(--panel)" />
          </g>
          {/* up arrow riding with the plate */}
          <g className={anim('ga16-arrow')}>
            <path d="M30 152 l-9 12 h6 v12 h6 v-12 h6 z" fill="var(--ok)" />
          </g>
        </g>

        {/* 17 mm socket + ratchet driving the bolt */}
        <g className={anim('ga16-rk')}>
          <rect x="118" y="150" width="84" height="14" rx="7" fill="var(--ink2)" />
          <circle cx="124" cy="157" r="11" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="3" />
          <path d="M124 150 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--panel-2)" transform="translate(-5 0)" />
          <circle cx="196" cy="157" r="8" fill="none" stroke="var(--ink)" strokeWidth="3" />
        </g>

        {/* spec / tool badges */}
        <rect x="208" y="46" width="86" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="251" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">17 mm</text>
        <rect x="208" y="78" width="86" height="24" rx="7" fill="var(--accent2)" />
        <text x="251" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">FOAM</text>
        <rect x="208" y="110" width="86" height="24" rx="7" fill="var(--ok)" />
        <text x="251" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#fff">OUT</text>
      </g>
    </svg>
  )
}
