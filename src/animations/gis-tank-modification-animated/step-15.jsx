// GIS Tank Modification — Step 15: "Assemble & fix the manometer"
// Loop: the round gas-density manometer lowers onto its tank fitting, a 32 mm
// spanner sweeps to torque the cap nut ("G3/4 → 39.2 Nm"), then the needle
// settles at the 0.05 MPa FILLING pressure marker (low end of the scale — the
// tank is NOT at rated pressure at this stage). Warn triangle: SF6 leak path.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Manometer gauge screwing onto the tank fitting, spanner torquing the cap nut to 39.2 Nm, needle reading the 0.05 MPa filling pressure"
    >
      <style>{`
        .g15-stage[data-paused] * { animation-play-state: paused !important; }

        /* gauge lowers onto the fitting with a small screwing wiggle */
        .g15-gauge--anim { animation: g15-gauge 4.5s ease-in-out infinite; }
        @keyframes g15-gauge {
          0%       { transform: translateY(-34px) rotate(0deg); }
          20%      { transform: translateY(-4px) rotate(-6deg); }
          26%      { transform: translateY(0) rotate(5deg); }
          32%,100% { transform: translateY(0) rotate(0deg); }
        }

        /* spanner sweeps on the cap nut (pivot at the fitting) */
        .g15-spanner--anim { animation: g15-spanner 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g15-spanner {
          0%,30%  { transform: rotate(40deg); opacity: 0; }
          36%     { transform: rotate(40deg); opacity: 1; }
          48%     { transform: rotate(-8deg); }
          56%     { transform: rotate(28deg); }
          66%     { transform: rotate(-8deg); opacity: 1; }
          76%,100%{ transform: rotate(-8deg); opacity: 0; }
        }

        /* needle: rests low, then swings up and settles in the green zone */
        .g15-needle--anim { animation: g15-needle 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes g15-needle {
          0%,34%   { transform: rotate(-72deg); }
          62%      { transform: rotate(24deg); }
          72%      { transform: rotate(12deg); }
          82%,100% { transform: rotate(16deg); }
        }

        /* green-zone OK pulse once the needle settles */
        .g15-ok--anim { animation: g15-ok 4.5s ease-in-out infinite; }
        @keyframes g15-ok {
          0%,80%   { opacity: 0; transform: scale(0.6); }
          88%      { opacity: 1; transform: scale(1.08); }
          94%      { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(0.7); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== tank shoulder (RAL grey, stud row) — zoomed crop ===== */}
      <rect x="14" y="128" width="180" height="86" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="14" y="128" width="180" height="12" fill="#C2C6BF" />
      <g fill="#9BA19A">
        <circle cx="28" cy="134" r="2" /><circle cx="52" cy="134" r="2" /><circle cx="76" cy="134" r="2" />
        <circle cx="124" cy="134" r="2" /><circle cx="148" cy="134" r="2" /><circle cx="172" cy="134" r="2" />
      </g>
      {/* welded gauge boss / fitting on the tank top */}
      <rect x="88" y="112" width="24" height="18" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      {/* cap nut (hex, 32 mm) */}
      <path d="M 86 112 L 91 103 h 18 L 114 112 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
      <line x1="93" y1="107.5" x2="107" y2="107.5" stroke="#6E767E" strokeWidth="1.5" />

      <g className="g15-stage" data-paused={paused ? '' : undefined}>
        {/* ===== manometer (gas density monitor) lowering onto the fitting ===== */}
        <g className={a('g15-gauge', 'g15-gauge--anim')} style={{ transformOrigin: '100px 100px' }}>
          {/* stem */}
          <rect x="95" y="88" width="10" height="16" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
          {/* gauge case */}
          <circle cx="100" cy="56" r="36" fill="#6E767E" stroke="#2B2F33" strokeWidth="2.5" />
          {/* white dial face */}
          <circle cx="100" cy="56" r="30" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
          {/* red low-pressure arc (left) */}
          <path d="M 74 66 A 27.5 27.5 0 0 1 82 36" fill="none" stroke="#C0392B" strokeWidth="5" />
          {/* green rated-pressure arc (upper right) */}
          <path d="M 104 29 A 27.5 27.5 0 0 1 126 50" fill="none" stroke="#2e9e5b" strokeWidth="5" />
          {/* tick marks */}
          <g stroke="#6E767E" strokeWidth="1.5">
            <line x1="100" y1="30" x2="100" y2="36" />
            <line x1="77" y1="46" x2="82.5" y2="48.5" />
            <line x1="123" y1="46" x2="117.5" y2="48.5" />
            <line x1="82" y1="72" x2="86" y2="68" />
            <line x1="118" y1="72" x2="114" y2="68" />
          </g>
          {/* needle (pivot at dial centre 100,56) */}
          <g transform="translate(100 56)">
            <g className={a('g15-needle', 'g15-needle--anim')} style={reduced ? { transform: 'rotate(16deg)' } : undefined}>
              <path d="M 0 6 L -2.5 0 L 0 -25 L 2.5 0 Z" fill="#1E2226" />
            </g>
            <circle r="3.5" fill="#1E2226" />
          </g>
          {/* small SF6 text on dial */}
          <text x="100" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#6E767E">SF6</text>
        </g>

        {/* green-zone OK pulse */}
        <g className={a('g15-ok', 'g15-ok--anim')} style={reduced ? { opacity: 0 } : { transformOrigin: '117px 39px' }}>
          <circle cx="117" cy="39" r="10" fill="none" stroke="var(--ok, #2e9e5b)" strokeWidth="2.5" />
        </g>

        {/* ===== open-end spanner working the cap nut (pivot 100,108) ===== */}
        <g transform="translate(100 108)">
          <g className={a('g15-spanner', 'g15-spanner--anim')} style={reduced ? { opacity: 0 } : undefined}>
            {/* jaw */}
            <path d="M -10 -6 a 11 11 0 0 1 20 0 l -4 3 a 7 7 0 0 0 -12 0 Z"
              fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" strokeLinejoin="round" />
            {/* shaft */}
            <rect x="-4" y="-2" width="8" height="66" rx="4" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
            <rect x="-4.5" y="42" width="9" height="24" rx="4.5" fill="#2B2F33" />
          </g>
        </g>
      </g>

      {/* ===== torque table badge ===== */}
      <g>
        <rect x="204" y="36" width="106" height="46" rx="6" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
        <text x="257" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink2)">G3/4 · 32 mm</text>
        <rect x="214" y="60" width="86" height="16" rx="4" fill="var(--accent)" />
        <text x="257" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">39.2 Nm</text>
      </g>

      {/* warning triangle — loose fitting = SF6 leak */}
      <g transform="translate(288 202)">
        <path d="M 0 -11 L 11 8 H -11 Z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="0" y1="-4" x2="0" y2="2" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="0" cy="5.5" r="1.3" fill="var(--ink)" />
      </g>
    </svg>
  )
}
