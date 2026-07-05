// GIS Tank Modification — Step 18: "Fix the top sheet"
// Loop: the flat grey top sheet lowers onto the panel roof, dashed guides show
// the holes aligning; ALL four fixings drop in first (place before tighten),
// then a highlight moves fixing-to-fixing as each one tightens in sequence.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  // fixing positions on the roof (after the sheet has landed)
  const FIX = [
    [96, 88],
    [224, 88],
    [224, 118],
    [96, 118],
  ]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Top sheet lowering onto the panel roof, holes aligning on dashed guides, all fixings placed first then tightened in sequence"
    >
      <style>{`
        .g18-stage[data-paused] * { animation-play-state: paused !important; }

        /* sheet lowers onto the roof */
        .g18-sheet--anim { animation: g18-sheet 5s ease-in-out infinite; }
        @keyframes g18-sheet {
          0%       { transform: translateY(-46px); }
          24%,100% { transform: translateY(0); }
        }

        /* dashed hole-alignment guides flash during the descent */
        .g18-guide--anim { animation: g18-guide 5s ease-in-out infinite; }
        @keyframes g18-guide {
          0%      { opacity: 0.2; }
          8%      { opacity: 0.9; }
          16%     { opacity: 0.3; }
          24%     { opacity: 0.9; }
          32%,100%{ opacity: 0; }
        }

        /* PHASE 1 — all four bolts drop in together (placed, not tight) */
        .g18-place--anim { animation: g18-place 5s ease-in-out infinite; }
        @keyframes g18-place {
          0%,26%   { transform: translateY(-16px); opacity: 0; }
          36%,100% { transform: translateY(0); opacity: 1; }
        }

        /* PHASE 2 — sequence highlight visits each bolt in turn */
        .g18-seq1--anim { animation: g18-seq1 5s ease-in-out infinite; }
        .g18-seq2--anim { animation: g18-seq2 5s ease-in-out infinite; }
        .g18-seq3--anim { animation: g18-seq3 5s ease-in-out infinite; }
        .g18-seq4--anim { animation: g18-seq4 5s ease-in-out infinite; }
        @keyframes g18-seq1 { 0%,40% {opacity:0} 44%,52% {opacity:1} 56%,100% {opacity:0} }
        @keyframes g18-seq2 { 0%,52% {opacity:0} 56%,64% {opacity:1} 68%,100% {opacity:0} }
        @keyframes g18-seq3 { 0%,64% {opacity:0} 68%,76% {opacity:1} 80%,100% {opacity:0} }
        @keyframes g18-seq4 { 0%,76% {opacity:0} 80%,88% {opacity:1} 92%,100% {opacity:0} }

        /* each bolt turns as its highlight arrives */
        .g18-turn1--anim { animation: g18-turn1 5s ease-in-out infinite; }
        .g18-turn2--anim { animation: g18-turn2 5s ease-in-out infinite; }
        .g18-turn3--anim { animation: g18-turn3 5s ease-in-out infinite; }
        .g18-turn4--anim { animation: g18-turn4 5s ease-in-out infinite; }
        @keyframes g18-turn1 { 0%,42% {transform:rotate(0)} 54%,100% {transform:rotate(180deg)} }
        @keyframes g18-turn2 { 0%,54% {transform:rotate(0)} 66%,100% {transform:rotate(180deg)} }
        @keyframes g18-turn3 { 0%,66% {transform:rotate(0)} 78%,100% {transform:rotate(180deg)} }
        @keyframes g18-turn4 { 0%,78% {transform:rotate(0)} 90%,100% {transform:rotate(180deg)} }

        /* done tick */
        .g18-check--anim { animation: g18-check 5s ease-in-out infinite; }
        @keyframes g18-check {
          0%,90%  { opacity: 0; transform: scale(0.5); }
          94%     { opacity: 1; transform: scale(1.05); }
          98%,100%{ opacity: 1; transform: scale(1); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== panel upper body (front view, roof exposed) ===== */}
      <rect x="70" y="104" width="180" height="110" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* upper LV box on the front face */}
      <rect x="84" y="118" width="96" height="42" fill="#D7DAD4" stroke="#8A9089" strokeWidth="2" />
      <circle cx="102" cy="132" r="4" fill="#1E2226" />
      <circle cx="118" cy="132" r="4" fill="#1E2226" />
      <circle cx="158" cy="132" r="3.4" fill="#C0392B" />
      <circle cx="170" cy="132" r="3.4" fill="#C0392B" />
      <rect x="92" y="146" width="52" height="8" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
      <rect x="92" y="146" width="52" height="2.5" fill="#0A82C6" />
      {/* stud row along the mid section */}
      <g fill="#9BA19A">
        <circle cx="84" cy="176" r="2" /><circle cx="108" cy="176" r="2" /><circle cx="132" cy="176" r="2" />
        <circle cx="156" cy="176" r="2" /><circle cx="180" cy="176" r="2" /><circle cx="204" cy="176" r="2" /><circle cx="228" cy="176" r="2" />
      </g>
      {/* two CT plates hinted at the very bottom */}
      <circle cx="130" cy="208" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
      <circle cx="190" cy="208" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />

      {/* roof flange (where the top sheet lands) with fixing holes */}
      <rect x="76" y="96" width="168" height="8" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
      <g fill="#6E767E">
        <circle cx="96" cy="100" r="2.4" /><circle cx="224" cy="100" r="2.4" />
      </g>

      <g className="g18-stage" data-paused={paused ? '' : undefined}>
        {/* dashed hole guides */}
        <g
          className={a('g18-guide', 'g18-guide--anim')}
          stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" fill="none"
          style={reduced ? { opacity: 0 } : undefined}
        >
          <line x1="96" y1="34" x2="96" y2="98" />
          <line x1="224" y1="34" x2="224" y2="98" />
        </g>

        {/* ===== top sheet (flat grey, slightly 3D) lowering ===== */}
        <g className={a('g18-sheet', 'g18-sheet--anim')}>
          {/* sheet in shallow perspective */}
          <path d="M 76 96 L 100 76 H 244 L 244 96 Z" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 76 96 H 244 V 104 H 76 Z" fill="#C2C6BF" stroke="#8A9089" strokeWidth="2" />
          {/* pre-punched holes matching the flange */}
          <circle cx="96" cy="88" r="2.6" fill="#8A9089" />
          <circle cx="224" cy="88" r="2.6" fill="#8A9089" />
          <circle cx="96" cy="118" r="0" fill="none" />
        </g>

        {/* ===== four fixings: place all first ===== */}
        <g className={a('g18-place', 'g18-place--anim')} style={reduced ? { opacity: 1 } : undefined}>
          {FIX.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y - 22})`}>
              <g className={reduced ? undefined : `g18-turn${i + 1}--anim`}>
                <path d="M -4.6 0 L -2.3 -4 h 4.6 L 4.6 0 L 2.3 4 h -4.6 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
                <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke="#6E767E" strokeWidth="1.3" />
              </g>
            </g>
          ))}
        </g>

        {/* sequence highlight rings (tighten in order 1→2→3→4) */}
        {!reduced && FIX.map(([x, y], i) => (
          <circle key={i} className={`g18-seq${i + 1}--anim`} cx={x} cy={y - 22} r="9"
            fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0" />
        ))}

        {/* done tick */}
        <g className={a('g18-check', 'g18-check--anim')} style={reduced ? { opacity: 0 } : { transformOrigin: '272px 66px' }}>
          <circle cx="272" cy="66" r="11" fill="var(--ok, #2e9e5b)" />
          <path d="M 267 66 l 3.5 4 l 7 -8" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* mono badges: rule of the step — place all, then tighten */}
      <rect x="18" y="24" width="130" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
      <text x="83" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">PLACE ×4 FIRST</text>
      <rect x="156" y="24" width="106" height="22" rx="5" fill="var(--accent)" />
      <text x="209" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">THEN 1→4</text>
    </svg>
  )
}
