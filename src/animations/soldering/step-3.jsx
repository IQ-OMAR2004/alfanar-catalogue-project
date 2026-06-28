// alfanar SWI Kiosk — Soldering · Step 3: "Heat the joint & flow solder"
// Looping motion: a hot soldering-iron tip presses against a pad+lead joint
// (heat shimmer rising); a solder wire feeds in from the opposite side and
// melts; a shiny molten fillet flows up forming a clean concave cone around the
// lead; the wire withdraws, then the iron lifts away, leaving the bright joint.
// Pure SVG + CSS. All keyframes + classes prefixed "sol3" for collision safety.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Soldering a joint: heat the pad and lead, then flow solder into a shiny fillet"
    >
      <style>{`
        .sol3-stage { transform-box: fill-box; }
        .sol3-stage[data-paused] * { animation-play-state: paused !important; }

        /* ---- Soldering iron: descends onto joint, holds, then lifts away ---- */
        .sol3-iron { transform-box: fill-box; }
        .sol3-iron--anim {
          animation: sol3-iron 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-iron {
          0%        { transform: translateY(-34px); }
          16%       { transform: translateY(0); }      /* tip pressed on joint */
          80%       { transform: translateY(0); }
          94%, 100% { transform: translateY(-34px); }  /* iron withdrawn last */
        }

        /* tip glow swells while in contact (the heat at the joint) */
        .sol3-tipglow { transform-box: fill-box; transform-origin: center; }
        .sol3-tipglow--anim {
          animation: sol3-tipglow 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-tipglow {
          0%, 12%   { opacity: 0.15; transform: scale(0.7); }
          24%       { opacity: 0.95; transform: scale(1.15); }
          70%       { opacity: 0.9;  transform: scale(1.05); }
          86%, 100% { opacity: 0.15; transform: scale(0.7); }
        }

        /* ---- Heat shimmer: wavy columns rising off the hot joint ---- */
        .sol3-shimmer { transform-box: fill-box; }
        .sol3-shimmer--anim {
          animation: sol3-shimmer 1.4s linear infinite;
        }
        .sol3-shimmer2.sol3-shimmer--anim { animation-delay: -0.7s; }
        @keyframes sol3-shimmer {
          0%   { transform: translateY(0)    scaleX(1);   opacity: 0; }
          25%  { transform: translateY(-6px) scaleX(1.1); opacity: 0.55; }
          60%  { transform: translateY(-14px) scaleX(0.9); opacity: 0.3; }
          100% { transform: translateY(-24px) scaleX(1.1); opacity: 0; }
        }
        /* gate the shimmer so it only shows while the iron is in contact */
        .sol3-shimmergate { transform-box: fill-box; }
        .sol3-shimmergate--anim {
          animation: sol3-shimmergate 3.6s steps(1, end) infinite;
        }
        @keyframes sol3-shimmergate {
          0%, 16%   { opacity: 0; }
          18%, 82%  { opacity: 1; }
          84%, 100% { opacity: 0; }
        }

        /* ---- Solder wire: feeds in from the right, melts, then withdraws ---- */
        .sol3-wire { transform-box: fill-box; }
        .sol3-wire--anim {
          animation: sol3-wire 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-wire {
          0%, 20%   { transform: translateX(46px); }   /* parked off to the side */
          40%       { transform: translateX(0); }      /* tip at the joint */
          58%       { transform: translateX(0); }
          74%, 100% { transform: translateX(46px); }   /* withdrawn before iron */
        }

        /* the very tip of the wire shrinks as it melts away into the joint */
        .sol3-wiretip { transform-box: fill-box; transform-origin: left center; }
        .sol3-wiretip--anim {
          animation: sol3-wiretip 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-wiretip {
          0%, 40%   { transform: scaleX(1); opacity: 1; }
          54%       { transform: scaleX(0.35); opacity: 1; }
          60%       { transform: scaleX(0.1); opacity: 0; }
          74%, 100% { transform: scaleX(1); opacity: 1; }
        }

        /* ---- Molten fillet: grows into a shiny concave cone, then sets ---- */
        .sol3-fillet { transform-box: fill-box; transform-origin: center bottom; }
        .sol3-fillet--anim {
          animation: sol3-fillet 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-fillet {
          0%, 40%   { transform: scaleY(0.06); opacity: 0; }
          50%       { transform: scaleY(0.6);  opacity: 1; }
          58%       { transform: scaleY(1.08); opacity: 1; } /* molten over-swell */
          66%       { transform: scaleY(1);    opacity: 1; } /* settles to cone */
          90%       { transform: scaleY(1);    opacity: 1; } /* shiny joint holds */
          97%, 100% { transform: scaleY(0.06); opacity: 0; } /* reset at seam */
        }

        /* molten glow on the fillet while it is liquid / hot */
        .sol3-molten { transform-box: fill-box; transform-origin: center bottom; }
        .sol3-molten--anim {
          animation: sol3-molten 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes sol3-molten {
          0%, 44%   { opacity: 0; }
          54%       { opacity: 0.95; }
          70%       { opacity: 0.55; }
          88%, 100% { opacity: 0; }    /* cools to a matte set joint */
        }

        /* travelling shine across the finished fillet (the "shiny" confirm) */
        .sol3-shine--anim {
          animation: sol3-shine 3.6s ease-in-out infinite;
        }
        @keyframes sol3-shine {
          0%, 64%   { opacity: 0; transform: translateX(-3px); }
          76%       { opacity: 0.95; transform: translateX(0); }
          90%, 100% { opacity: 0; transform: translateX(3px); }
        }
      `}</style>

      {/* technical baseline / board ground line */}
      <line x1="0" y1="204" x2="320" y2="204" stroke="var(--line-2)" strokeWidth="2" />

      <g className="sol3-stage" data-paused={paused ? '' : undefined}>
        {/* ============ PCB BOARD ============ */}
        <rect x="40" y="150" width="240" height="40" rx="4"
          fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
        {/* board top sheen */}
        <rect x="44" y="153" width="232" height="4" rx="2" fill="var(--bg-2, #ffffff)" opacity="0.5" />
        {/* copper trace running to the pad */}
        <line x1="48" y1="166" x2="150" y2="166" stroke="var(--warn)" strokeWidth="4" strokeLinecap="round" opacity="0.85" />

        {/* ============ THROUGH-HOLE PAD + LEAD (joint at x=160) ============ */}
        {/* copper pad ring on the board surface */}
        <ellipse cx="160" cy="150" rx="16" ry="6"
          fill="var(--warn)" stroke="var(--navy)" strokeWidth="2" opacity="0.9" />
        <ellipse cx="160" cy="150" rx="6" ry="2.4" fill="var(--navy)" />
        {/* component lead poking up through the pad */}
        <rect x="157" y="116" width="6" height="40" rx="2"
          fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />
        <line x1="159" y1="120" x2="159" y2="150" stroke="var(--bg-2, #ffffff)" strokeWidth="1.4" opacity="0.5" />

        {/* ============ SOLDER FILLET (concave cone around the lead) ============ */}
        {/* base solid fillet — grows up then sets */}
        <g className={anim('sol3-fillet')}>
          {/* concave cone: curved sides hugging the lead, wide skirt on the pad */}
          <path d="M160 110
                   C 150 128, 142 142, 138 150
                   L 182 150
                   C 178 142, 170 128, 160 110 Z"
            fill="var(--accent2)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          {/* concave inner shading to read as a hollow cone */}
          <path d="M160 116 C 153 130, 148 142, 146 149 L 174 149 C 172 142, 167 130, 160 116 Z"
            fill="var(--accent)" opacity="0.55" />
        </g>

        {/* molten hot overlay on the fillet (fades as it cools) */}
        <g className={anim('sol3-molten')}>
          <path d="M160 110
                   C 150 128, 142 142, 138 150
                   L 182 150
                   C 178 142, 170 128, 160 110 Z"
            fill="var(--warn)" opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }} />
        </g>

        {/* travelling specular shine confirming a clean shiny joint */}
        <g className={reduced ? undefined : 'sol3-shine--anim'} style={reduced ? { opacity: 0.6 } : undefined}>
          <path d="M154 132 C 151 140, 149 146, 148 150"
            fill="none" stroke="var(--on-accent, #ffffff)" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* ============ HEAT SHIMMER (gated to contact window) ============ */}
        <g className={anim('sol3-shimmergate')} fill="none"
           stroke="var(--accent2)" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <path className={anim('sol3-shimmer')}
            d="M150 144 q3 -5 0 -10 q-3 -5 0 -10" />
          <path className={anim('sol3-shimmer') + ' sol3-shimmer2'}
            d="M170 144 q-3 -5 0 -10 q3 -5 0 -10" />
        </g>

        {/* ============ SOLDERING IRON (descends from upper-left) ============ */}
        <g className={anim('sol3-iron')}>
          {/* barrel / handle pointing down-right toward the joint */}
          <g transform="rotate(34 160 110)">
            <rect x="146" y="36" width="28" height="44" rx="7"
              fill="var(--navy)" stroke="var(--ink)" strokeWidth="2.5" />
            {/* grip rings */}
            <g stroke="var(--accent)" strokeWidth="2" opacity="0.85">
              <line x1="150" y1="48" x2="170" y2="48" />
              <line x1="150" y1="56" x2="170" y2="56" />
              <line x1="150" y1="64" x2="170" y2="64" />
            </g>
            {/* ferrule */}
            <rect x="151" y="80" width="18" height="14" rx="3"
              fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />
            {/* conical hot tip down to the joint */}
            <path d="M153 94 L167 94 L160 112 Z"
              fill="var(--ink2)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          </g>

          {/* incandescent tip glow sitting on the joint */}
          <ellipse className={anim('sol3-tipglow')} cx="160" cy="112" rx="9" ry="7"
            fill="var(--warn)"
            style={{ filter: 'drop-shadow(0 0 7px var(--beacon-glow))' }} />
        </g>

        {/* ============ SOLDER WIRE (feeds in from the right) ============ */}
        <g className={anim('sol3-wire')}>
          {/* spool-side wire body */}
          <line x1="206" y1="120" x2="300" y2="96"
            stroke="var(--ink2)" strokeWidth="6" strokeLinecap="round" />
          <line x1="206" y1="120" x2="300" y2="96"
            stroke="var(--slate)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {/* melting tip segment that shrinks into the joint */}
          <g className={anim('sol3-wiretip')}>
            <line x1="170" y1="129" x2="208" y2="119"
              stroke="var(--accent2)" strokeWidth="6" strokeLinecap="round" />
            <line x1="170" y1="129" x2="208" y2="119"
              stroke="var(--on-accent, #ffffff)" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
          </g>
        </g>
      </g>
    </svg>
  )
}
