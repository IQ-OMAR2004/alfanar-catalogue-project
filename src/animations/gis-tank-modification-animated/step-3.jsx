// GIS Tank — Step 3: "Recover the SF6 gas".
// The metaphor: gas recovery. SF6 is pulled OUT of the tank (left), through the
// DN8 hose, into the SF6 gas machine (right). Particles travel tank -> machine,
// the tank's pressure gauge needle FALLS toward 0, the machine "RECOVERY"
// indicator blinks, and a small warning glyph holds (HAZARD step — certified
// personnel only, colourless/odourless gas). Reduced motion poses a meaningful
// mid-recovery still. Every keyframe + class is prefixed "ga3-" so co-mounted
// steps never collide.
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  const HOSE = 'M120 96 C 152 60, 188 60, 220 96'

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Recovering SF6 gas from the tank into the gas machine until pressure reaches zero"
    >
      <style>{`
        @keyframes ga3-flow { 0% { offset-distance: 0%; opacity: 0 } 12% { opacity: 1 } 88% { opacity: 1 } 100% { offset-distance: 100%; opacity: 0 } }
        @keyframes ga3-drain { 0% { transform: scaleY(1) } 50% { transform: scaleY(.16) } 100% { transform: scaleY(1) } }
        @keyframes ga3-needle { 0% { transform: rotate(46deg) } 50% { transform: rotate(-44deg) } 100% { transform: rotate(46deg) } }
        @keyframes ga3-blink { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
        @keyframes ga3-warn { 0%,100% { opacity: .55 } 50% { opacity: 1 } }

        .ga3-gas { offset-path: path('${HOSE}'); offset-rotate: 0deg; }
        .ga3-gas--anim { animation: ga3-flow 2.6s linear infinite; }
        .ga3-level { transform-box: fill-box; transform-origin: center bottom; }
        .ga3-level--anim { animation: ga3-drain 3.2s ease-in-out infinite; }
        .ga3-needle { transform-box: fill-box; transform-origin: center bottom; transform: rotate(46deg); }
        .ga3-needle--anim { animation: ga3-needle 3.2s ease-in-out infinite; }
        .ga3-rec--anim { animation: ga3-blink 1.05s ease-in-out infinite; }
        .ga3-warn--anim { animation: ga3-warn 1.4s ease-in-out infinite; }

        .ga3-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>

      <g className="ga3-stage" data-paused={paused ? '' : undefined}>
        {/* ===================== TANK (source) ===================== */}
        <rect x="30" y="86" width="92" height="120" rx="11" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        {/* draining SF6 contents */}
        <rect x="40" y="124" width="72" height="74" rx="5" fill="var(--beacon-soft)" className={anim('ga3-level')} />
        <text x="76" y="196" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--accent)">SF6</text>

        {/* tank pressure gauge — needle falls toward 0 */}
        <g>
          <circle cx="76" cy="74" r="20" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
          <path d="M62 80 A 18 18 0 0 1 90 80" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="2 5" opacity="0.5" />
          <rect x="75" y="60" width="2" height="15" rx="1" fill="var(--warn)" className={anim('ga3-needle')} />
          <circle cx="76" cy="74" r="2.6" fill="var(--ink)" />
          <text x="76" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink2)">0</text>
        </g>

        {/* ===================== HOSE (DN8) ===================== */}
        <path d={HOSE} fill="none" stroke="var(--slate)" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
        <path d={HOSE} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        {/* gas particles flow tank -> machine */}
        {[0, 0.34, 0.68].map((d, i) => (
          <circle key={i} r={4.5} fill="var(--sky)" className={anim('ga3-gas')} style={{ animationDelay: `${-d * 2.6}s` }} />
        ))}

        {/* ===================== GAS MACHINE (sink) ===================== */}
        <rect x="206" y="74" width="92" height="132" rx="11" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2.5" />
        {/* display showing the active mode */}
        <rect x="218" y="88" width="68" height="36" rx="5" fill="var(--navy)" />
        <text x="252" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--sky)">RECOVERY</text>
        <circle cx="228" cy="116" r="3.6" fill="var(--ok)" className={anim('ga3-rec')} />
        <text x="260" y="119" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink2)">REC</text>
        {/* selector dial set to "Recovery" + booster/compressor switches */}
        <circle cx="236" cy="150" r="12" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2" />
        <rect x="235" y="142" width="2" height="9" rx="1" fill="var(--accent)" transform="rotate(28 236 150)" />
        <rect x="262" y="138" width="24" height="11" rx="3" fill="var(--ok)" opacity="0.9" />
        <rect x="262" y="153" width="24" height="11" rx="3" fill="var(--ok)" opacity="0.9" />
        <rect x="218" y="176" width="68" height="20" rx="4" fill="var(--accent)" opacity="0.85" />
        <text x="252" y="190" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--on-accent)">25 A</text>

        {/* ===================== HAZARD GLYPH ===================== */}
        <g className={anim('ga3-warn')}>
          <path d="M160 26 L176 54 L144 54 Z" fill="var(--warn)" stroke="var(--bg)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="158.5" y="36" width="3" height="10" rx="1.5" fill="#fff" />
          <circle cx="160" cy="50" r="1.8" fill="#fff" />
        </g>
      </g>
    </svg>
  )
}
