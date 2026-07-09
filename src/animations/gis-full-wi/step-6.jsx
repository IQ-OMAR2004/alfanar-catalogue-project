// GIS Full WI — Step 6: "Rig the crane & chain block"
// The overhead crane (yellow girder) carries steel chains → a lifting support →
// belts with safety shackles → the CB fixture, plus a third belt to the blue
// 0.5 t bi-directional chain block that controls the load. Warn triangle.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Overhead crane rigged with steel chains, a lifting support, belts and safety shackles to the CB fixture, plus a 0.5 t chain block controlling the load">
      <style>{`
        @keyframes gfw6-sway { 0%,100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) } }
        @keyframes gfw6-chain { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: 12 } }
        @keyframes gfw6-warn { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }
        .gfw6-sway { transform-box: fill-box; transform-origin: 50% 0%; }
        .gfw6-sway--anim { animation: gfw6-sway 4s ease-in-out infinite; }
        .gfw6-cb--anim { animation: gfw6-chain 1.4s linear infinite; }
        .gfw6-warn--anim { animation: gfw6-warn 2s ease-in-out infinite; }
        .gfw6-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw6-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
        <rect x="0" y="212" width="320" height="4" fill="#F2B826" />
        {/* crane girder */}
        <rect x="10" y="14" width="300" height="15" rx="3" fill="#F2B826" stroke="#B98812" strokeWidth="2" />
        <rect x="120" y="10" width="34" height="10" rx="2" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="1.8" />
        <g className={anim('gfw6-sway')}>
          {/* two steel chains */}
          <line x1="137" y1="29" x2="118" y2="70" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          <line x1="137" y1="29" x2="196" y2="70" stroke="#5A6068" strokeWidth="3" strokeDasharray="5 4" />
          {/* lifting support bar */}
          <rect x="108" y="70" width="98" height="9" rx="3" fill="#6E767E" stroke="#4B5157" strokeWidth="1.6" />
          {/* belts + shackles to fixture */}
          <path d="M 118 79 L 128 118 M 196 79 L 186 118" fill="none" stroke="#F2B826" strokeWidth="6" strokeLinecap="round" />
          <circle cx="118" cy="82" r="4" fill="none" stroke="#AEB4B9" strokeWidth="2.4" />
          <circle cx="196" cy="82" r="4" fill="none" stroke="#AEB4B9" strokeWidth="2.4" />
          {/* CB fixture (load) */}
          <rect x="122" y="118" width="70" height="30" rx="4" fill="#8A9089" stroke="#5A6167" strokeWidth="2" />
          <rect x="130" y="148" width="54" height="34" rx="3" fill="#5A6167" stroke="#2B2F33" strokeWidth="1.8" />
          <text x="157" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#DDE2E6">CB fixture</text>
        </g>
        {/* third belt + blue chain block */}
        <line x1="150" y1="29" x2="255" y2="60" stroke="#F2B826" strokeWidth="4" strokeLinecap="round" />
        <rect x="245" y="60" width="26" height="18" rx="3" fill="#2C6FB4" stroke="#1B4E85" strokeWidth="2" />
        <path className={anim('gfw6-cb')} d="M 258 78 v 40" fill="none" stroke="#C9A227" strokeWidth="3" strokeDasharray="4 4" />
        <circle cx="258" cy="122" r="4" fill="none" stroke="#C9A227" strokeWidth="2.5" />
        <text x="258" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">0.5 t</text>
        {/* hazard */}
        <g className={anim('gfw6-warn')}><polygon points="30,196 46,224 14,224" fill="var(--warn)" /><text x="30" y="219" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#fff">!</text></g>
      </g>
    </svg>
  )
}
