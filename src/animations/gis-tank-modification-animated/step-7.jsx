// GIS Tank Modification — Step 7: "Install the zeolite & close the cover — 20 min"
// Zeolite sack on a weighing scale reading "1.5 kg"; the bag moves into the
// filter case inside the cover, the cover swings shut. Prominent "20 min"
// countdown badge (warn) and cross-pattern torque "26.5 Nm". Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Zeolite bag weighed to 1.5 kg on a scale, placed into the cover filter case, cover closing within the 20 minute window"
    >
      <style>{`
        .g7-stage[data-paused] * { animation-play-state: paused !important; }

        /* zeolite bag lifts off the scale and travels into the filter case */
        .g7-bag--anim { animation: g7-bag 5s ease-in-out infinite; }
        @keyframes g7-bag {
          0%,14%   { transform: translate(0px, 0px); }
          30%      { transform: translate(66px, -66px); }
          46%,92%  { transform: translate(126px, -34px); }
          100%     { transform: translate(0px, 0px); opacity: 1; }
        }
        /* cover swings shut after the bag is inside (hinged at its right edge) */
        .g7-cover--anim { animation: g7-cover 5s ease-in-out infinite; transform-origin: 64px 0px; }
        @keyframes g7-cover {
          0%,48%   { transform: rotate(58deg); }
          70%,90%  { transform: rotate(0deg); }
          100%     { transform: rotate(58deg); }
        }
        /* countdown badge pulses urgently */
        .g7-count--anim { animation: g7-count 1.25s ease-in-out infinite; }
        @keyframes g7-count {
          0%,100% { opacity: 0.8; transform: scale(1); }
          50%     { opacity: 1; transform: scale(1.05); }
        }
        /* cross-pattern torque sequence flashes after closing */
        .g7-cross--anim { animation: g7-cross 5s ease-in-out infinite; }
        @keyframes g7-cross {
          0%,70%   { opacity: 0; }
          80%,94%  { opacity: 1; }
          100%     { opacity: 0; }
        }
        /* scale needle settles on 1.5 */
        .g7-needle--anim { animation: g7-needle 5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g7-needle {
          0%       { transform: rotate(-38deg); }
          8%       { transform: rotate(12deg); }
          12%,90%  { transform: rotate(0deg); }
          100%     { transform: rotate(-38deg); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="218" width="320" height="22" fill="#B9BDB6" />

      {/* ===== 20 min countdown badge (prominent, warn colour) ===== */}
      <g className={anim('g7-count')} style={reduced ? { opacity: 1 } : { transformOrigin: '252px 34px' }}>
        <rect x="196" y="16" width="112" height="36" rx="9" fill="var(--warn)" />
        {/* small clock icon */}
        <circle cx="216" cy="34" r="9" fill="none" stroke="#1E2226" strokeWidth="2.2" />
        <path d="M 216 29 v 5 l 4 3" fill="none" stroke="#1E2226" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="266" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="#1E2226" fontWeight="bold">20 min</text>
      </g>

      {/* ===== weighing scale with zeolite (left) ===== */}
      <g transform="translate(20 132)">
        {/* platform */}
        <rect x="0" y="46" width="84" height="10" rx="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
        {/* scale body */}
        <rect x="10" y="56" width="64" height="30" rx="4" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
        {/* mono readout */}
        <rect x="18" y="62" width="48" height="17" rx="2" fill="#1E2226" />
        <text x="42" y="74.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3FD46C">1.5 kg</text>
        {/* small dial with needle */}
        <g transform="translate(42 52)">
          <g className={anim('g7-needle')}>
            <line x1="0" y1="0" x2="0" y2="-7" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>
      </g>

      <g className="g7-stage" data-paused={paused ? '' : undefined}>
        {/* ===== zeolite sack (weigh → move to filter case) ===== */}
        <g transform="translate(62 148)">
          <g className={anim('g7-bag')} style={reduced ? { transform: 'translate(126px,-34px)' } : undefined}>
            {/* sack body */}
            <path d="M -18 4 q -3 -18 6 -24 q -2 -6 3 -8 h 18 q 5 2 3 8 q 9 6 6 24 q 1 14 -8 22 h -20 q -9 -8 -8 -22 Z" fill="#D9CBA8" stroke="#A8987A" strokeWidth="2" strokeLinejoin="round" />
            {/* tie at the neck */}
            <rect x="-8" y="-22" width="16" height="5" rx="2.5" fill="#8A7A58" />
            {/* texture stitches */}
            <path d="M -12 6 h 24 M -13 14 h 26" stroke="#C4B48D" strokeWidth="1.5" strokeLinecap="round" />
            <text x="0" y="12" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#6E5F42">ZEOLITE</text>
          </g>
        </g>

        {/* ===== tank opening + cover with filter case (right) ===== */}
        <g transform="translate(162 128)">
          {/* tank flange (open top) with stud row */}
          <rect x="0" y="24" width="128" height="12" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
          {[10, 36, 62, 88, 114].map((cx) => (
            <circle key={cx} cx={cx + 4} cy="30" r="2.2" fill="#9BA19A" />
          ))}
          {/* tank body below */}
          <rect x="6" y="36" width="116" height="76" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* O-ring groove */}
          <rect x="8" y="21" width="112" height="3" rx="1.5" fill="#222222" />

          {/* the cover, hinged at the right, swings shut */}
          <g transform="translate(64 20)">
            <g className={anim('g7-cover')} style={reduced ? { transform: 'rotate(0deg)', transformOrigin: '64px 0px' } : undefined}>
              {/* cover plate */}
              <rect x="-64" y="-10" width="128" height="10" rx="2" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2.5" />
              {[-54, -28, -2, 24, 50].map((cx) => (
                <circle key={cx} cx={cx} cy="-5" r="2.2" fill="#9BA19A" />
              ))}
              {/* filter case fixed under the cover (bag goes here) */}
              <rect x="-26" y="0" width="52" height="26" rx="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
              <path d="M -20 6 h 40 M -20 12 h 40 M -20 18 h 40" stroke="#6E767E" strokeWidth="1.4" opacity="0.7" />
              <text x="0" y="38" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#5B615A">FILTER</text>
            </g>
          </g>
        </g>

        {/* cross-pattern torque diagram + 26.5 Nm badge */}
        <g className={anim('g7-cross')} style={reduced ? { opacity: 1 } : undefined}>
          <g transform="translate(52 52)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#8A9089" strokeWidth="2" />
            {[[0, -22, '1'], [0, 22, '2'], [-22, 0, '3'], [22, 0, '4']].map(([x, y, n]) => (
              <g key={n}>
                <circle cx={x} cy={y} r="5" fill="var(--accent)" />
                <text x={x} y={Number(y) + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--on-accent)">{n}</text>
              </g>
            ))}
            <path d="M 0 -16 L 0 16 M -16 0 L 16 0" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="3 3" />
          </g>
          <rect x="14" y="86" width="78" height="20" rx="6" fill="var(--accent)" />
          <text x="53" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">26.5 Nm</text>
        </g>
      </g>
    </svg>
  )
}
