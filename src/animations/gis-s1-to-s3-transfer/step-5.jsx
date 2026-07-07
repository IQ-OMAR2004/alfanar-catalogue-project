// Case 1 — Step 5: "Dismantle: remove the internal busbars (BB)"
// Silver-plated flat busbars (holes at the ends, iridescent sheen) lift OUT of
// the grey tank one by one; the lifted bar is wrapped in protective film and
// laid aside. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const Busbar = ({ w = 74, sheen = true }) => (
    <g>
      <rect x="0" y="0" width={w} height="14" rx="3" fill="#D9DDE0" stroke="#8A9099" strokeWidth="2" />
      {sheen && <rect x="3" y="2.5" width={w - 6} height="4" rx="2" fill="#F2F5F7" opacity="0.85" />}
      {sheen && <rect x="3" y="9" width={w - 6} height="2.5" rx="1.2" fill="#BFD0DA" opacity="0.7" />}
      {/* bolt holes at both ends */}
      <circle cx="9" cy="7" r="3.2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
      <circle cx={w - 9} cy="7" r="3.2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
    </g>
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Silver-plated internal busbars lifting out of the grey tank one by one and being wrapped in protective film"
    >
      <style>{`
        .c1s5-stage[data-paused] * { animation-play-state: paused !important; }

        /* the top busbar lifts out of the tank and moves to the wrapping area */
        .c1s5-lift--anim { animation: c1s5-lift 5s ease-in-out infinite; }
        @keyframes c1s5-lift {
          0%      { transform: translate(0px,0px); }
          30%     { transform: translate(0px,-64px); }
          58%,100%{ transform: translate(150px,-64px); }
        }
        /* iridescent sheen sweeps across the plated bars */
        .c1s5-sheen--anim { animation: c1s5-sheen 3s ease-in-out infinite; }
        @keyframes c1s5-sheen {
          0%,100% { opacity: 0.25; transform: translateX(-8px); }
          50%     { opacity: 0.9;  transform: translateX(8px); }
        }
        /* protective film wraps the lifted bar near the end of the cycle */
        .c1s5-wrap--anim { animation: c1s5-wrap 5s ease-in-out infinite; }
        @keyframes c1s5-wrap {
          0%,62%   { opacity: 0; }
          78%,100% { opacity: 0.55; }
        }
        /* lift arrow pulse */
        .c1s5-arr--anim { animation: c1s5-arr 5s ease-in-out infinite; }
        @keyframes c1s5-arr {
          0%,6%   { opacity: 0; }
          16%,28% { opacity: 1; }
          40%,100%{ opacity: 0; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* wrapping-area label + white foam pad on the right */}
      <text x="238" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">wrap</text>
      <rect x="196" y="88" width="96" height="12" rx="3" fill="#EDEAE0" stroke="#CFC9B8" strokeWidth="1.4" />

      {/* ===== grey tank holding the busbar stack (left) ===== */}
      <g transform="translate(24 78)">
        <rect x="0" y="0" width="120" height="134" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="0" y="0" width="14" height="134" rx="5" fill="#C2C6BF" opacity="0.5" />
        {/* open top rim (bars come out here) */}
        <rect x="12" y="-4" width="96" height="12" rx="3" fill="#C2C6BF" stroke="#8A9089" strokeWidth="2" />
        {[20, 36, 52, 68, 84, 100].map((cx) => (
          <circle key={cx} cx={cx} cy="2" r="1.8" fill="#8A9089" />
        ))}
        {/* remaining busbars still inside (a stack) */}
        <g transform="translate(23 62)"><Busbar /></g>
        <g transform="translate(23 82)"><Busbar /></g>
        <g transform="translate(23 102)"><Busbar /></g>
      </g>

      <g className="c1s5-stage" data-paused={paused ? '' : undefined}>
        {/* ===== the busbar being lifted out and wrapped ===== */}
        <g className={anim('c1s5-lift')} style={reduced ? { transform: 'translate(150px,-64px)' } : undefined}>
          <g transform="translate(47 122)">
            <Busbar />
            {/* iridescent sheen highlight */}
            <g style={{ clipPath: 'inset(0 round 3px)' }}>
              <rect className={anim('c1s5-sheen')} style={reduced ? { opacity: 0.6 } : undefined} x="14" y="0" width="18" height="14" fill="#EAF6FF" opacity="0.6" />
            </g>
            {/* protective film wrap */}
            <rect className={anim('c1s5-wrap')} style={reduced ? { opacity: 0.55 } : undefined} x="-3" y="-3" width="80" height="20" rx="4" fill="#BFE3F2" stroke="#8FC7DE" strokeWidth="1.4" />
          </g>
        </g>

        {/* lift arrow (upward, out of the tank) */}
        <g className={anim('c1s5-arr')} style={reduced ? { opacity: 0 } : undefined} transform="translate(84 96)">
          <path d="M 0 20 L 0 2" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 2 l -4 7 h 8 z" fill="var(--accent)" />
        </g>
      </g>
    </svg>
  )
}
