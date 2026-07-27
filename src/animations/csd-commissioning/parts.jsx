// Shared drawing parts for the CSD commissioning-test animations.
//
// Every test in the manual is some variation of "connect an instrument to one
// phase of a three-phase device, earth the other two, inject something, read a
// value", so the switchgear, the instruments and the earth symbols are drawn
// once here instead of fifteen times. Each animation file composes these and
// adds only the motion that is specific to its test.
//
// This module has no default export on purpose — the animation registry maps a
// step's `media.src` to a module's default export, so nothing can accidentally
// resolve "csd-commissioning/parts" as a step animation.

// These are connection DIAGRAMS, not scenes: dark line-work on a light drawing
// sheet, exactly like the diagrams printed in the manual. So the palette is
// fixed rather than themed — a schematic that inverted with the app theme would
// be unreadable in one of the two, and the photo edition of the same step shows
// the manual's own white-background diagram right beside it.
export const PHASE = { R: '#D8352A', Y: '#E3B505', B: '#2E86C8' }
export const SHEET = '#F2F6FA'
export const INK = '#38434F'
export const INK2 = '#5A6672'
export const SLATE = '#7A8794'
export const LINE = '#C9D2DA'
export const WARN = '#C0392B'
export const WARN_TINT = '#FBE3E0'
export const ACCENT = '#0A6FA8'
export const ACCENT_TINT = '#DCEEF9'
export const OK = '#1F8A5F'
export const OK_TINT = '#E2F2EA'
export const CASE = '#D6DBE0'
export const CASE_DK = '#9AA3AB'
export const LEAD = '#1E2226'

// ---------------------------------------------------------------- switchgear
// Three phases dropping into a device with an isolating contact per phase and a
// common bottom bar — the shape the manual draws inside its pink circle.
// `live` names the phase under test; `earthed` lists the phases tied to earth.
export function ThreePhase({ x = 0, y = 0, live = 'R', earthed = ['Y', 'B'], closed = true }) {
  const cols = [
    { k: 'R', cx: 0 },
    { k: 'Y', cx: 42 },
    { k: 'B', cx: 84 },
  ]
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* incoming busbars */}
      {[0, 9, 18].map((dy, i) => (
        <line key={i} x1="-16" y1={dy} x2="118" y2={dy} stroke="#8A6A4A" strokeWidth="2.4" />
      ))}

      {cols.map(({ k, cx }) => {
        const on = k === live
        const earth = earthed.includes(k)
        return (
          <g key={k} transform={`translate(${cx} 0)`}>
            <text
              x="0" y="40" textAnchor="middle"
              fontSize="17" fontWeight="700" fill={PHASE[k]}
              style={{ fontFamily: 'var(--font-mono, monospace)' }}
            >
              {k}
            </text>
            {/* fixed contact + moving blade */}
            <line x1="0" y1="18" x2="0" y2="46" stroke={INK} strokeWidth="3" />
            <line
              x1="0" y1="52"
              x2={closed ? 0 : 11} y2={closed ? 84 : 80}
              stroke={INK} strokeWidth="3" strokeLinecap="round"
            />
            <line x1="0" y1="84" x2="0" y2="96" stroke={INK} strokeWidth="3" />
            <circle cx="0" cy="96" r="4" fill={CASE_DK} stroke={INK} strokeWidth="1.4" />
            {on && <circle cx="0" cy="18" r="5.5" fill="none" stroke={PHASE[k]} strokeWidth="2" />}
            {earth && <circle cx="0" cy="18" r="3.4" fill={INK} />}
          </g>
        )
      })}

      {/* common bottom bar */}
      <rect x="-14" y="90" width="112" height="12" rx="3" fill="none" stroke={INK} strokeWidth="2" />
    </g>
  )
}

// --------------------------------------------------------------------- earth
export function Earth({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="0" y1="-12" x2="0" y2="0" stroke={INK} strokeWidth="2.4" />
      <line x1="-13" y1="0" x2="13" y2="0" stroke={INK} strokeWidth="2.6" />
      <line x1="-8.5" y1="5" x2="8.5" y2="5" stroke={INK} strokeWidth="2.6" />
      <line x1="-4" y1="10" x2="4" y2="10" stroke={INK} strokeWidth="2.6" />
    </g>
  )
}

// ------------------------------------------------------------- IR tester box
// The Megger-style insulation tester: hard case, analogue window, three
// terminals. `value` prints in the window; `on` lights the run lamp.
export function Megger({ x = 0, y = 0, value = '', label = '', scale = 1, lampClass = '' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="6" width="96" height="66" rx="7" fill={CASE} stroke={CASE_DK} strokeWidth="2" />
      <rect x="8" y="0" width="80" height="12" rx="4" fill={CASE_DK} />
      <rect x="12" y="18" width="52" height="34" rx="3" fill="#EDF1F4" stroke={CASE_DK} strokeWidth="1.4" />
      <text
        x="38" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}
        style={{ fontFamily: 'var(--font-mono, monospace)' }}
      >
        {value}
      </text>
      {/* terminals: earth / guard / line */}
      <circle cx="74" cy="22" r="5" fill="#1E2226" />
      <circle cx="74" cy="36" r="5" fill="#2E86C8" />
      <circle cx="74" cy="50" r="5" fill="#D8352A" />
      <circle cx="20" cy="62" r="4" fill="#D8352A" className={lampClass} />
      {label && (
        <text x="48" y="88" textAnchor="middle" fontSize="11" fill={INK2}>
          {label}
        </text>
      )}
    </g>
  )
}

// --------------------------------------------------- micro-ohm / current set
// The yellow contact-resistance set from the manual.
export function CurrentSet({ x = 0, y = 0, value = '', label = '', scale = 1, lampClass = '' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="4" width="100" height="68" rx="8" fill="#E8C31B" stroke="#A88F13" strokeWidth="2" />
      <rect x="10" y="14" width="58" height="30" rx="3" fill="#22282C" />
      <text
        x="39" y="34" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#5BE39B"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}
      >
        {value}
      </text>
      <circle cx="80" cy="20" r="5.5" fill="#D8352A" />
      <circle cx="80" cy="36" r="5.5" fill="#1E2226" />
      <circle cx="80" cy="52" r="5.5" fill="#D8352A" />
      <circle cx="20" cy="58" r="4.5" fill="#5BE39B" className={lampClass} />
      <rect x="34" y="52" width="30" height="10" rx="2" fill="#A88F13" />
      {label && (
        <text x="50" y="88" textAnchor="middle" fontSize="11" fill={INK2}>
          {label}
        </text>
      )}
    </g>
  )
}

// ------------------------------------------------------------ breaker analyzer
export function Analyzer({ x = 0, y = 0, value = '', label = '', scale = 1, lampClass = '' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="112" height="80" rx="6" fill="#CFCBBE" stroke="#8E8A7E" strokeWidth="2" />
      <rect x="8" y="8" width="42" height="30" rx="3" fill="#9A968B" />
      <rect x="58" y="8" width="46" height="24" rx="3" fill="#22282C" />
      <text
        x="81" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5BE39B"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}
      >
        {value}
      </text>
      {/* terminal cluster */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={16 + i * 13} cy="50" r="4.5" fill="#D8352A" stroke="#7A1C15" strokeWidth="1" />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={`b${i}`} cx={16 + i * 13} cy="64" r="4.5" fill="#1E2226" />
      ))}
      <rect x="60" y="40" width="44" height="30" rx="3" fill="#B7B3A7" />
      <circle cx="72" cy="55" r="6" fill="#9A968B" stroke="#7A776D" strokeWidth="1.2" />
      <circle cx="92" cy="55" r="6" fill="#9A968B" stroke="#7A776D" strokeWidth="1.2" />
      <circle cx="104" cy="8" r="3.5" fill="#5BE39B" className={lampClass} />
      {label && (
        <text x="56" y="96" textAnchor="middle" fontSize="11" fill={INK2}>
          {label}
        </text>
      )}
    </g>
  )
}

// -------------------------------------------------------------- test leads
// A lead drawn as a polyline; pass a class to animate the dash flow.
export function Lead({ d, color = LEAD, width = 2.4, dash = '7 7', className = '' }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      className={className}
    />
  )
}

// ------------------------------------------------------------------ caption
export function Caption({ x, y, children, anchor = 'middle', size = 12, weight = 600 }) {
  return (
    <text
      x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight}
      fill={INK2} style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      {children}
    </text>
  )
}

// The pink locator circle the manual draws behind each connection diagram.
export function Locator({ cx, cy, r, tone = '#F6DDE1' }) {
  return <circle cx={cx} cy={cy} r={r} fill={tone} opacity="0.55" />
}

// Standard stage wrapper: fixed viewBox, drawing-sheet background, pause
// plumbing. The sheet keeps the line-work legible in both app themes.
export function Stage({ paused, label, children, w = 320, h = 240, cls }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
    >
      <g className={cls} data-paused={paused || undefined}>
        <rect x="0" y="0" width={w} height={h} rx="6" fill={SHEET} stroke={LINE} strokeWidth="1" />
        {children}
      </g>
    </svg>
  )
}
