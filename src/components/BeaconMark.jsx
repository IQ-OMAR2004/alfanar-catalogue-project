// alfanar = "the lighthouse." A compact beacon mark used in the top bar and on
// the language gate. The light pulses gently (the brand's guiding-beacon motif);
// it holds still under prefers-reduced-motion via the global CSS override.
export default function BeaconMark({ size = 34, glow = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="alfanar"
      focusable="false"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="bm-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent2)" />
        </linearGradient>
        <radialGradient id="bm-light" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--sky)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--sky)" stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes bm-pulse { 0%,100%{opacity:.35;transform:scale(.85)} 50%{opacity:1;transform:scale(1.12)} }
          @keyframes bm-beam  { 0%,100%{opacity:.18} 50%{opacity:.5} }
          .bm-halo{transform-origin:24px 13px;animation:bm-pulse 3.2s var(--ease-in-out) infinite}
          .bm-beam{animation:bm-beam 3.2s var(--ease-in-out) infinite}
        `}</style>
      </defs>

      {/* beams */}
      {glow && (
        <g className="bm-beam" fill="var(--sky)">
          <path d="M24 13 L6 6 L6 10 Z" opacity="0.5" />
          <path d="M24 13 L42 6 L42 10 Z" opacity="0.5" />
        </g>
      )}
      {/* halo */}
      {glow && <circle className="bm-halo" cx="24" cy="13" r="9" fill="url(#bm-light)" />}

      {/* lantern light */}
      <circle cx="24" cy="13" r="3.4" fill="var(--sky)" />
      {/* tower */}
      <path
        d="M20 17 h8 l1.6 22 a1 1 0 0 1 -1 1.1 h-9.2 a1 1 0 0 1 -1 -1.1 Z"
        fill="url(#bm-tower)"
      />
      {/* lantern housing */}
      <path d="M19.5 16.6 h9 v1.2 h-9 Z" fill="var(--navy)" opacity="0.35" />
      {/* banding */}
      <path
        d="M19.4 24 h9.2 M19 31 h10"
        stroke="var(--bg)"
        strokeWidth="1.6"
        opacity="0.6"
      />
      {/* base */}
      <path d="M17 39.8 h14 v1.6 a1 1 0 0 1 -1 1 H18 a1 1 0 0 1 -1 -1 Z" fill="var(--accent2)" />
    </svg>
  )
}
