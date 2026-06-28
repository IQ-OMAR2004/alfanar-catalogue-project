export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Sling the rear middle cover on eye bolts and lift it off with the overhead crane">
      <style>{`
        @keyframes ga15-hoist { 0%,12% { transform: translateY(0) } 60%,76% { transform: translateY(-30px) } 100% { transform: translateY(0) } }
        @keyframes ga15-sway { 0% { transform: rotate(-2.2deg) } 50% { transform: rotate(2.2deg) } 100% { transform: rotate(-2.2deg) } }
        @keyframes ga15-gap { 0%,18% { opacity: 0 } 60%,76% { opacity: 0.7 } 100% { opacity: 0 } }
        @keyframes ga15-warn { 0%,100% { opacity: 0.45 } 50% { opacity: 1 } }
        .ga15-load { transform: translateY(0); }
        .ga15-load--anim { animation: ga15-hoist 3.2s ease-in-out infinite; }
        .ga15-rig { transform-box: fill-box; transform-origin: 50% 0%; transform: rotate(-2.2deg); }
        .ga15-rig--anim { animation: ga15-sway 3.2s ease-in-out infinite; }
        .ga15-gap--anim { animation: ga15-gap 3.2s ease-in-out infinite; }
        .ga15-warn--anim { animation: ga15-warn 1.8s ease-in-out infinite; }
        .ga15-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga15-stage" data-paused={paused ? '' : undefined}>
        {/* overhead crane rail + trolley */}
        <rect x="30" y="22" width="260" height="12" rx="4" fill="var(--slate)" />
        <rect x="142" y="34" width="36" height="14" rx="4" fill="var(--navy)" />
        <circle cx="151" cy="34" r="3" fill="var(--ink2)" />
        <circle cx="169" cy="34" r="3" fill="var(--ink2)" />

        {/* tank wall the cover is removed from, with empty opening */}
        <rect x="40" y="120" width="62" height="98" rx="10" fill="var(--accent)" />
        <rect x="218" y="120" width="62" height="98" rx="10" fill="var(--accent)" />
        <rect x="96" y="120" width="128" height="98" rx="10" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2.5" />
        {/* exposed studs around the opening (kept undamaged) */}
        <circle cx="108" cy="132" r="3" fill="var(--ink2)" />
        <circle cx="160" cy="130" r="3" fill="var(--ink2)" />
        <circle cx="212" cy="132" r="3" fill="var(--ink2)" />
        <circle cx="108" cy="206" r="3" fill="var(--ink2)" />
        <circle cx="212" cy="206" r="3" fill="var(--ink2)" />

        {/* parting gap that appears as the cover lifts clear */}
        <rect x="100" y="112" width="120" height="6" rx="3" fill="var(--warn)" className={anim('ga15-gap')} />

        {/* swaying chain rig + cover, hoisted together */}
        <g className={anim('ga15-load')}>
          <g className={anim('ga15-rig')}>
            {/* crane hook */}
            <path d="M160 50 v8 a7 7 0 1 0 6 0" fill="none" stroke="var(--ink2)" strokeWidth="3.5" strokeLinecap="round" />
            {/* steel chain slings to the two eye bolts */}
            <line x1="160" y1="62" x2="124" y2="92" stroke="var(--ink2)" strokeWidth="3"
              strokeDasharray="4 3" strokeLinecap="round" />
            <line x1="160" y1="62" x2="196" y2="92" stroke="var(--ink2)" strokeWidth="3"
              strokeDasharray="4 3" strokeLinecap="round" />
            {/* two M10 eye bolts */}
            <circle cx="124" cy="92" r="6" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            <circle cx="196" cy="92" r="6" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            {/* the rear middle cover */}
            <rect x="100" y="96" width="120" height="48" rx="8" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2.5" />
            <line x1="118" y1="106" x2="118" y2="134" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
            <line x1="202" y1="106" x2="202" y2="134" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
          </g>
        </g>

        {/* hazard glyph: ~50 kg, keep clear during the lift */}
        <g className={anim('ga15-warn')}>
          <path d="M278 168 l16 28 h-32 z" fill="var(--warn)" stroke="var(--ink2)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="276" y="178" width="4" height="9" rx="2" fill="var(--ink)" />
          <rect x="276" y="189" width="4" height="4" rx="2" fill="var(--ink)" />
        </g>

        {/* weight badge */}
        <rect x="232" y="50" width="58" height="24" rx="7" fill="var(--accent2)" />
        <text x="261" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          fill="var(--on-accent)">50 kg</text>
      </g>
    </svg>
  )
}
