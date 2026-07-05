// GIS Tank Modification — Step 2: "Clean the tank thoroughly"
// Open tank interior; a gloved hand with a white tissue wipes in circles while a
// vacuum nozzle sucks dust particles (dust dots fade out). A methanol bottle
// stands beside the tank. Loop ~4s.

export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)

  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Gloved hand wiping the tank interior with tissue while a vacuum nozzle removes dust; methanol bottle beside"
    >
      <style>{`
        .g2-stage[data-paused] * { animation-play-state: paused !important; }

        /* gloved hand + tissue moves in slow circles on the tank wall */
        .g2-wipe--anim { animation: g2-wipe 4s ease-in-out infinite; }
        @keyframes g2-wipe {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(14px, -8px); }
          50%  { transform: translate(26px, 4px); }
          75%  { transform: translate(10px, 12px); }
          100% { transform: translate(0px, 0px); }
        }
        /* shine trail follows behind the wipe */
        .g2-shine--anim { animation: g2-shine 4s ease-in-out infinite; }
        @keyframes g2-shine {
          0%,10%   { opacity: 0; }
          45%      { opacity: 0.7; }
          85%,100% { opacity: 0; }
        }
        /* vacuum nozzle sweeps along the tank floor */
        .g2-vac--anim { animation: g2-vac 4s ease-in-out infinite; }
        @keyframes g2-vac {
          0%,100% { transform: translateX(0px); }
          50%     { transform: translateX(-46px); }
        }
        /* dust dots get pulled to the nozzle and vanish */
        .g2-dustA--anim { animation: g2-dustA 4s ease-in infinite; }
        @keyframes g2-dustA {
          0%       { opacity: 0.9; transform: translate(0,0); }
          40%      { opacity: 0.9; transform: translate(0,0); }
          58%      { opacity: 0; transform: translate(10px,6px) scale(0.3); }
          100%     { opacity: 0; }
        }
        .g2-dustB--anim { animation: g2-dustB 4s ease-in infinite; }
        @keyframes g2-dustB {
          0%       { opacity: 0.9; transform: translate(0,0); }
          20%      { opacity: 0.9; transform: translate(0,0); }
          38%      { opacity: 0; transform: translate(-10px,6px) scale(0.3); }
          100%     { opacity: 0; }
        }
        .g2-dustC--anim { animation: g2-dustC 4s ease-in infinite; }
        @keyframes g2-dustC {
          0%,60%   { opacity: 0.9; transform: translate(0,0); }
          78%      { opacity: 0; transform: translate(6px,4px) scale(0.3); }
          100%     { opacity: 0; }
        }
        /* suction lines flicker at the nozzle mouth */
        .g2-suck--anim { animation: g2-suck 0.8s ease-in-out infinite; }
        @keyframes g2-suck {
          0%,100% { opacity: 0.2; }
          50%     { opacity: 0.9; }
        }
      `}</style>

      <rect x="0" y="0" width="320" height="240" fill="var(--panel)" />
      <rect x="0" y="216" width="320" height="24" fill="#B9BDB6" />

      {/* ===== open tank, cut-away interior view ===== */}
      {/* outer tank walls */}
      <path d="M 40 44 h 200 v 12 h -14 v 116 h -172 V 56 h -14 Z" fill="#D7DAD4" stroke="#7C837B" strokeWidth="2.5" strokeLinejoin="round" />
      {/* open flange faces with stud row (cover removed) */}
      <rect x="34" y="40" width="212" height="10" rx="2" fill="#C2C6BF" stroke="#7C837B" strokeWidth="2" />
      {[52, 80, 108, 136, 164, 192, 220].map((cx) => (
        <circle key={cx} cx={cx} cy="45" r="2" fill="#9BA19A" />
      ))}
      {/* interior cavity */}
      <rect x="60" y="56" width="160" height="110" fill="#A9AEA6" stroke="#7C837B" strokeWidth="2" />
      <rect x="66" y="62" width="148" height="98" fill="#C2C6BF" />
      {/* interior floor */}
      <rect x="66" y="146" width="148" height="14" fill="#B4B9B1" />

      {/* methanol bottle beside the tank */}
      <g transform="translate(268 128)">
        <path d="M 6 0 h 10 v 8 q 8 4 8 14 v 40 a 4 4 0 0 1 -4 4 H 2 a 4 4 0 0 1 -4 -4 V 22 q 0 -10 8 -14 Z" fill="#E8ECEF" stroke="#8A9089" strokeWidth="2" strokeLinejoin="round" />
        <rect x="4" y="-6" width="14" height="7" rx="1.5" fill="#C0392B" stroke="#8E2C1A" strokeWidth="1.5" />
        <rect x="0" y="26" width="22" height="24" rx="2" fill="#FFFFFF" stroke="#C0392B" strokeWidth="1.2" />
        <rect x="0" y="26" width="22" height="6" fill="#C0392B" />
        <text x="11" y="43" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#1E2226">CH3OH</text>
      </g>
      {/* tissue roll next to the bottle */}
      <g transform="translate(246 178)">
        <rect x="-8" y="0" width="16" height="18" rx="3" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="8" ry="3.4" fill="#FFFFFF" stroke="#8A9089" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="3" ry="1.4" fill="#C2C6BF" />
      </g>
      {/* chemical gloves reminder icon */}
      <g transform="translate(30 20)">
        <path d="M -6 -10 v 12 a 6 6 0 0 0 12 0 v -12" fill="#0A82C6" stroke="#075E8F" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M -6 -3 q -5 -1 -5 -6" fill="none" stroke="#075E8F" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <g className="g2-stage" data-paused={paused ? '' : undefined}>
        {/* shine left by wiping */}
        <g className={anim('g2-shine')} style={reduced ? { opacity: 0.5 } : undefined}>
          <path d="M 96 86 q 20 -12 42 -2" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <path d="M 100 100 q 18 -8 34 0" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        </g>

        {/* gloved hand + white tissue, wiping in circles */}
        <g transform="translate(112 88)">
          <g className={anim('g2-wipe')}>
            {/* tissue pad */}
            <rect x="-16" y="2" width="34" height="24" rx="5" fill="#FFFFFF" stroke="#B9BDB6" strokeWidth="1.6" />
            <path d="M -10 8 q 8 4 22 1 M -10 15 q 8 4 22 1" fill="none" stroke="#D7DAD4" strokeWidth="1.4" />
            {/* blue chemical glove over the tissue */}
            <path d="M -8 -18 q -10 2 -10 12 q 0 8 8 10 l 22 4 q 10 1 12 -8 q 2 -9 -8 -12 Z" fill="#0A82C6" stroke="#075E8F" strokeWidth="2" strokeLinejoin="round" />
            {/* fingers */}
            <path d="M -4 4 l 20 3 M -3 -3 l 21 3 M -2 -10 l 20 3" fill="none" stroke="#075E8F" strokeWidth="1.6" strokeLinecap="round" />
            {/* cuff */}
            <rect x="-22" y="-14" width="9" height="16" rx="3" fill="#075E8F" />
            {/* circular wipe motion hint */}
            <path d="M 30 -14 a 16 12 0 1 1 -6 -14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
            <path d="M 22 -30 l 4 3 l -6 3" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* dust particles on the floor (sucked away in waves) */}
        <g fill="#6E767E">
          <g className={anim('g2-dustA')}><circle cx="120" cy="150" r="2.2" /><circle cx="128" cy="154" r="1.5" /></g>
          <g className={anim('g2-dustB')}><circle cx="168" cy="152" r="2" /><circle cx="176" cy="149" r="1.4" /></g>
          <g className={anim('g2-dustC')}><circle cx="100" cy="153" r="1.8" /><circle cx="146" cy="150" r="1.5" /></g>
        </g>

        {/* vacuum nozzle sweeping the tank floor */}
        <g transform="translate(196 128)">
          <g className={anim('g2-vac')}>
            {/* hose out of frame */}
            <path d="M 10 0 q 26 -14 40 -46" fill="none" stroke="#26292C" strokeWidth="6" strokeLinecap="round" />
            {/* nozzle body */}
            <rect x="-8" y="-4" width="22" height="10" rx="3" fill="#2B2F33" stroke="#1E2226" strokeWidth="1.5" transform="rotate(38)" />
            <path d="M -20 22 l 14 -14 l 6 6 l -12 16 Z" fill="#3A3F45" stroke="#1E2226" strokeWidth="1.5" strokeLinejoin="round" />
            {/* suction flicker lines at the mouth */}
            <g className={anim('g2-suck')} stroke="#8FA6B3" strokeWidth="1.6" strokeLinecap="round" style={reduced ? { opacity: 0.5 } : undefined}>
              <path d="M -30 30 l 8 -6" />
              <path d="M -24 36 l 6 -8" />
              <path d="M -32 24 l 9 -3" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
