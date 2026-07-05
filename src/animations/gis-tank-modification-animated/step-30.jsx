// GIS Tank Modification — Step 30: "Fix the panel on the testing base & hand over to testing"
// Yellow crane girder with blue hoist lowers the complete panel on dashed
// chains onto the testing base frame; bolts pop in to fix it; warning triangle
// and a dashed keep-clear zone on the floor. ~6s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Crane lowering the finished panel onto the testing base, bolting it down; keep clear of the suspended load"
    >
      <style>{`
        .g30-stage[data-paused] * { animation-play-state: paused !important; }

        /* panel descends from the crane onto the testing base */
        .g30-lift--anim { animation: g30-lift 6s ease-in-out infinite; }
        @keyframes g30-lift {
          0%       { transform: translateY(-54px); }
          10%      { transform: translateY(-54px); }
          48%,100% { transform: translateY(0); }
        }
        /* chains shorten with the descent (same translate, drawn from hook) */
        .g30-chain--anim { animation: g30-chain 6s ease-in-out infinite; }
        @keyframes g30-chain {
          0%,10%   { transform: scaleY(0.55); }
          48%,100% { transform: scaleY(1); }
        }
        /* fixing bolts pop in after landing */
        .g30-bolt--anim { animation: g30-bolt 6s ease-in-out infinite; }
        @keyframes g30-bolt {
          0%,54%   { opacity: 0; transform: scale(0.2); }
          62%,100% { opacity: 1; transform: scale(1); }
        }
        /* keep-clear zone pulses while the load is in the air */
        .g30-zone--anim { animation: g30-zone 6s ease-in-out infinite; }
        @keyframes g30-zone {
          0%,8%    { opacity: 0.85; }
          24%      { opacity: 0.3; }
          40%      { opacity: 0.85; }
          52%,100% { opacity: 0.15; }
        }
        /* handover tick at the very end */
        .g30-ok--anim { animation: g30-ok 6s ease-in-out infinite; }
        @keyframes g30-ok {
          0%,72%   { opacity: 0; transform: scale(0.5); }
          80%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== crane girder (yellow) + blue hoist trolley ===== */}
      <rect x="0" y="14" width="320" height="12" fill="#F2B826" stroke="#B98D12" strokeWidth="1.5" />
      <g>
        <rect x="138" y="26" width="44" height="16" rx="3" fill="#2C6FB4" stroke="#1E4E80" strokeWidth="2" />
        <circle cx="148" cy="26" r="4" fill="#6E767E" />
        <circle cx="172" cy="26" r="4" fill="#6E767E" />
      </g>

      {/* ===== testing base frame (fixed on the floor) ===== */}
      <g>
        <rect x="106" y="196" width="108" height="14" fill="#6E767E" stroke="#2B2F33" strokeWidth="2" />
        <rect x="112" y="210" width="12" height="6" fill="#2B2F33" />
        <rect x="196" y="210" width="12" height="6" fill="#2B2F33" />
        {/* base holes */}
        <circle cx="120" cy="203" r="2.5" fill="#2B2F33" />
        <circle cx="200" cy="203" r="2.5" fill="#2B2F33" />
      </g>

      <g className="g30-stage" data-paused={paused ? '' : undefined}>
        {/* ===== chains from hoist (dashed, scale with descent) ===== */}
        <g
          className={anim('g30-chain')}
          style={reduced ? undefined : { transformOrigin: '160px 42px' }}
        >
          <line x1="160" y1="42" x2="160" y2="58" stroke="#5A6068" strokeWidth="3" />
          <line x1="160" y1="58" x2="126" y2="86" stroke="#5A6068" strokeWidth="2.5" strokeDasharray="4 3" />
          <line x1="160" y1="58" x2="194" y2="86" stroke="#5A6068" strokeWidth="2.5" strokeDasharray="4 3" />
        </g>

        {/* ===== the complete panel being lowered ===== */}
        <g className={anim('g30-lift')} style={reduced ? undefined : undefined}>
          <rect x="122" y="84" width="76" height="112" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* upper LV box */}
          <rect x="127" y="90" width="66" height="22" fill="#C2C6BF" stroke="#7C837B" strokeWidth="1.8" />
          <circle cx="135" cy="97" r="2.5" fill="#C0392B" />
          <circle cx="144" cy="97" r="2.5" fill="#C0392B" />
          {/* mid bolted cover + studs */}
          <rect x="128" y="118" width="64" height="40" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.8" />
          <g fill="#9BA19A">
            {[124, 138, 152].map((y) => (
              <circle key={'a' + y} cx="132" cy={y} r="1.8" />
            ))}
            {[124, 138, 152].map((y) => (
              <circle key={'b' + y} cx="188" cy={y} r="1.8" />
            ))}
          </g>
          {/* two CT terminal plates */}
          <circle cx="143" cy="178" r="11" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.8" />
          <circle cx="177" cy="178" r="11" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.8" />
          {/* lifting lugs */}
          <circle cx="126" cy="86" r="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
          <circle cx="194" cy="86" r="3" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
        </g>

        {/* ===== fixing bolts panel → base ===== */}
        {[120, 200].map((x) => (
          <g key={x} className={anim('g30-bolt')} style={reduced ? { opacity: 1 } : { transformOrigin: `${x}px 200px` }}>
            <circle cx={x} cy="200" r="4" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
            <path d={`M ${x - 2.5} 200 h 5 M ${x} 197.5 v 5`} stroke="#6E767E" strokeWidth="1.2" />
          </g>
        ))}

        {/* ===== keep-clear dashed zone on the floor ===== */}
        <g className={anim('g30-zone')} style={reduced ? { opacity: 0.4 } : undefined}>
          <rect x="70" y="188" width="180" height="34" rx="6" fill="none" stroke="var(--warn)" strokeWidth="2.5" strokeDasharray="8 6" />
        </g>

        {/* ===== warning triangle (suspended load) ===== */}
        <g>
          <path d="M 288 40 l 16 27 h -32 Z" fill="var(--warn)" stroke="#7A5A00" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="288" y1="50" x2="288" y2="59" stroke="#2B2F33" strokeWidth="3" strokeLinecap="round" />
          <circle cx="288" cy="63.5" r="1.8" fill="#2B2F33" />
        </g>

        {/* ===== handover tick ===== */}
        <g className={anim('g30-ok')} style={reduced ? { opacity: 0 } : { transformOrigin: '52px 120px' }}>
          <circle cx="52" cy="120" r="12" fill="#2E9E5B" />
          <path d="M 46 120 l 4 4.5 l 8 -9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
