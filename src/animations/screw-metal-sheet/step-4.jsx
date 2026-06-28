// Step 4 — "Drive the screws" (Drive Screws into the Sheet)
// A self-tapping screw spins (rotation tick marks travel along its thread) and
// drives straight down into the pilot hole, sinking into the sheet until its
// head seats flush; a clutch/torque gauge sweeps up and clicks at the end of the
// cycle. Then it resets. Pure SVG + CSS, prefix "scr4" (collision-safe).
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Self-tapping screw driving flush into a metal sheet with a torque clutch click"
    >
      <style>{`
        .scr4-stage[data-paused] * { animation-play-state: paused !important; }

        /* whole screw+driver column: descend so the head seats flush, then reset.
           Most of the cycle is the drive; a short tail holds flush + clicks. */
        .scr4-column--anim {
          animation: scr4-drive 3.4s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
        }
        @keyframes scr4-drive {
          0%   { transform: translateY(0); }
          8%   { transform: translateY(0); }       /* poised, tip engages the pilot hole */
          62%  { transform: translateY(115px); }   /* head bottom (y40+9) reaches sheet top (y164): flush */
          92%  { transform: translateY(115px); }   /* hold flush through the clutch click */
          100% { transform: translateY(0); }        /* snap back to top — hidden by reset fade (92-100% opacity 0) */
        }

        /* the drive recess on the head spins — literal "screw is turning" cue,
           without flipping the upright screw body */
        .scr4-spin--anim {
          animation: scr4-spin 0.5s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr4-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }   /* 0 == 360, seamless */
        }

        /* thread tick marks travel downward to read as rotation cutting in */
        .scr4-thread--anim {
          animation: scr4-thread 0.5s linear infinite;
        }
        @keyframes scr4-thread {
          from { transform: translateY(0); }
          to   { transform: translateY(7px); }    /* one thread pitch == seamless */
        }

        /* faint rotation arc/arrows orbiting the head while turning */
        .scr4-turn--anim {
          animation: scr4-turn 0.9s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr4-turn {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* the screw shaft "fills" the pilot hole as it sinks (mask reveal) */
        .scr4-seatmark--anim {
          animation: scr4-seatmark 3.4s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        @keyframes scr4-seatmark {
          0%, 8% { opacity: 0; transform: scaleY(0.1); }
          62%    { opacity: 1; transform: scaleY(1); }
          92%    { opacity: 1; transform: scaleY(1); }  /* stays filled while screw is held flush */
          96%    { opacity: 0; transform: scaleY(1); }  /* clear before the snap-back, no scaleY rewind on screen */
          100%   { opacity: 0; transform: scaleY(0.1); }
        }

        /* flush-seat flash: bright ring pops the instant the head meets the sheet */
        .scr4-flush--anim {
          animation: scr4-flush 3.4s ease-out infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr4-flush {
          0%, 58% { opacity: 0; transform: scale(0.4); }
          64%     { opacity: 0.95; transform: scale(1.5); }
          76%     { opacity: 0; transform: scale(2.3); }
          100%    { opacity: 0; transform: scale(2.3); }
        }

        /* clutch gauge needle: loads up with torque, then snaps back on the click */
        .scr4-needle--anim {
          animation: scr4-needle 3.4s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        @keyframes scr4-needle {
          0%, 8% { transform: rotate(-58deg); }   /* idle */
          62%    { transform: rotate(40deg); }    /* torque builds as it seats */
          70%    { transform: rotate(58deg); }    /* hits the set clutch limit */
          72%    { transform: rotate(-58deg); }   /* CLICK — clutch slips, releases */
          100%   { transform: rotate(-58deg); }
        }

        /* "click" burst near the gauge when the clutch trips */
        .scr4-click--anim {
          animation: scr4-click 3.4s ease-out infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr4-click {
          0%, 68% { opacity: 0; transform: scale(0.3); }
          72%     { opacity: 1; transform: scale(1.1); }
          84%     { opacity: 0; transform: scale(1.5); }
          100%    { opacity: 0; transform: scale(1.5); }
        }

        /* gauge "OK / torque set" pip lights up on the click */
        .scr4-okpip--anim {
          animation: scr4-okpip 3.4s linear infinite;
        }
        @keyframes scr4-okpip {
          0%, 70% { opacity: 0.25; }
          74%     { opacity: 1; }
          90%     { opacity: 1; }
          100%    { opacity: 0.25; }
        }

        /* hides the whole moving column at the very end so the reset is invisible */
        .scr4-reset--anim {
          animation: scr4-reset 3.4s linear infinite;
        }
        @keyframes scr4-reset {
          0%   { opacity: 0; }   /* boundary matches 100% -> perfectly seamless */
          4%   { opacity: 1; }   /* fade in at the top, poised over the hole */
          88%  { opacity: 1; }   /* visible through drive + flush + click */
          92%  { opacity: 0; }   /* fully hidden BEFORE the 92-100% snap-back retreat */
          100% { opacity: 0; }
        }
      `}</style>

      {/* ---- static technical baseline ---- */}
      <line x1="0" y1="186" x2="320" y2="186" stroke="var(--line, #0a82c61a)" strokeWidth="1" />

      <g className="scr4-stage" data-paused={paused ? '' : undefined}>
        {/* ============ METAL SHEET ============ */}
        <g>
          <rect x="40" y="164" width="240" height="22" rx="3"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* top sheen highlight */}
          <rect x="44" y="167" width="232" height="4" rx="2" fill="var(--bg-2, #ffffff)" opacity="0.55" />

          {/* already-seated screw on the left (context) */}
          <g>
            <circle cx="92" cy="172" r="6.5" fill="var(--navy)" stroke="var(--accent2)" strokeWidth="2" />
            <line x1="88.5" y1="172" x2="95.5" y2="172" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* open pilot hole waiting on the right (to-do) */}
          <ellipse cx="232" cy="170" rx="6" ry="3.2"
            fill="var(--navy)" stroke="var(--ink2)" strokeWidth="1.5" opacity="0.65" />

          {/* ===== active pilot hole at x=160 ===== */}
          <ellipse cx="160" cy="170" rx="6.5" ry="3.6"
            fill="var(--navy)" stroke="var(--ink2)" strokeWidth="2" />

          {/* shaft progressively fills the hole as the screw sinks in */}
          <g className={anim('scr4-reset')}>
            <rect className={anim('scr4-seatmark')} x="156.5" y="160" width="7" height="14" opacity="0"
              fill="var(--accent2)" stroke="var(--accent)" strokeWidth="1.5"
              style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }} />
          </g>
        </g>

        {/* ===== flush-seat flash, centred on the hole (hidden by default; only the
                 keyframes reveal it, so the reduced still stays clean) ===== */}
        <g transform="translate(160 168)">
          <circle className={anim('scr4-flush')} r="8" fill="none" opacity="0"
            stroke="var(--accent)" strokeWidth="2.5"
            style={{ filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }} />
        </g>

        {/* ============ DRIVING SCREW COLUMN (poised over the active hole, x=160) ============ */}
        <g className={anim('scr4-reset')}>
          <g className={anim('scr4-column')}>
            {/* rotation arrows orbiting the head — clearly "being turned" */}
            <g transform="translate(160 48)">
              <g className={anim('scr4-turn')} opacity="0.9">
                <path d="M-18 0 A18 18 0 0 1 -3 -17" fill="none"
                  stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M-3 -17 l-5 -1 l3 5 Z" fill="var(--accent)" />
                <path d="M18 0 A18 18 0 0 1 3 17" fill="none"
                  stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M3 17 l5 1 l-3 -5 Z" fill="var(--accent)" />
              </g>
            </g>

            {/* ---- the screw itself, kept upright while it drives down ----
                 local: head 0..9, shank 9..42, tip point at 50. Group at y=44,
                 driven +115px -> head bottom lands at y=168 (flush on the sheet top y=164). */}
            <g transform="translate(160 44)">
              {/* pan head */}
              <path d="M-13 0 L13 0 L11 9 L-11 9 Z"
                fill="var(--navy)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
              {/* spinning drive recess (cross) — literal "the screw is turning" */}
              <g transform="translate(0 4.5)">
                <g className={anim('scr4-spin')} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="-6" y1="0" x2="6" y2="0" />
                  <line x1="0" y1="-3.5" x2="0" y2="3.5" />
                </g>
              </g>

              {/* threaded shank — outline (ends in a self-tapping point) */}
              <path d="M-6 9 L6 9 L6 42 L0 50 L-6 42 Z"
                fill="var(--panel-2, #ffffff)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />

              {/* travelling thread tick marks (clipped to the shank region) */}
              <clipPath id="scr4-shankclip">
                <path d="M-6 9 L6 9 L6 42 L0 50 L-6 42 Z" />
              </clipPath>
              <g clipPath="url(#scr4-shankclip)">
                <g className={anim('scr4-thread')}>
                  <g stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                    {/* angled ticks every 7px = one thread pitch (matches the 7px scroll) */}
                    <path d="M-6 14 L6 18" />
                    <path d="M-6 21 L6 25" />
                    <path d="M-6 28 L6 32" />
                    <path d="M-6 35 L6 39" />
                    <path d="M-6 42 L6 46" />
                    {/* one extra above the top so the 0->7px scroll is seamless */}
                    <path d="M-6 7 L6 11" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* ============ CLUTCH / TORQUE GAUGE (fixed, top-right) ============ */}
        <g transform="translate(272 48)">
          {/* dial face */}
          <circle r="26" fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* scale arc */}
          <path d="M-18 8 A20 20 0 0 1 18 8" fill="none"
            stroke="var(--ink2)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {/* tick marks across the scale */}
          <g stroke="var(--ink2)" strokeWidth="1.5" opacity="0.6">
            <line x1="-17" y1="6" x2="-21" y2="8" />
            <line x1="-9" y1="-7" x2="-12" y2="-10" />
            <line x1="0" y1="-12" x2="0" y2="-16" />
            <line x1="9" y1="-7" x2="12" y2="-10" />
            <line x1="17" y1="6" x2="21" y2="8" />
          </g>
          {/* clutch-limit zone (the set torque target) */}
          <path d="M12 -8 A16 16 0 0 1 17 4" fill="none"
            stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* needle, pivoting from gauge centre */}
          <g transform="translate(0 4)">
            <g className={anim('scr4-needle')}>
              <line x1="0" y1="0" x2="0" y2="-22" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }} />
            </g>
          </g>
          <circle r="3" fill="var(--navy)" stroke="var(--ink)" strokeWidth="1.5" />

          {/* "torque set" OK pip that lights on the click (idle-dim by default) */}
          <circle className={anim('scr4-okpip')} cx="0" cy="16" r="3.2" opacity="0.25"
            fill="var(--ok)"
            style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }} />
        </g>

        {/* ===== CLICK burst over the gauge when the clutch trips ===== */}
        <g transform="translate(272 48)">
          <g className={anim('scr4-click')} opacity="0" stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }}>
            <line x1="0" y1="-30" x2="0" y2="-37" />
            <line x1="22" y1="-22" x2="28" y2="-28" />
            <line x1="30" y1="0" x2="38" y2="0" />
            <line x1="-22" y1="-22" x2="-28" y2="-28" />
          </g>
        </g>
      </g>
    </svg>
  )
}
