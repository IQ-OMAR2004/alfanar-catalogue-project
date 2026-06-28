// alfanar SWI Kiosk — Test the Switchgear · Step 4: "Record the results"
// Looping motion: a pen tracks down a clipboard test sheet, ticking a green
// check into each row in turn (top → bottom). When the rows are filled it drops
// to the bottom signature line and draws a quick signature flourish. The ticks
// and signature then clear at the loop seam so the cycle repeats seamlessly.
// Pure SVG + CSS. All keyframes + classes prefixed "swg4" for collision safety.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  // Row baseline Y positions on the sheet (ticks land at the right of each row).
  const rows = [96, 120, 144, 168]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A pen ticking each row of a test sheet then signing the record"
    >
      <style>{`
        .swg4-stage { transform-box: fill-box; }
        .swg4-stage[data-paused] * { animation-play-state: paused !important; }

        /* ===== The pen: moves down row by row, then to the signature line ===== */
        /* Pen pivots from its nib so the body angles like a held pen. */
        /* Base (also the reduced still): pen parked resting on the signature line. */
        .swg4-pen { transform-box: fill-box; transform-origin: 0px 0px;
          transform: translate(214px, 198px) rotate(6deg); }
        .swg4-pen--anim {
          animation: swg4-pen 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        /* Keyframes are written for nib travel: park left of a row, dip right to
           strike the tick, lift to the next row. 0–64% ticks 4 rows; 64–88%
           signs; 88–100% returns to the top for a clean loop. */
        @keyframes swg4-pen {
          0%   { transform: translate(218px, 96px) rotate(0deg); }   /* row 1 strike */
          11%  { transform: translate(220px, 98px) rotate(2deg); }   /* press */
          16%  { transform: translate(218px, 120px) rotate(0deg); }  /* lift → row 2 */
          27%  { transform: translate(220px, 122px) rotate(2deg); }
          32%  { transform: translate(218px, 144px) rotate(0deg); }  /* → row 3 */
          43%  { transform: translate(220px, 146px) rotate(2deg); }
          48%  { transform: translate(218px, 168px) rotate(0deg); }  /* → row 4 */
          59%  { transform: translate(220px, 170px) rotate(2deg); }
          64%  { transform: translate(96px, 196px) rotate(-6deg); }  /* down to sign line, left start */
          78%  { transform: translate(214px, 198px) rotate(6deg); }  /* sweep across signing */
          82%  { transform: translate(214px, 196px) rotate(2deg); }  /* flick up */
          88%  { transform: translate(218px, 96px)  rotate(0deg); opacity: 0; } /* jump back hidden */
          90%  { opacity: 0; }
          92%, 100% { transform: translate(218px, 96px) rotate(0deg); opacity: 1; }
        }

        /* ===== Tick reveal: each checkmark draws on as the pen strikes its row ===== */
        /* Base (also the reduced still): every checkmark fully drawn-in. */
        .swg4-tick { transform-box: fill-box; transform-origin: center center;
          stroke-dasharray: 26; stroke-dashoffset: 0; opacity: 1; }
        .swg4-tick--anim { animation: swg4-tick 3.6s linear infinite; }
        /* Per-row phase offsets via animation-delay-like keyframe windows below. */
        .swg4-tick--1.swg4-tick--anim { animation-name: swg4-tick1; }
        .swg4-tick--2.swg4-tick--anim { animation-name: swg4-tick2; }
        .swg4-tick--3.swg4-tick--anim { animation-name: swg4-tick3; }
        .swg4-tick--4.swg4-tick--anim { animation-name: swg4-tick4; }
        @keyframes swg4-tick1 {
          0%,9%   { stroke-dashoffset: 26; opacity: 0; }
          14%     { stroke-dashoffset: 0;  opacity: 1; }
          88%     { stroke-dashoffset: 0;  opacity: 1; }
          90%,100%{ stroke-dashoffset: 26; opacity: 0; }
        }
        @keyframes swg4-tick2 {
          0%,25%  { stroke-dashoffset: 26; opacity: 0; }
          30%     { stroke-dashoffset: 0;  opacity: 1; }
          88%     { stroke-dashoffset: 0;  opacity: 1; }
          90%,100%{ stroke-dashoffset: 26; opacity: 0; }
        }
        @keyframes swg4-tick3 {
          0%,41%  { stroke-dashoffset: 26; opacity: 0; }
          46%     { stroke-dashoffset: 0;  opacity: 1; }
          88%     { stroke-dashoffset: 0;  opacity: 1; }
          90%,100%{ stroke-dashoffset: 26; opacity: 0; }
        }
        @keyframes swg4-tick4 {
          0%,57%  { stroke-dashoffset: 26; opacity: 0; }
          62%     { stroke-dashoffset: 0;  opacity: 1; }
          88%     { stroke-dashoffset: 0;  opacity: 1; }
          90%,100%{ stroke-dashoffset: 26; opacity: 0; }
        }

        /* ===== A small PASS stamp pulses beside the active row as it's ticked ===== */
        /* Decorative per-row flash; hidden in the reduced still (checks tell the story). */
        .swg4-pass { transform-box: fill-box; transform-origin: center center; opacity: 0; }
        .swg4-pass--anim { animation: swg4-flash 3.6s ease-out infinite; }
        .swg4-pass--1.swg4-pass--anim { animation-name: swg4-flash1; }
        .swg4-pass--2.swg4-pass--anim { animation-name: swg4-flash2; }
        .swg4-pass--3.swg4-pass--anim { animation-name: swg4-flash3; }
        .swg4-pass--4.swg4-pass--anim { animation-name: swg4-flash4; }
        @keyframes swg4-flash1 {
          0%,10%  { opacity: 0; transform: scale(0.6); }
          15%     { opacity: 1; transform: scale(1.15); }
          22%,88% { opacity: 1; transform: scale(1); }
          90%,100%{ opacity: 0; transform: scale(0.6); }
        }
        @keyframes swg4-flash2 {
          0%,26%  { opacity: 0; transform: scale(0.6); }
          31%     { opacity: 1; transform: scale(1.15); }
          38%,88% { opacity: 1; transform: scale(1); }
          90%,100%{ opacity: 0; transform: scale(0.6); }
        }
        @keyframes swg4-flash3 {
          0%,42%  { opacity: 0; transform: scale(0.6); }
          47%     { opacity: 1; transform: scale(1.15); }
          54%,88% { opacity: 1; transform: scale(1); }
          90%,100%{ opacity: 0; transform: scale(0.6); }
        }
        @keyframes swg4-flash4 {
          0%,58%  { opacity: 0; transform: scale(0.6); }
          63%     { opacity: 1; transform: scale(1.15); }
          70%,88% { opacity: 1; transform: scale(1); }
          90%,100%{ opacity: 0; transform: scale(0.6); }
        }

        /* ===== Signature flourish: draws across the sign line then clears ===== */
        /* Base (also the reduced still): signature fully drawn on the line. */
        .swg4-sign { stroke-dasharray: 150; stroke-dashoffset: 0; opacity: 1; }
        .swg4-sign--anim { animation: swg4-sign 3.6s var(--ease-in-out, ease-in-out) infinite; }
        @keyframes swg4-sign {
          0%,64%  { stroke-dashoffset: 150; opacity: 0; }
          66%     { opacity: 1; }
          82%     { stroke-dashoffset: 0;   opacity: 1; }
          88%     { stroke-dashoffset: 0;   opacity: 1; }
          90%,100%{ stroke-dashoffset: 150; opacity: 0; }
        }

        /* Beacon shimmer along the clip while signing — the "record complete" beat. */
        .swg4-clipglow--anim { animation: swg4-clipglow 3.6s ease-in-out infinite; }
        @keyframes swg4-clipglow {
          0%,70%  { opacity: 0; }
          84%     { opacity: 1; }
          92%,100%{ opacity: 0; }
        }
      `}</style>

      {/* grounding baseline for legibility */}
      <line x1="0" y1="222" x2="320" y2="222" stroke="var(--line-2, var(--slate))" strokeWidth="2" />

      <g className="swg4-stage" data-paused={paused ? '' : undefined}>
        {/* ===================== CLIPBOARD ===================== */}
        {/* board body */}
        <rect x="56" y="40" width="172" height="184" rx="10"
          fill="var(--panel)" stroke="var(--navy)" strokeWidth="3" />
        {/* paper sheet inset */}
        <rect x="68" y="58" width="148" height="156" rx="5"
          fill="var(--bg-2, #ffffff)" stroke="var(--slate)" strokeWidth="2" />

        {/* clip at top */}
        <g>
          <rect x="124" y="30" width="36" height="22" rx="5"
            fill="var(--slate)" stroke="var(--navy)" strokeWidth="3" />
          <rect x="132" y="24" width="20" height="12" rx="4"
            fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2.5" />
          {/* completion shimmer on the clip */}
          <rect className={reduced ? undefined : 'swg4-clipglow--anim'}
            x="124" y="30" width="36" height="22" rx="5"
            fill="none" stroke="var(--accent)" strokeWidth="2.5"
            opacity={reduced ? 0 : 0}
            style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }} />
        </g>

        {/* sheet header line */}
        <line x1="80" y1="74" x2="180" y2="74" stroke="var(--accent2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="80" x2="150" y2="80" stroke="var(--ink2)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* ===================== ROWS (label dash + checkbox) ===================== */}
        {rows.map((y, i) => (
          <g key={i}>
            {/* row label text-stand-in */}
            <line x1="80" y1={y} x2="150" y2={y}
              stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
            {/* checkbox at the right of the row */}
            <rect x={186} y={y - 9} width="18" height="18" rx="3"
              fill="var(--bg-2, #ffffff)" stroke="var(--slate)" strokeWidth="2.5" />
            {/* the green check that gets drawn into the box */}
            <path
              className={anim('swg4-tick') + ` swg4-tick--${i + 1}`}
              d={`M${189} ${y} l4 5 l8 -11`}
              fill="none" stroke="var(--ok)" strokeWidth="3.2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }}
            />
            {/* PASS tick-flash mini-badge to the right of the box */}
            <g className={anim('swg4-pass') + ` swg4-pass--${i + 1}`}
               transform={`translate(${212} ${y})`}>
              <circle cx="0" cy="0" r="6.5" fill="var(--ok)" opacity="0.18" />
              <path d="M-3 0 l2 2.5 l4 -5.5" fill="none" stroke="var(--ok)"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        ))}

        {/* ===================== SIGNATURE LINE ===================== */}
        {/* the printed "sign and date" rule */}
        <line x1="80" y1="200" x2="204" y2="200"
          stroke="var(--ink2)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        {/* small date marker on the right of the sign line */}
        <line x1="184" y1="200" x2="184" y2="190"
          stroke="var(--slate)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* the signature flourish */}
        <path
          className={anim('swg4-sign')}
          d="M86 198 c6 -12 12 8 18 -2 c4 -7 9 6 14 -1 c5 -8 11 5 16 0 c8 -8 18 6 24 -2"
          fill="none" stroke="var(--accent)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }}
        />

        {/* ===================== PEN ===================== */}
        {/* Pen group is positioned by translate; geometry is drawn relative to a
            nib at local (0,0) so the transform-origin pivot sits on the tip. */}
        <g className={anim('swg4-pen')}>
          {/* nib tip (sits at local origin, points down-left into the sheet) */}
          <path d="M0 0 l3 -7 l4 3 z"
            fill="var(--accent2)" stroke="var(--navy)" strokeWidth="1.5" strokeLinejoin="round" />
          {/* barrel */}
          <path d="M3.5 -6 l9 7 l28 36 l-9 7 z"
            fill="var(--navy)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          {/* grip band */}
          <line x1="9" y1="-1" x2="18" y2="6"
            stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          {/* barrel sheen */}
          <line x1="15" y1="3" x2="36" y2="30"
            stroke="var(--sky)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          {/* clip cap */}
          <rect x="32" y="32" width="14" height="10" rx="2"
            transform="rotate(38 39 37)"
            fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />
        </g>
      </g>
    </svg>
  )
}
