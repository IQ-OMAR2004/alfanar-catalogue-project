// GIS Tank Modification — Step 8: "Perform the vacuum process"
// Orange vacuum machine cart connected by a black hose to the closed tank; the
// gauge needle drops as the tank evacuates, mono readout "0.8 mbar". Warning
// triangle: certified personnel only. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Orange vacuum machine cart evacuating the tank through a black hose; gauge needle falling to 0.8 millibar"
    >
      <style>{`
        .g8-stage[data-paused] * { animation-play-state: paused !important; }

        /* gauge needle sweeps down from atmosphere to deep vacuum and holds */
        .g8-needle--anim { animation: g8-needle 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g8-needle {
          0%       { transform: rotate(72deg); }
          55%,88%  { transform: rotate(-64deg); }
          100%     { transform: rotate(72deg); }
        }
        /* extraction flow: dashes travel along the hose from tank to machine */
        .g8-flow--anim { animation: g8-flow 1.4s linear infinite; }
        @keyframes g8-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 28; }
        }
        /* machine running lamp blink */
        .g8-run--anim { animation: g8-run 1.4s ease-in-out infinite; }
        @keyframes g8-run {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 1; }
        }
        /* readout appears as target reached */
        .g8-val--anim { animation: g8-val 4.5s ease-in-out infinite; }
        @keyframes g8-val {
          0%,50%   { opacity: 0.25; }
          60%,90%  { opacity: 1; }
          100%     { opacity: 0.25; }
        }
        .g8-warn--anim { animation: g8-warn 2.25s ease-in-out infinite; }
        @keyframes g8-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* warning triangle — certified personnel only */}
      <g className={anim('g8-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== closed ALFA-G tank (left) ===== */}
      <g transform="translate(24 52)">
        <rect x="0" y="0" width="110" height="160" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* bolted top cover with studs */}
        <rect x="8" y="8" width="94" height="14" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[16, 34, 52, 70, 88].map((cx) => (
          <circle key={cx} cx={cx + 2} cy="15" r="2" fill="#9BA19A" />
        ))}
        {/* big bolted side cover */}
        <rect x="14" y="34" width="82" height="64" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[22, 42, 62, 82].map((cx) => (
          <circle key={cx} cx={cx + 4} cy="39" r="2" fill="#9BA19A" />
        ))}
        {[22, 42, 62, 82].map((cx) => (
          <circle key={'b' + cx} cx={cx + 4} cy="93" r="2" fill="#9BA19A" />
        ))}
        {/* two round CT terminal plates */}
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

      {/* ===== orange vacuum machine cart (right) ===== */}
      <g transform="translate(196 96)">
        {/* cart body */}
        <rect x="0" y="0" width="100" height="92" rx="6" fill="#E0701F" stroke="#B85812" strokeWidth="2.5" />
        <rect x="0" y="66" width="100" height="26" rx="4" fill="#B85812" />
        {/* handle bar */}
        <path d="M 98 4 q 16 -8 16 -26" fill="none" stroke="#B85812" strokeWidth="5" strokeLinecap="round" />
        {/* black front panel */}
        <rect x="10" y="42" width="80" height="22" rx="3" fill="#1E2226" stroke="#111417" strokeWidth="1.5" />
        {/* switches + run lamp */}
        <circle cx="22" cy="53" r="3.4" fill="#C0392B" />
        <rect x="32" y="49" width="8" height="8" rx="1.5" fill="#3FD46C" />
        <g className={anim('g8-run')} style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="52" cy="53" r="3.4" fill="#3FD46C" />
        </g>
        {/* mono readout on panel */}
        <g className={anim('g8-val')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="60" y="46" width="26" height="14" rx="2" fill="#0B0D0E" />
          <text x="73" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#3FD46C">0.8</text>
        </g>
        {/* wheels */}
        <circle cx="18" cy="102" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="82" cy="102" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="18" cy="102" r="3" fill="#AEB4B9" />
        <circle cx="82" cy="102" r="3" fill="#AEB4B9" />

        {/* ===== gauge dial on top of the machine ===== */}
        <g transform="translate(50 12)">
          <circle cx="0" cy="14" r="22" fill="#EDEFEA" stroke="#6E767E" strokeWidth="2.5" />
          {/* scale ticks */}
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
          {/* green target zone at the low end */}
          <path d="M -17 4 A 19 19 0 0 0 -6 -4" fill="none" stroke="#2E9E4F" strokeWidth="3.5" />
          <g transform="translate(0 14)">
            <g className={anim('g8-needle')} style={reduced ? { transform: 'rotate(-64deg)' } : undefined}>
              <line x1="0" y1="2" x2="0" y2="-16" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            <circle cx="0" cy="0" r="2.6" fill="#2B2F33" />
          </g>
        </g>
      </g>

      <g className="g8-stage" data-paused={paused ? '' : undefined}>
        {/* black hose from tank valve to machine */}
        <path d="M 146 110 q 26 34 50 22" fill="none" stroke="#26292C" strokeWidth="7" strokeLinecap="round" />
        {/* extraction flow dashes (moving toward the machine) */}
        <path className={anim('g8-flow')} d="M 146 110 q 26 34 50 22" fill="none" stroke="#8FA6B3" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="6 8" style={reduced ? { opacity: 0.5 } : undefined} />

        {/* target value badge */}
        <g className={anim('g8-val')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="112" y="26" width="104" height="26" rx="7" fill="var(--accent)" />
          <text x="164" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">0.8 mbar</text>
          <path d="M 164 52 v 14" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      </g>
    </svg>
  )
}
