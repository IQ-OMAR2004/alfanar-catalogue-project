// GIS Tank Modification — Step 19: "Assemble & fix the rear-side top cover"
// Loop: the rear-side top cover plate is offered up (slides in at an angle)
// to the rear of the panel, seats flush on the stud row, and a tightening
// highlight travels evenly around the perimeter studs — even tightening.

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  // perimeter studs of the rear-top opening (clockwise from top-left)
  const STUDS = [
    [126, 62], [158, 62], [190, 62], [222, 62],
    [222, 86], [222, 110],
    [190, 110], [158, 110], [126, 110],
    [126, 86],
  ]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Rear-side top cover offered up to the rear of the panel and bolted, tightening highlight moving evenly around the perimeter studs"
    >
      <style>{`
        .g19-stage[data-paused] * { animation-play-state: paused !important; }

        /* cover offered up: slides in from upper-right at a slight tilt,
           straightens, then seats flush */
        .g19-cover--anim { animation: g19-cover 5s ease-in-out infinite; }
        @keyframes g19-cover {
          0%       { transform: translate(66px, -52px) rotate(8deg); }
          22%      { transform: translate(8px, -6px) rotate(2deg); }
          32%,100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* even-tightening highlight orbits the perimeter stud row */
        .g19-orbit--anim { animation: g19-orbit 5s linear infinite; }
        @keyframes g19-orbit {
          0%,34% { offset-distance: 0%; opacity: 0; }
          38%    { opacity: 1; }
          88%    { offset-distance: 100%; opacity: 1; }
          92%,100% { offset-distance: 100%; opacity: 0; }
        }

        /* studs flash as the highlight passes (grouped in 3 phases for an
           "even, criss-cross" tightening read) */
        .g19-st1--anim { animation: g19-st 5s ease-in-out infinite; }
        .g19-st2--anim { animation: g19-st 5s ease-in-out infinite 0.9s; }
        .g19-st3--anim { animation: g19-st 5s ease-in-out infinite 1.8s; }
        @keyframes g19-st {
          0%,38%  { fill: #9BA19A; }
          46%     { fill: var(--accent); }
          58%,100%{ fill: #6E767E; }
        }

        /* flush-seated tick */
        .g19-check--anim { animation: g19-check 5s ease-in-out infinite; }
        @keyframes g19-check {
          0%,88%  { opacity: 0; transform: scale(0.5); }
          93%     { opacity: 1; transform: scale(1.08); }
          98%,100%{ opacity: 1; transform: scale(1); }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== rear view: tall flat tank with two large bolted covers ===== */}
      <rect x="96" y="30" width="156" height="184" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* lower large bolted rectangular cover (already fitted) */}
      <rect x="112" y="130" width="124" height="70" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" />
      <g fill="#9BA19A">
        <circle cx="119" cy="137" r="2" /><circle cx="145" cy="137" r="2" /><circle cx="171" cy="137" r="2" /><circle cx="197" cy="137" r="2" /><circle cx="229" cy="137" r="2" />
        <circle cx="119" cy="193" r="2" /><circle cx="145" cy="193" r="2" /><circle cx="171" cy="193" r="2" /><circle cx="197" cy="193" r="2" /><circle cx="229" cy="193" r="2" />
        <circle cx="119" cy="165" r="2" /><circle cx="229" cy="165" r="2" />
      </g>
      {/* side neighbour panel edge on the left */}
      <rect x="64" y="30" width="32" height="184" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />

      {/* rear-top opening flange with the perimeter stud row (exposed studs) */}
      <rect x="112" y="52" width="124" height="68" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      <g>
        {STUDS.map(([x, y], i) => (
          <circle
            key={i}
            className={reduced ? undefined : `g19-st${(i % 3) + 1}--anim`}
            cx={x} cy={y} r="2.4"
            fill={reduced ? '#6E767E' : '#9BA19A'}
          />
        ))}
      </g>

      <g className="g19-stage" data-paused={paused ? '' : undefined}>
        {/* ===== rear-side top cover being offered up ===== */}
        <g className={a('g19-cover', 'g19-cover--anim')} style={{ transformOrigin: '174px 86px' }}>
          <rect x="112" y="52" width="124" height="68" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" opacity="0.94" />
          {/* matching bolt holes on the cover */}
          {STUDS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#8A9089" strokeWidth="1.4" />
          ))}
          {/* stiffening swage lines */}
          <line x1="126" y1="74" x2="222" y2="74" stroke="#C2C6BF" strokeWidth="2" />
          <line x1="126" y1="98" x2="222" y2="98" stroke="#C2C6BF" strokeWidth="2" />
        </g>

        {/* even-tightening cursor orbiting the stud row */}
        {!reduced && (
          <g
            className="g19-orbit--anim"
            style={{
              offsetPath: "path('M 126 62 H 222 V 110 H 126 Z')",
              offsetRotate: '0deg',
            }}
          >
            <circle r="7.5" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <circle r="2" fill="var(--accent)" />
          </g>
        )}

        {/* flush tick */}
        <g className={a('g19-check', 'g19-check--anim')} style={reduced ? { opacity: 1 } : { transformOrigin: '272px 46px' }}>
          <circle cx="272" cy="46" r="11" fill="var(--ok, #2e9e5b)" />
          <path d="M 267 46 l 3.5 4 l 7 -8" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* accent arrow: offer up to the rear-top zone */}
      <path d="M 286 96 h -36 m 0 0 l 10 -7 m -10 7 l 10 7"
        fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

      {/* mono badges */}
      <rect x="14" y="24" width="76" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
      <text x="52" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">REAR</text>
      <rect x="14" y="52" width="76" height="22" rx="5" fill="var(--accent)" />
      <text x="52" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">EVEN</text>
    </svg>
  )
}
