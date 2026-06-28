// LV Box Wiring — Step 1: "Isolate the power"
// Looping motion: breaker lever swings ON→OFF (green→red), a padlock drops and
// snaps onto the locked-off lever, then a voltage tester probes the busbar and
// its display confirms "0V" with a brief glow. Seamless infinite cycle.
//
// Contract: pure SVG + CSS @keyframes (one inline <style>), all names prefixed
// with the collision-safe token "lvw1". Theme via brand CSS custom properties.

export default function StepAnimation({ paused = false, reduced = false }) {
  // Helper: only attach the animated variant class when motion is allowed.
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Switch the breaker off, lock it out, and confirm zero voltage"
    >
      <style>{`
        /* ---- collision-safe, brand-themed, seamless 3.6s loop ---- */
        .lvw1-stage[data-paused] * { animation-play-state: paused !important; }

        /* SVG CSS-transform model: by default rotate()/scale() pivot about the
           SVG origin (transform-box:view-box, origin 0,0), which would fling the
           lever across the canvas. Bind each rotated/scaled element to its own
           bounding box so it pivots in place. The lever's bbox top-centre is its
           hinge; the spark scales about its own centre. */
        .lvw1-lever  { transform-box: fill-box; transform-origin: center top; }
        .lvw1-spark  { transform-box: fill-box; transform-origin: center center; }

        /* Lever swings down (ON->OFF) and holds, then quietly returns near the
           loop boundary so the restart is invisible. Pivot at the breaker hinge. */
        .lvw1-lever--anim { animation: lvw1-lever 3.6s ease-in-out infinite; }
        @keyframes lvw1-lever {
          0%   { transform: rotate(-46deg); }
          6%   { transform: rotate(-46deg); }
          22%  { transform: rotate(46deg); }
          90%  { transform: rotate(46deg); }
          98%  { transform: rotate(-46deg); }
          100% { transform: rotate(-46deg); }
        }

        /* Status dot: green (ON) at top -> red (OFF) at bottom. Two stacked dots
           cross-fade so the colour flips exactly as the lever lands at OFF. */
        .lvw1-dotOn--anim  { animation: lvw1-dotOn  3.6s ease-in-out infinite; }
        .lvw1-dotOff--anim { animation: lvw1-dotOff 3.6s ease-in-out infinite; }
        @keyframes lvw1-dotOn {
          0%,12%  { opacity: 1; }
          22%,94% { opacity: 0; }
          100%    { opacity: 1; }
        }
        @keyframes lvw1-dotOff {
          0%,16%  { opacity: 0; }
          24%,92% { opacity: 1; }
          98%,100%{ opacity: 0; }
        }

        /* Padlock drops in from above and snaps onto the locked-off lever. */
        .lvw1-lock--anim { animation: lvw1-lock 3.6s ease-in-out infinite; }
        @keyframes lvw1-lock {
          0%,24%  { transform: translateY(-66px); opacity: 0; }
          30%     { opacity: 1; }
          38%     { transform: translateY(2px);   opacity: 1; }
          42%     { transform: translateY(0);      opacity: 1; }
          88%     { transform: translateY(0);      opacity: 1; }
          94%     { transform: translateY(-66px);  opacity: 0; }
          100%    { transform: translateY(-66px);  opacity: 0; }
        }
        /* Shackle "snaps" closed just after the lock seats. */
        .lvw1-shackle--anim { animation: lvw1-shackle 3.6s ease-in-out infinite; }
        @keyframes lvw1-shackle {
          0%,38%  { transform: translateX(5px) translateY(-4px); }
          44%     { transform: translateX(0)   translateY(0); }
          88%     { transform: translateX(0)   translateY(0); }
          94%,100%{ transform: translateX(5px) translateY(-4px); }
        }

        /* Voltage tester probe slides in and touches the busbar, then retreats. */
        .lvw1-tester--anim { animation: lvw1-tester 3.6s ease-in-out infinite; }
        @keyframes lvw1-tester {
          0%,48%  { transform: translateX(58px) translateY(10px); opacity: 0; }
          54%     { opacity: 1; }
          62%     { transform: translateX(0) translateY(0); opacity: 1; }
          86%     { transform: translateX(0) translateY(0); opacity: 1; }
          92%,100%{ transform: translateX(58px) translateY(10px); opacity: 0; }
        }

        /* Tester display flips to "0V" with a confirming glow when probe lands. */
        .lvw1-read0--anim { animation: lvw1-read0 3.6s ease-in-out infinite; }
        @keyframes lvw1-read0 {
          0%,62%   { opacity: 0; }
          66%      { opacity: 1; }
          86%      { opacity: 1; }
          90%,100% { opacity: 0; }
        }
        .lvw1-confirm--anim { animation: lvw1-confirm 3.6s ease-in-out infinite; }
        @keyframes lvw1-confirm {
          0%,63%  { opacity: 0; }
          68%     { opacity: 0.9; }
          78%     { opacity: 0.15; }
          86%     { opacity: 0.15; }
          90%,100%{ opacity: 0; }
        }

        /* Contact spark where probe meets busbar. */
        .lvw1-spark--anim { animation: lvw1-spark 3.6s ease-in-out infinite; }
        @keyframes lvw1-spark {
          0%,63%  { opacity: 0; transform: scale(0.4); }
          66%     { opacity: 1; transform: scale(1.15); }
          72%     { opacity: 0; transform: scale(0.4); }
          100%    { opacity: 0; transform: scale(0.4); }
        }
      `}</style>

      {/* ===== static backdrop: LV box face plate ===== */}
      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect
        x="22" y="20" width="276" height="200" rx="12"
        fill="var(--panel)" stroke="var(--slate)" strokeWidth="2"
      />
      {/* breaker module body */}
      <rect
        x="48" y="58" width="96" height="124" rx="8"
        fill="var(--navy)" stroke="var(--slate)" strokeWidth="2"
      />
      {/* ON / OFF rail labels */}
      <text x="96" y="74" textAnchor="middle" fontSize="11"
        fontFamily="system-ui, sans-serif" fontWeight="700" fill="var(--ok)">ON</text>
      <text x="96" y="178" textAnchor="middle" fontSize="11"
        fontFamily="system-ui, sans-serif" fontWeight="700" fill="var(--warn)">OFF</text>

      {/* busbar leaving the breaker toward the tester */}
      <line x1="144" y1="120" x2="206" y2="120"
        stroke="var(--slate)" strokeWidth="3" strokeLinecap="round" />
      <rect x="198" y="112" width="18" height="16" rx="3"
        fill="var(--slate)" stroke="var(--ink2)" strokeWidth="1.5" />

      {/* ===== animated content ===== */}
      <g className="lvw1-stage" data-paused={paused ? '' : undefined}>

        {/* hinge pivot fixed at breaker centre (96,120) */}
        <g transform="translate(96 120)">
          {/* status dots stacked: ON up (green), OFF down (red) */}
          <circle cx="0" cy="-30" r="6"
            className={a('lvw1-dotOn', 'lvw1-dotOn--anim')}
            fill="var(--ok)" style={{ filter: 'drop-shadow(0 0 5px var(--ok))' }} />
          <circle cx="0" cy="30" r="6"
            className={a('lvw1-dotOff', 'lvw1-dotOff--anim')}
            fill="var(--warn)" style={{ filter: 'drop-shadow(0 0 5px var(--warn))' }} />

          {/* the swinging lever; static pose (reduced) = OFF/down so it reads */}
          <g
            className={a('lvw1-lever', 'lvw1-lever--anim')}
            style={reduced ? { transform: 'rotate(46deg)' } : undefined}
          >
            <rect x="-9" y="0" width="18" height="46" rx="9"
              fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" />
            {/* knurled grip + lock hasp hole at the lever tip */}
            <rect x="-6" y="34" width="12" height="4" rx="2" fill="var(--ink)" opacity="0.45" />
            <circle cx="0" cy="9" r="4" fill="var(--ink)" opacity="0.35" />
          </g>
          {/* hinge cap */}
          <circle cx="0" cy="0" r="6" fill="var(--ink2)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        {/* padlock that drops onto the locked-off lever tip (~96,166).
           A static parent group holds the position; the animated child uses only
           relative transforms, because a CSS-animated `transform` would otherwise
           override (not compose with) a `transform` attribute on the same node. */}
        <g transform="translate(96 158)">
          <g
            className={a('lvw1-lock', 'lvw1-lock--anim')}
            style={reduced ? { transform: 'translateY(0)', opacity: 1 } : undefined}
          >
            {/* shackle */}
            <path
              className={a('lvw1-shackle', 'lvw1-shackle--anim')}
              style={reduced ? { transform: 'none' } : undefined}
              d="M -8 0 V -7 a 8 8 0 0 1 16 0 V 0"
              fill="none" stroke="var(--ink2)" strokeWidth="3.5" strokeLinecap="round"
            />
            {/* body */}
            <rect x="-12" y="0" width="24" height="20" rx="4"
              fill="var(--accent2)" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="0" cy="9" r="3.2" fill="var(--ink)" opacity="0.55" />
            <rect x="-1.4" y="9" width="2.8" height="6" rx="1.4" fill="var(--ink)" opacity="0.55" />
          </g>
        </g>

        {/* voltage tester: probe + handle + display, slides in to the busbar */}
        <g
          className={a('lvw1-tester', 'lvw1-tester--anim')}
          style={reduced ? { transform: 'none', opacity: 1 } : undefined}
        >
          {/* probe tip touching busbar at ~206,120 */}
          <line x1="226" y1="132" x2="208" y2="120"
            stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          {/* contact spark at busbar (scales about its own centre via fill-box) */}
          <g
            className={a('lvw1-spark', 'lvw1-spark--anim')}
            style={reduced ? { opacity: 0 } : undefined}
          >
            <path d="M 207 113 L 209 119 L 215 120 L 209 121 L 207 127 L 205 121 L 199 120 L 205 119 Z"
              fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 4px var(--accent))' }} />
          </g>

          {/* tester body / display housing */}
          <rect x="224" y="128" width="58" height="44" rx="8"
            fill="var(--navy)" stroke="var(--slate)" strokeWidth="2"
            transform="rotate(8 253 150)" />
          {/* display screen */}
          <g transform="rotate(8 253 150)">
            <rect x="230" y="135" width="46" height="22" rx="4"
              fill="var(--ink)" stroke="var(--slate)" strokeWidth="1.5" />
            {/* confirming glow flash behind the reading */}
            <rect
              className={a('lvw1-confirm', 'lvw1-confirm--anim')}
              style={reduced ? { opacity: 0 } : { filter: 'drop-shadow(0 0 6px var(--ok))' }}
              x="230" y="135" width="46" height="22" rx="4"
              fill="var(--ok)" />
            {/* "0V" reading appears when probe lands */}
            <text
              className={a('lvw1-read0', 'lvw1-read0--anim')}
              style={reduced ? { opacity: 1 } : undefined}
              x="253" y="151" textAnchor="middle" fontSize="14"
              fontFamily="ui-monospace, monospace" fontWeight="800"
              fill="var(--ok)">0V</text>
          </g>
        </g>
      </g>
    </svg>
  )
}
