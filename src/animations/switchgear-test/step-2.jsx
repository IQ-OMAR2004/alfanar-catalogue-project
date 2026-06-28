// alfanar SWI Kiosk — Switchgear Test · Step 2: "Insulation-resistance test"
// Looping motion: an insulation tester (megger) box with two test leads clipped
// to phase busbars. The TEST button is pressed, an analogue needle sweeps up the
// dial arc to a high MegaOhm reading and settles; meanwhile a soft glow travels
// along the insulation between the phases. Then it releases and the cycle repeats.
// Pure SVG + CSS. All keyframes + class names prefixed "swg2" for collision safety.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Insulation tester needle sweeping to a high megaohm reading across switchgear phases"
    >
      <style>{`
        .swg2-stage { transform-box: fill-box; }
        .swg2-stage[data-paused] * { animation-play-state: paused !important; }

        /* ---- TEST button: pressed down at the start of each cycle ---- */
        .swg2-btn { transform-box: fill-box; transform-origin: 50% 50%; }
        .swg2-btn--anim {
          animation: swg2-press 3.6s var(--ease-in-out, ease-in-out) infinite;
        }
        @keyframes swg2-press {
          0%        { transform: translateY(0); }
          6%        { transform: translateY(2.6px); }
          16%       { transform: translateY(2.6px); }
          74%       { transform: translateY(2.6px); }
          82%, 100% { transform: translateY(0); }
        }
        /* button ring glow lights while energised */
        .swg2-btnglow--anim { animation: swg2-btnglow 3.6s var(--ease-in-out, ease-in-out) infinite; }
        @keyframes swg2-btnglow {
          0%, 8%    { opacity: 0; }
          18%       { opacity: 1; }
          74%       { opacity: 1; }
          84%, 100% { opacity: 0; }
        }

        /* ---- Analogue needle: sweeps up the dial arc, holds high, resets ---- */
        /* Pivot is at the dial centre; rest = low (left), test = high (right). */
        .swg2-needle { transform-box: fill-box; transform-origin: 50% 100%; }
        .swg2-needle--anim {
          animation: swg2-sweep 3.6s cubic-bezier(.34,.0,.2,1) infinite;
        }
        @keyframes swg2-sweep {
          0%        { transform: rotate(-62deg); }   /* parked at 0 / low end */
          8%        { transform: rotate(-62deg); }
          26%       { transform: rotate(48deg); }    /* overshoots toward high MΩ */
          34%       { transform: rotate(38deg); }    /* settles on the reading */
          40%       { transform: rotate(44deg); }    /* tiny analogue quiver */
          46%       { transform: rotate(40deg); }
          74%       { transform: rotate(40deg); }    /* holds the high reading */
          90%       { transform: rotate(-62deg); }   /* falls back to park */
          100%      { transform: rotate(-62deg); }
        }

        /* ---- MΩ value readout fades in once the needle settles ---- */
        .swg2-read--anim { animation: swg2-read 3.6s var(--ease-in-out, ease-in-out) infinite; }
        @keyframes swg2-read {
          0%, 30%   { opacity: 0; }
          40%       { opacity: 1; }
          74%       { opacity: 1; }
          84%, 100% { opacity: 0; }
        }

        /* ---- Soft insulation glow travelling along the phase gap ---- */
        .swg2-spark { transform-box: fill-box; }
        .swg2-spark--anim { animation: swg2-spark 3.6s ease-in-out infinite; }
        @keyframes swg2-spark {
          0%, 14%   { opacity: 0; transform: translateY(34px) scale(0.5); }
          24%       { opacity: 1; transform: translateY(34px) scale(1); }
          50%       { opacity: 1; transform: translateY(-34px) scale(1); }
          60%, 99%  { opacity: 0; transform: translateY(-34px) scale(0.5); }
          100%      { opacity: 0; transform: translateY(34px) scale(0.5); }
        }
        .swg2-spark2 { animation-delay: 0.55s; }

        /* ---- Energised insulation bands brighten between phases ---- */
        .swg2-gap--anim { animation: swg2-gap 3.6s var(--ease-in-out, ease-in-out) infinite; }
        @keyframes swg2-gap {
          0%, 12%   { opacity: 0.18; }
          26%       { opacity: 0.95; }
          74%       { opacity: 0.95; }
          86%, 100% { opacity: 0.18; }
        }

        /* ---- Lead conductor pulse: charge runs box -> clip while testing ---- */
        .swg2-flow--anim { animation: swg2-flow 3.6s linear infinite; }
        @keyframes swg2-flow {
          0%, 10%   { stroke-dashoffset: 26; opacity: 0; }
          18%       { opacity: 1; }
          70%       { stroke-dashoffset: -26; opacity: 1; }
          80%, 100% { opacity: 0; stroke-dashoffset: -26; }
        }
      `}</style>

      {/* technical baseline */}
      <line x1="0" y1="214" x2="320" y2="214" stroke="var(--line-2)" strokeWidth="2" />

      <g className="swg2-stage" data-paused={paused ? '' : undefined}>

        {/* ================= PHASE BUSBARS (right) ================= */}
        {/* three vertical copper phases, energised insulation between them */}
        <g>
          {/* mounting rail behind the phases */}
          <rect x="226" y="44" width="78" height="150" rx="6"
            fill="var(--panel)" stroke="var(--slate)" strokeWidth="2.5" />

          {/* insulation bands between phases — brighten under test voltage */}
          <g className={anim('swg2-gap')}>
            <rect x="232" y="60" width="66" height="118" rx="4"
              fill="var(--beacon-soft, var(--accent))" opacity="0.9" />
          </g>

          {/* phase A */}
          <rect x="238" y="56" width="14" height="126" rx="4"
            fill="var(--warn)" stroke="var(--navy)" strokeWidth="2.5" />
          {/* phase B (the one under test — clip lands here) */}
          <rect x="258" y="56" width="14" height="126" rx="4"
            fill="var(--warn)" stroke="var(--navy)" strokeWidth="2.5" />
          {/* phase C */}
          <rect x="278" y="56" width="14" height="126" rx="4"
            fill="var(--warn)" stroke="var(--navy)" strokeWidth="2.5" />

          {/* phase labels for instant recognition */}
          <g fill="var(--navy)" fontFamily="system-ui, sans-serif" fontSize="9"
            fontWeight="700" textAnchor="middle">
            <text x="245" y="50">L1</text>
            <text x="265" y="50">L2</text>
            <text x="285" y="50">L3</text>
          </g>

          {/* travelling insulation glow between phase A and B */}
          <g style={{ filter: 'drop-shadow(0 0 5px var(--beacon-glow))' }}>
            <circle className={anim('swg2-spark')} cx="255" cy="119" r="3.4"
              fill="var(--accent)" opacity={reduced ? 0.85 : 0} />
            <circle className={anim('swg2-spark') + ' swg2-spark2'} cx="275" cy="119" r="3"
              fill="var(--accent2)" opacity={reduced ? 0.7 : 0} />
          </g>
        </g>

        {/* ================= TEST LEADS + CLIPS ================= */}
        {/* two insulated leads from the megger terminals to the phase clips */}
        {/* RED lead -> phase B (top terminal) */}
        <path d="M118 96 C 160 78, 196 70, 238 78"
          fill="none" stroke="var(--warn)" strokeWidth="4.5" strokeLinecap="round" />
        <path className={reduced ? undefined : 'swg2-flow--anim'}
          d="M118 96 C 160 78, 196 70, 238 78"
          fill="none" stroke="var(--on-accent)" strokeWidth="1.8" strokeLinecap="round"
          strokeDasharray="5 21" opacity={reduced ? 0 : 0} />

        {/* BLACK lead -> phase A (bottom terminal) */}
        <path d="M118 150 C 162 168, 198 170, 232 158"
          fill="none" stroke="var(--ink2)" strokeWidth="4.5" strokeLinecap="round" />
        <path className={reduced ? undefined : 'swg2-flow--anim'}
          d="M118 150 C 162 168, 198 170, 232 158"
          fill="none" stroke="var(--on-accent)" strokeWidth="1.8" strokeLinecap="round"
          strokeDasharray="5 21" opacity={reduced ? 0 : 0}
          style={{ animationDelay: '0.12s' }} />

        {/* croc clip on phase B (top, red) */}
        <g transform="translate(238 78)">
          <path d="M0 -7 L16 -5 L22 -1 L16 1 L0 3 Z"
            fill="var(--warn)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          {/* jaw teeth */}
          <path d="M6 -5 L9 -2 M11 -4 L14 -1 M16 -3 L18 -1"
            stroke="var(--navy)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* croc clip on phase A (bottom, black) */}
        <g transform="translate(232 158) scale(1 -1)">
          <path d="M0 -7 L16 -5 L22 -1 L16 1 L0 3 Z"
            fill="var(--slate)" stroke="var(--navy)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M6 -5 L9 -2 M11 -4 L14 -1 M16 -3 L18 -1"
            stroke="var(--navy)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* ================= MEGGER / INSULATION TESTER BOX ================= */}
        <g>
          {/* body */}
          <rect x="20" y="74" width="100" height="116" rx="10"
            fill="var(--navy)" stroke="var(--ink)" strokeWidth="3" />
          {/* brand strip */}
          <rect x="20" y="74" width="100" height="16" rx="10"
            fill="var(--accent)" />
          <rect x="20" y="84" width="100" height="6" fill="var(--accent)" />

          {/* terminal posts (lead anchors) */}
          <circle cx="118" cy="96" r="4.5" fill="var(--warn)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="118" cy="150" r="4.5" fill="var(--slate)" stroke="var(--ink)" strokeWidth="2" />

          {/* ---- DIAL FACE ---- */}
          {/* face plate */}
          <rect x="30" y="98" width="64" height="50" rx="6"
            fill="var(--panel-2, #ffffff)" stroke="var(--slate)" strokeWidth="2" />
          {/* dial centre at (62,142); arc radius ~30 */}
          {/* scale arc */}
          <path d="M38 142 A 26 26 0 0 1 86 142"
            fill="none" stroke="var(--slate)" strokeWidth="2" opacity="0.6" />
          {/* tick marks across the arc */}
          <g stroke="var(--ink2)" strokeWidth="1.6" strokeLinecap="round">
            <line x1="38" y1="142" x2="42" y2="140" />
            <line x1="44" y1="124" x2="47.5" y2="127" />
            <line x1="62" y1="116" x2="62" y2="120" />
            <line x1="80" y1="124" x2="76.5" y2="127" />
            <line x1="86" y1="142" x2="82" y2="140" />
          </g>
          {/* low end (0) and high end (MΩ / ∞) scale labels */}
          <g fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">
            <text x="36" y="152" fontSize="7" fill="var(--ink2)">0</text>
            <text x="62" y="113" fontSize="7" fill="var(--ink2)">MΩ</text>
            <text x="88" y="152" fontSize="8" fill="var(--ok)">∞</text>
          </g>

          {/* green "good" zone on the high end of the scale */}
          <path d="M62 142 L86 142 A 26 26 0 0 0 79.6 124.4 Z"
            fill="var(--ok)" opacity="0.16" />

          {/* digital readout of the settled value */}
          <g className={anim('swg2-read')} style={{ filter: 'drop-shadow(0 0 4px var(--beacon-glow))' }}>
            <text x="62" y="137" fontSize="11" fontWeight="800" textAnchor="middle"
              fontFamily="system-ui, sans-serif" fill="var(--ok)">500&#8201;MΩ</text>
          </g>

          {/* ---- the sweeping NEEDLE (pivot at dial centre 62,142) ---- */}
          <g className={anim('swg2-needle')}>
            <line x1="62" y1="142" x2="62" y2="119"
              stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 3px var(--beacon-glow))' }} />
          </g>
          {/* needle hub */}
          <circle cx="62" cy="142" r="4" fill="var(--ink)" stroke="var(--accent)" strokeWidth="1.6" />

          {/* ---- TEST button ---- */}
          {/* glow ring under the button (lights while energised) */}
          <circle className={reduced ? undefined : 'swg2-btnglow--anim'}
            cx="62" cy="170" r="13"
            fill="none" stroke="var(--accent)" strokeWidth="3"
            opacity={reduced ? 1 : 0}
            style={{ filter: 'drop-shadow(0 0 6px var(--beacon-glow))' }} />
          <g className={anim('swg2-btn')}>
            <circle cx="62" cy="170" r="10"
              fill="var(--accent2)" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="62" y="173.5" fontSize="6.5" fontWeight="800" textAnchor="middle"
              fontFamily="system-ui, sans-serif" fill="var(--on-accent, #ffffff)">TEST</text>
          </g>
        </g>
      </g>
    </svg>
  )
}
