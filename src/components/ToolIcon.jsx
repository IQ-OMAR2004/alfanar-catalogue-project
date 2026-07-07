// Full-color miniature illustration for a tool/material chip. The tool's
// (localized) name is matched by keyword to a category; every icon is a
// realistic, instantly recognizable mini-drawing of the real item on the
// alfanar workstation (chrome sockets, Milwaukee-red impact wrench, orange
// SF6 cart, yellow bridge crane, brass DN adapters, green QC tag…) and moves
// the way the real tool works. Honors prefers-reduced-motion via the global
// CSS override.

// Palette — literal fills so icons read on light AND dark chip backgrounds.
const INK = '#4A5560'     // thin dark outline for every filled shape
const STEEL = '#C9CED4'   // chrome / polished steel
const STEELDK = '#6E767E' // chrome outline / dark steel
const RED = '#D8452B'     // Milwaukee red / Loctite / trolley frame
const BLK = '#26292C'     // battery, rubber, plastics
const ORG = '#E0701F'     // SF6 gas cart (DILO orange)
const YEL = '#F2B826'     // crane girder / spirit level
const BLU = '#2C6FB4'     // crane hoist / motor blue
const BRASS = '#C9A227'   // hose couplings, reducers, lugs
const GRN = '#1F9D6B'     // QC release tag / OK zone
const YELM = '#E8B90C'    // multimeter holster
const WHT = '#FFFFFF'     // paper, labels, solvent bottles
const GRY = '#9AA3AB'     // instrument cases, mid grey
const LCD = '#2E3A3F'     // dark displays
const LCDTXT = '#4ADE80'  // glowing readout

// Base outline props; filled shapes spread this then override `fill`.
const O = {
  fill: 'none',
  stroke: INK,
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
// Chrome line/edge work.
const C = { ...O, stroke: STEELDK }

// Whole-icon motion per category (sub-element motion is in the JSX/CSS instead).
const SVG_ANIM = {
  socket: 'spin', ratchet: 'spin', allen: 'spin', fastener: 'spin', extension: 'spin',
  spanner: 'rock', torque: 'rock', generic: 'rock', screwdriver: 'rock', level: 'rock',
  impact: 'buzz', pliers: 'squeeze', sandpaper: 'rub', pin: 'insert', plug: 'insert',
  sling: 'swing', shackle: 'swing', tag: 'swing', chain: 'bob',
  tissue: 'idle', foam: 'idle', ladder: 'idle', lug: 'idle', wire: 'idle',
  gloves: 'idle', material: 'idle', adapter: 'idle', fixture: 'idle',
  trolley: 'idle', diagram: 'idle', document: 'idle', label: 'idle', rubberpad: 'idle',
}
// Categories whose motion lives entirely in an animated sub-element.
const SUB_ONLY = new Set([
  'crane', 'hoist', 'hose', 'vacuum', 'pump', 'machine', 'analyzer', 'testset',
  'gauge', 'multimeter', 'scale', 'spray', 'tube', 'loctite', 'clipboard',
])

const ICONS = {
  // ------------------------------ hand tools ------------------------------
  // Chrome 17/24 mm socket: hex crown, cylindrical body, square drive.
  socket: (
    <>
      <path d="M12 3.2l4.4 2.5v3.1L12 11.3 7.6 8.8V5.7z" {...C} fill={STEEL} />
      <circle cx="12" cy="7.2" r="1.8" fill={BLK} stroke="none" />
      <rect x="8.6" y="11.2" width="6.8" height="6" rx="0.8" {...C} fill={STEEL} />
      <rect x="10.5" y="17.2" width="3" height="3.4" rx="0.5" {...C} fill={STEELDK} />
    </>
  ),
  // Ratchet: chrome head + drive square, chrome shaft, red rubber grip.
  ratchet: (
    <>
      <circle cx="12" cy="7.5" r="3.6" {...C} fill={STEEL} />
      <rect x="10.7" y="6.2" width="2.6" height="2.6" rx="0.4" fill={STEELDK} stroke="none" />
      <path d="M13.9 10.7l3 6.6" {...C} strokeWidth="2.8" />
      <path d="M16.9 17.3l1.7 3.4" {...O} stroke={RED} strokeWidth="3.4" />
    </>
  ),
  // Open-end spanner, drop-forged chrome.
  spanner: (
    <path
      d="M15.5 5.2a3.6 3.6 0 0 0-4.7 4.6L4 16.6 7.4 20l6.8-6.8a3.6 3.6 0 0 0 4.6-4.7l-2.2 2.2-2.3-.5-.5-2.3z"
      {...C} fill={STEEL}
    />
  ),
  // Torque wrench: black grip, chrome shaft, white dial with red needle.
  torque: (
    <>
      <path d="M4.8 20.2l2.2-2.2" {...O} stroke={BLK} strokeWidth="3.4" />
      <path d="M6.8 18.2l6.4-6.4" {...C} strokeWidth="2.6" />
      <circle cx="16" cy="8" r="4.3" {...O} fill={WHT} />
      <line className="ta-needle" x1="16" y1="8" x2="16" y2="4.9" {...O} stroke={RED} strokeWidth="1.2" />
      <circle cx="16" cy="8" r="0.9" fill={INK} stroke="none" />
    </>
  ),
  // Milwaukee-red cordless impact wrench: red body + grip, black battery,
  // chrome anvil with square drive, sparks blink while it hammers.
  impact: (
    <>
      <rect x="5" y="7.2" width="8.6" height="6" rx="1.5" {...O} fill={RED} />
      <path d="M8.2 13.2h3.6v4.6H8.2z" {...O} fill={RED} />
      <rect x="7.2" y="17.8" width="5.6" height="2.8" rx="0.8" {...O} fill={BLK} />
      <rect x="13.6" y="9" width="3" height="2.6" rx="0.5" {...C} fill={STEEL} />
      <rect x="16.6" y="9.5" width="2.2" height="1.7" rx="0.3" fill={STEELDK} stroke="none" />
      <path className="ta-blink" d="M20 6.8l1.4-1.2M20.4 10.2l1.8.3" {...O} stroke={YEL} strokeWidth="1.4" />
    </>
  ),
  // L-shaped hex (Allen) key, chrome bar with dark edge.
  allen: (
    <>
      <path d="M7.5 4v8.6a2.9 2.9 0 0 0 2.9 2.9h6.8" {...C} strokeWidth="3.2" />
      <path d="M7.5 4v8.6a2.9 2.9 0 0 0 2.9 2.9h6.8" {...O} stroke={STEEL} strokeWidth="1.3" />
    </>
  ),
  // 1/2" chrome extension bar: drive square, shaft, socket end.
  extension: (
    <>
      <rect x="10.6" y="2.8" width="2.8" height="2.8" rx="0.4" {...C} fill={STEELDK} />
      <rect x="11" y="5.6" width="2" height="11.2" {...C} fill={STEEL} />
      <rect x="9.9" y="16.8" width="4.2" height="4" rx="0.8" {...C} fill={STEEL} />
      <circle cx="12" cy="18.8" r="1.1" fill={BLK} stroke="none" />
    </>
  ),
  // Screwdriver: red handle with blue band, chrome shaft + tip.
  screwdriver: (
    <>
      <path d="M4.6 19.4l3.2-3.2" {...O} stroke={RED} strokeWidth="3.6" />
      <path d="M7.6 16.4l1.2-1.2" {...O} stroke={BLU} strokeWidth="3.6" />
      <path d="M8.8 15.2L16.6 7.4" {...C} strokeWidth="2" />
      <path d="M16.6 7.4l2.6-2.6" {...C} strokeWidth="1.3" />
    </>
  ),
  // Wire stripper/crimper: chrome jaws, pivot, red dipped handles.
  pliers: (
    <>
      <path d="M9.6 4.2l2.4 5.6 2.4-5.6" {...C} strokeWidth="2.2" />
      <circle cx="12" cy="10.4" r="1.2" fill={INK} stroke="none" />
      <path d="M11.3 11.4l-2.6 8.4" {...O} stroke={RED} strokeWidth="2.6" />
      <path d="M12.7 11.4l2.6 8.4" {...O} stroke={RED} strokeWidth="2.6" />
    </>
  ),
  // ------------------------------- lifting --------------------------------
  // Overhead BRIDGE crane: yellow girder across the top, blue travelling
  // hoist trolley, cable + hook that lifts.
  crane: (
    <>
      <rect x="2.4" y="3.6" width="19.2" height="3" rx="0.6" {...O} fill={YEL} />
      <rect x="9.8" y="6.6" width="5.4" height="3.6" rx="0.7" {...O} fill={BLU} />
      <g className="ta-lift">
        <path d="M12.5 10.2v4" {...O} strokeWidth="1.2" />
        <path d="M12.5 14.2a2.3 2.3 0 1 0 2.3 2.6" {...C} strokeWidth="1.8" />
      </g>
    </>
  ),
  // Chain block (0.5 t): top hook, red gear housing, hand-chain loop,
  // load hook that lifts.
  hoist: (
    <>
      <path d="M12 5.2V4c0-1-.8-1.8-1.8-1.8-.8 0-1.4.4-1.7 1.1" {...C} strokeWidth="1.4" />
      <circle cx="12" cy="9" r="3.6" {...O} fill={RED} />
      <circle cx="12" cy="9" r="1.5" {...C} fill={STEEL} />
      <path d="M14.6 11.6c1.7 2.4 1.3 5.4-.5 6.3-1.4.7-2.7-.3-2.4-1.7" {...O} strokeWidth="1.2" strokeDasharray="1.6 1.4" />
      <g className="ta-lift">
        <path d="M10 12.4v2.4" {...O} strokeWidth="1.2" />
        <path d="M10 14.8a2.1 2.1 0 1 0 2.1 2.4" {...C} strokeWidth="1.7" />
      </g>
    </>
  ),
  // Steel chain: two chrome links WITH end hooks.
  chain: (
    <>
      <path d="M12 6V4.4c0-1.1-.9-1.9-1.9-1.9-.8 0-1.5.5-1.7 1.2" {...C} strokeWidth="1.5" />
      <rect x="9.8" y="6" width="4.4" height="5.4" rx="2.2" {...C} strokeWidth="1.9" />
      <rect x="9.8" y="10.6" width="4.4" height="5.4" rx="2.2" {...C} strokeWidth="1.9" />
      <path d="M12 16v1.6c0 1.2 1 2.2 2.2 2.2 1 0 1.8-.6 2-1.5" {...C} strokeWidth="1.5" />
    </>
  ),
  // Webbing lifting sling, safety-yellow strap with stitch line.
  sling: (
    <>
      <path d="M6 5h12l-3.5 12a2.5 2.5 0 0 1-5 0z" {...O} fill={YEL} />
      <path d="M7 9h10" {...O} strokeDasharray="2 1.6" />
    </>
  ),
  // Silver bow shackle with brass screw pin.
  shackle: (
    <>
      <path d="M8 13.5a4 4 0 1 1 8 0" {...C} strokeWidth="2.6" />
      <path d="M8 13.5a4 4 0 1 1 8 0" {...O} stroke={STEEL} strokeWidth="1" />
      <path d="M6.6 14.2h10.8" {...O} stroke={BRASS} strokeWidth="2.2" />
      <circle cx="17.8" cy="14.2" r="1.5" {...O} fill={BRASS} />
    </>
  ),
  // ------------------------------ gas & vacuum ----------------------------
  // DN8 hose: black hose, brass couplings, gas flowing through.
  hose: (
    <>
      <rect x="2.8" y="17.4" width="4" height="3.6" rx="0.8" {...O} fill={BRASS} />
      <rect x="17.2" y="2.6" width="4" height="3.6" rx="0.8" {...O} fill={BRASS} />
      <path d="M5 18c0-5 3-7 7-7s7-2 7-7" fill="none" stroke={BLK} strokeWidth="3.2" strokeLinecap="round" />
      <path className="ta-flow" d="M5 18c0-5 3-7 7-7s7-2 7-7" fill="none" stroke="#9BD7EA" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  // DN20→DN8 brass stepped hex reducer: two hex sections, different bores.
  adapter: (
    <>
      <rect x="3.4" y="8.4" width="8" height="7.2" rx="1" {...O} fill={BRASS} />
      <path d="M4.4 10.4h6M4.4 13.6h6" {...O} strokeOpacity="0.45" />
      <rect x="11.4" y="10.2" width="3.4" height="3.6" {...O} fill="#B08E20" />
      <rect x="14.8" y="9.6" width="5.6" height="4.8" rx="0.8" {...O} fill={BRASS} />
      <path d="M15.8 11h3.6" {...O} strokeOpacity="0.45" />
    </>
  ),
  // Industrial shop vacuum cleaner: black lid, steel drum, hose, casters.
  vacuum: (
    <>
      <rect x="6.5" y="8.4" width="11" height="3.2" rx="1" {...O} fill={BLK} />
      <rect x="7.2" y="11.6" width="9.6" height="7.2" rx="1" {...C} fill={STEEL} />
      <path d="M17.5 9.6c2 0 3 1.6 3 3.6v3.6" {...O} stroke={BLK} strokeWidth="1.8" />
      <circle cx="9.4" cy="19.6" r="1.1" {...O} fill={BLK} />
      <circle cx="14.6" cy="19.6" r="1.1" {...O} fill={BLK} />
      <circle className="ta-suck" cx="20.5" cy="18.8" r="1.8" {...O} />
    </>
  ),
  // Industrial vacuum PUMP (≥ 60 m³/h): blue motor block with cooling fins,
  // steel pump head, gauge with sweeping needle, black base frame.
  pump: (
    <>
      <rect x="4" y="8.5" width="9.4" height="7" rx="1.4" {...O} fill={BLU} />
      <path d="M6 10v4M8.2 10v4M10.4 10v4" {...O} strokeOpacity="0.5" stroke={WHT} />
      <rect x="13.4" y="9.3" width="5.4" height="6.2" rx="0.8" {...C} fill={STEEL} />
      <path d="M16 9.3V8" {...O} />
      <circle cx="16" cy="6" r="2.3" {...O} fill={WHT} />
      <line className="ta-needle" x1="16" y1="6" x2="16" y2="4.5" {...O} stroke={RED} />
      <rect x="3.2" y="16.4" width="17.6" height="2.2" rx="0.8" {...O} fill={BLK} />
    </>
  ),
  // SF6 gas service cart (DILO-style): orange body, dark control panel with
  // gauges, blinking status lamp, wheels, push handle.
  machine: (
    <>
      <path d="M18.4 7.2h2V4.6" {...O} strokeWidth="1.4" />
      <rect x="4" y="6" width="14.4" height="12" rx="1.2" {...O} fill={ORG} />
      <rect x="6" y="8" width="7.6" height="4.6" rx="0.8" {...O} fill={LCD} />
      <circle cx="8" cy="10.3" r="1" fill={WHT} stroke="none" />
      <circle cx="11.5" cy="10.3" r="1" fill={WHT} stroke="none" />
      <circle className="ta-blink" cx="16" cy="9" r="1.2" fill={YEL} stroke="none" />
      <path d="M6.4 15h5.4" {...O} strokeOpacity="0.55" />
      <circle cx="7.4" cy="19.4" r="1.6" {...O} fill={BLK} />
      <circle cx="15.4" cy="19.4" r="1.6" {...O} fill={BLK} />
    </>
  ),
  // SF6 gas analyzer: suitcase-style instrument — carry handle, grey case,
  // glowing display, hose port and red knob.
  analyzer: (
    <>
      <path d="M10 7V5.2h4V7" {...O} strokeWidth="1.4" />
      <rect x="4.5" y="7" width="15" height="11" rx="1.4" {...O} fill={GRY} />
      <rect x="6.8" y="9.4" width="7" height="4.2" rx="0.6" {...O} fill={LCD} />
      <path className="ta-blink" d="M8.2 11.5h4.2" {...O} stroke={LCDTXT} />
      <circle cx="16.9" cy="11" r="1.4" {...O} fill={BLK} />
      <circle cx="16.9" cy="15" r="1.2" {...O} fill={RED} />
    </>
  ),
  // -------------------------- measuring instruments -----------------------
  // CT test set: grey case with red lid, glowing display, control knobs,
  // red/black test leads hanging out.
  testset: (
    <>
      <rect x="4" y="6.4" width="16" height="10.2" rx="1.2" {...O} fill={GRY} />
      <path d="M5.2 6.4h13.6a1.2 1.2 0 0 1 1.2 1.2v1.4H4V7.6a1.2 1.2 0 0 1 1.2-1.2z" fill={RED} stroke="none" />
      <rect x="6.4" y="10.4" width="6.2" height="4" rx="0.6" {...O} fill={LCD} />
      <path className="ta-blink" d="M7.6 12.4h3.8" {...O} stroke={LCDTXT} />
      <circle cx="16.3" cy="11.4" r="1.1" {...O} fill={BLK} />
      <circle cx="16.3" cy="14.4" r="1.1" {...O} fill={BLK} />
      <path d="M7 16.6c-1.2 1.8 0 3.4 1.8 3.2" {...O} stroke={RED} strokeWidth="1.3" />
      <path d="M17 16.6c1.2 1.8 0 3.4-1.8 3.2" {...O} stroke={BLK} strokeWidth="1.3" />
    </>
  ),
  // SF6 density gauge / manometer: black bezel, white face, green OK zone,
  // red alarm zone, sweeping needle, brass stem.
  gauge: (
    <>
      <circle cx="12" cy="11" r="7" {...O} fill={BLK} />
      <circle cx="12" cy="11" r="5.6" fill={WHT} stroke="none" />
      <path d="M8.7 7.8A4.6 4.6 0 0 1 13.8 6.8" fill="none" stroke={GRN} strokeWidth="2" strokeLinecap="round" />
      <path d="M13.8 6.8A4.6 4.6 0 0 1 15.5 8.1" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" />
      <line className="ta-needle" x1="12" y1="11" x2="12" y2="6.6" {...O} stroke={INK} strokeWidth="1.2" />
      <circle cx="12" cy="11" r="0.9" fill={INK} stroke="none" />
      <rect x="10.8" y="18" width="2.4" height="2.6" rx="0.4" {...O} fill={BRASS} />
    </>
  ),
  // Digital multimeter: yellow holster, dark LCD, rotary dial, red/black probes.
  multimeter: (
    <>
      <rect x="6.5" y="3.8" width="11" height="14.4" rx="2" {...O} fill={YELM} />
      <rect x="8.4" y="5.8" width="7.2" height="3.6" rx="0.5" {...O} fill={LCD} />
      <path className="ta-blink" d="M9.8 7.6h4.4" {...O} stroke={LCDTXT} />
      <circle cx="12" cy="13.6" r="2.4" {...O} fill={BLK} />
      <path d="M12 13.6v-1.9" {...O} stroke={WHT} />
      <path d="M7.6 18.2c-1.6.8-2.2 2-1.6 3" {...O} stroke={RED} strokeWidth="1.3" />
      <path d="M16.4 18.2c1.6.8 2.2 2 1.6 3" {...O} stroke={BLK} strokeWidth="1.3" />
    </>
  ),
  // Digital platform weighing scale: flat steel platform, grey body,
  // dark LCD with blinking readout.
  scale: (
    <>
      <rect x="4" y="7.4" width="16" height="2.8" rx="0.8" {...C} fill={STEEL} />
      <rect x="6.4" y="10.2" width="11.2" height="6.4" rx="1" {...O} fill={GRY} />
      <rect x="8.2" y="11.8" width="7.6" height="3.2" rx="0.5" {...O} fill={LCD} />
      <path className="ta-blink" d="M9.6 13.4h4.8" {...O} stroke={LCDTXT} />
      <rect x="6.8" y="16.6" width="2.4" height="1.6" rx="0.4" fill={BLK} stroke="none" />
      <rect x="14.8" y="16.6" width="2.4" height="1.6" rx="0.4" fill={BLK} stroke="none" />
    </>
  ),
  // Spirit level: yellow box body, black end caps, green centre vial.
  level: (
    <>
      <rect x="3" y="9.4" width="18" height="5.2" rx="1" {...O} fill={YEL} />
      <rect x="3" y="9.4" width="1.8" height="5.2" rx="0.6" fill={BLK} stroke="none" />
      <rect x="19.2" y="9.4" width="1.8" height="5.2" rx="0.6" fill={BLK} stroke="none" />
      <rect x="9.3" y="10.6" width="5.4" height="2.8" rx="1.4" {...O} fill="#C8F2DC" />
      <circle cx="12" cy="12" r="0.95" fill={GRN} stroke="none" />
    </>
  ),
  // ------------------------- consumables & chemicals ----------------------
  // Methanol: white solvent squeeze bottle, red flammable diamond, spray mist.
  spray: (
    <>
      <rect x="7.4" y="9" width="6.4" height="11" rx="1.3" {...O} fill={WHT} />
      <path d="M8.4 9V6.6h3.6V9" {...O} fill={WHT} />
      <path d="M12 6.6h2.6l1-1.3" {...O} />
      <path d="M10.6 13.4l1.7 1.7-1.7 1.7-1.7-1.7z" fill={RED} stroke="none" />
      <circle className="ta-spray ta-spray-1" cx="16.4" cy="5" r="0.9" fill="#6FA8DC" stroke="none" />
      <circle className="ta-spray ta-spray-2" cx="16.4" cy="5" r="0.9" fill="#6FA8DC" stroke="none" />
      <circle className="ta-spray ta-spray-3" cx="16.4" cy="5" r="0.9" fill="#6FA8DC" stroke="none" />
    </>
  ),
  // Industrial centre-feed tissue ROLL: white cylinder, core, hanging sheet.
  tissue: (
    <>
      <rect x="6.5" y="6" width="11" height="8.6" {...O} fill={WHT} />
      <ellipse cx="12" cy="14.6" rx="5.5" ry="1.8" {...O} fill={WHT} />
      <ellipse cx="12" cy="6" rx="5.5" ry="2" {...O} fill={WHT} />
      <ellipse cx="12" cy="6" rx="1.7" ry="0.75" {...O} fill={GRY} />
      <path d="M9.2 15.8h3.2v4.4l-1.6 1.4-1.6-1z" {...O} fill={WHT} />
    </>
  ),
  // Loctite 401 / threadlocker: red bottle, long applicator tip, white label,
  // a drop of adhesive falling.
  loctite: (
    <>
      <path d="M12 4.2v2.6" {...O} stroke={BLK} strokeWidth="1.7" />
      <path d="M10.2 9.6l1-2.6h1.6l1 2.6z" {...O} fill={RED} />
      <rect x="8.6" y="9.6" width="6.8" height="10" rx="1.2" {...O} fill={RED} />
      <rect x="9.7" y="12" width="4.6" height="4" rx="0.5" {...O} fill={WHT} />
      <path d="M10.7 13.6h2.6" {...O} stroke={RED} />
      <circle className="ta-drip" cx="17.6" cy="7.4" r="1" fill={RED} stroke="none" />
    </>
  ),
  // Molykote grease / silicone: white tube with red band, black cap,
  // crimped end, a blob dripping.
  tube: (
    <>
      <rect x="10.2" y="5.2" width="3.6" height="3.4" rx="0.6" {...O} fill={BLK} />
      <rect x="8.2" y="8.6" width="7.6" height="11.4" rx="1.2" {...O} fill={WHT} />
      <rect x="8.2" y="11.6" width="7.6" height="2.6" fill={RED} stroke="none" />
      <path d="M8.6 19.4h6.8" {...O} />
      <circle className="ta-drip" cx="18.2" cy="7" r="1" fill="#B9BFC6" stroke="none" />
    </>
  ),
  // Sandpaper sheet (700–1000 grit): tan abrasive with grit dots.
  sandpaper: (
    <>
      <rect x="5" y="8.6" width="14" height="7.4" rx="0.8" {...O} fill="#D9A75E" />
      <circle cx="8" cy="11" r="0.55" fill={INK} stroke="none" />
      <circle cx="11.5" cy="13.4" r="0.55" fill={INK} stroke="none" />
      <circle cx="15" cy="11.4" r="0.55" fill={INK} stroke="none" />
      <circle cx="16.6" cy="14" r="0.55" fill={INK} stroke="none" />
      <circle cx="9.4" cy="14.3" r="0.55" fill={INK} stroke="none" />
    </>
  ),
  // Packing foam sheets, two grey layers.
  foam: (
    <>
      <rect x="4" y="8" width="16" height="4" rx="1" {...O} fill="#DDE1E5" />
      <rect x="4" y="13" width="16" height="4" rx="1" {...O} fill="#C7CDD3" />
    </>
  ),
  // Chrome guide pin: knurled head, shaft, tapered tip.
  pin: (
    <>
      <rect x="9.8" y="2.8" width="4.4" height="2.2" rx="0.7" {...C} fill={STEELDK} />
      <path d="M12 5v11" {...C} strokeWidth="2.5" />
      <path d="M12 5v11" {...O} stroke={STEEL} strokeWidth="1" />
      <path d="M10.8 16h2.4L12 20.6z" {...C} fill={STEELDK} />
    </>
  ),
  // Black rubber insulation pads, stacked blocks.
  rubberpad: (
    <>
      <rect x="6.8" y="7.4" width="10.4" height="5" rx="1" {...O} stroke={STEELDK} fill="#3A3F44" />
      <rect x="4.4" y="12.4" width="15.2" height="5.2" rx="1" {...O} stroke={STEELDK} fill={BLK} />
    </>
  ),
  // Support fixture / clamp: steel bar and jaw, red screw handle.
  fixture: (
    <>
      <path d="M5 4.6v14.8" {...C} strokeWidth="2.2" />
      <path d="M5 5h9a4 4 0 0 1 0 8H5" {...C} strokeWidth="2" />
      <circle cx="9.5" cy="9" r="1.4" {...O} fill={RED} />
    </>
  ),
  // Aluminium step ladder.
  ladder: (
    <>
      <path d="M8 3v18M16 3v18" {...C} strokeWidth="2.1" />
      <path d="M8 7h8M8 11h8M8 15h8" {...C} strokeWidth="1.6" />
    </>
  ),
  // Crimp cable lug: brass ring terminal + barrel, red insulated wire.
  lug: (
    <>
      <circle cx="7.6" cy="12" r="3.4" {...O} fill={BRASS} />
      <circle cx="7.6" cy="12" r="1.3" fill={INK} stroke="none" />
      <rect x="10.8" y="10.5" width="5.2" height="3" rx="1" {...O} fill={BRASS} />
      <path d="M16 12h4.4" {...O} stroke={RED} strokeWidth="2.2" />
    </>
  ),
  // Wire: red insulated conductor with stripped copper strands.
  wire: (
    <>
      <path d="M3 14c2-3 4-3 6 0s4 3 6 0" {...O} stroke={RED} strokeWidth="2" />
      <path d="M15 14l5.2-2.2M15 14l4.8 1.8" {...O} stroke={BRASS} strokeWidth="1.4" />
    </>
  ),
  // Chemical-resistant glove, green nitrile with cuff line.
  gloves: (
    <>
      <path
        d="M8 20.5v-4l-1.8-2a1.5 1.5 0 0 1 2.2-2l.8.9V6a1.25 1.25 0 0 1 2.5 0v4.2h.9V4.8a1.25 1.25 0 0 1 2.5 0v5.6h.9V6.2a1.25 1.25 0 0 1 2.5 0V13a7.5 7.5 0 0 1-1.6 4.7l-.7.9v1.9z"
        {...O} fill={GRN}
      />
      <path d="M8 18h8.4" {...O} stroke="#157A52" />
    </>
  ),
  // Hex bolt (M16×40 / eye bolts): steel hex head + threaded shank.
  fastener: (
    <>
      <path d="M12 3.2l4.2 2.4v2.9L12 10.9 7.8 8.5V5.6z" {...C} fill={STEEL} />
      <rect x="10.9" y="10.9" width="2.2" height="8.4" {...C} fill={STEEL} />
      <path d="M10.9 13h2.2M10.9 15h2.2M10.9 17h2.2" {...C} strokeWidth="0.8" />
    </>
  ),
  // ----------------------------- paperwork & QC ---------------------------
  // Clipboard (BOM / QC checklist): tan board, steel clip, white sheet,
  // animated tick.
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" {...O} fill="#C08A50" />
      <rect x="7.5" y="6.6" width="9" height="12.4" rx="0.5" {...O} fill={WHT} />
      <rect x="9.5" y="3.4" width="5" height="2.6" rx="1" {...C} fill={STEELDK} />
      <path className="ta-check" d="M9 11.4l1.7 1.7L14 9.5" {...O} stroke={GRN} strokeWidth="1.6" />
      <path d="M9.2 16.2h5.6" {...O} stroke={GRY} />
    </>
  ),
  // Green QC release / passed tag: card with punched hole and tie string.
  tag: (
    <>
      <path d="M12 6c-1.5-1.6-3.1-1.9-4.6-.9" {...O} />
      <path d="M9 7.4l3-3 3 3V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" {...O} fill={GRN} />
      <circle cx="12" cy="7.2" r="1" {...O} fill={WHT} />
      <path d="M10.2 12h3.6M10.2 14.6h3.6M10.2 17.2h2.4" {...O} stroke={WHT} />
    </>
  ),
  // Conical cable dummy plug: red cap, black tapered body with ribs.
  plug: (
    <>
      <rect x="8.6" y="3.2" width="6.8" height="2.4" rx="0.8" {...O} fill={RED} />
      <path d="M9.4 5.6h5.2l2.6 12.8H6.8z" {...O} fill={BLK} />
      <path d="M8.6 9.6h6.8M7.9 13.4h8.2M7.2 17h9.6" {...O} stroke={STEELDK} strokeWidth="0.8" />
    </>
  ),
  // Label sheet: white backing with red header stripe, sticker rows,
  // one sticker peeling off.
  label: (
    <>
      <rect x="5.5" y="4.2" width="13" height="15.6" rx="1" {...O} fill={WHT} />
      <path d="M6.5 4.2h11a1 1 0 0 1 1 1v2.2h-13V5.2a1 1 0 0 1 1-1z" fill={RED} stroke="none" />
      <rect x="7.4" y="9" width="9.2" height="2.4" rx="1.2" {...O} stroke={GRY} fill="#EDF0F2" />
      <rect x="7.4" y="12.4" width="9.2" height="2.4" rx="1.2" {...O} stroke={GRY} fill="#EDF0F2" />
      <rect x="7.4" y="15.8" width="9.2" height="2.4" rx="1.2" {...O} stroke={GRY} fill="#EDF0F2" />
      <path d="M16.6 18.2l-2.4-2.4h2.4z" fill={GRY} stroke="none" />
    </>
  ),
  // Wiring diagram: white schematic sheet with black circuit symbols.
  diagram: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" {...O} fill={WHT} />
      <path d="M7.6 8h3.2v3.6h4.8" {...O} stroke={BLK} />
      <circle cx="16.4" cy="8" r="1.4" {...O} stroke={BLK} />
      <path d="M16.4 9.4v2.2" {...O} stroke={BLK} />
      <rect x="7.6" y="14" width="3.4" height="2.4" {...O} stroke={BLK} />
      <path d="M11 15.2h5.4v-3.6" {...O} stroke={BLK} />
    </>
  ),
  // Documentation pack / report: stacked sheets with text lines.
  document: (
    <>
      <rect x="7" y="3.6" width="12" height="15" rx="1" {...O} fill="#E4E7EA" />
      <rect x="5" y="5.6" width="12" height="15" rx="1" {...O} fill={WHT} />
      <path d="M7.4 9.4h7.2M7.4 12h7.2M7.4 14.6h7.2M7.4 17.2h4.6" {...O} stroke={GRY} />
    </>
  ),
  // ----------------------------- handling gear ----------------------------
  // Red platform handling trolley: upright handle, red deck, black casters.
  trolley: (
    <>
      <path d="M4.2 4.6h2.6" {...O} stroke={RED} strokeWidth="1.8" />
      <path d="M5.5 4.6V13" {...O} stroke={RED} strokeWidth="1.8" />
      <rect x="3.8" y="13" width="16.6" height="2.9" rx="0.8" {...O} fill={RED} />
      <circle cx="7.6" cy="18.6" r="1.8" {...O} stroke={STEELDK} fill={BLK} />
      <circle cx="16.8" cy="18.6" r="1.8" {...O} stroke={STEELDK} fill={BLK} />
    </>
  ),
  // Cardboard packing / material box, isometric.
  material: (
    <>
      <path d="M4 8l8-3.5L20 8l-8 3.5z" {...O} fill="#D9A56A" />
      <path d="M4 8v6l8 3.5v-6z" {...O} fill="#C08A50" />
      <path d="M20 8v6l-8 3.5v-6z" {...O} fill="#A9743C" />
    </>
  ),
  // Generic hand tools: chrome spanner crossed with a red screwdriver.
  generic: (
    <>
      <path
        d="M14.5 6.5a3.4 3.4 0 0 0 4.3 4.3l-9 9-1.6-1.6 9-9a3.4 3.4 0 0 0-4.3-4.3z"
        {...C} fill={STEEL}
      />
      <path d="M4.6 4.6l2.2 2.2" {...O} stroke={RED} strokeWidth="2.6" />
      <path d="M6.8 6.8l2.4 2.4" {...C} strokeWidth="1.6" />
    </>
  ),
}

function categoryFor(name) {
  const s = String(name).toLowerCase().trim()
  if (s === '—' || s === '-' || s === '') return null
  if (s.includes('trolley')) return 'trolley'
  if (s.includes('torque')) return 'torque'
  if (s.includes('impact') || s.includes('drill')) return 'impact'
  if (s.includes('ratchet')) return 'ratchet'
  if (s.includes('extension')) return 'extension'
  if (s.includes('screwdriver')) return 'screwdriver'
  if (s.includes('allen') || s.includes('hex')) return 'allen' // before socket: '10 mm Allen socket'
  if (s.includes('socket')) return 'socket'
  if (s.includes('spanner') || s.includes('wrench')) return 'spanner'
  if (s.includes('crimp') || s.includes('strip')) return 'pliers'
  if (s.includes('chain block') || s.includes('block')) return 'hoist' // before 'chain'
  if (s.includes('crane')) return 'crane'
  if (s.includes('chain')) return 'chain'
  if (s.includes('belt') || s.includes('sling')) return 'sling'
  if (s.includes('shackle')) return 'shackle'
  if (s.includes('test set')) return 'testset'
  if (s.includes('multimeter')) return 'multimeter'
  if (s.includes('manometer') || s.includes('gauge')) return 'gauge'
  if (s.includes('spirit level') || s.includes('level')) return 'level'
  if (s.includes('hose')) return 'hose'
  if (s.includes('adapter') || s.includes('reducer')) return 'adapter'
  if (s.includes('pump')) return 'pump' // before vacuum: 'Vacuum pump ≥ 60 m³/h'
  if (s.includes('vacuum')) return 'vacuum'
  if (s.includes('analyz')) return 'analyzer' // before machine
  if (s.includes('machine')) return 'machine'
  if (s.includes('scale')) return 'scale'
  if (s.includes('methanol') || s.includes('spray') || s.includes('solvent')) return 'spray'
  if (s.includes('tissue')) return 'tissue'
  if (s.includes('loctite') || s.includes('threadlock') || s.includes('adhesive')) return 'loctite'
  if (s.includes('grease') || s.includes('molykote') || s.includes('silicone') || s.includes('oil')) return 'tube'
  if (s.includes('sandpaper') || s.includes('grit')) return 'sandpaper'
  if (s.includes('foam')) return 'foam'
  if (s.includes('dummy plug') || s.includes('plug')) return 'plug'
  if (s.includes('guide pin') || s.includes('pin')) return 'pin'
  if (s.includes('rubber') || s.includes('insulation')) return 'rubberpad' // before 'support'
  if (s.includes('fixture') || s.includes('support') || s.includes('bracket')) return 'fixture'
  if (s.includes('ladder')) return 'ladder'
  if (s.includes('lug') || s.includes('ferrule')) return 'lug'
  if (s.includes('diagram') || s.includes('schematic') || s.includes('drawing')) return 'diagram' // before 'wire'
  if (s.includes('wire')) return 'wire'
  if (s.includes('glove')) return 'gloves'
  if (s.includes('label')) return 'label'
  if (s.includes('tag') || s.includes('release')) return 'tag' // QC passed tag / QC release, before clipboard
  if (s.includes('documentation') || s.includes('document') || s.includes('report') || s.includes('record') || s.includes('card') || s.includes('pack')) return 'document'
  if (s.includes('clip') || s.includes('bom') || s.includes('checklist')) return 'clipboard'
  if (s.includes('eye bolt') || s.includes('bolt') || s.includes('nut') || s.includes('washer') || /\bm\d/.test(s)) return 'fastener'
  if (s.includes('wrap') || s.includes('protection') || s.includes('cushion') || s.includes('pallet') || s.includes('bin') || s.includes('scrap')) return 'material'
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
