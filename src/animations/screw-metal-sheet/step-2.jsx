export default function StepAnimation({ paused = false, reduced = false }) {
  /* ----------------------------------------------------------------------
     Step 2 — "Clamp the sheet"
     A metal sheet slides into alignment onto a frame, a toggle/G-clamp jaw
     rotates down and closes onto the sheet edge, then a tiny shake-settle
     shows it is locked solid. Seamless 3.6s loop.
     Unique prefix: scr2
  ---------------------------------------------------------------------- */
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Clamp the metal sheet down firmly onto the frame"
    >
      <style>{`
        /* ---- sheet: slide in, lock, slight settle, slide back out ------- */
        @keyframes scr2-sheet {
          0%   { transform: translateX(70px); }
          18%  { transform: translateX(2px); }
          24%  { transform: translateX(0); }       /* aligned to frame */
          /* locked + shake while clamp grips */
          52%  { transform: translateX(0); }
          54%  { transform: translateX(-1.4px); }
          56%  { transform: translateX(1.2px); }
          58%  { transform: translateX(-0.6px); }
          60%  { transform: translateX(0); }        /* settled / locked */
          86%  { transform: translateX(0); }
          100% { transform: translateX(70px); }     /* == 0% : seamless */
        }

        /* ---- clamp arm: open, hold, rotate down to grip, hold, release -- */
        @keyframes scr2-arm {
          0%   { transform: rotate(-58deg); }       /* jaw open / up */
          24%  { transform: rotate(-58deg); }       /* wait for sheet */
          44%  { transform: rotate(-4deg); }         /* slam down */
          49%  { transform: rotate(2deg); }          /* overshoot bite */
          54%  { transform: rotate(0deg); }          /* gripping firm */
          84%  { transform: rotate(0deg); }          /* held locked */
          96%  { transform: rotate(-58deg); }        /* release / open */
          100% { transform: rotate(-58deg); }        /* == 0% : seamless */
        }

        /* ---- handle: pull-over toggle action follows the arm ----------- */
        @keyframes scr2-handle {
          0%   { transform: rotate(40deg); }
          24%  { transform: rotate(40deg); }
          44%  { transform: rotate(-6deg); }
          54%  { transform: rotate(0deg); }
          84%  { transform: rotate(0deg); }
          96%  { transform: rotate(40deg); }
          100% { transform: rotate(40deg); }
        }

        /* ---- locked beacon: glow pulse once clamp is firm -------------- */
        @keyframes scr2-lock {
          0%,  54%  { opacity: 0; transform: scale(0.4); }
          60%       { opacity: 1; transform: scale(1.12); }
          66%       { opacity: 0.85; transform: scale(1); }
          82%       { opacity: 0.85; transform: scale(1); }
          92%, 100% { opacity: 0; transform: scale(0.4); }
        }

        /* ---- alignment guides blink while aligning -------------------- */
        @keyframes scr2-guide {
          0%,  10%  { opacity: 0.15; }
          18%       { opacity: 0.9; }
          24%, 100% { opacity: 0.15; }
        }

        .scr2-sheet--anim  { animation: scr2-sheet  3.6s var(--ease-in-out, ease-in-out) infinite; }
        .scr2-arm--anim    { animation: scr2-arm    3.6s var(--ease-in-out, ease-in-out) infinite; transform-box: view-box; }
        .scr2-handle--anim { animation: scr2-handle 3.6s var(--ease-in-out, ease-in-out) infinite; transform-box: view-box; }
        .scr2-lock--anim   { animation: scr2-lock   3.6s ease-out infinite; transform-box: view-box; }
        .scr2-guide--anim  { animation: scr2-guide  3.6s ease-in-out infinite; }

        .scr2-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="scr2-stage" data-paused={paused ? '' : undefined}>
        {/* ===================== FRAME (fixed base) ===================== */}
        {/* work-frame the sheet seats onto */}
        <rect
          x="36" y="150" width="248" height="20" rx="3"
          fill="var(--panel)" stroke="var(--navy)" strokeWidth="2.5"
        />
        {/* frame rails / mounting lugs */}
        <rect x="50" y="170" width="16" height="30" rx="2" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2" />
        <rect x="254" y="170" width="16" height="30" rx="2" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2" />
        {/* registration pins on the frame top */}
        <rect x="92" y="144" width="6" height="8" rx="1.5" fill="var(--navy)" />
        <rect x="222" y="144" width="6" height="8" rx="1.5" fill="var(--navy)" />

        {/* alignment guides (blink while seating) */}
        <g className={anim('scr2-guide')} stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round">
          <line x1="95" y1="60" x2="95" y2="140" />
          <line x1="225" y1="60" x2="225" y2="140" />
        </g>

        {/* ===================== METAL SHEET (slides in) ===================== */}
        <g className={anim('scr2-sheet')}>
          <rect
            x="70" y="118" width="180" height="32" rx="2"
            fill="var(--sky)" stroke="var(--navy)" strokeWidth="2.5"
          />
          {/* sheet sheen / fold line for material read */}
          <line x1="70" y1="128" x2="250" y2="128" stroke="var(--bg)" strokeWidth="2" opacity="0.55" />
          {/* pre-drilled holes that register on the pins */}
          <circle cx="95" cy="134" r="3" fill="var(--navy)" />
          <circle cx="225" cy="134" r="3" fill="var(--navy)" />
        </g>

        {/* ===================== TOGGLE / G-CLAMP ===================== */}
        {/* clamp body anchored to the right of the frame */}
        <g>
          {/* fixed clamp column */}
          <rect x="236" y="92" width="18" height="62" rx="3" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2.5" />
          {/* pivot boss */}
          <circle cx="245" cy="100" r="7" fill="var(--panel)" stroke="var(--navy)" strokeWidth="2.5" />

          {/* rotating clamp arm + jaw — pivots at the boss (245,100) */}
          <g className={anim('scr2-arm')} style={{ transformOrigin: '245px 100px' }}>
            {/* arm beam reaching over the sheet */}
            <rect x="150" y="93" width="98" height="13" rx="5" fill="var(--accent)" stroke="var(--navy)" strokeWidth="2.5" />
            {/* jaw foot that presses the sheet edge */}
            <rect x="150" y="100" width="20" height="22" rx="3" fill="var(--accent2)" stroke="var(--navy)" strokeWidth="2.5" />
            {/* rubber grip pad on the jaw */}
            <rect x="152" y="118" width="16" height="6" rx="2" fill="var(--navy)" />
          </g>

          {/* toggle handle on the column (pull-over action) */}
          <g className={anim('scr2-handle')} style={{ transformOrigin: '245px 96px' }}>
            <rect x="242" y="56" width="7" height="42" rx="3.5" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2.5" />
            <circle cx="245.5" cy="54" r="6" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2.5" />
          </g>
        </g>

        {/* ===================== LOCKED BEACON ===================== */}
        <g
          className={anim('scr2-lock')}
          style={{ transformOrigin: '160px 134px', filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }}
        >
          <circle cx="160" cy="134" r="13" fill="none" stroke="var(--ok)" strokeWidth="3" />
          <path
            d="M153 134 l5 5 l9 -11"
            fill="none" stroke="var(--ok)" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}
