// GIS Full WI — Step 49: "Wire the CTs & fit the cover plate"
// The round CT terminal plate with its two dot-rings of terminals; R/Y/B wires
// (9 per phase) crimped with 6 mm lugs and routed to numbered terminals; then
// the cover plate closes over its O-ring with 8 M10 bolts (cross-pattern).
export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  const wires = [
    { c: '#C0392B', y: 96 }, { c: '#E8B90C', y: 108 }, { c: '#2C6FB4', y: 120 },
  ]
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Wiring the CT terminal plate with R, Y, B wires crimped to 6 mm lugs and numbered terminals, then closing the cover plate over its O-ring with eight bolts">
      <style>{`
        @keyframes gfw49-route { 0% { stroke-dashoffset: 60 } 55%,100% { stroke-dashoffset: 0 } }
        @keyframes gfw49-cover { 0%,55% { transform: translateX(90px); opacity: 0.85 } 80%,100% { transform: translateX(0); opacity: 1 } }
        @keyframes gfw49-bolt { 0%,80% { opacity: 0 } 92%,100% { opacity: 1 } }
        .gfw49-w--anim { animation: gfw49-route 4.5s ease-in-out infinite; }
        .gfw49-cover--anim { animation: gfw49-cover 4.5s ease-in-out infinite; }
        .gfw49-bolt--anim { animation: gfw49-bolt 4.5s ease-in-out infinite; }
        .gfw49-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="gfw49-stage" data-paused={paused ? '' : undefined}>
        <rect x="0" y="212" width="320" height="28" fill="#B9BDB6" />
        <rect x="0" y="212" width="320" height="4" fill="#F2B826" />
        {/* tank face with round CT terminal plate */}
        <rect x="20" y="40" width="150" height="160" rx="6" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
        <circle cx="95" cy="120" r="52" fill="#EDEFEA" stroke="#8A9089" strokeWidth="2" />
        {/* two dot-rings of terminals */}
        {[38, 26].map((r, ri) => Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6
          return <circle key={`${ri}-${i}`} cx={95 + r * Math.cos(a)} cy={120 + r * Math.sin(a)} r="2.4" fill="#A9AEA6" />
        }))}
        {/* R/Y/B wires routed in */}
        {wires.map((w, i) => (
          <path key={i} className={anim('gfw49-w')} d={`M 200 ${w.y} C 160 ${w.y}, 140 120, ${112 - i * 8} ${112 + i * 6}`}
            fill="none" stroke={w.c} strokeWidth="3" strokeLinecap="round" strokeDasharray="60" style={reduced ? { strokeDashoffset: 0 } : undefined} />
        ))}
        {/* lugs */}
        {wires.map((w, i) => <rect key={`l${i}`} x="196" y={w.y - 3} width="10" height="6" rx="1.5" fill="#C08040" />)}
        <text x="220" y="100" fontFamily="var(--font-mono)" fontSize="9" fill="#C0392B">R</text>
        <text x="220" y="112" fontFamily="var(--font-mono)" fontSize="9" fill="#C8991F">Y</text>
        <text x="220" y="124" fontFamily="var(--font-mono)" fontSize="9" fill="#2C6FB4">B</text>
        <text x="248" y="150" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink2)">9/phase</text>
        {/* cover plate closing over the terminal, with 8 bolts */}
        <g className={anim('gfw49-cover')}>
          <circle cx="95" cy="120" r="46" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2" opacity="0.94" />
          <circle cx="95" cy="120" r="46" fill="none" stroke="#222" strokeWidth="2.5" opacity="0.5" />
          <g className={anim('gfw49-bolt')}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4
              return <circle key={i} cx={95 + 40 * Math.cos(a)} cy={120 + 40 * Math.sin(a)} r="2.6" fill="#6E767E" />
            })}
          </g>
        </g>
        <g><rect x="212" y="196" width="96" height="22" rx="6" fill="var(--accent)" /><text x="260" y="211" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="var(--on-accent)">30→60→100%</text></g>
      </g>
    </svg>
  )
}
