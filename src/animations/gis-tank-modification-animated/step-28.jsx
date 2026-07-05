// GIS Tank Modification — Step 28: "Hand over the panel to QC1"
// Finished tall ALFA-G panel; a walk-around highlight circles the panel while
// clipboard checklist ticks appear one by one; a "QC1" badge with a handover
// arrow closes the loop. ~5.5s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Walk-around check circling the finished panel, checklist ticks appearing, handover to QC1"
    >
      <style>{`
        .g28-stage[data-paused] * { animation-play-state: paused !important; }

        /* walk-around: a highlight dot orbits the panel on a dashed ellipse */
        .g28-orbit--anim { animation: g28-orbit 5.5s linear infinite; transform-origin: 128px 120px; }
        @keyframes g28-orbit {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* checklist ticks appear sequentially */
        .g28-tick--anim { animation: g28-tick 5.5s ease-in-out infinite; }
        @keyframes g28-tick {
          0%,10%   { opacity: 0; transform: scale(0.4); }
          16%,90%  { opacity: 1; transform: scale(1); }
          97%,100% { opacity: 0; transform: scale(0.4); }
        }
        /* QC1 badge + handover arrow at the end of the walk-around */
        .g28-qc--anim { animation: g28-qc 5.5s ease-in-out infinite; }
        @keyframes g28-qc {
          0%,62%   { opacity: 0; transform: translateX(-12px); }
          72%,92%  { opacity: 1; transform: translateX(0); }
          98%,100% { opacity: 0; transform: translateX(-12px); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== finished ALFA-G panel (front view, left of centre) ===== */}
      <g>
        <rect x="83" y="24" width="90" height="190" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="108" y="16" width="40" height="10" fill="#C2C6BF" stroke="#7C837B" strokeWidth="1.5" />
        <circle cx="128" cy="21" r="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.2" />
        {/* upper LV box */}
        <rect x="90" y="32" width="76" height="34" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
        <circle cx="100" cy="42" r="3" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />
        <circle cx="110" cy="42" r="3" fill="#C0392B" stroke="#7C837B" strokeWidth="1" />
        <circle cx="156" cy="56" r="3.5" fill="#1E2226" />
        {/* mid tank bolted cover with stud row */}
        <rect x="92" y="74" width="72" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        <g fill="#9BA19A">
          {[80, 96, 112, 128, 140].map((y) => (
            <circle key={'a' + y} cx="96" cy={y} r="2" />
          ))}
          {[80, 96, 112, 128, 140].map((y) => (
            <circle key={'b' + y} cx="160" cy={y} r="2" />
          ))}
        </g>
        {/* labels already applied (from steps 25–26) */}
        <rect x="106" y="100" width="30" height="14" rx="2" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
        <rect x="106" y="100" width="30" height="3.5" fill="#0A82C6" />
        {/* two round CT terminal plates */}
        {[108, 148].map((cx) => (
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
        <rect x="83" y="202" width="90" height="8" fill="#A9AEA6" />
        <rect x="88" y="210" width="10" height="5" fill="#6E767E" />
        <rect x="158" y="210" width="10" height="5" fill="#6E767E" />
      </g>

      <g className="g28-stage" data-paused={paused ? '' : undefined}>
        {/* ===== walk-around highlight: dashed orbit + moving dot ===== */}
        <ellipse cx="128" cy="120" rx="72" ry="108" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="6 7" opacity="0.55" />
        <g className={anim('g28-orbit')} style={reduced ? undefined : undefined}>
          <circle cx="128" cy="12" r="6" fill="var(--accent)" opacity="0.95" />
          <circle cx="128" cy="12" r="10" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
        </g>

        {/* ===== clipboard checklist (right) ===== */}
        <g>
          <rect x="226" y="52" width="72" height="96" rx="5" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
          <rect x="248" y="46" width="28" height="12" rx="4" fill="#6E767E" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="236" y={70 + i * 24} width="12" height="12" rx="2" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
              <line x1="254" y1={76 + i * 24} x2="288" y2={76 + i * 24} stroke="#A9AEA6" strokeWidth="2.5" strokeLinecap="round" />
              <g
                className={anim('g28-tick')}
                style={
                  reduced
                    ? { opacity: 1 }
                    : { animationDelay: `${0.9 + i * 0.9}s`, transformOrigin: `${242}px ${76 + i * 24}px` }
                }
              >
                <path
                  d={`M 238 ${76 + i * 24} l 3 3.5 l 6 -7`}
                  fill="none" stroke="#2E9E5B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </g>
            </g>
          ))}
        </g>

        {/* ===== QC1 handover badge + arrow ===== */}
        <g className={anim('g28-qc')} style={reduced ? { opacity: 1 } : undefined}>
          <path d="M 214 176 h 34" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 248 176 l -8 -5 M 248 176 l -8 5" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="254" y="162" width="46" height="28" rx="6" fill="var(--accent)" />
          <text x="277" y="181" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--on-accent)">QC1</text>
        </g>
      </g>
    </svg>
  )
}
