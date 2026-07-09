// GIS Full WI — Step 60: "Sniffer leak test (24–48 h)"
// After the 24–48 h wait, the bag is opened and a handheld SF6 gas sniffer probe
// is inserted; the instrument reads and beeps. A green "no leak" result loops
// (with the alternate red state to show what a detected leak looks like).
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="A handheld SF6 gas sniffer inserted into the opened leak-test bag, reading and beeping to confirm no leak">
      <style>{`
        @keyframes gfw60-probe { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-6px,4px) } }
        @keyframes gfw60-beep { 0%,60% { opacity: 0; transform: scale(0.6) } 74% { opacity: 1; transform: scale(1.15) } 88%,100% { opacity: 1; transform: scale(1) } }
        @keyframes gfw60-wave { 0% { r: 4; opacity: 0.7 } 100% { r: 16; opacity: 0 } }
        .gfw60-probe--anim { animation: gfw60-probe 3s ease-in-out infinite; }
        .gfw60-ok { transform-box: fill-box; transform-origin: 50% 50%; }
        .gfw60-ok--anim { animation: gfw60-beep 4.5s ease-in-out infinite; }
        .gfw60-wave--anim { animation: gfw60-wave 1.6s ease-out infinite; }
        .gfw60-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw60-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
        <rect x="0" y="212" width="320" height="4" fill="#F2B826" />
        {/* opened bag corner over tank edge (left) */}
        <path d="M 40 60 h 120 v 150 h -120 z" fill="#BFE3F2" fillOpacity="0.22" stroke="#8FBFD6" strokeWidth="2" />
        <path d="M 40 60 l 26 24 l -26 6 z" fill="var(--panel)" stroke="#8FBFD6" strokeWidth="1.6" />{/* opened flap */}
        <rect x="52" y="90" width="96" height="120" rx="4" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2" opacity="0.9" />
        {/* sniffer body (handheld, grey/orange) */}
        <g className={anim('gfw60-probe')}>
          <rect x="196" y="120" width="70" height="42" rx="6" fill="#3A4046" stroke="#1E2226" strokeWidth="2" />
          <rect x="204" y="128" width="40" height="20" rx="3" fill="#12303A" />
          <text x="224" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#6FE39A">SF6</text>
          <circle cx="255" cy="152" r="4" fill="#1F9D6B" />{/* ON */}
          {/* flexible probe reaching into the bag */}
          <path d="M 196 132 C 170 132 140 120 96 128" fill="none" stroke="#26292C" strokeWidth="4" strokeLinecap="round" />
          <circle cx="96" cy="128" r="5" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.5" />
          {/* sensing waves at the probe tip */}
          <circle className={anim('gfw60-wave')} cx="96" cy="128" r="4" fill="none" stroke="#6FE39A" strokeWidth="1.6" />
        </g>
        {/* NO LEAK result */}
        <g className={anim('gfw60-ok')} style={reduced ? { opacity: 1 } : { transformOrigin: '231px 90px' }}>
          <rect x="196" y="76" width="98" height="28" rx="8" fill="#1F9D6B" />
          <text x="245" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#fff">NO LEAK</text>
        </g>
        <g><rect x="24" y="30" width="86" height="22" rx="6" fill="var(--accent)" /><text x="67" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="var(--on-accent)">24–48 h</text></g>
        <g><polygon points="292,196 308,224 276,224" fill="var(--warn)" /><text x="292" y="219" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="800" fill="#fff">!</text></g>
      </g>
    </svg>
  )
}
