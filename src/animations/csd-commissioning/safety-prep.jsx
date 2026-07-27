// CSD Commissioning — shared safety step.
// The five precautions printed on every poster, cycling one at a time: danger
// tag on the panel, warning tape across the bay, the safe-distance gap, the PPE
// worker, and the earth connection going on. Loop ~10s (2s each).
import { Earth, INK, Stage } from './parts.jsx'

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <Stage
      paused={paused}
      cls="cs-safety"
      label="The five safety precautions: danger tagging, warning tape, safe distance, personal protective equipment, and proper grounding"
    >
      <style>{`
        .cs-safety[data-paused] * { animation-play-state: paused !important; }
        ${[1, 2, 3, 4, 5].map((n) => `
        .cs-s${n}--anim { animation: cs-s${n} 10s linear infinite; opacity: 0; }
        @keyframes cs-s${n} {
          0%, ${(n - 1) * 20}%      { opacity: 0; }
          ${(n - 1) * 20 + 2}%, ${n * 20 - 2}% { opacity: 1; }
          ${n * 20}%, 100%          { opacity: 0; }
        }`).join('')}
        .cs-tape--anim { animation: cs-tape 1.6s linear infinite; }
        @keyframes cs-tape { to { stroke-dashoffset: -32; } }
        .cs-pulse--anim { animation: cs-pulse 2s ease-in-out infinite; }
        @keyframes cs-pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        .cs-gap--anim { animation: cs-gap 2.4s ease-in-out infinite; }
        @keyframes cs-gap { 0%,100% { transform: translateX(0); } 50% { transform: translateX(14px); } }
      `}</style>

      {/* floor */}
      <rect x="0" y="206" width="320" height="34" fill="#B9BDB6" />

      {/* the panel every precaution refers to */}
      <rect x="26" y="60" width="92" height="146" rx="4" fill="#C9D0D6" stroke={INK} strokeWidth="2" />
      <rect x="36" y="72" width="72" height="42" rx="3" fill="#EDF1F4" stroke="#9AA3AB" strokeWidth="1.4" />
      <circle cx="60" cy="140" r="7" fill="#9AA3AB" stroke={INK} strokeWidth="1.4" />
      <circle cx="84" cy="140" r="7" fill="#9AA3AB" stroke={INK} strokeWidth="1.4" />

      {/* 1 — danger tag hung on the panel handle */}
      <g className={reduced ? undefined : anim('cs-s1')} opacity={reduced ? 1 : undefined}>
        <line x1="108" y1="150" x2="126" y2="162" stroke={INK} strokeWidth="1.6" />
        <rect x="112" y="160" width="52" height="34" rx="3" fill="#FFFFFF" stroke="#B01B10" strokeWidth="2.4" />
        <rect x="112" y="160" width="52" height="12" rx="3" fill="#D8352A" />
        <text x="138" y="169.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#FFFFFF">DANGER</text>
        <text x="138" y="183" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#B01B10">DO NOT</text>
        <text x="138" y="190" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#B01B10">OPERATE</text>
      </g>

      {/* 2 — warning tape across the bay */}
      <g className={reduced ? undefined : anim('cs-s2')} opacity={reduced ? 1 : undefined}>
        <line
          x1="130" y1="120" x2="304" y2="120"
          stroke="#E3B505" strokeWidth="11" strokeDasharray="16 16"
          className={anim('cs-tape')}
        />
        <line x1="130" y1="120" x2="304" y2="120" stroke={INK} strokeWidth="11" strokeDasharray="16 16" strokeDashoffset="16" opacity="0.85" />
      </g>

      {/* 3 — safe distance */}
      <g className={reduced ? undefined : anim('cs-s3')} opacity={reduced ? 1 : undefined}>
        <g className={anim('cs-gap')}>
          <circle cx="232" cy="140" r="12" fill={INK} />
          <path d="M232 152v34M232 160l-14 12M232 160l14 12M232 186l-11 20M232 186l11 20" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
        <path d="M150 168h58M150 168l9-7M150 168l9 7M208 168l-9-7M208 168l-9 7" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* 4 — PPE */}
      <g className={reduced ? undefined : anim('cs-s4')} opacity={reduced ? 1 : undefined}>
        <g transform="translate(214 96)">
          {/* helmet */}
          <path d="M-16 16a16 16 0 0 1 32 0z" fill="#E3B505" stroke={INK} strokeWidth="1.8" />
          <line x1="-20" y1="16" x2="20" y2="16" stroke={INK} strokeWidth="2.4" />
          {/* face */}
          <circle cx="0" cy="30" r="11" fill="#E8D5C0" stroke={INK} strokeWidth="1.6" />
          {/* hi-vis vest */}
          <path d="M-19 44h38l5 46h-48z" fill="#C7E84F" stroke={INK} strokeWidth="1.8" />
          <path d="M-11 44v46M11 44v46" stroke="#9AA3AB" strokeWidth="4" />
          {/* gloves + boots */}
          <circle cx="-24" cy="80" r="6" fill="#2E86C8" stroke={INK} strokeWidth="1.5" />
          <circle cx="24" cy="80" r="6" fill="#2E86C8" stroke={INK} strokeWidth="1.5" />
          <rect x="-18" y="90" width="14" height="20" rx="3" fill="#4A5560" stroke={INK} strokeWidth="1.5" />
          <rect x="4" y="90" width="14" height="20" rx="3" fill="#4A5560" stroke={INK} strokeWidth="1.5" />
        </g>
      </g>

      {/* 5 — proper grounding */}
      <g className={reduced ? undefined : anim('cs-s5')} opacity={reduced ? 1 : undefined}>
        <path d="M118 150 L182 150 L182 186" fill="none" stroke="#1F9D6B" strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="118" cy="150" r="5" fill="#1F9D6B" className={anim('cs-pulse')} />
        <Earth x={182} y={190} scale={1.25} />
        <circle cx="248" cy="150" r="30" fill="#1F9D6B" opacity="0.16" />
        <g transform="translate(248 150) scale(1.5)">
          <line x1="0" y1="-14" x2="0" y2="-2" stroke="#1F9D6B" strokeWidth="2.6" />
          <line x1="-12" y1="-2" x2="12" y2="-2" stroke="#1F9D6B" strokeWidth="2.8" />
          <line x1="-8" y1="4" x2="8" y2="4" stroke="#1F9D6B" strokeWidth="2.8" />
          <line x1="-4" y1="10" x2="4" y2="10" stroke="#1F9D6B" strokeWidth="2.8" />
        </g>
      </g>
    </Stage>
  )
}
