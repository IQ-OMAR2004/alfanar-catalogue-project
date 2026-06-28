// alfanar SWI Kiosk — LV Box Wiring · Step 2: "Strip the conductors"
// Looping motion: a stripping tool clamps near the end of an insulated wire and
// slides outward, peeling a short cuff of coloured insulation off to expose
// bright copper strands; the loose strands then twist together into a neat tip.
// Pure SVG + CSS. All keyframes + classes prefixed "lvw2" for collision safety.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Stripping insulation off a wire to expose and twist copper strands"
    >
      <style>{`
        .lvw2-stage { transform-box: fill-box; }
        .lvw2-stage[data-paused] * { animation-play-state: paused !important; }

        /* The coloured insulation cuff that gets peeled outward and fades. */
        .lvw2-cuff { transform-box: fill-box; transform-origin: left center; }
        .lvw2-cuff--anim {
          animation: lvw2-peel 3.4s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes lvw2-peel {
          0%, 14%   { transform: translateX(0) scaleX(1); opacity: 1; }
          40%       { transform: translateX(34px) scaleX(0.62); opacity: 1; }
          54%       { transform: translateX(48px) scaleX(0.4); opacity: 0; }
          88%       { transform: translateX(48px) scaleX(0.4); opacity: 0; }
          100%      { transform: translateX(0) scaleX(1); opacity: 1; }
        }

        /* Exposed copper section: hidden under cuff, revealed as it slides off. */
        .lvw2-copper { transform-box: fill-box; transform-origin: left center; }
        .lvw2-copper--anim {
          animation: lvw2-expose 3.4s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes lvw2-expose {
          0%, 14%   { transform: scaleX(0.04); }
          40%       { transform: scaleX(0.8); }
          54%, 88%  { transform: scaleX(1); }
          100%      { transform: scaleX(0.04); }
        }

        /* Splayed strands: fan out while exposed, then twist into a tight tip. */
        .lvw2-strand { transform-box: fill-box; transform-origin: left center; }
        .lvw2-strand--anim {
          animation: lvw2-twist 3.4s var(--ease-in-out, ease-in-out) infinite;
        }
        .lvw2-strand--up.lvw2-strand--anim   { animation-name: lvw2-twist-up; }
        .lvw2-strand--down.lvw2-strand--anim { animation-name: lvw2-twist-down; }
        @keyframes lvw2-twist-up {
          0%, 40%   { transform: rotate(0deg); }
          62%       { transform: rotate(-9deg); }
          82%, 100% { transform: rotate(0deg); }
        }
        @keyframes lvw2-twist-down {
          0%, 40%   { transform: rotate(0deg); }
          62%       { transform: rotate(9deg); }
          82%, 100% { transform: rotate(0deg); }
        }

        /* Tight twisted tip appears only after the twist completes. */
        .lvw2-tip { transform-box: fill-box; transform-origin: left center; }
        .lvw2-tip--anim {
          animation: lvw2-tip 3.4s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes lvw2-tip {
          0%, 68%   { opacity: 0; transform: scaleX(0.5); }
          84%, 96%  { opacity: 1; transform: scaleX(1); }
          100%      { opacity: 0; transform: scaleX(0.5); }
        }

        /* The stripping tool: clamps shut, slides outward, releases, returns. */
        .lvw2-tool { transform-box: fill-box; transform-origin: center center; }
        .lvw2-tool--anim {
          animation: lvw2-tool 3.4s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes lvw2-tool {
          0%        { transform: translateX(0); }
          14%       { transform: translateX(0); }
          40%       { transform: translateX(34px); }
          52%       { transform: translateX(48px); }
          60%       { transform: translateX(60px) translateY(-22px); }
          72%       { transform: translateX(60px) translateY(-44px); }
          100%      { transform: translateX(0) translateY(0); }
        }

        /* Tool jaws pinch closed around the wire during the cut/pull. */
        .lvw2-jaw { transform-box: fill-box; }
        .lvw2-jaw--top    { transform-origin: center bottom; }
        .lvw2-jaw--bottom { transform-origin: center top; }
        .lvw2-jaw--top.lvw2-jaw--anim    { animation: lvw2-jaw-top 3.4s var(--ease-in-out, ease-in-out) infinite; }
        .lvw2-jaw--bottom.lvw2-jaw--anim { animation: lvw2-jaw-bot 3.4s var(--ease-in-out, ease-in-out) infinite; }
        @keyframes lvw2-jaw-top {
          0%        { transform: translateY(-4px); }
          12%       { transform: translateY(0); }
          54%       { transform: translateY(0); }
          60%, 100% { transform: translateY(-4px); }
        }
        @keyframes lvw2-jaw-bot {
          0%        { transform: translateY(4px); }
          12%       { transform: translateY(0); }
          54%       { transform: translateY(0); }
          60%, 100% { transform: translateY(4px); }
        }

        /* Subtle beacon shimmer travelling along the bright copper. */
        .lvw2-shine--anim {
          animation: lvw2-shine 3.4s ease-in-out infinite;
        }
        @keyframes lvw2-shine {
          0%, 50%   { opacity: 0; }
          66%       { opacity: 0.9; }
          88%, 100% { opacity: 0; }
        }
      `}</style>

      {/* ground line for grounding/legibility */}
      <line x1="0" y1="206" x2="320" y2="206" stroke="var(--line-2)" strokeWidth="2" />

      <g className="lvw2-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Anchored insulated wire (stays put on the left) ---- */}
        <line
          x1="20" y1="120" x2="150" y2="120"
          stroke="var(--navy)" strokeWidth="18" strokeLinecap="round"
        />
        <line
          x1="20" y1="120" x2="150" y2="120"
          stroke="var(--accent)" strokeWidth="13" strokeLinecap="round"
        />
        {/* sheath sheen */}
        <line
          x1="28" y1="116" x2="140" y2="116"
          stroke="var(--sky)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"
        />

        {/* ---- Exposed copper core (revealed as cuff slides off) ---- */}
        <g className={anim('lvw2-copper')}>
          {/* base copper rod */}
          <line
            x1="150" y1="120" x2="226" y2="120"
            stroke="var(--warn)" strokeWidth="9" strokeLinecap="round"
          />
          <line
            x1="150" y1="120" x2="226" y2="120"
            stroke="var(--ok)" strokeWidth="3.5" strokeLinecap="round" opacity="0"
          />
          {/* twinkle highlight on copper */}
          <line
            className={reduced ? undefined : 'lvw2-shine--anim'}
            x1="158" y1="117" x2="220" y2="117"
            stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round"
            opacity={reduced ? 0.5 : 0}
          />
        </g>

        {/* ---- Splayed copper strands that twist into a tip ---- */}
        <g className={anim('lvw2-strand') + ' lvw2-strand--up'}>
          <line x1="216" y1="118" x2="252" y2="106" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className={anim('lvw2-strand') + ' lvw2-strand--down'}>
          <line x1="216" y1="122" x2="252" y2="134" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <line x1="216" y1="120" x2="254" y2="120" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />

        {/* tightly twisted neat tip (fades in after twist) */}
        <g className={anim('lvw2-tip')}>
          <line x1="226" y1="120" x2="262" y2="120" stroke="var(--warn)" strokeWidth="7" strokeLinecap="round" />
          {/* twist banding */}
          <line x1="232" y1="116" x2="240" y2="124" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
          <line x1="242" y1="116" x2="250" y2="124" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
          <line x1="252" y1="116" x2="260" y2="124" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
        </g>

        {/* ---- Coloured insulation cuff being peeled off ---- */}
        <g className={anim('lvw2-cuff')}>
          <rect
            x="150" y="111" width="22" height="18" rx="6"
            fill="var(--accent)" stroke="var(--navy)" strokeWidth="2"
          />
          {/* torn leading lip */}
          <path
            d="M172 112 l5 8 l-5 8 z"
            fill="var(--accent2)" stroke="var(--navy)" strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* ---- Stripping tool (clamps + slides outward, lifts away, returns) ---- */}
        <g className={anim('lvw2-tool')} filter="url(#lvw2-glow)">
          {/* handle / body */}
          <rect x="138" y="72" width="26" height="30" rx="5" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2" />
          <rect x="146" y="64" width="10" height="12" rx="3" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="1.6" />
          {/* neck down to jaws */}
          <rect x="148" y="100" width="6" height="8" fill="var(--slate)" />
          {/* upper jaw */}
          <g className={anim('lvw2-jaw') + ' lvw2-jaw--top'}>
            <path d="M137 108 h28 v6 l-14 6 l-14 -6 z" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M151 120 l-9 -4 m9 4 l9 -4" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          {/* lower jaw */}
          <g className={anim('lvw2-jaw') + ' lvw2-jaw--bottom'}>
            <path d="M137 132 h28 v-6 l-14 -6 l-14 6 z" fill="var(--ink2)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          </g>
        </g>
      </g>

      {/* beacon glow for the tool */}
      <defs>
        <filter id="lvw2-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="var(--beacon-glow)" floodOpacity="1" />
        </filter>
      </defs>
    </svg>
  )
}
