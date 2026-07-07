// Case 1 — Step 3: "Recover the SF6 gas from the S1 tank"
// Orange SF6 gas cart connected by a black hose to the grey S1 tank. Gas flows
// OUT of the tank along the hose (dashed pulse travelling toward the cart). The
// tank pressure gauge needle drops to 0. Warning triangle: recover, never vent.
// Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Orange SF6 gas cart recovering gas from the grey S1 tank through a black hose; tank gauge falling to zero"
    >
      <style>{`
        .c1s3-stage[data-paused] * { animation-play-state: paused !important; }

        /* recovery flow: dashes travel along the hose FROM tank TO the cart */
        .c1s3-flow--anim { animation: c1s3-flow 1.3s linear infinite; }
        @keyframes c1s3-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -28; }
        }
        /* tank gauge needle sweeps from full pressure down to zero and holds */
        .c1s3-needle--anim { animation: c1s3-needle 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes c1s3-needle {
          0%      { transform: rotate(68deg); }
          60%,90% { transform: rotate(-70deg); }
          100%    { transform: rotate(68deg); }
        }
        /* "0" readout brightens as it hits zero */
        .c1s3-zero--anim { animation: c1s3-zero 4.5s ease-in-out infinite; }
        @keyframes c1s3-zero {
          0%,50%  { opacity: 0.3; }
          62%,90% { opacity: 1; }
          100%    { opacity: 0.3; }
        }
        /* cart run lamp */
        .c1s3-run--anim { animation: c1s3-run 1.3s ease-in-out infinite; }
        @keyframes c1s3-run { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .c1s3-warn--anim { animation: c1s3-warn 2.25s ease-in-out infinite; }
        @keyframes c1s3-warn { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* warning triangle — recover, never vent */}
      <g className={anim('c1s3-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== grey S1 tank (left) with pressure gauge ===== */}
      <g transform="translate(22 66)">
        <rect x="0" y="0" width="104" height="146" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="0" y="0" width="14" height="146" rx="5" fill="#C2C6BF" opacity="0.55" />
        <rect x="8" y="8" width="88" height="14" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[16, 34, 52, 70, 86].map((cx) => (
          <circle key={cx} cx={cx} cy="15" r="2" fill="#9BA19A" />
        ))}
        <rect x="16" y="36" width="72" height="58" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[24, 44, 64, 80].map((cx) => (
          <circle key={'t' + cx} cx={cx} cy="42" r="1.8" fill="#9BA19A" />
        ))}
        <text x="52" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3C423C">S1</text>

        {/* DN8 gas valve fitting on the right side */}
        <rect x="100" y="60" width="16" height="12" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.8" />

        {/* ===== tank pressure gauge (top) ===== */}
        <g transform="translate(52 -2)">
          <circle cx="0" cy="0" r="20" fill="#EDEFEA" stroke="#6E767E" strokeWidth="2.5" />
          {[-64, -32, 0, 32, 64].map((a) => (
            <line
              key={a}
              x1={14 * Math.sin((a * Math.PI) / 180)}
              y1={-14 * Math.cos((a * Math.PI) / 180)}
              x2={17 * Math.sin((a * Math.PI) / 180)}
              y2={-17 * Math.cos((a * Math.PI) / 180)}
              stroke="#6E767E"
              strokeWidth="1.6"
            />
          ))}
          {/* zero zone marker at the low (left) end */}
          <path d="M -15 4 A 17 17 0 0 0 -6 -12" fill="none" stroke="#2E9E4F" strokeWidth="3" />
          <g className={anim('c1s3-needle')} style={reduced ? { transform: 'rotate(-70deg)' } : undefined}>
            <line x1="0" y1="2" x2="0" y2="-15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
          </g>
          <circle cx="0" cy="0" r="2.6" fill="#2B2F33" />
          {/* 0 badge */}
          <g className={anim('c1s3-zero')} style={reduced ? { opacity: 1 } : undefined} transform="translate(0 30)">
            <rect x="-13" y="-8" width="26" height="16" rx="4" fill="var(--accent)" />
            <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">0 bar</text>
          </g>
        </g>
      </g>

      <g className="c1s3-stage" data-paused={paused ? '' : undefined}>
        {/* black hose from tank valve to the cart */}
        <path d="M 138 126 q 34 40 62 24" fill="none" stroke="#26292C" strokeWidth="7" strokeLinecap="round" />
        {/* recovery flow dashes travelling toward the cart */}
        <path
          className={anim('c1s3-flow')}
          style={reduced ? { opacity: 0.5 } : undefined}
          d="M 138 126 q 34 40 62 24"
          fill="none"
          stroke="#E0A15A"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </g>

      {/* ===== orange SF6 gas cart (right) ===== */}
      <g transform="translate(198 100)">
        <rect x="0" y="0" width="98" height="90" rx="6" fill="#E0701F" stroke="#B85812" strokeWidth="2.5" />
        <rect x="0" y="64" width="98" height="26" rx="4" fill="#B85812" />
        {/* handle bar */}
        <path d="M 96 4 q 16 -8 16 -26" fill="none" stroke="#B85812" strokeWidth="5" strokeLinecap="round" />
        {/* SF6 label plate */}
        <rect x="10" y="8" width="42" height="16" rx="2" fill="#1E2226" />
        <text x="31" y="20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#E0701F">SF6</text>
        {/* dark control panel */}
        <rect x="10" y="40" width="78" height="22" rx="3" fill="#1E2226" stroke="#111417" strokeWidth="1.5" />
        <rect x="16" y="46" width="9" height="9" rx="1.5" fill="#3FD46C" />
        <circle cx="34" cy="50.5" r="3.4" fill="#C0392B" />
        <g className={anim('c1s3-run')} style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="46" cy="50.5" r="3.4" fill="#3FD46C" />
        </g>
        {/* RECOVERY readout */}
        <rect x="56" y="44" width="26" height="14" rx="2" fill="#0B0D0E" />
        <text x="69" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#E0A15A">REC</text>
        {/* wheels */}
        <circle cx="18" cy="100" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="80" cy="100" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="18" cy="100" r="3" fill="#AEB4B9" />
        <circle cx="80" cy="100" r="3" fill="#AEB4B9" />
      </g>
    </svg>
  )
}
