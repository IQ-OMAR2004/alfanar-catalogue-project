// CSD Commissioning — surge arrester insulation resistance at 2.5 kV DC.
// The manual gives four connections: a single-stack arrester, then a
// multi-stack measured overall, lower stack and upper stack. The animation
// cycles those four so a worker sees which lead moves where. Loop ~12s.
import { Caption, Earth, INK, Megger, Stage } from './parts.jsx'

// One arrester column: `sheds` sections, drawn from the base up.
function Arrester({ x, y, units = 1 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: units }, (_, u) => (
        <g key={u} transform={`translate(0 ${-u * 62})`}>
          <rect x="-11" y="-4" width="22" height="8" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.2" />
          {Array.from({ length: 4 }, (_, i) => (
            <ellipse key={i} cx="0" cy={-14 - i * 12} rx="15" ry="4.2" fill="#DDE3E7" stroke={INK} strokeWidth="1.2" />
          ))}
          <rect x="-6" y="-58" width="12" height="54" fill="#DDE3E7" stroke={INK} strokeWidth="1" />
          <rect x="-11" y="-62" width="22" height="8" rx="2" fill="#8E959C" stroke={INK} strokeWidth="1.2" />
        </g>
      ))}
      {/* earth at the base */}
      <line x1="0" y1="4" x2="0" y2="14" stroke={INK} strokeWidth="2.2" />
      <circle cx="0" cy="4" r="3.4" fill={INK} />
    </g>
  )
}

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  const modes = ['single', 'overall', 'lower', 'upper']

  return (
    <Stage
      paused={paused}
      cls="cs-sair"
      label="Insulation tester at 2.5 kilovolts DC on a surge arrester: single stack, then a multi-stack measured overall, lower stack and upper stack"
    >
      <style>{`
        .cs-sair[data-paused] * { animation-play-state: paused !important; }
        ${modes.map((m, i) => `
        .cs-m-${m}--anim { animation: cs-m-${m} 12s linear infinite; opacity: 0; }
        @keyframes cs-m-${m} {
          0%, ${i * 25}%             { opacity: 0; }
          ${i * 25 + 1.5}%, ${(i + 1) * 25 - 1.5}% { opacity: 1; }
          ${(i + 1) * 25}%, 100%     { opacity: 0; }
        }`).join('')}
        .cs-flow--anim { animation: cs-flow 0.9s linear infinite; }
        @keyframes cs-flow { to { stroke-dashoffset: -26; } }
        .cs-lamp--anim { animation: cs-lamp 1.1s ease-in-out infinite; }
        @keyframes cs-lamp { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      {/* single-stack arrester (left) and multi-stack (middle) */}
      <Arrester x={52} y={176} units={1} />
      <Arrester x={132} y={176} units={2} />
      <Earth x={52} y={190} scale={0.85} />
      <Earth x={132} y={190} scale={0.85} />

      <Caption x={52} y={216} size={10}>single</Caption>
      <Caption x={132} y={216} size={10}>multi-stack</Caption>

      {/* the four lead arrangements */}
      <g className={reduced ? undefined : anim('cs-m-single')}>
        <path d="M52 110 L52 74 L236 74 L236 116" fill="none" stroke="#D8352A" strokeWidth="2.4"
          strokeDasharray="8 6" className={anim('cs-flow')} />
        <circle cx="52" cy="110" r="4.5" fill="none" stroke="#D8352A" strokeWidth="2" />
        <Caption x={148} y={64} size={11}>single stack</Caption>
      </g>

      <g className={reduced ? 'cs-hide7' : anim('cs-m-overall')}>
        <path d="M132 48 L132 34 L236 34 L236 116" fill="none" stroke="#D8352A" strokeWidth="2.4"
          strokeDasharray="8 6" className={anim('cs-flow')} />
        <circle cx="132" cy="48" r="4.5" fill="none" stroke="#D8352A" strokeWidth="2" />
        <Caption x={176} y={26} size={11}>overall</Caption>
      </g>

      <g className={reduced ? 'cs-hide7' : anim('cs-m-lower')}>
        <path d="M132 112 L104 112 L104 60 L236 60 L236 116" fill="none" stroke="#D8352A" strokeWidth="2.4"
          strokeDasharray="8 6" className={anim('cs-flow')} />
        <circle cx="132" cy="112" r="4.5" fill="none" stroke="#D8352A" strokeWidth="2" />
        <Caption x={176} y={52} size={11}>lower stack</Caption>
      </g>

      <g className={reduced ? 'cs-hide7' : anim('cs-m-upper')}>
        <path d="M132 48 L104 48 L104 26 L236 26 L236 116" fill="none" stroke="#2E86C8" strokeWidth="2.4"
          strokeDasharray="8 6" className={anim('cs-flow')} />
        <path d="M132 112 L156 112 L156 96" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="132" cy="48" r="4.5" fill="none" stroke="#2E86C8" strokeWidth="2" />
        <Caption x={176} y={18} size={11}>upper stack</Caption>
      </g>
      <style>{'.cs-hide7 { display: none; }'}</style>

      <Megger x={218} y={104} value="> 1 MΩ" lampClass={anim('cs-lamp')} />

      <g>
        <rect x="222" y="66" width="72" height="20" rx="10" fill="#FBE3E0" stroke="#C0392B" strokeWidth="1.4" />
        <text x="258" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#C0392B"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}>2.5 kV DC</text>
      </g>
      <Caption x={256} y={216}>&gt; 1 MΩ</Caption>
    </Stage>
  )
}
