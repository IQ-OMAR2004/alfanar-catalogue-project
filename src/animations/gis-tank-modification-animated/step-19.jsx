export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Crane the slung tank down onto the platform and bolt the legs with four M16 bolts">
      <style>{`
        @keyframes ga19-lower { 0%,10% { transform: translateY(-26px) } 60%,100% { transform: translateY(0) } }
        @keyframes ga19-sway { 0% { transform: rotate(-1.8deg) } 50% { transform: rotate(1.8deg) } 100% { transform: rotate(-1.8deg) } }
        @keyframes ga19-tight { 0%,55% { stroke-dasharray: 4 4 } 70%,100% { stroke-dasharray: 4 0 } }
        @keyframes ga19-seat { 0%,58% { opacity: 0; transform: scale(0.6) } 66% { opacity: 1; transform: scale(1.25) } 86%,100% { opacity: 0; transform: scale(1.25) } }
        @keyframes ga19-bolt { 0%,66% { opacity: 0; transform: scale(0.5) } 80%,100% { opacity: 1; transform: scale(1) } }
        @keyframes ga19-warn { 0%,100% { opacity: 0.45 } 50% { opacity: 1 } }
        .ga19-rig { transform: translateY(-26px); }
        .ga19-rig--anim { animation: ga19-lower 3.4s ease-in-out infinite; }
        .ga19-sway { transform-box: fill-box; transform-origin: 50% 0%; transform: rotate(-1.8deg); }
        .ga19-sway--anim { animation: ga19-sway 3.4s ease-in-out infinite; }
        .ga19-chain--anim { animation: ga19-tight 3.4s ease-in-out infinite; }
        .ga19-seat { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga19-seat--anim { animation: ga19-seat 3.4s ease-in-out infinite; }
        .ga19-bolt { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga19-bolt--anim { animation: ga19-bolt 3.4s ease-in-out infinite; }
        .ga19-warn--anim { animation: ga19-warn 1.8s ease-in-out infinite; }
        .ga19-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga19-stage" data-paused={paused ? '' : undefined}>
        {/* overhead crane rail + trolley */}
        <rect x="30" y="20" width="260" height="11" rx="4" fill="var(--slate)" />
        <rect x="142" y="31" width="36" height="13" rx="4" fill="var(--navy)" />

        {/* ground platform the tank lands on, with leg holes */}
        <rect x="46" y="196" width="180" height="20" rx="5" fill="var(--navy)" />
        <rect x="46" y="192" width="180" height="8" rx="4" fill="var(--slate)" />
        <circle cx="70" cy="196" r="3.5" fill="var(--bg)" />
        <circle cx="202" cy="196" r="3.5" fill="var(--bg)" />

        {/* slung tank, lowered down onto the platform */}
        <g className={anim('ga19-rig')}>
          <g className={anim('ga19-sway')}>
            {/* crane hook */}
            <path d="M136 46 v8 a7 7 0 1 0 6 0" fill="none" stroke="var(--ink2)" strokeWidth="3.5" strokeLinecap="round" />
            {/* 4 steel chain slings + shackles to lifting points */}
            <line x1="136" y1="58" x2="78" y2="96" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" className={anim('ga19-chain')} />
            <line x1="136" y1="58" x2="116" y2="96" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" className={anim('ga19-chain')} />
            <line x1="136" y1="58" x2="158" y2="96" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" className={anim('ga19-chain')} />
            <line x1="136" y1="58" x2="196" y2="96" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" className={anim('ga19-chain')} />
            <circle cx="78" cy="98" r="5" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            <circle cx="116" cy="98" r="5" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            <circle cx="158" cy="98" r="5" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            <circle cx="196" cy="98" r="5" fill="none" stroke="var(--ink2)" strokeWidth="3" />
            {/* the GIS tank body */}
            <rect x="64" y="102" width="146" height="90" rx="12" fill="var(--accent)" />
            <rect x="74" y="112" width="126" height="58" rx="8" fill="var(--panel-2)" opacity="0.85" />
            {/* tank legs that align to the platform holes */}
            <rect x="68" y="186" width="10" height="12" rx="2" fill="var(--navy)" />
            <rect x="196" y="186" width="10" height="12" rx="2" fill="var(--navy)" />
          </g>
        </g>

        {/* seat flash where the tank meets the platform */}
        <g className={anim('ga19-seat')}>
          <circle cx="137" cy="194" r="14" fill="none" stroke="var(--ok)" strokeWidth="3" />
        </g>

        {/* M16 bolts seating into the legs once landed */}
        <g className={anim('ga19-bolt')}>
          <circle cx="73" cy="196" r="4.5" fill="var(--ok)" />
          <circle cx="201" cy="196" r="4.5" fill="var(--ok)" />
        </g>

        {/* hazard glyph: secure chains before lifting */}
        <g className={anim('ga19-warn')}>
          <path d="M278 150 l16 28 h-32 z" fill="var(--warn)" stroke="var(--ink2)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="276" y="160" width="4" height="9" rx="2" fill="var(--ink)" />
          <rect x="276" y="171" width="4" height="4" rx="2" fill="var(--ink)" />
        </g>

        {/* bolt count badge */}
        <rect x="232" y="46" width="62" height="24" rx="7" fill="var(--accent2)" />
        <text x="263" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">4x M16</text>
      </g>
    </svg>
  )
}
