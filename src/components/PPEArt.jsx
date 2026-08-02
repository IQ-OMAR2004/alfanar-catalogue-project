// Full-colour PPE artwork — the safety-equipment counterpart to <ToolIcon>.
//
// <Icon> carries thin single-colour line glyphs, which read well as UI chrome
// but do not tell a worker across a shop floor which glove or which mask they
// are looking at. These are little illustrations of the real items instead:
// the yellow hard hat with its brim and ratchet, the clear-lens glasses with
// side shields, the white FFP mask with its nose clip and straps, the orange
// class-rated rubber gauntlet next to the grey knitted work glove.
//
// Hearing protection is deliberately ONE piece of equipment — a headband
// defender drawn over the head, not a pair of loose cups. It is worn as one
// thing and it is put on as one thing.
//
// Drawn in a 24×24 box like <Icon> so the two are interchangeable at any size.

const O = {
  fill: 'none',
  stroke: '#3B4650',
  strokeWidth: 0.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
const INK = '#3B4650'
const HIGHLIGHT = 'rgba(255,255,255,0.55)'

const ART = {
  // ------------------------------------------------------------ head
  // Hard hat: shell, brim, ratchet band, moulded ribs, specular highlight.
  safety_helmet: (
    <>
      <path d="M2.4 16.6h19.2a1 1 0 0 1 0 2H2.4a1 1 0 0 1 0-2z" {...O} fill="#E4A81C" />
      <path d="M4.6 16.6a7.4 7.4 0 0 1 14.8 0z" {...O} fill="#F2BE2C" />
      <path d="M11.999 9.2a7.4 7.4 0 0 0-7.4 7.4h2.3c0-4 2.2-7.4 5.1-7.4z" fill={HIGHLIGHT} stroke="none" />
      <path d="M12 9.25v7.35" {...O} stroke="#C08E12" />
      <path d="M8.9 10.1c-.9 1.9-1.3 4.2-1.3 6.5M15.1 10.1c.9 1.9 1.3 4.2 1.3 6.5" {...O} stroke="#C08E12" />
      <rect x="7.4" y="14.2" width="9.2" height="2" rx="1" {...O} fill="#C08E12" />
    </>
  ),
  // Bump cap: soft navy cap with a stitched peak.
  safety_cap: (
    <>
      <path d="M19.6 15.7h1.9a1 1 0 0 1 0 2.1H4.6" {...O} fill="#1F5C93" />
      <path d="M4.6 15.7a7.4 7.4 0 0 1 14.8 0z" {...O} fill="#2C7AC0" />
      <path d="M11.999 8.3a7.4 7.4 0 0 0-7.4 7.4h2.2c0-4 2.3-7.4 5.2-7.4z" fill={HIGHLIGHT} stroke="none" />
      <path d="M12 8.35v7.35M8.7 9.3c-1 1.9-1.5 4-1.5 6.4M15.3 9.3c1 1.9 1.5 4 1.5 6.4" {...O} stroke="#1F5C93" />
      <circle cx="12" cy="8.1" r="0.9" fill="#1F5C93" stroke="none" />
    </>
  ),

  // ------------------------------------------------------------ eyes / face
  // Safety glasses: wrap lens, brow bar, side shields, folded temples.
  safety_glasses: (
    <>
      <path d="M2.6 9.6h18.8l-.7 2.1H3.3z" {...O} fill="#5B6873" />
      <path d="M3.4 11.6h7.3a1.4 1.4 0 0 1 1.3 1.9l-.4 1.2a2.6 2.6 0 0 1-2.4 1.7H6.4a3.2 3.2 0 0 1-3-2.2z"
        {...O} fill="#BFE3F5" fillOpacity="0.85" />
      <path d="M20.6 11.6h-7.3a1.4 1.4 0 0 0-1.3 1.9l.4 1.2a2.6 2.6 0 0 0 2.4 1.7h2.8a3.2 3.2 0 0 0 3-2.2z"
        {...O} fill="#BFE3F5" fillOpacity="0.85" />
      <path d="M4.6 12.4h4.1l-2.6 3.2" stroke={HIGHLIGHT} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M2.6 9.9 1.1 8.6M21.4 9.9l1.5-1.3" {...O} stroke="#5B6873" strokeWidth="1.3" />
    </>
  ),
  // Face shield: clear visor on a browguard with a headband.
  face_shield: (
    <>
      <path d="M4.2 7.4h15.6v1.9H4.2z" {...O} fill="#4A5661" />
      <path d="M4.6 9.3h14.8v5.4a7.4 7.4 0 0 1-14.8 0z" {...O} fill="#CFEAF8" fillOpacity="0.85" />
      <path d="M6.6 9.3v5.4a5.4 5.4 0 0 0 1.7 3.9" stroke={HIGHLIGHT} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M6.4 7.4a5.8 5.8 0 0 1 11.2 0" {...O} stroke="#4A5661" />
      <rect x="9.6" y="4.6" width="4.8" height="1.7" rx="0.8" {...O} fill="#5B6873" />
    </>
  ),
  // Arc-flash hood with a tinted window.
  arc_flash_hood: (
    <>
      <path d="M5 9.6a7 7 0 0 1 14 0v6.2a3.4 3.4 0 0 1-3.4 3.4H8.4A3.4 3.4 0 0 1 5 15.8z" {...O} fill="#D9DEE3" />
      <path d="M12 2.7a7 7 0 0 0-7 6.9v6.2a3.4 3.4 0 0 0 2 3.1V9.6A5 5 0 0 1 12 4.7z" fill={HIGHLIGHT} stroke="none" />
      <rect x="7.1" y="8.6" width="9.8" height="4.8" rx="1.6" {...O} fill="#33556B" />
      <path d="M8.4 9.6h2.6l-2.2 2.9" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M8.8 19.2v1.9h6.4v-1.9" {...O} fill="#D9DEE3" />
    </>
  ),
  // FFP dust mask: moulded cup, aluminium nose clip, two head straps.
  dust_mask: (
    <>
      <path d="M2.8 10.4 12 8.9l9.2 1.5" {...O} stroke="#8E99A3" />
      <path d="M4.1 9.6c2.6-1 5.2-1.4 7.9-1.4s5.3.4 7.9 1.4c0 5.4-3.2 8.7-7.9 8.7s-7.9-3.3-7.9-8.7z"
        {...O} fill="#F4F7F9" />
      <path d="M12 8.2c-2.7 0-5.3.4-7.9 1.4 0 3.6 1.4 6.3 3.7 7.7-1.1-1.9-1.6-4.4-1.6-7.4 1.9-.9 3.8-1.4 5.8-1.5z"
        fill={HIGHLIGHT} stroke="none" />
      <path d="M4.4 12.1c5-1.2 10.2-1.2 15.2 0M5.5 15c4.1-1 8.9-1 13 0" {...O} stroke="#C6CFD6" />
      <rect x="8.6" y="9.1" width="6.8" height="1.5" rx="0.7" {...O} fill="#B9C2C9" />
      <path d="M4.1 10.3 1.4 12.6M19.9 10.3l2.7 2.3" {...O} stroke="#8E99A3" />
    </>
  ),

  // ------------------------------------------------------------ ears
  // ONE unit: headband defender worn over the head, both cups on the band.
  hearing_protection: (
    <>
      <path d="M4.6 15.4V11a7.4 7.4 0 0 1 14.8 0v4.4" {...O} fill="none" stroke="#2C3A45" strokeWidth="2.4" />
      <path d="M6.3 12.2A5.8 5.8 0 0 1 12 6.6" stroke={HIGHLIGHT} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <rect x="1.9" y="11.6" width="5.6" height="8" rx="2.6" {...O} fill="#E4A81C" />
      <rect x="16.5" y="11.6" width="5.6" height="8" rx="2.6" {...O} fill="#E4A81C" />
      <rect x="3.1" y="12.9" width="3.2" height="5.4" rx="1.6" {...O} fill="#F2BE2C" />
      <rect x="17.7" y="12.9" width="3.2" height="5.4" rx="1.6" {...O} fill="#F2BE2C" />
      <path d="M3.4 14.1v3.1" stroke={HIGHLIGHT} strokeWidth="1" fill="none" strokeLinecap="round" />
    </>
  ),

  // ------------------------------------------------------------ hands
  // Knitted work glove with a leather palm patch and a ribbed cuff.
  gloves: (
    <>
      <path d="M6.4 21.4v-6.6l-1.6-1.1a1.5 1.5 0 0 1 2.1-2.1l1.2 1.1V5.4a1.4 1.4 0 0 1 2.8 0v5.3m0 0V4.4a1.4 1.4 0 0 1 2.8 0v6.3m0 0V5.9a1.4 1.4 0 0 1 2.8 0v8.2a7.4 7.4 0 0 1-1.3 4.2l-.9 1.2v1.9z"
      {...O} fill="#5E9BD1" />
      <path d="M8.1 12.7v-7.3a1.4 1.4 0 0 1 2.8 0" {...O} stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
      <path d="M6.4 18.2h9.9" {...O} stroke="#3E75A6" />
      <path d="M6.4 21.4v-3.2h9.9v3.2z" {...O} fill="#3E75A6" />
      <path d="M9.6 14.5c1.6-.7 3.3-.7 4.9 0" {...O} stroke="#3E75A6" />
    </>
  ),
  // Class-rated insulating gauntlet: orange rubber, long cuff, class mark.
  insulated_gloves: (
    <>
      <path d="M6.1 21.6v-7.9l-1.7-1.2a1.6 1.6 0 0 1 2.2-2.2l1.3 1.2V4.9a1.5 1.5 0 0 1 3 0v5.6m0 0V3.8a1.5 1.5 0 0 1 3 0v6.7m0 0V5.4a1.5 1.5 0 0 1 3 0v8.7a7.9 7.9 0 0 1-1.4 4.5l-1 1.3v1.7z"
      {...O} fill="#E8873C" />
      <path d="M8.2 12.2V4.9a1.5 1.5 0 0 1 3 0" {...O} stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
      <path d="M6.1 17.4h9.6" {...O} stroke="#C0692A" />
      <text x="11" y="20.8" textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#7A3F14"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}>00</text>
    </>
  ),

  // ------------------------------------------------------------ arms / body
  // Cut-resistant sleeve with elasticated ends.
  arm_sleeves: (
    <>
      <path d="M8.6 3.4h6.8l1.5 15.4a3.2 3.2 0 0 1-3.2 3.5h-3.4a3.2 3.2 0 0 1-3.2-3.5z" {...O} fill="#6E7B87" />
      <path d="M8.6 3.4h2.3L9.4 22.3h-.7a3.2 3.2 0 0 1-3.2-3.5z" fill={HIGHLIGHT} stroke="none" />
      <rect x="8.1" y="3.4" width="7.8" height="2.2" rx="1.1" {...O} fill="#4E5A65" />
      <rect x="8.4" y="19.6" width="7.2" height="2.4" rx="1.2" {...O} fill="#4E5A65" />
      <path d="M8.9 9.1h6.2M9.1 12.6h6" {...O} stroke="#54616C" />
    </>
  ),
  // Hi-vis vest: yellow body, silver retro-reflective bands, front zip.
  hi_vis: (
    <>
      <path d="M8.4 3.2 12 6.1l3.6-2.9 4.1 2.2-1.4 5.2 1.4 10.2H4.3l1.4-10.2L4.3 5.4z" {...O} fill="#D8E63A" />
      <path d="M8.4 3.2 12 6.1 9.9 20.8H4.3l1.4-10.2L4.3 5.4z" fill="rgba(255,255,255,0.35)" stroke="none" />
      <path d="M9.4 8.4 10.6 20.8M14.6 8.4 13.4 20.8" {...O} stroke="#C9D2DA" strokeWidth="1.8" />
      <path d="M4.9 13.4h14.2" {...O} stroke="#C9D2DA" strokeWidth="1.8" />
      <path d="M12 6.1v14.7" {...O} stroke="#A9B617" />
    </>
  ),

  // ------------------------------------------------------------ feet
  // Steel-toe safety boot with a lugged sole and a toe cap.
  safety_boots: (
    <>
      <path d="M5.6 3.9h5.1v8.4l6.4 2.7a3.6 3.6 0 0 1 2.3 3.4v1.3H5.6z" {...O} fill="#4A5560" />
      <path d="M5.6 3.9h1.9v15.8H5.6z" fill={HIGHLIGHT} stroke="none" />
      <path d="M10.7 12.3 17 15a3.6 3.6 0 0 1 2.3 3.4H12z" {...O} fill="#5E6B77" />
      <path d="M3.4 19.7h17.2v1.9a.8.8 0 0 1-.8.8H4.2a.8.8 0 0 1-.8-.8z" {...O} fill="#2C343B" />
      <path d="M5.6 21.6v.8M8.6 21.6v.8M11.6 21.6v.8M14.6 21.6v.8M17.6 21.6v.8" {...O} stroke="#1E2429" />
      <path d="M6.2 6.4h4.5M6.2 9.1h4.5" {...O} stroke="#39434D" />
    </>
  ),

  // ------------------------------------------------------------ area kit
  // Local fume extraction arm with a hood.
  fume_extraction: (
    <>
      <path d="M13.4 4.1h7.2a1.2 1.2 0 0 1 1.2 1.2v2.4a1.2 1.2 0 0 1-1.2 1.2h-7.2z" {...O} fill="#8E99A3" />
      <path d="M13.4 3.1v6.8l-4.6 2.4v-11.6z" {...O} fill="#B9C2C9" />
      <path d="M8.8 6.4 4.1 8.9a2.4 2.4 0 0 0-1.3 2.1v9.6" {...O} stroke="#5E6B77" strokeWidth="2.2" fill="none" />
      <circle cx="2.8" cy="21.3" r="1.5" {...O} fill="#5E6B77" />
      <path d="M15.6 5.9h4.4" {...O} stroke="#6E7B87" />
    </>
  ),
}

export const PPE_ART_NAMES = Object.keys(ART)
export const hasPPEArt = (name) => Object.prototype.hasOwnProperty.call(ART, name)

export default function PPEArt({ name, size = 24, className, style, title }) {
  const art = ART[name]
  if (!art) return null
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
      {art}
    </svg>
  )
}
