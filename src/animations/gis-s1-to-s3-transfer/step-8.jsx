// Case 1 — Step 8: "Dismantle: remove cable bushing #2"
// The second brown epoxy cone bushing is drawn OUT of the grey S1 tank and set
// upright on white foam beside bushing #1. Two cones now stand on the foam,
// labelled #1 and #2. Mono badge "#2". Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  // reusable brown epoxy cone bushing (wide hex flange top tapering to socket)
  const Bushing = ({ label }) => (
    <g>
      {/* tapering epoxy body */}
      <path d="M -13 -20 L 13 -20 L 8 20 L -8 20 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M -13 -20 L -4 -20 L -3 20 L -8 20 Z" fill="#9B5240" opacity="0.7" />
      {/* hex flange ring at top with brass bolt dots */}
      <rect x="-16" y="-24" width="32" height="8" rx="2" fill="#8A4433" stroke="#5A2A1F" strokeWidth="1.4" />
      {[-12, -4, 4, 12].map((bx) => (
        <circle key={bx} cx={bx} cy="-20" r="1.6" fill="#C9A227" />
      ))}
      {/* hollow dark socket in centre */}
      <ellipse cx="0" cy="-20" rx="6" ry="2.6" fill="#241512" />
      <ellipse cx="0" cy="20" rx="8" ry="3" fill="#3A1E17" />
      <text x="0" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)">{label}</text>
    </g>
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Second brown epoxy cone bushing drawn out of the grey tank and set on white foam beside bushing number one"
    >
      <style>{`
        .c1s8-stage[data-paused] * { animation-play-state: paused !important; }
        /* bushing #2 travels from the tank flange out and onto the foam */
        .c1s8-move--anim { animation: c1s8-move 4.5s ease-in-out infinite; }
        @keyframes c1s8-move {
          0%       { transform: translate(0px, 0px); }
          25%      { transform: translate(0px, -46px); }
          60%,100% { transform: translate(150px, 26px); }
        }
        /* extraction arrow pulse */
        .c1s8-arr--anim { animation: c1s8-arr 4.5s ease-in-out infinite; }
        @keyframes c1s8-arr {
          0%,10%   { opacity: 0; }
          18%,32%  { opacity: 1; }
          45%,100% { opacity: 0; }
        }
        /* #2 badge appears once seated */
        .c1s8-badge--anim { animation: c1s8-badge 4.5s ease-in-out infinite; }
        @keyframes c1s8-badge {
          0%,58%   { opacity: 0; }
          70%,100% { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* ===== grey S1 tank (left) with open bushing flange on top ===== */}
      <g transform="translate(30 70)">
        <rect x="0" y="20" width="96" height="122" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="6" y="26" width="84" height="14" rx="3" fill="#C2C6BF" />
        {/* bushing flange seat (now empty where #2 was) */}
        <ellipse cx="48" cy="20" rx="20" ry="6" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
        <ellipse cx="48" cy="19" rx="12" ry="3.4" fill="#3A3F3B" />
        {[24, 40, 56, 72].map((sx) => (
          <circle key={sx} cx={sx} cy="72" r="2" fill="#9BA19A" />
        ))}
        <rect x="18" y="96" width="60" height="34" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      </g>

      {/* ===== white foam pad (right) already holding bushing #1 ===== */}
      <g transform="translate(150 150)">
        <rect x="0" y="16" width="150" height="26" rx="4" fill="#EDEAE0" stroke="#CFC9BA" strokeWidth="2" />
        {[10, 26, 42, 58, 74, 90, 106, 122, 138].map((dx) => (
          <line key={dx} x1={dx} y1="20" x2={dx} y2="38" stroke="#DAD4C4" strokeWidth="1.4" />
        ))}
      </g>
      {/* bushing #1 standing on the foam */}
      <g transform="translate(184 146)">
        <Bushing label="#1" />
      </g>

      {/* ===== extraction arrow (pointing up out of tank) ===== */}
      <g className={anim('c1s8-arr')} style={reduced ? { opacity: 0 } : undefined}>
        <path d="M 78 60 v -26 M 72 42 l 6 -8 l 6 8" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="c1s8-stage" data-paused={paused ? '' : undefined}>
        {/* ===== bushing #2 being removed and re-seated on foam ===== */}
        <g className={anim('c1s8-move')} style={reduced ? { transform: 'translate(150px,26px)' } : undefined}>
          <g transform="translate(78 90)">
            <Bushing label="#2" />
          </g>
        </g>

        {/* ===== #2 done badge ===== */}
        <g className={anim('c1s8-badge')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="120" y="24" width="64" height="26" rx="7" fill="var(--accent)" />
          <text x="152" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--on-accent)">#2 ✓</text>
        </g>
      </g>
    </svg>
  )
}
