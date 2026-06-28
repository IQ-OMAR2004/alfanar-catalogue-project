// GIS Tank — Step 7: Lift the tank onto the frame (HAZARD).
// An overhead crane hook with 4 slings lowers the tank, sways gently, then
// seats it onto the frame; a caution glyph pulses (do not stand near the lift)
// and a "4x M16" bolt-secure badge confirms. Seamless loop, brand-themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Craning the tank down onto the frame and bolting it in place"
    >
      <style>{`
        @keyframes ga7-lower { 0% { transform: translateY(-34px) rotate(-2.4deg) } 60% { transform: translateY(0) rotate(1.6deg) } 78% { transform: translateY(0) rotate(0deg) } 100% { transform: translateY(-34px) rotate(-2.4deg) } }
        @keyframes ga7-trolley { 0% { transform: translateX(-6px) } 60% { transform: translateX(2px) } 78% { transform: translateX(0) } 100% { transform: translateX(-6px) } }
        @keyframes ga7-warn { 0%,55% { opacity: .35 } 65% { opacity: 1 } 85% { opacity: 1 } 100% { opacity: .35 } }
        @keyframes ga7-badge { 0%,66% { opacity: 0; transform: scale(.5) } 76% { opacity: 1; transform: scale(1) } 94% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(.5) } }
        .ga7-rig { transform-box: fill-box; transform-origin: 50% 0%; transform: translateY(-34px) rotate(-2.4deg); }
        .ga7-rig--anim { animation: ga7-lower 3.2s ease-in-out infinite; }
        .ga7-trolley { transform-box: fill-box; transform-origin: center; transform: translateX(-6px); }
        .ga7-trolley--anim { animation: ga7-trolley 3.2s ease-in-out infinite; }
        .ga7-warn { transform-box: fill-box; transform-origin: center; opacity: .35; }
        .ga7-warn--anim { animation: ga7-warn 3.2s ease-in-out infinite; }
        .ga7-badge { transform-box: fill-box; transform-origin: center; opacity: 0; }
        .ga7-badge--anim { animation: ga7-badge 3.2s ease-in-out infinite; }
        .ga7-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga7-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Overhead crane rail + trolley ---- */}
        <rect x="34" y="26" width="252" height="12" rx="4" fill="var(--slate)" />
        <g className={anim('ga7-trolley')}>
          <rect x="146" y="20" width="28" height="20" rx="4" fill="var(--navy)" />
          <circle cx="153" cy="24" r="3" fill="var(--panel-2)" />
          <circle cx="167" cy="24" r="3" fill="var(--panel-2)" />
        </g>

        {/* ---- Target frame (where the tank lands) ---- */}
        <rect x="92" y="196" width="136" height="14" rx="4" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2" />
        <rect x="100" y="208" width="12" height="14" rx="2" fill="var(--slate)" />
        <rect x="208" y="208" width="12" height="14" rx="2" fill="var(--slate)" />

        {/* ---- Lifting rig: hook line, slings, tank (sways + lowers together) ---- */}
        <g className={anim('ga7-rig')}>
          {/* hoist cable from trolley */}
          <path d="M160 40 v40" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />
          {/* hook */}
          <path d="M160 80 v8 a6 6 0 1 1 -6 6" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />
          {/* 4 sling lines to the lift points */}
          <path d="M160 86 L116 124 M160 86 L146 124 M160 86 L174 124 M160 86 L204 124" stroke="var(--accent2)" strokeWidth="2.5" strokeLinecap="round" />
          {/* tank body */}
          <rect x="108" y="124" width="104" height="62" rx="10" fill="var(--accent)" opacity="0.92" />
          {/* 4 lifting point lugs on the tank top */}
          <circle cx="116" cy="124" r="4" fill="var(--navy)" />
          <circle cx="146" cy="124" r="4" fill="var(--navy)" />
          <circle cx="174" cy="124" r="4" fill="var(--navy)" />
          <circle cx="204" cy="124" r="4" fill="var(--navy)" />
          {/* tank detail seam */}
          <rect x="120" y="146" width="80" height="20" rx="5" fill="var(--panel-2)" opacity="0.6" />
          <text x="160" y="161" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--navy)">SF6</text>
        </g>

        {/* ---- Hazard glyph: do not stand near the lift ---- */}
        <g className={anim('ga7-warn')}>
          <path d="M52 196 l-15 26 h30 z" fill="var(--warn)" stroke="var(--warn)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="50" y="206" width="4" height="8" rx="2" fill="var(--bg)" />
          <rect x="50" y="216" width="4" height="4" rx="2" fill="var(--bg)" />
        </g>

        {/* ---- Bolt-secure confirmation badge: 4x M16 ---- */}
        <g className={anim('ga7-badge')}>
          <rect x="232" y="170" width="62" height="30" rx="8" fill="var(--ok)" />
          <path d="M242 185 l5 5 9 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="276" y="190" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#fff">4x M16</text>
        </g>
      </g>
    </svg>
  )
}
