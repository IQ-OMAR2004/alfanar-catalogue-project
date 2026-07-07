// Case 1 — Step 13: "Clean the Solution 3 tank"
// A worker arm in a dark sleeve with a GREEN chemical gauntlet reaches through a
// round bushing hole and wipes the grey S3 tank interior with white tissue. A
// white methanol bottle (red flammable diamond) sits beside; a vacuum nozzle
// sucks dust. Warning triangle: flammable/toxic. Loop ~4.4s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Gloved worker arm wiping the grey tank interior with tissue through a bushing hole, methanol bottle beside, vacuum nozzle removing dust"
    >
      <style>{`
        .c1s13-stage[data-paused] * { animation-play-state: paused !important; }
        /* arm + tissue wipe back and forth across the interior wall */
        .c1s13-wipe--anim { animation: c1s13-wipe 3.4s ease-in-out infinite; }
        @keyframes c1s13-wipe {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          50%     { transform: translate(-30px,16px) rotate(-8deg); }
        }
        /* wiped sheen streak brightens where the cloth passes */
        .c1s13-sheen--anim { animation: c1s13-sheen 3.4s ease-in-out infinite; }
        @keyframes c1s13-sheen {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.6; }
        }
        /* vacuum suction dust dashes travel up the nozzle */
        .c1s13-suck--anim { animation: c1s13-suck 0.9s linear infinite; }
        @keyframes c1s13-suck { 0%{stroke-dashoffset:0;} 100%{stroke-dashoffset:-16;} }
        .c1s13-warn--anim { animation: c1s13-warn 2.2s ease-in-out infinite; }
        @keyframes c1s13-warn { 0%,100%{opacity:.65;} 50%{opacity:1;} }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="4" fill="#F2B826" opacity="0.5" />

      {/* warning triangle — methanol flammable & toxic */}
      <g className={anim('c1s13-warn')} transform="translate(294 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== grey S3 tank body (cutaway, interior visible) ===== */}
      <g transform="translate(28 60)">
        <rect x="0" y="0" width="150" height="150" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* interior wall */}
        <rect x="14" y="14" width="122" height="122" rx="4" fill="#BFC3BC" stroke="#9BA19A" strokeWidth="1.6" />
        {/* wiped-clean sheen streak on the interior wall */}
        <rect className={anim('c1s13-sheen')} x="30" y="40" width="86" height="40" rx="6" fill="#EFF2EC" style={reduced ? { opacity: 0.4 } : undefined} />
        {/* round bushing hole (arm reaches through here) */}
        <ellipse cx="122" cy="66" rx="16" ry="20" fill="#8E948C" stroke="#7C837B" strokeWidth="2" />
        <ellipse cx="122" cy="66" rx="16" ry="20" fill="none" stroke="#6A706A" strokeWidth="1.4" />
      </g>

      <g className="c1s13-stage" data-paused={paused ? '' : undefined}>
        {/* ===== worker arm + gauntlet + tissue reaching through the hole ===== */}
        <g className={anim('c1s13-wipe')} style={reduced ? { transform: 'translate(-14px,8px)' } : undefined}>
          {/* dark sleeve coming from the hole */}
          <path d="M 200 130 L 150 120 L 150 138 L 200 150 Z" fill="#2B2F33" stroke="#1E2226" strokeWidth="1.6" strokeLinejoin="round" />
          {/* green chemical gauntlet */}
          <path d="M 150 116 q -18 2 -26 12 q -4 8 4 12 q 12 4 24 -2 l 4 -18 Z" fill="#2E9E5B" stroke="#1F7A44" strokeWidth="1.6" strokeLinejoin="round" />
          <ellipse cx="128" cy="130" rx="6" ry="7" fill="#2E9E5B" stroke="#1F7A44" strokeWidth="1.4" />
          {/* white tissue in the hand */}
          <rect x="112" y="120" width="20" height="18" rx="3" fill="#F2F2EE" stroke="#CFCFC6" strokeWidth="1.4" transform="rotate(-10 122 129)" />
        </g>

        {/* ===== methanol bottle (white with red flammable diamond) ===== */}
        <g transform="translate(224 128)">
          <rect x="0" y="14" width="34" height="58" rx="6" fill="#FFFFFF" stroke="#B9BDB6" strokeWidth="2" />
          <rect x="10" y="2" width="14" height="14" rx="2" fill="#C0392B" />
          <rect x="8" y="0" width="18" height="5" rx="1.5" fill="#8A2318" />
          {/* red flammable diamond label */}
          <g transform="translate(17 42)">
            <path d="M 0 -11 L 11 0 L 0 11 L -11 0 Z" fill="#FFFFFF" stroke="#C0392B" strokeWidth="2" />
            <path d="M 0 -3 q 5 3 2 8 q 4 -1 3 -6 q 3 3 1 7 q 4 -5 -2 -12 q 1 4 -4 4 Z" fill="#C0392B" />
          </g>
          <text x="17" y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="#6E767E">CH3OH</text>
        </g>

        {/* ===== vacuum nozzle sucking dust from the tank floor ===== */}
        <g transform="translate(70 176)">
          <path d="M 0 24 L 22 24 L 16 6 L 6 6 Z" fill="#2B2F33" stroke="#1E2226" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="8" y="-14" width="6" height="20" rx="2" fill="#4A4F54" stroke="#2B2F33" strokeWidth="1.4" />
          {/* corrugated hose upward */}
          <path d="M 11 -14 q 10 -10 26 -8" fill="none" stroke="#5A6068" strokeWidth="5" strokeLinecap="round" />
          {/* dust being sucked up */}
          <path className={anim('c1s13-suck')} d="M 4 22 q 4 -10 8 -16" fill="none" stroke="#C9C7BE" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 5" style={reduced ? { opacity: 0.4 } : undefined} />
          {/* dust specks on floor */}
          <circle cx="-6" cy="22" r="1.4" fill="#B4B2A8" />
          <circle cx="-12" cy="20" r="1.1" fill="#B4B2A8" />
        </g>
      </g>
    </svg>
  )
}
