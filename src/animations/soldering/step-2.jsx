export default function StepAnimation({ paused = false, reduced = false }) {
  /* ----------------------------------------------------------------------
     Soldering · Step 2 — "Clean & flux the joint"
     A copper pad carries a component lead. A small brush sweeps across the
     pad: three dull oxide marks vanish under the stroke, leaving a clean
     shine. A flux applicator then dips in and deposits a glossy translucent
     flux blob that swells and shimmers. The cycle repeats seamlessly (3.8s).
     Unique prefix: sol2
  ---------------------------------------------------------------------- */
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Clean the copper pad and lead with a brush, then apply flux to the joint"
    >
      <style>{`
        /* ---- brush: travels in, wipes across the pad, lifts away --------- */
        @keyframes sol2-brush {
          0%   { transform: translate(60px,-46px) rotate(18deg); opacity: 0; }
          8%   { transform: translate(36px,-22px) rotate(18deg); opacity: 1; }   /* arriving */
          18%  { transform: translate(-30px,-2px) rotate(16deg); opacity: 1; }   /* on pad, left */
          30%  { transform: translate(34px,-2px)  rotate(16deg); opacity: 1; }   /* sweep right */
          40%  { transform: translate(-26px,-2px) rotate(16deg); opacity: 1; }   /* sweep back */
          48%  { transform: translate(46px,-26px) rotate(18deg); opacity: 0; }   /* lift off */
          100% { transform: translate(60px,-46px) rotate(18deg); opacity: 0; }   /* == 0% */
        }

        /* ---- oxide / dull marks: scrubbed away during the brush pass ----- */
        @keyframes sol2-oxA {
          0%, 16% { opacity: 0.9; }
          24%     { opacity: 0; }
          100%    { opacity: 0.9; }            /* re-tarnish at loop seam */
        }
        @keyframes sol2-oxB {
          0%, 22% { opacity: 0.85; }
          30%     { opacity: 0; }
          100%    { opacity: 0.85; }
        }
        @keyframes sol2-oxC {
          0%, 30% { opacity: 0.8; }
          38%     { opacity: 0; }
          100%    { opacity: 0.8; }
        }

        /* ---- clean shine sweep: a highlight glides as the pad polishes --- */
        @keyframes sol2-shine {
          0%, 16% { opacity: 0; transform: translateX(-40px); }
          30%     { opacity: 0.9; transform: translateX(8px); }
          44%     { opacity: 0.55; transform: translateX(40px); }
          100%    { opacity: 0; transform: translateX(-40px); }
        }

        /* ---- flux applicator: dips to the pad after cleaning, lifts ------ */
        @keyframes sol2-app {
          0%, 52% { transform: translate(0,-58px) rotate(-14deg); opacity: 0; }
          58%     { transform: translate(0,-22px) rotate(-14deg); opacity: 1; }  /* descending */
          66%     { transform: translate(0,2px)   rotate(-14deg); opacity: 1; }  /* touch pad */
          74%     { transform: translate(0,2px)   rotate(-14deg); opacity: 1; }  /* depositing */
          82%     { transform: translate(0,-26px) rotate(-14deg); opacity: 1; }  /* lift */
          90%, 100% { transform: translate(0,-58px) rotate(-14deg); opacity: 0; }
        }

        /* ---- flux blob: swells under the applicator, then settles glossy - */
        @keyframes sol2-flux {
          0%, 64%  { transform: scale(0.1); opacity: 0; }
          70%      { transform: scale(0.7); opacity: 0.55; }
          76%      { transform: scale(1.12); opacity: 0.8; }  /* deposited */
          82%      { transform: scale(0.96); opacity: 0.75; }
          94%      { transform: scale(1); opacity: 0.7; }
          100%     { transform: scale(0.1); opacity: 0; }      /* == 0% */
        }

        /* ---- shimmer: a small specular glint travels over the wet flux --- */
        @keyframes sol2-glint {
          0%, 72%  { opacity: 0; transform: translate(-7px,2px) scale(0.6); }
          80%      { opacity: 1; transform: translate(2px,-3px) scale(1); }
          88%      { opacity: 0.4; transform: translate(8px,1px) scale(0.7); }
          96%, 100%{ opacity: 0; transform: translate(-7px,2px) scale(0.6); }
        }

        .sol2-brush--anim { animation: sol2-brush 3.8s var(--ease-in-out, ease-in-out) infinite; transform-box: fill-box; }
        .sol2-oxA--anim   { animation: sol2-oxA   3.8s ease-in-out infinite; }
        .sol2-oxB--anim   { animation: sol2-oxB   3.8s ease-in-out infinite; }
        .sol2-oxC--anim   { animation: sol2-oxC   3.8s ease-in-out infinite; }
        .sol2-shine--anim { animation: sol2-shine 3.8s ease-in-out infinite; transform-box: fill-box; }
        .sol2-app--anim   { animation: sol2-app   3.8s var(--ease-in-out, ease-in-out) infinite; transform-box: fill-box; }
        .sol2-flux--anim  { animation: sol2-flux  3.8s ease-out infinite; transform-box: fill-box; transform-origin: center; }
        .sol2-glint--anim { animation: sol2-glint 3.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

        .sol2-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="sol2-stage" data-paused={paused ? '' : undefined}>
        {/* ===================== PCB SUBSTRATE ===================== */}
        <rect
          x="34" y="138" width="252" height="58" rx="6"
          fill="var(--panel)" stroke="var(--navy)" strokeWidth="2.5"
        />
        {/* faint copper trace running into the pad */}
        <line x1="60" y1="167" x2="116" y2="167" stroke="var(--slate)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="204" y1="167" x2="262" y2="167" stroke="var(--slate)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

        {/* ===================== COPPER PAD ===================== */}
        {/* clean copper base (always shiny under the marks) */}
        <rect
          x="116" y="150" width="88" height="34" rx="5"
          fill="var(--accent)" stroke="var(--navy)" strokeWidth="2.5"
        />
        {/* baseline sheen line for material read */}
        <line x1="124" y1="158" x2="196" y2="158" stroke="var(--sky)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

        {/* dull oxide / tarnish marks — scrubbed off by the brush pass.
            In reduced mode the pad is shown already clean, so they are omitted. */}
        {!reduced && (
          <g fill="var(--slate)">
            <ellipse className={anim('sol2-oxA')} cx="134" cy="172" rx="9" ry="5" />
            <ellipse className={anim('sol2-oxB')} cx="160" cy="174" rx="11" ry="5.5" />
            <ellipse className={anim('sol2-oxC')} cx="184" cy="171" rx="8.5" ry="5" />
          </g>
        )}

        {/* clean-shine highlight that sweeps across once polished.
            Transient sweep — omitted in reduced mode (baseline sheen remains). */}
        {!reduced && (
          <g
            className={anim('sol2-shine')}
            style={{ clipPath: 'inset(0 round 5px)' }}
          >
            <rect
              x="150" y="150" width="16" height="34"
              fill="var(--bg-2)" opacity="0.85"
              transform="skewX(-22)"
            />
          </g>
        )}

        {/* ===================== COMPONENT LEAD ===================== */}
        {/* component body sits up-left, its lead bends down into the pad */}
        <rect x="84" y="96" width="40" height="20" rx="4" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2.5" />
        <line x1="92" y1="106" x2="116" y2="106" stroke="var(--bg-2)" strokeWidth="2" opacity="0.4" />
        {/* the lead wire down to the pad */}
        <path
          d="M120 116 q14 8 14 26 v18"
          fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round"
        />
        {/* lead foot resting on the pad */}
        <circle cx="134" cy="166" r="4.5" fill="var(--ink)" />

        {/* ===================== FLUX BLOB (glossy, translucent) ========= */}
        {/* sits over the lead foot / joint; swells and shimmers */}
        <g className={anim('sol2-flux')} style={{ transformOrigin: '160px 168px' }}>
          {/* translucent flux body */}
          <ellipse
            cx="160" cy="168" rx="30" ry="15"
            fill="var(--sky)" opacity="0.32"
            stroke="var(--accent2)" strokeWidth="1.5"
          />
          {/* inner gloss core */}
          <ellipse cx="160" cy="168" rx="20" ry="9.5" fill="var(--sky)" opacity="0.28" />
          {/* shimmer glint travelling over the wet surface */}
          <g className={anim('sol2-glint')} style={{ transformOrigin: '160px 166px' }}>
            <ellipse cx="160" cy="164" rx="7" ry="3" fill="var(--bg-2)" opacity="0.85" />
          </g>
        </g>

        {/* ===================== CLEANING BRUSH ===================== */}
        {/* anchored centre over the pad; keyframes translate it across.
            Transient tool — omitted in reduced mode so the clean joint reads. */}
        {!reduced && (
          <g className={anim('sol2-brush')} style={{ transformOrigin: '160px 168px' }}>
            {/* handle */}
            <rect x="154" y="92" width="12" height="44" rx="6" fill="var(--accent2)" stroke="var(--navy)" strokeWidth="2.5" />
            {/* ferrule */}
            <rect x="151" y="132" width="18" height="9" rx="2" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2" />
            {/* bristles */}
            <g stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round">
              <line x1="153" y1="141" x2="151" y2="156" />
              <line x1="158" y1="141" x2="157" y2="158" />
              <line x1="162" y1="141" x2="163" y2="158" />
              <line x1="167" y1="141" x2="169" y2="156" />
            </g>
          </g>
        )}

        {/* ===================== FLUX APPLICATOR (pen / dropper) ========= */}
        {/* anchored over the joint; keyframes dip it down then lift.
            Transient tool — omitted in reduced mode (flux is already deposited). */}
        {!reduced && (
        <g
          className={anim('sol2-app')}
          style={{ transformOrigin: '186px 110px', filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }}
        >
          {/* pen barrel */}
          <rect x="178" y="64" width="16" height="46" rx="7" fill="var(--accent)" stroke="var(--navy)" strokeWidth="2.5" />
          {/* grip band */}
          <rect x="178" y="88" width="16" height="6" rx="2" fill="var(--navy)" opacity="0.55" />
          {/* tapered tip reaching to the joint */}
          <path d="M180 110 L192 110 L188 132 L184 132 Z" fill="var(--accent2)" stroke="var(--navy)" strokeWidth="2.5" strokeLinejoin="round" />
          {/* wet flux droplet at the tip */}
          <circle cx="186" cy="135" r="3.4" fill="var(--sky)" opacity="0.9" />
        </g>
        )}
      </g>
    </svg>
  )
}
