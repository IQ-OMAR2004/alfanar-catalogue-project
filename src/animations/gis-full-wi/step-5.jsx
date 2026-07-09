// GIS Full WI — Step 5: "Assemble the CB fixture"
// The CB lifting fixture (steel frame with a vertical rod) receives 3 stacked
// weight plates onto its rod; the holes align to the eye bolts; a bolt caps the
// end. Loop ~4.5s.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Three weight plates stacked onto the CB fixture rod, holes aligned to the eye bolts, then a bolt fitted at the end">
      <style>{`
        @keyframes gfw5-p1 { 0% { transform: translateY(-70px); opacity: 0 } 25%,100% { transform: translateY(0); opacity: 1 } }
        @keyframes gfw5-p2 { 0%,25% { transform: translateY(-70px); opacity: 0 } 50%,100% { transform: translateY(0); opacity: 1 } }
        @keyframes gfw5-p3 { 0%,50% { transform: translateY(-70px); opacity: 0 } 75%,100% { transform: translateY(0); opacity: 1 } }
        @keyframes gfw5-bolt { 0%,78% { opacity: 0; transform: rotate(0) } 90%,100% { opacity: 1; transform: rotate(360deg) } }
        .gfw5-p1--anim { animation: gfw5-p1 4.5s ease-in-out infinite; }
        .gfw5-p2--anim { animation: gfw5-p2 4.5s ease-in-out infinite; }
        .gfw5-p3--anim { animation: gfw5-p3 4.5s ease-in-out infinite; }
        .gfw5-bolt { transform-box: fill-box; transform-origin: 50% 50%; }
        .gfw5-bolt--anim { animation: gfw5-bolt 4.5s ease-in-out infinite; }
        .gfw5-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw5-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
        <rect x="0" y="212" width="320" height="4" fill="#F2B826" />
        {/* fixture frame (steel) */}
        <path d="M 96 200 h 128 M 120 200 v -70 M 200 200 v -70 M 120 130 h 80" fill="none" stroke="#6E767E" strokeWidth="6" strokeLinecap="round" />
        <rect x="150" y="70" width="10" height="70" fill="#8A9089" stroke="#5A6167" strokeWidth="1.5" />{/* central rod */}
        <rect x="146" y="66" width="18" height="8" rx="2" fill="#C9A227" />{/* eye bolt top */}
        {/* stacked weight plates */}
        <g className={anim('gfw5-p3')}><rect x="118" y="150" width="74" height="16" rx="3" fill="#4B5157" stroke="#2B2F33" strokeWidth="2" /><rect x="150" y="150" width="10" height="16" fill="#2B2F33" /></g>
        <g className={anim('gfw5-p2')}><rect x="118" y="166" width="74" height="16" rx="3" fill="#5A6167" stroke="#2B2F33" strokeWidth="2" /><rect x="150" y="166" width="10" height="16" fill="#2B2F33" /></g>
        <g className={anim('gfw5-p1')}><rect x="118" y="182" width="74" height="16" rx="3" fill="#6E767E" stroke="#2B2F33" strokeWidth="2" /><rect x="150" y="182" width="10" height="16" fill="#2B2F33" /></g>
        {/* end bolt cap */}
        <g className={anim('gfw5-bolt')} style={{ transformOrigin: '155px 150px' }}>
          <polygon points="155,142 161,146 161,153 155,157 149,153 149,146" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
        </g>
        <g><rect x="228" y="30" width="72" height="22" rx="6" fill="var(--accent)" /><text x="264" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--on-accent)">×3 plates</text></g>
        <text x="60" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">CB fixture</text>
      </g>
    </svg>
  )
}
