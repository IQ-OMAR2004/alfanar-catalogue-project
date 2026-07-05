// GIS Tank Modification — Step 5: "Install the CT support, then the CTs"
// Three grey toroidal CTs stack one by one onto the CT support pipes with
// orange insulation rubbers between them. "P1 ↑ / P2 ↓" direction badge,
// "1 mm" gap callout and torque badge "47.5 Nm". Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const ct = (y, key) => (
    <g key={key} transform={`translate(0 ${y})`}>
      {/* toroid seen edge-on: fat grey ring */}
      <ellipse cx="0" cy="0" rx="52" ry="15" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
      <ellipse cx="0" cy="-2" rx="52" ry="13" fill="#D7DAD4" stroke="#7C837B" strokeWidth="1.5" />
      {/* centre hole */}
      <ellipse cx="0" cy="-2" rx="18" ry="5" fill="#A9AEA6" stroke="#7C837B" strokeWidth="1.5" />
      {/* P1 / P2 face marks */}
      <text x="-40" y="-6" fontFamily="var(--font-mono)" fontSize="8" fill="#5B615A">P1</text>
      <text x="28" y="10" fontFamily="var(--font-mono)" fontSize="8" fill="#5B615A">P2</text>
      {/* secondary wire tail */}
      <path d="M 50 2 q 12 4 14 14" fill="none" stroke="#2B2F33" strokeWidth="2" strokeLinecap="round" />
    </g>
  )

  const rubber = (y, key) => (
    <ellipse key={key} cx="0" cy={y} rx="34" ry="5.5" fill="#E0701F" stroke="#B85812" strokeWidth="1.8" />
  )

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three ring CTs stacking onto the CT support pipes with orange insulation rubbers between; P1 up P2 down and a 1 mm gap"
    >
      <style>{`
        .g5-stage[data-paused] * { animation-play-state: paused !important; }

        /* CTs slide down onto the support pipes one after the other */
        .g5-ct1--anim { animation: g5-ct1 5s ease-in-out infinite; }
        @keyframes g5-ct1 {
          0%       { transform: translateY(-120px); opacity: 0; }
          6%       { opacity: 1; }
          22%,88%  { transform: translateY(0); opacity: 1; }
          97%,100% { transform: translateY(-120px); opacity: 0; }
        }
        .g5-ct2--anim { animation: g5-ct2 5s ease-in-out infinite; }
        @keyframes g5-ct2 {
          0%,20%   { transform: translateY(-120px); opacity: 0; }
          26%      { opacity: 1; }
          42%,88%  { transform: translateY(0); opacity: 1; }
          97%,100% { transform: translateY(-120px); opacity: 0; }
        }
        .g5-ct3--anim { animation: g5-ct3 5s ease-in-out infinite; }
        @keyframes g5-ct3 {
          0%,40%   { transform: translateY(-120px); opacity: 0; }
          46%      { opacity: 1; }
          62%,88%  { transform: translateY(0); opacity: 1; }
          97%,100% { transform: translateY(-120px); opacity: 0; }
        }
        /* badges fade in once the stack is complete */
        .g5-badge--anim { animation: g5-badge 5s ease-in-out infinite; }
        @keyframes g5-badge {
          0%,62%   { opacity: 0; }
          72%,90%  { opacity: 1; }
          98%,100% { opacity: 0; }
        }
        /* direction badge visible the whole time (critical check) with pulse */
        .g5-dir--anim { animation: g5-dir 2.5s ease-in-out infinite; }
        @keyframes g5-dir {
          0%,100% { opacity: 0.8; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />

      {/* ===== tank cut-away with CT support ===== */}
      <rect x="18" y="24" width="16" height="192" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* base support plate with 4 bolts */}
      <g transform="translate(120 196)">
        <rect x="-78" y="0" width="156" height="12" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="-84" y="12" width="168" height="8" rx="2" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
        {[-66, -24, 24, 66].map((cx) => (
          <circle key={cx} cx={cx} cy="6" r="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
        ))}
      </g>
      {/* CT support pipes (rods the CTs slide over) */}
      <g stroke="#8A9089" strokeWidth="6" strokeLinecap="round">
        <line x1="86" y1="196" x2="86" y2="58" />
        <line x1="154" y1="196" x2="154" y2="58" />
      </g>
      <g stroke="#6E767E" strokeWidth="2">
        <line x1="86" y1="196" x2="86" y2="58" />
        <line x1="154" y1="196" x2="154" y2="58" />
      </g>
      {/* threaded tips */}
      <path d="M 83 62 h 6 M 83 67 h 6 M 151 62 h 6 M 151 67 h 6" stroke="#6E767E" strokeWidth="1.2" />

      <g className="g5-stage" data-paused={paused ? '' : undefined}>
        {/* stack centreline at x=120 */}
        <g transform="translate(120 0)">
          {/* CT 1 (bottom) + rubber below it */}
          <g className={anim('g5-ct1')}>
            {rubber(188, 'r1')}
            {ct(170, 'c1')}
          </g>
          {/* CT 2 + rubber */}
          <g className={anim('g5-ct2')}>
            {rubber(150, 'r2')}
            {ct(132, 'c2')}
          </g>
          {/* CT 3 (top) + rubber */}
          <g className={anim('g5-ct3')}>
            {rubber(112, 'r3')}
            {ct(94, 'c3')}
          </g>
        </g>

        {/* P1 up / P2 down direction badge (always-on critical check) */}
        <g className={anim('g5-dir')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="222" y="34" width="84" height="46" rx="8" fill="var(--accent)" />
          <text x="264" y="53" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">P1 &#8593;</text>
          <text x="264" y="71" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">P2 &#8595;</text>
        </g>

        {/* 1 mm gap callout + torque badge, appear after stacking */}
        <g className={anim('g5-badge')} style={reduced ? { opacity: 1 } : undefined}>
          {/* gap callout pointing between CT and support plate */}
          <path d="M 214 160 q 22 8 30 8" fill="none" stroke="var(--warn)" strokeWidth="2" strokeDasharray="4 3" />
          <rect x="244" y="158" width="58" height="20" rx="6" fill="var(--warn)" />
          <text x="273" y="172" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#1E2226">1 mm</text>
          {/* gap indicator lines */}
          <path d="M 200 186 h 14 M 200 192 h 14" stroke="var(--warn)" strokeWidth="2" strokeLinecap="round" />

          {/* torque badge */}
          <rect x="222" y="104" width="84" height="22" rx="6" fill="var(--accent)" />
          <text x="264" y="119" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">47.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
