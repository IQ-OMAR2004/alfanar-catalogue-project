// Switchgear Test — Step 1: "Visual & PPE check"
// Looping motion: a switchgear cabinet stands closed with a lock-out tag swinging
// gently from its handle (panel isolated + locked out). To the right, two PPE
// icons — an arc-flash hood and a pair of insulated gloves — light up one by one
// in brand-blue with a beacon glow (don the PPE). A horizontal scan bar then
// sweeps down the cabinet face inspecting for damage and loose parts, leaving a
// brief "check" tick. The whole sequence loops seamlessly (~3.8s).
//
// Contract: pure SVG + CSS @keyframes (one inline <style>), every keyframe and
// class name prefixed with the collision-safe token "swg1". All colours come
// from the brand CSS custom properties so it adapts to light/dark automatically.

export default function StepAnimation({ paused = false, reduced = false }) {
  // Attach the animated variant class only when motion is allowed.
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Locked-out switchgear cabinet, arc-flash PPE lighting up, and a scan bar inspecting the panel face"
    >
      <style>{`
        /* ---- collision-safe, brand-themed, seamless 3.8s loop ---- */
        .swg1-stage[data-paused] * { animation-play-state: paused !important; }

        /* Lock-out tag swings gently from the cabinet handle. Pivot at its top
           eyelet so the motion reads as a hanging tag in a faint draft. The
           ease keeps both extremes equal, so the loop boundary is invisible. */
        .swg1-tag--anim { animation: swg1-tag 3.8s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes swg1-tag {
          0%   { transform: rotate(-7deg); }
          25%  { transform: rotate(6deg); }
          50%  { transform: rotate(-5deg); }
          75%  { transform: rotate(6deg); }
          100% { transform: rotate(-7deg); }
        }

        /* PPE #1 — arc-flash hood — lights up first, then settles to a calm lit
           state and dims again before the cycle restarts. */
        .swg1-ppe1--anim { animation: swg1-ppe1 3.8s ease-in-out infinite; }
        @keyframes swg1-ppe1 {
          0%,6%    { opacity: 0.25; }
          14%      { opacity: 1; }
          22%      { opacity: 0.85; }
          88%      { opacity: 0.85; }
          96%,100% { opacity: 0.25; }
        }
        /* glow ring behind hood pulses on as it activates */
        .swg1-glow1--anim { animation: swg1-glow1 3.8s ease-in-out infinite; }
        @keyframes swg1-glow1 {
          0%,8%    { opacity: 0; transform: scale(0.6); }
          14%      { opacity: 0.9; transform: scale(1.05); }
          24%      { opacity: 0.35; transform: scale(1); }
          88%      { opacity: 0.35; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.6); }
        }

        /* PPE #2 — insulated gloves — lights up second, just after the hood. */
        .swg1-ppe2--anim { animation: swg1-ppe2 3.8s ease-in-out infinite; }
        @keyframes swg1-ppe2 {
          0%,20%   { opacity: 0.25; }
          30%      { opacity: 1; }
          38%      { opacity: 0.85; }
          88%      { opacity: 0.85; }
          96%,100% { opacity: 0.25; }
        }
        .swg1-glow2--anim { animation: swg1-glow2 3.8s ease-in-out infinite; }
        @keyframes swg1-glow2 {
          0%,22%   { opacity: 0; transform: scale(0.6); }
          30%      { opacity: 0.9; transform: scale(1.05); }
          40%      { opacity: 0.35; transform: scale(1); }
          88%      { opacity: 0.35; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.6); }
        }

        /* Scan bar sweeps down the cabinet face (inspect for damage). It travels
           through the panel interior, fades at the bottom, and is hidden again
           by the time the loop restarts at the top — no visible jump. */
        .swg1-scan--anim { animation: swg1-scan 3.8s ease-in-out infinite; }
        @keyframes swg1-scan {
          0%,42%   { transform: translateY(0);    opacity: 0; }
          48%      { transform: translateY(0);    opacity: 1; }
          82%      { transform: translateY(96px); opacity: 1; }
          90%,100% { transform: translateY(108px); opacity: 0; }
        }

        /* Inspection "check" tick appears once the scan completes its sweep. */
        .swg1-check--anim { animation: swg1-check 3.8s ease-in-out infinite; }
        @keyframes swg1-check {
          0%,82%   { opacity: 0; transform: scale(0.5); }
          88%      { opacity: 1; transform: scale(1.1); }
          93%      { opacity: 1; transform: scale(1); }
          97%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      {/* ===== static backdrop ===== */}
      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />

      {/* ===== switchgear cabinet (static structure) ===== */}
      {/* outer enclosure */}
      <rect
        x="40" y="34" width="150" height="172" rx="8"
        fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5"
      />
      {/* recessed panel face (the inspected area) */}
      <rect
        x="52" y="46" width="126" height="148" rx="5"
        fill="var(--navy)" stroke="var(--ink2)" strokeWidth="2"
      />
      {/* louvre / vent lines across the face — give the scan something to read */}
      <g stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <line x1="66" y1="64" x2="164" y2="64" />
        <line x1="66" y1="76" x2="164" y2="76" />
        <line x1="66" y1="88" x2="164" y2="88" />
      </g>
      {/* meter / status window on the door */}
      <rect x="66" y="104" width="44" height="30" rx="3"
        fill="var(--ink)" stroke="var(--slate)" strokeWidth="1.5" />
      <circle cx="76" cy="119" r="3.5" fill="var(--ok)"
        style={{ filter: 'drop-shadow(0 0 4px var(--ok))' }} />
      <line x1="86" y1="115" x2="102" y2="115" stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" />
      <line x1="86" y1="123" x2="98" y2="123" stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" />
      {/* lower vent grille */}
      <g stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <line x1="66" y1="160" x2="164" y2="160" />
        <line x1="66" y1="172" x2="164" y2="172" />
        <line x1="66" y1="184" x2="164" y2="184" />
      </g>

      {/* cabinet door handle (static anchor for the tag) */}
      <rect x="150" y="116" width="10" height="34" rx="5"
        fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="155" cy="122" r="3" fill="var(--ink)" opacity="0.5" />

      {/* ===== animated content ===== */}
      <g className="swg1-stage" data-paused={paused ? '' : undefined}>

        {/* ---- lock-out tag hanging from the handle (~155,150) ---- */}
        <g transform="translate(155 150)">
          {/* tether wire from handle eyelet to the tag */}
          <g
            className={a('swg1-tag', 'swg1-tag--anim')}
            style={reduced ? { transform: 'rotate(-3deg)', transformOrigin: '0 0' } : undefined}
          >
            <line x1="0" y1="0" x2="0" y2="12"
              stroke="var(--ink2)" strokeWidth="2.5" strokeLinecap="round" />
            {/* tag body — warn red = "DO NOT OPERATE / locked out" */}
            <rect x="-15" y="12" width="30" height="42" rx="5"
              fill="var(--warn)" stroke="var(--ink)" strokeWidth="2.5" />
            {/* eyelet hole */}
            <circle cx="0" cy="19" r="3" fill="var(--navy)" stroke="var(--ink)" strokeWidth="1.2" />
            {/* tag text lines (schematic) */}
            <line x1="-9" y1="30" x2="9" y2="30" stroke="var(--bg-2, #fff)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-9" y1="37" x2="9" y2="37" stroke="var(--bg-2, #fff)" strokeWidth="2.5" strokeLinecap="round" />
            {/* small padlock badge on the tag = locked out */}
            <g transform="translate(0 46)">
              <path d="M -3 0 v -2.4 a 3 3 0 0 1 6 0 V 0"
                fill="none" stroke="var(--bg-2, #fff)" strokeWidth="2" strokeLinecap="round" />
              <rect x="-4.2" y="0" width="8.4" height="6.5" rx="1.4" fill="var(--bg-2, #fff)" />
            </g>
          </g>
        </g>

        {/* ---- scan highlight bar sweeping down the panel face ---- */}
        <g
          className={a('swg1-scan', 'swg1-scan--anim')}
          style={reduced ? { transform: 'translateY(50px)', opacity: 1 } : undefined}
          transform="translate(0 56)"
        >
          {/* soft leading glow */}
          <rect x="52" y="-6" width="126" height="14" rx="3"
            fill="var(--sky)" opacity="0.18" />
          {/* bright scan line */}
          <rect x="52" y="0" width="126" height="3.5" rx="1.75"
            fill="var(--accent)"
            style={{ filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }} />
          {/* corner brackets riding the scan line — reads as an inspection cursor */}
          <path d="M 52 -7 v -7 M 52 -7 h 7" fill="none"
            stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 178 -7 v -7 M 178 -7 h -7" fill="none"
            stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* inspection check tick (appears after the sweep, lower-right of cabinet) */}
        <g
          className={a('swg1-check', 'swg1-check--anim')}
          style={reduced ? { opacity: 0 } : { transformOrigin: '170px 188px' }}
        >
          <circle cx="170" cy="188" r="11"
            fill="var(--ok)" style={{ filter: 'drop-shadow(0 0 5px var(--ok))' }} />
          <path d="M 165 188 l 3.5 4 l 7 -8" fill="none"
            stroke="var(--bg-2, #fff)" strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ===== PPE checklist column (right side) ===== */}

        {/* --- PPE #1: arc-flash hood --- */}
        <g transform="translate(252 78)">
          {/* activation glow ring */}
          <circle
            className={a('swg1-glow1', 'swg1-glow1--anim')}
            style={reduced ? { opacity: 0.35, transform: 'scale(1)' } : { transformOrigin: '0px 0px' }}
            cx="0" cy="0" r="30"
            fill="none" stroke="var(--sky)" strokeWidth="3" opacity="0.35"
          />
          {/* the hood icon — dims/brightens with the cycle */}
          <g
            className={a('swg1-ppe1', 'swg1-ppe1--anim')}
            style={reduced ? { opacity: 1 } : undefined}
          >
            {/* hood shell */}
            <path d="M -20 -6 a 20 24 0 0 1 40 0 v 18 a 14 10 0 0 1 -40 0 Z"
              fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
            {/* visor window */}
            <path d="M -15 -8 a 15 13 0 0 1 30 0 v 8 a 15 7 0 0 1 -30 0 Z"
              fill="var(--navy)" stroke="var(--ink)" strokeWidth="2" opacity="0.92" />
            {/* visor highlight sheen */}
            <line x1="-9" y1="-8" x2="-3" y2="0" stroke="var(--sky)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </g>
        </g>

        {/* --- PPE #2: insulated gloves --- */}
        <g transform="translate(252 152)">
          <circle
            className={a('swg1-glow2', 'swg1-glow2--anim')}
            style={reduced ? { opacity: 0.35, transform: 'scale(1)' } : { transformOrigin: '0px 0px' }}
            cx="0" cy="0" r="30"
            fill="none" stroke="var(--sky)" strokeWidth="3" opacity="0.35"
          />
          <g
            className={a('swg1-ppe2', 'swg1-ppe2--anim')}
            style={reduced ? { opacity: 1 } : undefined}
          >
            {/* left glove */}
            <g transform="translate(-9 0)">
              <path d="M -8 -14 v 16 a 8 8 0 0 0 16 0 v -16"
                fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
              {/* thumb */}
              <path d="M -8 -4 q -6 -1 -6 -8"
                fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
              {/* finger splits */}
              <line x1="-3" y1="-14" x2="-3" y2="-7" stroke="var(--ink)" strokeWidth="1.8" />
              <line x1="3" y1="-14" x2="3" y2="-7" stroke="var(--ink)" strokeWidth="1.8" />
              {/* insulated cuff band */}
              <rect x="-9" y="2" width="18" height="6" rx="2" fill="var(--accent2)" stroke="var(--ink)" strokeWidth="1.5" />
            </g>
            {/* right glove (mirrored, offset) */}
            <g transform="translate(11 4) scale(-1 1)">
              <path d="M -8 -14 v 16 a 8 8 0 0 0 16 0 v -16"
                fill="var(--accent)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.92" />
              <path d="M -8 -4 q -6 -1 -6 -8"
                fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="-9" y="2" width="18" height="6" rx="2" fill="var(--accent2)" stroke="var(--ink)" strokeWidth="1.5" />
            </g>
          </g>
        </g>

        {/* connector ticks linking cabinet checks to the PPE column (static) */}
        <g stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" opacity="0.4" fill="none">
          <path d="M 200 78 h 18" />
          <path d="M 200 152 h 18" />
        </g>
      </g>
    </svg>
  )
}
