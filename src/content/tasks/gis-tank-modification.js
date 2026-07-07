// GIS Tank Modification (ALFA-G) — production flow per "GIS Work Proposal 1"
// (34 steps: transfer after boxing → cleaning → bushings → ES/DS → CT → zeolite
// → vacuum/gas/purity → base fixing → LV boxes → manometer → covers/brackets →
// interlock/labels → wiring → QC1 → testing → packing), enriched with the
// torques, tools and safety rules of AES:AE04:IED:WI:250:00 rev 01 (18/06/2026).
//
// Reviewed 2026-07-06 against both controlled documents (accuracy, worker
// clarity, safety). Writing rules for the shop floor (non-native readers):
//  - one action per line, short imperative sentences, no workshop slang
//  - comparisons in words ("0.8 mbar or lower"), stages in words
//    ("first 30%, then 60%, then 100%"), sizes keep the × only in bolt specs
//  - every torque/count is from the WI PDF; values NOT in either document are
//    marked "(per drawing — TBD)" so a worker cannot mistake them for spec
//  - warnings say the hazard, the action, and the consequence
//
// PLACEHOLDER pending SME review — items marked TBD must be confirmed against
// the controlled drawings before any shop-floor use. Out-of-scope note for the
// SME: WI PDF steps 32–37 (bursting disc, breaker installation, CB↔DS/CT busbar
// connections: 14.7 Nm / 26.5 Nm / 47–47.5 Nm, 85 ± 3 mm, 40 ± 3 mm) are not in
// the 34-line Work Proposal; confirm whether they belong in this flow.
//
// Media: document photos where the step is photographed (arrays render as a
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
        'Before you start: impact wrench charged, lifting gear inspected, team informed, lighting and ventilation OK.',
        'Confirm the boxing process is completed and the tank carries the QC-passed tag.',
        'Check every component against the BOM before you move anything.',
        'Move the tank to the GIS modification area on the handling trolley.',
        'Set the tank down on a clean, stable floor.',
      ] },
      tools: { en: ['Handling trolley', 'QC passed tag', 'BOM checklist'] },
      warning: { en: 'Move the tank on the materials-handling trolley only. Keep both hands on the handle and push from behind — never walk beside the load and never steady the tank with your body: a toppling tank causes crush injuries. Check the aisle is clear first.' },
    },
    {
      id: 2, estMin: 10, hazard: true,
      media: [img('15', '258'), img('15', '261'), img('15', '267'), anim(2)],
      title: { en: 'Clean the tank thoroughly' },
      instructions: { en: [
        'Put on chemical-resistant gloves and goggles before touching methanol.',
        'Wipe every internal surface with methanol and tissue — walls, floor and sealing faces.',
        'Vacuum out all dust and loose particles.',
        'Vacuum the bottom of the tank last.',
        'Self-check: surfaces free from dust, oil and foreign material — this is a gas compartment.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Vacuum cleaner'] },
      warning: { en: 'Methanol is flammable and toxic — it passes through skin and its vapour causes dizziness and eye damage. Keep the container closed when not pouring, keep ventilation on, and keep all sparks and hot work away. If methanol touches your skin, wash with water immediately and report it.' },
    },

    // ============ INTERNALS ============
    {
      id: 3, estMin: 14, hazard: true,
      media: [img('17', '341'), img('17', '347'), img('17', '353'), img('17', '356'), img('18', '365'), img('18', '368'), anim(3)],
      title: { en: 'Install the cable bushings & bushing busbar' },
      instructions: { en: [
        'Fix the bushing plate to the lower area of the tank — the side with the angled (chamfered) hole edges faces inside; the flat face faces outside.',
        'Fix the 3 bushing plates with their 12 washers, spring washers and nuts (17 mm socket); torque 26.5 Nm.',
        'Inspect and clean each cable-socket bushing; apply Molykote grease where the bushing touches the plate.',
        'Fit each bushing using the guide pins so no part can fall.',
        'Apply Loctite 401 to every M8×20 bolt, then tighten each bolt to 13.5 Nm.',
        'Fit the busbars onto the bushings with the 8 mm Allen key and extension rod; torque 47 Nm. Mark every bolt with the red marker.',
      ] },
      tools: { en: ['Guide pins', 'Ratchet', '17 mm socket', 'Impact wrench', '5 mm & 8 mm Allen keys', 'Extension rod', 'Torque wrench', 'Molykote grease', 'Loctite 401'] },
      warning: { en: 'Loctite 401 is an instant adhesive — it bonds skin and eyes in seconds. Wear goggles and gloves, apply one drop with the nozzle (never a finger), and keep the bottle capped. If skin bonds, do not pull it apart — soak in warm soapy water and report. Keep hands clear of the bushing while the impact wrench runs.' },
    },
    {
      id: 4, estMin: 12, hazard: true,
      media: [img('22', '555'), img('22', '558'), img('23', '603'), anim(4)],
      title: { en: 'Install the ES/DS tank' },
      instructions: { en: [
        'Wipe the joint face where the ES/DS tank will sit with methanol; apply grease to the bolt fixing area.',
        'Check the O-ring sits fully in its groove — not twisted, not pinched. Apply a thin layer of grease and silicone oil.',
        'Crane the ES/DS tank into position on the 2 guide pins — the bushing must never touch the tank.',
        'Fix the 18 M8×20 bushing bolts; torque 14.7 Nm. Fix the DS to the tank with the 19 mm spanner.',
        'Fit the upper busbar with its 6 M12×35 bolts; torque 47 Nm.',
        'Self-check: look at the O-ring position again before you release the crane — improper torque here means SF6 leakage.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Guide pins', '19 mm spanner', 'Ratchet', 'Torque wrench', 'Silicone oil', 'Molykote grease', 'Methanol', 'Tissue roll'] },
      warning: { en: 'Suspended load: guide the ES/DS tank by the guide pins only — never put hands or fingers between the tank and the mating flange while it hangs; a swing of the load will crush them. Stand clear of the travel path and do not release the crane until the bolts are fitted.' },
    },
    {
      id: 5, estMin: 16, hazard: true,
      media: [img('19', '425'), img('19', '428'), img('19', '431'), img('20', '492'), img('20', '498'), img('20', '501'), img('21', '520'), img('21', '523'), anim(5)],
      title: { en: 'Install the CT support, then the CTs' },
      instructions: { en: [
        'Fix each CT support plate with 4 M12×35 bolts. Work in pairs: worker 1 tightens with the 10 mm Allen socket, worker 2 holds with the 19 mm spanner. Torque 47.5 Nm.',
        'If a conductor has scratches, clean it with 700–1000 grit sandpaper, then fix the busbar into the CT support plate with its M12×35 bolt.',
        'Check CT direction before placing each CT: P1 faces up, P2 faces down — on all three CTs.',
        'Place the insulation rubbers between the CTs. Keep a 1 mm gap between each CT and the plate — the CT must not touch the plate.',
        'Pass each CT wire through the 4 support rods; add an M12 nut and plain washer on each rod up to the level of the CT top.',
        'Fit the top insulation plate, then the aluminium plate. On each stud: plain washer, plastic washer (do NOT forget it), spring washer, then the cap nut. Tighten with the 19 mm spanner; torque 47.5 Nm.',
      ] },
      tools: { en: ['10 mm Allen socket', '19 mm spanner', 'Torque wrench', 'Sandpaper 700–1000 grit', 'Foam sheet', 'Insulation rubber supports'] },
      warning: { en: 'Two-person operation: agree hand signals before torquing, and keep fingers behind the spanner jaw so a slip cannot trap them. Quality gate: a reversed CT (P1/P2 swapped) fails final testing after the tank is sealed — check all three before you continue.' },
    },
    {
      id: 6, estMin: 15, hazard: true,
      media: [img('28', '803'), img('28', '806'), img('28', '800'), anim(6)],
      title: { en: 'Wire the CTs, test them & close the CT cover' },
      instructions: { en: [
        'Crimp a 6 mm lug onto every CT wire.',
        'Check each phase (R, Y, B) has 9 wires, numbered 1S1 to 3S3 — 27 wires in total. Route them with no strain on any terminal.',
        'Test every CT with the CT test set before the tank is closed — a rework after gas filling costs the whole compartment.',
        'Fit the CT cover plate with its O-ring correctly seated. Insert all 8 M10 bolts halfway, then tighten in a cross pattern in stages — first 30%, then 60%, then 100%. Final torque 26.48 Nm.',
        'Stick the CT label/identification on the outside of the tank.',
      ] },
      tools: { en: ['Wire stripper', 'Wire crimper', '6 mm lugs', 'CT test set', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Only a trained operator runs the CT test set — it outputs hazardous voltage and current at the leads. Connect and check all leads before switching on, warn nearby workers, and never touch terminals while the test is running.' },
    },

    // ============ CLOSE, VACUUM & GAS ============
    {
      id: 7, estMin: 12, hazard: true,
      media: [img('29', '853'), img('29', '856'), img('29', '862'), img('29', '868'), img('29', '871'), anim(7)],
      title: { en: 'Install the zeolite & close the covers — 20 minutes' },
      instructions: { en: [
        'Vacuum the inside of the tank; wipe the sealing surface, O-ring groove and O-ring.',
        'Weigh each zeolite bag to 1.5 kg on the scale.',
        'Open the zeolite — you now have 20 minutes to seal the tank.',
        'Fix one bag in each of the TWO filter cases — inside the CB rear cover and the rear middle cover. Secure each filter case with its 6 screws; apply Loctite before tightening.',
        'Fit the covers and tighten the M10 nuts in sequence — do one, skip one — in stages: first 30%, then 60%, then 100%. Torque 26.5 Nm.',
        'Self-check: every nut torqued and marked, tank sealed inside the 20-minute window.',
      ] },
      tools: { en: ['Vacuum cleaner', 'Weighing scale', 'Tissue roll', 'Methanol', 'Loctite threadlocker (grade per drawing — TBD)', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Close the tank within 20 minutes of opening the zeolite — it absorbs moisture from the air, and wet zeolite means the gas compartment fails the dew-point test.' },
    },
    {
      id: 8, estMin: 8, hazard: true,
      media: [img('31', '927'), img('31', '933'), img('31', '939'), anim(8)],
      title: { en: 'Perform the vacuum process' },
      instructions: { en: [
        'Connect the DN8 hose between the vacuum pump and the tank.',
        'If the tank port is DN20, fit the DN20-to-DN8 adapter first.',
        'Switch the machine on and press the green button to start.',
        'Watch the screen: the pressure must go DOWN to 0.8 mbar or lower before you stop.',
        'Self-check: write the final vacuum value on the process record before you disconnect.',
      ] },
      tools: { en: ['Vacuum pump ≥ 60 m³/h', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Check the hose and couplings are undamaged and fully engaged before starting — a hose released under vacuum whips violently. Vent the line before disconnecting any coupling; never open a fitting while the pump is running.' },
    },
    {
      id: 9, estMin: 8, hazard: true,
      media: [img('32', '959'), img('32', '965'), anim(9)],
      title: { en: 'Fill the tank with SF6 gas' },
      instructions: { en: [
        'Turn on the main supply and the booster pump on the SF6 gas machine.',
        'Set the filling handle.',
        'Open the cylinder valve.',
        'Turn the selector to "Filling" and fill the tank to 0.05 MPa — watch the gauge the whole time.',
        'Self-check: check every hose, cap and connection by hand and by ear — nothing loose, no hissing sound.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Do not exceed 0.05 MPa. SF6 is colourless, odourless and heavier than air — a leak silently replaces the air at floor level. Keep ventilation running, never kneel over a leaking connection, and check every coupling before opening the cylinder valve. If you hear hissing or feel dizzy: close the valve, leave the area, report.' },
    },
    {
      id: 10, estMin: 6, hazard: true,
      media: [img('32', '968'), img('32', '971'), anim(10)],
      title: { en: 'Check the gas purity' },
      instructions: { en: [
        'Connect the SF6 gas analyzer with the self-closing hose only.',
        'Check the purity: it must be 99.75% or higher.',
        'Check the dew point: it must be −25 °C or colder.',
        'Write both values on the process record.',
        'If either value fails: stop, disconnect, and inform the supervisor — do not re-test or top-up on your own.',
      ] },
      tools: { en: ['SF6 gas analyzer', 'Self-closing hose'] },
      warning: { en: 'Certified personnel only. The analyzer vents SF6 sample gas while it measures — keep ventilation running and connect only with the self-closing hose so gas cannot free-flow.' },
    },

    // ============ PANEL BUILD-UP ============
    {
      id: 11, estMin: 8, hazard: true,
      media: [anim(11)],
      title: { en: 'Fix the tank onto the base' },
      instructions: { en: [
        'Check the chains are tight and all 4 shackles are locked before the lift.',
        'Lift the tank over the panel base with the crane — keep everyone clear.',
        'Align the tank legs with the base holes.',
        'Fit the 4 M16×40 bolts with the 24 mm socket and tighten fully (torque per drawing — TBD).',
        'Self-check: try to rock the tank — it must not move; all 4 bolts marked.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', '24 mm socket', 'Ratchet', 'M16×40 bolts'] },
      warning: { en: 'Suspended-load work: never stand under or beside the hanging tank. NEVER put a finger in a bolt hole to align it — use an alignment bar. Keep hands off the base until the tank is set down; a shifting tank will amputate a trapped finger.' },
    },
    {
      id: 12, estMin: 10, hazard: true,
      media: [anim(12)],
      title: { en: 'Assemble & fix the upper LV box and its door' },
      instructions: { en: [
        'Assemble the upper LV box on the bench; check the door alignment and hinge action first.',
        'Lift the box onto the top of the panel — two people.',
        'Fix the box to its fixing points (fasteners per drawing).',
        'Fit the door. Open and close it — it must move and latch smoothly.',
        'Self-check: no bent sheet edges, all bolts tight.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Allen keys'] },
      warning: { en: 'Two-person lift: the box goes above shoulder height — one lifts, one steadies. Grip by the folded edges with gloves on; raw sheet edges cut bare skin. Never stand directly under the box.' },
    },
    {
      id: 13, estMin: 6, hazard: false,
      media: [anim(13)],
      title: { en: 'Assemble & fix the LV box support' },
      instructions: { en: [
        'Assemble the LV box support brackets.',
        'Fix the support to the panel frame.',
        'Check it is level with the spirit level before final tightening.',
        'Self-check: support rigid, no missing washers.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Spirit level'] },
    },
    {
      id: 14, estMin: 8, hazard: false,
      media: [anim(14)],
      title: { en: 'Fix the upper & lower LV boxes' },
      instructions: { en: [
        'Place the lower LV box on its support.',
        'Align it with the upper box; keep the cable entries in line.',
        'Fix both boxes to the panel.',
        'Self-check: boxes straight on the panel; the doors do not touch or rub each other when they open.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 15, estMin: 6, hazard: true,
      media: [anim(15)],
      title: { en: 'Assemble & fix the manometer' },
      instructions: { en: [
        'Fit the manometer (gas density monitor) to its tank fitting.',
        'Read the fitting size marked on the cap nut, then use the matching spanner and torque:',
        'G1/4 → 17 mm spanner, 5.5 Nm. G3/8 → 21 mm, 12.3 Nm. G1/2 → 24 mm, 26.5 Nm. G3/4 → 32 mm, 39.2 Nm.',
        'Confirm the gauge reads the filling pressure of 0.05 MPa — do not add gas to reach the rated-pressure zone at this stage.',
        'Self-check: no hissing sound, fitting marked after torque.',
      ] },
      tools: { en: ['Spanner 17 / 21 / 24 / 32 mm', 'Torque wrench', 'Manometer'] },
      warning: { en: 'The tank is under SF6 pressure. Wear your face shield: a loose or cross-threaded gauge fitting can vent a gas jet at your face. Keep your head to the side of the connection and torque to the table value. If you hear a hiss after torquing, stop and report — do not re-tighten under pressure.' },
    },
    {
      id: 16, estMin: 5, hazard: false,
      media: [anim(16)],
      title: { en: 'Fit the protection strip (chine poly) on the ES/DS tank' },
      instructions: { en: [
        'Fit the protection strip (called "chine poly") around the ES/DS tank edge.',
        'Press it down fully — no gaps or lifted sections.',
        'Self-check: strip continuous and secure all the way around.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 17, estMin: 6, hazard: false,
      media: [anim(17)],
      title: { en: 'Fix the tank-to-tank earthing busbar' },
      instructions: { en: [
        'Clean the earthing contact faces until the metal is bare and shiny.',
        'Fit the earthing busbar between the two tanks.',
        'Tighten the bolts with the torque wrench (torque per drawing — TBD).',
        'Self-check: solid metal-to-metal contact — this earth path protects everyone downstream.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 18, estMin: 5, hazard: true,
      media: [anim(18)],
      title: { en: 'Fix the top sheet' },
      instructions: { en: [
        'Carry the top sheet by its folded edges, with gloves on.',
        'Place it on the panel roof and align the holes.',
        'Fit all fixings first, then tighten them.',
        'Self-check: sheet flat, no gaps at the corners.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
      warning: { en: 'Sheet-metal edges are sharp. Wear gloves and arm sleeves, and never slide a bare hand or forearm along an edge. Set the sheet down before changing your grip.' },
    },
    {
      id: 19, estMin: 6, hazard: false,
      media: [anim(19)],
      title: { en: 'Assemble & fix the rear-side top cover' },
      instructions: { en: [
        'Assemble the rear-side top cover.',
        'Hold the cover in its position on the panel.',
        'Align the bolt holes, fit all the bolts, then tighten them evenly.',
        'Self-check: cover sits flat against the panel with no gap.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 20, estMin: 5, hazard: false,
      media: [anim(20)],
      title: { en: 'Fix the rear-side top tank-to-tank support bracket' },
      instructions: { en: [
        'Place the support bracket at the rear-side top, between the two tanks.',
        'Fix it to both tanks and tighten.',
        'Self-check: bracket square, both tanks rigidly tied together.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 21, estMin: 6, hazard: false,
      media: [anim(21)],
      title: { en: 'Fix the rear cover & channel bracket' },
      instructions: { en: [
        'Fit the channel bracket first.',
        'Hang the rear cover on the bracket.',
        'Fit all bolts hand-tight and check the alignment.',
        'Then tighten every bolt fully, one by one.',
        'Self-check: count the bolts against the BOM — no missing hardware.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 22, estMin: 4, hazard: false,
      media: [anim(22)],
      title: { en: 'Fix the CVI bracket' },
      instructions: { en: [
        'Fix the CVI (voltage indicator) bracket in its marked position.',
        'Check the indicator window can be seen from where the operator stands.',
        'Self-check: bracket tight, indicator not blocked.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 23, estMin: 8, hazard: true,
      media: [anim(23)],
      title: { en: 'Fix the door interlock assembly' },
      instructions: { en: [
        'Fit the door interlock assembly exactly per the drawing — this is a safety device.',
        'Operate the interlock through its full cycle: it must block the door when required and release cleanly.',
        'Self-check: with the interlock engaged, try to open the door by hand — it must stay locked.',
        'If you have any doubt, call the supervisor.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Allen keys'] },
      warning: { en: 'A faulty interlock endangers the end user — it is what stops a door opening on live equipment. Test the full cycle before moving on; never adjust it to make the door "easier".' },
    },
    {
      id: 24, estMin: 5, hazard: false,
      media: [anim(24)],
      title: { en: 'Fix the door handle & door stopper' },
      instructions: { en: [
        'Fit the door handle and check the latching action.',
        'Fit the door stopper — the door must not swing into the next panel.',
        'Self-check: open and close the door 3 times — smooth, positive latching every time.',
      ] },
      tools: { en: ['Ratchet', 'Allen keys', 'Screwdriver'] },
    },
    {
      id: 25, estMin: 6, hazard: false,
      media: [anim(25)],
      title: { en: 'Fix the rear-side cover & apply the door labels' },
      instructions: { en: [
        'Fix the rear-side cover with all its bolts.',
        'Clean the door surface with tissue.',
        'Apply the door labels straight, in the drawing positions.',
        'Self-check: labels match THIS panel serial — wrong labels are a QC rejection.',
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
        'Self-check: labels level, fully stuck down, matching the panel documentation.',
      ] },
      tools: { en: ['Label set', 'Cleaning tissue'] },
    },
    {
      id: 27, estMin: 20, hazard: false,
      media: [anim(27)],
      title: { en: 'Complete the LV box wiring & remaining connections' },
      instructions: { en: [
        'Complete the LV box wiring on the bench, following the wiring diagram.',
        'Install the wired LV box in the panel.',
        'Connect the remaining wires exactly per the wiring diagram.',
        'Arrange the wire bundles neatly and tie them with cable ties.',
        'Fit a printed wire marker (ferrule) on every wire end.',
        'Self-check: test every connection point-to-point with the multimeter against the diagram.',
      ] },
      tools: { en: ['Wire stripper', 'Wire crimper', 'Ferrules & lugs', 'Screwdrivers', 'Multimeter', 'Wiring diagram'] },
    },

    // ============ QC, TESTING & PACKING ============
    {
      id: 28, estMin: 10, hazard: false,
      media: [anim(28)],
      title: { en: 'Hand over the panel to QC1' },
      instructions: { en: [
        'Walk around the panel with the checklist and confirm ALL assembly, labelling and wiring work is complete.',
        'Verify the 8 self-quality points: all parts fixed in position; all torques per spec; no damaged or bent parts; alignment per drawing; surfaces clean; no loose fittings; every nut and bolt marked with red marker after tightening.',
        'Report any non-conformance to the supervisor immediately.',
        'Hand the panel over to QC1 for inspection with its documentation.',
      ] },
      tools: { en: ['QC checklist', 'Panel documentation'] },
    },
    {
      id: 29, estMin: 15, hazard: false,
      media: [anim(29)],
      title: { en: 'Resolve all QC1 comments' },
      instructions: { en: [
        'Go through every QC1 comment one by one.',
        'Fix each point completely — no partial fixes.',
        'Re-mark any re-torqued fastener with the red marker.',
        'Call QC1 back to close every comment before the panel moves on.',
      ] },
      tools: { en: ['QC1 report', 'Hand tools as required'] },
    },
    {
      id: 30, estMin: 8, hazard: true,
      media: [anim(30)],
      title: { en: 'Fix the panel on the testing base & hand over to testing' },
      instructions: { en: [
        'Check the chains and shackles, then crane the panel onto the testing base — keep everyone clear.',
        'Fix the panel to the testing base so it cannot move during test.',
        'Hand the panel over to the testing department with its records.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', 'Ratchet', '24 mm socket'] },
      warning: { en: 'Never stand under or beside the suspended panel. Guide it with a tag line, not with your hands on the panel.' },
    },
    {
      id: 31, estMin: 8, hazard: true,
      media: [anim(31)],
      title: { en: 'Fix the cable & cable dummy plugs' },
      instructions: { en: [
        'Confirm with the testing department that the test supply is isolated and locked out before touching any bushing.',
        'Fit the test cable to the cable bushing.',
        'Apply a thin layer of silicone grease to each dummy plug.',
        'Fit the dummy plugs on all unused bushings — every bushing must be closed.',
        'Self-check: all plugs fully pushed in; no bushing left open for the HV test.',
      ] },
      tools: { en: ['Cable dummy plugs', 'Silicone grease'] },
      warning: { en: 'You are in the HV test area. Never enter the test barrier while the red test-in-progress light is on — high-voltage contact is fatal. Only touch the panel after testing confirms it is isolated and earthed.' },
    },
    {
      id: 32, estMin: 6, hazard: false,
      media: [anim(32)],
      title: { en: 'Fix the top bushing plate' },
      instructions: { en: [
        'Fit the top bushing plate: the side with the angled (chamfered) hole edges faces inside; the flat face faces outside.',
        'Fit all fixings and tighten evenly (torque per drawing — TBD; verify before shop-floor use).',
        'Self-check: plate flat against the tank, every bolt marked.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 33, estMin: 8, hazard: true,
      media: [anim(33)],
      title: { en: 'After testing — remove the panel from the testing base' },
      instructions: { en: [
        'Confirm with the testing department that ALL tests passed.',
        'Confirm the panel is discharged and de-energised — no electrical energy left in it.',
        'Unbolt the panel from the testing base.',
        'Check the chains, then crane the panel off the base — area clear.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', 'Ratchet', '24 mm socket'] },
      warning: { en: 'Do not touch the panel until the testing department confirms it is discharged and released. Stored test voltage can kill even after the supply is off.' },
    },
    {
      id: 34, estMin: 8, hazard: true,
      media: [anim(34)],
      title: { en: 'Transfer the panel to the packing section' },
      instructions: { en: [
        'Check the panel carries its final QC release before it leaves the area.',
        'Move the panel on the trolley to the packing section — slow, controlled movement.',
        'Hand it over with the complete documentation pack.',
        'Well done — panel complete.',
      ] },
      tools: { en: ['Handling trolley', 'Final QC release', 'Documentation pack'] },
      warning: { en: 'Keep hands clear of pinch points between the trolley and door frames. Push from behind, move slowly through the aisle, and get a second person to watch corners.' },
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
  ppe: ['safety_helmet', 'safety_glasses', 'gloves', 'hearing_protection', 'safety_boots', 'arm_sleeves', 'face_shield'],
  placeholder: true,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
