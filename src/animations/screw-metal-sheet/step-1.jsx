// Step 1 — "Mark the drill points" (Drive Screws into the Sheet)
// A metal sheet with a ruler laid along its top reference edge. A centre-punch
// travels to four evenly-spaced positions, taps down at each, and a cross/dimple
// mark is left behind in sequence. At the end of the cycle the punch glides back
// to the first point as the marks fade out — so the loop restarts seamlessly.
//
// Prefix for every keyframe + class name: "scr1" (collision-safe — 18 of these
// animations mount in the same document at once).
export default function StepAnimation({ paused = false, reduced = false }) {
  // Helper: add the animated modifier only when motion is allowed.
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  // Four evenly-spaced drill points along the sheet (x positions in viewBox units).
  const PTS = [86, 138, 190, 242]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Centre-punch marking evenly spaced drill points along a metal sheet's reference edge"
    >
      <style>{`
        /* ---- punch vertical tap: hover, strike, recoil, hold ---------------- */
        @keyframes scr1-tap {
          0%,  88%, 100% { transform: translateY(0); }
          3%             { transform: translateY(22px); }   /* strike */
          7%             { transform: translateY(-3px); }   /* recoil */
          11%            { transform: translateY(0); }      /* settle */
        }
        /* punch travels left->right across the 4 points, then glides home. The
           start and end x are identical (point 1) so the loop is seamless. */
        @keyframes scr1-travel {
          0%,  10%  { transform: translateX(86px); }
          22%, 32%  { transform: translateX(138px); }
          44%, 54%  { transform: translateX(190px); }
          66%, 86%  { transform: translateX(242px); }
          100%      { transform: translateX(86px); }       /* glide back home */
        }
        /* the impact flash / shock ring at the tool tip on each strike */
        @keyframes scr1-shock {
          0%, 100% { transform: scale(0.2); opacity: 0; }
          3%       { transform: scale(0.2); opacity: 0; }
          5%       { transform: scale(1);   opacity: 0.8; }
          12%      { transform: scale(1.9); opacity: 0; }
        }

        /* ---- each mark pops in when struck, then all clear at cycle end ----- */
        @keyframes scr1-mark1 { 0%,5%{transform:scale(0);opacity:0} 8%{transform:scale(1.25);opacity:1} 12%,92%{transform:scale(1);opacity:1} 100%{transform:scale(1);opacity:0} }
        @keyframes scr1-mark2 { 0%,17%{transform:scale(0);opacity:0} 20%{transform:scale(1.25);opacity:1} 24%,92%{transform:scale(1);opacity:1} 100%{transform:scale(1);opacity:0} }
        @keyframes scr1-mark3 { 0%,39%{transform:scale(0);opacity:0} 42%{transform:scale(1.25);opacity:1} 46%,92%{transform:scale(1);opacity:1} 100%{transform:scale(1);opacity:0} }
        @keyframes scr1-mark4 { 0%,61%{transform:scale(0);opacity:0} 64%{transform:scale(1.25);opacity:1} 68%,92%{transform:scale(1);opacity:1} 100%{transform:scale(1);opacity:0} }

        /* subtle living glow on the punch tip */
        @keyframes scr1-glow { 0%,100%{opacity:.35} 50%{opacity:.7} }

        /* ---- bindings ------------------------------------------------------- */
        .scr1-carriage--anim { animation: scr1-travel 3.4s var(--ease-in-out) infinite; }
        .scr1-punch--anim    { animation: scr1-tap 3.4s var(--ease-in-out) infinite; transform-origin: center; }
        .scr1-shock--anim    { animation: scr1-shock 3.4s linear infinite; }
        .scr1-tip--anim      { animation: scr1-glow 1.7s var(--ease-in-out) infinite; }

        .scr1-m1--anim { animation: scr1-mark1 3.4s var(--ease-in-out) infinite; }
        .scr1-m2--anim { animation: scr1-mark2 3.4s var(--ease-in-out) infinite; }
        .scr1-m3--anim { animation: scr1-mark3 3.4s var(--ease-in-out) infinite; }
        .scr1-m4--anim { animation: scr1-mark4 3.4s var(--ease-in-out) infinite; }

        .scr1-mark { transform-box: fill-box; transform-origin: center; }

        /* pause freeze (center-tap) and reduced-motion stillness */
        .scr1-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="scr1-stage" data-paused={paused ? '' : undefined}>
        {/* ---------------------------------------------------------------- */}
        {/* metal sheet */}
        <g>
          <rect
            x="40"
            y="108"
            width="232"
            height="104"
            rx="6"
            fill="var(--panel)"
            stroke="var(--slate)"
            strokeWidth="2.5"
          />
          {/* brushed-metal hint lines */}
          <path
            d="M52 134 H260 M52 158 H260 M52 182 H260"
            stroke="var(--line-2)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* corner mounting holes — context for the screws to come */}
          <circle cx="56" cy="124" r="3.4" fill="none" stroke="var(--slate)" strokeWidth="2" />
          <circle cx="256" cy="124" r="3.4" fill="none" stroke="var(--slate)" strokeWidth="2" />
          <circle cx="56" cy="196" r="3.4" fill="none" stroke="var(--slate)" strokeWidth="2" />
          <circle cx="256" cy="196" r="3.4" fill="none" stroke="var(--slate)" strokeWidth="2" />
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* ruler laid along the reference (top) edge */}
        <g>
          <rect
            x="40"
            y="84"
            width="232"
            height="20"
            rx="3"
            fill="var(--accent)"
            stroke="var(--accent2)"
            strokeWidth="2"
            opacity="0.95"
          />
          {/* graduation ticks (long marks fall on the drill points) */}
          <g stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round" opacity="0.92">
            <path d="M60 96 V100 M73 98 V100 M86 92 V100 M99 98 V100 M112 98 V100 M125 98 V100 M138 92 V100 M151 98 V100 M164 98 V100 M177 98 V100 M190 92 V100 M203 98 V100 M216 98 V100 M229 98 V100 M242 92 V100 M255 98 V100" />
          </g>
          {/* reference-edge label dot */}
          <circle cx="48" cy="94" r="2.6" fill="var(--on-accent)" />
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* the punched marks (cross + central dimple), revealed in sequence */}
        {PTS.map((x, i) => (
          <g
            key={x}
            className={a('scr1-mark', `scr1-m${i + 1}--anim`)}
            style={reduced ? { opacity: 1 } : undefined}
          >
            {/* etched cross */}
            <path
              d={`M${x - 7} 158 H${x + 7} M${x} 151 V165`}
              stroke="var(--navy)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* dimple */}
            <circle cx={x} cy="158" r="3.4" fill="var(--accent2)" />
            <circle cx={x} cy="158" r="3.4" fill="none" stroke="var(--navy)" strokeWidth="1.5" />
          </g>
        ))}

        {/* ---------------------------------------------------------------- */}
        {/* travelling carriage carrying the centre-punch.                    */}
        {/* In reduced mode it parks over the last point (action still reads). */}
        <g
          className={a('', 'scr1-carriage--anim')}
          style={reduced ? { transform: 'translateX(242px)' } : undefined}
        >
          {/* shock ring at the tool tip (impact feedback) */}
          {!reduced && (
            <g className="scr1-shock--anim" style={{ transformOrigin: '0px 158px' }}>
              <circle cx="0" cy="158" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            </g>
          )}

          {/* the punch body — taps vertically */}
          <g className={a('', 'scr1-punch--anim')}>
            {/* knurled handle */}
            <rect x="-9" y="20" width="18" height="56" rx="5" fill="var(--ink)" />
            <path
              d="M-9 34 H9 M-9 44 H9 M-9 54 H9 M-9 64 H9"
              stroke="var(--slate)"
              strokeWidth="1.6"
              opacity="0.55"
            />
            {/* collar */}
            <rect x="-7" y="76" width="14" height="10" rx="2" fill="var(--ink2)" />
            {/* tapered tip pointing at the mark */}
            <path d="M-7 86 L0 138 L7 86 Z" fill="var(--slate)" />
            <path d="M-2.6 116 L0 138 L2.6 116 Z" fill="var(--accent)" />
            {/* glowing tip point */}
            <circle
              className={reduced ? '' : 'scr1-tip--anim'}
              cx="0"
              cy="138"
              r="3.2"
              fill="var(--accent)"
              style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }}
            />
          </g>
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* dimension callout: "measure from the reference edge" */}
        <g stroke="var(--accent2)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <path d="M40 224 H86" />
          <path d="M40 220 V228 M86 220 V228" />
        </g>
        <circle cx="63" cy="224" r="2.4" fill="var(--accent)" />
      </g>
    </svg>
  )
}
