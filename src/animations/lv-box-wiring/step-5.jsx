// alfanar SWI kiosk — LV Box Wiring, Step 5: "Label, close & energize"
// Looping motion: a printed ferrule/label slides onto the core lead, a hinged
// cover panel swings down and closes over the terminal box, then the indicator
// lamp switches from grey to a glowing beacon-blue "energized" state. Cycle.
// Pure SVG + CSS keyframes. All names prefixed "lvw5" to avoid collisions with
// the other 17 animations mounted in the same document.
export default function StepAnimation({ paused = false, reduced = false }) {
  // Helper: attach the animated variant class only when motion is allowed.
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Fit ferrule label, close the cover and energize the LV box"
    >
      <defs>
        <linearGradient id="lvw5-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--panel-2)" />
          <stop offset="1" stopColor="var(--panel)" />
        </linearGradient>
        <linearGradient id="lvw5-cover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent2)" />
        </linearGradient>
        <radialGradient id="lvw5-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--sky)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--sky)" stopOpacity="0" />
        </radialGradient>

        <style>{`
          /* ---- 1. Ferrule/label slides onto the core lead ---------------- */
          @keyframes lvw5-slide {
            0%      { transform: translateX(-46px); opacity: 0; }
            10%     { opacity: 1; }
            22%     { transform: translateX(0); opacity: 1; }
            /* settle on the core, hold while cover closes & lamp lights */
            88%     { transform: translateX(0); opacity: 1; }
            /* fade out before the loop restart so the slide-in reads cleanly */
            96%,100%{ transform: translateX(-46px); opacity: 0; }
          }

          /* ---- 2. Hinged cover panel swings DOWN to close --------------- */
          @keyframes lvw5-hinge {
            0%,24%  { transform: rotate(-104deg); }   /* propped fully open */
            46%     { transform: rotate(-4deg); }     /* swings down... */
            52%     { transform: rotate(2deg); }      /* tiny settle bounce */
            56%,90% { transform: rotate(0deg); }      /* seated, closed */
            100%    { transform: rotate(-104deg); }   /* re-open for next cycle */
          }

          /* ---- 3. Indicator lamp energizes (grey -> beacon blue) -------- */
          /* The glow is part of the keyframe so the lamp reads as flat grey
             (truly de-energized) at the start of the cycle and only beams
             once it switches to blue. */
          @keyframes lvw5-energize {
            0%,58%   { fill: var(--slate); filter: none; }
            64%      { fill: var(--sky);   filter: drop-shadow(0 0 5px var(--beacon-glow)); }
            70%,88%  { fill: var(--accent);filter: drop-shadow(0 0 6px var(--beacon-glow)); }
            100%     { fill: var(--slate); filter: none; }
          }
          @keyframes lvw5-halo {
            0%,60%   { opacity: 0; transform: scale(0.5); }
            70%      { opacity: 1; transform: scale(1.25); }
            88%      { opacity: 0.85; transform: scale(1); }
            100%     { opacity: 0; transform: scale(0.5); }
          }
          @keyframes lvw5-spark {
            0%,62%,100% { opacity: 0; }
            66%,78%     { opacity: 1; }
          }

          .lvw5-label--anim  { animation: lvw5-slide 3.4s var(--ease-in-out) infinite; }
          .lvw5-cover--anim  { transform-origin: 96px 70px;
                               animation: lvw5-hinge 3.4s var(--ease-in-out) infinite; }
          .lvw5-lamp--anim   { animation: lvw5-energize 3.4s var(--ease-in-out) infinite; }
          .lvw5-halo--anim   { transform-origin: 232px 70px;
                               animation: lvw5-halo 3.4s var(--ease-in-out) infinite; }
          .lvw5-spark--anim  { animation: lvw5-spark 3.4s steps(1,end) infinite; }

          /* Pause: freeze every descendant animation of the stage. */
          .lvw5-stage[data-paused] * { animation-play-state: paused !important; }
        `}</style>
      </defs>

      <g className="lvw5-stage" data-paused={paused ? '' : undefined}>
        {/* ============ Terminal box body ============ */}
        <rect
          x="96" y="70" width="160" height="118" rx="10"
          fill="url(#lvw5-box)" stroke="var(--navy)" strokeWidth="3"
        />
        {/* mounting ears */}
        <rect x="88" y="92" width="10" height="20" rx="3" fill="var(--slate)" />
        <rect x="254" y="92" width="10" height="20" rx="3" fill="var(--slate)" />

        {/* DIN rail + three terminal blocks inside the box */}
        <rect x="112" y="120" width="128" height="10" rx="2" fill="var(--slate)" opacity="0.55" />
        <g fill="var(--panel)" stroke="var(--navy)" strokeWidth="2">
          <rect x="118" y="108" width="24" height="40" rx="3" />
          <rect x="148" y="108" width="24" height="40" rx="3" />
          <rect x="178" y="108" width="24" height="40" rx="3" />
        </g>
        {/* terminal screw heads */}
        <g fill="var(--ink2)">
          <circle cx="130" cy="118" r="3.5" />
          <circle cx="160" cy="118" r="3.5" />
          <circle cx="190" cy="118" r="3.5" />
        </g>

        {/* ============ Core lead entering from the left ============ */}
        {/* the bare core the ferrule slides onto */}
        <path
          d="M28 96 H118"
          fill="none" stroke="var(--ink2)" strokeWidth="6" strokeLinecap="round"
        />
        <path
          d="M28 96 H72"
          fill="none" stroke="var(--accent2)" strokeWidth="9" strokeLinecap="round"
        />

        {/* ============ Printed ferrule / label sliding onto the core ============ */}
        <g className={a('lvw5-label', 'lvw5-label--anim')}>
          <rect
            x="78" y="86" width="34" height="20" rx="4"
            fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="3"
          />
          {/* printed identifier lines on the ferrule */}
          <path
            d="M84 93 h22 M84 99 h16"
            stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"
          />
        </g>

        {/* ============ Hinged cover panel (swings down to close) ============ */}
        {/* hinge knuckle */}
        <circle cx="96" cy="70" r="4.5" fill="var(--navy)" />
        <g className={a('lvw5-cover', 'lvw5-cover--anim')}>
          <rect
            x="96" y="70" width="160" height="118" rx="10"
            fill="url(#lvw5-cover)" stroke="var(--navy)" strokeWidth="3"
          />
          {/* louvre vents on the cover face */}
          <g stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.55">
            <path d="M120 150 h112" />
            <path d="M120 162 h112" />
            <path d="M120 174 h112" />
          </g>
          {/* alfanar-style window cut where the lamp shows through */}
          <rect
            x="208" y="56" width="48" height="36" rx="6"
            fill="var(--bg-2)" stroke="var(--navy)" strokeWidth="2.5" opacity="0.92"
          />
        </g>

        {/* ============ Indicator lamp (energizes last) ============ */}
        {/* glow halo behind the lamp — only visible when energized */}
        <circle
          className={a('lvw5-halo', 'lvw5-halo--anim')}
          cx="232" cy="70" r="22" fill="url(#lvw5-glow)"
          style={reduced ? { opacity: 0 } : undefined}
        />
        {/* lamp bezel */}
        <circle cx="232" cy="70" r="12" fill="none" stroke="var(--navy)" strokeWidth="3" />
        {/* lamp lens — grey -> beacon blue. The glow is keyframed (only on when
            energized); reduced mode shows the static energized end-state. */}
        <circle
          className={a('lvw5-lamp', 'lvw5-lamp--anim')}
          cx="232" cy="70" r="8.5"
          fill={reduced ? 'var(--accent)' : 'var(--slate)'}
          style={reduced ? { filter: 'drop-shadow(0 0 6px var(--beacon-glow))' } : undefined}
        />
        {/* energized sparkle ticks around the lamp */}
        <g
          className={a('lvw5-spark', 'lvw5-spark--anim')}
          stroke="var(--sky)" strokeWidth="2.4" strokeLinecap="round"
          style={reduced ? { opacity: 0 } : undefined}
        >
          <path d="M232 50 v-7" />
          <path d="M252 70 h7" />
          <path d="M246 56 l5 -5" />
          <path d="M218 56 l-5 -5" />
        </g>
      </g>
    </svg>
  )
}
