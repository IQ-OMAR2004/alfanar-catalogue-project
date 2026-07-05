// GIS Tank Modification — Step 1: "Transfer the tank to the modification area"
// A grey ALFA-G tank on a red handling trolley rolls from the right toward the
// GIS modification area (yellow floor stripe). QC-passed tag on the tank; a
// warning triangle reminds the worker to keep his distance. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Grey GIS tank on a red handling trolley rolling to the modification area marked by a yellow floor line"
    >
      <style>{`
        .g1-stage[data-paused] * { animation-play-state: paused !important; }

        /* trolley + tank roll in from the right and settle in the marked area */
        .g1-roll--anim { animation: g1-roll 4.5s ease-in-out infinite; }
        @keyframes g1-roll {
          0%       { transform: translateX(96px); }
          55%,80%  { transform: translateX(0); }
          92%,100% { transform: translateX(96px); }
        }
        /* wheels spin while the trolley moves */
        .g1-wheel--anim { animation: g1-wheel 4.5s ease-in-out infinite; }
        @keyframes g1-wheel {
          0%       { transform: rotate(0deg); }
          55%      { transform: rotate(-540deg); }
          80%      { transform: rotate(-540deg); }
          100%     { transform: rotate(0deg); }
        }
        /* QC tag sways slightly with the motion */
        .g1-tag--anim { animation: g1-tag 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g1-tag {
          0%,100% { transform: rotate(8deg); }
          30%     { transform: rotate(-6deg); }
          60%     { transform: rotate(3deg); }
          80%     { transform: rotate(-2deg); }
        }
        /* destination marker pulses to show where the tank must go */
        .g1-dest--anim { animation: g1-dest 4.5s ease-in-out infinite; }
        @keyframes g1-dest {
          0%,45%   { opacity: 0.9; }
          60%,78%  { opacity: 0.2; }
          95%,100% { opacity: 0.9; }
        }
        /* warning triangle gentle pulse */
        .g1-warn--anim { animation: g1-warn 2.25s ease-in-out infinite; }
        @keyframes g1-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />

      {/* floor band + yellow GIS-area marking stripe */}
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="3" fill="#A9AEA6" />
      <rect x="14" y="216" width="120" height="6" rx="2" fill="#F2B826" />
      <text x="30" y="236" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">GIS AREA</text>

      {/* destination target brackets in the GIS area */}
      <g className={anim('g1-dest')} stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 26 206 v 6 h 10" />
        <path d="M 122 206 v 6 h -10" />
        <path d="M 26 132 v -6 h 10" />
        <path d="M 122 132 v -6 h -10" />
      </g>

      {/* warning triangle — keep distance during transfer */}
      <g className={anim('g1-warn')} transform="translate(288 28)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      <g className="g1-stage" data-paused={paused ? '' : undefined}>
        {/* ===== trolley + tank group (rolls right → left) ===== */}
        <g className={anim('g1-roll')}>
          {/* --- ALFA-G tank (mid section, side view: bolted covers) --- */}
          <g transform="translate(30 58)">
            <rect x="0" y="0" width="94" height="112" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
            {/* top flange strip */}
            <rect x="-3" y="-6" width="100" height="8" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
            {/* large bolted cover with stud row */}
            <rect x="10" y="12" width="74" height="56" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
            {[16, 30, 44, 58, 72].map((cx) => (
              <circle key={'t' + cx} cx={cx + 3} cy="17" r="2" fill="#9BA19A" />
            ))}
            {[16, 30, 44, 58, 72].map((cx) => (
              <circle key={'b' + cx} cx={cx + 3} cy="63" r="2" fill="#9BA19A" />
            ))}
            {[22, 40].map((cy) => (
              <g key={'s' + cy}>
                <circle cx="15" cy={cy + 6} r="2" fill="#9BA19A" />
                <circle cx="79" cy={cy + 6} r="2" fill="#9BA19A" />
              </g>
            ))}
            {/* two round CT terminal plates */}
            <g>
              <circle cx="30" cy="90" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
              <circle cx="64" cy="90" r="14" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <circle key={'p1' + a} cx={30 + 10 * Math.cos((a * Math.PI) / 180)} cy={90 + 10 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
              ))}
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <circle key={'p2' + a} cx={64 + 10 * Math.cos((a * Math.PI) / 180)} cy={90 + 10 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#A9AEA6" />
              ))}
            </g>
            {/* manufacturer label sticker */}
            <rect x="14" y="74" width="22" height="8" rx="1" fill="#FFFFFF" stroke="#8A9089" strokeWidth="0.8" />
            <rect x="14" y="74" width="4" height="8" fill="#0A82C6" />

            {/* --- QC passed tag hanging off the flange --- */}
            <g transform="translate(96 4)">
              <g className={anim('g1-tag')} style={reduced ? { transform: 'rotate(4deg)', transformOrigin: '0 0' } : undefined}>
                <line x1="0" y1="0" x2="4" y2="10" stroke="#6E767E" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="-6" y="10" width="22" height="30" rx="3" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
                <rect x="-6" y="10" width="22" height="7" rx="3" fill="#2E9E4F" />
                <circle cx="4" cy="14" r="1.8" fill="#FFFFFF" />
                <text x="4" y="27" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#2E9E4F" fontWeight="bold">QC</text>
                <path d="M 0 32 l 3 3.5 l 6 -7" fill="none" stroke="#2E9E4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          </g>

          {/* --- red handling trolley --- */}
          <g transform="translate(22 172)">
            <rect x="0" y="0" width="112" height="10" rx="3" fill="#D8452B" stroke="#8E2C1A" strokeWidth="2" />
            <rect x="6" y="10" width="8" height="14" fill="#B93A22" />
            <rect x="98" y="10" width="8" height="14" fill="#B93A22" />
            {/* push handle */}
            <path d="M 112 2 q 18 -4 20 -26" fill="none" stroke="#B93A22" strokeWidth="4" strokeLinecap="round" />
            {/* wheels with spokes (spin while rolling) */}
            <g transform="translate(16 32)">
              <g className={anim('g1-wheel')}>
                <circle cx="0" cy="0" r="9" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
                <circle cx="0" cy="0" r="3" fill="#AEB4B9" />
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#6E767E" strokeWidth="1.6" />
                <line x1="0" y1="-7" x2="0" y2="7" stroke="#6E767E" strokeWidth="1.6" />
              </g>
            </g>
            <g transform="translate(96 32)">
              <g className={anim('g1-wheel')}>
                <circle cx="0" cy="0" r="9" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
                <circle cx="0" cy="0" r="3" fill="#AEB4B9" />
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#6E767E" strokeWidth="1.6" />
                <line x1="0" y1="-7" x2="0" y2="7" stroke="#6E767E" strokeWidth="1.6" />
              </g>
            </g>
          </g>
        </g>

        {/* direction arrow toward the GIS area */}
        <g opacity="0.9">
          <path d="M 250 118 h -50" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 6" />
          <path d="M 208 110 l -12 8 l 12 8" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
