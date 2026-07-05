// GIS Tank Modification — Step 24: "Fix the door handle & door stopper"
// Zoomed LV-box door: the handle rotates and the latch tongue engages, the
// stopper block is fitted at the frame, then the door swings open/closed
// 3 quick times (smooth, positive latching) with a "×3" badge. ~4.5s loop.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="LV box door: handle fitted and latching, door stopper fitted, door opened and closed three times"
    >
      <style>{`
        .g24-stage[data-paused] * { animation-play-state: paused !important; }

        /* handle lever rotates to latch (early in the cycle) */
        .g24-handle--anim { animation: g24-handle 4.5s ease-in-out infinite; transform-origin: 0px 0px; }
        @keyframes g24-handle {
          0%       { transform: rotate(-55deg); }
          10%,16%  { transform: rotate(0deg); }
          92%,100% { transform: rotate(-55deg); }
        }
        /* latch tongue slides into the keeper as the handle turns */
        .g24-latch--anim { animation: g24-latch 4.5s ease-in-out infinite; }
        @keyframes g24-latch {
          0%       { transform: translateX(-8px); }
          10%,16%  { transform: translateX(0); }
          92%,100% { transform: translateX(-8px); }
        }
        /* stopper block drops into place at the frame */
        .g24-stop--anim { animation: g24-stop 4.5s ease-in-out infinite; }
        @keyframes g24-stop {
          0%       { transform: translateY(-14px); opacity: 0; }
          18%      { transform: translateY(-14px); opacity: 0; }
          26%,100% { transform: translateY(0); opacity: 1; }
        }
        /* door swings open/closed 3 quick times (scaleX around the hinge) */
        .g24-door--anim { animation: g24-door 4.5s ease-in-out infinite; transform-origin: 96px 0px; }
        @keyframes g24-door {
          0%,30%   { transform: scaleX(1); }
          36%      { transform: scaleX(0.22); }
          42%      { transform: scaleX(1); }
          50%      { transform: scaleX(0.22); }
          56%      { transform: scaleX(1); }
          64%      { transform: scaleX(0.22); }
          70%,100% { transform: scaleX(1); }
        }
        /* ×3 badge shows while the door is cycling */
        .g24-badge--anim { animation: g24-badge 4.5s ease-in-out infinite; }
        @keyframes g24-badge {
          0%,26%   { opacity: 0; transform: scale(0.6); }
          32%,72%  { opacity: 1; transform: scale(1); }
          80%,100% { opacity: 0; transform: scale(0.6); }
        }
        /* green tick after the third close */
        .g24-check--anim { animation: g24-check 4.5s ease-in-out infinite; }
        @keyframes g24-check {
          0%,72%   { opacity: 0; transform: scale(0.5); }
          78%      { opacity: 1; transform: scale(1.1); }
          84%,90%  { opacity: 1; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" rx="10" />
      {/* floor band */}
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== panel body around the LV-box door (RAL 7035, zoomed) ===== */}
      <rect x="70" y="28" width="180" height="186" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* frame opening for the door */}
      <rect x="96" y="52" width="112" height="132" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      {/* perimeter stud row on the fixed body */}
      <g fill="#9BA19A">
        {[62, 96, 130, 164, 198].map((y) => (
          <circle key={'l' + y} cx="80" cy={y} r="2" />
        ))}
        {[62, 96, 130, 164, 198].map((y) => (
          <circle key={'r' + y} cx="240" cy={y} r="2" />
        ))}
      </g>
      {/* two red pilot lights on the body above the door */}
      <circle cx="120" cy="40" r="4" fill="#C0392B" stroke="#7C837B" strokeWidth="1.2" />
      <circle cx="136" cy="40" r="4" fill="#C0392B" stroke="#7C837B" strokeWidth="1.2" />

      {/* latch keeper on the frame (right side, static) */}
      <rect x="206" y="110" width="8" height="20" fill="#6E767E" stroke="#7C837B" strokeWidth="1.5" />

      <g className="g24-stage" data-paused={paused ? '' : undefined}>
        {/* ===== the door (hinge on the left at x=96) ===== */}
        <g transform="translate(0 0)">
          <g
            className={anim('g24-door')}
            style={reduced ? undefined : { transformBox: 'view-box' }}
          >
            <g transform="translate(96 52)">
              <rect x="2" y="2" width="106" height="128" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
              {/* door stiffening lines */}
              <line x1="14" y1="18" x2="96" y2="18" stroke="#C2C6BF" strokeWidth="2" />
              <line x1="14" y1="114" x2="96" y2="114" stroke="#C2C6BF" strokeWidth="2" />
              {/* hinges */}
              <rect x="0" y="16" width="6" height="14" fill="#6E767E" />
              <rect x="0" y="102" width="6" height="14" fill="#6E767E" />
              {/* latch tongue sliding into the keeper */}
              <g className={anim('g24-latch')} style={reduced ? undefined : undefined}>
                <rect x="104" y="62" width="14" height="8" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
              </g>
              {/* handle base + rotating lever */}
              <circle cx="92" cy="66" r="7" fill="#1E2226" />
              <g transform="translate(92 66)">
                <g
                  className={anim('g24-handle')}
                  style={reduced ? { transform: 'rotate(0deg)', transformOrigin: '0 0' } : undefined}
                >
                  <rect x="-3" y="-2.5" width="26" height="5" rx="2.5" fill="#1E2226" stroke="#000" strokeWidth="0.8" />
                </g>
                <circle cx="0" cy="0" r="2.2" fill="#6E767E" />
              </g>
            </g>
          </g>
        </g>

        {/* ===== door stopper block fitted at the bottom frame ===== */}
        <g className={anim('g24-stop')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="214" y="188" width="18" height="12" rx="2" fill="#6E767E" stroke="#2B2F33" strokeWidth="1.5" />
          <rect x="219" y="182" width="8" height="6" fill="#AEB4B9" />
        </g>
        {/* accent arrow to the stopper */}
        <g stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9">
          <path d="M 254 176 l -14 12" />
          <path d="M 240 188 l 7 -1 M 240 188 l 1 -7" />
        </g>

        {/* ===== "×3" badge ===== */}
        <g className={anim('g24-badge')} style={reduced ? { opacity: 1 } : { transformOrigin: '284px 60px' }}>
          <rect x="264" y="46" width="40" height="26" rx="6" fill="var(--accent)" />
          <text x="284" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--on-accent)">×3</text>
        </g>

        {/* ===== final green tick ===== */}
        <g className={anim('g24-check')} style={reduced ? { opacity: 0 } : { transformOrigin: '284px 108px' }}>
          <circle cx="284" cy="108" r="11" fill="#2E9E5B" />
          <path d="M 279 108 l 3.5 4 l 7 -8" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
