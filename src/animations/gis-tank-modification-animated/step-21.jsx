// GIS Tank Modification — Step 21: "Fix the rear cover & channel bracket"
// Loop: STEP A — the channel bracket bolts to the rear frame first; STEP B —
// the rear cover swings in and hangs onto the channel; then a sequence
// highlight hops bolt-to-bolt while a badge confirms "BOLTS = BOM ✓".

export default function StepAnimation({ paused = false, reduced = false }) {
  const a = (base, anim) => (reduced ? base : `${base} ${anim}`)

  // rear cover perimeter bolts (tighten in sequence)
  const BOLTS = [
    [122, 88], [206, 88], [206, 186], [122, 186], [164, 88], [164, 186],
  ]

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Channel bracket fixed first, rear cover hung onto it, bolts tightened in sequence and counted against the BOM"
    >
      <style>{`
        .g21-stage[data-paused] * { animation-play-state: paused !important; }

        /* PHASE A: channel bracket slides onto the rear frame */
        .g21-channel--anim { animation: g21-channel 5.5s ease-in-out infinite; }
        @keyframes g21-channel {
          0%       { transform: translateY(-34px); opacity: 0; }
          6%       { opacity: 1; }
          18%,100% { transform: translateY(0); opacity: 1; }
        }

        /* PHASE B: rear cover swings in and drops onto the channel hooks */
        .g21-cover--anim { animation: g21-cover 5.5s ease-in-out infinite; }
        @keyframes g21-cover {
          0%,20%   { transform: translate(58px, -18px) rotate(6deg); opacity: 0; }
          26%      { opacity: 1; }
          38%      { transform: translate(0, -8px) rotate(0deg); }
          46%,100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }

        /* PHASE C: sequence highlight hops bolt to bolt */
        .g21-s1--anim { animation: g21-s 5.5s ease-in-out infinite; }
        .g21-s2--anim { animation: g21-s 5.5s ease-in-out infinite 0.45s; }
        .g21-s3--anim { animation: g21-s 5.5s ease-in-out infinite 0.9s; }
        .g21-s4--anim { animation: g21-s 5.5s ease-in-out infinite 1.35s; }
        .g21-s5--anim { animation: g21-s 5.5s ease-in-out infinite 1.8s; }
        .g21-s6--anim { animation: g21-s 5.5s ease-in-out infinite 2.25s; }
        @keyframes g21-s {
          0%,50%  { opacity: 0; transform: scale(0.6); }
          54%     { opacity: 1; transform: scale(1.15); }
          60%     { opacity: 0.9; transform: scale(1); }
          66%,100%{ opacity: 0; transform: scale(0.8); }
        }

        /* BOM count badge tick at the end */
        .g21-bom--anim { animation: g21-bom 5.5s ease-in-out infinite; }
        @keyframes g21-bom {
          0%,84%  { opacity: 0.35; }
          90%,98% { opacity: 1; }
          100%    { opacity: 0.35; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--bg)" />
      <rect x="0" y="214" width="320" height="26" fill="#B9BDB6" />
      <rect x="0" y="214" width="320" height="4" fill="#F2B826" />

      {/* ===== rear of the panel: tall flat tank, open rear aperture ===== */}
      <rect x="96" y="26" width="136" height="188" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" />
      {/* open rear aperture (dark) waiting for the cover */}
      <rect x="112" y="72" width="104" height="122" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      {/* frame stud row around the aperture */}
      <g fill="#9BA19A">
        <circle cx="106" cy="80" r="2" /><circle cx="106" cy="120" r="2" /><circle cx="106" cy="160" r="2" /><circle cx="106" cy="196" r="2" />
        <circle cx="222" cy="80" r="2" /><circle cx="222" cy="120" r="2" /><circle cx="222" cy="160" r="2" /><circle cx="222" cy="196" r="2" />
      </g>
      {/* neighbouring panel hinted at left */}
      <rect x="58" y="26" width="38" height="188" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />

      <g className="g21-stage" data-paused={paused ? '' : undefined}>
        {/* ===== PHASE A: channel bracket (C-profile) across the aperture top ===== */}
        <g className={a('g21-channel', 'g21-channel--anim')} style={reduced ? { opacity: 1 } : undefined}>
          <path d="M 112 64 h 104 v 12 h -6 v -6 h -92 v 6 h -6 Z"
            fill="#AEB4B9" stroke="#6E767E" strokeWidth="2" strokeLinejoin="round" />
          {/* its two fixing bolts */}
          <g fill="#6E767E">
            <circle cx="120" cy="70" r="3" />
            <circle cx="208" cy="70" r="3" />
          </g>
        </g>
        {/* "1st" tag on the channel */}
        <g opacity="0.9">
          <rect x="238" y="58" width="40" height="18" rx="4" fill="var(--accent)" />
          <text x="258" y="71" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--on-accent)">1st</text>
        </g>

        {/* ===== PHASE B: rear cover hangs onto the channel ===== */}
        <g className={a('g21-cover', 'g21-cover--anim')} style={{ transformOrigin: '164px 80px' }}>
          <rect x="114" y="78" width="100" height="116" fill="#E1E4DE" stroke="#8A9089" strokeWidth="2.5" />
          {/* hanging hooks engaging the channel lip */}
          <path d="M 126 78 v -8 h 6 v 8" fill="none" stroke="#6E767E" strokeWidth="2.5" />
          <path d="M 196 78 v -8 h 6 v 8" fill="none" stroke="#6E767E" strokeWidth="2.5" />
          {/* swage stiffeners */}
          <line x1="126" y1="112" x2="202" y2="112" stroke="#C2C6BF" strokeWidth="2" />
          <line x1="126" y1="152" x2="202" y2="152" stroke="#C2C6BF" strokeWidth="2" />
          {/* perimeter bolt heads */}
          {BOLTS.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M -4.2 0 L -2.1 -3.6 h 4.2 L 4.2 0 L 2.1 3.6 h -4.2 Z" fill="#AEB4B9" stroke="#6E767E" strokeWidth="1.4" />
            </g>
          ))}
          {/* "2nd" tag on the cover */}
          <rect x="140" y="126" width="46" height="18" rx="4" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.2" />
          <text x="163" y="139" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">2nd</text>
        </g>

        {/* ===== PHASE C: sequence highlight bolt-to-bolt ===== */}
        {!reduced && BOLTS.map(([x, y], i) => (
          <circle
            key={i}
            className={`g21-s${i + 1}--anim`}
            cx={x} cy={y} r="8.5"
            fill="none" stroke="var(--accent)" strokeWidth="2.5"
            style={{ transformOrigin: `${x}px ${y}px` }}
            opacity="0"
          />
        ))}

        {/* ===== BOM count badge ===== */}
        <g className={a('g21-bom', 'g21-bom--anim')} style={reduced ? { opacity: 1 } : undefined}>
          <rect x="236" y="150" width="72" height="40" rx="6" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1.5" />
          <text x="272" y="166" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink2)">×6 = BOM</text>
          <path d="M 262 176 l 4.5 5 l 9 -10" fill="none" stroke="var(--ok, #2e9e5b)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* title badge */}
      <rect x="12" y="26" width="40" height="150" rx="0" fill="none" />
      <rect x="236" y="98" width="72" height="22" rx="5" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="1" />
      <text x="272" y="113" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink2)">SEQ 1→6</text>
    </svg>
  )
}
