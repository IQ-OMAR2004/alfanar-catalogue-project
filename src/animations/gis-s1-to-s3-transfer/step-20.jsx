// GIS S1→S3 Case 1 — Step 20: "Assemble: install the Current Transformers (CTs)"
// Tan/brown toroidal CTs (clear-film wrapped, black secondary wires coiled)
// lower onto their supports with black rubber insulation pads between CT and
// plate; mono "P1 ↑ / P2 ↓" direction badge and a "1 mm" gap callout; a small
// CT test-set with a green OK lamp sits alongside. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Tan toroidal current transformer with coiled black secondary wires lowering onto its support over a black rubber pad, keeping a 1 mm gap, with P1 up and P2 down; a CT test set shows a green OK lamp"
    >
      <style>{`
        .c1s20-stage[data-paused] * { animation-play-state: paused !important; }

        /* CT toroid lowers onto its support, leaving a small gap */
        .c1s20-ct--anim { animation: c1s20-ct 4.5s ease-in-out infinite; }
        @keyframes c1s20-ct {
          0%      { transform: translateY(-44px); opacity: 0.4; }
          46%     { transform: translateY(0); opacity: 1; }
          100%    { transform: translateY(0); opacity: 1; }
        }
        /* 1 mm gap callout appears once seated */
        .c1s20-gap--anim { animation: c1s20-gap 4.5s ease-in-out infinite; }
        @keyframes c1s20-gap {
          0%,50%   { opacity: 0; }
          62%,94%  { opacity: 1; }
          100%     { opacity: 0; }
        }
        /* test-set OK lamp blinks green */
        .c1s20-ok--anim { animation: c1s20-ok 1.3s ease-in-out infinite; }
        @keyframes c1s20-ok {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 1; }
        }
        /* clear-film sheen shimmer on the toroid */
        .c1s20-film--anim { animation: c1s20-film 3s ease-in-out infinite; }
        @keyframes c1s20-film {
          0%,100% { opacity: 0.2; }
          50%     { opacity: 0.55; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* P1 up / P2 down direction badge */}
      <g transform="translate(58 34)">
        <rect x="-42" y="-16" width="84" height="32" rx="8" fill="var(--accent)" />
        <text x="0" y="-2" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">P1 ↑</text>
        <text x="0" y="10" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">P2 ↓</text>
      </g>

      {/* ===== support base with two stand-off rods and a rubber pad ===== */}
      <g transform="translate(96 158)">
        {/* mounting plate */}
        <rect x="-42" y="42" width="120" height="18" rx="4" fill="#C9CED4" stroke="#8A9089" strokeWidth="2" />
        {/* two support rods */}
        <rect x="-30" y="8" width="8" height="36" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
        <rect x="60" y="8" width="8" height="36" rx="2" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
        {/* black rubber insulation pad on top of the plate */}
        <rect x="-16" y="34" width="68" height="8" rx="3" fill="#26292C" stroke="#111417" strokeWidth="1.2" />
      </g>

      <g className="c1s20-stage" data-paused={paused ? '' : undefined}>
        {/* ===== descending tan toroidal CT ===== */}
        <g className={anim('c1s20-ct')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <g transform="translate(114 150)">
            {/* toroid ring — tan/brown */}
            <ellipse cx="0" cy="0" rx="52" ry="20" fill="#B98C55" stroke="#8A6B33" strokeWidth="2.5" />
            <ellipse cx="0" cy="0" rx="26" ry="9" fill="var(--panel)" stroke="#8A6B33" strokeWidth="2" />
            {/* clear-film wrap sheen */}
            <ellipse className={anim('c1s20-film')} cx="-10" cy="-6" rx="30" ry="7" fill="#F4F6F0" style={reduced ? { opacity: 0.35 } : undefined} />
            {/* clear-film seam lines */}
            <path d="M -46 -4 A 52 20 0 0 1 46 -4" fill="none" stroke="#D8C6A0" strokeWidth="1.2" opacity="0.7" />
            {/* black secondary wires coiled around the ring */}
            {[-38, -19, 0, 19, 38].map((dx) => (
              <path key={dx} d={`M ${dx} -14 q 6 8 0 16`} fill="none" stroke="#26292C" strokeWidth="2.4" strokeLinecap="round" />
            ))}
            {/* P1 (up) / P2 (down) polarity markers */}
            <text x="-52" y="-22" fontFamily="var(--font-mono)" fontSize="8" fill="#C0392B">P1</text>
            <text x="-52" y="30" fontFamily="var(--font-mono)" fontSize="8" fill="#2C6FB4">P2</text>
            {/* secondary lead run to the test set */}
            <path d="M 48 8 q 40 22 78 6" fill="none" stroke="#26292C" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        </g>

        {/* ===== 1 mm gap callout between CT and pad ===== */}
        <g className={anim('c1s20-gap')} style={reduced ? { opacity: 1 } : undefined}>
          <line x1="150" y1="176" x2="182" y2="176" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="182" y1="171" x2="182" y2="181" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="184" y="167" width="40" height="18" rx="5" fill="var(--accent)" />
          <text x="204" y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--on-accent)">1 mm</text>
        </g>

        {/* ===== small CT test-set with green OK lamp ===== */}
        <g transform="translate(238 150)">
          <rect x="0" y="0" width="60" height="54" rx="5" fill="#2B2F33" stroke="#111417" strokeWidth="2" />
          {/* screen */}
          <rect x="8" y="8" width="44" height="18" rx="2" fill="#0B0D0E" />
          <text x="30" y="21" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#3FD46C">CT OK</text>
          {/* OK lamp */}
          <g className={anim('c1s20-ok')} style={reduced ? { opacity: 1 } : undefined}>
            <circle cx="16" cy="40" r="5" fill="#3FD46C" stroke="#1E7C3C" strokeWidth="1.2" />
          </g>
          {/* dial + terminals */}
          <circle cx="34" cy="40" r="5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.2" />
          <line x1="34" y1="40" x2="37" y2="36" stroke="#2B2F33" strokeWidth="1.4" />
          <rect x="44" y="36" width="10" height="8" rx="1.5" fill="#E8C020" />
          {/* label */}
          <text x="30" y="-3" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink2)">TEST SET</text>
        </g>
      </g>
    </svg>
  )
}
