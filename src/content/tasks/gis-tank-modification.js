// GIS Tank Modification (ALFA-G) — production flow per "GIS Work Proposal 1"
// (34 steps: transfer after boxing → cleaning → bushings → ES/DS → CT → zeolite
// → vacuum/gas/purity → base fixing → LV boxes → manometer → covers/brackets →
// interlock/labels → wiring → QC1 → testing → packing), enriched with the
// torques, tools and safety rules of AES:AE04:IED:WI:250:00 rev 01 (18/06/2026).
// PLACEHOLDER pending SME review — verify torque values, part counts and
// sequence against the controlled documents before any shop-floor use.
//
// Written in a production-manager voice: prepare → act → self-check, so the
// operator verifies his own work before moving on (Self-Quality Check Points).
//
// Media: the document photos where the step is photographed (arrays render as a
// slideshow) plus the realistic SVG animations shared with the Animated task.
// English is authoritative; ar/ur/hi come from ./gis-translations.json.
import tr from './gis-translations.json'

const img = (p, n) => ({ type: 'image', src: `/media/gis/figs/p${p}-${n}.jpg` })
const anim = (n) => ({ type: 'svg', src: `gis-tank-modification-animated/step-${n}` })

const EN = {
  title: { en: 'GIS Tank Modification' },
  summary: { en: 'Complete GIS tank modification — from boxing hand-over to packing, gas-tight and QC-approved.' },
  steps: [
    // ============ TANK PREPARATION ============
    {
      id: 1, estMin: 8, hazard: true,
      media: [{ type: 'gif', src: '/media/gis/step-01.gif' }, anim(1)],
      title: { en: 'Transfer the tank to the modification area' },
      instructions: { en: [
        'Confirm the boxing process is completed and the tank carries the QC-passed tag.',
        'Verify all components against the BOM before you move anything.',
        'Transfer the tank on the handling trolley to the GIS modification area and set it on a clean, stable floor.',
        'Self-check: tag present, no visible damage, floor area clear.',
      ] },
      tools: { en: ['Handling trolley', 'QC passed tag', 'BOM checklist'] },
      warning: { en: 'Never stand near the tank during any lift or transfer. Use the materials-handling trolley only.' },
    },
    {
      id: 2, estMin: 10, hazard: false,
      media: [img('15', '258'), img('15', '261'), img('15', '267'), anim(2)],
      title: { en: 'Clean the tank thoroughly' },
      instructions: { en: [
        'Put on chemical-resistant gloves before touching methanol.',
        'Wipe every internal surface with methanol and tissue — walls, floor and sealing faces.',
        'Vacuum out all dust and foreign particles; finish with the bottom of the tank.',
        'Self-check: surfaces free from dust, oil and foreign material — this is a gas compartment.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Vacuum cleaner'] },
    },

    // ============ INTERNALS ============
    {
      id: 3, estMin: 12, hazard: false,
      media: [img('17', '353'), img('17', '356'), img('18', '365'), img('18', '368'), anim(3)],
      title: { en: 'Install the cable bushing & bushing busbar' },
      instructions: { en: [
        'Inspect and clean each cable-socket bushing; grease the bushing-plate contact area.',
        'Fit the bushings with guide pins so nothing falls; tighten the M8×20 bolts to 13.5 Nm with Loctite 401 on every bolt.',
        'Fit the busbars onto the bushings with the 8 mm Allen key and extension rod; torque 47 Nm.',
        'Self-check: every bolt torqued and marked with red marker.',
      ] },
      tools: { en: ['Guide pins', 'Impact wrench', '5 mm & 8 mm Allen keys', 'Extension rod', 'Torque wrench', 'Molykote grease', 'Loctite 401'] },
    },
    {
      id: 4, estMin: 10, hazard: true,
      media: [img('22', '555'), img('22', '558'), anim(4)],
      title: { en: 'Install the ES/DS tank' },
      instructions: { en: [
        'Clean the mating surface with methanol and apply grease at the fixing area.',
        'Check the O-ring is seated correctly; apply grease and silicone oil.',
        'Crane the ES/DS tank into position using the 2 guide pins — the bushing must never contact the tank.',
        'Bolt it down and torque; self-check the O-ring position before releasing the crane.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Guide pins', 'Silicone oil', 'Molykote grease', 'Methanol', 'Tissue roll'] },
      warning: { en: 'A loose or pinched O-ring means SF6 leakage. Keep clear of the suspended load.' },
    },
    {
      id: 5, estMin: 14, hazard: false,
      media: [img('19', '425'), img('19', '428'), img('20', '492'), img('20', '498'), img('20', '501'), anim(5)],
      title: { en: 'Install the CT support, then the CTs' },
      instructions: { en: [
        'Install the CT support plates one by one with 4× M12×35 bolts; MP1 tightens (10 mm Allen socket), MP2 holds the 19 mm spanner. Torque 47.5 Nm.',
        'Check CT direction before placing: P1 faces up, P2 faces down — on all three CTs.',
        'Place the insulation rubbers between CTs and keep a 1 mm gap — the CT must not touch the plate.',
        'Lead each CT wire through the supporting rods; fit the top insulation and aluminium plates (do NOT forget the plastic washer under the cap nut; torque 47.5 Nm).',
      ] },
      tools: { en: ['10 mm Allen socket', '19 mm spanner', 'Torque wrench', 'Foam sheet', 'Insulation rubber (Jean support)'] },
      warning: { en: 'Wrong CT direction fails testing. Verify P1 up / P2 down before you continue.' },
    },
    {
      id: 6, estMin: 12, hazard: false,
      media: [img('28', '803'), img('28', '806'), img('28', '800'), anim(6)],
      title: { en: 'Complete the CT wiring & test the CTs' },
      instructions: { en: [
        'Crimp the CT terminal wiring with 6 mm lugs — R, Y, B: 9 wires per phase (1S1…3S3, 27 total).',
        'Route the wires cleanly through the supports; no strain on any terminal.',
        'Perform the CT test to verify proper installation and functionality before the tank is closed.',
        'Self-check: every core tested and recorded — after gas filling a rework costs the whole compartment.',
      ] },
      tools: { en: ['Wire stripper', 'Wire crimper', '6 mm lugs', 'CT test set'] },
    },

    // ============ CLOSE, VACUUM & GAS ============
    {
      id: 7, estMin: 10, hazard: true,
      media: [img('29', '853'), img('29', '856'), img('29', '862'), img('29', '868'), img('29', '871'), anim(7)],
      title: { en: 'Install the zeolite & close the cover — 20 minutes' },
      instructions: { en: [
        'Vacuum the inside of the tank; wipe the sealing surface, O-ring groove and O-ring.',
        'Weigh each zeolite bag to 1.5 kg on the scale and fix it in its filter case inside the cover.',
        'From the moment the zeolite is opened you have 20 minutes: fit the cover, apply Loctite, tighten in a cross pattern in stages (30 → 60 → 100%), torque 26.5 Nm.',
        'Self-check: every nut torqued, marked and the tank sealed inside the time window.',
      ] },
      tools: { en: ['Vacuum cleaner', 'Weighing scale', 'Tissue roll', 'Methanol', 'Loctite 270 / 242', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Close the tank within 20 minutes of opening the zeolite — it absorbs moisture from the air.' },
    },
    {
      id: 8, estMin: 8, hazard: true,
      media: [img('31', '927'), img('31', '933'), img('31', '939'), anim(8)],
      title: { en: 'Perform the vacuum process' },
      instructions: { en: [
        'Connect the DN8 hose to the vacuum pump and the tank (use the DN20→DN8 adapter if needed).',
        'Switch the machine on and press the green button to start evacuation.',
        'Watch the screen: evacuate to 0.8 mbar or lower, then switch off and remove the pipe.',
        'Self-check: vacuum value recorded before you disconnect.',
      ] },
      tools: { en: ['Vacuum pump ≥ 60 m³/h', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Minimum required vacuum is 0.8 mbar.' },
    },
    {
      id: 9, estMin: 8, hazard: true,
      media: [img('32', '959'), img('32', '965'), anim(9)],
      title: { en: 'Fill the tank with SF6 gas' },
      instructions: { en: [
        'Turn on the main supply and the booster pump on the SF6 gas machine.',
        'Set the filling handle, open the cylinder valve and set the selector to "Filling".',
        'Fill the tank to 0.05 MPa — monitor the gauge continuously.',
        'Self-check: all pressure parts, hoses and caps secure with no leakage.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Do not exceed 0.05 MPa. SF6 is colourless and odourless — keep every connection leak-tight.' },
    },
    {
      id: 10, estMin: 6, hazard: true,
      media: [img('32', '968'), img('32', '971'), anim(10)],
      title: { en: 'Check the gas purity' },
      instructions: { en: [
        'Connect the SF6 gas analyzer with the self-closing hose.',
        'Check the purity: it must be ≥ 99.75% SF6/N2.',
        'Check the dew point: it must be ≤ −25 °C.',
        'Record both values; if either fails, inform the supervisor — do not continue.',
      ] },
      tools: { en: ['SF6 gas analyzer', 'Self-closing hose'] },
      warning: { en: 'Certified personnel only. Out-of-spec gas must be reported immediately.' },
    },

    // ============ PANEL BUILD-UP ============
    {
      id: 11, estMin: 8, hazard: true,
      media: [anim(11)],
      title: { en: 'Fix the tank onto the base' },
      instructions: { en: [
        'Crane the gas-filled tank over the panel base — chains tight, shackles checked.',
        'Align the tank legs with the base holes.',
        'Fit the M16×40 bolts with a 24 mm socket and tighten so the tank cannot shift.',
        'Self-check: all four fixings tight and marked.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', '24 mm socket', 'Ratchet', 'M16×40 bolts'] },
      warning: { en: 'Do not stand near the tank during the lift.' },
    },
    {
      id: 12, estMin: 10, hazard: false,
      media: [anim(12)],
      title: { en: 'Assemble & fix the upper LV box and its door' },
      instructions: { en: [
        'Assemble the upper LV box on the bench; check the door alignment and hinge action first.',
        'Lift the box onto the top of the panel and bolt it to its fixing points.',
        'Fit the door and confirm it opens, closes and latches smoothly.',
        'Self-check: no bent sheet edges, all bolts tight.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Allen keys'] },
    },
    {
      id: 13, estMin: 6, hazard: false,
      media: [anim(13)],
      title: { en: 'Assemble & fix the LV box support' },
      instructions: { en: [
        'Assemble the LV box support brackets.',
        'Fix the support to the panel frame — check it is level before final tightening.',
        'Self-check: support rigid, no missing washers.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Spirit level'] },
    },
    {
      id: 14, estMin: 8, hazard: false,
      media: [anim(14)],
      title: { en: 'Fix the upper & lower LV boxes' },
      instructions: { en: [
        'Position the lower LV box on its support and align it with the upper box.',
        'Bolt both boxes to the panel; keep the cable entries aligned.',
        'Self-check: boxes square to the panel, doors not fouling each other.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 15, estMin: 6, hazard: true,
      media: [anim(15)],
      title: { en: 'Assemble & fix the manometer' },
      instructions: { en: [
        'Fit the manometer (gas density monitor) to its tank fitting.',
        'Match the cap nut to its spanner (G1/4 = 17 mm → 5.5 Nm … G3/4 = 32 mm → 39.2 Nm) and torque so it cannot leak.',
        'Confirm the needle reads in the green (rated pressure) zone.',
        'Self-check: no hiss, fitting marked after torque.',
      ] },
      tools: { en: ['Spanner 17 / 21 / 24 / 32 mm', 'Torque wrench', 'Manometer'] },
      warning: { en: 'A loose gauge fitting is an SF6 leak path — always torque to the table value.' },
    },
    {
      id: 16, estMin: 5, hazard: false,
      media: [anim(16)],
      title: { en: 'Fix the ES/DS tank chine poly' },
      instructions: { en: [
        'Fit the chine poly (protection strip) around the ES/DS tank edge.',
        'Seat it fully — no gaps or lifted sections.',
        'Self-check: strip continuous and secure.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 17, estMin: 6, hazard: false,
      media: [anim(17)],
      title: { en: 'Fix the tank-to-tank earthing busbar' },
      instructions: { en: [
        'Clean the earthing contact faces to bare, bright metal.',
        'Fit the earthing busbar between the tanks and torque the bolts.',
        'Self-check: solid metal-to-metal contact — the earth path protects everyone downstream.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 18, estMin: 5, hazard: false,
      media: [anim(18)],
      title: { en: 'Fix the top sheet' },
      instructions: { en: [
        'Lift the top sheet into place — handle sheet metal by the edges with gloves.',
        'Align the holes and fit all fixings before tightening any of them.',
        'Self-check: sheet flat, no gaps at the corners.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 19, estMin: 6, hazard: false,
      media: [anim(19)],
      title: { en: 'Assemble & fix the rear-side top cover' },
      instructions: { en: [
        'Assemble the rear-side top cover.',
        'Offer it up, align, and fix with its bolts — tighten evenly.',
        'Self-check: cover seated flush with the adjacent panels.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 20, estMin: 5, hazard: false,
      media: [anim(20)],
      title: { en: 'Fix the rear-side top tank-to-tank support bracket' },
      instructions: { en: [
        'Position the tank-to-tank support bracket at the rear-side top.',
        'Bolt it to both tanks and torque.',
        'Self-check: bracket square, both tanks rigidly tied.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 21, estMin: 6, hazard: false,
      media: [anim(21)],
      title: { en: 'Fix the rear cover & channel bracket' },
      instructions: { en: [
        'Fit the channel bracket first, then hang the rear cover on it.',
        'Fix all bolts hand-tight, check alignment, then tighten in sequence.',
        'Self-check: no missing hardware — count the bolts against the BOM.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 22, estMin: 4, hazard: false,
      media: [anim(22)],
      title: { en: 'Fix the CVI bracket' },
      instructions: { en: [
        'Fix the CVI (capacitive voltage indicator) bracket in its marked position.',
        'Check the indicator window will be visible from the operator side.',
        'Self-check: bracket tight, indicator unobstructed.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 23, estMin: 8, hazard: false,
      media: [anim(23)],
      title: { en: 'Fix the door interlock assembly' },
      instructions: { en: [
        'Fit the door interlock assembly exactly per the drawing — this is a safety device.',
        'Operate the interlock through its full cycle: it must block the door when required and release cleanly.',
        'Self-check: interlock cannot be bypassed by hand. Any doubt → supervisor.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Allen keys'] },
      warning: { en: 'A faulty interlock endangers the end user. Test the full cycle before moving on.' },
    },
    {
      id: 24, estMin: 5, hazard: false,
      media: [anim(24)],
      title: { en: 'Fix the door handle & door stopper' },
      instructions: { en: [
        'Fit the door handle and check the latching action.',
        'Fit the door stopper and confirm the door cannot swing into the adjacent panel.',
        'Self-check: open/close 3 times — smooth, positive latching every time.',
      ] },
      tools: { en: ['Ratchet', 'Allen keys', 'Screwdriver'] },
    },
    {
      id: 25, estMin: 6, hazard: false,
      media: [anim(25)],
      title: { en: 'Fix the rear-side cover & apply the door labels' },
      instructions: { en: [
        'Fix the rear-side cover with all its bolts.',
        'Clean the door surface, then apply the door labels straight and in the drawing positions.',
        'Self-check: labels correct for THIS panel serial — wrong labels are a QC rejection.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Label set', 'Cleaning tissue'] },
    },
    {
      id: 26, estMin: 4, hazard: false,
      media: [anim(26)],
      title: { en: 'Apply the VCB & manometer labels' },
      instructions: { en: [
        'Apply the VCB label at the breaker position.',
        'Apply the manometer label beside the gauge window.',
        'Self-check: labels level, fully adhered, matching the panel documentation.',
      ] },
      tools: { en: ['Label set', 'Cleaning tissue'] },
    },
    {
      id: 27, estMin: 20, hazard: false,
      media: [anim(27)],
      title: { en: 'Complete the LV box wiring & remaining connections' },
      instructions: { en: [
        'Complete the LV box wiring on the bench per the wiring diagram.',
        'Install the wired LV box in the panel.',
        'Complete the remaining wiring connections; dress and tie the looms; label every ferrule.',
        'Self-check: point-to-point continuity against the diagram before handing over.',
      ] },
      tools: { en: ['Wire stripper', 'Wire crimper', 'Ferrules & lugs', 'Screwdrivers', 'Multimeter', 'Wiring diagram'] },
    },

    // ============ QC, TESTING & PACKING ============
    {
      id: 28, estMin: 10, hazard: false,
      media: [anim(28)],
      title: { en: 'Hand over the panel to QC1' },
      instructions: { en: [
        'Confirm ALL assembly, labelling and wiring work is complete — walk around the panel with the checklist.',
        'Verify the self-quality points: torques marked, no damage, no missing parts, surfaces clean.',
        'Hand the panel over to QC1 for inspection with its documentation.',
      ] },
      tools: { en: ['QC checklist', 'Panel documentation'] },
    },
    {
      id: 29, estMin: 15, hazard: false,
      media: [anim(29)],
      title: { en: 'Resolve all QC1 comments' },
      instructions: { en: [
        'Go through every QC1 comment and observation one by one.',
        'Fix each point completely — no partial fixes — and re-mark any re-torqued fastener.',
        'Call QC1 back to close out every comment before the panel moves on.',
      ] },
      tools: { en: ['QC1 report', 'Hand tools as required'] },
    },
    {
      id: 30, estMin: 8, hazard: true,
      media: [anim(30)],
      title: { en: 'Fix the panel on the testing base & hand over to testing' },
      instructions: { en: [
        'Crane the panel onto the testing base — keep everyone clear of the load.',
        'Bolt the panel to the testing base so it cannot move during test.',
        'Hand the panel over to the testing department with its records.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', 'Ratchet', '24 mm socket'] },
      warning: { en: 'Never stand under or beside the suspended panel.' },
    },
    {
      id: 31, estMin: 8, hazard: false,
      media: [anim(31)],
      title: { en: 'Fix the cable & cable dummy plug' },
      instructions: { en: [
        'Fit the test cable to the cable bushing.',
        'Fit the cable dummy plugs on the unused bushings — every bushing must be closed.',
        'Self-check: all plugs fully engaged; no bushing left open for the HV test.',
      ] },
      tools: { en: ['Cable dummy plugs', 'Silicone grease'] },
    },
    {
      id: 32, estMin: 6, hazard: false,
      media: [anim(32)],
      title: { en: 'Fix the top bushing plate' },
      instructions: { en: [
        'Fit the top bushing plate — chamfered holes inside, flat face outside.',
        'Fit all fixings and torque evenly to 26.5 Nm.',
        'Self-check: plate flush, every bolt marked.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 33, estMin: 8, hazard: true,
      media: [anim(33)],
      title: { en: 'After testing — remove the panel from the testing base' },
      instructions: { en: [
        'Confirm with the testing department that ALL tests are passed and the panel is discharged and de-energised.',
        'Unbolt the panel from the testing base.',
        'Crane the panel off the base — chains tight, area clear.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', 'Ratchet', '24 mm socket'] },
      warning: { en: 'Do not touch the panel until testing confirms it is discharged and released.' },
    },
    {
      id: 34, estMin: 8, hazard: true,
      media: [anim(34)],
      title: { en: 'Transfer the panel to the packing section' },
      instructions: { en: [
        'Check the panel carries its final QC release before it leaves the area.',
        'Transfer the panel on the trolley to the packing section — slow, controlled movement.',
        'Hand over with the complete documentation pack. Well done — panel complete.',
      ] },
      tools: { en: ['Handling trolley', 'Final QC release', 'Documentation pack'] },
      warning: { en: 'Keep hands clear of pinch points; move the trolley slowly through the aisle.' },
    },
  ],
}

// ---- merge English base with ./gis-translations.json (ar/ur/hi) -----------
const mergeF = (en, t) => (t ? { ...en, ...t } : en)
const steps = EN.steps.map((s) => {
  const t = (tr.steps && tr.steps[String(s.id)]) || {}
  return {
    ...s,
    title: mergeF(s.title, t.title),
    instructions: { ...s.instructions, ...(t.instructions || {}) },
    ...(s.tools ? { tools: { ...s.tools, ...(t.tools || {}) } } : {}),
    ...(s.warning ? { warning: mergeF(s.warning, t.warning) } : {}),
  }
})

export default {
  id: 'gis-tank-modification',
  order: 5,
  icon: 'gis-tank',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'safety_glasses', 'gloves', 'hearing_protection', 'safety_boots'],
  placeholder: true,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
