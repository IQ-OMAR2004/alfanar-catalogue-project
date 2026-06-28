export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Filling the GIS tank with SF6 gas to 0.05 MPa, do not overfill">
      <style>{`
        @keyframes ga42-flow { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -32 } }
        @keyframes ga42-needle { 0% { transform: rotate(-58deg) } 55% { transform: rotate(40deg) } 100% { transform: rotate(-58deg) } }
        @keyframes ga42-blink { 0%,44% { opacity: .25 } 50%,94% { opacity: 1 } 100% { opacity: .25 } }
        @keyframes ga42-warn { 0% { opacity: .4 } 50% { opacity: 1 } 100% { opacity: .4 } }
        @keyframes ga42-fill { 0% { transform: scaleY(.35) } 55% { transform: scaleY(.62) } 100% { transform: scaleY(.35) } }
        .ga42-flow--anim { animation: ga42-flow 1.1s linear infinite; }
        .ga42-needle { transform-box: fill-box; transform-origin: 50% 92%; transform: rotate(-58deg); }
        .ga42-needle--anim { animation: ga42-needle 3.2s ease-in-out infinite; }
        .ga42-blink { opacity: .25; }
        .ga42-blink--anim { animation: ga42-blink 3.2s ease-in-out infinite; }
        .ga42-warn { opacity: .4; }
        .ga42-warn--anim { animation: ga42-warn 1.6s ease-in-out infinite; }
        .ga42-gas { transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(.35); }
        .ga42-gas--anim { animation: ga42-fill 3.2s ease-in-out infinite; }
        .ga42-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga42-stage" data-paused={paused ? '' : undefined}>
        {/* SF6 gas machine */}
        <rect x="24" y="118" width="74" height="96" rx="8" fill="var(--panel-2)" stroke="var(--ink2)" strokeWidth="2" />
        <rect x="34" y="128" width="54" height="20" rx="4" fill="var(--navy)" />
        <text x="61" y="143" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">SF6</text>
        {/* selector set to Filling */}
        <circle cx="48" cy="172" r="11" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <line x1="48" y1="172" x2="48" y2="164" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        {/* blinking run indicator */}
        <circle cx="78" cy="172" r="7" fill="var(--ok)" className={anim('ga42-blink')} />
        <text x="61" y="203" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)">FILL</text>

        {/* DN8 hose carrying gas, machine -> tank */}
        <path d="M98 158 C 132 158 138 190 178 190" fill="none" stroke="var(--slate)" strokeWidth="8" strokeLinecap="round" />
        <path d="M98 158 C 132 158 138 190 178 190" fill="none" stroke="var(--accent2)" strokeWidth="3"
          strokeLinecap="round" strokeDasharray="6 10" className={anim('ga42-flow')} />
        <text x="120" y="150" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">DN8</text>

        {/* the GIS tank filling up */}
        <rect x="176" y="120" width="84" height="94" rx="12" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="3" />
        <rect x="183" y="127" width="70" height="80" rx="8" fill="var(--accent2)" opacity="0.32" className={anim('ga42-gas')} />
        <rect x="183" y="127" width="70" height="80" rx="8" fill="none" stroke="var(--ink2)" strokeWidth="1" opacity="0.4" />

        {/* pressure gauge with rising needle */}
        <circle cx="218" cy="58" r="32" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="3" />
        <path d="M190 64 A32 32 0 0 1 246 64" fill="none" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round" />
        <path d="M240 50 A32 32 0 0 1 246 64" fill="none" stroke="var(--warn)" strokeWidth="4" strokeLinecap="round" />
        <g className={anim('ga42-needle')}>
          <rect x="216" y="40" width="4" height="40" rx="2" fill="var(--accent)" />
        </g>
        <circle cx="218" cy="78" r="5" fill="var(--ink)" />
        <text x="218" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">0.05 MPa</text>

        {/* hazard caution glyph */}
        <g className={anim('ga42-warn')}>
          <path d="M286 178 L302 208 L270 208 Z" fill="var(--warn)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="284" y="188" width="4" height="9" rx="2" fill="#fff" />
          <rect x="284" y="200" width="4" height="4" rx="2" fill="#fff" />
        </g>
      </g>
    </svg>
  )
}
