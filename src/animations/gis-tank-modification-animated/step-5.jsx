// GIS Tank — Step 5: Crane out the breaker. (HAZARD)
// A hook on a chain takes up the load and lifts the bolted breaker block
// (with CB fixture) straight up and out of the open tank, swaying gently so it
// never touches the tank walls. A caution glyph pulses. Seamless loop.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Craning the breaker straight up and out of the tank without touching the walls"
    >
      <style>{`
        @keyframes ga5-lift { 0% { transform: translateY(0) } 50% { transform: translateY(-30px) } 100% { transform: translateY(0) } }
        @keyframes ga5-sway { 0% { transform: rotate(-3deg) } 50% { transform: rotate(3deg) } 100% { transform: rotate(-3deg) } }
        @keyframes ga5-warn { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
        .ga5-rig { transform-box: fill-box; transform-origin: 50% 0%; transform: translateY(0); }
        .ga5-rig--anim { animation: ga5-lift 3.2s ease-in-out infinite; }
        .ga5-load { transform-box: fill-box; transform-origin: 50% 0%; transform: rotate(-3deg); }
        .ga5-load--anim { animation: ga5-sway 3.2s ease-in-out infinite; }
        .ga5-warn--anim { animation: ga5-warn 1.3s ease-in-out infinite; }
        .ga5-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga5-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Overhead crane rail + trolley ---- */}
        <rect x="28" y="24" width="264" height="14" rx="4" fill="var(--slate)" />
        <rect x="146" y="38" width="28" height="12" rx="3" fill="var(--ink2)" />

        {/* ---- Open tank (the breaker must clear it cleanly) ---- */}
        <rect x="96" y="150" width="128" height="68" rx="8" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        <rect x="106" y="150" width="108" height="14" rx="4" fill="var(--bg)" />
        <text x="160" y="208" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">TANK</text>

        {/* ---- Rig: chain + hook + lifted breaker, rises and lowers ---- */}
        <g className={anim('ga5-rig')}>
          {/* chain block / chain */}
          <line x1="160" y1="50" x2="160" y2="92" stroke="var(--ink2)" strokeWidth="3" strokeDasharray="4 4" />
          <rect x="150" y="92" width="20" height="16" rx="3" fill="var(--navy)" />
          {/* lifting belt loop to hook */}
          <path d="M150 108 C 140 122, 140 128, 160 128 C 180 128, 180 122, 170 108" fill="none" stroke="var(--accent2)" strokeWidth="4" strokeLinecap="round" />

          {/* swaying load: breaker block + CB fixture + bolts */}
          <g className={anim('ga5-load')}>
            {/* CB fixture plate */}
            <rect x="124" y="124" width="72" height="14" rx="4" fill="var(--accent)" opacity="0.9" />
            {/* 4x bolt heads on the fixture */}
            <circle cx="134" cy="131" r="3" fill="#fff" />
            <circle cx="151" cy="131" r="3" fill="#fff" />
            <circle cx="169" cy="131" r="3" fill="#fff" />
            <circle cx="186" cy="131" r="3" fill="#fff" />
            {/* breaker body */}
            <rect x="132" y="138" width="56" height="56" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
            <rect x="144" y="150" width="32" height="10" rx="2" fill="var(--sky)" opacity="0.8" />
            <text x="160" y="182" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">CB</text>
          </g>
        </g>

        {/* ---- Caution glyph (hazard step) ---- */}
        <g className={anim('ga5-warn')}>
          <path d="M268 50 l16 28 h-32 z" fill="var(--warn)" stroke="var(--bg)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="266.5" y="60" width="3" height="9" rx="1.5" fill="var(--bg)" />
          <circle cx="268" cy="73" r="1.8" fill="var(--bg)" />
        </g>
      </g>
    </svg>
  )
}
