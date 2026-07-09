// GIS Tank Modification — FULL Work Instruction (AES:AE04:IED:WI:250:00 rev 01,
// 30/06/2026). The complete 60-step ALFA-G procedure: Solution-1 dismantle →
// Solution-3 clean & assemble → close, evacuate, gas-fill → purity & leak test.
// Faithful to the controlled document: every torque, tool, count, marker rule
// (BLUE = production visual confirmation, RED = QC) and safety warning.
//
// PLACEHOLDER pending SME review — verify all values against the controlled
// document before any shop-floor use.
//
// Media: realistic SVG animations. Scenes shared with the existing GIS animated
// task are reused via `gis-tank-modification-animated/step-N`; scenes unique to
// this fuller WI (forklift, CB weight-plate fixture, chain-block rig, DS crane,
// CT 9-wire terminal, evacuation rig, leak-test bag & SF6 sniffer) are new under
// `gis-full-wi/step-N`. English is authoritative; ar/ur/hi from the JSON.
import tr from './gis-full-wi-translations.json'

const A = (n) => ({ type: 'svg', src: `gis-tank-modification-animated/step-${n}` }) // reused scene
const N = (n) => ({ type: 'svg', src: `gis-full-wi/step-${n}` })                     // new scene

const EN = {
  title: { en: 'GIS Full Dismantle & Assemble (WI)' },
  summary: { en: 'The complete 60-step ALFA-G work instruction — Solution-1 dismantle to Solution-3 gas-fill, purity and leak test.' },
  steps: [
    // ================= SOLUTION-1 DISMANTLE =================
    {
      id: 1, estMin: 8, hazard: true, media: [N(1)],
      title: { en: 'Bring the S1 tank to the GIS area' },
      instructions: { en: [
        'Bring the tank from the yard buffer area on the 5 t forklift and set it on the pallet.',
        'Move it to the Solution-1 place and set it on the floor in the GIS area.',
        'Self-check: QC-passed tag present, tank undamaged, floor clear.',
      ] },
      tools: { en: ['Forklift 5 t', 'Pallet', 'QC passed tag'] },
      warning: { en: 'Keep clear of the forklift path. Never stand under or beside a raised load. Use the materials-handling trolley for finished goods.' },
    },
    {
      id: 2, estMin: 8, hazard: false, media: [A(15)],
      title: { en: 'Assemble the pipe & pressure gauge' },
      instructions: { en: [
        'Assemble the pipe and pressure gauge, then connect the hose.',
        'Match the cap nut to its spanner and torque: G3/8 = 21 mm → 12.3 Nm, G1/2 = 24 mm → 26.5 Nm, G3/4 = 32 mm → 39.2 Nm.',
        'Self-check: fitting torqued so it cannot leak.',
      ] },
      tools: { en: ['Torque wrench', 'Female spanner 19/20/24/32 mm', 'Pressure gauge'] },
    },
    {
      id: 3, estMin: 12, hazard: true, media: [A(8)],
      title: { en: 'Recover the SF6 gas' },
      instructions: { en: [
        'Turn on the Main 25 A, the booster pump and Compressor 2 on the SF6 gas machine.',
        'Fix the pipe in the SF6 "Recovery (Absaugen)" position and rotate the handle to recovery.',
        'Set the selector to "Recovery" and recover until the tank reads zero. Use the DN20→DN8 adapter if needed.',
        'Self-check: tank at zero pressure before opening anything.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. SF6 is colourless and odourless — recover it, never vent it. Keep every hose, cap and coupling leak-tight.' },
    },
    {
      id: 4, estMin: 10, hazard: false, media: [A(4)],
      title: { en: 'Open the covers & remove the busbar' },
      instructions: { en: [
        'Remove the 62 M10 nuts and washers from the front and rear covers with a 17 mm socket and ratchet.',
        'Keep the O-ring in a safe location.',
        'Take off the covers to reach the busbar; lift the busbar out and wrap it against scratches.',
        'Self-check: busbar wrapped on the trolley, O-ring stored safely.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Wrapping / protection'] },
    },
    {
      id: 5, estMin: 8, hazard: false, media: [N(5)],
      title: { en: 'Assemble the CB fixture' },
      instructions: { en: [
        'Put the 3 weight plates on the CB fixture’s rod.',
        'Align the holes with the eye bolts.',
        'Fit the bolt at the end of the rod to secure the plates.',
        'Self-check: fixture balanced, plates secure.',
      ] },
      tools: { en: ['CB fixture', 'Weight plates ×3', 'Eye bolts', 'Spanner'] },
    },
    {
      id: 6, estMin: 10, hazard: true, media: [N(6)],
      title: { en: 'Rig the crane & chain block' },
      instructions: { en: [
        'Assemble 2 steel chains on the overhead crane, then the lifting support on the chains.',
        'Fit 2 belts on the support ends, each secured with 2 safety shackles; secure the other ends to the CB fixture.',
        'Fit a third belt on the crane and link it to the 0.5 t bi-directional chain block; attach its end to the last weight plate.',
        'Self-check: all shackles locked, chains tight, chain block free to control the load.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×2', 'Lifting support', 'Belts 3 t ×3', 'Safety shackles ×2', 'Chain block 0.5 t'] },
      warning: { en: 'Certified personnel only operate the crane. Wear a helmet. Keep clear of the suspended load.' },
    },
    {
      id: 7, estMin: 8, hazard: true, media: [A(5)],
      title: { en: 'Crane out the breaker' },
      instructions: { en: [
        'Fix the fixture to the breaker with 4 M30 bolts and 8 plane washers, aligned to the chain block.',
        'Take up the load and lift the breaker out with the crane, keeping it balanced.',
        'Self-check: breaker clear of the tank sides throughout the lift.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'CB fixture', 'M30 bolts ×4', 'Plane washers ×8'] },
      warning: { en: 'If the breaker touches the tank side it is damaged. Never stand under the load; guide it with a tag line.' },
    },
    {
      id: 8, estMin: 5, hazard: true, media: [A(6)],
      title: { en: 'Set the breaker on the pallet' },
      instructions: { en: [
        'Move the breaker clear of the tank carefully.',
        'Add a layer of cushion to the pallet, then lower the breaker onto it.',
        'Self-check: breaker resting square on cushion, undamaged.',
      ] },
      tools: { en: ['Pallet', 'Cushion layer'] },
      warning: { en: 'Contact with the tank side scratches and damages the breaker.' },
    },
    {
      id: 9, estMin: 8, hazard: true, media: [A(7)],
      title: { en: 'Lift the tank onto the frame' },
      instructions: { en: [
        'Sling the 4 lifting points on top of the tank; use the ladder to reach them.',
        'Crane the tank onto the frame.',
        'Secure it with 4 M16×40 bolts using a 24 mm socket and ratchet.',
        'Self-check: all 4 bolts tight, tank cannot shift.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Ladder', '24 mm socket', 'Ratchet', 'M16×40 bolts ×4'] },
      warning: { en: 'Wear a helmet. Do not stand near the tank during the lift.' },
    },
    {
      id: 10, estMin: 6, hazard: false, media: [A(3)],
      title: { en: 'Remove the upper busbar & bushings' },
      instructions: { en: [
        'Remove the internal upper busbar, bushing and lower bushing plate with the impact wrench and 17 mm socket.',
        'Handle each part gently to avoid damage.',
        'Self-check: parts removed clean, no chips.',
      ] },
      tools: { en: ['Impact wrench', '17 mm socket'] },
    },
    {
      id: 11, estMin: 6, hazard: false, media: [A(3)],
      title: { en: 'Remove the lower bushing' },
      instructions: { en: [
        'Remove the 18 button-head Allen screws securing the upper bushing.',
        'Carefully remove the lower bushing with its plate from the tank.',
        'Self-check: bushings undamaged, screws kept together.',
      ] },
      tools: { en: ['Ratchet', '5 mm Allen key'] },
    },
    {
      id: 12, estMin: 6, hazard: false, media: [A(4)],
      title: { en: 'Remove the DS & gas pipe' },
      instructions: { en: [
        'Remove the 4 M12 nuts, then take the tank off the frame and onto the floor.',
        'Remove the bursting disc, then the gas pipe with a 32 mm spanner.',
        'Self-check: parts kept safe for the new tank.',
      ] },
      tools: { en: ['32 mm spanner', 'Ratchet'] },
    },
    {
      id: 13, estMin: 6, hazard: false, media: [A(4)],
      title: { en: 'Dismantle the DS lifting points' },
      instructions: { en: [
        'Remove 4 spring washers, 4 plain washers and 4 nuts from each DS lifting point with the spanner.',
        'Self-check: all hardware kept together and labelled.',
      ] },
      tools: { en: ['Spanner', 'Ratchet'] },
    },
    {
      id: 14, estMin: 10, hazard: true, media: [A(4)],
      title: { en: 'Crane out the DS unit' },
      instructions: { en: [
        'Assemble the chain block directly on the crane and link it with a belt.',
        'Fit 2 safety shackles on the back-side lifting points and link them with a belt.',
        'Lift the DS unit out with the crane, keeping it balanced.',
        'Self-check: DS unit clear of the tank, on protective foam.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Belts 3 t', 'Safety shackles ×2'] },
      warning: { en: 'Keep clear of the suspended DS unit. Do not let the bushing contact the tank.' },
    },
    {
      id: 15, estMin: 3, hazard: false, media: [A(2)],
      title: { en: 'Store the O-rings' },
      instructions: { en: [
        'Keep the O-rings in a safe location, stored flat and labelled.',
        'Self-check: every O-ring accounted for.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 16, estMin: 7, hazard: true, media: [A(11)],
      title: { en: 'Lift the new S3 tank from the pallet' },
      instructions: { en: [
        'Wear full PPE including the helmet.',
        'Sling the new Solution-3 tank and lift it from the pallet with the crane.',
        'Move it carefully, clear of the suspended load.',
        'Self-check: chains and shackles verified before the lift.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4'] },
      warning: { en: 'Keep clear of the suspended tank; verify rigging first.' },
    },
    {
      id: 17, estMin: 4, hazard: false, media: [A(2)],
      title: { en: 'Set down & unwrap the S3 tank' },
      instructions: { en: [
        'Place the tank on the floor.',
        'Remove all wrapping and inspect the surfaces for damage.',
        'Self-check: surfaces clean and undamaged.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 18, estMin: 5, hazard: false, media: [A(6)],
      title: { en: 'Remove the CT terminal plate' },
      instructions: { en: [
        'Remove the 16 bolts with their washers and springs from the CT terminal.',
        'Use a 17 mm socket and ratchet; take off the CT terminal plate.',
        'Self-check: hardware kept together.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },
    {
      id: 19, estMin: 6, hazard: false, media: [A(4)],
      title: { en: 'Remove the back covers' },
      instructions: { en: [
        'Remove the 62 M10 nuts, washers and spring washers from the up and down sides with a 17 mm socket and ratchet.',
        'Do NOT use the impact wrench — the stud will be damaged.',
        'Keep all hardware in the bin.',
        'Self-check: studs undamaged.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
      warning: { en: 'Do not use the impact wrench here — it damages the studs.' },
    },
    {
      id: 20, estMin: 6, hazard: true, media: [A(4)],
      title: { en: 'Remove the rear middle cover' },
      instructions: { en: [
        'Fit 2 M10×25 eye bolts and sling the rear middle cover (~50 kg).',
        'Remove it with the overhead crane, keeping the studs undamaged.',
        'Self-check: cover set aside safely.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Eye bolts M10×25 ×2', 'Steel chains 975 mm ×2'] },
      warning: { en: 'The rear middle cover is ~50 kg. Wear a helmet and keep clear during the lift.' },
    },
    {
      id: 21, estMin: 6, hazard: false, media: [A(5)],
      title: { en: 'Remove the CT support plate' },
      instructions: { en: [
        'Remove the CT support plate with a 17 mm socket and ratchet; keep it outside.',
        'Use foam to prevent scratching the tank surface.',
        'Self-check: tank surface unscratched.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Foam sheet'] },
    },

    // ================= SOLUTION-3 CLEAN & ASSEMBLE =================
    {
      id: 22, estMin: 8, hazard: true, media: [A(2)],
      title: { en: 'Clean the tank' },
      instructions: { en: [
        'Put on chemical-resistant gloves before touching methanol.',
        'Clean all tank surfaces with methanol and tissue.',
        'Self-check: surfaces free from dust, oil and foreign material.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol'] },
      warning: { en: 'Methanol is flammable and toxic. Keep ventilation on and sparks away; wash skin with water if contact occurs.' },
    },
    {
      id: 23, estMin: 8, hazard: false, media: [A(3)],
      title: { en: 'Clean & fit the bushing plate' },
      instructions: { en: [
        'Clean the bushing plate and the 9 bushings; use the bushing locating fixture so none fall.',
        'Clean the O-ring and apply grease.',
        'Fit the bushing plate to the lower side of the tank.',
        'Self-check: bushings seated, O-ring greased.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Molykote grease', 'Bushing fixture'] },
    },
    {
      id: 24, estMin: 8, hazard: true, media: [A(4)],
      title: { en: 'Crane the tank onto the platform' },
      instructions: { en: [
        'From under the tank, sling the 4 lifting points above the DS unit; keep the chains tight.',
        'Crane the tank and place it on the platform.',
        'Self-check: chains well secured and tight before lifting.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×4', 'Safety shackles ×4'] },
      warning: { en: 'Make sure the chains are well secured and tight before lifting.' },
    },
    {
      id: 25, estMin: 4, hazard: false, media: [A(3)],
      title: { en: 'Fix the bushing plate' },
      instructions: { en: [
        'Fit the bushing plate to the lower area of the tank.',
        'Keep the chamfered holes inside and the flat surface outside.',
        'Self-check: seating correct before tightening.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 26, estMin: 6, hazard: false, media: [A(3)],
      title: { en: 'Bolt the bushing plates' },
      instructions: { en: [
        'Fit 3 bushing plates with 12 washers, spring washers and nuts.',
        'Tighten with a 17 mm socket and ratchet; torque 26.5 Nm.',
        'Mark with the BLUE marker (production) and RED marker (QC) after tightening.',
        'Self-check: every bolt torqued and marked.',
      ] },
      tools: { en: ['Torque wrench', '17 mm socket', 'Blue & red markers'] },
    },
    {
      id: 27, estMin: 8, hazard: false, media: [A(3)],
      title: { en: 'Fit the bushings (2-person)' },
      instructions: { en: [
        'Check each cable-socket bushing before inserting; use the guide pin (1321232).',
        'MP1: apply grease (1221789) to the bushing-plate contact area and fit the bushing.',
        'MP2: tighten the M8×20 bolts with the impact wrench and 5 mm Allen key; add Loctite 401 to every bolt.',
        'Self-check: bushings seated, bolts torqued.',
      ] },
      tools: { en: ['Guide pins', 'Impact wrench', '5 mm Allen key', 'Grease', 'Loctite 401'] },
    },
    {
      id: 28, estMin: 6, hazard: false, media: [A(3)],
      title: { en: 'Torque the bushing busbars' },
      instructions: { en: [
        'Fit the busbars onto the bushings.',
        'Tighten the nuts with an 8 mm Allen key and an extension rod; torque 47 Nm.',
        'Mark with the BLUE marker (production) and RED marker (QC).',
        'Self-check: busbar bolts torqued and marked.',
      ] },
      tools: { en: ['Ratchet', '8 mm Allen socket', 'Extension rod', 'Torque wrench', 'Blue & red markers'] },
    },
    {
      id: 29, estMin: 5, hazard: false, media: [A(2)],
      title: { en: 'Clean the CT support pipes' },
      instructions: { en: [
        'Take the CT support pipes to the table.',
        'Clean every surface — inside and outside — with tissue and methanol.',
        'Self-check: pipes completely clean.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol'] },
    },
    {
      id: 30, estMin: 7, hazard: false, media: [A(5)],
      title: { en: 'Install the CT support plates' },
      instructions: { en: [
        'Take the CT support pipe to the tank; use foam on the edges to avoid scratches.',
        'Install the plates one by one with M12×35 bolts.',
        'MP1 tightens with a 10 mm Allen socket; MP2 holds the spanner underneath. Torque 47.5 Nm.',
        'Self-check: plates torqued evenly.',
      ] },
      tools: { en: ['10 mm Allen socket', '19 mm spanner', 'Torque wrench', 'Foam sheet'] },
    },
    {
      id: 31, estMin: 5, hazard: false, media: [A(5)],
      title: { en: 'Clean & install the conductor' },
      instructions: { en: [
        'If needed, clean the conductor with 700–1000 grit sandpaper to remove debris.',
        'Install the conductor and fix it with an M12×35 bolt into the CT support plate.',
        'Align it properly.',
        'Self-check: conductor aligned and secure.',
      ] },
      tools: { en: ['Sandpaper 700–1000', 'Tissue roll', 'Methanol'] },
    },
    {
      id: 32, estMin: 3, hazard: false, media: [A(5)],
      title: { en: 'Verify the conductor direction' },
      instructions: { en: [
        'From the front side of the tank, verify the conductor directions.',
        'Self-check: directions correct per the drawing.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 33, estMin: 3, hazard: false, media: [A(5)],
      title: { en: 'Verify the CT direction' },
      instructions: { en: [
        'Before placing each CT, verify P1 faces up and P2 faces down.',
        'Confirm on all three CTs.',
        'Self-check: P1 up / P2 down on every CT.',
      ] },
      tools: { en: ['—'] },
    },
    {
      id: 34, estMin: 6, hazard: false, media: [A(5)],
      title: { en: 'Place the CTs & insulation' },
      instructions: { en: [
        'Place 2 insulation rubbers (Jean support) on each of the 3 CT supports.',
        'Set a CT, add 2 rubbers, set the next CT, then rubbers on top.',
        'Lead each CT wire through the supporting rods.',
        'Self-check: CTs seated, insulation between each.',
      ] },
      tools: { en: ['Insulation rubber (Jean support)'] },
    },
    {
      id: 35, estMin: 4, hazard: false, media: [A(5)],
      title: { en: 'Fit the CT support rods' },
      instructions: { en: [
        'Fix the 4 CT support rods to the nut set on the CT support plates.',
        'Add an M12 nut and plain washer on each rod to the level of the CT top.',
        'Self-check: rods at CT-top level.',
      ] },
      tools: { en: ['M12 nuts', 'M12 plane washers'] },
    },
    {
      id: 36, estMin: 5, hazard: false, media: [A(5)],
      title: { en: 'Fit the orange insulation plate' },
      instructions: { en: [
        'Place the orange insulation plate; fit a plane and spring washer between the sheet and nut.',
        'Align the sheet horizontally (same height on both nuts).',
        'If a gap is found under the plate, add insulation rubber (Jean support).',
        'Self-check: plate level, no gap.',
      ] },
      tools: { en: ['19 mm spanner', 'Insulation rubber'] },
    },
    {
      id: 37, estMin: 6, hazard: false, media: [A(5)],
      title: { en: 'Fit the top CT support plate' },
      instructions: { en: [
        'Fit a nut, then a plain washer; mount the aluminium plate, then 3 plastic washers, spring washer and cap nut.',
        'Do NOT forget the plastic washer.',
        'Tighten with a 19 mm spanner; torque 47.5 Nm. Mark BLUE (production) and RED (QC).',
        'Self-check: cap nuts torqued and marked.',
      ] },
      tools: { en: ['19 mm spanner', 'Torque wrench', 'Blue & red markers'] },
      warning: { en: 'Do not forget the plastic washer under the cap nut.' },
    },
    {
      id: 38, estMin: 9, hazard: true, media: [A(4)],
      title: { en: 'Install the DS onto the S3 tank' },
      instructions: { en: [
        'Clean the top surface with methanol and apply grease at the fixing area.',
        'Crane the DS from Solution-1 onto the new Solution-3 tank.',
        'Check the bushing is clean, the O-ring correctly positioned; apply grease and silicone oil (1208914).',
        'Self-check: O-ring seated, DS aligned.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'Methanol', 'Molykote grease', 'Silicone oil'] },
      warning: { en: 'A misaligned O-ring causes SF6 leakage — verify its position. Keep clear of the suspended DS.' },
    },
    {
      id: 39, estMin: 4, hazard: true, media: [A(4)],
      title: { en: 'Install the DS guide pins' },
      instructions: { en: [
        'While lifting, install the 2 guide pins (1321232) so the bushing never contacts the tank.',
        'Self-check: guide pins in place before seating the DS.',
      ] },
      tools: { en: ['Guide pins ×2'] },
      warning: { en: 'If the bushing contacts the tank it is damaged.' },
    },
    {
      id: 40, estMin: 6, hazard: true, media: [A(4)],
      title: { en: 'Bolt the DS & upper busbar' },
      instructions: { en: [
        'Fit 18 M8×20 bolts to fix the bushings; torque 14.70 Nm.',
        'Fix the DS to the tank with a 19 mm spanner.',
        'Fit the upper busbar with 6 M12×35 bolts; torque 47 Nm with a ratchet and 5 mm socket. Mark BLUE and RED.',
        'Self-check: all torqued and marked.',
      ] },
      tools: { en: ['19 mm spanner', 'Ratchet', '5 mm socket', 'Torque wrench', 'Blue & red markers'] },
      warning: { en: 'Improper torque here risks SF6 gas leakage — secure it properly.' },
    },
    {
      id: 41, estMin: 5, hazard: true, media: [A(3)],
      title: { en: 'Fit the bursting disc' },
      instructions: { en: [
        'Clean the bursting disc and the tank surface where it sits.',
        'Fit 8 M8 nuts with 8 spring and plane washers; tighten with a 13 mm socket and ratchet; torque 14.70 Nm.',
        'Mark with the RED marker (QC).',
        'Self-check: disc torqued and marked.',
      ] },
      tools: { en: ['Ratchet', '13 mm socket', 'Torque wrench', 'Red marker'] },
      warning: { en: 'Improper torque risks gas leakage — secure it properly.' },
    },
    {
      id: 42, estMin: 8, hazard: false, media: [N(5)],
      title: { en: 'Re-assemble the CB fixture' },
      instructions: { en: [
        'Put the 3 weight plates on the CB fixture’s rod and align the holes with the eye bolts.',
        'Fit the bolt at the end of the rod.',
        'Self-check: fixture balanced and secure.',
      ] },
      tools: { en: ['CB fixture', 'Weight plates ×3', 'Eye bolts', 'Spanner'] },
    },
    {
      id: 43, estMin: 8, hazard: true, media: [N(6)],
      title: { en: 'Re-rig the crane & chain block' },
      instructions: { en: [
        'Assemble the 2 steel chains and lifting support on the crane.',
        'Fit the belts with safety shackles to the support and CB fixture.',
        'Link the third belt to the 0.5 t chain block and the last weight plate.',
        'Self-check: rigging secure, chain block controlling the load.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Steel chains 975 mm ×2', 'Belts 3 t ×3', 'Safety shackles', 'Chain block 0.5 t'] },
      warning: { en: 'Certified personnel only. Wear a helmet; keep clear of the load.' },
    },
    {
      id: 44, estMin: 8, hazard: true, media: [A(6)],
      title: { en: 'Install the S1 breaker into the S3 tank' },
      instructions: { en: [
        'Take the Solution-1 circuit breaker and crane it into the Solution-3 tank with the CB fixture.',
        'Keep the breaker clear of the tank sides — contact causes damage.',
        'Self-check: breaker lowered smoothly, no contact.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'CB fixture', 'Chain block 0.5 t'] },
      warning: { en: 'If the breaker hits the tank sides it is damaged and rejected — work smoothly.' },
    },
    {
      id: 45, estMin: 5, hazard: true, media: [A(4)],
      title: { en: 'Fit the breaker O-ring' },
      instructions: { en: [
        'Lay the long, flexible O-ring into a true circle on the plate.',
        'Apply grease and silicone oil (1208914) properly.',
        'Check it is correctly fitted — dust must not stick to it.',
        'Self-check: O-ring in a true circle, greased.',
      ] },
      tools: { en: ['Silicone oil', 'Molykote grease', 'Tissue roll', 'Methanol'] },
      warning: { en: 'A misaligned O-ring causes gas leakage — check it carefully.' },
    },
    {
      id: 46, estMin: 8, hazard: true, media: [A(6)],
      title: { en: 'Seat & secure the breaker' },
      instructions: { en: [
        'Crane the breaker into the tank using the balancing fixture; keep it clear of the sides.',
        'Secure it with 1 M10 nut and 4 M10×25 bolts; torque 26.5 Nm.',
        'Self-check: breaker square, all bolts marked.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'CB fixture', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Contact with the tank sides causes QC rejection — work smoothly and carefully.' },
    },
    {
      id: 47, estMin: 8, hazard: false, media: [A(3)],
      title: { en: 'Connect the CB to DS busbars' },
      instructions: { en: [
        'Clean all busbars with methanol and tissue.',
        'Place 2 plain + 1 spring washer on the CB busbar; from underneath the VCB busbar, fit the shield nut to connect it.',
        'Mark with the BLUE marker (production) and RED marker (QC).',
        'Self-check: joint clean, torqued and marked.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', '8 mm Allen socket', 'Torque wrench', 'Blue & red markers'] },
    },
    {
      id: 48, estMin: 7, hazard: false, media: [A(3)],
      title: { en: 'Connect the CB to CT busbars' },
      instructions: { en: [
        'Connect the CT-side small joint with 6 M12×35 bolts; torque 47 Nm.',
        'Connect the VCB side with 12 M12×40 bolts.',
        'Keep the CT conductor at the specified distance from the inner CT support pipe.',
        'Self-check: distances kept, bolts torqued.',
      ] },
      tools: { en: ['Ratchet', '8 mm Allen socket', '19 mm spanner', 'Torque wrench'] },
    },
    {
      id: 49, estMin: 12, hazard: false, media: [N(49)],
      title: { en: 'Wire the CTs & fit the cover plate' },
      instructions: { en: [
        'Wire the CT terminals with 6 mm lugs — 9 wires per phase (R, Y, B): lower CT wires to the right plate, upper to the left; e.g. R phase 1S1 first.',
        'Crimp each lug; check every cable against its terminal number.',
        'Fit the CT cover plate with its O-ring seated; use the 8 M10 bolts (17 mm socket).',
        'Tighten in a cross/star pattern in stages (30 → 60 → 100%); recheck all bolts. Mark BLUE and RED.',
      ] },
      tools: { en: ['Wire crimper', '6 mm lugs', 'Ratchet', '17 mm socket', 'Torque wrench', 'Blue & red markers'] },
    },

    // ================= CLOSE, EVACUATE, GAS =================
    {
      id: 50, estMin: 8, hazard: false, media: [A(7)],
      title: { en: 'Clean the tank & fit the zeolite' },
      instructions: { en: [
        'Vacuum the inside of the tank; make sure the bottom is completely clean with no foreign particles.',
        'Wipe the sealing surface, the cover O-ring groove and the O-ring with a clean cloth.',
        'Fit the zeolite and prepare to close the tank.',
        'Self-check: interior clean, sealing faces wiped.',
      ] },
      tools: { en: ['Vacuum cleaner', 'Tissue roll', 'Methanol', 'Zeolite'] },
      warning: { en: 'Close the tank promptly after opening the zeolite — it absorbs moisture from the air.' },
    },
    {
      id: 51, estMin: 6, hazard: false, media: [A(7)],
      title: { en: 'Close the rear covers' },
      instructions: { en: [
        'Insert all M10 bolts and tighten halfway by hand first.',
        'Tighten in sequence — do one, skip one — for even pressure.',
        'Tighten in stages (30 → 60 → 100%); recheck every bolt. Mark BLUE and RED.',
        'Self-check: covers even, all bolts marked.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench', 'Blue & red markers'] },
    },
    {
      id: 52, estMin: 6, hazard: false, media: [A(15)],
      title: { en: 'Fit the pipes & gauges, close the valve' },
      instructions: { en: [
        'Assemble the pipes and pressure gauges; torque to the spanner-size table (G3/8 → 12.3 Nm … G3/4 → 39.2 Nm).',
        'Rotate the valve from Open (O) to Close (C) and confirm it is sealed and torqued.',
        'Self-check: no leak, valve closed and marked.',
      ] },
      tools: { en: ['Torque wrench', 'Female spanner 19/20/24/32 mm', 'Pressure gauges'] },
    },
    {
      id: 53, estMin: 8, hazard: true, media: [A(8)],
      title: { en: 'Perform the vacuum process' },
      instructions: { en: [
        'Connect the hose to the machine (DN20→DN8 adapter if needed) and to the tank; rotate the valve to Open (O).',
        'Press the green button to start evacuation.',
        'At 0.8 mbar or lower, switch off and remove the pipe.',
        'Self-check: vacuum value recorded before disconnect.',
      ] },
      tools: { en: ['Vacuum pump ≥ 60 m³/h', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Minimum required vacuum is 0.8 mbar.' },
    },
    {
      id: 54, estMin: 6, hazard: true, media: [A(9)],
      title: { en: 'Set up the gas filling' },
      instructions: { en: [
        'Position the SF6 filling handle.',
        'Set the machine selector to "Filling" (use the DN20→DN8 adapter if needed).',
        'Self-check: connections leak-tight before filling.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Keep every connection leak-tight.' },
    },
    {
      id: 55, estMin: 8, hazard: true, media: [A(9)],
      title: { en: 'Fill with SF6 gas' },
      instructions: { en: [
        'Fill the tank with SF6 to 0.05 MPa.',
        'Do NOT exceed 0.05 MPa — overfilling can cause tank failure.',
        'Monitor the pressure carefully throughout.',
        'Self-check: pressure at 0.05 MPa, no leak.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'Pressure gauge'] },
      warning: { en: 'Do not exceed 0.05 MPa. SF6 is colourless and odourless — keep every connection leak-tight and the area ventilated.' },
    },
    {
      id: 56, estMin: 5, hazard: false, media: [A(15)],
      title: { en: 'Close & seal the valve' },
      instructions: { en: [
        'Rotate the valve from Open (O) to Close (C).',
        'Confirm it is sealed and torqued so the pipe cannot leak.',
        'Self-check: valve closed, no hiss.',
      ] },
      tools: { en: ['Torque wrench', 'Female spanner'] },
    },
    {
      id: 57, estMin: 6, hazard: true, media: [A(10)],
      title: { en: 'Check the gas purity & dew point' },
      instructions: { en: [
        'Connect the SF6 gas analyzer to the tank.',
        'Check the purity: it must be 99.75% or higher (SF6/N2).',
        'Check the dew point: it must be −25 °C or colder.',
        'Self-check: both values recorded and within limits.',
      ] },
      tools: { en: ['SF6 gas analyzer', 'Self-closing hose'] },
      warning: { en: 'Certified personnel only. Out-of-spec gas must be reported immediately.' },
    },

    // ================= LEAK TEST =================
    {
      id: 58, estMin: 10, hazard: true, media: [N(58)],
      title: { en: 'Bag the tank for leak testing' },
      instructions: { en: [
        'Bring the cumulative plastic bag (1330308) and cover the tank for leakage testing only.',
        'Use 2 ladders and 2 MPs to fit the bag without damage.',
        'Wear your PPE and lock the ladders’ wheels.',
        'Self-check: bag over the whole tank, no tears.',
      ] },
      tools: { en: ['Cumulative plastic bag', 'Ladders ×2'] },
      warning: { en: 'Wear PPE. Make sure the ladder wheels are locked before climbing.' },
    },
    {
      id: 59, estMin: 6, hazard: false, media: [N(58)],
      title: { en: 'Seal the bag to the floor' },
      instructions: { en: [
        'Secure the plastic bag completely to the floor with alfanar packing tape (1043008).',
        'Self-check: bag sealed all round, no gaps.',
      ] },
      tools: { en: ['Packing tape'] },
    },
    {
      id: 60, estMin: 8, hazard: true, media: [N(60)],
      title: { en: 'Sniffer leak test (24–48 h)' },
      instructions: { en: [
        'Wait 24–48 hours.',
        'Open the bag at the end by removing the packing tape.',
        'Insert the SF6 gas sniffer (1252532) and press ON — the instrument beeps and reads if it detects SF6.',
        'Self-check: no leak detected; record the result. Report any leak to the supervisor.',
      ] },
      tools: { en: ['SF6 gas sniffer', 'Test record'] },
      warning: { en: 'A detected leak means an unsealed compartment — do not release the panel; report immediately.' },
    },
  ],
}

// ---- merge English base with ./gis-full-wi-translations.json (ar/ur/hi) -----
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
  id: 'gis-full-wi',
  order: 8,
  icon: 'gis-tank',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'safety_glasses', 'gloves', 'hearing_protection', 'safety_boots', 'arm_sleeves', 'face_shield'],
  placeholder: true,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
