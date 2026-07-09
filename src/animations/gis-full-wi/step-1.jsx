// GIS Full WI — Step 1: "Bring the S1 tank to the GIS area"
// A 5 t forklift carries the tall grey GIS tank (on a pallet) from the right
// into the GIS area (yellow floor line), then sets it down. Warn triangle.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="A 5 tonne forklift carrying the grey GIS tank on a pallet into the GIS area and setting it down">
      <style>{`
        @keyframes gfw1-roll { 0% { transform: translateX(70px) } 60% { transform: translateX(0) } 100% { transform: translateX(0) } }
        @keyframes gfw1-wheel { 0% { transform: rotate(0deg) } 60% { transform: rotate(-500deg) } 100% { transform: rotate(-500deg) } }
        @keyframes gfw1-set { 0%,60% { transform: translateY(0) } 78% { transform: translateY(6px) } 100% { transform: translateY(6px) } }
        .gfw1-rig--anim { animation: gfw1-roll 5s ease-in-out infinite; }
        .gfw1-wheel { transform-box: fill-box; transform-origin: 50% 50%; }
        .gfw1-wheel--anim { animation: gfw1-wheel 5s ease-in-out infinite; }
        .gfw1-fork--anim { animation: gfw1-set 5s ease-in-out infinite; }
        .gfw1-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw1-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="206" width="320" height="34" fill="#B9BDB6" />
        <rect x="0" y="206" width="320" height="4" fill="#F2B826" />
        <text x="52" y="230" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">GIS area</text>
        <g className={anim('gfw1-rig')}>
          {/* forklift body (yellow) */}
          <rect x="150" y="118" width="70" height="60" rx="5" fill="#F2B826" stroke="#C8991F" strokeWidth="2.5" />
          <rect x="200" y="96" width="16" height="82" fill="#C8991F" />
          <rect x="158" y="126" width="26" height="24" rx="3" fill="#1E2226" />{/* cab window */}
          <rect x="150" y="70" width="6" height="120" fill="#8A9089" />{/* mast */}
          {/* fork + pallet + tank */}
          <g className={anim('gfw1-fork')}>
            <rect x="96" y="176" width="60" height="6" fill="#6E767E" />{/* fork */}
            <rect x="98" y="164" width="56" height="12" fill="#C9A96A" stroke="#9C7C43" strokeWidth="1.5" />{/* pallet */}
            {/* grey tank */}
            <rect x="100" y="86" width="52" height="78" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
            <rect x="106" y="92" width="40" height="20" rx="2" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.2" />
            <circle cx="118" cy="140" r="8" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.2" />
            <circle cx="136" cy="140" r="8" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.2" />
            <text x="126" y="103" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#3C4B5B">S1</text>
          </g>
          <g className={anim('gfw1-wheel')}><circle cx="166" cy="182" r="11" fill="#2B2F33" /><circle cx="166" cy="182" r="4" fill="#7C837B" /></g>
          <g className={anim('gfw1-wheel')}><circle cx="206" cy="182" r="11" fill="#2B2F33" /><circle cx="206" cy="182" r="4" fill="#7C837B" /></g>
        </g>
        {/* forklift/keep-clear hazard */}
        <g><polygon points="34,44 50,72 18,72" fill="var(--warn)" /><text x="34" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#fff">!</text></g>
        <g><rect x="228" y="28" width="70" height="22" rx="6" fill="var(--accent)" /><text x="263" y="43" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill="var(--on-accent)">5 t</text></g>
      </g>
    </svg>
  )
}
