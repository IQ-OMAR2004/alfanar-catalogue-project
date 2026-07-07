// Case 1 — Step 10: "Scrap the unwanted busbars"
// Sorting scene: a good silver busbar slides to the green REUSE rack (✓); an
// unwanted busbar drops into the red SCRAP bin (✗); a job-card tick is stamped.
// Loop ~4.6s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  // silver-plated flat busbar with end holes
  const Busbar = ({ w = 58 }) => (
    <g>
      <rect x={-w / 2} y="-6" width={w} height="12" rx="2.5" fill="#D9DDE0" stroke="#8A9099" strokeWidth="1.6" />
      <rect x={-w / 2} y="-6" width={w} height="4" rx="2" fill="#EFF2F4" opacity="0.8" />
      <circle cx={-w / 2 + 7} cy="0" r="2.4" fill="#9BA1A8" />
      <circle cx={w / 2 - 7} cy="0" r="2.4" fill="#9BA1A8" />
    </g>
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Sorting busbars: a reusable silver busbar going to the green reuse rack, an unwanted one dropping into the red scrap bin, job card ticked"
    >
      <style>{`
        .c1s10-stage[data-paused] * { animation-play-state: paused !important; }
        /* good bar slides right onto the REUSE rack */
        .c1s10-reuse--anim { animation: c1s10-reuse 4.6s ease-in-out infinite; }
        @keyframes c1s10-reuse {
          0%,8%    { transform: translate(0,0); opacity: 1; }
          40%,100% { transform: translate(70px,-2px); opacity: 1; }
        }
        /* scrap bar lifts then drops into the red bin */
        .c1s10-scrap--anim { animation: c1s10-scrap 4.6s ease-in-out infinite; }
        @keyframes c1s10-scrap {
          0%,44%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          62%      { transform: translate(-58px,-30px) rotate(-14deg); opacity: 1; }
          82%      { transform: translate(-96px,44px) rotate(-40deg); opacity: 1; }
          88%,100% { transform: translate(-96px,60px) rotate(-40deg); opacity: 0; }
        }
        /* REUSE check + job-card tick appear */
        .c1s10-ok--anim { animation: c1s10-ok 4.6s ease-in-out infinite; }
        @keyframes c1s10-ok {
          0%,30%   { opacity: 0.2; }
          45%,100% { opacity: 1; }
        }
        .c1s10-tick--anim { animation: c1s10-tick 4.6s ease-in-out infinite; }
        @keyframes c1s10-tick {
          0%,84%   { opacity: 0; }
          92%,100% { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* ===== REUSE rack (green, right) ===== */}
      <g transform="translate(214 96)">
        <rect x="-6" y="0" width="92" height="70" rx="5" fill="#E7EFE7" stroke="#2E9E5B" strokeWidth="2.5" />
        <rect x="-6" y="0" width="92" height="16" rx="5" fill="#2E9E5B" />
        <text x="40" y="12" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#FFFFFF">REUSE</text>
        {/* rack shelves */}
        <line x1="4" y1="34" x2="76" y2="34" stroke="#B9C7B9" strokeWidth="2" />
        <line x1="4" y1="52" x2="76" y2="52" stroke="#B9C7B9" strokeWidth="2" />
        <g className={anim('c1s10-ok')} style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="72" cy="60" r="9" fill="#2E9E5B" />
          <path d="M 67 60 l 3.4 3.6 l 6 -7.4" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ===== SCRAP bin (red, left) ===== */}
      <g transform="translate(24 118)">
        <path d="M 4 8 L 76 8 L 70 74 L 10 74 Z" fill="#E7B9B4" stroke="#C0392B" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="0" y="0" width="80" height="14" rx="3" fill="#C0392B" />
        <text x="40" y="11" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#FFFFFF">SCRAP</text>
        {/* hazard stripes on the bin lip */}
        {[14, 26, 38, 50, 62].map((sx) => (
          <line key={sx} x1={sx} y1="18" x2={sx + 6} y2="24" stroke="#C0392B" strokeWidth="2" />
        ))}
        <text x="40" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fill="#C0392B" opacity="0.5">✗</text>
      </g>

      {/* ===== job card (top-right) ===== */}
      <g transform="translate(250 26)">
        <rect x="0" y="0" width="46" height="30" rx="3" fill="#FBFAF5" stroke="#8A9089" strokeWidth="1.6" />
        <line x1="6" y1="9" x2="40" y2="9" stroke="#C2C6BF" strokeWidth="1.6" />
        <line x1="6" y1="16" x2="40" y2="16" stroke="#C2C6BF" strokeWidth="1.6" />
        <line x1="6" y1="23" x2="30" y2="23" stroke="#C2C6BF" strokeWidth="1.6" />
        <g className={anim('c1s10-tick')} style={reduced ? { opacity: 1 } : undefined}>
          <path d="M 30 22 l 3.4 3.8 l 7 -9" fill="none" stroke="#2E9E5B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      <g className="c1s10-stage" data-paused={paused ? '' : undefined}>
        {/* sorting bench line */}
        <line x1="108" y1="150" x2="212" y2="150" stroke="#9BA19A" strokeWidth="3" strokeLinecap="round" />

        {/* good busbar → REUSE */}
        <g className={anim('c1s10-reuse')} style={reduced ? { transform: 'translate(70px,-2px)' } : undefined}>
          <g transform="translate(150 130)">
            <Busbar w={58} />
          </g>
        </g>

        {/* unwanted busbar → SCRAP */}
        <g className={anim('c1s10-scrap')} style={reduced ? { transform: 'translate(0,0)' } : undefined}>
          <g transform="translate(150 150)">
            <Busbar w={50} />
          </g>
        </g>
      </g>
    </svg>
  )
}
