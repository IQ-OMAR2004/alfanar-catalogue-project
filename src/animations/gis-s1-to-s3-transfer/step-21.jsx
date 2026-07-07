// GIS Case 1 — Step 21: "Assemble: fit the required busbars (BB)"
// Silver-plated flat busbars bridge the breaker pole, a toroidal CT and a brown
// epoxy cable bushing inside the grey S3 tank. A ratchet torques the bolted
// joint while a polish sheen sweeps the contact face; dashed alignment guide
// lines show the correct run. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Silver busbars connecting the breaker pole, current transformer and cable bushing inside the grey tank; a ratchet torques the bolted joint"
    >
      <style>{`
        .c1s21-stage[data-paused] * { animation-play-state: paused !important; }

        /* ratchet swings back and forth as it torques the joint */
        .c1s21-ratchet--anim { animation: c1s21-ratchet 1.6s ease-in-out infinite; transform-origin: 236px 96px; }
        @keyframes c1s21-ratchet {
          0%,100% { transform: rotate(-14deg); }
          50%     { transform: rotate(10deg); }
        }
        /* polish sheen sweeps along the silver contact face */
        .c1s21-sheen--anim { animation: c1s21-sheen 3s ease-in-out infinite; }
        @keyframes c1s21-sheen {
          0%,100% { transform: translateX(-30px); opacity: 0; }
          45%,55% { opacity: 0.9; }
          50%     { transform: translateX(60px); }
        }
        /* joint tightens: a small glow pulse each stroke */
        .c1s21-glow--anim { animation: c1s21-glow 1.6s ease-in-out infinite; }
        @keyframes c1s21-glow {
          0%,100% { opacity: 0.2; r: 3; }
          50%     { opacity: 0.9; r: 5; }
        }
        /* alignment guides breathe */
        .c1s21-guide--anim { animation: c1s21-guide 3s ease-in-out infinite; }
        @keyframes c1s21-guide {
          0%,100% { opacity: 0.35; }
          50%     { opacity: 0.85; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* ===== grey S3 tank interior (RAL 7035) ===== */}
      <rect x="20" y="30" width="280" height="164" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="20" y="30" width="280" height="164" rx="6" fill="none" stroke="#C2C6BF" strokeWidth="6" opacity="0.35" />
      <rect x="30" y="40" width="260" height="144" rx="4" fill="#C2C6BF" opacity="0.5" />

      {/* left: brown epoxy cable bushing socket */}
      <g transform="translate(58 150)">
        <rect x="-20" y="-8" width="40" height="14" rx="2" fill="#9B5240" stroke="#5C2A1E" strokeWidth="1.5" />
        <path d="M -16 -8 L -10 -44 L 10 -44 L 16 -8 Z" fill="#7C3A2B" stroke="#5C2A1E" strokeWidth="2" />
        <path d="M -12 -8 L -7 -40 L 0 -40 L -2 -8 Z" fill="#9B5240" opacity="0.6" />
        <ellipse cx="0" cy="-44" rx="12" ry="4" fill="#5C2A1E" />
        <circle cx="0" cy="-44" r="4" fill="#26292C" />
      </g>

      {/* centre: tan toroidal CT ring */}
      <g transform="translate(160 128)">
        <circle cx="0" cy="0" r="26" fill="#B98C55" stroke="#7C5A2E" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="13" fill="#C2C6BF" stroke="#7C5A2E" strokeWidth="2" />
        <path d="M -22 -12 q 8 -6 16 0" fill="none" stroke="#26292C" strokeWidth="2" />
        <path d="M -18 -16 q 10 -6 20 0" fill="none" stroke="#26292C" strokeWidth="2" />
      </g>

      {/* right: breaker pole (brown epoxy cylinder) top connection */}
      <g transform="translate(256 150)">
        <rect x="-16" y="-6" width="32" height="52" rx="6" fill="#7C3A2B" stroke="#5C2A1E" strokeWidth="2" />
        <rect x="-10" y="-6" width="8" height="52" rx="3" fill="#9B5240" opacity="0.6" />
        <ellipse cx="0" cy="-6" rx="16" ry="5" fill="#9B5240" stroke="#5C2A1E" strokeWidth="1.5" />
      </g>

      <g className="c1s21-stage" data-paused={paused ? '' : undefined}>
        {/* dashed alignment guide lines for the busbar run */}
        <path className={anim('c1s21-guide')} d="M 58 106 L 160 96 L 256 106" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 5" style={reduced ? { opacity: 0.6 } : undefined} />

        {/* silver-plated busbar #1 : bushing -> CT */}
        <g>
          <rect x="52" y="98" width="112" height="12" rx="3" fill="#D9DDE0" stroke="#8A9099" strokeWidth="2" transform="rotate(-3 108 104)" />
          <circle cx="60" cy="104" r="3" fill="#8A9099" />
          <circle cx="156" cy="100" r="3" fill="#8A9099" />
        </g>
        {/* silver-plated busbar #2 : CT -> breaker */}
        <g>
          <rect x="156" y="94" width="104" height="12" rx="3" fill="#D9DDE0" stroke="#8A9099" strokeWidth="2" transform="rotate(3 208 100)" />
          <circle cx="164" cy="97" r="3" fill="#8A9099" />
          <circle cx="252" cy="103" r="3" fill="#8A9099" />
        </g>

        {/* polish sheen sweeping across the silver faces */}
        <g clipPath="none">
          <rect className={anim('c1s21-sheen')} x="70" y="94" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0" style={reduced ? { opacity: 0 } : undefined} />
        </g>

        {/* torqued joint at the breaker end + glow */}
        <circle cx="252" cy="103" r="5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
        <circle className={anim('c1s21-glow')} cx="252" cy="103" r="3" fill="var(--accent)" style={reduced ? { opacity: 0.4 } : undefined} />

        {/* ratchet wrench working the joint */}
        <g className={anim('c1s21-ratchet')} style={reduced ? { transform: 'rotate(-6deg)' } : undefined}>
          <rect x="234" y="52" width="10" height="46" rx="4" fill="#2B2F33" stroke="#111417" strokeWidth="1.5" />
          <rect x="228" y="46" width="22" height="14" rx="4" fill="#6E767E" stroke="#3A3F44" strokeWidth="1.5" />
          <circle cx="239" cy="53" r="4" fill="#2B2F33" />
        </g>
      </g>

      {/* mono badge: bolt / socket size */}
      <g transform="translate(24 24)">
        <rect x="0" y="0" width="70" height="20" rx="6" fill="var(--accent)" />
        <text x="35" y="14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">8 mm hex</text>
      </g>
    </svg>
  )
}
