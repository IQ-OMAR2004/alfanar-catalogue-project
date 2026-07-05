// GIS Tank Modification — Step 17: "Fix the tank-to-tank earthing busbar"
// Loop: a shine sweep polishes the two contact faces to bright metal, the
// copper earthing busbar lowers to bridge the two grey tanks, the two bolts
// torque tight, and an earth (ground) symbol pulses — solid earth path.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Contact faces polished bright, copper earthing busbar bridging two tanks, bolts torqued, earth symbol pulsing"
    >
      <style>{`
        .g17-stage[data-paused] * { animation-play-state: paused !important; }

        /* shine sweep across each contact face (polish to bare metal) */
        .g17-shine--anim { animation: g17-shine 4.5s ease-in-out infinite; }
        @keyframes g17-shine {
          0%       { transform: translateX(-14px); opacity: 0; }
          6%       { opacity: 0.95; }
          22%      { transform: translateX(26px); opacity: 0.95; }
          28%,100% { transform: translateX(30px); opacity: 0; }
        }
        /* contact faces brighten after polishing */
        .g17-face--anim { animation: g17-face 4.5s ease-in-out infinite; }
        @keyframes g17-face {
          0%       { fill: #A9AEA6; }
          26%,100% { fill: #EDEFEA; }
        }

        /* busbar lowers onto the polished faces */
        .g17-bar--anim { animation: g17-bar 4.5s ease-in-out infinite; }
        @keyframes g17-bar {
          0%,26%   { transform: translateY(-40px); }
          48%,100% { transform: translateY(0); }
        }

        /* bolts spin tight after the bar seats */
        .g17-bolt--anim { animation: g17-bolt 4.5s ease-in-out infinite; }
        @keyframes g17-bolt {
          0%,50%   { transform: rotate(0deg); opacity: 0; }
          56%      { opacity: 1; }
          80%,100% { transform: rotate(300deg); opacity: 1; }
        }

        /* torque flash on the bolts */
        .g17-flash--anim { animation: g17-flash 4.5s ease-in-out infinite; }
        @keyframes g17-flash {
          0%,52%   { opacity: 0; }
          62%      { opacity: 0.9; }
          78%      { opacity: 0.9; }
          86%,100% { opacity: 0; }
        }

        /* earth symbol pulses at the end — earth path made */
        .g17-earth--anim { animation: g17-earth 4.5s ease-in-out infinite; }
        @keyframes g17-earth {
          0%,80%   { opacity: 0.25; transform: scale(0.9); }
          88%      { opacity: 1; transform: scale(1.12); }
          94%      { opacity: 1; transform: scale(1); }
          100%     { opacity: 0.25; transform: scale(0.9); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== two adjacent grey tanks (rear view crop) ===== */}
      {/* left tank */}
      <rect x="16" y="52" width="128" height="162" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="30" y="70" width="98" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="37" cy="77" r="2" /><circle cx="61" cy="77" r="2" /><circle cx="85" cy="77" r="2" /><circle cx="109" cy="77" r="2" /><circle cx="121" cy="77" r="2" />
        <circle cx="37" cy="133" r="2" /><circle cx="61" cy="133" r="2" /><circle cx="85" cy="133" r="2" /><circle cx="109" cy="133" r="2" /><circle cx="121" cy="133" r="2" />
        <circle cx="37" cy="105" r="2" /><circle cx="121" cy="105" r="2" />
      </g>
      {/* right tank */}
      <rect x="176" y="52" width="128" height="162" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <rect x="190" y="70" width="98" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="197" cy="77" r="2" /><circle cx="221" cy="77" r="2" /><circle cx="245" cy="77" r="2" /><circle cx="269" cy="77" r="2" /><circle cx="281" cy="77" r="2" />
        <circle cx="197" cy="133" r="2" /><circle cx="221" cy="133" r="2" /><circle cx="245" cy="133" r="2" /><circle cx="269" cy="133" r="2" /><circle cx="281" cy="133" r="2" />
        <circle cx="197" cy="105" r="2" /><circle cx="281" cy="105" r="2" />
      </g>
      {/* gap between tanks */}
      <rect x="144" y="52" width="32" height="162" fill="var(--bg)" opacity="0.35" />

      <g className="g17-stage" data-paused={paused ? '' : undefined}>
        {/* ===== contact faces (earthing pads) on each tank ===== */}
        <g clipPath="none">
          <rect className={a('g17-face', 'g17-face--anim')} x="112" y="158" width="26" height="18"
            fill={reduced ? '#EDEFEA' : undefined} stroke="#8A9089" strokeWidth="2" />
          <rect className={a('g17-face', 'g17-face--anim')} x="182" y="158" width="26" height="18"
            fill={reduced ? '#EDEFEA' : undefined} stroke="#8A9089" strokeWidth="2" />
        </g>
        {/* shine sweeps polishing the faces */}
        {!reduced && (
          <g>
            <g transform="translate(112 158)">
              <rect className="g17-shine--anim" x="-4" y="0" width="6" height="18" fill="#FFFFFF" opacity="0" transform="skewX(-18)" />
            </g>
            <g transform="translate(182 158)">
              <rect className="g17-shine--anim" x="-4" y="0" width="6" height="18" fill="#FFFFFF" opacity="0" transform="skewX(-18)" />
            </g>
          </g>
        )}

        {/* ===== copper earthing busbar bridging the two pads ===== */}
        <g className={a('g17-bar', 'g17-bar--anim')}>
          <rect x="108" y="162" width="104" height="10" fill="#C08040" stroke="#8a5a26" strokeWidth="2" />
          <rect x="108" y="162" width="104" height="3" fill="#D9975B" />
          {/* bolt holes at each end */}
          <circle cx="125" cy="167" r="3" fill="#8a5a26" />
          <circle cx="195" cy="167" r="3" fill="#8a5a26" />
        </g>

        {/* ===== bolts tightening through the busbar into the pads ===== */}
        <g transform="translate(125 167)">
          <g className={a('g17-bolt', 'g17-bolt--anim')} style={reduced ? { opacity: 1 } : undefined}>
            <path d="M -5.2 0 L -2.6 -4.5 h 5.2 L 5.2 0 L 2.6 4.5 h -5.2 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.6" />
            <line x1="-2.6" y1="0" x2="2.6" y2="0" stroke="#6E767E" strokeWidth="1.4" />
          </g>
        </g>
        <g transform="translate(195 167)">
          <g className={a('g17-bolt', 'g17-bolt--anim')} style={reduced ? { opacity: 1 } : undefined}>
            <path d="M -5.2 0 L -2.6 -4.5 h 5.2 L 5.2 0 L 2.6 4.5 h -5.2 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.6" />
            <line x1="-2.6" y1="0" x2="2.6" y2="0" stroke="#6E767E" strokeWidth="1.4" />
          </g>
        </g>

        {/* torque flash rings */}
        <g className={a('g17-flash', 'g17-flash--anim')} style={reduced ? { opacity: 0 } : undefined}>
          <circle cx="125" cy="167" r="10" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="195" cy="167" r="10" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        </g>

        {/* ===== earth (ground) symbol ===== */}
        <g
          className={a('g17-earth', 'g17-earth--anim')}
          style={reduced ? { opacity: 1 } : { transformOrigin: '160px 196px' }}
          stroke="var(--ok, #2e9e5b)" strokeWidth="2.6" strokeLinecap="round"
        >
          <line x1="160" y1="180" x2="160" y2="190" />
          <line x1="149" y1="190" x2="171" y2="190" />
          <line x1="153.5" y1="195" x2="166.5" y2="195" />
          <line x1="157.5" y1="200" x2="162.5" y2="200" />
        </g>
      </g>

      {/* mono badges */}
      <rect x="106" y="24" width="108" height="22" rx="5" fill="var(--accent)" />
      <text x="160" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">EARTH BAR</text>
      <rect x="222" y="24" width="82" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
      <text x="263" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">TORQUE</text>
    </svg>
  )
}
