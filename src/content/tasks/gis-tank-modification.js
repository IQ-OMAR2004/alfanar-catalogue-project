// GIS Tank Dismantle & Assemble (ALFA-G) — DETAILED.
// Faithful to alfanar work instruction AES:AE04:IED:WI:250:00 (rev 00,
// 18/06/2026): the full numbered procedure, per-step tools/materials, and the
// document's own figures (multiple photos per step). PLACEHOLDER pending SME
// review — verify torque values, part counts and sequence against the
// controlled document before any shop-floor use.
//
// Media mix: the WhatsApp handling GIF, the document's photos (arrays render as
// an auto-advancing slideshow), and two SVG/CSS animations where no photo fits
// (SF6 recovery, busbar torque). All behind the swappable media slot.
//
// English is authoritative here; ar/ur/hi come from ./gis-translations.json and
// are deep-merged below (English is the fallback until a string is translated).
import tr from './gis-translations.json'

const img = (p, n) => ({ type: 'image', src: `/media/gis/figs/p${p}-${n}.jpg` })

const EN = {
  title: { en: 'GIS Tank Modification' },
  summary: { en: 'Full dismantle, refurbish and reassembly of a GIS tank — SF6 recovery to gas test.' },
  steps: [
    // ============ SOLUTION-1 — DISMANTLE ============
    {
      id: 1, estMin: 8, hazard: true,
      media: [{ type: 'gif', src: '/media/gis/step-01.gif' }],
      title: { en: 'Bring & place the tank' },
      instructions: { en: [
        'Verify all components against the BOM and the QC-passed tag.',
        'Bring the tank from the yard buffer area on the handling trolley.',
        'Move it into the GIS area and set it on a clean, stable floor.',
      ] },
      tools: { en: ['Handling trolley', 'QC passed tag', 'BOM checklist'] },
      warning: { en: 'Use the materials-handling trolley; stand clear during any lift.' },
    },
    {
      id: 2, estMin: 6, hazard: false,
      media: [img('08', '023')],
      title: { en: 'Assemble the pipe & pressure gauge' },
      instructions: { en: [
        'Fit the pipe and pressure gauge to the tank fitting.',
        'Match the cap nut to its spanner size (G1/4=17, G3/8=21, G1/2=24, G3/4=32).',
        'Torque each fitting to its value (5.5–115.7 Nm) so it cannot leak.',
      ] },
      tools: { en: ['Spanner 17 / 21 / 24 / 32 mm', 'Torque wrench', 'Pressure gauge'] },
    },
    {
      id: 3, estMin: 12, hazard: true,
      media: [{ type: 'svg', src: 'gis-tank-modification/step-2' }],
      title: { en: 'Recover the SF6 gas' },
      instructions: { en: [
        'Turn on the Main 25 A, the Booster pump and Compressor 2.',
        'Fix the hose in the SF6 "Recovery (Absaugen)" position.',
        'Rotate the handle to recovery and set the selector to "Recovery".',
        'Recover until the tank pressure reads zero. Use the DN20→DN8 adapter if needed.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'SF6 is colourless and odourless. Certified personnel only — keep all parts leak-tight.' },
    },
    {
      id: 4, estMin: 7, hazard: false,
      media: [img('09', '058'), img('09', '055'), img('09', '061')],
      title: { en: 'Open the covers & remove the busbar' },
      instructions: { en: [
        'Remove the 62 M10 nuts and washers with a 17 mm socket and ratchet.',
        'Take off the front and rear covers to reach the busbar.',
        'Lift the busbar out and wrap it to prevent scratches.',
        'Lay the wrapped busbar on the trolley.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Wrapping / protection'] },
    },
    {
      id: 5, estMin: 8, hazard: true,
      media: [img('09', '064'), img('09', '067'), img('09', '052')],
      title: { en: 'Crane out the breaker' },
      instructions: { en: [
        'Fix the CB fixture to the breaker with 4× M30 bolts and 8× plane washers.',
        'Align it with the chain block and take up the load on the crane.',
        'Lift the breaker out, keeping it balanced so it never touches the tank.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Lifting belt 3 t', 'Steel chains 975 mm', 'CB fixture'] },
      warning: { en: 'If the breaker touches the tank it is damaged. Never stand under the load.' },
    },
    {
      id: 6, estMin: 4, hazard: true,
      media: [img('11', '148'), img('11', '151')],
      title: { en: 'Set the breaker on the pallet' },
      instructions: { en: [
        'Move the breaker clear of the tank carefully.',
        'Add a layer of cushion to the pallet.',
        'Lower the breaker onto the cushioned pallet.',
      ] },
      tools: { en: ['Pallet', 'Cushion layer'] },
      warning: { en: 'Contact with the tank side scratches and damages the breaker.' },
    },
    {
      id: 7, estMin: 7, hazard: true,
      media: [img('10', '108'), img('10', '114'), img('10', '117')],
      title: { en: 'Lift the tank onto the frame' },
      instructions: { en: [
        'Sling the 4 lifting points on top of the tank; use the ladder to reach them.',
        'Crane the tank onto the frame.',
        'Secure it with 4× M16×40 bolts using a 24 mm socket and ratchet.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Ladder', 'Impact wrench', '24 mm socket', 'M16×40 bolts'] },
      warning: { en: 'Do not stand near the tank during the lift.' },
    },
    {
      id: 8, estMin: 6, hazard: false,
      media: [img('10', '102'), img('10', '105'), img('10', '120')],
      title: { en: 'Remove the upper busbar & bushings' },
      instructions: { en: [
        'Remove the internal upper busbar with the impact wrench and 17 mm socket.',
        'Remove the bushing and the lower bushing plate.',
        'Handle each part gently to avoid damage.',
      ] },
      tools: { en: ['Impact wrench', '17 mm socket', 'Ratchet', '5 mm Allen key'] },
    },
    {
      id: 9, estMin: 6, hazard: false,
      media: [img('11', '154')],
      title: { en: 'Remove the lower bushing' },
      instructions: { en: [
        'Remove the 18 button-head Allen screws securing the upper bushing.',
        'Carefully remove the lower bushing with its plate from the tank.',
        'Handle the bushing gently to avoid any damage.',
      ] },
      tools: { en: ['Ratchet', '5 mm Allen key'] },
    },
    {
      id: 10, estMin: 6, hazard: false,
      media: [img('12', '163'), img('12', '166')],
      title: { en: 'Remove the DS & gas pipe' },
      instructions: { en: [
        'Remove the 4× M12 nuts, then take the tank off the frame and onto the floor.',
        'Remove the bursting disc, then the gas pipe with a 32 mm spanner.',
        'Remove the DS and keep it safe to shift to the new Solution-3 tank.',
      ] },
      tools: { en: ['32 mm spanner', 'Ratchet'] },
    },

    // ============ SOLUTION-3 — DISMANTLE (new tank) ============
    {
      id: 11, estMin: 7, hazard: true,
      media: [img('12', '169'), img('12', '172'), img('12', '175')],
      title: { en: 'Lift the new tank from the pallet' },
      instructions: { en: [
        'Wear full PPE including the safety helmet.',
        'Sling the new tank and lift it from the pallet with the overhead crane.',
        'Move it carefully and keep clear of the suspended load.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4'] },
      warning: { en: 'Keep clear of the suspended tank; verify chains and shackles first.' },
    },
    {
      id: 12, estMin: 4, hazard: false,
      media: [img('13', '190'), img('13', '193')],
      title: { en: 'Set down & unwrap the tank' },
      instructions: { en: [
        'Place the tank on the floor.',
        'Remove all wrapping from the tank.',
        'Inspect the surfaces for damage.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 13, estMin: 5, hazard: false,
      media: [img('13', '196')],
      title: { en: 'Remove the CT terminal plate' },
      instructions: { en: [
        'Remove the 16 bolts with their washers and springs from the CT terminal.',
        'Use a 17 mm socket and ratchet.',
        'Take off the CT terminal plate.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 14, estMin: 6, hazard: false,
      media: [img('14', '222'), img('14', '225')],
      title: { en: 'Remove the back covers' },
      instructions: { en: [
        'Remove the 62 M10 nuts, washers and spring washers from the up and down sides.',
        'Use a 17 mm socket and ratchet — do NOT use the impact wrench (the stud will be damaged).',
        'Remove all hardware and keep it in the bin.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
      warning: { en: 'Do not use the impact wrench here — it damages the studs.' },
    },
    {
      id: 15, estMin: 6, hazard: true,
      media: [img('14', '228'), img('14', '231'), img('14', '234')],
      title: { en: 'Remove the rear middle cover' },
      instructions: { en: [
        'Fit 2× M10×25 eye bolts and sling the rear middle cover (~50 kg).',
        'Remove it with the overhead crane, keeping the studs undamaged.',
        'Set it aside safely.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Eye bolts M10×25 ×2', 'Steel chains 975 mm ×2'] },
      warning: { en: 'The rear middle cover is ~50 kg — keep clear during the lift.' },
    },
    {
      id: 16, estMin: 6, hazard: false,
      media: [img('15', '258'), img('15', '264')],
      title: { en: 'Remove the CT support plate' },
      instructions: { en: [
        'Remove the CT support plate with a 17 mm socket and ratchet.',
        'Use foam to prevent scratching the tank surface.',
        'Keep the plate outside the tank.',
      ] },
      tools: { en: ['Ratchet', '10 mm Allen socket', '19 mm spanner', 'Foam sheet'] },
    },

    // ============ SOLUTION-3 — ASSEMBLY ============
    {
      id: 17, estMin: 8, hazard: false,
      media: [img('15', '261'), img('15', '267')],
      title: { en: 'Clean the tank' },
      instructions: { en: [
        'Clean all tank surfaces with methanol and tissue.',
        'Vacuum out any dust or foreign particles.',
        'Make sure the bottom is completely clean.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Vacuum cleaner'] },
    },
    {
      id: 18, estMin: 8, hazard: false,
      media: [img('16', '311'), img('16', '314'), img('16', '317')],
      title: { en: 'Clean & fit the bushing plate' },
      instructions: { en: [
        'Clean the bushing plate and the 9 bushings; use the bushing locating fixture so none fall.',
        'Clean the O-ring and apply grease.',
        'Fit the bushing plate to the lower side of the tank.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Molykote grease', 'Bushing fixture'] },
    },
    {
      id: 19, estMin: 8, hazard: true,
      media: [img('16', '320'), img('16', '323'), img('16', '326')],
      title: { en: 'Crane the tank onto the platform' },
      instructions: { en: [
        'From under the tank, sling the 4 lifting points above the DS unit; keep the chains tight.',
        'Crane the tank and place it on the platform.',
        'Align the tank legs with the platform holes and secure with 4× M16×40 bolts.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4', 'M16×40 bolts'] },
      warning: { en: 'Make sure the chains are well secured and tight before lifting.' },
    },
    {
      id: 20, estMin: 4, hazard: false,
      media: [img('17', '341'), img('17', '344')],
      title: { en: 'Fix the bushing plate' },
      instructions: { en: [
        'Fit the bushing plate to the lower area of the tank.',
        'Keep the chamfered holes inside and the flat surface outside.',
        'Check the seating before tightening.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 21, estMin: 6, hazard: false,
      media: [img('17', '347'), img('17', '350')],
      title: { en: 'Bolt the bushing plates' },
      instructions: { en: [
        'Fit 3 bushing plates with 12× washers, spring washers and nuts.',
        'Tighten with a 17 mm socket and ratchet.',
        'Apply a torque of 26.5 Nm.',
      ] },
      tools: { en: ['Torque wrench', '17 mm socket'] },
    },
    {
      id: 22, estMin: 8, hazard: false,
      media: [img('17', '353'), img('17', '356')],
      title: { en: 'Fit the bushings (2-person)' },
      instructions: { en: [
        'Check each cable-socket bushing before inserting it.',
        'MP1: apply grease (1221789) to the bushing-plate contact area and fit the bushing.',
        'MP2: tighten the M8×20 bolts with an impact wrench and 5 mm Allen key; torque 13.5 Nm.',
        'Add Loctite 401 to every bolt before final tightening.',
      ] },
      tools: { en: ['Guide pins', 'Impact wrench', '5 mm Allen key', 'Torque wrench', 'Grease', 'Loctite 401'] },
    },
    {
      id: 23, estMin: 6, hazard: false,
      media: [{ type: 'svg', src: 'gis-tank-modification/step-10' }, img('18', '365'), img('18', '368')],
      title: { en: 'Torque the bushing busbars' },
      instructions: { en: [
        'Fit the busbars onto the bushings.',
        'Tighten the nuts with an 8 mm Allen key and an extension rod.',
        'Apply a torque of 47 Nm to the busbar bolts.',
      ] },
      tools: { en: ['Ratchet', '8 mm Allen socket', 'Extension rod', 'Torque wrench'] },
    },
    {
      id: 24, estMin: 5, hazard: false,
      media: [img('18', '371'), img('18', '374'), img('18', '377')],
      title: { en: 'Clean the CT support pipes' },
      instructions: { en: [
        'Take the CT support pipes to the table.',
        'Clean them completely with tissue and methanol.',
        'Clean every surface, inside and outside.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol'] },
    },
    {
      id: 25, estMin: 7, hazard: false,
      media: [img('19', '425'), img('19', '428')],
      title: { en: 'Install the CT support plates' },
      instructions: { en: [
        'Take the CT support pipe to the tank; use foam on the edges to avoid scratches.',
        'Install the plates one by one with 4× M12×35 bolts.',
        'MP1 tightens with a 10 mm Allen socket; MP2 holds the spanner underneath. Torque 47.5 Nm.',
      ] },
      tools: { en: ['10 mm Allen socket', '19 mm spanner', 'Torque wrench', 'Foam sheet'] },
    },
    {
      id: 26, estMin: 5, hazard: false,
      media: [img('19', '431'), img('19', '434'), img('19', '440')],
      title: { en: 'Clean & install the busbar' },
      instructions: { en: [
        'If needed, clean the conductor with 700–1000 grit sandpaper to remove scratches.',
        'Install the busbar with M12×35 bolts into the CT support plate.',
        'Align it properly.',
      ] },
      tools: { en: ['Sandpaper 700–1000', 'Tissue roll', 'Methanol'] },
    },
    {
      id: 27, estMin: 3, hazard: false,
      media: [img('20', '492'), img('20', '495')],
      title: { en: 'Verify the CT direction' },
      instructions: { en: [
        'Before placing each CT, check its direction.',
        'P1 must face up and P2 must face down.',
        'Confirm on all three CTs.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 28, estMin: 6, hazard: false,
      media: [img('20', '498'), img('20', '501'), img('20', '504'), img('20', '507')],
      title: { en: 'Place the CTs & insulation' },
      instructions: { en: [
        'Place 2 pieces of insulation rubber (Jean support) on each of the 3 CT supports.',
        'Set a CT, add 2 rubbers, set the next CT, then one rubber on top.',
        'Keep a 1 mm gap — the CT must not touch the plate.',
        'Lead each CT wire through the supporting rods.',
      ] },
      tools: { en: ['Insulation rubber (Jean support)'] },
    },
    {
      id: 29, estMin: 4, hazard: false,
      media: [img('20', '513'), img('20', '516')],
      title: { en: 'Fit the CT support rods' },
      instructions: { en: [
        'Fix the 4 CT support rods to the nut set on the CT support plates.',
        'Add an M12 nut and an M12 plane washer on each rod.',
        'Bring them to the level of the CT top.',
      ] },
      tools: { en: ['M12 nuts', 'M12 plane washers'] },
    },
    {
      id: 30, estMin: 6, hazard: false,
      media: [img('21', '520'), img('21', '523'), img('21', '526')],
      title: { en: 'Fit the insulation & top plate' },
      instructions: { en: [
        'Place the orange insulation plate; fit a plane and spring washer between the sheet and nut, and align it level.',
        'Mount the aluminium plate, then 3× plastic washer, spring washer and the cap nut — do NOT forget the plastic washer.',
        'Tighten with a 19 mm spanner and torque to 47.5 Nm.',
      ] },
      tools: { en: ['19 mm spanner', '19 mm socket', 'Torque wrench'] },
      warning: { en: 'Do not forget the plastic washer under the cap nut.' },
    },
    {
      id: 31, estMin: 9, hazard: true,
      media: [img('22', '555'), img('22', '558')],
      title: { en: 'Install the DS' },
      instructions: { en: [
        'Clean the top surface with methanol and apply grease at the fixing area.',
        'Crane the DS from the Solution-1 tank onto the new tank.',
        'Check the O-ring is properly seated; apply grease and silicone oil (1208914).',
        'Install the 2 guide pins so the bushing never contacts the tank.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Guide pins', 'Silicone oil', 'Molykote grease', 'Methanol', 'Tissue roll'] },
      warning: { en: 'If the O-ring is loose it can come out and be damaged — always verify its position.' },
    },
    {
      id: 32, estMin: 6, hazard: true,
      media: [img('23', '603'), img('23', '609'), img('23', '612')],
      title: { en: 'Bolt the DS & upper busbar' },
      instructions: { en: [
        'Fit 18× M8×20 bolts to fix the bushings; torque 14.70 Nm.',
        'Fix the DS to the tank with a 19 mm spanner.',
        'Fit the upper busbar with 6× M12×35 bolts; torque 47 Nm with a ratchet and 5 mm socket.',
      ] },
      tools: { en: ['19 mm spanner', 'Ratchet', '5 mm socket', 'Torque wrench'] },
      warning: { en: 'Improper torque here risks SF6 gas leakage — secure it properly.' },
    },
    {
      id: 33, estMin: 5, hazard: true,
      media: [img('23', '615'), img('23', '618')],
      title: { en: 'Fit the bursting disc' },
      instructions: { en: [
        'Clean the bursting disc and the tank surface where it sits.',
        'Fit 8× M8 nuts with 8× spring and plane washers.',
        'Tighten with a 13 mm socket and ratchet; torque 14.70 Nm.',
      ] },
      tools: { en: ['Ratchet', '13 mm socket', 'Torque wrench'] },
      warning: { en: 'Improper torque risks gas leakage — secure it properly.' },
    },
    {
      id: 34, estMin: 5, hazard: true,
      media: [img('24', '653'), img('24', '656')],
      title: { en: 'Fit the breaker O-ring' },
      instructions: { en: [
        'Lay the long, flexible O-ring into a true circle on the plate.',
        'Apply grease and silicone oil (1208914) properly.',
        'Check it is correctly fitted and not misaligned — dust must not stick to it.',
      ] },
      tools: { en: ['Silicone oil', 'Molykote grease', 'Chemical gloves', 'Tissue roll', 'Methanol'] },
      warning: { en: 'A misaligned O-ring causes gas leakage — check it carefully.' },
    },
    {
      id: 35, estMin: 8, hazard: true,
      media: [img('24', '659'), img('24', '662'), img('25', '704')],
      title: { en: 'Install the breaker' },
      instructions: { en: [
        'Crane the breaker into the tank using the balancing fixture.',
        'Keep the circuit breaker clear of the tank sides — contact causes damage and QC rejection.',
        'Secure it with 1× M10 nut and 4× M10×25 bolts; torque 26.5 Nm.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'CB fixture', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'If the breaker hits the tank sides it is damaged and rejected — work smoothly.' },
    },
    {
      id: 36, estMin: 8, hazard: false,
      media: [img('25', '710'), img('25', '713'), img('26', '733'), img('26', '739')],
      title: { en: 'Connect the CB to DS busbars' },
      instructions: { en: [
        'Clean all busbars with methanol and tissue first.',
        'Place 2 plain + 1 spring washer on the CB busbar; insert 2× M12×40 bolts.',
        'Fit the shield nut from underneath; connect the VCB busbar with an M12×35 bolt.',
        'Tighten with an 8 mm Allen key; keep busbar-to-busbar at 85 ± 3 mm; torque 47.5 Nm.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', '8 mm Allen socket', 'Torque wrench'] },
    },
    {
      id: 37, estMin: 7, hazard: false,
      media: [img('27', '767'), img('27', '770'), img('27', '773')],
      title: { en: 'Connect the CB to CT busbars' },
      instructions: { en: [
        'Connect the small joint on the CT side with 6× M12×35 bolts; torque 47 Nm.',
        'Connect the VCB side with 12× M12×40 bolts; torque 47 Nm.',
        'Keep the CT conductor 40 ± 3 mm from the inner CT support pipe; use the alignment support.',
      ] },
      tools: { en: ['Ratchet', '8 mm Allen socket', '19 mm spanner', 'Torque wrench', 'BB alignment support'] },
    },
    {
      id: 38, estMin: 10, hazard: false,
      media: [img('28', '803'), img('28', '806'), img('28', '800')],
      title: { en: 'Wire the CTs & fit the cover' },
      instructions: { en: [
        'Crimp the CT terminal wiring with 6 mm lugs (R, Y, B — 9 wires/phase, 1S1…3S3, 27 total).',
        'Fit the CT cover plate with 8× M10 bolts; check the O-ring is seated.',
        'Tighten in a cross/star pattern in stages (30 → 60 → 100%); torque 26.48 Nm.',
        'Stick the CT label/identification on the outside of the tank.',
      ] },
      tools: { en: ['Wire stripper', 'Wire crimper', '6 mm lugs', 'Ratchet', '17 mm socket', 'Torque wrench'] },
    },
    {
      id: 39, estMin: 10, hazard: false,
      media: [img('29', '853'), img('29', '856'), img('29', '862'), img('29', '868'), img('29', '871')],
      title: { en: 'Fit the zeolite & filter covers' },
      instructions: { en: [
        'Vacuum the inside of the tank; wipe the sealing surface, O-ring groove and O-ring.',
        'Fill each zeolite bag to 1.5 kg using the weighing scale (CB rear and rear-middle covers).',
        'Place each bag in its filter case and fix it inside the cover.',
        'Close the tank within 20 minutes, apply Loctite, and secure with the 6 screws.',
      ] },
      tools: { en: ['Vacuum cleaner', 'Weighing scale', 'Tissue roll', 'Methanol', 'Loctite 270 / 242'] },
      warning: { en: 'Close the tank within 20 minutes of opening the zeolite.' },
    },
    {
      id: 40, estMin: 6, hazard: false,
      media: [img('30', '901'), img('30', '904')],
      title: { en: 'Close the rear covers' },
      instructions: { en: [
        'Insert all M10 bolts and tighten halfway by hand first.',
        'Tighten in sequence (do one, skip one) for even pressure.',
        'Tighten in stages (30 → 60 → 100%); torque 26.5 Nm and recheck every nut.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench'] },
    },

    // ============ SF6 EVACUATION, FILL & TEST ============
    {
      id: 41, estMin: 8, hazard: true,
      media: [img('31', '927'), img('31', '933'), img('31', '939')],
      title: { en: 'Evacuate the air' },
      instructions: { en: [
        'Connect the hose to the machine (use the DN20→DN8 adapter if needed) and to the tank.',
        'Switch on the machine and press the green button to start evacuation.',
        'Monitor the screen; at 0.8 mbar or lower, switch off and remove the pipe.',
      ] },
      tools: { en: ['Vacuum pump ≥ 60 m³/h', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Minimum required vacuum is 0.8 mbar.' },
    },
    {
      id: 42, estMin: 8, hazard: true,
      media: [img('32', '959'), img('32', '965')],
      title: { en: 'Fill with SF6 gas' },
      instructions: { en: [
        'Turn on the main supply and set the breaker booster pump.',
        'Position the SF6 filling handle and open the cylinder valve.',
        'Set the selector to "Filling"; fill the tank to 0.05 MPa.',
        'Monitor the pressure carefully — do not exceed 0.05 MPa.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Do not exceed 0.05 MPa — overfilling can rupture the tank.' },
    },
    {
      id: 43, estMin: 6, hazard: true,
      media: [img('32', '968'), img('32', '971')],
      title: { en: 'Test the gas purity' },
      instructions: { en: [
        'Connect the SF6 gas analyzer with the self-closing hose.',
        'Check the purity is ≥ 99.75% SF6/N2.',
        'Check the dew point is ≤ −25 °C.',
      ] },
      tools: { en: ['SF6 gas analyzer', 'Self-closing hose'] },
      warning: { en: 'Certified personnel only.' },
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
