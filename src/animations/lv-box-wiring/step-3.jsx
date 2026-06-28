// Step 3 — Wire the LV Box · "Land the conductors"
// Three colour-coded cores (brown L, blue N, green/yellow E) slide in one after
// another from the right and seat fully into three labelled terminal blocks on
// the left; a check ticks beside each as it lands, then the cycle resets.
// Pure SVG + CSS. All keyframes/classes prefixed "lvw3" to avoid collisions.
export default function StepAnimation({ paused = false, reduced = false }) {
  // Apply motion classes only when not in reduced mode. The static pose already
  // shows all three cores seated with checks lit, so it reads as "landed".
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three colour-coded cores land into L, N and E terminals"
    >
      <style>{`
        /* Local material hues (bare-copper conductor tip) — NOT brand colours,
           so they live as scoped vars here rather than as design tokens. */
        .lvw3-stage {
          --lvw3-copper: #C9842F; --lvw3-copper-hi: #E8B968;
          --lvw3-earth-yellow: #E4C200;   /* IEC green/yellow earth stripe */
          --lvw3-brown: #7A4A21;          /* IEC brown line conductor (L) */
        }
        .lvw3-stage * { transform-box: fill-box; }

        /* ---- core slide-in: travel from right, seat into terminal, hold ---- */
        /* The core's seated x is 0 (its authored position). It starts pushed
           right (off / outside the block) and slides home, then holds, then on
           the very last frame snaps back to start while fully hidden so the loop
           is seamless. Per-row delays stagger L → N → E. */
        @keyframes lvw3-seat {
          0%   { transform: translateX(78px); opacity: 0; }
          6%   { opacity: 1; }
          26%  { transform: translateX(0); opacity: 1; }
          92%  { transform: translateX(0); opacity: 1; }
          99%  { transform: translateX(0); opacity: 0; }
          100% { transform: translateX(78px); opacity: 0; }
        }

        /* ---- copper tip glints as it drives fully home ---- */
        @keyframes lvw3-glint {
          0%, 22%   { opacity: 0; }
          27%       { opacity: 1; }
          40%, 100% { opacity: 0; }
        }

        /* ---- terminal screw clamps down once the core is seated, then
               lifts back up while the core is hidden so 0% === 100% (seamless) ---- */
        @keyframes lvw3-clamp {
          0%, 26%  { transform: translateY(-2px); }
          32%      { transform: translateY(1.5px); }
          40%, 92% { transform: translateY(0); }
          99%, 100%{ transform: translateY(-2px); }
        }

        /* ---- check ticks on after the core lands, holds, fades at reset ---- */
        @keyframes lvw3-tick {
          0%, 30%  { transform: scale(0); opacity: 0; }
          38%      { transform: scale(1.25); opacity: 1; }
          44%      { transform: scale(1); opacity: 1; }
          92%      { transform: scale(1); opacity: 1; }
          99%,100% { transform: scale(1); opacity: 0; }
        }

        /* ---- soft beacon pulse on the LV box frame ---- */
        @keyframes lvw3-frame {
          0%, 100% { filter: drop-shadow(0 0 3px var(--beacon-glow)); }
          50%      { filter: drop-shadow(0 0 8px var(--beacon-glow)); }
        }

        .lvw3-core--anim  { animation: lvw3-seat 3.4s var(--ease-out, ease) infinite; }
        .lvw3-glint--anim { animation: lvw3-glint 3.4s linear infinite; }
        .lvw3-screw--anim { animation: lvw3-clamp 3.4s var(--ease-out, ease) infinite; }
        .lvw3-tick--anim  { animation: lvw3-tick 3.4s var(--ease-out, ease) infinite; transform-origin: center; }
        .lvw3-frame--anim { animation: lvw3-frame 3.4s ease-in-out infinite; }

        /* stagger L → N → E (rows top to bottom) */
        .lvw3-row--l * { animation-delay: 0s; }
        .lvw3-row--n * { animation-delay: 0.55s; }
        .lvw3-row--e * { animation-delay: 1.1s; }

        /* center-tap pause: freeze everything */
        .lvw3-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="lvw3-stage" data-paused={paused ? '' : undefined}>
        {/* ============================ LV BOX ============================ */}
        <g className={anim('lvw3-frame')}>
          <rect
            x="24" y="40" width="118" height="160" rx="10"
            fill="var(--panel)" stroke="var(--accent)" strokeWidth="3"
          />
          {/* box header strip */}
          <rect x="24" y="40" width="118" height="22" rx="10" fill="var(--accent)" />
          <rect x="24" y="52" width="118" height="10" fill="var(--accent)" />
          <text
            x="83" y="56" textAnchor="middle"
            fontFamily="var(--font-mono, monospace)" fontSize="11"
            fontWeight="700" fill="var(--on-accent, #fff)" letterSpacing="1.5"
          >
            LV BOX
          </text>
        </g>

        {/* terminal rail labels (static, always readable) */}
        {[
          { y: 92,  label: 'L' },
          { y: 130, label: 'N' },
          { y: 168, label: 'E' },
        ].map((t) => (
          <text
            key={t.label}
            x="40" y={t.y + 4} textAnchor="middle"
            fontFamily="var(--font-mono, monospace)" fontSize="13"
            fontWeight="800" fill="var(--ink2)"
          >
            {t.label}
          </text>
        ))}

        {/* ===================== THREE TERMINAL ROWS ===================== */}
        {[
          { row: 'l', y: 92,  color: 'var(--lvw3-brown)', tag: 'L' },
          { row: 'n', y: 130, color: 'var(--accent)',     tag: 'N' },
          { row: 'e', y: 168, color: 'var(--ok)',         tag: 'E' },
        ].map((r) => (
          <g key={r.row} className={`lvw3-row--${r.row}`}>
            {/* ---- terminal block (the receptacle on the box) ---- */}
            <rect
              x="52" y={r.y - 13} width="34" height="26" rx="4"
              fill="var(--bg)" stroke="var(--slate)" strokeWidth="2"
            />
            {/* copper-jaw hint inside the block */}
            <rect x="58" y={r.y - 6} width="22" height="12" rx="2" fill="var(--slate)" opacity="0.28" />

            {/* clamp screw on top — drives down when seated */}
            <g className={anim('lvw3-screw')}>
              <circle cx="69" cy={r.y - 13} r="5" fill="var(--ink2)" />
              <line
                x1="65.5" y1={r.y - 13} x2="72.5" y2={r.y - 13}
                stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round"
              />
            </g>

            {/* ---- the colour-coded core (insulation + copper tip) ---- */}
            <g className={anim('lvw3-core')}>
              {/* outer insulation jacket */}
              <rect
                x="80" y={r.y - 7} width="170" height="14" rx="7"
                fill={r.color}
              />
              {/* green/yellow earth gets a yellow stripe over the green jacket */}
              {r.row === 'e' && (
                <rect x="80" y={r.y - 7} width="170" height="6" rx="3" fill="var(--lvw3-earth-yellow)" />
              )}
              {/* bared copper tip that drives into the jaw */}
              <rect x="62" y={r.y - 4} width="22" height="8" rx="2" fill="var(--lvw3-copper)" />
              <rect x="62" y={r.y - 4} width="22" height="3" rx="1.5" fill="var(--lvw3-copper-hi)" />
              {/* seating glint */}
              <rect
                className={anim('lvw3-glint')}
                x="60" y={r.y - 7} width="6" height="14" rx="3"
                fill="var(--sky)"
              />
            </g>

            {/* ---- check tick that lights as the core lands ---- */}
            <g className={anim('lvw3-tick')}>
              <circle cx="108" cy={r.y - 24} r="9" fill="var(--ok)" />
              <path
                d="M103.6 -24.2 l3 3 l5.4 -5.6"
                transform={`translate(0 ${r.y})`}
                fill="none" stroke="var(--on-accent, #fff)"
                strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
              />
            </g>
          </g>
        ))}

        {/* connector key (legend) at the cable entry, static */}
        <g fontFamily="var(--font-mono, monospace)" fontSize="9" fontWeight="700">
          <text x="300" y="206" textAnchor="end" fill="var(--slate)" letterSpacing="0.5">
            L · N · E
          </text>
        </g>
      </g>
    </svg>
  )
}
