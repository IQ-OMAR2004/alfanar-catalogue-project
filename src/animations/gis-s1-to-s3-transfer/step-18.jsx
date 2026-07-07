// GIS S1→S3 Case 1 — Step 18: "Assemble: fit cable bushing #2"
// The SECOND brown epoxy cone bushing seats INTO its opening beside the first;
// bushing #1 is already fitted (both openings now filled). Mono "#2" badge and
// a gas-tight check (green tick sweeping the two seated flanges). Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Second brown epoxy cone bushing seating into its opening beside the first; both openings now filled; a green gas-tight tick confirms the seals"
    >
      <style>{`
        .c1s18-stage[data-paused] * { animation-play-state: paused !important; }

        /* second bushing lowers onto its guide pins and seats */
        .c1s18-bush--anim { animation: c1s18-bush 4.5s ease-in-out infinite; }
        @keyframes c1s18-bush {
          0%      { transform: translateY(-46px); opacity: 0.4; }
          44%     { transform: translateY(0); opacity: 1; }
          100%    { transform: translateY(0); opacity: 1; }
        }
        /* gas-tight OK badge appears once both are seated */
        .c1s18-ok--anim { animation: c1s18-ok 4.5s ease-in-out infinite; }
        @keyframes c1s18-ok {
          0%,55%   { opacity: 0; transform: scale(0.8); }
          70%,94%  { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(0.8); }
        }
        .c1s18-grease--anim { animation: c1s18-grease 3s ease-in-out infinite; }
        @keyframes c1s18-grease {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.65; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* "#2" badge */}
      <g transform="translate(40 34)">
        <rect x="-24" y="-16" width="48" height="30" rx="8" fill="var(--accent)" />
        <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--on-accent)">#2</text>
      </g>

      {/* ===== S3 tank wall with two bushing openings ===== */}
      <g transform="translate(40 120)">
        <rect x="-4" y="34" width="248" height="82" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />

        {/* --- opening #1 (already filled with a seated bushing) --- */}
        <g transform="translate(64 0)">
          <ellipse cx="0" cy="40" rx="46" ry="14" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
          {/* seated bushing #1 */}
          <ellipse cx="0" cy="38" rx="30" ry="10" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" />
          {[-22, -11, 0, 11, 22].map((dx) => (
            <circle key={dx} cx={dx} cy="37" r="2" fill="#C9A227" />
          ))}
          <ellipse cx="0" cy="38" rx="10" ry="3.5" fill="#2B1B14" />
          <text x="0" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">#1</text>
        </g>
      </g>

      {/* opening #2 empty flange (target) */}
      <g transform="translate(220 120)">
        <ellipse cx="0" cy="40" rx="46" ry="14" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
        <ellipse className={anim('c1s18-grease')} cx="0" cy="40" rx="38" ry="11" fill="#9FD8A8" style={reduced ? { opacity: 0.5 } : undefined} />
        <ellipse cx="0" cy="42" rx="26" ry="7" fill="#5A4038" stroke="#3A2820" strokeWidth="1.5" />
        <text x="0" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">#2</text>
      </g>

      <g className="c1s18-stage" data-paused={paused ? '' : undefined}>
        {/* guide pins at opening #2 */}
        <line x1="196" y1="140" x2="196" y2="164" stroke="#6E767E" strokeWidth="3" strokeLinecap="round" />
        <line x1="244" y1="140" x2="244" y2="164" stroke="#6E767E" strokeWidth="3" strokeLinecap="round" />
        <circle cx="196" cy="140" r="2.6" fill="#AEB4B9" />
        <circle cx="244" cy="140" r="2.6" fill="#AEB4B9" />

        {/* ===== descending brown epoxy cone bushing #2 ===== */}
        <g className={anim('c1s18-bush')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <g transform="translate(220 150)">
            <ellipse cx="0" cy="-2" rx="32" ry="10" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" />
            {[-24, -12, 0, 12, 24].map((dx) => (
              <circle key={dx} cx={dx} cy="-3" r="2.1" fill="#C9A227" />
            ))}
            <path d="M -28 0 L -13 40 L 13 40 L 28 0 Z" fill="#7C3A2B" stroke="#5A2A1F" strokeWidth="2" />
            <path d="M -18 2 L -9 38 L -3 38 L -11 2 Z" fill="#9B5240" opacity="0.75" />
            <ellipse cx="0" cy="0" rx="11" ry="4" fill="#2B1B14" />
          </g>
        </g>

        {/* ===== gas-tight check OK badge ===== */}
        <g className={anim('c1s18-ok')} style={reduced ? { opacity: 1 } : undefined} transform="translate(160 88)">
          <rect x="-52" y="-14" width="104" height="28" rx="8" fill="#2E9E4F" />
          <path d="M -40 0 l 6 7 l 12 -14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="8" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#fff">GAS-TIGHT</text>
        </g>
      </g>
    </svg>
  )
}
