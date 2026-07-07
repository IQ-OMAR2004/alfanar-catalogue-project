// Case 1 — Step 4: "Dismantle: remove the DS/ES"
// The grey DS/ES control box (red STATUS-INDICATOR label, round dial with red ES
// + blue DS arrows, brass chain sprockets + dark chain, grey control-wire ribbon
// at the top, beige A/D/E Harting blocks) is removed from the tank. First an
// arrow disconnects the wiring ribbon, then the whole mechanism lifts UP and
// away. Warning triangle. Loop ~5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Removing the DS/ES mechanism: the control wiring ribbon is disconnected, then the grey DS/ES box with its dial and chain sprockets lifts up out of the tank"
    >
      <style>{`
        .c1s4-stage[data-paused] * { animation-play-state: paused !important; }

        /* control-wire ribbon connector is pulled off first */
        .c1s4-ribbon--anim { animation: c1s4-ribbon 5s ease-in-out infinite; }
        @keyframes c1s4-ribbon {
          0%      { transform: translate(0px,0px); }
          20%     { transform: translate(0px,0px); }
          34%,100%{ transform: translate(-30px,-14px); }
        }
        /* disconnect arrow appears then fades before the lift */
        .c1s4-arr--anim { animation: c1s4-arr 5s ease-in-out infinite; }
        @keyframes c1s4-arr {
          0%,8%   { opacity: 0; }
          16%,30% { opacity: 1; }
          40%,100%{ opacity: 0; }
        }
        /* the whole DS/ES box lifts up and away after the ribbon is off */
        .c1s4-lift--anim { animation: c1s4-lift 5s ease-in-out infinite; }
        @keyframes c1s4-lift {
          0%,40%  { transform: translate(0px,0px); }
          72%,100%{ transform: translate(20px,-58px); }
        }
        /* dial ES/DS arrows glow to read the status */
        .c1s4-dial--anim { animation: c1s4-dial 2.5s ease-in-out infinite; }
        @keyframes c1s4-dial { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .c1s4-warn--anim { animation: c1s4-warn 2.25s ease-in-out infinite; }
        @keyframes c1s4-warn { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      {/* warning triangle — mind the chain drive */}
      <g className={anim('c1s4-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      {/* ===== grey tank body (mounting flange the DS/ES sits on) ===== */}
      <g transform="translate(44 128)">
        <rect x="0" y="0" width="150" height="84" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <rect x="0" y="0" width="16" height="84" rx="5" fill="#C2C6BF" opacity="0.5" />
        {/* mounting flange opening on top with bolt holes */}
        <rect x="30" y="-4" width="86" height="12" rx="3" fill="#C2C6BF" stroke="#8A9089" strokeWidth="2" />
        {[38, 54, 70, 86, 102, 110].map((cx) => (
          <circle key={cx} cx={cx} cy="2" r="2" fill="#8A9089" />
        ))}
      </g>

      <g className="c1s4-stage" data-paused={paused ? '' : undefined}>
        {/* ===== the DS/ES mechanism (lifts as one group) ===== */}
        <g className={anim('c1s4-lift')} style={reduced ? { transform: 'translate(0px,0px)' } : undefined}>
          <g transform="translate(72 46)">
            {/* grey control box */}
            <rect x="0" y="18" width="96" height="72" rx="5" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2.5" />
            <rect x="0" y="18" width="12" height="72" rx="5" fill="#CDD1CB" opacity="0.6" />

            {/* red STATUS-INDICATOR label */}
            <rect x="10" y="24" width="76" height="13" rx="2" fill="#C0392B" />
            <text x="48" y="33.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="#FFFFFF">STATUS INDICATOR</text>

            {/* round dial with ES (red) + DS (blue) arrows */}
            <g transform="translate(30 62)">
              <circle cx="0" cy="0" r="16" fill="#F4F5F1" stroke="#8A9089" strokeWidth="2" />
              <g className={anim('c1s4-dial')} style={reduced ? { opacity: 1 } : undefined}>
                {/* ES arrow (red) */}
                <path d="M 0 0 L 0 -12" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 0 -12 l -3 4 M 0 -12 l 3 4" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" />
                {/* DS arrow (blue) */}
                <path d="M 0 0 L 10 6" stroke="#2C6FB4" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 10 6 l -1 -4.6 M 10 6 l -4.6 -1" stroke="#2C6FB4" strokeWidth="2.4" strokeLinecap="round" />
              </g>
              <circle cx="0" cy="0" r="2.4" fill="#2B2F33" />
              <text x="-9" y="-13" fontFamily="var(--font-mono)" fontSize="5" fill="#C0392B">ES</text>
              <text x="12" y="14" fontFamily="var(--font-mono)" fontSize="5" fill="#2C6FB4">DS</text>
            </g>

            {/* brass chain sprockets linked by a dark chain */}
            <g transform="translate(70 58)">
              <circle cx="0" cy="0" r="10" fill="#C9A227" stroke="#9C7C15" strokeWidth="1.8" />
              <circle cx="0" cy="20" r="8" fill="#C9A227" stroke="#9C7C15" strokeWidth="1.8" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <circle key={'a' + a} cx={9 * Math.cos((a * Math.PI) / 180)} cy={9 * Math.sin((a * Math.PI) / 180)} r="1.3" fill="#9C7C15" />
              ))}
              <circle cx="0" cy="0" r="3" fill="#8A6B10" />
              <circle cx="0" cy="20" r="2.4" fill="#8A6B10" />
              {/* dark chain loop */}
              <path d="M -10 0 L -8 20 M 10 0 L 8 20" fill="none" stroke="#5A6068" strokeWidth="2.4" strokeDasharray="2 2" strokeLinecap="round" />
            </g>

            {/* beige A / D / E Harting connector blocks along the bottom */}
            {[
              { x: 10, l: 'A' },
              { x: 34, l: 'D' },
              { x: 58, l: 'E' },
            ].map(({ x, l }) => (
              <g key={l} transform={`translate(${x} 78)`}>
                <rect x="0" y="0" width="18" height="10" rx="1.5" fill="#D8CBA6" stroke="#A99A64" strokeWidth="1.4" />
                <text x="9" y="8" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#5C5230">{l}</text>
              </g>
            ))}

            {/* ===== grey control-wire ribbon at the top (disconnects first) ===== */}
            <g className={anim('c1s4-ribbon')} style={reduced ? { transform: 'translate(-30px,-14px)' } : undefined}>
              <path d="M 82 24 q 20 -8 30 -2 q -2 8 -8 10 q -14 2 -22 -8 z" fill="#9FB6CC" stroke="#6E8296" strokeWidth="1.6" strokeLinejoin="round" />
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={88 + i * 6} y1={20 - i} x2={90 + i * 6} y2={14 - i} stroke="#6E8296" strokeWidth="1.2" />
              ))}
              {/* ribbon connector plug */}
              <rect x="80" y="18" width="10" height="8" rx="1.5" fill="#7C8B99" stroke="#556270" strokeWidth="1.4" />
            </g>
          </g>
        </g>

        {/* disconnect arrow pointing at the ribbon (before the lift) */}
        <g className={anim('c1s4-arr')} style={reduced ? { opacity: 0 } : undefined} transform="translate(176 60)">
          <path d="M 20 0 L 2 0" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 2 0 l 7 -4 v 8 z" fill="var(--accent)" />
        </g>
      </g>
    </svg>
  )
}
