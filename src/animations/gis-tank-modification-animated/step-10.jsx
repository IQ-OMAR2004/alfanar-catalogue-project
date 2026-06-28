export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Remove the four nuts, lift the tank off the frame, and unscrew the gas pipe">
      <style>{`
        @keyframes ga10-lift { 0% { transform: translateY(0) } 50% { transform: translateY(-26px) } 100% { transform: translateY(0) } }
        @keyframes ga10-spin { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes ga10-turn { 0% { transform: rotate(-18deg) } 55% { transform: rotate(16deg) } 100% { transform: rotate(-18deg) } }
        @keyframes ga10-pop { 0% { opacity: 0; transform: translateY(0) } 30% { opacity: 1 } 60% { opacity: 1; transform: translateY(-10px) } 100% { opacity: 0; transform: translateY(-10px) } }
        .ga10-tank { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga10-tank--anim { animation: ga10-lift 3.2s ease-in-out infinite; }
        .ga10-nut { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga10-nut--anim { animation: ga10-spin 3.2s linear infinite; }
        .ga10-wrench { transform-box: fill-box; transform-origin: 86% 50%; transform: rotate(-18deg); }
        .ga10-wrench--anim { animation: ga10-turn 3.2s ease-in-out infinite; }
        .ga10-pop { opacity: 0; }
        .ga10-pop--anim { animation: ga10-pop 3.2s ease-in-out infinite; }
        .ga10-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga10-stage" data-paused={paused ? '' : undefined}>
        {/* support frame on the floor */}
        <rect x="42" y="186" width="156" height="12" rx="4" fill="var(--slate)" />
        <rect x="54" y="158" width="14" height="32" rx="3" fill="var(--slate)" />
        <rect x="172" y="158" width="14" height="32" rx="3" fill="var(--slate)" />
        <rect x="44" y="150" width="152" height="12" rx="4" fill="var(--navy)" />

        {/* the tank lifting off the frame */}
        <g className={anim('ga10-tank')}>
          <rect x="58" y="92" width="124" height="58" rx="14" fill="var(--accent)" opacity="0.92" />
          <circle cx="120" cy="121" r="16" fill="none" stroke="var(--on-accent)" strokeWidth="3" opacity="0.55" />
          {/* gas pipe stub on the tank's right shoulder */}
          <rect x="178" y="104" width="26" height="13" rx="4" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />
          {/* four nuts spinning off */}
          <g className={anim('ga10-nut')}>
            <path d="M64 152 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--ink2)" />
          </g>
          <g className={anim('ga10-nut')}>
            <path d="M104 152 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--ink2)" />
          </g>
          <g className={anim('ga10-nut')}>
            <path d="M132 152 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--ink2)" />
          </g>
          <g className={anim('ga10-nut')}>
            <path d="M170 152 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--ink2)" />
          </g>
        </g>

        {/* lift arrows showing the tank coming off */}
        <g className={anim('ga10-pop')}>
          <path d="M120 86 l-9 12 h6 v12 h6 v-12 h6 z" fill="var(--ok)" />
        </g>

        {/* 32 mm spanner unscrewing the gas pipe hex */}
        <path d="M222 110 l5 -3 l5 3 v6 l-5 3 l-5 -3 z" fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2"
          transform="translate(-4 0) scale(1.6) translate(-83 -42)" />
        <g className={anim('ga10-wrench')}>
          <rect x="226" y="104" width="64" height="14" rx="6" fill="var(--ink2)" />
          <path d="M226 104 a9 9 0 0 0 0 14 l8 0 a7 7 0 0 1 0 -14 z" fill="var(--ink2)" />
          <rect x="232" y="108" width="6" height="6" rx="1" fill="var(--bg)" />
        </g>

        {/* spec / count badges */}
        <rect x="200" y="178" width="56" height="22" rx="6" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="228" y="193" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">32 mm</text>
        <rect x="262" y="178" width="40" height="22" rx="6" fill="var(--accent2)" />
        <text x="282" y="193" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">4x</text>
      </g>
    </svg>
  )
}
