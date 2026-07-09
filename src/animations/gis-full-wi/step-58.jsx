// GIS Full WI — Steps 58/59: "Bag the tank for leak testing"
// Two workers on locked-wheel ladders draw a clear cumulative plastic bag down
// over the whole grey tank, then seal it to the floor with packing tape.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="A clear plastic bag drawn down over the grey GIS tank from two locked ladders and sealed to the floor with packing tape">
      <style>{`
        @keyframes gfw58-bag { 0% { transform: translateY(-46px) scaleY(0.4); opacity: 0.5 } 60%,100% { transform: translateY(0) scaleY(1); opacity: 1 } }
        @keyframes gfw58-tape { 0%,62% { opacity: 0 } 80%,100% { opacity: 1 } }
        .gfw58-bag { transform-box: fill-box; transform-origin: 50% 0%; }
        .gfw58-bag--anim { animation: gfw58-bag 5s ease-in-out infinite; }
        .gfw58-tape--anim { animation: gfw58-tape 5s ease-in-out infinite; }
        .gfw58-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw58-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="200" width="320" height="40" fill="#B9BDB6" />
        <rect x="0" y="200" width="320" height="4" fill="#F2B826" />
        {/* grey tank */}
        <rect x="120" y="70" width="80" height="130" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="128" y="78" width="64" height="26" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.2" />
        <circle cx="145" cy="170" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.2" />
        <circle cx="175" cy="170" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.2" />
        {/* ladders both sides */}
        {[[70, 90], [232, 246]].map(([x1, x2], k) => (
          <g key={k}>
            <line x1={x1} y1="120" x2={x1} y2="200" stroke="#6E767E" strokeWidth="3" />
            <line x1={x2} y1="120" x2={x2} y2="200" stroke="#6E767E" strokeWidth="3" />
            <line x1={x1} y1="140" x2={x2} y2="140" stroke="#8A9089" strokeWidth="2.4" />
            <line x1={x1} y1="160" x2={x2} y2="160" stroke="#8A9089" strokeWidth="2.4" />
            <line x1={x1} y1="180" x2={x2} y2="180" stroke="#8A9089" strokeWidth="2.4" />
            <circle cx={x1} cy="200" r="4" fill="#2B2F33" />
            <circle cx={x2} cy="200" r="4" fill="#2B2F33" />
          </g>
        ))}
        {/* clear plastic bag over the tank */}
        <g className={anim('gfw58-bag')}>
          <rect x="110" y="58" width="100" height="146" rx="8" fill="#BFE3F2" fillOpacity="0.28" stroke="#8FBFD6" strokeWidth="2" />
          <path d="M 118 66 l 8 12 M 190 70 l 6 10" stroke="#DDEEF6" strokeWidth="2" opacity="0.7" />
        </g>
        {/* packing tape seal to floor */}
        <g className={anim('gfw58-tape')}>
          <rect x="106" y="198" width="108" height="8" rx="2" fill="#C9A227" stroke="#9C7C15" strokeWidth="1.2" />
        </g>
        <text x="160" y="228" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">leak-test bag</text>
        <g><polygon points="292,44 308,72 276,72" fill="var(--warn)" /><text x="292" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#fff">!</text></g>
      </g>
    </svg>
  )
}
