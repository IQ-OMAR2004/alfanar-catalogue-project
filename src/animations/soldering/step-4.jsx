// Step 4 — "Inspect the joint" (Solder a Joint)
// A magnifier lens glides across a finished solder joint. As the loupe passes
// over it, the joint sparkles, a travelling glint runs along the lens rim, and
// a green check stamps in to confirm a smooth, shiny cone. Then the lens glides
// back and the cycle repeats. Pure SVG + CSS, prefix "sol4".
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Magnifier inspecting a smooth, shiny solder joint with a pass check"
    >
      <style>{`
        .sol4-stage[data-paused] * { animation-play-state: paused !important; }

        /* ---- magnifier glides across the joint and back (seamless) ---- */
        .sol4-loupe--anim {
          animation: sol4-glide 3.4s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
        }
        @keyframes sol4-glide {
          0%   { transform: translateX(-78px) translateY(0); }
          26%  { transform: translateX(0px)   translateY(0); }   /* centred over joint */
          40%  { transform: translateX(0px)   translateY(-2px); } /* slight lift to "examine" */
          54%  { transform: translateX(0px)   translateY(0); }
          80%  { transform: translateX(72px)  translateY(0); }
          100% { transform: translateX(-78px) translateY(0); }   /* loops back to start */
        }

        /* glint travelling along the lens rim while inspecting */
        .sol4-glint--anim {
          animation: sol4-glint 3.4s linear infinite;
          transform-box: fill-box;
          transform-origin: 0 0;
        }
        @keyframes sol4-glint {
          0%, 18%   { opacity: 0; }
          26%       { opacity: 0.95; transform: rotate(20deg); }
          50%       { opacity: 0.95; transform: rotate(300deg); }
          58%       { opacity: 0; transform: rotate(340deg); }
          100%      { opacity: 0; transform: rotate(340deg); }
        }

        /* joint sparkles as the lens crosses it */
        .sol4-spark--anim {
          animation: sol4-spark 3.4s var(--ease-out, ease-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes sol4-spark {
          0%, 22%   { opacity: 0; transform: scale(0.2) rotate(0deg); }
          30%       { opacity: 1; transform: scale(1) rotate(45deg); }
          44%       { opacity: 0; transform: scale(1.5) rotate(90deg); }
          100%      { opacity: 0; transform: scale(1.5) rotate(90deg); }
        }
        .sol4-spark2 { animation-delay: 0.16s; }
        .sol4-spark3 { animation-delay: 0.30s; }

        /* highlight sheen riding the cone surface — the "shiny" read */
        .sol4-sheen--anim {
          animation: sol4-sheen 3.4s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
        }
        @keyframes sol4-sheen {
          0%, 22%   { opacity: 0; transform: translateY(4px); }
          34%       { opacity: 0.9; transform: translateY(0); }
          56%       { opacity: 0.9; transform: translateY(0); }
          70%, 100% { opacity: 0; transform: translateY(-3px); }
        }

        /* green check stamps in after the pass, then fades before the loop seam */
        .sol4-check--anim {
          animation: sol4-check 3.4s var(--ease-out, ease-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes sol4-check {
          0%, 40%   { opacity: 0; transform: scale(0.3); }
          50%       { opacity: 1; transform: scale(1.18); } /* pop in */
          58%       { opacity: 1; transform: scale(1); }
          82%       { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 0; transform: scale(0.9); }  /* clear before seam */
        }
      `}</style>

      {/* ---- static backdrop: technical baseline ---- */}
      <line x1="0" y1="186" x2="320" y2="186" stroke="var(--line)" strokeWidth="1" />

      <g className="sol4-stage" data-paused={paused ? '' : undefined}>
        {/* ============ PCB / PAD with the finished solder cone ============ */}
        <g>
          {/* board strip */}
          <rect x="40" y="160" width="240" height="26" rx="4"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* board top sheen */}
          <rect x="44" y="163" width="232" height="4" rx="2" fill="var(--bg-2, #ffffff)" opacity="0.5" />

          {/* copper pad under the joint */}
          <ellipse cx="160" cy="161" rx="22" ry="5"
            fill="var(--navy)" stroke="var(--accent2)" strokeWidth="1.5" />

          {/* component lead passing through the pad */}
          <rect x="157" y="118" width="6" height="44" rx="2"
            fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />

          {/* ---- the SOLDER CONE: smooth, shiny fillet ---- */}
          <path d="M138 161 Q160 110 182 161 Z"
            fill="var(--accent)" stroke="var(--accent2)" strokeWidth="2.5"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }} />
          {/* base curvature shadow for volume */}
          <path d="M138 161 Q160 152 182 161"
            fill="none" stroke="var(--accent2)" strokeWidth="2" opacity="0.6" />

          {/* travelling sheen on the cone — reads as "shiny" */}
          <path className={anim('sol4-sheen')}
            d="M152 154 Q158 126 165 134 Q160 150 156 158 Z"
            fill="var(--sky)" opacity="0" />
          {/* fixed specular dot near the apex */}
          <circle cx="156" cy="132" r="2.4" fill="var(--bg-2, #ffffff)" opacity="0.85" />
        </g>

        {/* ============ SPARKLES at the joint (centred on cone) ============ */}
        <g transform="translate(160 138)" fill="var(--sky)"
           style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }}>
          <g className={anim('sol4-spark') + ' sol4-spark1'} transform="translate(0 -6)">
            <path d="M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6 Z" />
          </g>
          <g className={anim('sol4-spark') + ' sol4-spark2'} transform="translate(-14 6)">
            <path d="M0 -5 L1.1 -1.1 L5 0 L1.1 1.1 L0 5 L-1.1 1.1 L-5 0 L-1.1 -1.1 Z" />
          </g>
          <g className={anim('sol4-spark') + ' sol4-spark3'} transform="translate(14 4)">
            <path d="M0 -5 L1.1 -1.1 L5 0 L1.1 1.1 L0 5 L-1.1 1.1 L-5 0 L-1.1 -1.1 Z" />
          </g>
        </g>

        {/* ============ GREEN PASS CHECK (floats above joint) ============ */}
        <g className={anim('sol4-check')} transform="translate(212 100)">
          <circle cx="0" cy="0" r="16"
            fill="var(--ok)" stroke="var(--bg-2, #ffffff)" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }} />
          <path d="M-7 0 L-2 6 L8 -6"
            fill="none" stroke="var(--bg-2, #ffffff)" strokeWidth="3.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ============ MAGNIFIER LOUPE (glides over the joint) ============ */}
        <g className={anim('sol4-loupe')}>
          {/* handle */}
          <rect x="190" y="86" width="9" height="42" rx="4.5"
            transform="rotate(40 194 107)"
            fill="var(--navy)" stroke="var(--ink)" strokeWidth="2.5" />
          {/* lens rim */}
          <circle cx="160" cy="118" r="30"
            fill="none" stroke="var(--ink)" strokeWidth="4" />
          {/* inner rim ring */}
          <circle cx="160" cy="118" r="26"
            fill="var(--sky)" stroke="var(--accent2)" strokeWidth="2" opacity="0.16" />
          {/* glass fill (subtle tint, lets joint show through) */}
          <circle cx="160" cy="118" r="26" fill="var(--bg-2, #ffffff)" opacity="0.10" />

          {/* travelling glint riding the rim */}
          <g transform="translate(160 118)">
            <g className={anim('sol4-glint')}>
              <circle cx="0" cy="-26" r="3.4" fill="var(--bg-2, #ffffff)"
                style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }} />
            </g>
          </g>

          {/* fixed diagonal glass streaks for "lens" read */}
          <g stroke="var(--bg-2, #ffffff)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
            <line x1="146" y1="104" x2="138" y2="112" />
            <line x1="152" y1="102" x2="140" y2="114" />
          </g>
        </g>
      </g>
    </svg>
  )
}
