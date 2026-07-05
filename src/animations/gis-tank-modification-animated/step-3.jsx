// GIS Tank Modification — Step 3: "Install the cable bushing & bushing busbar"
// Bottom bushing plate with 3 red-brown epoxy bushings seated via guide pins; a
// copper busbar lowers onto the bushing tips. Torque badges "13.5 Nm" (bushing
// bolts) and "47 Nm" (busbar), plus a Loctite drop. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const bushing = (cx) => (
    <g key={cx} transform={`translate(${cx} 0)`}>
      {/* epoxy cone stack */}
      <path d="M -16 62 L -11 34 h 22 L 16 62 Z" fill="#8C4A38" stroke="#5F3126" strokeWidth="2" strokeLinejoin="round" />
      <path d="M -13 52 h 26 M -12 44 h 24" stroke="#A75E48" strokeWidth="3" strokeLinecap="round" />
      <rect x="-11" y="26" width="22" height="8" rx="2" fill="#A75E48" stroke="#5F3126" strokeWidth="1.6" />
      {/* metal tip */}
      <rect x="-5" y="16" width="10" height="10" rx="2" fill="#C8CCC9" stroke="#7C837B" strokeWidth="1.6" />
      <circle cx="0" cy="14" r="3" fill="#AEB4B9" stroke="#7C837B" strokeWidth="1.2" />
    </g>
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three epoxy cable bushings seated on the bottom plate with guide pins; a copper busbar lowering onto a bushing with torque values"
    >
      <style>{`
        .g3-stage[data-paused] * { animation-play-state: paused !important; }

        /* bushings settle down onto the plate along the guide pins */
        .g3-seat--anim { animation: g3-seat 4.5s ease-in-out infinite; }
        @keyframes g3-seat {
          0%       { transform: translateY(-26px); }
          30%,86%  { transform: translateY(0); }
          96%,100% { transform: translateY(-26px); }
        }
        /* copper busbar lowers onto the bushing tips after seating */
        .g3-bus--anim { animation: g3-bus 4.5s ease-in-out infinite; }
        @keyframes g3-bus {
          0%,30%   { transform: translateY(-42px); opacity: 0.9; }
          58%,86%  { transform: translateY(0); opacity: 1; }
          96%,100% { transform: translateY(-42px); opacity: 0.9; }
        }
        /* Loctite drop falls onto a bolt */
        .g3-drop--anim { animation: g3-drop 4.5s ease-in infinite; }
        @keyframes g3-drop {
          0%,32%   { transform: translateY(0); opacity: 0; }
          38%      { opacity: 1; }
          52%      { transform: translateY(26px); opacity: 1; }
          56%,100% { transform: translateY(26px); opacity: 0; }
        }
        /* torque badges pop in after their action */
        .g3-t1--anim { animation: g3-t1 4.5s ease-in-out infinite; }
        @keyframes g3-t1 {
          0%,32%   { opacity: 0; transform: scale(0.7); }
          40%,88%  { opacity: 1; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.7); }
        }
        .g3-t2--anim { animation: g3-t2 4.5s ease-in-out infinite; }
        @keyframes g3-t2 {
          0%,58%   { opacity: 0; transform: scale(0.7); }
          68%,88%  { opacity: 1; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.7); }
        }
        /* guide-pin glow while parts are moving */
        .g3-pin--anim { animation: g3-pin 4.5s ease-in-out infinite; }
        @keyframes g3-pin {
          0%,26%   { opacity: 1; }
          40%,100% { opacity: 0.25; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />

      {/* ===== tank bottom, cut-away: bottom bushing plate ===== */}
      {/* tank side walls */}
      <path d="M 34 30 v 158 h 20 V 48 h 212 v 140 h 20 V 30" fill="none" stroke="#7C837B" strokeWidth="0" />
      <rect x="34" y="30" width="20" height="170" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="266" y="30" width="20" height="170" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* bottom bushing plate */}
      <rect x="54" y="176" width="212" height="16" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="54" y="192" width="212" height="10" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      {/* bushing holes in the plate */}
      {[110, 160, 210].map((cx) => (
        <rect key={cx} x={cx - 13} y="176" width="26" height="8" fill="#8A9089" />
      ))}
      {/* M8 bolts on the plate flanges */}
      {[80, 135, 185, 240].map((cx) => (
        <g key={cx}>
          <rect x={cx - 3.5} y="170" width="7" height="6" rx="1" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
        </g>
      ))}

      <g className="g3-stage" data-paused={paused ? '' : undefined}>
        {/* guide pins standing in the plate holes */}
        <g className={anim('g3-pin')} style={reduced ? { opacity: 0.6 } : undefined}>
          {[110, 160, 210].map((cx) => (
            <g key={cx}>
              <rect x={cx - 1.8} y="118" width="3.6" height="58" rx="1.8" fill="#6E767E" />
              <circle cx={cx} cy="116" r="3" fill="var(--accent)" />
            </g>
          ))}
        </g>

        {/* the three epoxy bushings seating down (guides keep them aligned) */}
        <g transform="translate(0 114)">
          <g className={anim('g3-seat')}>{[110, 160, 210].map(bushing)}</g>
        </g>

        {/* copper busbar lowering onto the middle/right bushing tips */}
        <g transform="translate(0 96)">
          <g className={anim('g3-bus')}>
            <rect x="146" y="22" width="80" height="9" rx="2" fill="#C08040" stroke="#8F5C2A" strokeWidth="2" />
            <rect x="146" y="22" width="80" height="3" fill="#D9975B" />
            {/* bolt bosses where it lands on the bushings */}
            <circle cx="160" cy="26.5" r="3" fill="#8F5C2A" />
            <circle cx="210" cy="26.5" r="3" fill="#8F5C2A" />
            {/* 8mm allen key on the busbar bolt */}
            <g transform="translate(210 12)">
              <path d="M 0 10 v -14 h 12" fill="none" stroke="#6E767E" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* Loctite bottle + falling drop over a plate bolt */}
        <g transform="translate(80 130)">
          <path d="M -5 0 h 10 v 6 h -3 l 3 8 v 14 h -10 V 14 l 3 -8 h -3 Z" fill="#C0392B" stroke="#8E2C1A" strokeWidth="1.6" strokeLinejoin="round" transform="rotate(180 0 14)" />
          <text x="16" y="10" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">401</text>
          <g className={anim('g3-drop')} style={reduced ? { opacity: 0 } : undefined}>
            <path d="M 0 6 q 3 5 0 8 q -3 -3 0 -8" fill="#C0392B" transform="translate(0 4)" />
          </g>
        </g>

        {/* torque badges */}
        <g className={anim('g3-t1')} style={reduced ? { opacity: 1 } : { transformOrigin: '62px 62px' }}>
          <rect x="26" y="50" width="74" height="22" rx="6" fill="var(--accent)" />
          <text x="63" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">13.5 Nm</text>
          <path d="M 70 72 q 6 26 8 50" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
        </g>
        <g className={anim('g3-t2')} style={reduced ? { opacity: 1 } : { transformOrigin: '254px 62px' }}>
          <rect x="222" y="50" width="64" height="22" rx="6" fill="var(--accent)" />
          <text x="254" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">47 Nm</text>
          <path d="M 244 72 q -14 22 -26 40" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      </g>
    </svg>
  )
}
