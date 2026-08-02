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

      {/* 4 — PPE: the four items the poster pictures, on a worker */}
      <g className={reduced ? undefined : anim('cs-s4')} opacity={reduced ? 1 : undefined}>
        <g transform="translate(210 86)">
          {/* hard hat: shell, brim, ratchet band, moulded rib */}
          <path d="M-21 19h42a1.6 1.6 0 0 1 0 3.2h-42a1.6 1.6 0 0 1 0-3.2z" fill="#E4A81C" stroke={INK} strokeWidth="1.4" />
          <path d="M-16 19a16 16 0 0 1 32 0z" fill="#F2BE2C" stroke={INK} strokeWidth="1.6" />
          <path d="M-16 19a16 16 0 0 1 16-16v16z" fill="rgba(255,255,255,0.45)" />
          <path d="M0 3.2V19M-7 4.7c-2 4-3 8.9-3 14.3M7 4.7c2 4 3 8.9 3 14.3" fill="none" stroke="#C08E12" strokeWidth="1.2" />
          <rect x="-10" y="14" width="20" height="4" rx="2" fill="#C08E12" stroke={INK} strokeWidth="1" />

          {/* face + safety glasses */}
          <ellipse cx="0" cy="33" rx="12" ry="13" fill="#E8D5C0" stroke={INK} strokeWidth="1.5" />
          <path d="M-13 29h26l-1 2.6h-24z" fill="#5B6873" stroke={INK} strokeWidth="1" />
          <path d="M-12 31.6h9.5a1 1 0 0 1 .9 1.4l-.4 1.1a2 2 0 0 1-1.9 1.3h-3.6a2.6 2.6 0 0 1-2.5-1.9z"
            fill="#BFE3F5" fillOpacity="0.9" stroke={INK} strokeWidth="1" />
          <path d="M12 31.6H2.5a1 1 0 0 0-.9 1.4l.4 1.1a2 2 0 0 0 1.9 1.3h3.6a2.6 2.6 0 0 0 2.5-1.9z"
            fill="#BFE3F5" fillOpacity="0.9" stroke={INK} strokeWidth="1" />

          {/* hi-vis vest with retro-reflective bands */}
          <path d="M-13 47 0 52l13-5 8 5-3 10 3 24h-42l3-24-3-10z" fill="#D8E63A" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M-13 47 0 52l-5 34h-16l3-24-3-10z" fill="rgba(255,255,255,0.35)" />
          <path d="M-8 57 -6 86M8 57 6 86" stroke="#C9D2DA" strokeWidth="3.6" fill="none" />
          <path d="M-19 68h38" stroke="#C9D2DA" strokeWidth="3.6" fill="none" />
          <path d="M0 52v34" stroke="#A9B617" strokeWidth="1.2" fill="none" />

          {/* protective gloves */}
          <path d="M-27 70c-3 0-5 2-5 5v9c0 2 2 4 4 4h5v-18z" fill="#5E9BD1" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M27 70c3 0 5 2 5 5v9c0 2-2 4-4 4h-5v-18z" fill="#5E9BD1" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M-32 82h9M23 82h9" stroke="#3E75A6" strokeWidth="1.4" fill="none" />

          {/* safety footwear */}
          <path d="M-17 86h11v14h9a3 3 0 0 1 3 3v3h-23z" fill="#4A5560" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M17 86H6v14h-9a3 3 0 0 0-3 3v3h23z" fill="#4A5560" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M-23 103h46" stroke="#2C343B" strokeWidth="3" fill="none" />
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
