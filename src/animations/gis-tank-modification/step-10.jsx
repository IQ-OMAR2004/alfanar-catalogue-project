// GIS Tank — Step 10: Torque the busbar connections.
// Two busbars meet at a bolted joint; a torque wrench rotates to tighten, a
// torque arc fills to the target, a "click" spark fires and a 47.5 Nm check
// stamps. Seamless loop, brand-themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Torquing the busbar connection bolt to specification"
    >
      <style>{`
        @keyframes gist10-turn { 0% { transform: rotate(-22deg) } 55% { transform: rotate(14deg) } 70% { transform: rotate(10deg) } 100% { transform: rotate(-22deg) } }
        @keyframes gist10-arc { 0% { stroke-dashoffset: 170 } 55% { stroke-dashoffset: 48 } 70% { stroke-dashoffset: 48 } 100% { stroke-dashoffset: 170 } }
        @keyframes gist10-spark { 0%,54% { opacity: 0; transform: scale(.4) } 60% { opacity: 1; transform: scale(1) } 74% { opacity: 0; transform: scale(1.3) } 100% { opacity: 0 } }
        @keyframes gist10-check { 0%,60% { opacity: 0; transform: scale(.4) } 70% { opacity: 1; transform: scale(1) } 92% { opacity: 1 } 100% { opacity: 0 } }
        .gist10-wrench { transform-box: fill-box; transform-origin: 50% 86%; transform: rotate(-22deg); }
        .gist10-wrench--anim { animation: gist10-turn 2.8s ease-in-out infinite; }
        .gist10-arc--anim { animation: gist10-arc 2.8s ease-in-out infinite; }
        .gist10-spark { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .gist10-spark--anim { animation: gist10-spark 2.8s ease-in-out infinite; }
        .gist10-check { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .gist10-check--anim { animation: gist10-check 2.8s ease-in-out infinite; }
        .gist10-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="gist10-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Busbars meeting at the joint ---- */}
        <rect x="28" y="104" width="118" height="30" rx="5" fill="var(--accent)" opacity="0.9" />
        <rect x="174" y="104" width="118" height="30" rx="5" fill="var(--accent2)" opacity="0.9" />
        {/* overlap / joint plate */}
        <rect x="128" y="96" width="64" height="46" rx="6" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        <text x="160" y="172" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--accent)">85 ± 3 mm</text>
        <path d="M132 158 h56" stroke="var(--slate)" strokeWidth="1.5" />
        <path d="M132 154 v8 M188 154 v8" stroke="var(--slate)" strokeWidth="1.5" />

        {/* bolt head at the joint */}
        <circle cx="160" cy="119" r="11" fill="var(--navy)" />
        <path d="M160 108 l9.5 5.5 v11 l-9.5 5.5 l-9.5 -5.5 v-11 z" fill="none" stroke="var(--sky)" strokeWidth="2" />

        {/* torque arc around the bolt */}
        <circle
          cx="160" cy="119" r="27"
          fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="170" strokeDashoffset="170"
          transform="rotate(-90 160 119)"
          className={anim('gist10-arc')}
        />

        {/* click spark */}
        <g className={anim('gist10-spark')} stroke="var(--sky)" strokeWidth="2.4" strokeLinecap="round">
          <path d="M160 84 v-9 M183 92 l7 -6 M137 92 l-7 -6" />
        </g>

        {/* torque wrench */}
        <g className={anim('gist10-wrench')}>
          <rect x="153" y="119" width="14" height="92" rx="6" fill="var(--ink2)" />
          <rect x="150" y="196" width="20" height="22" rx="5" fill="var(--accent2)" />
          <circle cx="160" cy="119" r="15" fill="none" stroke="var(--ink2)" strokeWidth="7" />
        </g>

        {/* torque value + check */}
        <g className={anim('gist10-check')}>
          <circle cx="248" cy="58" r="17" fill="var(--ok)" />
          <path d="M240 58 l6 6 11 -12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="160" y="58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--ok)">47.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
