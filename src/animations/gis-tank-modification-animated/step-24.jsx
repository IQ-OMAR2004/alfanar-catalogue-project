export default function StepAnimation({ paused = false, reduced = false }) {
  const anim = (base) => (reduced ? base : `${base} ${base}--anim`)
  return (
    <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Wipe the CT support pipes clean with tissue and methanol, inside and out">
      <style>{`
        @keyframes ga24-wipe { 0% { transform: translateX(0) } 50% { transform: translateX(118px) } 100% { transform: translateX(0) } }
        @keyframes ga24-shine { 0% { opacity: 0 } 20% { opacity: 0 } 28% { opacity: 0.85 } 70% { opacity: 0.85 } 100% { opacity: 0 } }
        @keyframes ga24-drip { 0% { transform: translateY(0); opacity: 0 } 12% { opacity: 1 } 70% { opacity: 1 } 100% { transform: translateY(30px); opacity: 0 } }
        @keyframes ga24-spark { 0% { opacity: 0; transform: scale(0.4) } 50% { opacity: 1; transform: scale(1) } 100% { opacity: 0; transform: scale(0.4) } }
        .ga24-cloth { transform-box: fill-box; transform-origin: 50% 50%; }
        .ga24-cloth--anim { animation: ga24-wipe 3s ease-in-out infinite; }
        .ga24-shine { opacity: 0; }
        .ga24-shine--anim { animation: ga24-shine 3s ease-in-out infinite; }
        .ga24-drip { opacity: 0; transform-box: fill-box; transform-origin: 50% 0%; }
        .ga24-drip--anim { animation: ga24-drip 3s linear infinite; }
        .ga24-drip2 { opacity: 0; transform-box: fill-box; transform-origin: 50% 0%; }
        .ga24-drip2--anim { animation: ga24-drip 3s linear infinite; animation-delay: 1.4s; }
        .ga24-spark { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga24-spark--anim { animation: ga24-spark 3s ease-in-out infinite; }
        .ga24-spark2 { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
        .ga24-spark2--anim { animation: ga24-spark 3s ease-in-out infinite; animation-delay: 1s; }
        .ga24-stage[data-paused] * { animation-play-state: paused !important; }
      `}</style>
      <g className="ga24-stage" data-paused={paused ? '' : undefined}>
        {/* table the pipe rests on */}
        <rect x="34" y="172" width="232" height="10" rx="4" fill="var(--slate)" />
        <rect x="50" y="182" width="14" height="30" rx="3" fill="var(--slate)" opacity="0.6" />
        <rect x="236" y="182" width="14" height="30" rx="3" fill="var(--slate)" opacity="0.6" />

        {/* CT support pipe — a hollow tube, inside + outside */}
        <rect x="48" y="128" width="206" height="40" rx="20" fill="var(--navy)" />
        <rect x="52" y="132" width="198" height="32" rx="16" fill="var(--panel-2)" />
        {/* open bore on the right showing the inside surface */}
        <ellipse cx="250" cy="148" rx="9" ry="18" fill="var(--bg)" stroke="var(--ink2)" strokeWidth="2.5" />
        <ellipse cx="250" cy="148" rx="4" ry="10" fill="var(--slate)" opacity="0.6" />

        {/* clean shine trail revealed along the pipe surface */}
        <g className={anim('ga24-shine')}>
          <rect x="60" y="136" width="176" height="8" rx="4" fill="#fff" opacity="0.7" />
        </g>
        <g className={anim('ga24-spark')}>
          <path d="M92 134 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#fff" />
        </g>
        <g className={anim('ga24-spark2')}>
          <path d="M174 134 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#fff" />
        </g>

        {/* methanol drips falling onto the pipe */}
        <g className={anim('ga24-drip')}>
          <path d="M118 112 q-6 8 0 12 q6 -4 0 -12 z" fill="var(--sky)" />
        </g>
        <g className={anim('ga24-drip2')}>
          <path d="M168 112 q-6 8 0 12 q6 -4 0 -12 z" fill="var(--sky)" />
        </g>

        {/* tissue cloth wiping back and forth across the pipe */}
        <g className={anim('ga24-cloth')}>
          <path d="M70 116 q14 -10 30 0 q14 10 30 0 l4 30 q-16 10 -34 0 q-16 -10 -34 0 z"
            fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2.5" />
          <path d="M82 124 l0 26" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
          <path d="M100 122 l0 28" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
          <path d="M118 124 l0 26" stroke="var(--ink2)" strokeWidth="2" opacity="0.4" />
        </g>

        {/* methanol bottle */}
        <rect x="270" y="120" width="26" height="44" rx="6" fill="var(--accent)" opacity="0.95" />
        <rect x="277" y="110" width="12" height="12" rx="3" fill="var(--ink2)" />
        <rect x="274" y="134" width="18" height="16" rx="3" fill="var(--on-accent)" opacity="0.85" />

        {/* labels */}
        <rect x="34" y="44" width="104" height="24" rx="7" fill="var(--accent2)" />
        <text x="86" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--on-accent)">METHANOL</text>
        <rect x="146" y="44" width="56" height="24" rx="7" fill="var(--panel)" stroke="var(--ink2)" strokeWidth="2" />
        <text x="174" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">CLEAN</text>
      </g>
    </svg>
  )
}
