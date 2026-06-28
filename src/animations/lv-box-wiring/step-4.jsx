export default function StepAnimation({ paused = false, reduced = false }) {
  // "Torque the terminals" — a torque screwdriver tip sits on a terminal screw,
  // rotates to tighten; a curved torque-arc fills to a target mark, a "click"
  // spark pops, a check mark stamps, then the tool indexes to the next terminal.
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Torque each terminal to the rated value until it clicks, then mark it"
    >
      <style>{`
        /* ---- torque arc geometry: r=30, circumference ≈ 188.5 ---- */
        .lvw4-arcFill { stroke-dasharray: 188.5; stroke-dashoffset: 188.5; }

        /* Worktool indexes across the three terminals over one full loop. */
        @keyframes lvw4-index {
          0%,   30%  { transform: translateX(0px); }
          36%,  63%  { transform: translateX(64px); }
          69%,  96%  { transform: translateX(128px); }
          100%       { transform: translateX(128px); }
        }
        .lvw4-tool--anim { animation: lvw4-index 4s steps(1, end) infinite; }

        /* The screwdriver bit spins while seated, easing as torque builds. */
        @keyframes lvw4-spin {
          0%   { transform: rotate(0deg); }
          22%  { transform: rotate(330deg); }
          28%  { transform: rotate(360deg); }   /* snap at click */
          33%, 100% { transform: rotate(360deg); }
        }
        .lvw4-bit--anim { animation: lvw4-spin 1.3333s ease-out infinite; transform-origin: 0px 0px; }

        /* Press down onto the screw, then lift to index across. */
        @keyframes lvw4-press {
          0%   { transform: translateY(-14px); }
          10%, 30% { transform: translateY(0px); }
          33%  { transform: translateY(-14px); }
          100% { transform: translateY(-14px); }
        }
        .lvw4-driver--anim { animation: lvw4-press 1.3333s ease-in-out infinite; }

        /* Torque arc sweeps up to the target mark each seating, holds, then
           releases back to empty as the tool lifts — so 0% == 100% (seamless). */
        @keyframes lvw4-torque {
          0%   { stroke-dashoffset: 188.5; }    /* empty */
          10%  { stroke-dashoffset: 188.5; }
          26%  { stroke-dashoffset: 70.7; }     /* fills to ~target (62.5%) */
          60%  { stroke-dashoffset: 70.7; }     /* holds at target */
          80%  { stroke-dashoffset: 188.5; }    /* releases as tool lifts */
          100% { stroke-dashoffset: 188.5; }    /* empty — matches 0% */
        }
        .lvw4-arcFill--anim { animation: lvw4-torque 1.3333s ease-out infinite; }

        /* Click spark pops the instant torque hits target. */
        @keyframes lvw4-click {
          0%,  24%  { opacity: 0; transform: scale(0.3); }
          27%       { opacity: 1; transform: scale(1.15); }
          34%       { opacity: 0; transform: scale(1.4); }
          100%      { opacity: 0; transform: scale(0.3); }
        }
        .lvw4-spark { opacity: 0; }   /* hidden unless the click frame lights it */
        .lvw4-spark--anim { animation: lvw4-click 1.3333s ease-out infinite; transform-origin: 0px 0px; }

        /* Target tick brightens at the click moment. */
        @keyframes lvw4-target {
          0%, 24% { stroke: var(--ink2); }
          27%, 33% { stroke: var(--ok); }
          100% { stroke: var(--ink2); }
        }
        .lvw4-target--anim { animation: lvw4-target 1.3333s ease-out infinite; }

        /* Each checkmark stamps once, in sequence (one per terminal), holds,
           then all fade out together just before the seam. Every keyframe is
           opacity 0 at both 0% and 100%, so the loop is seamless — no carry-
           over of "done" state into the next cycle. Windows track the tool:
           T1 ~0-30%, T2 ~36-63%, T3 ~69-96%. */
        @keyframes lvw4-stamp1 {
          0%,  26% { opacity: 0; transform: scale(1.7); }
          30%      { opacity: 1; transform: scale(0.9); }
          33%      { transform: scale(1.05); }
          36%, 95% { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(1); }
        }
        @keyframes lvw4-stamp2 {
          0%,  59% { opacity: 0; transform: scale(1.7); }
          63%      { opacity: 1; transform: scale(0.9); }
          66%      { transform: scale(1.05); }
          69%, 95% { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(1); }
        }
        @keyframes lvw4-stamp3 {
          0%,  88% { opacity: 0; transform: scale(1.7); }
          92%      { opacity: 1; transform: scale(0.9); }
          94%      { transform: scale(1.05); }
          96%      { opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(1); }
        }
        .lvw4-chk { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .lvw4-chk1--anim { animation: lvw4-stamp1 4s ease-out infinite; }
        .lvw4-chk2--anim { animation: lvw4-stamp2 4s ease-out infinite; }
        .lvw4-chk3--anim { animation: lvw4-stamp3 4s ease-out infinite; }

        /* Pause via center-tap. */
        .lvw4-stage[data-paused] * { animation-play-state: paused !important; }

        /* Reduced-motion: no looping animation runs (the --anim classes are
           omitted). Paint a meaningful still instead — the driver seated on the
           first terminal, torque arc filled to the rated mark, target lit, and
           the verified checkmark shown — so the task still reads at a glance. */
        .lvw4-stage[data-reduced] .lvw4-arcFill { stroke-dashoffset: 70.7; }
        .lvw4-stage[data-reduced] .lvw4-target  { stroke: var(--ok); }
        .lvw4-stage[data-reduced] .lvw4-chk1    { opacity: 1; }
      `}</style>

      <g className="lvw4-stage" data-paused={paused ? '' : undefined}
         data-reduced={reduced ? '' : undefined}>
        {/* ---------- LV box terminal strip ---------- */}
        <rect x="28" y="150" width="264" height="58" rx="6"
              fill="var(--panel)" stroke="var(--line-2)" strokeWidth="2" />
        {/* DIN-rail hint */}
        <rect x="28" y="186" width="264" height="6" fill="var(--bg-2)" opacity="0.6" />

        {/* Three terminals at x = 64, 128, 192 (screw centres) */}
        {[64, 128, 192].map((cx) => (
          <g key={cx}>
            {/* terminal body */}
            <rect x={cx - 22} y="158" width="44" height="42" rx="4"
                  fill="var(--bg-2)" stroke="var(--line-2)" strokeWidth="2" />
            {/* wire entering from below */}
            <rect x={cx - 5} y="198" width="10" height="20" rx="3"
                  fill="var(--accent)" opacity="0.85" />
            {/* screw head ring */}
            <circle cx={cx} cy="172" r="11"
                    fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
            {/* screw slot */}
            <rect x={cx - 8} y="170.5" width="16" height="3" rx="1.5" fill="var(--slate)" />
          </g>
        ))}

        {/* Completed checkmarks (one per terminal), stamped in sequence */}
        <g className={anim('lvw4-chk lvw4-chk1')} style={{ pointerEvents: 'none' }}>
          <circle cx="64" cy="172" r="13" fill="none" stroke="var(--ok)" strokeWidth="2.5" />
          <path d="M58 173 l4 4 l8 -9" fill="none" stroke="var(--ok)"
                strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className={anim('lvw4-chk lvw4-chk2')} style={{ pointerEvents: 'none' }}>
          <circle cx="128" cy="172" r="13" fill="none" stroke="var(--ok)" strokeWidth="2.5" />
          <path d="M122 173 l4 4 l8 -9" fill="none" stroke="var(--ok)"
                strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className={anim('lvw4-chk lvw4-chk3')} style={{ pointerEvents: 'none' }}>
          <circle cx="192" cy="172" r="13" fill="none" stroke="var(--ok)" strokeWidth="2.5" />
          <path d="M186 173 l4 4 l8 -9" fill="none" stroke="var(--ok)"
                strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ---------- Travelling tool group (indexes terminal → terminal) ---------- */}
        {/* Local origin at first screw centre (64,172); index moves it +64, +128. */}
        <g className={anim('lvw4-tool')}>
          <g transform="translate(64 172)">

            {/* Torque arc gauge centred on the screw */}
            <g>
              {/* arc track */}
              <circle cx="0" cy="0" r="30" fill="none"
                      stroke="var(--line-2)" strokeWidth="4"
                      strokeLinecap="round" transform="rotate(-90)" />
              {/* target tick at ~62.5% around (the rated value) */}
              <line className={anim('lvw4-target')}
                    x1="0" y1="-30" x2="0" y2="-37"
                    stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round"
                    transform="rotate(225)" />
              {/* filling torque arc */}
              <circle className={anim('lvw4-arcFill')}
                      cx="0" cy="0" r="30" fill="none"
                      stroke="var(--accent)" strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(-90)"
                      style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }} />
            </g>

            {/* Click spark burst at the target mark */}
            <g className={anim('lvw4-spark')} transform="translate(21 -21)">
              <g stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="0" y1="-9" x2="0" y2="-15" />
                <line x1="0" y1="9" x2="0" y2="15" />
                <line x1="-9" y1="0" x2="-15" y2="0" />
                <line x1="9" y1="0" x2="15" y2="0" />
                <line x1="-6.4" y1="-6.4" x2="-11" y2="-11" />
                <line x1="6.4" y1="-6.4" x2="11" y2="-11" />
                <line x1="-6.4" y1="6.4" x2="-11" y2="11" />
                <line x1="6.4" y1="6.4" x2="11" y2="11" />
              </g>
              <circle cx="0" cy="0" r="3.5" fill="var(--warn)" />
            </g>

            {/* Screwdriver: shaft + handle press down, bit spins on the screw */}
            <g className={anim('lvw4-driver')}>
              {/* handle */}
              <rect x="-13" y="-128" width="26" height="46" rx="9"
                    fill="var(--navy)" stroke="var(--line-2)" strokeWidth="2" />
              <rect x="-13" y="-118" width="26" height="6" fill="var(--accent)" opacity="0.55" />
              <rect x="-13" y="-106" width="26" height="6" fill="var(--accent)" opacity="0.55" />
              {/* torque-collar / setting ring */}
              <rect x="-11" y="-82" width="22" height="14" rx="3"
                    fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
              {/* shaft */}
              <rect x="-5" y="-68" width="10" height="48" rx="3"
                    fill="var(--slate)" stroke="var(--line-2)" strokeWidth="1.5" />
              {/* spinning bit / tip seated in the screw */}
              <g className={anim('lvw4-bit')} transform="translate(0 -20)">
                <path d="M-5 0 L5 0 L2.5 16 L-2.5 16 Z"
                      fill="var(--ink2)" stroke="var(--navy)" strokeWidth="1.5"
                      strokeLinejoin="round" />
                <rect x="-6" y="14" width="12" height="3.5" rx="1.5" fill="var(--ink)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
