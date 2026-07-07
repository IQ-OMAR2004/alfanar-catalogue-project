// GIS Case 1 — Step 26: "Final quality checks — dew point & SF6 purity"
// The DILO SF6 analyzer: black hard case, ORANGE faceplate with "SF6" and a dark
// LCD, yellow port caps, chrome quick-couplings and a coiled grey sample hose
// connected to the grey tank by a self-closing hose. The LCD cycles
// "DP -31 C" and "SF6 99.79%" with a green check. Warning triangle. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="DILO SF6 analyzer with orange faceplate connected to the tank by a self-closing hose; the screen cycles dew point minus 31 degrees and SF6 purity 99.79 percent with a green check"
    >
      <style>{`
        .c1s26-stage[data-paused] * { animation-play-state: paused !important; }

        /* LCD alternates dew-point and purity readings */
        .c1s26-dp--anim { animation: c1s26-dp 5s steps(1) infinite; }
        @keyframes c1s26-dp {
          0%,45%   { opacity: 1; }
          50%,100% { opacity: 0; }
        }
        .c1s26-pur--anim { animation: c1s26-pur 5s steps(1) infinite; }
        @keyframes c1s26-pur {
          0%,45%   { opacity: 0; }
          50%,100% { opacity: 1; }
        }
        /* sample flow travels along the self-closing hose to the analyzer */
        .c1s26-flow--anim { animation: c1s26-flow 1.5s linear infinite; }
        @keyframes c1s26-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 26; }
        }
        /* green pass-check pulses in on the purity reading */
        .c1s26-check--anim { animation: c1s26-check 5s ease-in-out infinite; }
        @keyframes c1s26-check {
          0%,48%   { opacity: 0; transform: scale(0.4); }
          58%,95%  { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(0.4); }
        }
        .c1s26-warn--anim { animation: c1s26-warn 2.25s ease-in-out infinite; }
        @keyframes c1s26-warn {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* warning triangle — certified personnel / vented sample gas */}
      <g className={anim('c1s26-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== closed grey S3 tank (left) with test port ===== */}
      <g transform="translate(22 64)">
        <rect x="0" y="0" width="96" height="140" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="8" y="8" width="80" height="12" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        {[16, 34, 52, 70].map((cx) => (
          <circle key={cx} cx={cx + 2} cy="14" r="1.8" fill="#9BA19A" />
        ))}
        <rect x="12" y="30" width="72" height="56" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
        <circle cx="32" cy="112" r="15" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        <circle cx="66" cy="112" r="15" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {/* self-closing test valve/coupling */}
        <rect x="94" y="46" width="12" height="10" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.8" />
        <circle cx="100" cy="51" r="3" fill="#E8C020" stroke="#6E767E" strokeWidth="1" />
      </g>

      {/* ===== DILO SF6 analyzer (right) ===== */}
      <g transform="translate(186 74)">
        {/* black hard case */}
        <rect x="0" y="0" width="112" height="118" rx="8" fill="#26292C" stroke="#111417" strokeWidth="2.5" />
        <rect x="0" y="0" width="112" height="118" rx="8" fill="none" stroke="#3A3F44" strokeWidth="1.5" />
        {/* carry handle */}
        <path d="M 40 2 q 16 -14 32 0" fill="none" stroke="#3A3F44" strokeWidth="4" strokeLinecap="round" />
        {/* orange faceplate */}
        <rect x="10" y="12" width="92" height="94" rx="5" fill="#E0701F" stroke="#B85812" strokeWidth="2" />

        {/* dark LCD screen */}
        <rect x="20" y="22" width="72" height="34" rx="3" fill="#0B1A10" stroke="#052014" strokeWidth="2" />
        {/* dew-point reading */}
        <text className={anim('c1s26-dp')} x="56" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#4BE38A" style={reduced ? { opacity: 1 } : undefined}>DP -31 C</text>
        {/* purity reading */}
        <g className={anim('c1s26-pur')} style={reduced ? { opacity: 0 } : undefined}>
          <text x="52" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#4BE38A">SF6 99.79%</text>
        </g>

        {/* SF6 label on the faceplate */}
        <text x="56" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="#1E2226" fontWeight="bold">SF6</text>

        {/* yellow port caps + chrome couplings */}
        <circle cx="30" cy="88" r="6.5" fill="#E8C020" stroke="#8A7412" strokeWidth="1.5" />
        <circle cx="30" cy="88" r="2.5" fill="#B8990E" />
        <circle cx="82" cy="88" r="6.5" fill="#E8C020" stroke="#8A7412" strokeWidth="1.5" />
        <circle cx="82" cy="88" r="2.5" fill="#B8990E" />
        <rect x="50" y="83" width="12" height="10" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />

        {/* coiled grey sample hose looped on the side */}
        <path d="M 100 100 q 22 6 8 22 q -14 12 4 22" fill="none" stroke="#8A9099" strokeWidth="4" strokeLinecap="round" />
        <path d="M 100 100 q 22 6 8 22 q -14 12 4 22" fill="none" stroke="#B7BCC2" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* green pass-check badge on the reading */}
      <g className={anim('c1s26-check')} transform="translate(276 118)" style={{ transformOrigin: '276px 118px', ...(reduced ? { opacity: 1, transform: 'scale(1)' } : {}) }}>
        <circle cx="0" cy="0" r="11" fill="#2E9E5B" stroke="#1C6B3C" strokeWidth="1.5" />
        <path d="M -5 0 l 3.5 4 l 6 -8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="c1s26-stage" data-paused={paused ? '' : undefined}>
        {/* self-closing sample hose: tank port -> analyzer inlet */}
        <path d="M 128 115 q 40 26 58 47" fill="none" stroke="#5A6068" strokeWidth="6" strokeLinecap="round" />
        {/* sample flow dashes toward the analyzer */}
        <path className={anim('c1s26-flow')} d="M 128 115 q 40 26 58 47" fill="none" stroke="#9FD8A8" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="5 8" style={reduced ? { opacity: 0.5 } : undefined} />
      </g>
    </svg>
  )
}
