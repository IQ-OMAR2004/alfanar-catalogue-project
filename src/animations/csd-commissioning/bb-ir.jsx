// CSD Commissioning — busbar insulation resistance measurement.
// 5 kV DC for one minute onto one busbar conductor while the other two are
// bonded to earth; the phase under test walks R → Y → B, and the window settles
// above 100 MΩ. Loop ~12s.
import { Caption, Earth, INK, Megger, PHASE, Stage } from './parts.jsx'

const BARS = [
  { k: 'R', y: 66 },
  { k: 'Y', y: 100 },
  { k: 'B', y: 134 },
]

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-bi"
      label="Five kilovolts DC applied to one busbar conductor for one minute while the other two are earthed; the reading settles above 100 megaohms"
    >
      <style>{`
        .cs-bi[data-paused] * { animation-play-state: paused !important; }
        ${['r', 'y', 'b'].map((p, i) => `
        .cs-bi-${p}--anim { animation: cs-bi-${p} 12s linear infinite; opacity: 0; }
        @keyframes cs-bi-${p} {
          0%, ${i * 33.33}%            { opacity: 0; }
          ${i * 33.33 + 1}%, ${(i + 1) * 33.33 - 1}% { opacity: 1; }
          ${(i + 1) * 33.33}%, 100%    { opacity: 0; }
        }`).join('')}
        .cs-flow--anim { animation: cs-flow 0.9s linear infinite; }
        @keyframes cs-flow { to { stroke-dashoffset: -28; } }
        .cs-lamp--anim { animation: cs-lamp 1.1s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .cs-min--anim { animation: cs-min 4s linear infinite; }
        @keyframes cs-min { 0% { stroke-dashoffset: 126; } 82%,100% { stroke-dashoffset: 0; } }
      `}</style>

      {/* three conductors with end pads, as the manual draws them */}
      {BARS.map(({ k, y }) => (
        <g key={k}>
          <rect x="30" y={y - 6} width="14" height="12" rx="2" fill={PHASE[k]} />
          <line x1="44" y1={y} x2="176" y2={y} stroke="#D2A93A" strokeWidth="8" strokeLinecap="butt" />
          <rect x="176" y={y - 6} width="14" height="12" rx="2" fill={PHASE[k]} />
        </g>
      ))}

      {BARS.map(({ k, y }) => {
        const p = k.toLowerCase()
        const others = BARS.filter((b) => b.k !== k)
        return (
          <g key={p} className={reduced ? (k === 'R' ? undefined : 'cs-hide4') : anim(`cs-bi-${p}`)}>
            {/* live lead to the tester */}
            <path
              d={`M190 ${y} L214 ${y} L214 118`}
              fill="none" stroke="#D8352A" strokeWidth="2.6"
              strokeDasharray="8 6" className={anim('cs-flow')}
            />
            {/* the other two conductors bonded together and to earth */}
            {others.map((o) => (
              <path key={o.k} d={`M190 ${o.y} L200 ${o.y} L200 178 L150 178`}
                fill="none" stroke={INK} strokeWidth="2.2" strokeDasharray="5 5" />
            ))}
            {others.map((o) => <circle key={`c${o.k}`} cx="190" cy={o.y} r="3.4" fill={INK} />)}
          </g>
        )
      })}
      <style>{'.cs-hide4 { display: none; }'}</style>

      <Earth x={150} y={178} scale={1} />

      <Megger x={216} y={104} value="> 100 MΩ" lampClass={anim('cs-lamp')} />

      <g>
        <rect x="226" y="66" width="66" height="20" rx="10" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.4" />
        <text x="259" y="80" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#C0392B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>5 kV DC</text>
      </g>

      {/* one-minute dwell bar */}
      <g transform="translate(30 200)">
        <line x1="0" y1="0" x2="126" y2="0" stroke="#C9D2DA" strokeWidth="5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="126" y2="0" stroke="#0A6FA8" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="126" strokeDashoffset="126" className={anim('cs-min')} />
      </g>
      <Caption x={93} y={220}>1 minute</Caption>
      <Caption x={252} y={220}>&gt; 100 MΩ</Caption>
    </Stage>
  )
}
