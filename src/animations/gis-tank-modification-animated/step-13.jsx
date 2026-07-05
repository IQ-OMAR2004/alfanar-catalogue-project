// GIS Tank Modification — Step 13: "Assemble & fix the LV box support"
// Loop: an L-shaped support bracket slides against the RAL-grey panel frame,
// a ratchet ("17 mm") spins the fixing bolt tight, and a spirit level sits on
// the bracket with its bubble settling to centre → green level-OK glow.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="LV box support bracket bolted to the panel frame, spirit level bubble settling to centre, 17 mm ratchet turning"
    >
      <style>{`
        .g13-stage[data-paused] * { animation-play-state: paused !important; }

        /* bracket eases onto the frame, then holds */
        .g13-bracket--anim { animation: g13-bracket 4s ease-in-out infinite; }
        @keyframes g13-bracket {
          0%       { transform: translateX(26px); }
          22%,100% { transform: translateX(0); }
        }

        /* ratchet handle sweeps back and forth on the bolt head */
        .g13-ratchet--anim { animation: g13-ratchet 4s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g13-ratchet {
          0%,22%  { transform: rotate(30deg); opacity: 0; }
          28%     { transform: rotate(30deg); opacity: 1; }
          42%     { transform: rotate(-25deg); }
          54%     { transform: rotate(22deg); }
          66%     { transform: rotate(-25deg); }
          78%     { transform: rotate(15deg); opacity: 1; }
          90%,100%{ transform: rotate(15deg); opacity: 0; }
        }

        /* spirit-level bubble drifts from left toward the centre marks */
        .g13-bubble--anim { animation: g13-bubble 4s ease-in-out infinite; }
        @keyframes g13-bubble {
          0%       { transform: translateX(-13px); }
          20%      { transform: translateX(-13px); }
          55%      { transform: translateX(4px); }
          70%,100% { transform: translateX(0); }
        }

        /* level-OK glow once the bubble is centred */
        .g13-ok--anim { animation: g13-ok 4s ease-in-out infinite; }
        @keyframes g13-ok {
          0%,70%   { opacity: 0; transform: scale(0.6); }
          80%      { opacity: 1; transform: scale(1.08); }
          90%      { opacity: 1; transform: scale(1); }
          97%,100% { opacity: 0; transform: scale(0.6); }
        }

        /* accent arrow pointing at the fixing point */
        .g13-arrow--anim { animation: g13-arrow 4s ease-in-out infinite; }
        @keyframes g13-arrow {
          0%,100% { transform: translateX(0); opacity: 0.9; }
          50%     { transform: translateX(-6px); opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      {/* floor band + yellow marking */}
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== ALFA-G panel, left-side crop (tall grey body, frame edge exposed) ===== */}
      {/* main panel body */}
      <rect x="28" y="20" width="92" height="194" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* top bushing housing */}
      <rect x="46" y="12" width="56" height="10" rx="3" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
      {/* upper LV box on the roof section */}
      <rect x="38" y="28" width="72" height="34" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2" />
      <circle cx="52" cy="40" r="3.4" fill="#1E2226" />
      <circle cx="66" cy="40" r="3.4" fill="#1E2226" />
      <circle cx="92" cy="40" r="3" fill="#C0392B" />
      <circle cx="101" cy="40" r="3" fill="#C0392B" />
      <rect x="46" y="50" width="40" height="6" rx="1.5" fill="#C2C6BF" stroke="#8A9089" strokeWidth="1" />
      {/* mid tank cover with perimeter studs */}
      <rect x="40" y="72" width="68" height="58" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="46" cy="78" r="2" /><circle cx="62" cy="78" r="2" /><circle cx="78" cy="78" r="2" /><circle cx="94" cy="78" r="2" /><circle cx="102" cy="78" r="2" />
        <circle cx="46" cy="124" r="2" /><circle cx="62" cy="124" r="2" /><circle cx="78" cy="124" r="2" /><circle cx="94" cy="124" r="2" /><circle cx="102" cy="124" r="2" />
        <circle cx="46" cy="94" r="2" /><circle cx="46" cy="110" r="2" />
        <circle cx="102" cy="94" r="2" /><circle cx="102" cy="110" r="2" />
      </g>
      {/* lower section: two round CT terminal plates */}
      <circle cx="56" cy="162" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
      <circle cx="94" cy="162" r="17" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
      <g fill="#A9AEA6">
        <circle cx="56" cy="148" r="1.8" /><circle cx="66" cy="152" r="1.8" /><circle cx="70" cy="162" r="1.8" /><circle cx="66" cy="172" r="1.8" />
        <circle cx="56" cy="176" r="1.8" /><circle cx="46" cy="172" r="1.8" /><circle cx="42" cy="162" r="1.8" /><circle cx="46" cy="152" r="1.8" />
        <circle cx="94" cy="148" r="1.8" /><circle cx="104" cy="152" r="1.8" /><circle cx="108" cy="162" r="1.8" /><circle cx="104" cy="172" r="1.8" />
        <circle cx="94" cy="176" r="1.8" /><circle cx="84" cy="172" r="1.8" /><circle cx="80" cy="162" r="1.8" /><circle cx="84" cy="152" r="1.8" />
      </g>
      {/* bottom bolted strip + feet */}
      <rect x="30" y="200" width="88" height="8" fill="#C2C6BF" stroke="#8A9089" strokeWidth="1.5" />
      <rect x="34" y="208" width="10" height="6" fill="#A9AEA6" />
      <rect x="104" y="208" width="10" height="6" fill="#A9AEA6" />

      {/* exposed frame rail on the right flank of the panel (fixing zone) */}
      <rect x="120" y="60" width="12" height="140" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="126" cy="76" r="2" /><circle cx="126" cy="112" r="2" /><circle cx="126" cy="148" r="2" /><circle cx="126" cy="184" r="2" />
      </g>

      <g className="g13-stage" data-paused={paused ? '' : undefined}>
        {/* ===== L-shaped LV box support bracket sliding onto the frame ===== */}
        <g className={a('g13-bracket', 'g13-bracket--anim')}>
          {/* vertical leg against the frame + horizontal shelf */}
          <path
            d="M 132 96 h 12 v 44 h 62 v 12 h -74 Z"
            fill="#AEB4B9" stroke="#6E767E" strokeWidth="2.5" strokeLinejoin="round"
          />
          {/* gusset */}
          <path d="M 144 140 l 22 0 l -22 -22 Z" fill="#9BA1A6" stroke="#6E767E" strokeWidth="1.5" />
          {/* fixing bolt head on the vertical leg */}
          <g transform="translate(138 112)">
            <circle r="5.5" fill="#6E767E" stroke="#2B2F33" strokeWidth="1.5" />
            <path d="M -4.7 0 L -2.35 -4.1 h 4.7 L 4.7 0 L 2.35 4.1 h -4.7 Z" fill="#AEB4B9" />
          </g>
          {/* washer detail on shelf */}
          <circle cx="188" cy="146" r="3.5" fill="none" stroke="#6E767E" strokeWidth="1.8" />

          {/* ===== spirit level resting on the bracket shelf ===== */}
          <g transform="translate(150 128)">
            <rect x="0" y="0" width="52" height="10" rx="2" fill="#F2B826" stroke="#8a6a10" strokeWidth="1.8" />
            {/* vial */}
            <rect x="14" y="1.6" width="24" height="6.8" rx="3.4" fill="#CFEFD6" stroke="#5c8f66" strokeWidth="1.2" />
            {/* centre marks */}
            <line x1="22.5" y1="1.6" x2="22.5" y2="8.4" stroke="#5c8f66" strokeWidth="1" />
            <line x1="29.5" y1="1.6" x2="29.5" y2="8.4" stroke="#5c8f66" strokeWidth="1" />
            {/* bubble settles to the centre */}
            <circle
              className={a('g13-bubble', 'g13-bubble--anim')}
              cx="26" cy="5" r="2.6" fill="#FFFFFF" stroke="#5c8f66" strokeWidth="0.8"
            />
          </g>
        </g>

        {/* ===== ratchet on the fixing bolt (pivot = bolt centre 138,112) ===== */}
        <g transform="translate(138 112)">
          <g className={a('g13-ratchet', 'g13-ratchet--anim')} style={reduced ? { transform: 'rotate(10deg)' } : undefined}>
            {/* head */}
            <circle r="8" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
            <circle r="3" fill="#6E767E" />
            {/* handle */}
            <rect x="6" y="-4" width="52" height="8" rx="4" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
            <rect x="36" y="-4.5" width="24" height="9" rx="4.5" fill="#2B2F33" />
          </g>
        </g>

        {/* accent arrow pointing at the fixing zone */}
        <g className={a('g13-arrow', 'g13-arrow--anim')}>
          <path d="M 236 108 h -22 m 0 0 l 8 -6 m -8 6 l 8 6"
            fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* level-OK glow at the vial */}
        <g className={a('g13-ok', 'g13-ok--anim')} style={reduced ? { opacity: 0 } : { transformOrigin: '176px 133px' }}>
          <circle cx="176" cy="133" r="12" fill="none" stroke="var(--ok, #2e9e5b)" strokeWidth="2.5" />
          <path d="M 171 133 l 3.5 4 l 7 -8" fill="none" stroke="var(--ok, #2e9e5b)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* mono badges */}
      <g>
        <rect x="228" y="150" width="66" height="22" rx="5" fill="var(--accent)" />
        <text x="261" y="165" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">17 mm</text>
        <rect x="228" y="178" width="66" height="20" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1" />
        <text x="261" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">LEVEL</text>
      </g>
    </svg>
  )
}
