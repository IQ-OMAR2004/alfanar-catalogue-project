// Soldering — Step 1: "Heat & tin the iron" (Solder a Joint)
// Looping motion: a fume-extraction fan spins in the top corner; the soldering-
// iron tip heats from cool grey up to glowing orange-hot while a temperature
// gauge needle sweeps from cold to the working band; once hot, a solder wire
// dips in, touches the tip and leaves a fresh shiny tinned coat. The tip then
// cools back to grey and the gauge falls, so the loop restarts seamlessly.
//
// Contract: pure SVG + CSS @keyframes (one inline <style>), every keyframe and
// class name prefixed with the collision-safe token "sol1". All colours come
// from the brand CSS custom properties so it adapts to light/dark.
export default function StepAnimation({ paused = false, reduced = false }) {
  // Helper: attach the animated modifier class only when motion is allowed.
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Heat the soldering iron to working temperature and tin its tip with fresh solder"
    >
      <style>{`
        /* ===== collision-safe, brand-themed, seamless 3.4s loop ===== */
        .sol1-stage[data-paused] * { animation-play-state: paused !important; }

        /* --- fume extraction fan: continuous, perfectly seamless spin --- */
        .sol1-fan--anim {
          animation: sol1-spin 1.7s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes sol1-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* --- iron tip heat: cool grey -> orange-hot, then cools back ---
           Two stacked tip fills cross-fade; the hot fill rises with the gauge. */
        .sol1-tipHot--anim { animation: sol1-tipHot 3.4s ease-in-out infinite; }
        @keyframes sol1-tipHot {
          0%,8%   { opacity: 0; }
          34%     { opacity: 1; }
          84%     { opacity: 1; }
          96%,100%{ opacity: 0; }
        }
        /* heat-bloom glow swelling around the hot tip */
        .sol1-bloom--anim { animation: sol1-bloom 3.4s ease-in-out infinite;
          transform-box: fill-box; transform-origin: center; }
        @keyframes sol1-bloom {
          0%,8%   { opacity: 0; transform: scale(0.5); }
          38%     { opacity: 0.85; transform: scale(1); }
          70%     { opacity: 0.6; transform: scale(1.12); }
          84%     { opacity: 0.7; transform: scale(1); }
          96%,100%{ opacity: 0; transform: scale(0.5); }
        }

        /* --- temperature gauge needle: sweeps cold -> hot band -> cold --- */
        .sol1-needle--anim {
          animation: sol1-needle 3.4s ease-in-out infinite;
          transform-box: view-box;          /* px origin resolves in view-box space */
          transform-origin: 252px 74px;      /* dial centre */
        }
        @keyframes sol1-needle {
          0%,6%   { transform: rotate(-58deg); }   /* cold */
          34%     { transform: rotate(54deg); }    /* working band */
          84%     { transform: rotate(54deg); }    /* held hot */
          98%,100%{ transform: rotate(-58deg); }   /* fall back, seamless */
        }

        /* --- solder wire: dips down to touch the hot tip, then withdraws --- */
        .sol1-wire--anim { animation: sol1-wire 3.4s ease-in-out infinite; }
        @keyframes sol1-wire {
          0%,40%  { transform: translate(0,-30px); opacity: 0; }
          46%     { opacity: 1; }
          54%     { transform: translate(0,0); opacity: 1; }   /* contact */
          70%     { transform: translate(0,0); opacity: 1; }
          78%     { transform: translate(0,-30px); opacity: 1; }
          84%,100%{ transform: translate(0,-30px); opacity: 0; }
        }

        /* --- tinned coat: shiny silver film appears on the tip on contact --- */
        .sol1-tin--anim { animation: sol1-tin 3.4s ease-in-out infinite; }
        @keyframes sol1-tin {
          0%,52%  { opacity: 0; }
          56%     { opacity: 1; }
          84%     { opacity: 1; }
          94%,100%{ opacity: 0; }
        }
        /* travelling specular highlight along the fresh tin */
        .sol1-shine--anim { animation: sol1-shine 3.4s ease-in-out infinite; }
        @keyframes sol1-shine {
          0%,56%  { opacity: 0; transform: translateY(0); }
          60%     { opacity: 0.9; transform: translateY(0); }
          70%     { opacity: 0; transform: translateY(10px); }
          100%    { opacity: 0; transform: translateY(0); }
        }

        /* --- contact spark where wire meets the hot tip --- */
        .sol1-spark--anim { animation: sol1-spark 3.4s ease-in-out infinite;
          transform-box: fill-box; transform-origin: center; }
        @keyframes sol1-spark {
          0%,52%  { opacity: 0; transform: scale(0.3); }
          56%     { opacity: 1; transform: scale(1.2); }
          63%     { opacity: 0; transform: scale(0.3); }
          100%    { opacity: 0; transform: scale(0.3); }
        }

        /* --- rising solder-fume wisp drawn up into the extractor --- */
        .sol1-fume--anim { animation: sol1-fume 3.4s ease-in-out infinite; }
        @keyframes sol1-fume {
          0%,54%  { opacity: 0; transform: translateY(0) scaleX(1); }
          62%     { opacity: 0.5; transform: translateY(-10px) scaleX(0.9); }
          80%     { opacity: 0; transform: translateY(-30px) scaleX(0.7); }
          100%    { opacity: 0; transform: translateY(0) scaleX(1); }
        }
      `}</style>

      {/* ===== static backdrop: workbench panel ===== */}
      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect
        x="16" y="16" width="288" height="208" rx="12"
        fill="var(--panel)" stroke="var(--slate)" strokeWidth="2"
      />
      {/* bench surface line */}
      <line x1="16" y1="186" x2="304" y2="186"
        stroke="var(--slate)" strokeWidth="2" opacity="0.55" />

      {/* ===== animated content ===== */}
      <g className="sol1-stage" data-paused={paused ? '' : undefined}>

        {/* ---------------------------------------------------------------- */}
        {/* Fume-extraction unit in the top-left corner */}
        <g>
          {/* extractor housing / hood */}
          <rect x="34" y="40" width="68" height="68" rx="10"
            fill="var(--navy)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* intake grille mouth */}
          <rect x="44" y="50" width="48" height="48" rx="24"
            fill="var(--ink)" stroke="var(--ink2)" strokeWidth="2" />

          {/* spinning fan blades — pivot is the bbox centre (the hub at 68,74),
              governed by transform-box:fill-box + transform-origin:center in CSS */}
          <g className={a('sol1-fan', 'sol1-fan--anim')}>
            {[0, 90, 180, 270].map((r) => (
              <path
                key={r}
                d="M68 74 C 78 60, 90 64, 88 74 C 86 80, 76 78, 68 74 Z"
                fill="var(--sky)"
                opacity="0.92"
                transform={`rotate(${r} 68 74)`}
              />
            ))}
            <circle cx="68" cy="74" r="6" fill="var(--accent2)"
              stroke="var(--ink)" strokeWidth="2" />
          </g>

          {/* extractor label dot */}
          <circle cx="96" cy="46" r="3" fill="var(--ok)"
            style={{ filter: 'drop-shadow(0 0 4px var(--ok))' }} />
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* Temperature gauge (top-right) */}
        <g>
          {/* dial face */}
          <circle cx="252" cy="74" r="34"
            fill="var(--navy)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* cold (blue) -> hot (orange) arc band */}
          <path d="M 228 95 A 34 34 0 1 1 276 95"
            fill="none" stroke="var(--sky)" strokeWidth="4"
            strokeLinecap="round" opacity="0.55" />
          <path d="M 252 40 A 34 34 0 0 1 276 95"
            fill="none" stroke="var(--accent)" strokeWidth="4"
            strokeLinecap="round" opacity="0.85" />
          {/* working-temperature target tick */}
          <line x1="270" y1="58" x2="276" y2="52"
            stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round" />

          {/* needle — pivots at the dial centre */}
          <g
            className={a('sol1-needle', 'sol1-needle--anim')}
            style={
              reduced
                ? {
                    transform: 'rotate(54deg)',
                    transformBox: 'view-box',
                    transformOrigin: '252px 74px',
                  }
                : { transformBox: 'view-box', transformOrigin: '252px 74px' }
            }
          >
            <path d="M252 74 L252 46" fill="none"
              stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }} />
          </g>
          <circle cx="252" cy="74" r="5" fill="var(--ink2)"
            stroke="var(--ink)" strokeWidth="2" />
          {/* degree glyph */}
          <text x="252" y="100" textAnchor="middle" fontSize="10"
            fontFamily="ui-monospace, monospace" fontWeight="800"
            fill="var(--ink2)">°C</text>
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* Soldering iron resting in the centre, tip pointing up-left */}
        <g>
          {/* handle (grip) angled across the bench */}
          <g transform="rotate(28 196 150)">
            <rect x="190" y="120" width="80" height="26" rx="13"
              fill="var(--ink)" stroke="var(--ink2)" strokeWidth="2" />
            {/* grip ridges */}
            <path d="M206 124 V142 M216 124 V142 M226 124 V142 M236 124 V142"
              stroke="var(--slate)" strokeWidth="1.6" opacity="0.5" />
            {/* metal collar / barrel toward the tip */}
            <rect x="168" y="125" width="26" height="16" rx="4"
              fill="var(--slate)" stroke="var(--ink2)" strokeWidth="2" />
          </g>

          {/* heat bloom behind the tip (only reads when hot) */}
          {!reduced && (
            <circle
              className="sol1-bloom--anim"
              cx="150" cy="118" r="20"
              fill="var(--accent)" opacity="0"
              style={{ filter: 'blur(3px)' }}
            />
          )}

          {/* the conical iron tip — pointing up toward the work.
              Pivot/anchor at the barrel; point at (150,108). */}
          {/* cool grey base tip (always present underneath) */}
          <path d="M150 108 L176 134 L162 148 Z" fill="var(--slate)"
            stroke="var(--ink2)" strokeWidth="2" strokeLinejoin="round" />

          {/* hot orange overlay — fades in as it heats */}
          <path
            className={a('', 'sol1-tipHot--anim')}
            style={reduced ? { opacity: 1 } : undefined}
            d="M150 108 L176 134 L162 148 Z"
            fill="var(--accent)"
            stroke="var(--accent2)" strokeWidth="2" strokeLinejoin="round"
          />

          {/* fresh tinned (shiny silver) coat over the very tip end */}
          <g
            className={a('', 'sol1-tin--anim')}
            style={reduced ? { opacity: 1 } : undefined}
          >
            <path d="M150 108 L162 120 L156 130 L150 124 Z"
              fill="var(--ink2)" opacity="0.95" />
            <path d="M150 108 L160 118 L155 124 L150 119 Z"
              fill="var(--panel)" opacity="0.9" />
            {/* travelling specular shine on the tin */}
            <line
              className={reduced ? '' : 'sol1-shine--anim'}
              x1="151" y1="110" x2="159" y2="118"
              stroke="var(--bg)" strokeWidth="2" strokeLinecap="round"
              opacity={reduced ? 0.8 : undefined}
            />
          </g>

          {/* contact spark at the tip apex */}
          {!reduced && (
            <g className="sol1-spark--anim">
              <path d="M150 99 L153 106 L160 108 L153 110 L150 117 L147 110 L140 108 L147 106 Z"
                fill="var(--warn)"
                style={{ filter: 'drop-shadow(0 0 4px var(--warn))' }} />
            </g>
          )}
        </g>

        {/* ---------------------------------------------------------------- */}
        {/* Solder wire on a small spool, dipping in to tin the tip */}
        <g
          className={a('', 'sol1-wire--anim')}
          style={reduced ? { transform: 'translate(0,0)', opacity: 1 } : undefined}
        >
          {/* wire descending toward the tip apex (150,108) from upper area */}
          <path d="M150 108 L150 88 L138 60 L150 36"
            fill="none" stroke="var(--ink2)" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round" />
          {/* bright melted wire end at the contact point */}
          <circle cx="150" cy="108" r="3.6" fill="var(--panel)"
            stroke="var(--ink2)" strokeWidth="1.5" />
        </g>

        {/* rising solder fume drawn toward the extractor (left-up) */}
        {!reduced && (
          <path
            className="sol1-fume--anim"
            d="M150 104 q -8 -10 -2 -20 q 6 -8 -2 -18"
            fill="none" stroke="var(--ink2)" strokeWidth="2.5"
            strokeLinecap="round" opacity="0"
          />
        )}
      </g>
    </svg>
  )
}
