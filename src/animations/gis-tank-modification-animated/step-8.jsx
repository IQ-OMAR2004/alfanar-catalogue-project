// GIS Tank — Step 8: Remove the upper busbar & bushings.
// An impact wrench with a 17 mm socket spins the hex nut loose; the upper
// busbar then lifts away (removed) while the bushing + lower plate stay below.
// An up-arrow and "17 mm" stamp reinforce the lift-off. Seamless loop, themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Loosening the nut and lifting off the upper busbar and bushing"
    >
      <style>{`
        @keyframes ga8-spin { 0% { transform: rotate(0deg) } 50% { transform: rotate(-180deg) } 100% { transform: rotate(-360deg) } }
        @keyframes ga8-buzz { 0%,100% { transform: translate(0,0) } 25% { transform: translate(-1px,1px) } 50% { transform: translate(1px,-1px) } 75% { transform: translate(-1px,-1px) } }
        @keyframes ga8-lift { 0% { transform: translateY(0); opacity: 1 } 45% { transform: translateY(-46px); opacity: 1 } 70% { transform: translateY(-46px); opacity: 0 } 71% { transform: translateY(0); opacity: 0 } 86% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(0); opacity: 1 } }
        @keyframes ga8-arrow { 0%,30% { opacity: 0; transform: translateY(6px) } 45% { opacity: 1; transform: translateY(-10px) } 64% { opacity: 0; transform: translateY(-22px) } 100% { opacity: 0; transform: translateY(6px) } }
        .ga8-socket { transform-box: fill-box; transform-origin: center; }
        .ga8-socket--anim { animation: ga8-spin 3s linear infinite; }
        .ga8-tool { transform-box: fill-box; transform-origin: center; }
        .ga8-tool--anim { animation: ga8-buzz 0.16s steps(2) infinite; }
        .ga8-bar { transform-box: fill-box; transform-origin: center; }
        .ga8-bar--anim { animation: ga8-lift 3s ease-in-out infinite; }
        .ga8-arrow { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .ga8-arrow--anim { animation: ga8-arrow 3s ease-in-out infinite; }
        .ga8-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga8-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Lower bushing plate (stays) ---- */}
        <rect x="96" y="178" width="128" height="22" rx="5" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        {/* ---- Bushing (cone, stays) ---- */}
        <path d="M132 178 L142 138 H178 L188 178 Z" fill="var(--panel)" stroke="var(--accent2)" strokeWidth="2.5" />
        <rect x="150" y="120" width="20" height="22" rx="3" fill="var(--navy)" />
        <text x="246" y="194" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">bushing</text>

        {/* ---- Up-arrow: the part comes off ---- */}
        <g className={anim('ga8-arrow')} stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M252 96 v-30 M242 76 l10 -10 l10 10" />
        </g>

        {/* ---- Upper busbar being removed (lifts away) ---- */}
        <g className={anim('ga8-bar')}>
          <rect x="60" y="98" width="160" height="26" rx="6" fill="var(--accent)" opacity="0.92" />
          {/* hex nut on the busbar */}
          <circle cx="160" cy="111" r="11" fill="var(--navy)" />
          <path d="M160 101 l8.7 5 v10 l-8.7 5 l-8.7 -5 v-10 z" fill="none" stroke="var(--sky)" strokeWidth="2" />
        </g>

        {/* ---- Impact wrench: socket spins on the nut ---- */}
        <g className={anim('ga8-tool')}>
          {/* socket ring on the nut */}
          <g className={anim('ga8-socket')}>
            <circle cx="160" cy="111" r="17" fill="none" stroke="var(--ink2)" strokeWidth="6" />
            <path d="M160 94 v6 M160 122 v6 M143 111 h6 M171 111 h6" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* wrench body + grip */}
          <rect x="172" y="100" width="64" height="22" rx="7" fill="var(--ink2)" />
          <rect x="208" y="118" width="22" height="40" rx="7" fill="var(--accent2)" />
          <rect x="232" y="106" width="10" height="10" rx="2" fill="var(--slate)" />
        </g>

        {/* ---- Spec stamp ---- */}
        <text x="74" y="64" fontFamily="var(--font-mono)" fontSize="15" fill="var(--accent)">17 mm</text>
      </g>
    </svg>
  )
}
