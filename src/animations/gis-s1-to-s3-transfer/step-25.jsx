// GIS Case 1 — Step 25: "Fill the tank with SF6 gas"
// Orange SF6 gas machine fills the grey S3 tank; gas pulses travel along the
// black hose INTO the tank; the gauge needle rises to the rated filling
// pressure. Warning triangle: SF6 hazard, do not exceed rated pressure.
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
      aria-label="Orange SF6 gas machine filling the tank through a black hose; gas pulses flow into the tank and the gauge needle rises to the rated filling pressure"
    >
      <style>{`
        .c1s25-stage[data-paused] * { animation-play-state: paused !important; }

        /* gauge needle rises from empty up to the rated pressure and holds */
        .c1s25-needle--anim { animation: c1s25-needle 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes c1s25-needle {
          0%       { transform: rotate(-70deg); }
          55%,88%  { transform: rotate(58deg); }
          100%     { transform: rotate(-70deg); }
        }
        /* gas pulses travel from machine into the tank */
        .c1s25-flow--anim { animation: c1s25-flow 1.2s linear infinite; }
        @keyframes c1s25-flow {
          0%   { stroke-dashoffset: 28; }
          100% { stroke-dashoffset: 0; }
        }
        /* gas cloud swells inside the tank as it fills */
        .c1s25-gas--anim { animation: c1s25-gas 4.5s ease-in-out infinite; }
        @keyframes c1s25-gas {
          0%      { opacity: 0.1; transform: scale(0.6); }
          55%,88% { opacity: 0.5; transform: scale(1); }
          100%    { opacity: 0.1; transform: scale(0.6); }
        }
        .c1s25-run--anim { animation: c1s25-run 1.2s ease-in-out infinite; }
        @keyframes c1s25-run {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 1; }
        }
        .c1s25-val--anim { animation: c1s25-val 4.5s ease-in-out infinite; }
        @keyframes c1s25-val {
          0%,50%   { opacity: 0.25; }
          60%,90%  { opacity: 1; }
          100%     { opacity: 0.25; }
        }
        .c1s25-warn--anim { animation: c1s25-warn 2.25s ease-in-out infinite; }
        @keyframes c1s25-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* warning triangle — SF6 / do not exceed rated pressure */}
      <g className={anim('c1s25-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== closed grey S3 tank (left) ===== */}
      <g transform="translate(24 52)">
        <rect x="0" y="0" width="110" height="160" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="8" y="8" width="94" height="14" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[16, 34, 52, 70, 88].map((cx) => (
          <circle key={cx} cx={cx + 2} cy="15" r="2" fill="#9BA19A" />
        ))}
        <rect x="14" y="34" width="82" height="64" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {/* swelling SF6 gas cloud inside the tank */}
        <g style={{ transformOrigin: '55px 66px' }}>
          <ellipse className={anim('c1s25-gas')} cx="55" cy="66" rx="34" ry="24" fill="#9FD8A8" style={reduced ? { opacity: 0.4 } : undefined} />
        </g>
        {[22, 42, 62, 82].map((cx) => (
          <circle key={cx} cx={cx + 4} cy="39" r="2" fill="#9BA19A" />
        ))}
        <circle cx="36" cy="128" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        <circle cx="76" cy="128" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={'l' + a} cx={36 + 12 * Math.cos((a * Math.PI) / 180)} cy={128 + 12 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
        ))}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={'r' + a} cx={76 + 12 * Math.cos((a * Math.PI) / 180)} cy={128 + 12 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
        ))}
        {/* DN8 valve fitting on the side */}
        <rect x="108" y="52" width="14" height="10" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.8" />
      </g>

      {/* ===== orange SF6 gas machine cart (right) ===== */}
      <g transform="translate(196 96)">
        <rect x="0" y="0" width="100" height="92" rx="6" fill="#E0701F" stroke="#B85812" strokeWidth="2.5" />
        <rect x="0" y="66" width="100" height="26" rx="4" fill="#B85812" />
        <path d="M 98 4 q 16 -8 16 -26" fill="none" stroke="#B85812" strokeWidth="5" strokeLinecap="round" />
        {/* SF6 cylinder strapped to the cart */}
        <rect x="-14" y="24" width="16" height="60" rx="7" fill="#9BA19A" stroke="#6E767E" strokeWidth="2" />
        <rect x="-13" y="18" width="14" height="10" rx="3" fill="#6E767E" />
        <text x="-6" y="58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#3A3F44" transform="rotate(-90 -6 58)">SF6</text>
        {/* black control panel */}
        <rect x="10" y="42" width="80" height="22" rx="3" fill="#1E2226" stroke="#111417" strokeWidth="1.5" />
        <circle cx="22" cy="53" r="3.4" fill="#C0392B" />
        <g className={anim('c1s25-run')} style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="34" cy="53" r="3.4" fill="#3FD46C" />
        </g>
        {/* FILL selector */}
        <rect x="44" y="48" width="16" height="10" rx="2" fill="#E8C020" />
        <text x="52" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.5" fill="#1E2226">FILL</text>
        <circle cx="18" cy="102" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="82" cy="102" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="18" cy="102" r="3" fill="#AEB4B9" />
        <circle cx="82" cy="102" r="3" fill="#AEB4B9" />

        {/* ===== pressure gauge on top of the machine ===== */}
        <g transform="translate(56 12)">
          <circle cx="0" cy="14" r="22" fill="#EDEFEA" stroke="#6E767E" strokeWidth="2.5" />
          {[-64, -32, 0, 32, 64].map((a) => (
            <line
              key={a}
              x1={16 * Math.sin((a * Math.PI) / 180)}
              y1={14 - 16 * Math.cos((a * Math.PI) / 180)}
              x2={19 * Math.sin((a * Math.PI) / 180)}
              y2={14 - 19 * Math.cos((a * Math.PI) / 180)}
              stroke="#6E767E"
              strokeWidth="1.6"
            />
          ))}
          {/* green rated-pressure zone at the high end */}
          <path d="M 6 -4 A 19 19 0 0 1 17 4" fill="none" stroke="#2E9E4F" strokeWidth="3.5" />
          <g transform="translate(0 14)">
            <g className={anim('c1s25-needle')} style={reduced ? { transform: 'rotate(58deg)' } : undefined}>
              <line x1="0" y1="2" x2="0" y2="-16" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            <circle cx="0" cy="0" r="2.6" fill="#2B2F33" />
          </g>
        </g>
      </g>

      <g className="c1s25-stage" data-paused={paused ? '' : undefined}>
        {/* black hose from machine to tank valve */}
        <path d="M 146 110 q 26 34 50 22" fill="none" stroke="#26292C" strokeWidth="7" strokeLinecap="round" />
        {/* gas flow dashes (moving toward the tank) */}
        <path className={anim('c1s25-flow')} d="M 146 110 q 26 34 50 22" fill="none" stroke="#9FD8A8" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="6 8" style={reduced ? { opacity: 0.55 } : undefined} />

        {/* rated filling-pressure badge */}
        <g className={anim('c1s25-val')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="108" y="24" width="112" height="26" rx="7" fill="var(--accent)" />
          <path d="M 122 43 v -8 l -3 3 m 3 -3 l 3 3" fill="none" stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="138" y="43" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">rated P</text>
          <path d="M 164 50 v 12" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      </g>
    </svg>
  )
}
