// Step 3 — "Pilot the holes" (Drive Screws into the Sheet)
// A power-drill bit spins fast (rotating flutes) and plunges into a marked
// point on the sheet; swarf chips spray as a clean pilot hole appears; the bit
// retracts and the cycle repeats. Pure SVG + CSS, prefix "scr3".
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Drill bit piloting a hole in a metal sheet"
    >
      <style>{`
        .scr3-stage[data-paused] * { animation-play-state: paused !important; }

        /* --- reduced-motion stills: with no animation running, the base
           classes must paint a clean, meaningful frame (finished pilot hole,
           bit retracted, no stray chips/spark). --- */
        .scr3-chip { opacity: 0; }
        .scr3-spark { opacity: 0; }
        .scr3-hole { opacity: 1; }
        .scr3-holereset { opacity: 1; }

        /* whole drill assembly: plunge down into the sheet, then retract */
        .scr3-drill--anim {
          animation: scr3-plunge 3.2s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
        }
        @keyframes scr3-plunge {
          0%   { transform: translateY(0); }
          34%  { transform: translateY(46px); }   /* tip reaches the mark */
          50%  { transform: translateY(50px); }   /* press through */
          70%  { transform: translateY(46px); }
          100% { transform: translateY(0); }
        }

        /* bit spins continuously and fast — flutes blur into rotation */
        .scr3-spin--anim {
          animation: scr3-spin 0.42s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        @keyframes scr3-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* the pilot hole appears while the bit is buried, then resets unseen */
        .scr3-hole--anim {
          animation: scr3-hole 3.2s var(--ease-in-out, ease-in-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr3-hole {
          0%, 30%   { opacity: 0; transform: scale(0.2); }
          50%       { opacity: 1; transform: scale(1); }
          74%       { opacity: 1; transform: scale(1); }
          82%, 100% { opacity: 1; transform: scale(1); }
        }
        /* hole fades back to "fresh sheet" right at the seam so the loop is clean */
        .scr3-holereset--anim {
          animation: scr3-holereset 3.2s linear infinite;
        }
        @keyframes scr3-holereset {
          0%, 92%  { opacity: 1; }
          97%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* swarf chips: burst outward at the moment of contact, then vanish */
        .scr3-chip--anim {
          animation: scr3-chip 3.2s var(--ease-out, ease-out) infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr3-chip {
          0%, 34%   { opacity: 0; transform: translate(0,0) scale(0.4) rotate(0deg); }
          40%       { opacity: 1; }
          64%       { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot)); }
          100%      { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot)); }
        }
        .scr3-chip1 { --dx: -20px; --dy: -16px; --rot: -120deg; animation-delay: 0s; }
        .scr3-chip2 { --dx:  18px; --dy: -20px; --rot:  150deg; animation-delay: 0.04s; }
        .scr3-chip3 { --dx: -10px; --dy: -24px; --rot:  -60deg; animation-delay: 0.08s; }
        .scr3-chip4 { --dx:  24px; --dy: -10px; --rot:  100deg; animation-delay: 0.02s; }

        /* impact glow ring on the sheet as the tip bites */
        .scr3-spark--anim {
          animation: scr3-spark 3.2s ease-out infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        @keyframes scr3-spark {
          0%, 33%  { opacity: 0; transform: scale(0.3); }
          42%      { opacity: 0.9; transform: scale(1.6); }
          58%      { opacity: 0; transform: scale(2.4); }
          100%     { opacity: 0; transform: scale(2.4); }
        }
      `}</style>

      {/* ---- static backdrop: technical baseline ---- */}
      <line x1="0" y1="178" x2="320" y2="178" stroke="var(--line)" strokeWidth="1" />

      <g className="scr3-stage" data-paused={paused ? '' : undefined}>
        {/* ============ METAL SHEET ============ */}
        <g>
          {/* sheet body */}
          <rect x="46" y="158" width="228" height="22" rx="3"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* top sheen highlight */}
          <rect x="50" y="161" width="220" height="4" rx="2" fill="var(--bg-2, #ffffff)" opacity="0.55" />

          {/* drill marks (crosses) — the right two are the "to do" marks */}
          <g stroke="var(--ink2)" strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <path d="M196 165 h10 M201 161 v8" />
            <path d="M236 165 h10 M241 161 v8" />
          </g>

          {/* already-piloted hole on the left (context) */}
          <ellipse cx="116" cy="166" rx="6" ry="3.4"
            fill="var(--navy)" stroke="var(--accent2)" strokeWidth="1.5" />

          {/* the freshly drilled hole appearing at the active mark */}
          <g className={anim('scr3-holereset')}>
            <ellipse className={anim('scr3-hole')} cx="160" cy="166" rx="6.5" ry="3.6"
              fill="var(--navy)" stroke="var(--accent)" strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }} />
          </g>
        </g>

        {/* ============ IMPACT FX (centred on active mark x=160, surface y=160) ============ */}
        <g transform="translate(160 160)">
          {/* spark ring */}
          <circle className={anim('scr3-spark')} cx="0" cy="0" r="6"
            fill="none" stroke="var(--accent)" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }} />
          {/* swarf chips */}
          <g fill="var(--accent2)" stroke="var(--accent)" strokeWidth="0.75">
            <rect className={anim('scr3-chip') + ' scr3-chip1'} x="-2.5" y="-1.4" width="5" height="2.8" rx="1.2" />
            <rect className={anim('scr3-chip') + ' scr3-chip2'} x="-2.5" y="-1.4" width="5" height="2.8" rx="1.2" />
            <rect className={anim('scr3-chip') + ' scr3-chip3'} x="-2"  y="-1.2" width="4" height="2.4" rx="1" />
            <rect className={anim('scr3-chip') + ' scr3-chip4'} x="-2"  y="-1.2" width="4" height="2.4" rx="1" />
          </g>
        </g>

        {/* ============ DRILL ASSEMBLY (poised over active mark) ============ */}
        <g className={anim('scr3-drill')}>
          {/* chuck body */}
          <rect x="142" y="40" width="36" height="40" rx="6"
            fill="var(--navy)" stroke="var(--ink)" strokeWidth="2.5" />
          {/* chuck collar / grip rings */}
          <g stroke="var(--accent)" strokeWidth="2" opacity="0.85">
            <line x1="146" y1="50" x2="174" y2="50" />
            <line x1="146" y1="58" x2="174" y2="58" />
            <line x1="146" y1="66" x2="174" y2="66" />
          </g>
          {/* chuck jaws taper */}
          <path d="M148 80 L172 80 L166 96 L154 96 Z"
            fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />

          {/* ----- spinning bit (origin at chuck mouth y=96) ----- */}
          <g transform="translate(160 96)">
            <g className={anim('scr3-spin')}>
              {/* shank */}
              <rect x="-2.5" y="0" width="5" height="20" fill="var(--ink2)" stroke="var(--ink)" strokeWidth="1" />
              {/* fluted body — spiral flutes read as rotation */}
              <path d="M-3 20 L3 20 L4 56 L-4 56 Z"
                fill="var(--panel-2, #ffffff)" stroke="var(--ink)" strokeWidth="2" />
              <g stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                <path d="M-3 24 L3 30" />
                <path d="M-3 32 L3 38" />
                <path d="M-3 40 L3 46" />
                <path d="M-3 48 L3 54" />
              </g>
              {/* sharp tip */}
              <path d="M-4 56 L4 56 L0 66 Z"
                fill="var(--accent2)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
