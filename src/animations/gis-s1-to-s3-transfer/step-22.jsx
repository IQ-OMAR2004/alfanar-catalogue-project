// GIS Case 1 — Step 22: "Assemble: fit the zeolite housing"
// A bright machined aluminium ring flange (ring of bolt holes, inner threaded
// bore) lowers into its seat on the grey tank; a black O-ring is seated in the
// groove; bolts drop in around the ring. "ready for zeolite" badge. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const holes = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A bright aluminium zeolite housing ring flange lowering into its seat on the tank and bolting down, with a black O-ring seated"
    >
      <style>{`
        .c1s22-stage[data-paused] * { animation-play-state: paused !important; }

        /* aluminium ring lowers into its seat and settles */
        .c1s22-ring--anim { animation: c1s22-ring 4.5s ease-in-out infinite; }
        @keyframes c1s22-ring {
          0%      { transform: translateY(-52px); opacity: 0.85; }
          45%,100%{ transform: translateY(0); opacity: 1; }
        }
        /* down arrow guiding the drop */
        .c1s22-arrow--anim { animation: c1s22-arrow 4.5s ease-in-out infinite; }
        @keyframes c1s22-arrow {
          0%      { transform: translateY(-6px); opacity: 1; }
          40%     { transform: translateY(2px); opacity: 1; }
          55%,100%{ opacity: 0; }
        }
        /* bolts pop in once the ring is seated */
        .c1s22-bolt--anim { animation: c1s22-bolt 4.5s ease-in-out infinite; }
        @keyframes c1s22-bolt {
          0%,50%  { opacity: 0; transform: scale(0.2); }
          62%,100%{ opacity: 1; transform: scale(1); }
        }
        /* O-ring sheen pulse when seated */
        .c1s22-oring--anim { animation: c1s22-oring 4.5s ease-in-out infinite; }
        @keyframes c1s22-oring {
          0%,50%  { opacity: 0.4; }
          65%,100%{ opacity: 1; }
        }
        .c1s22-badge--anim { animation: c1s22-badge 4.5s ease-in-out infinite; }
        @keyframes c1s22-badge {
          0%,55%  { opacity: 0.25; }
          70%,100%{ opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      <rect x="0" y="212" width="320" height="5" fill="#F2B826" />

      {/* ===== grey tank top face with the housing seat ===== */}
      <rect x="34" y="60" width="252" height="140" rx="8" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="46" y="72" width="228" height="116" rx="6" fill="#C2C6BF" opacity="0.45" />

      {/* recessed seat / bore in the tank centre */}
      <circle cx="160" cy="132" r="52" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      <circle cx="160" cy="132" r="40" fill="#8F958D" />

      {/* black O-ring seated in the groove */}
      <circle className={anim('c1s22-oring')} cx="160" cy="132" r="46" fill="none" stroke="#222" strokeWidth="4.5" style={reduced ? { opacity: 1 } : undefined} />
      <circle cx="160" cy="132" r="46" fill="none" stroke="#9FD8A8" strokeWidth="1.2" opacity="0.5" />

      <g className="c1s22-stage" data-paused={paused ? '' : undefined}>
        {/* descending accent arrow */}
        <g className={anim('c1s22-arrow')} style={reduced ? { opacity: 0 } : undefined}>
          <path d="M 160 40 v 22 M 152 56 l 8 8 l 8 -8" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* bright machined aluminium ring flange (lowers in) */}
        <g className={anim('c1s22-ring')} style={reduced ? { transform: 'translateY(0)' } : undefined}>
          <circle cx="160" cy="132" r="50" fill="#C9CED4" stroke="#8A9089" strokeWidth="2.5" />
          <circle cx="160" cy="132" r="50" fill="none" stroke="#EDEFF2" strokeWidth="1.5" opacity="0.8" />
          {/* inner threaded bore */}
          <circle cx="160" cy="132" r="26" fill="#9BA19A" stroke="#7C837B" strokeWidth="2" />
          <circle cx="160" cy="132" r="26" fill="none" stroke="#7C837B" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="160" cy="132" r="20" fill="#6E767E" />
          {/* ring of bolt holes */}
          {holes.map((a) => (
            <circle
              key={a}
              cx={160 + 38 * Math.cos((a * Math.PI) / 180)}
              cy={132 + 38 * Math.sin((a * Math.PI) / 180)}
              r="3.4"
              fill="#7C837B"
              stroke="#5A6068"
              strokeWidth="1"
            />
          ))}
          {/* machined sheen highlight */}
          <path d="M 128 108 A 50 50 0 0 1 192 108" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
        </g>

        {/* bolts popping into the holes once seated */}
        {holes.map((a) => (
          <g
            key={'b' + a}
            className={anim('c1s22-bolt')}
            style={{ transformOrigin: `${160 + 38 * Math.cos((a * Math.PI) / 180)}px ${132 + 38 * Math.sin((a * Math.PI) / 180)}px`, ...(reduced ? { opacity: 1, transform: 'scale(1)' } : {}) }}
          >
            <circle
              cx={160 + 38 * Math.cos((a * Math.PI) / 180)}
              cy={132 + 38 * Math.sin((a * Math.PI) / 180)}
              r="3.4"
              fill="#AEB4B9"
              stroke="#3A3F44"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </g>

      {/* mono "ready for zeolite" badge */}
      <g className={anim('c1s22-badge')} transform="translate(96 26)" style={reduced ? { opacity: 1 } : undefined}>
        <rect x="0" y="0" width="128" height="24" rx="7" fill="var(--accent)" />
        <text x="64" y="16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">ready for zeolite</text>
      </g>
    </svg>
  )
}
