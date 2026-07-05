// GIS Tank Modification — Step 6: "Complete the CT wiring & test the CTs"
// Round CT terminal plate with R (red), Y (yellow), B (blue) wires being
// crimped and routed to the terminals; a small CT test set flashes a green OK
// lamp. "27 wires" badge. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="CT terminal round plate with red, yellow and blue wires being routed and crimped; CT test set showing a green OK lamp"
    >
      <style>{`
        .g6-stage[data-paused] * { animation-play-state: paused !important; }

        /* wires draw themselves to the terminal plate one colour at a time */
        .g6-wR--anim { stroke-dasharray: 130; animation: g6-wR 4.5s ease-in-out infinite; }
        @keyframes g6-wR {
          0%       { stroke-dashoffset: 130; }
          18%,90%  { stroke-dashoffset: 0; }
          98%,100% { stroke-dashoffset: 130; }
        }
        .g6-wY--anim { stroke-dasharray: 130; animation: g6-wY 4.5s ease-in-out infinite; }
        @keyframes g6-wY {
          0%,14%   { stroke-dashoffset: 130; }
          32%,90%  { stroke-dashoffset: 0; }
          98%,100% { stroke-dashoffset: 130; }
        }
        .g6-wB--anim { stroke-dasharray: 130; animation: g6-wB 4.5s ease-in-out infinite; }
        @keyframes g6-wB {
          0%,28%   { stroke-dashoffset: 130; }
          46%,90%  { stroke-dashoffset: 0; }
          98%,100% { stroke-dashoffset: 130; }
        }
        /* crimper squeezes on the lug */
        .g6-crimp--anim { animation: g6-crimp 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g6-crimp {
          0%,46%       { transform: rotate(-22deg); }
          54%,58%      { transform: rotate(0deg); }
          64%          { transform: rotate(-22deg); }
          70%,74%      { transform: rotate(0deg); }
          80%,100%     { transform: rotate(-22deg); }
        }
        /* CT test set OK lamp lights after wiring done */
        .g6-ok--anim { animation: g6-ok 4.5s ease-in-out infinite; }
        @keyframes g6-ok {
          0%,60%   { opacity: 0.15; }
          70%,90%  { opacity: 1; }
          98%,100% { opacity: 0.15; }
        }
        /* test-set screen trace */
        .g6-trace--anim { stroke-dasharray: 60; animation: g6-trace 4.5s linear infinite; }
        @keyframes g6-trace {
          0%,58%  { stroke-dashoffset: 60; }
          78%,92% { stroke-dashoffset: 0; }
          100%    { stroke-dashoffset: 60; }
        }
        .g6-badge--anim { animation: g6-badge 2.8s ease-in-out infinite; }
        @keyframes g6-badge {
          0%,100% { opacity: 0.85; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />

      {/* ===== panel lower section: the two round CT terminal plates ===== */}
      <rect x="20" y="30" width="150" height="180" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* big plate (worked on) */}
      <g transform="translate(95 108)">
        <circle cx="0" cy="0" r="52" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2.5" />
        {/* ring of 12 bolts */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          return <circle key={i} cx={44 * Math.cos(a)} cy={44 * Math.sin(a)} r="2.4" fill="#A9AEA6" />
        })}
        {/* inner grid of terminal studs (3 rows × 3 = per-phase groups) */}
        {[-18, 0, 18].map((ty) =>
          [-18, 0, 18].map((tx) => (
            <circle key={`${tx},${ty}`} cx={tx} cy={ty} r="4" fill="#C8CCC9" stroke="#7C837B" strokeWidth="1.4" />
          ))
        )}
        {/* terminal ids */}
        <text x="-30" y="-24" fontFamily="var(--font-mono)" fontSize="7" fill="#5B615A">1S1</text>
        <text x="14" y="30" fontFamily="var(--font-mono)" fontSize="7" fill="#5B615A">3S3</text>
      </g>
      {/* second smaller plate below (recognisable pair) */}
      <g transform="translate(95 185)">
        <circle cx="0" cy="0" r="18" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {[0, 90, 180, 270].map((a) => (
          <circle key={a} cx={13 * Math.cos((a * Math.PI) / 180)} cy={13 * Math.sin((a * Math.PI) / 180)} r="1.6" fill="#A9AEA6" />
        ))}
      </g>

      <g className="g6-stage" data-paused={paused ? '' : undefined}>
        {/* ===== R / Y / B wires routing to the plate terminals ===== */}
        <g fill="none" strokeWidth="3.5" strokeLinecap="round">
          <path className={anim('g6-wR')} d="M 216 52 q -60 -6 -96 22 q -22 18 -25 16" stroke="#C0392B" style={reduced ? undefined : {}} />
          <path className={anim('g6-wY')} d="M 216 76 q -56 4 -92 22 q -20 10 -29 10" stroke="#E3B505" />
          <path className={anim('g6-wB')} d="M 216 100 q -52 10 -88 22 q -18 6 -33 4" stroke="#0A82C6" />
        </g>
        {/* lugs at the wire ends on the studs */}
        <circle cx="95" cy="90" r="5" fill="none" stroke="#C0392B" strokeWidth="2.4" />
        <circle cx="95" cy="108" r="5" fill="none" stroke="#E3B505" strokeWidth="2.4" />
        <circle cx="95" cy="126" r="5" fill="none" stroke="#0A82C6" strokeWidth="2.4" />

        {/* ===== crimper working on a lug (right side) ===== */}
        <g transform="translate(228 118)">
          {/* wire + 6mm lug held in the jaws */}
          <line x1="-16" y1="0" x2="24" y2="0" stroke="#C0392B" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="-24" y="-3.5" width="12" height="7" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
          {/* fixed lower handle */}
          <path d="M -20 4 q -4 2 -2 6 l 34 26 q 4 3 8 0" fill="none" stroke="#D8452B" strokeWidth="7" strokeLinecap="round" />
          <path d="M -26 2 l 8 4" stroke="#2B2F33" strokeWidth="6" strokeLinecap="round" />
          {/* moving upper handle (crimping squeeze) */}
          <g className={anim('g6-crimp')} style={reduced ? { transform: 'rotate(-12deg)' } : undefined}>
            <path d="M -20 -4 q -4 -2 -2 -6 l 34 -26 q 4 -3 8 0" fill="none" stroke="#D8452B" strokeWidth="7" strokeLinecap="round" />
            <path d="M -26 -2 l 8 -4" stroke="#2B2F33" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>

        {/* ===== CT test set (bottom right) ===== */}
        <g transform="translate(216 158)">
          <rect x="0" y="0" width="88" height="58" rx="5" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
          <rect x="8" y="8" width="46" height="30" rx="3" fill="#1E2226" stroke="#111417" strokeWidth="1.5" />
          {/* screen trace */}
          <path className={anim('g6-trace')} d="M 12 26 h 8 l 4 -10 l 5 16 l 4 -8 h 16" fill="none" stroke="#3FD46C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={reduced ? { strokeDasharray: 'none' } : undefined} />
          {/* buttons */}
          <circle cx="66" cy="14" r="4" fill="#2B2F33" />
          <circle cx="78" cy="14" r="4" fill="#2B2F33" />
          {/* green OK lamp */}
          <circle className={anim('g6-ok')} cx="72" cy="32" r="6.5" fill="#3FD46C" style={reduced ? { opacity: 1 } : undefined} />
          <text x="72" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#3B4139">CT TEST</text>
          {/* test leads to the plate */}
          <path d="M 0 20 q -30 4 -56 -30" fill="none" stroke="#2B2F33" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 27 wires badge */}
        <g className={anim('g6-badge')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="196" y="14" width="94" height="22" rx="6" fill="var(--accent)" />
          <text x="243" y="29" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">27 wires</text>
        </g>
        {/* R Y B legend */}
        <g fontFamily="var(--font-mono)" fontSize="10">
          <text x="298" y="56" fill="#C0392B">R</text>
          <text x="298" y="80" fill="#E3B505">Y</text>
          <text x="298" y="104" fill="#0A82C6">B</text>
        </g>
      </g>
    </svg>
  )
}
