// GIS Tank Modification — Step 16: "Fix the ES/DS tank chine poly"
// Loop: a black poly protection strip wraps progressively around the exposed
// ES/DS tank edge (stroke-dashoffset draw), a press-hand pad follows the strip
// pushing it fully home, and a check tick appears when the strip is continuous.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  // chine path along the exposed tank edge (top-left → across → down right side)
  const CHINE = 'M 62 78 H 240 V 176'
  const CHINE_LEN = 276 // approx path length for dash animation

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Chine poly protection strip wrapping and being pressed down around the ES/DS tank edge until continuous"
    >
      <style>{`
        .g16-stage[data-paused] * { animation-play-state: paused !important; }

        /* strip draws itself around the tank edge */
        .g16-strip--anim { animation: g16-strip 4.5s ease-in-out infinite; }
        @keyframes g16-strip {
          0%       { stroke-dashoffset: ${CHINE_LEN}; }
          60%,100% { stroke-dashoffset: 0; }
        }

        /* press pad rides along the edge just behind the strip front,
           bobbing down to seat the strip (seal the gaps) */
        .g16-press--anim { animation: g16-press 4.5s ease-in-out infinite; }
        @keyframes g16-press {
          0%   { offset-distance: 0%; opacity: 0; }
          6%   { opacity: 1; }
          56%  { opacity: 1; }
          60%  { offset-distance: 100%; opacity: 0; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .g16-bob--anim { animation: g16-bob 0.75s ease-in-out infinite; }
        @keyframes g16-bob {
          0%,100% { transform: translateY(-6px); }
          50%     { transform: translateY(0); }
        }

        /* continuity check tick */
        .g16-check--anim { animation: g16-check 4.5s ease-in-out infinite; }
        @keyframes g16-check {
          0%,66%   { opacity: 0; transform: scale(0.5); }
          74%      { opacity: 1; transform: scale(1.1); }
          88%      { opacity: 1; transform: scale(1); }
          96%,100% { opacity: 0; transform: scale(0.5); }
        }

        /* "no gaps" shimmer along the finished strip */
        .g16-sheen--anim { animation: g16-sheen 4.5s linear infinite; }
        @keyframes g16-sheen {
          0%,62%  { stroke-dashoffset: ${CHINE_LEN + 40}; opacity: 0; }
          66%     { opacity: 0.8; }
          88%     { stroke-dashoffset: 0; opacity: 0.8; }
          92%,100%{ stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== ES/DS tank on top of the main tank — crop on the edge ===== */}
      {/* main tank below */}
      <rect x="40" y="150" width="222" height="64" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      <g fill="#9BA19A">
        <circle cx="58" cy="162" r="2" /><circle cx="86" cy="162" r="2" /><circle cx="114" cy="162" r="2" />
        <circle cx="142" cy="162" r="2" /><circle cx="170" cy="162" r="2" /><circle cx="198" cy="162" r="2" /><circle cx="226" cy="162" r="2" />
      </g>
      {/* ES/DS tank body sitting on it — the chine edge is its rim */}
      <rect x="62" y="78" width="178" height="72" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2.5" />
      {/* bolted cover on ES/DS face */}
      <rect x="86" y="94" width="92" height="42" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="93" cy="100" r="2" /><circle cx="115" cy="100" r="2" /><circle cx="137" cy="100" r="2" /><circle cx="159" cy="100" r="2" /><circle cx="171" cy="100" r="2" />
        <circle cx="93" cy="130" r="2" /><circle cx="115" cy="130" r="2" /><circle cx="137" cy="130" r="2" /><circle cx="159" cy="130" r="2" /><circle cx="171" cy="130" r="2" />
      </g>
      {/* small ES/DS mechanism housing on the right */}
      <rect x="196" y="98" width="32" height="36" fill="#D7DAD4" stroke="#8A9089" strokeWidth="2" />
      <circle cx="212" cy="116" r="8" fill="#EDEFEA" stroke="#8A9089" strokeWidth="1.5" />
      <line x1="212" y1="110" x2="212" y2="116" stroke="#6E767E" strokeWidth="2" strokeLinecap="round" />

      {/* bare edge underlay (where the chine poly must cover) */}
      <path d={CHINE} fill="none" stroke="#8A9089" strokeWidth="7" strokeLinecap="round" opacity="0.5" />

      <g className="g16-stage" data-paused={paused ? '' : undefined}>
        {/* ===== chine poly strip wrapping the edge ===== */}
        <path
          className={a('g16-strip', 'g16-strip--anim')}
          d={CHINE}
          fill="none" stroke="#222" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={CHINE_LEN}
          strokeDashoffset={reduced ? 0 : undefined}
        />
        {/* sheen sweep confirming a continuous, seated strip */}
        {!reduced && (
          <path
            className="g16-sheen--anim"
            d={CHINE}
            fill="none" stroke="#9FD8A8" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`26 ${CHINE_LEN + 14}`}
            opacity="0"
          />
        )}

        {/* ===== press pad following the edge, pushing the strip home ===== */}
        {!reduced && (
          <g className="g16-press--anim" style={{ offsetPath: `path('${CHINE}')`, offsetRotate: '0deg' }}>
            <g className="g16-bob--anim">
              {/* thumb-press pad */}
              <rect x="-9" y="-16" width="18" height="12" rx="5" fill="var(--accent)" opacity="0.9" />
              <path d="M 0 -4 l -5 -5 h 10 Z" fill="var(--accent)" opacity="0.9" />
            </g>
          </g>
        )}

        {/* continuity check */}
        <g className={a('g16-check', 'g16-check--anim')} style={reduced ? { opacity: 1 } : { transformOrigin: '266px 96px' }}>
          <circle cx="266" cy="96" r="12" fill="var(--ok, #2e9e5b)" />
          <path d="M 260.5 96 l 4 4.5 l 7.5 -9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* mono badge */}
      <rect x="42" y="34" width="112" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
      <text x="98" y="49" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">CHINE POLY</text>
      <rect x="162" y="34" width="86" height="22" rx="5" fill="var(--accent)" />
      <text x="205" y="49" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">NO GAPS</text>
    </svg>
  )
}
