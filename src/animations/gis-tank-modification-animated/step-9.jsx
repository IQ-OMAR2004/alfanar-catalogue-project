// GIS Tank Modification — Step 9: "Fill the tank with SF6 gas"
// Orange SF6 gas machine filling the tank: gas flow pulses along the hose INTO
// the tank, gauge needle rises and stops at the "0.05 MPa" badge. Warning
// triangle — do not exceed the filling pressure. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Orange SF6 gas machine filling the tank through a hose; gauge rising and stopping at 0.05 megapascal"
    >
      <style>{`
        .g9-stage[data-paused] * { animation-play-state: paused !important; }

        /* gauge needle rises from empty and stops exactly at the green mark */
        .g9-needle--anim { animation: g9-needle 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g9-needle {
          0%       { transform: rotate(-70deg); }
          55%,88%  { transform: rotate(20deg); }
          100%     { transform: rotate(-70deg); }
        }
        /* gas flow pulses along the hose toward the tank */
        .g9-flow--anim { animation: g9-flow 1.2s linear infinite; }
        @keyframes g9-flow {
          0%   { stroke-dashoffset: 28; }
          100% { stroke-dashoffset: 0; }
        }
        /* gas cloud puffs inside the tank as it fills */
        .g9-gas--anim { animation: g9-gas 4.5s ease-in-out infinite; }
        @keyframes g9-gas {
          0%       { opacity: 0; }
          50%,88%  { opacity: 0.45; }
          100%     { opacity: 0; }
        }
        /* filling selector lamp blink */
        .g9-run--anim { animation: g9-run 1.2s ease-in-out infinite; }
        @keyframes g9-run {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 1; }
        }
        /* pressure badge locks in when the needle stops */
        .g9-val--anim { animation: g9-val 4.5s ease-in-out infinite; }
        @keyframes g9-val {
          0%,50%   { opacity: 0.3; }
          60%,90%  { opacity: 1; }
          100%     { opacity: 0.3; }
        }
        .g9-warn--anim { animation: g9-warn 2.25s ease-in-out infinite; }
        @keyframes g9-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* warning triangle — do not exceed 0.05 MPa */}
      <g className={anim('g9-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== closed tank (left) ===== */}
      <g transform="translate(24 52)">
        <rect x="0" y="0" width="110" height="160" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="8" y="8" width="94" height="14" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[16, 34, 52, 70, 88].map((cx) => (
          <circle key={cx} cx={cx + 2} cy="15" r="2" fill="#9BA19A" />
        ))}
        <rect x="14" y="34" width="82" height="64" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[22, 42, 62, 82].map((cx) => (
          <circle key={cx} cx={cx + 4} cy="39" r="2" fill="#9BA19A" />
        ))}
        {[22, 42, 62, 82].map((cx) => (
          <circle key={'b' + cx} cx={cx + 4} cy="93" r="2" fill="#9BA19A" />
        ))}
        <circle cx="36" cy="128" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        <circle cx="76" cy="128" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={'l' + a} cx={36 + 12 * Math.cos((a * Math.PI) / 180)} cy={128 + 12 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
        ))}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={'r' + a} cx={76 + 12 * Math.cos((a * Math.PI) / 180)} cy={128 + 12 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
        ))}
        {/* filling valve fitting */}
        <rect x="108" y="52" width="14" height="10" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.8" />
        {/* SF6 label */}
        <rect x="20" y="44" width="28" height="11" rx="1.5" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
        <rect x="20" y="44" width="4" height="11" fill="#0A82C6" />
        <text x="36" y="53" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#1E2226">SF6</text>
      </g>

      {/* ===== orange SF6 gas machine (right) ===== */}
      <g transform="translate(196 90)">
        <rect x="0" y="0" width="100" height="98" rx="6" fill="#E0701F" stroke="#B85812" strokeWidth="2.5" />
        <rect x="0" y="72" width="100" height="26" rx="4" fill="#B85812" />
        <path d="M 98 4 q 16 -8 16 -26" fill="none" stroke="#B85812" strokeWidth="5" strokeLinecap="round" />
        {/* black control panel with selector on "FILL" */}
        <rect x="10" y="44" width="80" height="26" rx="3" fill="#1E2226" stroke="#111417" strokeWidth="1.5" />
        {/* selector knob rotated to fill */}
        <g transform="translate(24 57)">
          <circle cx="0" cy="0" r="7" fill="#2B2F33" stroke="#0B0D0E" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="5" y2="-4" stroke="#E0701F" strokeWidth="2.4" strokeLinecap="round" />
          <text x="0" y="17" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="#9BA19A">FILL</text>
        </g>
        <g className={anim('g9-run')} style={reduced ? { opacity: 1 } : undefined}>
          <circle cx="46" cy="57" r="3.4" fill="#3FD46C" />
        </g>
        {/* small red / green switches */}
        <rect x="58" y="52" width="8" height="9" rx="1.5" fill="#C0392B" />
        <rect x="72" y="52" width="8" height="9" rx="1.5" fill="#3FD46C" />
        {/* wheels */}
        <circle cx="18" cy="108" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="82" cy="108" r="10" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
        <circle cx="18" cy="108" r="3" fill="#AEB4B9" />
        <circle cx="82" cy="108" r="3" fill="#AEB4B9" />

        {/* gauge on top, needle rising into green zone */}
        <g transform="translate(50 12)">
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
          {/* green stop zone around +20deg */}
          <path d="M 4 -4.6 A 19 19 0 0 1 12.5 -0.3" fill="none" stroke="#2E9E4F" strokeWidth="3.5" />
          <g transform="translate(0 14)">
            <g className={anim('g9-needle')} style={reduced ? { transform: 'rotate(20deg)' } : undefined}>
              <line x1="0" y1="2" x2="0" y2="-16" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            <circle cx="0" cy="0" r="2.6" fill="#2B2F33" />
          </g>
        </g>
      </g>

      <g className="g9-stage" data-paused={paused ? '' : undefined}>
        {/* gas filling the tank interior (soft cloud behind the cover) */}
        <g className={anim('g9-gas')} style={reduced ? { opacity: 0.35 } : undefined}>
          <ellipse cx="79" cy="130" rx="42" ry="24" fill="#8FD0E8" />
          <ellipse cx="70" cy="86" rx="34" ry="18" fill="#8FD0E8" opacity="0.7" />
        </g>

        {/* black hose from machine to tank valve */}
        <path d="M 196 134 q -24 12 -50 -22" fill="none" stroke="#26292C" strokeWidth="7" strokeLinecap="round" />
        {/* gas flow pulses toward the tank */}
        <path className={anim('g9-flow')} d="M 196 134 q -24 12 -50 -22" fill="none" stroke="#8FD0E8" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="6 8" style={reduced ? { opacity: 0.5 } : undefined} />

        {/* pressure badge */}
        <g className={anim('g9-val')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="106" y="26" width="112" height="26" rx="7" fill="var(--accent)" />
          <text x="162" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">0.05 MPa</text>
          <path d="M 200 52 q 26 10 40 26" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      </g>
    </svg>
  )
}
