// GIS Tank Modification — Step 14: "Fix the upper & lower LV boxes"
// Loop: the lower LV box slides sideways onto its support under the fixed
// upper box; dashed alignment guides flash while it aligns, the fixing bolts
// tighten (rotate), and a check tick confirms the doors are not fouling.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Lower LV box sliding onto its support and aligning under the upper LV box, guide lines flashing, bolts tightening"
    >
      <style>{`
        .g14-stage[data-paused] * { animation-play-state: paused !important; }

        /* lower LV box slides in from the right onto its support */
        .g14-box--anim { animation: g14-box 4.5s ease-in-out infinite; }
        @keyframes g14-box {
          0%       { transform: translateX(60px); }
          35%,100% { transform: translateX(0); }
        }

        /* dashed alignment guides flash while the box travels */
        .g14-guide--anim { animation: g14-guide 4.5s ease-in-out infinite; }
        @keyframes g14-guide {
          0%      { opacity: 0.15; }
          10%     { opacity: 0.9; }
          20%     { opacity: 0.25; }
          30%     { opacity: 0.9; }
          40%     { opacity: 0.6; }
          55%,100%{ opacity: 0; }
        }

        /* fixing bolts spin tight after the box seats */
        .g14-bolt--anim { animation: g14-bolt 4.5s ease-in-out infinite; }
        @keyframes g14-bolt {
          0%,40%   { transform: rotate(0deg); }
          70%,100% { transform: rotate(270deg); }
        }

        /* accent glow ring around the bolts as they are tightened */
        .g14-glow--anim { animation: g14-glow 4.5s ease-in-out infinite; }
        @keyframes g14-glow {
          0%,38%   { opacity: 0; }
          48%      { opacity: 0.9; }
          68%      { opacity: 0.9; }
          78%,100% { opacity: 0; }
        }

        /* doors-clear check tick at the end of the cycle */
        .g14-check--anim { animation: g14-check 4.5s ease-in-out infinite; }
        @keyframes g14-check {
          0%,74%   { opacity: 0; transform: scale(0.5); }
          82%      { opacity: 1; transform: scale(1.1); }
          90%      { opacity: 1; transform: scale(1); }
          97%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== ALFA-G panel, upper front crop ===== */}
      {/* panel body */}
      <rect x="52" y="26" width="130" height="188" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* roof + top bushing housing */}
      <rect x="80" y="16" width="74" height="12" rx="3" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
      <circle cx="117" cy="22" r="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />

      {/* ===== upper LV box — already fixed (grey, knobs, red pilots, door) ===== */}
      <g>
        <rect x="62" y="34" width="110" height="52" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        {/* door seam + hinge marks */}
        <line x1="66" y1="38" x2="66" y2="82" stroke="#8A9089" strokeWidth="1.5" />
        <rect x="63" y="44" width="3" height="8" fill="#6E767E" />
        <rect x="63" y="66" width="3" height="8" fill="#6E767E" />
        {/* black knobs */}
        <circle cx="86" cy="50" r="4.5" fill="#1E2226" />
        <circle cx="104" cy="50" r="4.5" fill="#1E2226" />
        {/* red pilot lights */}
        <circle cx="146" cy="50" r="3.6" fill="#C0392B" />
        <circle cx="158" cy="50" r="3.6" fill="#C0392B" />
        {/* label strip */}
        <rect x="80" y="66" width="56" height="10" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
        <rect x="80" y="66" width="56" height="3" fill="#0A82C6" />
      </g>

      {/* support shelf for the lower box (from step 13) */}
      <rect x="58" y="150" width="122" height="8" fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" />
      <path d="M 64 158 l 0 12 l 14 -12 Z" fill="#9BA1A6" stroke="#6E767E" strokeWidth="1.5" />
      <path d="M 176 158 l 0 12 l -14 -12 Z" fill="#9BA1A6" stroke="#6E767E" strokeWidth="1.5" />

      <g className="g14-stage" data-paused={paused ? '' : undefined}>
        {/* dashed alignment guides: box edges must line up with the upper box */}
        <g
          className={a('g14-guide', 'g14-guide--anim')}
          stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" fill="none"
          style={reduced ? { opacity: 0.5 } : undefined}
        >
          <line x1="62" y1="30" x2="62" y2="152" />
          <line x1="172" y1="30" x2="172" y2="152" />
        </g>

        {/* ===== lower LV box sliding onto the support ===== */}
        <g className={a('g14-box', 'g14-box--anim')}>
          <rect x="62" y="96" width="110" height="54" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* door seam + hinges — mirrored so the two doors cannot foul */}
          <line x1="168" y1="100" x2="168" y2="146" stroke="#8A9089" strokeWidth="1.5" />
          <rect x="168" y="106" width="3" height="8" fill="#6E767E" />
          <rect x="168" y="130" width="3" height="8" fill="#6E767E" />
          {/* knobs + pilots */}
          <circle cx="86" cy="112" r="4.5" fill="#1E2226" />
          <circle cx="104" cy="112" r="4.5" fill="#1E2226" />
          <circle cx="146" cy="112" r="3.6" fill="#C0392B" />
          {/* cable entry glands on the underside */}
          <circle cx="90" cy="146" r="3" fill="#1E2226" />
          <circle cx="117" cy="146" r="3" fill="#1E2226" />
          <circle cx="144" cy="146" r="3" fill="#1E2226" />
          {/* label strip */}
          <rect x="80" y="128" width="44" height="9" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1" />
          <rect x="80" y="128" width="44" height="3" fill="#C0392B" />

          {/* fixing bolts (hex heads) tightening on the flanges */}
          <g transform="translate(70 92)">
            <g className={a('g14-bolt', 'g14-bolt--anim')}>
              <path d="M -4.7 0 L -2.35 -4.1 h 4.7 L 4.7 0 L 2.35 4.1 h -4.7 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#6E767E" strokeWidth="1.4" />
            </g>
          </g>
          <g transform="translate(164 92)">
            <g className={a('g14-bolt', 'g14-bolt--anim')}>
              <path d="M -4.7 0 L -2.35 -4.1 h 4.7 L 4.7 0 L 2.35 4.1 h -4.7 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#6E767E" strokeWidth="1.4" />
            </g>
          </g>
        </g>

        {/* glow rings over the two bolts while tightening */}
        <g className={a('g14-glow', 'g14-glow--anim')} style={reduced ? { opacity: 0 } : undefined}>
          <circle cx="70" cy="92" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="164" cy="92" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        </g>

        {/* doors-clear tick between the two door seams */}
        <g className={a('g14-check', 'g14-check--anim')} style={reduced ? { opacity: 0 } : { transformOrigin: '206px 120px' }}>
          <circle cx="206" cy="120" r="11" fill="var(--ok, #2e9e5b)" />
          <path d="M 201 120 l 3.5 4 l 7 -8" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* gap callout: doors must not touch */}
      <g stroke="var(--ink2)" strokeWidth="1.5" fill="none" opacity="0.8">
        <line x1="188" y1="86" x2="188" y2="96" />
        <path d="M 185 88 l 3 -3 l 3 3 M 185 94 l 3 3 l 3 -3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* mono badge */}
      <rect x="228" y="176" width="72" height="22" rx="5" fill="var(--accent)" />
      <text x="264" y="191" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">ALIGN ×2</text>
    </svg>
  )
}
