// Case 1 — Step 1: "Receive the Solution 1 GIS tank"
// A grey RAL-7035 S1 GIS tank sits on a red handling trolley and rolls in from
// the right to a clean spot on the floor (yellow floor line). A job-card tag
// hangs off it. Keep-distance warning triangle. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Grey Solution 1 GIS tank on a red handling trolley rolling into the modification area to a yellow floor line"
    >
      <style>{`
        .c1s1-stage[data-paused] * { animation-play-state: paused !important; }

        /* the whole trolley + tank rolls in from the right and settles */
        .c1s1-roll--anim { animation: c1s1-roll 4.5s ease-in-out infinite; }
        @keyframes c1s1-roll {
          0%       { transform: translateX(120px); }
          55%,100% { transform: translateX(0px); }
        }
        /* wheels spin while rolling */
        .c1s1-wheel--anim { animation: c1s1-wheel 4.5s ease-in-out infinite; transform-origin: center; }
        @keyframes c1s1-wheel {
          0%      { transform: rotate(0deg); }
          55%     { transform: rotate(-300deg); }
          100%    { transform: rotate(-300deg); }
        }
        /* job-card tag sways a little then rests */
        .c1s1-tag--anim { animation: c1s1-tag 4.5s ease-in-out infinite; transform-origin: 0 0; }
        @keyframes c1s1-tag {
          0%,55% { transform: rotate(9deg); }
          72%    { transform: rotate(-4deg); }
          85%    { transform: rotate(2deg); }
          100%   { transform: rotate(0deg); }
        }
        .c1s1-warn--anim { animation: c1s1-warn 2.25s ease-in-out infinite; }
        @keyframes c1s1-warn { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      {/* floor band */}
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
      {/* clean-spot yellow floor line (destination) */}
      <rect x="34" y="210" width="96" height="4" rx="2" fill="#F2B826" />
      <rect x="34" y="210" width="96" height="4" rx="2" fill="none" stroke="#B98C1A" strokeWidth="0.6" />

      {/* keep-distance warning triangle */}
      <g className={anim('c1s1-warn')} transform="translate(292 24)">
        <path d="M 0 -13 L 13 10 L -13 10 Z" fill="var(--warn)" stroke="#7C837B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="-1.6" y="-5" width="3.2" height="8" rx="1.6" fill="#1E2226" />
        <circle cx="0" cy="6.4" r="1.9" fill="#1E2226" />
      </g>

      <g className="c1s1-stage" data-paused={paused ? '' : undefined}>
        <g className={anim('c1s1-roll')} style={reduced ? { transform: 'translateX(0px)' } : undefined}>
          {/* ===== red handling trolley ===== */}
          <g transform="translate(40 176)">
            {/* deck */}
            <rect x="0" y="8" width="120" height="14" rx="3" fill="#C0392B" stroke="#8C2A20" strokeWidth="2.5" />
            <rect x="0" y="8" width="120" height="5" rx="2.5" fill="#D8452B" />
            {/* push handle at rear (right) */}
            <path d="M 118 12 q 22 -2 24 -34" fill="none" stroke="#8C2A20" strokeWidth="5" strokeLinecap="round" />
            <path d="M 136 -20 h 12" stroke="#8C2A20" strokeWidth="5" strokeLinecap="round" />
            {/* wheels */}
            <g transform="translate(22 30)">
              <g className={anim('c1s1-wheel')}>
                <circle cx="0" cy="0" r="11" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
                <circle cx="0" cy="0" r="3.4" fill="#AEB4B9" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#5A6068" strokeWidth="1.4" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#5A6068" strokeWidth="1.4" />
              </g>
            </g>
            <g transform="translate(98 30)">
              <g className={anim('c1s1-wheel')}>
                <circle cx="0" cy="0" r="11" fill="#2B2F33" stroke="#1E2226" strokeWidth="2" />
                <circle cx="0" cy="0" r="3.4" fill="#AEB4B9" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#5A6068" strokeWidth="1.4" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#5A6068" strokeWidth="1.4" />
              </g>
            </g>
          </g>

          {/* ===== grey S1 GIS tank on the deck ===== */}
          <g transform="translate(52 76)">
            <rect x="0" y="0" width="96" height="108" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
            <rect x="0" y="0" width="96" height="108" rx="5" fill="#C2C6BF" opacity="0.0" />
            {/* left vertical shade */}
            <rect x="0" y="0" width="14" height="108" rx="5" fill="#C2C6BF" opacity="0.55" />
            {/* bolted top cover with studs */}
            <rect x="8" y="8" width="80" height="14" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
            {[14, 30, 46, 62, 78].map((cx) => (
              <circle key={cx} cx={cx} cy="15" r="2" fill="#9BA19A" />
            ))}
            {/* big bolted side cover */}
            <rect x="16" y="34" width="64" height="56" rx="4" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
            {[24, 42, 60, 72].map((cx) => (
              <circle key={'t' + cx} cx={cx} cy="40" r="1.8" fill="#9BA19A" />
            ))}
            {[24, 42, 60, 72].map((cx) => (
              <circle key={'b' + cx} cx={cx} cy="84" r="1.8" fill="#9BA19A" />
            ))}
            {/* S1 marking plate */}
            <rect x="30" y="52" width="36" height="20" rx="2" fill="#F4F5F1" stroke="#8A9089" strokeWidth="1.4" />
            <text x="48" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3C423C">S1</text>

            {/* ===== job-card tag hanging from the top-right lug ===== */}
            <g transform="translate(84 12)">
              <line x1="0" y1="0" x2="10" y2="8" stroke="#6E767E" strokeWidth="1.4" />
              <g className={anim('c1s1-tag')} style={reduced ? { transform: 'rotate(0deg)' } : undefined} transform="translate(10 8)">
                <rect x="0" y="0" width="26" height="18" rx="2.5" fill="#EFE7C8" stroke="#B8A65C" strokeWidth="1.4" />
                <circle cx="4.5" cy="4.5" r="1.6" fill="none" stroke="#8A7A3A" strokeWidth="1" />
                <line x1="8" y1="6" x2="22" y2="6" stroke="#8A7A3A" strokeWidth="1" />
                <line x1="8" y1="10" x2="22" y2="10" stroke="#8A7A3A" strokeWidth="1" />
                <line x1="8" y1="14" x2="18" y2="14" stroke="#8A7A3A" strokeWidth="1" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
