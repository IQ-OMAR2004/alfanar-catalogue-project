// GIS Tank — Step 2: Assemble the pipe & pressure gauge.
// A torque wrench tightens the cap nut on the tank fitting that holds the pipe
// and the round pressure gauge. The wrench rocks tighter, a progress arc fills
// to target, a "click" spark flashes at the end, and the Nm value + spanner
// size (24 mm) are stamped. Seamless loop, brand-themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Torquing the cap nut to fit the pipe and pressure gauge to the tank"
    >
      <style>{`
        @keyframes ga2-turn { 0% { transform: rotate(-20deg) } 60% { transform: rotate(12deg) } 100% { transform: rotate(-20deg) } }
        @keyframes ga2-arc { 0% { stroke-dashoffset: 150 } 60% { stroke-dashoffset: 34 } 100% { stroke-dashoffset: 150 } }
        @keyframes ga2-needle { 0% { transform: rotate(-32deg) } 60% { transform: rotate(30deg) } 100% { transform: rotate(-32deg) } }
        @keyframes ga2-click { 0%,58% { opacity: 0; transform: scale(.4) } 64% { opacity: 1; transform: scale(1) } 76% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0; transform: scale(1.3) } }
        @keyframes ga2-stamp { 0%,55% { opacity: .35 } 66% { opacity: 1 } 90% { opacity: 1 } 100% { opacity: .35 } }
        .ga2-wrench { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-20deg); }
        .ga2-wrench--anim { animation: ga2-turn 3s ease-in-out infinite; }
        .ga2-arc--anim { animation: ga2-arc 3s ease-in-out infinite; }
        .ga2-needle { transform-box: fill-box; transform-origin: center bottom; transform: rotate(-32deg); }
        .ga2-needle--anim { animation: ga2-needle 3s ease-in-out infinite; }
        .ga2-click { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .ga2-click--anim { animation: ga2-click 3s ease-in-out infinite; }
        .ga2-stamp--anim { animation: ga2-stamp 3s ease-in-out infinite; }
        .ga2-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga2-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Tank wall + fitting boss ---- */}
        <rect x="22" y="60" width="44" height="132" rx="8" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        <rect x="62" y="110" width="26" height="34" rx="4" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />

        {/* ---- Pipe running to the gauge ---- */}
        <rect x="86" y="118" width="78" height="18" rx="5" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />

        {/* ---- Hex cap nut on the fitting (the thing being torqued) ---- */}
        <path d="M150 112 L168 122 L168 140 L150 150 L132 140 L132 122 Z" fill="var(--accent)" stroke="var(--navy)" strokeWidth="2" />

        {/* progress arc filling to target torque */}
        <circle cx="150" cy="131" r="24" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="150" strokeDashoffset="150" transform="rotate(-90 150 131)" className={anim('ga2-arc')} />

        {/* "click" spark at target */}
        <g className={anim('ga2-click')}>
          <path d="M150 96 l4 9 9 -2 -6 8 6 8 -9 -2 -4 9 -4 -9 -9 2 6 -8 -6 -8 9 2 Z" fill="var(--warn)" />
        </g>

        {/* ---- Torque wrench: head over the nut, long handle up ---- */}
        <g className={anim('ga2-wrench')}>
          <circle cx="150" cy="131" r="13" fill="none" stroke="var(--ink2)" strokeWidth="6" />
          <rect x="143" y="40" width="14" height="92" rx="6" fill="var(--ink2)" />
          <rect x="141" y="40" width="18" height="14" rx="4" fill="var(--slate)" />
        </g>

        {/* ---- Pressure gauge being fitted ---- */}
        <g>
          <circle cx="246" cy="127" r="30" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
          <circle cx="246" cy="127" r="24" fill="none" stroke="var(--ink2)" strokeWidth="1.5" strokeDasharray="2 5" opacity="0.6" />
          <rect x="244.5" y="106" width="3" height="23" rx="1.5" fill="var(--warn)" className={anim('ga2-needle')} />
          <circle cx="246" cy="127" r="3.4" fill="var(--ink)" />
          <rect x="240" y="155" width="12" height="14" rx="3" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />
        </g>

        {/* ---- Stamps: torque value + spanner size ---- */}
        <g className={anim('ga2-stamp')}>
          <rect x="118" y="178" width="64" height="26" rx="6" fill="var(--accent)" />
          <text x="150" y="196" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--on-accent)">47 Nm</text>
        </g>
        <rect x="190" y="178" width="58" height="26" rx="6" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="219" y="196" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink)">24 mm</text>
      </g>
    </svg>
  )
}
