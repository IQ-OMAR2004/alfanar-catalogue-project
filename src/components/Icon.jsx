// Single inline-SVG icon set — no external icon dependency, all stroke/fill use
// currentColor so icons inherit text colour and theme. Covers task icons, PPE
// icons and UI glyphs. Stroke style matches the brand book's thin line icons.

const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PATHS = {
  // ---- Task icons -------------------------------------------------------
  'lv-box': (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" {...P} />
      <path d="M8 3v18M8 8h12M8 14h12" {...P} />
      <circle cx="5.9" cy="6" r="0.6" fill="currentColor" stroke="none" />
      <path d="M14 9.5l-2 3h3l-2 3" {...P} />
    </>
  ),
  screw: (
    <>
      <path d="M12 2.5v3M9.5 4l5 0" {...P} />
      <path d="M10 6h4l-.5 3.5h-3z" {...P} />
      <path d="M11 9.5L11 20.5l1 1.5 1-1.5L13 9.5" {...P} />
      <path d="M11.2 12h1.6M11 14.5h2M10.8 17h1.9" {...P} />
    </>
  ),
  solder: (
    <>
      <path d="M3 20l7-7" {...P} />
      <path d="M9.5 12.5l3-3 2 2-3 3z" {...P} />
      <path d="M14 8l4-4 2 2-4 4" {...P} />
      <path d="M18 15c.9 1 .9 2.2 0 3-.9-.8-.9-2 0-3z" {...P} />
    </>
  ),
  switchgear: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" {...P} />
      <rect x="7" y="6" width="10" height="5" rx="1" {...P} />
      <path d="M12 7.5v2M9.5 13.5l5 3M9.5 16.5l5-3" {...P} />
      <circle cx="9.5" cy="19" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="19" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  'gis-tank': (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="1.5" {...P} />
      <path d="M9 6V4.2a1 1 0 0 1 1-1h1.4" {...P} />
      <circle cx="9" cy="12.5" r="2.4" {...P} />
      <circle cx="15" cy="12.5" r="2.4" {...P} />
      <path d="M11.6 3.2h2.2v1.8" {...P} />
      <circle cx="12.7" cy="4.1" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),

  // ---- PPE icons --------------------------------------------------------
  insulated_gloves: (
    <>
      <path d="M7 21v-7l-1.5-1a1.4 1.4 0 0 1 2-2l1 1V5.5a1.3 1.3 0 0 1 2.6 0V11m0 0V4.6a1.3 1.3 0 0 1 2.6 0V11m0 0V6a1.3 1.3 0 0 1 2.6 0v8a7 7 0 0 1-1.2 4l-.8 1" {...P} />
    </>
  ),
  gloves: (
    <>
      <path d="M7 21v-7l-1.5-1a1.4 1.4 0 0 1 2-2l1 1V5.5a1.3 1.3 0 0 1 2.6 0V11m0 0V4.6a1.3 1.3 0 0 1 2.6 0V11m0 0V6a1.3 1.3 0 0 1 2.6 0v8a7 7 0 0 1-1.2 4l-.8 1" {...P} />
    </>
  ),
  safety_glasses: (
    <>
      <path d="M2.5 10.5h19M4 10.5l1-2.5a1.5 1.5 0 0 1 1.4-1h11.2a1.5 1.5 0 0 1 1.4 1l1 2.5" {...P} />
      <rect x="3.5" y="10.5" width="7" height="5" rx="2.5" {...P} />
      <rect x="13.5" y="10.5" width="7" height="5" rx="2.5" {...P} />
      <path d="M10.5 12.5h3" {...P} />
    </>
  ),
  fume_extraction: (
    <>
      <circle cx="12" cy="12" r="2" {...P} />
      <path d="M12 10c0-3 1-5 3.5-5 1.5 0 2 1.2 2 2.2 0 1.6-1.3 2.8-3.5 2.8" {...P} />
      <path d="M12 14c0 3-1 5-3.5 5-1.5 0-2-1.2-2-2.2 0-1.6 1.3-2.8 3.5-2.8" {...P} />
      <path d="M14 12c3 0 5 1 5 3.5 0 1.5-1.2 2-2.2 2-1.6 0-2.8-1.3-2.8-3.5" {...P} />
      <path d="M10 12c-3 0-5-1-5-3.5C5 7 6.2 6.5 7.2 6.5c1.6 0 2.8 1.3 2.8 3.5" {...P} />
    </>
  ),
  arc_flash_hood: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" {...P} />
      <rect x="7.5" y="8.5" width="9" height="4.5" rx="1.5" {...P} />
      <path d="M9 18v2.5h6V18" {...P} />
    </>
  ),
  hearing_protection: (
    <>
      <path d="M6 11a6 6 0 0 1 12 0" {...P} />
      <rect x="3.5" y="11" width="4" height="7" rx="2" {...P} />
      <rect x="16.5" y="11" width="4" height="7" rx="2" {...P} />
    </>
  ),
  safety_boots: (
    <>
      <path d="M6 4v9l-1.5.8A2.5 2.5 0 0 0 3 16v3a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-1c0-2-1.6-3-3.5-3.4L11 13.5V4z" {...P} />
      <path d="M3.5 17h16.5" {...P} />
    </>
  ),
  dust_mask: (
    <>
      <path d="M4 9c3-1 5-1 8-1s5 0 8 1c0 5-3 8-8 8s-8-3-8-8z" {...P} />
      <path d="M4 11.5c5-1.2 11-1.2 16 0M5 14.5c4-1 10-1 14 0" {...P} />
    </>
  ),
  safety_helmet: (
    <>
      <path d="M3.5 16a8.5 8.5 0 0 1 17 0z" {...P} />
      <path d="M9.5 7.6a8.6 8.6 0 0 1 5 0" {...P} />
      <path d="M12 4.2v3.2M2.5 16h19" {...P} />
    </>
  ),

  // ---- UI glyphs --------------------------------------------------------
  'chevron-right': <path d="M9 5l7 7-7 7" {...P} />,
  'chevron-left': <path d="M15 5l-7 7 7 7" {...P} />,
  x: <path d="M6 6l12 12M18 6L6 18" {...P} />,
  check: <path d="M4 12.5l5 5 11-12" {...P} />,
  zoom: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" {...P} />
      <path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5" {...P} />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" {...P} />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" {...P} />
    </>
  ),
  moon: <path d="M20 13.5A8 8 0 1 1 10.5 4a6.2 6.2 0 0 0 9.5 9.5z" {...P} />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" {...P} />
      <path d="M3 12h18M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z" {...P} />
    </>
  ),
  play: <path d="M7 4.5l13 7.5-13 7.5z" fill="currentColor" stroke="none" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none" />,
  replay: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" {...P} />
      <path d="M5 3v4.5h4.5" {...P} />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.2l9 15.6H3z" {...P} />
      <path d="M12 9.5v4.2" {...P} />
      <circle cx="12" cy="16.6" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5l7 2.5v5c0 5-3 8.2-7 9.5-4-1.3-7-4.5-7-9.5V5z" {...P} />
      <path d="M9 11.5l2 2 4-4.5" {...P} />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.4" {...P} />
      <path d="M10.5 5h3" {...P} />
      <circle cx="12" cy="18.4" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="1.8" {...P} />
      <path d="M9 20h6M12 16.5V20" {...P} />
    </>
  ),
}

export default function Icon({ name, size = 24, className, style, title }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {path}
    </svg>
  )
}

export const ICON_NAMES = Object.keys(PATHS)
