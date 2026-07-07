// Case 1 — Step 11: "Scrap the empty S1 tank"
// The open, empty grey enclosure (internal flange rings with bolt-dot circles
// visible on the floor) rolls on a blue trolley toward the SCRAP area. A
// "gas-free ✓" badge and a warning triangle are shown. Loop ~4.6s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Empty grey enclosure on a blue trolley rolling toward the scrap area, gas-free confirmed, warning triangle shown"
    >
      <style>{`
        .c1s11-stage[data-paused] * { animation-play-state: paused !important; }
        /* whole trolley + empty tank rolls right toward SCRAP */
        .c1s11-roll--anim { animation: c1s11-roll 4.6s ease-in-out infinite; }
        @keyframes c1s11-roll {
          0%,8%    { transform: translate(0,0); }
          72%,100% { transform: translate(96px,0); }
        }
        .c1s11-wheel--anim { animation: c1s11-wheel 1.1s linear infinite; transform-origin: center; }
        @keyframes c1s11-wheel { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .c1s11-warn--anim { animation: c1s11-warn 2.3s ease-in-out infinite; }
        @keyframes c1s11-warn { 0%,100%{opacity:.65;} 50%{opacity:1;} }
        .c1s11-badge--anim { animation: c1s11-badge 4.6s ease-in-out infinite; }
        @keyframes c1s11-badge { 0%,10%{opacity:0;} 24%,100%{opacity:1;} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* warning triangle — confirm gas-free before scrapping */}
      <g className={anim('c1s11-warn')} transform="translate(24 30)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== SCRAP area (right) — yellow/red floor tape zone ===== */}
      <g transform="translate(236 96)">
        <rect x="0" y="0" width="72" height="118" rx="3" fill="#EDE7DA" stroke="#C0392B" strokeWidth="2" strokeDasharray="8 5" />
        {[6, 20, 34, 48, 62].map((sx) => (
          <line key={sx} x1={sx} y1="0" x2={sx + 10} y2="14" stroke="#F2B826" strokeWidth="3" />
        ))}
        <text x="36" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#C0392B">SCRAP</text>
      </g>

      <g className="c1s11-stage" data-paused={paused ? '' : undefined}>
        <g className={anim('c1s11-roll')} style={reduced ? { transform: 'translate(30px,0)' } : undefined}>
          {/* ===== blue trolley ===== */}
          <g transform="translate(40 150)">
            <rect x="0" y="30" width="150" height="14" rx="4" fill="#2C6FB4" stroke="#1F548C" strokeWidth="2" />
            <path d="M 150 34 q 18 0 18 -20" fill="none" stroke="#2C6FB4" strokeWidth="5" strokeLinecap="round" />
            <g className={anim('c1s11-wheel')} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="26" cy="52" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
              <line x1="26" y1="45" x2="26" y2="59" stroke="#6E767E" strokeWidth="2" />
            </g>
            <g className={anim('c1s11-wheel')} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="124" cy="52" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
              <line x1="124" y1="45" x2="124" y2="59" stroke="#6E767E" strokeWidth="2" />
            </g>
          </g>

          {/* ===== open empty grey enclosure (interior flange rings visible) ===== */}
          <g transform="translate(52 66)">
            <rect x="0" y="0" width="126" height="86" rx="5" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
            {/* dark hollow interior — it is empty */}
            <rect x="10" y="10" width="106" height="70" rx="3" fill="#8E948C" />
            <rect x="10" y="10" width="106" height="70" rx="3" fill="none" stroke="#6A706A" strokeWidth="1.5" />
            {/* internal flange rings on the floor, each a bolt-dot circle */}
            {[34, 63, 92].map((cx) => (
              <g key={cx} transform={`translate(${cx} 58)`}>
                <ellipse cx="0" cy="0" rx="14" ry="6" fill="#A9AEA6" stroke="#7C837B" strokeWidth="1.6" />
                <ellipse cx="0" cy="0" rx="6" ry="2.6" fill="#5A6058" />
                {[0, 60, 120, 180, 240, 300].map((a) => {
                  const rad = (a * Math.PI) / 180
                  return <circle key={a} cx={11 * Math.cos(rad)} cy={4.5 * Math.sin(rad)} r="1.2" fill="#6E767E" />
                })}
              </g>
            ))}
          </g>
        </g>

        {/* gas-free confirmation badge */}
        <g className={anim('c1s11-badge')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="110" y="24" width="106" height="26" rx="7" fill="var(--accent)" />
          <text x="163" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">gas-free ✓</text>
        </g>
      </g>
    </svg>
  )
}
