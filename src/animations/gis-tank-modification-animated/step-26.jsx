// GIS Tank Modification — Step 26: "Apply the VCB & manometer labels"
// Front of the ALFA-G panel: a "VCB" label is applied at the breaker position,
// then a small label is placed beside the round manometer window; a squeegee
// smooths each label flat. ~5s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="VCB label applied at the breaker position and a manometer label beside the gauge window, smoothed with a squeegee"
    >
      <style>{`
        .g26-stage[data-paused] * { animation-play-state: paused !important; }

        /* VCB label presses on first */
        .g26-vcb--anim { animation: g26-vcb 5s ease-in-out infinite; }
        @keyframes g26-vcb {
          0%       { transform: translateY(-20px); opacity: 0; }
          10%,100% { transform: translateY(0); opacity: 1; }
        }
        /* squeegee sweep across the VCB label */
        .g26-sq1--anim { animation: g26-sq1 5s ease-in-out infinite; }
        @keyframes g26-sq1 {
          0%,12%   { transform: translate(0,0); opacity: 0; }
          16%      { transform: translate(0,0); opacity: 1; }
          30%      { transform: translate(46px,0); opacity: 1; }
          36%,100% { transform: translate(52px,0); opacity: 0; }
        }
        /* manometer label presses on second */
        .g26-mano--anim { animation: g26-mano 5s ease-in-out infinite; }
        @keyframes g26-mano {
          0%,40%   { transform: translateY(-20px); opacity: 0; }
          50%,100% { transform: translateY(0); opacity: 1; }
        }
        .g26-sq2--anim { animation: g26-sq2 5s ease-in-out infinite; }
        @keyframes g26-sq2 {
          0%,52%   { transform: translate(0,0); opacity: 0; }
          56%      { transform: translate(0,0); opacity: 1; }
          70%      { transform: translate(34px,0); opacity: 1; }
          76%,100% { transform: translate(40px,0); opacity: 0; }
        }
        /* final level-check tick */
        .g26-check--anim { animation: g26-check 5s ease-in-out infinite; }
        @keyframes g26-check {
          0%,78%   { opacity: 0; transform: scale(0.5); }
          84%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== tall ALFA-G panel, front view ===== */}
      <g>
        {/* body */}
        <rect x="115" y="24" width="90" height="190" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* top bushing housing */}
        <rect x="140" y="16" width="40" height="10" fill="#C2C6BF" stroke="#7C837B" strokeWidth="1.5" />
        <circle cx="160" cy="21" r="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.2" />
        {/* upper LV box */}
        <rect x="122" y="32" width="76" height="34" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        <circle cx="132" cy="42" r="3" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />
        <circle cx="142" cy="42" r="3" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />
        <circle cx="188" cy="56" r="3.5" fill="#1E2226" />
        {/* manometer round window (right of mid tank) */}
        <circle cx="188" cy="92" r="10" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        <path d="M 188 92 L 193 86" stroke="#2B2F33" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 181 87 A 9 9 0 0 1 195 87" fill="none" stroke="#2E9E5B" strokeWidth="2.5" />
        {/* mid tank bolted cover with stud row */}
        <rect x="124" y="74" width="52" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        <g fill="#9BA19A">
          {[80, 96, 112, 128, 140].map((y) => (
            <circle key={'a' + y} cx="128" cy={y} r="2" />
          ))}
          {[80, 96, 112, 128, 140].map((y) => (
            <circle key={'b' + y} cx="172" cy={y} r="2" />
          ))}
        </g>
        {/* lower section — two round CT terminal plates */}
        {[140, 180].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="176" r="16" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <circle
                key={deg}
                cx={cx + 12 * Math.cos((deg * Math.PI) / 180)}
                cy={176 + 12 * Math.sin((deg * Math.PI) / 180)}
                r="1.6"
                fill="#A9AEA6"
              />
            ))}
            <circle cx={cx} cy="176" r="4" fill="#C8CCC9" stroke="#8A9089" strokeWidth="1" />
          </g>
        ))}
        {/* bottom strip + feet */}
        <rect x="115" y="202" width="90" height="8" fill="#A9AEA6" />
        <rect x="120" y="210" width="10" height="5" fill="#6E767E" />
        <rect x="190" y="210" width="10" height="5" fill="#6E767E" />
      </g>

      <g className="g26-stage" data-paused={paused ? '' : undefined}>
        {/* ===== VCB label at the breaker position (mid cover) ===== */}
        <g className={anim('g26-vcb')} style={reduced ? undefined : undefined}>
          <rect x="132" y="100" width="36" height="18" rx="2" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.2" />
          <rect x="132" y="100" width="36" height="4" fill="#0A82C6" />
          <text x="150" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#2B2F33">VCB</text>
        </g>
        {/* squeegee smoothing the VCB label */}
        <g className={anim('g26-sq1')} style={reduced ? { opacity: 0 } : undefined}>
          <g transform="translate(130 96)">
            <rect x="-2" y="0" width="6" height="26" rx="2" fill="#D8452B" stroke="#2B2F33" strokeWidth="1.2" />
            <rect x="4" y="8" width="12" height="6" rx="2" fill="#2B2F33" />
          </g>
        </g>

        {/* ===== small label beside the manometer window ===== */}
        <g className={anim('g26-mano')} style={reduced ? undefined : undefined}>
          <rect x="206" y="84" width="30" height="14" rx="2" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.2" />
          <rect x="206" y="84" width="30" height="3.5" fill="#C0392B" />
          <line x1="210" y1="93" x2="230" y2="93" stroke="#A9AEA6" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className={anim('g26-sq2')} style={reduced ? { opacity: 0 } : undefined}>
          <g transform="translate(204 80)">
            <rect x="-2" y="0" width="5" height="22" rx="2" fill="#D8452B" stroke="#2B2F33" strokeWidth="1.2" />
            <rect x="3" y="7" width="10" height="5" rx="2" fill="#2B2F33" />
          </g>
        </g>

        {/* accent arrows pointing at both label positions (static hints) */}
        <g stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
          <path d="M 96 109 h 26" />
          <path d="M 122 109 l -6 -4 M 122 109 l -6 4" />
        </g>

        {/* ===== final tick ===== */}
        <g className={anim('g26-check')} style={reduced ? { opacity: 0 } : { transformOrigin: '262px 146px' }}>
          <circle cx="262" cy="146" r="11" fill="#2E9E5B" />
          <path d="M 257 146 l 3.5 4 l 7 -8" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
