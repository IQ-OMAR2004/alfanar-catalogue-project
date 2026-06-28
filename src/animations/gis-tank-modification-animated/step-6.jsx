// GIS Tank — Step 6: Set the breaker on the pallet.
// A hooked breaker swings clear of the tank (left), then lowers onto a
// cushion layer on a wooden pallet (right). A caution glyph pulses near the
// tank edge — contact scratches the breaker. Seamless loop, brand-themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Lowering the breaker clear of the tank onto a cushioned pallet"
    >
      <style>{`
        @keyframes ga6-rig { 0% { transform: translate(0,0) } 30% { transform: translate(96px,0) } 60% { transform: translate(96px,34px) } 88% { transform: translate(96px,34px) } 100% { transform: translate(0,0) } }
        @keyframes ga6-sway { 0%,100% { transform: rotate(-4deg) } 14% { transform: rotate(4deg) } 30% { transform: rotate(0deg) } 60%,88% { transform: rotate(0deg) } }
        @keyframes ga6-warn { 0%,100% { opacity: .3; transform: scale(.92) } 14% { opacity: 1; transform: scale(1.08) } 30% { opacity: .3; transform: scale(.92) } }
        @keyframes ga6-press { 0%,58% { transform: scaleY(1) } 70% { transform: scaleY(.66) } 88% { transform: scaleY(.66) } 100% { transform: scaleY(1) } }
        .ga6-rig { transform: translate(0,0); }
        .ga6-rig--anim { animation: ga6-rig 3.4s ease-in-out infinite; }
        .ga6-load { transform-box: fill-box; transform-origin: 50% 0%; transform: rotate(-4deg); }
        .ga6-load--anim { animation: ga6-sway 3.4s ease-in-out infinite; }
        .ga6-warn { transform-box: fill-box; transform-origin: center; }
        .ga6-warn--anim { animation: ga6-warn 3.4s ease-in-out infinite; }
        .ga6-cushion { transform-box: fill-box; transform-origin: 50% 100%; }
        .ga6-cushion--anim { animation: ga6-press 3.4s ease-in-out infinite; }
        .ga6-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga6-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Overhead rail + trolley ---- */}
        <rect x="22" y="26" width="276" height="9" rx="4" fill="var(--slate)" />
        <rect x="22" y="35" width="276" height="3" rx="1.5" fill="var(--ink2)" opacity="0.5" />

        {/* ---- Tank to clear (left, hazard side) ---- */}
        <rect x="26" y="120" width="74" height="84" rx="10" fill="var(--panel-2)" stroke="var(--slate)" strokeWidth="2.5" />
        <rect x="38" y="134" width="50" height="14" rx="3" fill="var(--navy)" opacity="0.7" />
        {/* caution: tank edge scratches the breaker */}
        <g className={anim('ga6-warn')}>
          <path d="M101 96 l13 24 h-26 z" fill="var(--warn)" stroke="var(--bg)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="100" y="104" width="2" height="9" rx="1" fill="var(--bg)" />
          <circle cx="101" cy="116" r="1.4" fill="var(--bg)" />
        </g>

        {/* ---- Pallet + cushion (right, target) ---- */}
        <g>
          {/* cushion layer (compresses as load seats) */}
          <rect x="196" y="178" width="86" height="14" rx="5" fill="var(--accent2)" opacity="0.85" className={anim('ga6-cushion')} />
          {/* pallet deck + blocks */}
          <rect x="190" y="192" width="98" height="9" rx="2" fill="var(--ink2)" />
          <rect x="194" y="201" width="14" height="13" rx="2" fill="var(--slate)" />
          <rect x="232" y="201" width="14" height="13" rx="2" fill="var(--slate)" />
          <rect x="270" y="201" width="14" height="13" rx="2" fill="var(--slate)" />
          <rect x="190" y="214" width="98" height="6" rx="2" fill="var(--ink2)" />
        </g>

        {/* ---- Moving rig: trolley + chain + breaker ---- */}
        <g className={anim('ga6-rig')}>
          {/* trolley */}
          <rect x="74" y="20" width="28" height="18" rx="4" fill="var(--ink2)" />
          <circle cx="81" cy="42" r="4.5" fill="var(--slate)" />
          <circle cx="95" cy="42" r="4.5" fill="var(--slate)" />
          {/* chain */}
          <line x1="88" y1="46" x2="88" y2="90" stroke="var(--slate)" strokeWidth="3" strokeDasharray="4 4" />
          {/* swaying load (hook + breaker) */}
          <g className={anim('ga6-load')}>
            <path d="M88 90 q0 8 -7 8 q-7 0 -7 -7" fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round" />
            <rect x="58" y="100" width="60" height="62" rx="8" fill="var(--accent)" stroke="var(--on-accent)" strokeWidth="1.5" />
            <rect x="68" y="112" width="40" height="10" rx="2" fill="var(--on-accent)" opacity="0.55" />
            <rect x="68" y="128" width="40" height="10" rx="2" fill="var(--on-accent)" opacity="0.35" />
            <circle cx="88" cy="153" r="4" fill="var(--on-accent)" opacity="0.7" />
          </g>
        </g>
      </g>
    </svg>
  )
}
