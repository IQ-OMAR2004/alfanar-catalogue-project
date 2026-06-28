// GIS Tank — Step 2: Recover the SF6 gas.
// SF6 is pumped from the tank (left) through the hose into the gas machine
// (right): gas particles flow tank -> machine, the tank pressure gauge needle
// falls, and the machine's "REC" indicator blinks. Seamless loop, brand-themed.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  const HOSE = 'M126 92 C 156 58, 188 58, 214 92'

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Recovering SF6 gas from the tank into the gas machine"
    >
      <style>{`
        @keyframes gist2-flow { 0% { offset-distance: 0%; opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { offset-distance: 100%; opacity: 0 } }
        @keyframes gist2-needle { 0%,100% { transform: rotate(-46deg) } 50% { transform: rotate(40deg) } }
        @keyframes gist2-rec { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
        @keyframes gist2-drain { 0% { transform: scaleY(1) } 50% { transform: scaleY(.18) } 100% { transform: scaleY(1) } }
        .gist2-gas { offset-path: path('${HOSE}'); offset-rotate: 0deg; }
        .gist2-gas--anim { animation: gist2-flow 2.6s linear infinite; }
        .gist2-needle { transform-box: fill-box; transform-origin: center bottom; transform: rotate(-46deg); }
        .gist2-needle--anim { animation: gist2-needle 3.4s ease-in-out infinite; }
        .gist2-level { transform-box: fill-box; transform-origin: center bottom; }
        .gist2-level--anim { animation: gist2-drain 3.4s ease-in-out infinite; }
        .gist2-rec--anim { animation: gist2-rec 1.1s ease-in-out infinite; }
        .gist2-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="gist2-stage" data-paused={paused ? '' : undefined}>
        {/* ---- Tank ---- */}
        <rect x="30" y="84" width="96" height="118" rx="10" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        {/* pressure level inside the tank */}
        <rect x="40" y="120" width="76" height="74" rx="4" fill="var(--beacon-soft)" className={anim('gist2-level')} />
        <text x="78" y="190" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--accent)">SF₆</text>

        {/* gauge */}
        <g>
          <circle cx="78" cy="74" r="20" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
          <circle cx="78" cy="74" r="20" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 5" opacity="0.5" />
          <rect x="77" y="60" width="2" height="15" rx="1" fill="var(--warn)" className={anim('gist2-needle')} />
          <circle cx="78" cy="74" r="2.6" fill="var(--ink)" />
        </g>

        {/* ---- Hose ---- */}
        <path d={HOSE} fill="none" stroke="var(--slate)" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
        <path d={HOSE} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

        {/* gas particles flowing tank -> machine */}
        {[0, 0.33, 0.66].map((d, i) => (
          <circle
            key={i}
            r={4.5}
            fill="var(--sky)"
            className={anim('gist2-gas')}
            style={{ animationDelay: `${-d * 2.6}s` }}
          />
        ))}

        {/* ---- Gas machine ---- */}
        <rect x="212" y="70" width="86" height="132" rx="10" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        <rect x="224" y="86" width="62" height="40" rx="5" fill="var(--navy)" />
        <text x="255" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--sky)">RECOV</text>
        <circle cx="240" cy="116" r="4" fill="var(--ok)" className={anim('gist2-rec')} />
        <text x="266" y="120" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">REC</text>
        {/* dials */}
        <circle cx="240" cy="150" r="11" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
        <circle cx="270" cy="150" r="11" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
        <rect x="226" y="174" width="60" height="18" rx="4" fill="var(--accent)" opacity="0.85" />
      </g>
    </svg>
  )
}
