// Case 1 — Step 12: "Empty the Solution 1 enclosure"
// Remaining parts and hardware on the workbench are cleared into labelled bins;
// a sweep motion clears the bench and it ends clean with a final check tick.
// Loop ~4.8s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Clearing leftover parts and hardware from the workbench into labelled bins until the bench is clean, final check ticked"
    >
      <style>{`
        .c1s12-stage[data-paused] * { animation-play-state: paused !important; }
        /* loose parts on the bench sweep to the right and drop into bins */
        .c1s12-p1--anim { animation: c1s12-p1 4.8s ease-in-out infinite; }
        @keyframes c1s12-p1 {
          0%,12%   { transform: translate(0,0); opacity: 1; }
          40%      { transform: translate(96px,4px); opacity: 1; }
          52%      { transform: translate(120px,40px); opacity: 1; }
          58%,100% { transform: translate(120px,52px); opacity: 0; }
        }
        .c1s12-p2--anim { animation: c1s12-p2 4.8s ease-in-out infinite; }
        @keyframes c1s12-p2 {
          0%,22%   { transform: translate(0,0); opacity: 1; }
          52%      { transform: translate(60px,2px); opacity: 1; }
          64%      { transform: translate(78px,42px); opacity: 1; }
          70%,100% { transform: translate(78px,54px); opacity: 0; }
        }
        .c1s12-p3--anim { animation: c1s12-p3 4.8s ease-in-out infinite; }
        @keyframes c1s12-p3 {
          0%,32%   { transform: translate(0,0); opacity: 1; }
          60%      { transform: translate(40px,2px); opacity: 1; }
          72%      { transform: translate(58px,40px); opacity: 1; }
          78%,100% { transform: translate(58px,52px); opacity: 0; }
        }
        /* cloth wipes across the emptied bench */
        .c1s12-wipe--anim { animation: c1s12-wipe 4.8s ease-in-out infinite; }
        @keyframes c1s12-wipe {
          0%,40%   { transform: translate(0,0); opacity: 0; }
          52%      { opacity: 1; }
          80%      { transform: translate(120px,0); opacity: 1; }
          88%,100% { transform: translate(120px,0); opacity: 0; }
        }
        .c1s12-done--anim { animation: c1s12-done 4.8s ease-in-out infinite; }
        @keyframes c1s12-done { 0%,82%{opacity:0;} 92%,100%{opacity:1;} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* ===== labelled parts bins (right) ===== */}
      <g transform="translate(230 150)">
        <path d="M 2 4 L 42 4 L 38 56 L 6 56 Z" fill="#DDE3EC" stroke="#2C6FB4" strokeWidth="2" strokeLinejoin="round" />
        <rect x="-2" y="-2" width="48" height="12" rx="2" fill="#2C6FB4" />
        <text x="22" y="7" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#FFFFFF">HW</text>
      </g>
      <g transform="translate(276 150)">
        <path d="M 2 4 L 42 4 L 38 56 L 6 56 Z" fill="#E7EFE7" stroke="#2E9E5B" strokeWidth="2" strokeLinejoin="round" />
        <rect x="-2" y="-2" width="48" height="12" rx="2" fill="#2E9E5B" />
        <text x="22" y="7" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#FFFFFF">PARTS</text>
      </g>

      {/* ===== workbench ===== */}
      <g transform="translate(0 0)">
        <rect x="30" y="150" width="180" height="12" rx="2" fill="#B08D57" stroke="#8A6D42" strokeWidth="2" />
        <rect x="42" y="162" width="8" height="42" fill="#8A6D42" />
        <rect x="190" y="162" width="8" height="42" fill="#8A6D42" />
      </g>

      <g className="c1s12-stage" data-paused={paused ? '' : undefined}>
        {/* leftover parts on the bench */}
        <g className={anim('c1s12-p1')} style={reduced ? { opacity: 1 } : undefined}>
          {/* bolt bag / hardware */}
          <rect x="54" y="138" width="18" height="12" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
          <circle cx="60" cy="144" r="1.6" fill="#6E767E" />
          <circle cx="66" cy="144" r="1.6" fill="#6E767E" />
        </g>
        <g className={anim('c1s12-p2')} style={reduced ? { opacity: 1 } : undefined}>
          {/* small O-ring */}
          <circle cx="96" cy="144" r="7" fill="none" stroke="#222" strokeWidth="3.5" />
        </g>
        <g className={anim('c1s12-p3')} style={reduced ? { opacity: 1 } : undefined}>
          {/* offcut / plate */}
          <rect x="126" y="140" width="26" height="9" rx="2" fill="#D9DDE0" stroke="#8A9099" strokeWidth="1.4" />
        </g>

        {/* wipe cloth across the cleaned bench */}
        <g className={anim('c1s12-wipe')} style={reduced ? { opacity: 0 } : undefined}>
          <rect x="46" y="140" width="22" height="10" rx="2" fill="#F2F2EE" stroke="#CFCFC6" strokeWidth="1.4" />
        </g>

        {/* final check — bench clean */}
        <g className={anim('c1s12-done')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="70" y="26" width="112" height="26" rx="7" fill="var(--accent)" />
          <text x="126" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">bench clear ✓</text>
        </g>
      </g>
    </svg>
  )
}
