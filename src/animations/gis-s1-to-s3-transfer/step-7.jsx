// Case 1 — Step 7: "Dismantle: remove cable bushing #1"
// An Allen key backs off the button-head screws around the flange first, then
// the brown epoxy CONE bushing (hex flange top with brass bolt dots, tapering
// body, hollow centre) draws OUT of the tank and stands upright on white foam.
// "#1" badge. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An Allen key backs off the flange screws, then the brown epoxy cone cable bushing number 1 draws out of the tank and stands on white foam"
    >
      <style>{`
        .c1s7-stage[data-paused] * { animation-play-state: paused !important; }

        /* Allen key turns to back off the flange screws first */
        .c1s7-key--anim { animation: c1s7-key 5s ease-in-out infinite; transform-origin: 6px 6px; }
        @keyframes c1s7-key {
          0%,4%   { transform: rotate(0deg); opacity: 1; }
          26%     { transform: rotate(-150deg); opacity: 1; }
          34%,100%{ transform: rotate(-150deg); opacity: 0; }
        }
        /* the cone bushing draws up out of the tank, then over to the foam */
        .c1s7-cone--anim { animation: c1s7-cone 5s ease-in-out infinite; }
        @keyframes c1s7-cone {
          0%,34%  { transform: translate(0px,0px); }
          60%     { transform: translate(0px,-58px); }
          84%,100%{ transform: translate(150px,-30px); }
        }
        /* flange bolt dots flash loose as the key backs them off */
        .c1s7-bolts--anim { animation: c1s7-bolts 5s ease-in-out infinite; }
        @keyframes c1s7-bolts {
          0%,10%  { fill: #C9A227; }
          30%,100%{ fill: #8A6B10; }
        }
        /* draw-out arrow pulse */
        .c1s7-arr--anim { animation: c1s7-arr 5s ease-in-out infinite; }
        @keyframes c1s7-arr {
          0%,34%  { opacity: 0; }
          42%,54% { opacity: 1; }
          64%,100%{ opacity: 0; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* white foam block on the right (upright rest for the bushing) */}
      <rect x="212" y="176" width="88" height="20" rx="3" fill="#EDEAE0" stroke="#CFC9B8" strokeWidth="1.6" />
      <text x="256" y="190" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#A79E86">foam</text>

      {/* "#1" badge */}
      <g transform="translate(292 26)">
        <rect x="-15" y="-11" width="30" height="22" rx="6" fill="var(--accent)" />
        <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">#1</text>
      </g>

      {/* ===== grey tank with the bushing flange opening (left) ===== */}
      <g transform="translate(30 120)">
        <rect x="0" y="0" width="120" height="92" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="0" y="0" width="14" height="92" rx="5" fill="#C2C6BF" opacity="0.5" />
        {/* flange seat opening on top */}
        <rect x="30" y="-4" width="60" height="12" rx="3" fill="#C2C6BF" stroke="#8A9089" strokeWidth="2" />
        {[38, 52, 66, 80].map((cx) => (
          <circle key={cx} cx={cx} cy="2" r="1.8" fill="#8A9089" />
        ))}
        <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#3C423C">S1</text>
      </g>

      <g className="c1s7-stage" data-paused={paused ? '' : undefined}>
        {/* ===== brown epoxy CONE bushing (draws out) ===== */}
        <g className={anim('c1s7-cone')} style={reduced ? { transform: 'translate(150px,-30px)' } : undefined}>
          <g transform="translate(60 78)">
            {/* tapering cone body (wide flange at top, narrows down) */}
            <path d="M 6 14 L 34 14 L 28 66 L 12 66 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" strokeLinejoin="round" />
            {/* epoxy highlight down the body */}
            <path d="M 12 16 L 18 16 L 15 64 L 13 64 Z" fill="#9B5240" opacity="0.85" />
            {/* hollow dark centre socket at the bottom */}
            <ellipse cx="20" cy="66" rx="8" ry="3" fill="#2A1712" stroke="#5A2A1F" strokeWidth="1.4" />
            {/* hex flange ring at the top */}
            <rect x="0" y="4" width="40" height="12" rx="2" fill="#8A4634" stroke="#5A2A1F" strokeWidth="2" />
            <rect x="0" y="4" width="40" height="4" rx="2" fill="#A85E48" opacity="0.8" />
            {/* brass bolt dots around the flange */}
            {[5, 13, 21, 29, 37].map((cx) => (
              <circle key={cx} className={anim('c1s7-bolts')} style={reduced ? { fill: '#8A6B10' } : undefined} cx={cx} cy="10" r="2.2" fill="#C9A227" />
            ))}

            {/* ===== Allen key backing off a flange screw ===== */}
            <g className={anim('c1s7-key')} style={reduced ? { opacity: 0 } : undefined} transform="translate(31 10)">
              <path d="M 0 0 h 16 v 4 h -12 v 14 h -4 z" fill="#2B2F33" stroke="#111417" strokeWidth="1.2" strokeLinejoin="round" />
            </g>
          </g>
        </g>

        {/* draw-out arrow (upward) */}
        <g className={anim('c1s7-arr')} style={reduced ? { opacity: 0 } : undefined} transform="translate(80 62)">
          <path d="M 0 20 L 0 2" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 2 l -4 7 h 8 z" fill="var(--accent)" />
        </g>
      </g>
    </svg>
  )
}
