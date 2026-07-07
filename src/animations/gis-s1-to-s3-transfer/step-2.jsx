// Case 1 — Step 2: "Reserve an empty Solution 3 tank"
// An empty grey S3 tank is reserved: a green reservation tag drops down onto it
// and a checkmark confirms. A faint second tank silhouette behind shows the
// "S1 → S3" transfer sense. Loop ~4.5s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An empty Solution 3 GIS tank being reserved with a tag and confirmation checkmark; a faint S1 tank shows the S1 to S3 transfer"
    >
      <style>{`
        .c1s2-stage[data-paused] * { animation-play-state: paused !important; }

        /* reservation tag drops onto the tank and settles */
        .c1s2-drop--anim { animation: c1s2-drop 4.5s ease-in-out infinite; }
        @keyframes c1s2-drop {
          0%      { transform: translateY(-46px); opacity: 0; }
          22%     { transform: translateY(-46px); opacity: 0; }
          46%     { transform: translateY(3px); opacity: 1; }
          54%     { transform: translateY(0px); opacity: 1; }
          100%    { transform: translateY(0px); opacity: 1; }
        }
        /* checkmark draws on after the tag lands */
        .c1s2-check--anim {
          stroke-dasharray: 22; stroke-dashoffset: 22;
          animation: c1s2-check 4.5s ease-in-out infinite;
        }
        @keyframes c1s2-check {
          0%,55%   { stroke-dashoffset: 22; }
          70%,100% { stroke-dashoffset: 0; }
        }
        /* transfer arrow pulses S1 -> S3 */
        .c1s2-flow--anim { animation: c1s2-flow 4.5s ease-in-out infinite; }
        @keyframes c1s2-flow {
          0%,100% { opacity: 0.35; }
          50%     { opacity: 1; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />

      <g className="c1s2-stage" data-paused={paused ? '' : undefined}>
        {/* ===== faint S1 tank silhouette (source, left) ===== */}
        <g transform="translate(28 92)" opacity="0.32">
          <rect x="0" y="0" width="70" height="100" rx="5" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
          <rect x="8" y="8" width="54" height="12" rx="3" fill="#D7DAD4" stroke="#8A9089" strokeWidth="1.6" />
          <text x="35" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#7C837B">S1</text>
        </g>

        {/* ===== transfer arrow S1 -> S3 ===== */}
        <g className={anim('c1s2-flow')} style={reduced ? { opacity: 1 } : undefined}>
          <text x="160" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink2)">S1 → S3</text>
          <path d="M 104 138 h 44" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 148 138 l -8 -5 v 10 z" fill="var(--accent)" />
        </g>

        {/* ===== empty S3 tank (destination, right) ===== */}
        <g transform="translate(176 76)">
          <rect x="0" y="0" width="112" height="116" rx="5" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
          {/* left vertical shade */}
          <rect x="0" y="0" width="14" height="116" rx="5" fill="#C2C6BF" opacity="0.55" />
          {/* open (empty) top rim showing bolt-hole ring flange */}
          <rect x="10" y="6" width="92" height="16" rx="3" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
          {[18, 34, 50, 66, 82, 96].map((cx) => (
            <circle key={cx} cx={cx} cy="14" r="2" fill="#9BA19A" />
          ))}
          {/* empty interior hint — inner flange ring on the floor of the tank */}
          <ellipse cx="56" cy="98" rx="34" ry="12" fill="#C2C6BF" stroke="#A9AEA6" strokeWidth="1.6" />
          <ellipse cx="56" cy="98" rx="22" ry="7" fill="#B7BBB4" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={56 + 28 * Math.cos((a * Math.PI) / 180)} cy={98 + 9.8 * Math.sin((a * Math.PI) / 180)} r="1.5" fill="#8A9089" />
          ))}
          {/* S3 marking plate */}
          <rect x="38" y="40" width="36" height="20" rx="2" fill="#F4F5F1" stroke="#8A9089" strokeWidth="1.4" />
          <text x="56" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3C423C">S3</text>

          {/* ===== reservation tag dropping onto the tank ===== */}
          <g className={anim('c1s2-drop')} style={reduced ? { transform: 'translateY(0px)', opacity: 1 } : undefined} transform="translate(64 24)">
            <line x1="10" y1="-16" x2="10" y2="0" stroke="#6E767E" strokeWidth="1.4" />
            <rect x="-4" y="0" width="42" height="26" rx="4" fill="#2E9E5B" stroke="#1F6E40" strokeWidth="1.8" />
            <text x="17" y="11" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="#EAF7EE">RESERVED</text>
            {/* confirmation checkmark */}
            <path
              className={anim('c1s2-check')}
              style={reduced ? { strokeDashoffset: 0 } : undefined}
              d="M 6 18 l 6 5 l 12 -12"
              fill="none"
              stroke="#EAF7EE"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
