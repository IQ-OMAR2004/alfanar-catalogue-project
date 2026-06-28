// alfanar SWI Kiosk — Switchgear Test · Step 5: "Re-energize & hand over"
// Looping motion (a single, told-in-stages sequence — visually distinct from
// every other step's pulse/sweep):
//   1. A padlock lifts off the breaker handle (lock-out removed).
//   2. The breaker switch throws CLOSED (handle swings down, ON flag shows).
//   3. Three phase indicator lamps light up GREEN one after another, in sequence.
//   4. A final beacon-blue "healthy / ready" glow pulses once across the panel.
//   ...then everything resets and the cycle repeats seamlessly (~3.8s).
//
// Pure SVG + CSS @keyframes in one inline <style>. Every keyframe and class name
// is prefixed "swg5" for collision safety (18 of these mount in one document).
// All colours are brand CSS custom properties so it adapts to light/dark.

export default function StepAnimation({ paused = false, reduced = false }) {
  // Attach the animated variant class only when motion is allowed.
  const a = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Padlock lifting off a breaker, the switch closing, three phase lamps lighting green, and a healthy-ready glow across the panel"
    >
      <style>{`
        /* ---- collision-safe, brand-themed, seamless ~3.8s loop ---- */
        .swg5-stage { transform-box: fill-box; }
        .swg5-stage[data-paused] * { animation-play-state: paused !important; }

        /* (1) PADLOCK lifts off the handle, hangs a beat, then drops back to
           re-arm the loop. transform-box+origin keep the lift purely vertical. */
        .swg5-lock { transform-box: fill-box; transform-origin: 50% 100%; }
        .swg5-lock--anim { animation: swg5-lock 3.8s cubic-bezier(.34,0,.2,1) infinite; }
        @keyframes swg5-lock {
          0%        { transform: translateY(0)    scale(1);    opacity: 1; }
          8%        { transform: translateY(-2px) scale(1.04); opacity: 1; }   /* unlatch nudge */
          18%       { transform: translateY(-26px) scale(1);   opacity: 1; }   /* lifted clear */
          26%       { transform: translateY(-26px) scale(1);   opacity: 1; }
          34%       { transform: translateY(-40px) scale(0.7); opacity: 0; }   /* carried away (faded out) */
          88%       { transform: translateY(-40px) scale(0.7); opacity: 0; }
          89%       { transform: translateY(0)    scale(1);    opacity: 0; }   /* snaps home while INVISIBLE (no visible streak) */
          96%       { transform: translateY(0)    scale(1);    opacity: 0; }
          100%      { transform: translateY(0)    scale(1);    opacity: 1; }   /* clean fade-in at home === 0% state, seamless */
        }
        /* the shackle "pops" open just before the lift */
        .swg5-shackle--anim { animation: swg5-shackle 3.8s cubic-bezier(.34,0,.2,1) infinite; }
        @keyframes swg5-shackle {
          0%, 4%    { transform: translateX(0)    rotate(0deg); }    /* closed (re-armed) */
          10%       { transform: translateX(2.5px) rotate(28deg); }   /* swings open */
          18%, 86%  { transform: translateX(2.5px) rotate(28deg); }   /* held open while lock is carried away (lock body is faded out here) */
          92%, 100% { transform: translateX(0)    rotate(0deg); }    /* re-closes off-screen so 100% === 0% — seamless */
        }

        /* (2) BREAKER handle throws to CLOSED (down) once the lock is clear.
           Pivot at the handle's mounting boss. */
        .swg5-handle { transform-box: fill-box; transform-origin: 50% 0%; }
        .swg5-handle--anim { animation: swg5-handle 3.8s cubic-bezier(.5,0,.2,1) infinite; }
        @keyframes swg5-handle {
          0%, 30%   { transform: rotate(-46deg); }   /* OPEN / off, parked up-left */
          40%       { transform: rotate(8deg);  }    /* throw past centre */
          45%       { transform: rotate(0deg);  }    /* seats CLOSED */
          90%       { transform: rotate(0deg);  }
          100%      { transform: rotate(-46deg); }   /* springs back to OPEN on reset */
        }
        /* I/O status flag flips from O (red, off) to I (green, on) */
        .swg5-off--anim { animation: swg5-off 3.8s steps(1,end) infinite; }
        @keyframes swg5-off { 0%,40% { opacity: 1; } 45%,100% { opacity: 0; } }
        .swg5-on--anim  { animation: swg5-on  3.8s steps(1,end) infinite; }
        @keyframes swg5-on  { 0%,40% { opacity: 0; } 45%,90% { opacity: 1; } 100% { opacity: 0; } }

        /* (3) THREE phase indicator lamps light GREEN in sequence after close.
           Same keyframe, staggered by per-lamp animation-delay. */
        .swg5-lamp--anim { animation: swg5-lamp 3.8s ease-out infinite; }
        @keyframes swg5-lamp {
          0%, 47%   { opacity: 0.16; }
          51%       { opacity: 1; }
          58%       { opacity: 0.82; }   /* settles to a steady-lit glow */
          88%       { opacity: 0.82; }
          94%, 100% { opacity: 0.16; }
        }
        .swg5-lamp2 { animation-delay: 0.18s; }
        .swg5-lamp3 { animation-delay: 0.36s; }

        /* lamp halo blooms with the lamp */
        .swg5-halo--anim { animation: swg5-halo 3.8s ease-out infinite; }
        @keyframes swg5-halo {
          0%, 47%   { opacity: 0; transform: scale(0.4); }
          53%       { opacity: 0.85; transform: scale(1.15); }
          60%       { opacity: 0.4; transform: scale(1); }
          88%       { opacity: 0.4; transform: scale(1); }
          94%, 100% { opacity: 0; transform: scale(0.4); }
        }
        .swg5-halo2 { animation-delay: 0.18s; }
        .swg5-halo3 { animation-delay: 0.36s; }

        /* (4) FINAL "healthy / ready" beacon-blue glow pulses once across the
           whole panel after all three phases are lit, then fades before reset. */
        .swg5-ready--anim { animation: swg5-ready 3.8s ease-in-out infinite; }
        @keyframes swg5-ready {
          0%, 66%   { opacity: 0; transform: scale(0.92); }
          74%       { opacity: 0.9; transform: scale(1.02); }   /* the one bright pulse */
          82%       { opacity: 0.32; transform: scale(1); }
          90%       { opacity: 0.32; transform: scale(1); }
          96%, 100% { opacity: 0; transform: scale(0.92); }
        }
        /* "READY" beacon at the top of the panel switches on with the glow */
        .swg5-beacon--anim { animation: swg5-beacon 3.8s ease-in-out infinite; }
        @keyframes swg5-beacon {
          0%, 66%   { opacity: 0.18; }
          74%       { opacity: 1; }
          90%       { opacity: 1; }
          96%, 100% { opacity: 0.18; }
        }
      `}</style>

      {/* ===== static backdrop ===== */}
      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <line x1="0" y1="218" x2="320" y2="218" stroke="var(--line-2, var(--slate))" strokeWidth="2" opacity="0.6" />

      {/* ===== switchgear panel (static structure) ===== */}
      {/* outer enclosure */}
      <rect x="34" y="26" width="252" height="180" rx="10"
        fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
      {/* recessed face */}
      <rect x="46" y="38" width="228" height="156" rx="6"
        fill="var(--navy)" stroke="var(--ink2)" strokeWidth="2" />

      {/* ===== animated content ===== */}
      <g className="swg5-stage" data-paused={paused ? '' : undefined}>

        {/* (4) READY glow wash — sits behind the panel detail, blooms last.
               Rendered first so the lamps/handle read on top of it. */}
        <g className={a('swg5-ready')}
           style={{ transformBox: 'fill-box', transformOrigin: '50% 50%',
                    filter: 'drop-shadow(0 0 16px var(--beacon-glow))',
                    opacity: reduced ? 0.32 : 0 }}>
          <rect x="50" y="42" width="220" height="148" rx="6"
            fill="none" stroke="var(--accent)" strokeWidth="3" />
          <rect x="50" y="42" width="220" height="148" rx="6"
            fill="var(--sky)" opacity="0.10" />
        </g>

        {/* ================= TOP: "READY" beacon ================= */}
        <g className={a('swg5-beacon')} style={{ opacity: reduced ? 1 : 0.18 }}>
          {/* beacon dome */}
          <g style={{ filter: 'drop-shadow(0 0 7px var(--beacon-glow))' }}>
            <rect x="142" y="46" width="36" height="9" rx="2"
              fill="var(--ink)" stroke="var(--slate)" strokeWidth="1.5" />
            <path d="M147 46 a 13 13 0 0 1 26 0 Z"
              fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
            <ellipse cx="156" cy="40" rx="3.5" ry="5" fill="var(--sky)" opacity="0.85" />
          </g>
          <text x="160" y="68" fontSize="8.5" fontWeight="800" textAnchor="middle"
            fontFamily="system-ui, sans-serif" fill="var(--accent)"
            letterSpacing="1.5">READY</text>
        </g>

        {/* ================= BREAKER (left) ================= */}
        <g transform="translate(96 122)">
          {/* breaker body / housing */}
          <rect x="-40" y="-34" width="80" height="92" rx="8"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />
          {/* line + load terminals (static) */}
          <rect x="-10" y="-46" width="20" height="14" rx="3"
            fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="-10" y="56" width="20" height="14" rx="3"
            fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />

          {/* throw arc guide (static reference, OPEN <-> CLOSED) */}
          <path d="M -26 -6 A 26 26 0 0 1 0 -26" fill="none"
            stroke="var(--ink2)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

          {/* I / O status window: O(off,red) under I(on,green) */}
          <g transform="translate(20 -18)">
            <rect x="-9" y="-9" width="18" height="18" rx="3"
              fill="var(--ink)" stroke="var(--slate)" strokeWidth="1.5" />
            <text className={a('swg5-off')} x="0" y="4.5" fontSize="13" fontWeight="900"
              textAnchor="middle" fontFamily="system-ui, sans-serif" fill="var(--warn)"
              style={{ opacity: reduced ? 0 : 1 }}>O</text>
            <text className={a('swg5-on')} x="0" y="4.5" fontSize="13" fontWeight="900"
              textAnchor="middle" fontFamily="system-ui, sans-serif" fill="var(--ok)"
              style={{ filter: 'drop-shadow(0 0 4px var(--ok))', opacity: reduced ? 1 : 0 }}>I</text>
          </g>

          {/* (2) breaker HANDLE — pivots at the boss (0,0); throws to CLOSED.
                 Static reduced pose = seated CLOSED (down). */}
          <g className={a('swg5-handle')}
             style={reduced ? { transform: 'rotate(0deg)' } : undefined}>
            <rect x="-5" y="0" width="10" height="34" rx="5"
              fill="var(--accent2)" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="-6" y="30" width="12" height="10" rx="3"
              fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
          </g>
          {/* handle mounting boss (static, on top of pivot) */}
          <circle cx="0" cy="0" r="6" fill="var(--ink)" stroke="var(--accent)" strokeWidth="2" />

          {/* (1) PADLOCK lifting off the handle boss. Body + animated shackle.
                 Static reduced pose = lifted clear & faded (lock removed). */}
          <g className={a('swg5-lock')}
             style={reduced ? { transform: 'translateY(-30px)', opacity: 0.35 } : { opacity: 1 }}>
            {/* shackle (animated open) */}
            <g className={reduced ? undefined : 'swg5-shackle--anim swg5-shackle'}
               style={{ transformBox: 'fill-box', transformOrigin: '90% 100%',
                        transform: reduced ? 'translateX(2.5px) rotate(28deg)' : undefined }}>
              <path d="M -7 -6 v -6 a 7 7 0 0 1 14 0 v 6" fill="none"
                stroke="var(--ink2)" strokeWidth="3.4" strokeLinecap="round" />
            </g>
            {/* lock body */}
            <rect x="-10" y="-7" width="20" height="17" rx="3.5"
              fill="var(--warn)" stroke="var(--ink)" strokeWidth="2.5" />
            {/* keyhole */}
            <circle cx="0" cy="0" r="2.4" fill="var(--ink)" />
            <rect x="-1.1" y="0" width="2.2" height="5" rx="1" fill="var(--ink)" />
          </g>
        </g>

        {/* ================= PHASE BUSBARS + LAMPS (right) ================= */}
        <g transform="translate(170 92)">
          {/* sub-panel for the three phases */}
          <rect x="0" y="-8" width="92" height="104" rx="6"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />

          {/* three phase rows: busbar stub + lamp + label */}
          {[
            { y: 12,  label: 'L1', n: 1 },
            { y: 44,  label: 'L2', n: 2 },
            { y: 76,  label: 'L3', n: 3 },
          ].map(({ y, label, n }) => (
            <g key={label} transform={`translate(0 ${y})`}>
              {/* busbar conductor stub feeding the lamp (static) */}
              <rect x="8" y="-5" width="26" height="10" rx="3"
                fill="var(--warn)" stroke="var(--navy)" strokeWidth="2" />
              {/* phase label */}
              <text x="21" y="3.5" fontSize="7" fontWeight="800" textAnchor="middle"
                fontFamily="system-ui, sans-serif" fill="var(--navy)">{label}</text>

              {/* lamp socket */}
              <circle cx="58" cy="0" r="11"
                fill="var(--ink)" stroke="var(--slate)" strokeWidth="2" />

              {/* halo bloom behind the lamp */}
              <circle
                className={reduced ? undefined : `swg5-halo--anim swg5-halo${n}`}
                cx="58" cy="0" r="15"
                fill="none" stroke="var(--ok)" strokeWidth="3"
                style={{ transformBox: 'fill-box', transformOrigin: '50% 50%',
                         filter: 'drop-shadow(0 0 6px var(--ok))',
                         opacity: reduced ? 0.4 : 0 }} />

              {/* the GREEN lamp lens (lights in sequence) */}
              <circle
                className={reduced ? undefined : `swg5-lamp--anim swg5-lamp${n}`}
                cx="58" cy="0" r="8"
                fill="var(--ok)"
                style={{ filter: 'drop-shadow(0 0 5px var(--ok))',
                         opacity: reduced ? 0.82 : 0.16 }} />
              {/* lens highlight */}
              <circle cx="55" cy="-3" r="2.4" fill="var(--bg-2, #ffffff)" opacity="0.55" />
            </g>
          ))}

          {/* "PHASES OK" caption under the lamps (static) */}
          <text x="46" y="92" fontSize="7" fontWeight="700" textAnchor="middle"
            fontFamily="system-ui, sans-serif" fill="var(--ink2)"
            letterSpacing="0.5">L1 · L2 · L3</text>
        </g>

      </g>
    </svg>
  )
}
