// Animated icon for a tool/material chip. The tool's (localized) name is matched
// by keyword to a category; each icon moves the way the real tool works — a
// socket/ratchet drives (spins), a spanner rocks, an impact wrench buzzes, a
// crane hook lifts, a spray bottle sprays, a grease tube drips, a vacuum sucks,
// a gauge needle sweeps, a hose flows, sandpaper rubs. Honors
// prefers-reduced-motion via the global CSS override.
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Whole-icon motion per category (sub-element motion is in the JSX/CSS instead).
const SVG_ANIM = {
  socket: 'spin', ratchet: 'spin', allen: 'spin', fastener: 'spin',
  spanner: 'rock', torque: 'rock', generic: 'rock',
  impact: 'buzz', pliers: 'squeeze', sandpaper: 'rub', pin: 'insert',
  sling: 'swing', shackle: 'swing', chain: 'bob',
  tissue: 'idle', foam: 'idle', ladder: 'idle', lug: 'idle',
  wire: 'idle', gloves: 'idle', material: 'idle', adapter: 'idle', fixture: 'idle',
}
// Categories whose motion lives entirely in an animated sub-element.
const SUB_ONLY = new Set(['crane', 'hose', 'vacuum', 'machine', 'scale', 'spray', 'tube', 'clipboard'])

const ICONS = {
  socket: (
    <>
      <path d="M12 4.2l5 2.9v5.8l-5 2.9-5-2.9V7.1z" {...S} />
      <circle cx="12" cy="10" r="2.6" {...S} />
      <path d="M12 16v3.6M10.4 19.6h3.2" {...S} />
    </>
  ),
  ratchet: (
    <>
      <circle cx="12" cy="9" r="4" {...S} />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="M14.8 11.8l3 7M16 17l1.6 3.4" {...S} />
    </>
  ),
  spanner: (
    <>
      <path d="M15.5 5.2a3.6 3.6 0 0 0-4.7 4.6L4 16.6 7.4 20l6.8-6.8a3.6 3.6 0 0 0 4.6-4.7l-2.2 2.2-2.3-.5-.5-2.3z" {...S} />
    </>
  ),
  torque: (
    <>
      <path d="M5 19l8-8M11.5 12.5l2.5-2.5" {...S} />
      <circle cx="6.5" cy="20.5" r="1.5" {...S} />
      <circle cx="16" cy="8" r="4.4" {...S} />
      <line className="ta-needle" x1="16" y1="8" x2="16" y2="4.6" {...S} />
      <circle cx="16" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  impact: (
    <>
      <rect x="5" y="8" width="9" height="7" rx="1.6" {...S} />
      <path d="M9 15v4h3v-4" {...S} />
      <path d="M14 11h3.6l1.6-1.4M14 12.8h3" {...S} />
      <path className="ta-blink" d="M19.4 8.4l1.4-1M19.8 11l1.6.3" {...S} />
    </>
  ),
  allen: (
    <>
      <path d="M7 4v9a3 3 0 0 0 3 3h7" {...S} />
      <path d="M7 4l2 1.4M7 4L5 5.4M17 16l-1.6 2M17 16l-1.6-2" {...S} />
    </>
  ),
  pliers: (
    <>
      <path d="M9 4l3 6-3 9M15 4l-3 6 3 9" {...S} />
      <circle cx="12" cy="10.2" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  crane: (
    <>
      <path d="M5 4h12M5 4v15M3.4 19h3.2" {...S} />
      <path d="M16 4l1.8 2.5M16 4l-1.8 2.5M16 4v3" {...S} />
      <g className="ta-lift">
        <path d="M16 7v3.4M14.4 10.4h3.2l-1.6 3z" {...S} />
        <rect x="13.8" y="14" width="4.4" height="3.4" rx="0.6" {...S} />
      </g>
    </>
  ),
  chain: (
    <>
      <rect x="6" y="4" width="6" height="8" rx="3" {...S} />
      <rect x="12" y="11" width="6" height="8" rx="3" {...S} />
    </>
  ),
  sling: (
    <>
      <path d="M6 5h12l-3.5 12a2.5 2.5 0 0 1-5 0z" {...S} />
      <path d="M7 9h10" {...S} />
    </>
  ),
  shackle: (
    <>
      <path d="M8 14a4 4 0 1 1 8 0" {...S} />
      <path d="M8 14v3l1.4 1h5.2l1.4-1v-3" {...S} />
      <path d="M9.2 18.4h5.6" {...S} />
    </>
  ),
  hose: (
    <>
      <rect x="3.2" y="17.8" width="3.2" height="3.2" rx="1" {...S} />
      <rect x="17.6" y="2.8" width="3.2" height="3.2" rx="1" {...S} />
      <path d="M5 18c0-5 3-7 7-7s7-2 7-7" stroke="var(--line-2)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path className="ta-flow" d="M5 18c0-5 3-7 7-7s7-2 7-7" {...S} />
    </>
  ),
  adapter: (
    <>
      <rect x="3.5" y="9" width="7" height="6" rx="1" {...S} />
      <rect x="13.5" y="10" width="7" height="4" rx="1" {...S} />
      <path d="M10.5 12h3" {...S} />
    </>
  ),
  vacuum: (
    <>
      <rect x="7" y="9.5" width="10" height="10.5" rx="2" {...S} />
      <path d="M12 9.5V6a2 2 0 0 1 2-2h2.5" {...S} />
      <circle className="ta-suck" cx="12" cy="14.7" r="3" {...S} />
      <circle cx="12" cy="14.7" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  machine: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" {...S} />
      <rect x="6.5" y="7.5" width="7" height="5" rx="1" {...S} />
      <circle className="ta-blink" cx="16.5" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="M7 15.5h6M7 17h4" {...S} />
    </>
  ),
  scale: (
    <>
      <path d="M4 20h16M12 20V8" {...S} />
      <path d="M6 8h12l-2 5.5H8z" {...S} />
      <line className="ta-needle" x1="12" y1="13" x2="12" y2="9.6" {...S} />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  spray: (
    <>
      <rect x="7.5" y="9" width="6" height="11" rx="1.4" {...S} />
      <path d="M7.5 9V6.6h4V9M11.5 6.6h3l1-1.4" {...S} />
      <circle className="ta-spray ta-spray-1" cx="16" cy="5.4" r="0.9" fill="currentColor" stroke="none" />
      <circle className="ta-spray ta-spray-2" cx="16" cy="5.4" r="0.9" fill="currentColor" stroke="none" />
      <circle className="ta-spray ta-spray-3" cx="16" cy="5.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  tissue: (
    <>
      <rect x="5" y="7" width="14" height="11" rx="2" {...S} />
      <path d="M9 7c0-1.6 1.3-3 3-3s3 1.4 3 3" {...S} />
      <path d="M9 18v2M15 18v2" {...S} />
    </>
  ),
  tube: (
    <>
      <rect x="7.5" y="8.5" width="6" height="11.5" rx="1.4" {...S} />
      <path d="M8.8 8.5l1-2.4h2l1 2.4" {...S} />
      <path d="M10.5 6.1V3.9" {...S} />
      <circle className="ta-drip" cx="16.5" cy="6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  sandpaper: (
    <>
      <rect x="5" y="9" width="14" height="7" rx="1" {...S} />
      <circle cx="8" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="13" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  foam: (
    <>
      <rect x="4" y="8" width="16" height="4" rx="1" {...S} />
      <rect x="4" y="13" width="16" height="4" rx="1" {...S} />
    </>
  ),
  pin: (
    <>
      <path d="M12 3v12" {...S} />
      <path d="M9.5 3h5M10.5 15h3l-1.5 5z" {...S} />
    </>
  ),
  fixture: (
    <>
      <path d="M5 5v14M5 5h9a4 4 0 0 1 0 8H5" {...S} />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  ladder: (
    <>
      <path d="M8 3v18M16 3v18M8 7h8M8 11h8M8 15h8" {...S} />
    </>
  ),
  lug: (
    <>
      <circle cx="8" cy="12" r="3.4" {...S} />
      <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M11.2 12h4l2 2.2M11.2 12l4 0 2-2.2" {...S} />
    </>
  ),
  wire: (
    <>
      <path d="M3 14c2-3 4-3 6 0s4 3 6 0M16 11l5-3M16 11l4 4" {...S} />
    </>
  ),
  gloves: (
    <>
      <path d="M7 21v-7l-1.5-1a1.4 1.4 0 0 1 2-2l1 1V5.5a1.3 1.3 0 0 1 2.6 0V11m0 0V4.6a1.3 1.3 0 0 1 2.6 0V11m0 0V6a1.3 1.3 0 0 1 2.6 0v8a7 7 0 0 1-1.2 4l-.8 1" {...S} />
    </>
  ),
  fastener: (
    <>
      <path d="M12 3.5l4 2.3v4.6L12 12.7 8 10.4V5.8z" {...S} />
      <circle cx="12" cy="8" r="1.6" {...S} />
      <path d="M12 12.7v7.8M9.6 20.5h4.8" {...S} />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="2" {...S} />
      <path d="M9.5 4.5V3.5h5v1" {...S} />
      <path className="ta-check" d="M9 11.4l1.7 1.7L14 9.5" {...S} />
      <path d="M9 16h6" {...S} />
    </>
  ),
  material: (
    <>
      <path d="M4 8l8-3.5L20 8l-8 3.5z" {...S} />
      <path d="M4 8v6l8 3.5 8-3.5V8" {...S} />
    </>
  ),
  generic: (
    <>
      <path d="M14.5 6.5a3.4 3.4 0 0 0 4.3 4.3l-9 9-1.6-1.6 9-9a3.4 3.4 0 0 0-4.3-4.3z" {...S} />
      <path d="M5 5l4 4" {...S} />
    </>
  ),
}

function categoryFor(name) {
  const s = String(name).toLowerCase().trim()
  if (s === '—' || s === '-' || s === '') return null
  if (s.includes('torque')) return 'torque'
  if (s.includes('impact') || s.includes('drill')) return 'impact'
  if (s.includes('ratchet')) return 'ratchet'
  if (s.includes('socket')) return 'socket'
  if (s.includes('allen') || s.includes('hex')) return 'allen'
  if (s.includes('spanner') || s.includes('wrench')) return 'spanner'
  if (s.includes('crimp') || s.includes('strip')) return 'pliers'
  if (s.includes('crane')) return 'crane'
  if (s.includes('chain')) return 'chain'
  if (s.includes('belt') || s.includes('sling')) return 'sling'
  if (s.includes('shackle')) return 'shackle'
  if (s.includes('hose')) return 'hose'
  if (s.includes('adapter')) return 'adapter'
  if (s.includes('vacuum')) return 'vacuum'
  if (s.includes('pump') || s.includes('analyz') || s.includes('machine')) return 'machine'
  if (s.includes('scale')) return 'scale'
  if (s.includes('methanol') || s.includes('spray')) return 'spray'
  if (s.includes('tissue')) return 'tissue'
  if (s.includes('grease') || s.includes('molykote') || s.includes('loctite') || s.includes('silicone') || s.includes('adhesive') || s.includes('oil')) return 'tube'
  if (s.includes('sandpaper') || s.includes('grit')) return 'sandpaper'
  if (s.includes('foam')) return 'foam'
  if (s.includes('guide pin') || s.includes('pin')) return 'pin'
  if (s.includes('fixture') || s.includes('support') || s.includes('bracket')) return 'fixture'
  if (s.includes('ladder')) return 'ladder'
  if (s.includes('lug')) return 'lug'
  if (s.includes('wire')) return 'wire'
  if (s.includes('glove')) return 'gloves'
  if (s.includes('clip') || s.includes('bom') || s.includes('tag') || s.includes('checklist')) return 'clipboard'
  if (s.includes('eye bolt') || s.includes('bolt') || s.includes('nut') || s.includes('washer') || /\bm\d/.test(s)) return 'fastener'
  if (s.includes('rubber') || s.includes('insulation') || s.includes('wrap') || s.includes('protection') || s.includes('cushion') || s.includes('pallet') || s.includes('trolley')) return 'material'
  return 'generic'
}

export default function ToolIcon({ name, size = 20, delay = 0 }) {
  const cat = categoryFor(name)
  if (!cat) return null
  const motion = SUB_ONLY.has(cat) ? '' : ` ta-${SVG_ANIM[cat] || 'idle'}`
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`tool-ic${motion}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[cat]}
    </svg>
  )
}
