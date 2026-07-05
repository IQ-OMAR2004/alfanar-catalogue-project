// GIS Tank Modification — Step 27: "Complete the LV box wiring & remaining connections"
// LV box interior on the bench: red/yellow/blue/grey wires route through the
// loom (dash-draw) and a cable tie snaps on; the wired box slides into the
// panel; a multimeter continuity beep pulses with a green check and a
// "P-to-P ✓" badge. ~6s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  const wires = [
    { c: '#C0392B', d: 'M 48 74 h 26 q 8 0 8 8 v 22 h 34' },
    { c: '#E7B416', d: 'M 48 86 h 20 q 8 0 8 8 v 16 h 40' },
    { c: '#0A82C6', d: 'M 48 98 h 14 q 8 0 8 8 v 10 h 46' },
    { c: '#8A9089', d: 'M 48 110 h 60 q 8 0 8 -2' },
  ]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="LV box wiring loom routed and tied, box installed in the panel, multimeter continuity check passes"
    >
      <style>{`
        .g27-stage[data-paused] * { animation-play-state: paused !important; }

        /* wires draw themselves through the loom */
        .g27-wire--anim { stroke-dasharray: 130; animation: g27-wire 6s ease-in-out infinite; }
        @keyframes g27-wire {
          0%       { stroke-dashoffset: 130; }
          22%,100% { stroke-dashoffset: 0; }
        }
        /* cable tie snaps closed on the loom */
        .g27-tie--anim { animation: g27-tie 6s ease-in-out infinite; }
        @keyframes g27-tie {
          0%,24%   { opacity: 0; transform: scale(1.6); }
          30%,100% { opacity: 1; transform: scale(1); }
        }
        /* the wired LV box slides into the panel */
        .g27-box--anim { animation: g27-box 6s ease-in-out infinite; }
        @keyframes g27-box {
          0%,34%   { transform: translate(0,0); }
          52%,100% { transform: translate(150px,-18px) scale(0.62); }
        }
        /* multimeter beep pulse + probes */
        .g27-beep--anim { animation: g27-beep 6s ease-in-out infinite; }
        @keyframes g27-beep {
          0%,58%          { opacity: 0; transform: scale(0.6); }
          62%             { opacity: 1; transform: scale(1.15); }
          66%             { opacity: 0.4; transform: scale(0.9); }
          70%             { opacity: 1; transform: scale(1.15); }
          74%,86%         { opacity: 0.9; transform: scale(1); }
          92%,100%        { opacity: 0; transform: scale(0.6); }
        }
        /* green check + badge at the end */
        .g27-ok--anim { animation: g27-ok 6s ease-in-out infinite; }
        @keyframes g27-ok {
          0%,72%   { opacity: 0; transform: scale(0.5); }
          78%,92%  { opacity: 1; transform: scale(1); }
          98%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== panel (right side) receiving the LV box ===== */}
      <rect x="216" y="30" width="86" height="184" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* LV box bay opening near the top */}
      <rect x="224" y="42" width="70" height="52" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      {/* mid tank cover + studs */}
      <rect x="228" y="104" width="62" height="56" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        {[110, 126, 142, 156].map((y) => (
          <circle key={'a' + y} cx="232" cy={y} r="2" />
        ))}
        {[110, 126, 142, 156].map((y) => (
          <circle key={'b' + y} cx="286" cy={y} r="2" />
        ))}
      </g>
      {/* CT terminal plates hint at bottom */}
      <circle cx="244" cy="186" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
      <circle cx="274" cy="186" r="12" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />

      <g className="g27-stage" data-paused={paused ? '' : undefined}>
        {/* ===== LV box interior on the bench (left), then slides into the bay ===== */}
        <g
          className={anim('g27-box')}
          style={reduced ? undefined : { transformOrigin: '90px 92px' }}
        >
          {/* open box */}
          <rect x="40" y="60" width="100" height="64" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
          <rect x="44" y="64" width="92" height="56" fill="#E1E4DE" stroke="#8A9089" strokeWidth="1.5" />
          {/* terminal strip on the left edge */}
          <g fill="#6E767E">
            {[72, 84, 96, 108].map((y) => (
              <rect key={y} x="44" y={y - 2.5} width="6" height="5" />
            ))}
          </g>
          {/* the four loom wires */}
          {wires.map((w, i) => (
            <path
              key={i}
              className={anim('g27-wire')}
              style={reduced ? undefined : { animationDelay: `${i * 0.25}s` }}
              d={w.d}
              fill="none"
              stroke={w.c}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
          {/* cable tie on the bundle */}
          <g className={anim('g27-tie')} style={reduced ? { opacity: 1 } : { transformOrigin: '86px 92px' }}>
            <rect x="82" y="80" width="7" height="26" rx="3" fill="none" stroke="#2B2F33" strokeWidth="2.5" />
          </g>
          {/* black knobs + red pilot lights on the box lip */}
          <circle cx="128" cy="70" r="3" fill="#1E2226" />
          <circle cx="118" cy="70" r="2.5" fill="#C0392B" />
        </g>

        {/* accent arrow: bench → panel bay */}
        <g stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M 150 52 q 34 -18 66 -2" strokeDasharray="5 5" />
          <path d="M 216 50 l -8 -4 M 216 50 l -7 5" />
        </g>

        {/* ===== multimeter continuity check (bottom-left) ===== */}
        <g>
          <rect x="42" y="150" width="44" height="56" rx="5" fill="#E7B416" stroke="#2B2F33" strokeWidth="2" />
          <rect x="48" y="156" width="32" height="16" rx="2" fill="#1E2226" />
          <text x="64" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#7CE28A">0.2Ω</text>
          <circle cx="64" cy="186" r="8" fill="#2B2F33" />
          <line x1="64" y1="186" x2="69" y2="180" stroke="#AEB4B9" strokeWidth="2" strokeLinecap="round" />
          {/* probes to the panel */}
          <path d="M 86 160 q 40 -8 130 -40" fill="none" stroke="#C0392B" strokeWidth="2" />
          <path d="M 86 196 q 60 8 152 -6" fill="none" stroke="#2B2F33" strokeWidth="2" />
        </g>
        {/* beep arcs above the meter */}
        <g className={anim('g27-beep')} style={reduced ? { opacity: 0 } : { transformOrigin: '64px 142px' }}>
          <path d="M 56 142 a 10 10 0 0 1 16 0" fill="none" stroke="#2E9E5B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 51 136 a 17 17 0 0 1 26 0" fill="none" stroke="#2E9E5B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* ===== green check + "P-to-P ✓" badge ===== */}
        <g className={anim('g27-ok')} style={reduced ? { opacity: 1 } : { transformOrigin: '160px 218px' }}>
          <rect x="108" y="176" width="92" height="24" rx="6" fill="var(--accent)" />
          <text x="154" y="193" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">P-to-P ✓</text>
        </g>
      </g>
    </svg>
  )
}
