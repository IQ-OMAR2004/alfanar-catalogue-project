// GIS Case 1 — Step 23: "Install the zeolite & close the S3 tank — 20 minutes"
// A zeolite sack sits on a digital scale (weight readout), then the bag drops
// into the aluminium housing and the tank cover swings shut. A prominent "20
// min" countdown badge (var(--warn)) and a cross-pattern torque staging
// 30 -> 60 -> 100%. Warning triangle. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A zeolite bag weighed on a digital scale then placed into the aluminium housing before the tank cover swings shut within twenty minutes"
    >
      <style>{`
        .c1s23-stage[data-paused] * { animation-play-state: paused !important; }

        /* zeolite bag lifts off the scale, moves over the housing and drops in */
        .c1s23-bag--anim { animation: c1s23-bag 5s ease-in-out infinite; }
        @keyframes c1s23-bag {
          0%,15%  { transform: translate(0,0); opacity: 1; }
          38%     { transform: translate(96px,-30px); opacity: 1; }
          52%     { transform: translate(150px,6px); opacity: 1; }
          58%,100%{ transform: translate(150px,6px); opacity: 0; }
        }
        /* cover swings shut after the bag is in */
        .c1s23-cover--anim { animation: c1s23-cover 5s ease-in-out infinite; transform-origin: 244px 66px; }
        @keyframes c1s23-cover {
          0%,58%  { transform: rotate(-78deg); }
          74%,100%{ transform: rotate(0deg); }
        }
        /* scale readout blinks while weighing */
        .c1s23-read--anim { animation: c1s23-read 5s steps(1) infinite; }
        @keyframes c1s23-read {
          0%,15%  { opacity: 1; }
          22%,100%{ opacity: 0.35; }
        }
        /* torque stage text cycles 30 -> 60 -> 100 */
        .c1s23-t1--anim { animation: c1s23-t 5s steps(1) infinite; }
        .c1s23-t2--anim { animation: c1s23-t 5s steps(1) infinite; animation-delay: 0s; }
        .c1s23-stage-lbl { opacity: 0.3; }
        .c1s23-warn--anim { animation: c1s23-warn 2s ease-in-out infinite; }
        @keyframes c1s23-warn {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
        /* countdown badge pulse */
        .c1s23-count--anim { animation: c1s23-count 1.5s ease-in-out infinite; }
        @keyframes c1s23-count {
          0%,100% { opacity: 0.8; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* warning triangle — 20 min window hazard */}
      <g className={anim('c1s23-warn')} transform="translate(296 22)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* prominent 20 min countdown badge (warn) */}
      <g className={anim('c1s23-count')} transform="translate(20 20)" style={reduced ? { opacity: 1 } : undefined}>
        <rect x="0" y="0" width="86" height="28" rx="8" fill="var(--warn)" />
        <circle cx="16" cy="14" r="7" fill="none" stroke="#1E2226" strokeWidth="2" />
        <path d="M 16 14 v -4 M 16 14 l 3 2" stroke="#1E2226" strokeWidth="2" strokeLinecap="round" />
        <text x="54" y="19" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#1E2226">20 min</text>
      </g>

      {/* ===== digital scale with zeolite bag (left) ===== */}
      <g transform="translate(40 150)">
        {/* scale platform */}
        <rect x="0" y="28" width="70" height="14" rx="3" fill="#3A3F44" stroke="#1E2226" strokeWidth="1.5" />
        <rect x="4" y="22" width="62" height="8" rx="2" fill="#6E767E" />
        {/* digital readout */}
        <rect x="72" y="24" width="30" height="18" rx="2" fill="#0B0D0E" stroke="#1E2226" strokeWidth="1.5" />
        <text className={anim('c1s23-read')} x="87" y="37" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#3FD46C" style={reduced ? { opacity: 1 } : undefined}>1.2 kg</text>
      </g>

      <g className="c1s23-stage" data-paused={paused ? '' : undefined}>
        {/* zeolite bag (moves from scale into the housing) */}
        <g className={anim('c1s23-bag')} style={reduced ? { transform: 'translate(0,0)' } : undefined}>
          <path d="M 52 156 q -6 -14 8 -16 l 20 0 q 14 2 8 16 l -4 16 q -2 6 -8 6 l -12 0 q -6 0 -8 -6 Z" fill="#E8E2CE" stroke="#B7AE8E" strokeWidth="2" />
          <rect x="58" y="140" width="24" height="6" rx="2" fill="#B7AE8E" />
          <text x="70" y="170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="#8A8368">ZEOLITE</text>
        </g>

        {/* ===== tank + aluminium housing + swinging cover (right) ===== */}
        <g transform="translate(180 90)">
          {/* tank body */}
          <rect x="0" y="18" width="128" height="104" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* aluminium housing opening (the bag drops here) */}
          <circle cx="34" cy="60" r="26" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
          <circle cx="34" cy="60" r="15" fill="#8F958D" stroke="#7C837B" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={34 + 21 * Math.cos((a * Math.PI) / 180)} cy={60 + 21 * Math.sin((a * Math.PI) / 180)} r="2.4" fill="#7C837B" />
          ))}

          {/* cover hinge point at 64,-24 (translated -> 244,66 origin) */}
          <g className={anim('c1s23-cover')} style={reduced ? { transform: 'rotate(0deg)' } : undefined}>
            <rect x="10" y="0" width="112" height="16" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
            {[18, 40, 62, 84, 106].map((cx) => (
              <circle key={cx} cx={cx} cy="8" r="2" fill="#9BA19A" />
            ))}
            {/* black O-ring under the cover rim */}
            <rect x="12" y="14" width="108" height="3" fill="#222" />
          </g>
          <circle cx="122" cy="-6" r="2.5" fill="#6E767E" />
        </g>
      </g>

      {/* cross-pattern torque staging 30 -> 60 -> 100% */}
      <g transform="translate(150 200)">
        <text className="c1s23-stage-lbl" x="0" y="0" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">30%</text>
        <text x="44" y="0" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)" opacity="0.55">60%</text>
        <text x="92" y="0" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)">100%</text>
      </g>
    </svg>
  )
}
