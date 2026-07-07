// GIS S1→S3 Case 1 — Step 17: "Assemble: fit cable bushing #1"
// A brown epoxy cone bushing (hex flange top, tapering down, hollow socket)
// lowers INTO its round opening on the S3 tank flange, guided by two guide pins;
// a green grease sheen on the flange; an Allen key drives the button-head
// screws. Mono "#1" badge. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Brown epoxy cone cable bushing number one lowering onto guide pins into its opening on the S3 tank flange; grease on the flange; an Allen key driving the button-head screws"
    >
      <style>{`
        .c1s17-stage[data-paused] * { animation-play-state: paused !important; }

        /* bushing slides down the guide pins into its opening */
        .c1s17-bush--anim { animation: c1s17-bush 4.5s ease-in-out infinite; }
        @keyframes c1s17-bush {
          0%      { transform: translateY(-48px); opacity: 0.4; }
          42%     { transform: translateY(0); opacity: 1; }
          100%    { transform: translateY(0); opacity: 1; }
        }
        /* Allen key rocks driving screws after seating */
        .c1s17-key--anim { animation: c1s17-key 0.8s ease-in-out infinite; transform-origin: 50% 100%; }
        @keyframes c1s17-key {
          0%,100% { transform: rotate(-14deg); }
          50%     { transform: rotate(20deg); }
        }
        .c1s17-tool--anim { animation: c1s17-tool 4.5s ease-in-out infinite; }
        @keyframes c1s17-tool {
          0%,46%  { opacity: 0; }
          54%,90% { opacity: 1; }
          100%    { opacity: 0; }
        }
        /* grease sheen shimmer on the flange */
        .c1s17-grease--anim { animation: c1s17-grease 3s ease-in-out infinite; }
        @keyframes c1s17-grease {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.7; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* "#1" badge */}
      <g transform="translate(40 34)">
        <rect x="-24" y="-16" width="48" height="30" rx="8" fill="var(--accent)" />
        <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--on-accent)">#1</text>
      </g>

      {/* ===== S3 tank wall with the bushing opening + flange ===== */}
      <g transform="translate(96 118)">
        {/* tank wall slab */}
        <rect x="-6" y="30" width="140" height="84" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* flange ring (aluminium) around the opening */}
        <ellipse cx="64" cy="38" rx="52" ry="16" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
        {/* greased sealing face */}
        <ellipse className={anim('c1s17-grease')} cx="64" cy="38" rx="44" ry="12" fill="#9FD8A8" style={reduced ? { opacity: 0.5 } : undefined} />
        {/* dark socket bore */}
        <ellipse cx="64" cy="40" rx="30" ry="8" fill="#5A4038" stroke="#3A2820" strokeWidth="1.5" />
        {/* flange bolt holes */}
        {[-46, -30, 30, 46].map((dx) => (
          <circle key={dx} cx={64 + dx} cy="38" r="2.4" fill="#8A9089" />
        ))}
        {/* button-head screws (front two) */}
        <circle cx="34" cy="38" r="3" fill="#C9A227" stroke="#8A6B14" strokeWidth="1" />
        <circle cx="94" cy="38" r="3" fill="#C9A227" stroke="#8A6B14" strokeWidth="1" />
      </g>

      <g className="c1s17-stage" data-paused={paused ? '' : undefined}>
        {/* two guide pins standing up from the flange */}
        <line x1="130" y1="100" x2="130" y2="156" stroke="#6E767E" strokeWidth="3" strokeLinecap="round" />
        <line x1="190" y1="100" x2="190" y2="156" stroke="#6E767E" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="100" r="2.6" fill="#AEB4B9" />
        <circle cx="190" cy="100" r="2.6" fill="#AEB4B9" />

        {/* ===== descending brown epoxy cone bushing ===== */}
        <g className={anim('c1s17-bush')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <g transform="translate(160 108)">
            {/* hex flange top */}
            <ellipse cx="0" cy="0" rx="34" ry="11" fill="#9B5240" stroke="#5A2A1F" strokeWidth="2" />
            <ellipse cx="0" cy="-2" rx="34" ry="11" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" />
            {/* brass bolt dots on flange */}
            {[-26, -13, 0, 13, 26].map((dx) => (
              <circle key={dx} cx={dx} cy="-3" r="2.2" fill="#C9A227" />
            ))}
            {/* tapering cone body */}
            <path d="M -30 0 L -14 42 L 14 42 L 30 0 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" />
            {/* highlight */}
            <path d="M -20 2 L -10 40 L -4 40 L -12 2 Z" fill="#9B5240" opacity="0.75" />
            {/* hollow central socket */}
            <ellipse cx="0" cy="0" rx="12" ry="4.5" fill="#2B1B14" />
          </g>
        </g>

        {/* ===== Allen key driving a button-head screw ===== */}
        <g className={anim('c1s17-tool')} style={reduced ? { opacity: 1 } : undefined} transform="translate(214 150)">
          <g className={anim('c1s17-key')} style={reduced ? { transform: 'rotate(4deg)' } : undefined}>
            {/* L-shaped hex key */}
            <path d="M 0 0 L 0 -30 L 18 -30" fill="none" stroke="#2B2F33" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </svg>
  )
}
