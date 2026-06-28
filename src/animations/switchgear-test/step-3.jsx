// Step 3 — Test the Switchgear · "Functional trip test"
// A secondary injection set pushes a test current (travelling dots) along the
// line into a protection relay. The relay picks up, a short trip timer runs,
// and the breaker mechanism SNAPS OPEN — the moving contact swings away from the
// fixed contact with a small arc flash. The status flag flips from green CLOSED
// to red TRIPPED. After a beat everything resets to CLOSED and the cycle repeats.
// Pure SVG + CSS. Every @keyframes and class name is prefixed "swg3" so the 18
// animations that mount together never collide.
export default function StepAnimation({ paused = false, reduced = false }) {
  // Motion classes only attach when not reduced. The reduced still is posed at
  // the decisive moment — breaker OPEN, flag TRIPPED, timer showing the trip
  // time — so it reads as "the breaker tripped" without any movement.
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Injected test current trips the breaker open; status flips to TRIPPED then resets"
    >
      <style>{`
        .swg3-stage * { transform-box: fill-box; }

        /* === Injected test current: dots stream from the test set toward the
           relay during the inject phase, then the line goes quiet while the
           breaker trips and resets. The dash gap makes a continuous chase, and
           opacity gates it to the early part of the cycle. ================= */
        @keyframes swg3-inject {
          0%        { stroke-dashoffset: 0;   opacity: 0; }
          4%        { opacity: 1; }
          30%       { stroke-dashoffset: -44; opacity: 1; }
          40%       { stroke-dashoffset: -44; opacity: 0; }
          100%      { stroke-dashoffset: -44; opacity: 0; }
        }

        /* relay "pick-up" core lights as the current arrives, drops at reset */
        @keyframes swg3-pickup {
          0%, 24%   { fill: var(--slate); }
          30%       { fill: var(--warn); }
          82%       { fill: var(--warn); }
          90%, 100% { fill: var(--slate); }
        }
        @keyframes swg3-relayglow {
          0%, 24%   { opacity: 0; }
          32%       { opacity: 1; }
          82%       { opacity: 1; }
          90%, 100% { opacity: 0; }
        }

        /* === Breaker moving contact: holds CLOSED, then SNAPS open fast at the
           trip moment, holds open, then swings back closed at reset. Rotating
           about the hinge (transform-origin set on the element). =========== */
        @keyframes swg3-trip {
          0%, 32%   { transform: rotate(0deg); }
          36%       { transform: rotate(-3deg); }   /* tiny load-up kick */
          41%       { transform: rotate(-42deg); }  /* SNAP open */
          44%       { transform: rotate(-38deg); }  /* slight bounce */
          82%       { transform: rotate(-40deg); }  /* hold tripped */
          92%       { transform: rotate(0deg); }     /* reset closed */
          100%      { transform: rotate(0deg); }
        }

        /* arc flash at the instant the contacts part */
        @keyframes swg3-arc {
          0%, 39%   { opacity: 0; transform: scale(0.4); }
          41%       { opacity: 1; transform: scale(1.15); }
          47%       { opacity: 0; transform: scale(0.6); }
          100%      { opacity: 0; transform: scale(0.4); }
        }

        /* === Trip timer needle: sweeps a short arc while the relay times out,
           then resets. Reads as "trips within time". ===================== */
        @keyframes swg3-needle {
          0%, 24%   { transform: rotate(-58deg); }
          40%       { transform: rotate(-10deg); } /* ran out the trip time */
          82%       { transform: rotate(-10deg); }
          90%, 100% { transform: rotate(-58deg); }
        }

        /* === Status flag flip CLOSED(green) -> TRIPPED(red). Two stacked
           plates cross-fade with a quick vertical flip for a mechanical feel. */
        @keyframes swg3-flagClosed {
          0%, 38%   { opacity: 1; transform: scaleY(1); }
          41%       { opacity: 0; transform: scaleY(0.05); }
          88%       { opacity: 0; transform: scaleY(0.05); }
          92%       { opacity: 1; transform: scaleY(1); }
          100%      { opacity: 1; transform: scaleY(1); }
        }
        @keyframes swg3-flagTripped {
          0%, 38%   { opacity: 0; transform: scaleY(0.05); }
          41%       { opacity: 1; transform: scaleY(1); }
          88%       { opacity: 1; transform: scaleY(1); }
          92%       { opacity: 0; transform: scaleY(0.05); }
          100%      { opacity: 0; transform: scaleY(0.05); }
        }

        /* soft beacon pulse on the breaker enclosure */
        @keyframes swg3-frame {
          0%, 100%  { filter: drop-shadow(0 0 2px var(--beacon-glow)); }
          41%       { filter: drop-shadow(0 0 9px var(--beacon-glow)); }
        }

        .swg3-inject--anim   { animation: swg3-inject 3.4s linear infinite; }
        .swg3-core--anim     { animation: swg3-pickup 3.4s ease-in-out infinite; }
        .swg3-rglow--anim    { animation: swg3-relayglow 3.4s ease-in-out infinite; }
        .swg3-contact--anim  { animation: swg3-trip 3.4s var(--ease-in-out, ease) infinite; }
        .swg3-arc--anim      { animation: swg3-arc 3.4s ease-out infinite; transform-origin: center; }
        .swg3-needle--anim   { animation: swg3-needle 3.4s var(--ease-out, ease) infinite; }
        .swg3-fclosed--anim  { animation: swg3-flagClosed 3.4s ease-in-out infinite; transform-origin: center; }
        .swg3-ftripped--anim { animation: swg3-flagTripped 3.4s ease-in-out infinite; transform-origin: center; }
        .swg3-frame--anim    { animation: swg3-frame 3.4s ease-in-out infinite; }

        /* hinge of the moving contact */
        .swg3-contact { transform-origin: 158px 150px; }

        /* center-tap pause: freeze everything */
        .swg3-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="swg3-stage" data-paused={paused ? '' : undefined}>
        {/* ===================== INJECTION LINE + DOTS ===================== */}
        {/* test set on the left feeds current toward the relay */}
        <rect
          x="14" y="96" width="40" height="48" rx="6"
          fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5"
        />
        <text
          x="34" y="124" textAnchor="middle"
          fontFamily="var(--font-mono, monospace)" fontSize="8"
          fontWeight="800" fill="var(--ink2)" letterSpacing="0.5"
        >
          TEST
        </text>
        <text
          x="34" y="134" textAnchor="middle"
          fontFamily="var(--font-mono, monospace)" fontSize="8"
          fontWeight="800" fill="var(--ink2)" letterSpacing="0.5"
        >
          SET
        </text>

        {/* base conductor */}
        <path
          d="M54 120 H96"
          fill="none" stroke="var(--slate)" strokeWidth="3" strokeLinecap="round"
        />
        {/* injected current — a chasing dash that streams toward the relay */}
        <path
          className={anim('swg3-inject')}
          d="M54 120 H96"
          fill="none" stroke="var(--accent)" strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 16"
        />

        {/* ========================== RELAY ============================== */}
        <g>
          <rect
            x="96" y="98" width="44" height="44" rx="7"
            fill="var(--bg-2, var(--bg))" stroke="var(--accent)" strokeWidth="2.5"
          />
          {/* relay glow halo behind the core */}
          <circle
            className={anim('swg3-rglow')}
            cx="118" cy="116" r="13"
            fill="var(--warn)" opacity="0"
            style={{ filter: 'drop-shadow(0 0 6px var(--warn))' }}
          />
          {/* pick-up core (changes colour when current arrives) */}
          <circle
            className={anim('swg3-core')}
            cx="118" cy="116" r="6" fill="var(--slate)"
          />
          <text
            x="118" y="136" textAnchor="middle"
            fontFamily="var(--font-mono, monospace)" fontSize="8"
            fontWeight="800" fill="var(--ink2)" letterSpacing="0.5"
          >
            RELAY
          </text>
        </g>

        {/* trip command wire from relay down to breaker mechanism */}
        <path
          d="M118 142 V150 H150"
          fill="none" stroke="var(--slate)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="3 4"
        />

        {/* ===================== BREAKER ENCLOSURE ====================== */}
        <g className={anim('swg3-frame')}>
          <rect
            x="146" y="82" width="120" height="120" rx="12"
            fill="var(--panel)" stroke="var(--accent)" strokeWidth="3"
          />
          <rect x="146" y="82" width="120" height="20" rx="12" fill="var(--accent)" />
          <rect x="146" y="92" width="120" height="10" fill="var(--accent)" />
          <text
            x="206" y="97" textAnchor="middle"
            fontFamily="var(--font-mono, monospace)" fontSize="10"
            fontWeight="700" fill="var(--on-accent, #fff)" letterSpacing="1.5"
          >
            BREAKER
          </text>
        </g>

        {/* ===================== CONTACT MECHANISM ====================== */}
        {/* incoming busbar to the fixed (upper) contact */}
        <path
          d="M206 116 V134"
          fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round"
        />
        {/* fixed contact pad */}
        <circle cx="206" cy="138" r="5" fill="var(--ink2)" />

        {/* hinge / pivot of the moving contact */}
        <circle cx="158" cy="150" r="4.5" fill="var(--ink2)" />
        {/* outgoing busbar from the hinge */}
        <path
          d="M158 150 V184"
          fill="none" stroke="var(--ink2)" strokeWidth="3" strokeLinecap="round"
        />

        {/* MOVING CONTACT ARM — pivots about the hinge, snaps open on trip */}
        <g className={reduced ? 'swg3-contact' : 'swg3-contact swg3-contact--anim'}
           style={reduced ? { transform: 'rotate(-40deg)' } : undefined}>
          <path
            d="M158 150 L206 138"
            fill="none" stroke="var(--accent2)" strokeWidth="5.5" strokeLinecap="round"
          />
          {/* contact tip pad */}
          <circle cx="206" cy="138" r="4.5" fill="var(--accent)" />
        </g>

        {/* ARC FLASH at the parting contacts */}
        <g className={anim('swg3-arc')}>
          <path
            d="M206 138 l-4 -5 l5 1 l-3 -6 l7 6 l-3 1 l5 5"
            fill="none" stroke="var(--warn)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx="206" cy="138" r="3" fill="var(--warn)" />
        </g>

        {/* ===================== TRIP TIMER GAUGE ====================== */}
        <g>
          <circle cx="240" cy="156" r="18" fill="var(--bg-2, var(--bg))" stroke="var(--slate)" strokeWidth="2" />
          {/* dial ticks */}
          <path d="M240 142 V146 M254 156 H250 M226 156 H230"
                stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" />
          {/* sweeping needle (pivot at gauge centre) */}
          <g
            className={anim('swg3-needle')}
            style={reduced
              ? { transformOrigin: '240px 156px', transform: 'rotate(-10deg)' }
              : { transformOrigin: '240px 156px' }}
          >
            <path d="M240 156 L240 143"
                  stroke="var(--warn)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <circle cx="240" cy="156" r="2.5" fill="var(--ink2)" />
          <text
            x="240" y="184" textAnchor="middle"
            fontFamily="var(--font-mono, monospace)" fontSize="8"
            fontWeight="800" fill="var(--ink2)" letterSpacing="0.5"
          >
            t-TRIP
          </text>
        </g>

        {/* ===================== STATUS FLAG ====================== */}
        {/* two stacked plates cross-fade with a flip: CLOSED -> TRIPPED */}
        <g style={{ transformOrigin: '83px 178px' }}>
          {/* CLOSED (green) */}
          <g className={reduced ? 'swg3-fclosed' : 'swg3-fclosed swg3-fclosed--anim'}
             style={reduced ? { opacity: 0 } : undefined}>
            <rect x="44" y="166" width="78" height="24" rx="6" fill="var(--ok)" />
            <text
              x="83" y="182" textAnchor="middle"
              fontFamily="var(--font-mono, monospace)" fontSize="11"
              fontWeight="800" fill="var(--on-accent, #fff)" letterSpacing="1"
            >
              CLOSED
            </text>
          </g>
          {/* TRIPPED (red) */}
          <g className={reduced ? 'swg3-ftripped' : 'swg3-ftripped swg3-ftripped--anim'}
             style={reduced ? { opacity: 1 } : undefined}>
            <rect
              x="44" y="166" width="78" height="24" rx="6" fill="var(--warn)"
              style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }}
            />
            <text
              x="83" y="182" textAnchor="middle"
              fontFamily="var(--font-mono, monospace)" fontSize="11"
              fontWeight="800" fill="var(--on-accent, #fff)" letterSpacing="1"
            >
              TRIPPED
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}
