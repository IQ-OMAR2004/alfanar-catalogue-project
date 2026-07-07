// GIS Project Plan — CASE 1: Transfer from Solution 1 Tank to Solution 3 Tank
// (Outgoing & Incomer). Built from the controlled brief "Create a GIS project
// plan consisting of three main cases" (Case 1) and its shop-floor photographs.
//
// Flow: receive S1 tank → reserve empty S3 tank → recover SF6 → dismantle S1
// (DS/ES, internal busbars, breaker, cable bushings #1/#2, closing sheets) →
// scrap unwanted busbars & empty tank → empty the S1 enclosure → clean the S3
// tank → assemble into S3 (DS/ES, busbars, breaker, cable bushings, closing
// sheets, CTs, required busbars, zeolite housing) → install zeolite & close →
// vacuum → SF6 fill → final checks (dew point, purity).
//
// Production-manager voice: prepare → act → self-check. Written for non-native
// readers (short imperative lines, no workshop slang, comparisons in words).
//
// PLACEHOLDER pending SME review — the brief lists the activity sequence; the
// torque values, tool sizes and part counts carried here are drawn from the
// sister ALFA-G work instruction (AES:AE04:IED:WI:250:00) where the operation
// is the same, and are marked "(per drawing — TBD)" where no controlled value
// exists. Verify against the controlled documents before any shop-floor use.
//
// Media: the brief's own photographs (public/media/gis-case1/imgN.jpg) plus the
// realistic SVG animations at src/animations/gis-s1-to-s3-transfer/step-N.jsx.
// English is authoritative; ar/ur/hi come from ./gis-s1-to-s3-translations.json.
import tr from './gis-s1-to-s3-translations.json'

const img = (n) => ({ type: 'image', src: `/media/gis-case1/img${n}.jpg` })
const anim = (n) => ({ type: 'svg', src: `gis-s1-to-s3-transfer/step-${n}` })

const EN = {
  title: { en: 'S1 → S3 Tank Transfer (Case 1)' },
  summary: { en: 'Transfer a GIS bay from a Solution 1 tank to a Solution 3 tank — dismantle, clean, reassemble, gas-fill and test.' },
  steps: [
    // ============ RECEIVE & PREPARE ============
    {
      id: 1, estMin: 8, hazard: true,
      media: [anim(1)],
      title: { en: 'Receive the Solution 1 GIS tank' },
      instructions: { en: [
        'Before you start: lifting gear inspected, team informed, lighting and ventilation OK.',
        'Receive the Solution 1 (S1) GIS tank and check it against the job card.',
        'Bring it into the modification area on the handling trolley.',
        'Set it down on a clean, stable floor.',
        'Self-check: job card matches the tank, no visible damage.',
      ] },
      tools: { en: ['Handling trolley', 'Job card', 'BOM checklist'] },
      warning: { en: 'Move the tank on the materials-handling trolley only. Keep both hands on the handle and push from behind — never walk beside the load. Check the aisle is clear first.' },
    },
    {
      id: 2, estMin: 6, hazard: false,
      media: [anim(2)],
      title: { en: 'Reserve an empty Solution 3 tank' },
      instructions: { en: [
        'Reserve an empty Solution 3 (S3) tank for the assembly.',
        'Check the S3 tank is the correct type for this bay (Outgoing & Incomer).',
        'Bring it to the workstation and keep it protected until cleaning.',
        'Self-check: S3 tank tagged and reserved for this job only.',
      ] },
      tools: { en: ['Handling trolley', 'Reservation tag'] },
    },
    {
      id: 3, estMin: 12, hazard: true,
      media: [anim(3)],
      title: { en: 'Recover the SF6 gas from the S1 tank' },
      instructions: { en: [
        'Only certified personnel operate the SF6 gas machine.',
        'Connect the DN8 hose to the tank and the gas machine (use the DN20-to-DN8 adapter if needed).',
        'Turn on the main supply, booster pump and compressor.',
        'Set the machine to "Recovery" and recover until the tank pressure reads zero.',
        'Self-check: tank at zero pressure before you open anything.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'SF6 is colourless, odourless and heavier than air — recover it, never vent it to the room. Keep every hose, cap and coupling leak-tight and the ventilation running. Do not open the tank until the gauge reads zero.' },
    },

    // ============ DISMANTLE THE SOLUTION 1 TANK ============
    {
      id: 4, estMin: 12, hazard: true,
      media: [img('1'), img('2'), img('3'), anim(4)],
      title: { en: 'Dismantle: remove the DS/ES' },
      instructions: { en: [
        'Confirm the tank is at zero pressure and the gas is fully recovered.',
        'Disconnect the DS/ES control wiring at the Harting connectors (marked A, D, E).',
        'Set the mechanism to a safe position, then release the chain drive.',
        'Remove the DS/ES (disconnector / earthing switch) and keep it on protective foam.',
        'Self-check: DS/ES undamaged, contacts protected, hardware bagged and labelled.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Allen keys', 'Foam sheet'] },
      warning: { en: 'The DS/ES is a safety device — handle it gently and never force the mechanism. Keep fingers clear of the chain drive and sprockets while releasing it.' },
    },
    {
      id: 5, estMin: 10, hazard: false,
      media: [img('4'), img('5'), img('6'), img('7'), anim(5)],
      title: { en: 'Dismantle: remove the internal busbars (BB)' },
      instructions: { en: [
        'Remove the bolts holding each internal busbar with the ratchet and socket.',
        'Lift out each silver-plated busbar one by one.',
        'Wrap each busbar to protect the plated contact faces from scratches.',
        'Lay the wrapped busbars on the trolley.',
        'Self-check: contact faces unscratched, hardware kept together.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Wrapping / protection'] },
    },
    {
      id: 6, estMin: 12, hazard: true,
      media: [img('8'), img('9'), img('10'), anim(6)],
      title: { en: 'Dismantle: remove the circuit breaker' },
      instructions: { en: [
        'Fit the CB lifting fixture to the breaker with its bolts and washers.',
        'Take up the load on the overhead crane and chain block — keep it balanced.',
        'Lift the breaker straight out so it never touches the tank sides.',
        'Lower it onto the cushioned breaker trolley (marked INC. for the incomer).',
        'Self-check: breaker clear of the tank, resting square on cushion.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'CB fixture', 'Lifting slings', 'Cushion / pallet'] },
      warning: { en: 'Suspended load: never stand under or beside the hanging breaker. If the breaker touches the tank it is damaged and rejected. Guide it with a tag line, not with your hands.' },
    },
    {
      id: 7, estMin: 8, hazard: false,
      media: [img('11'), anim(7)],
      title: { en: 'Dismantle: remove cable bushing #1' },
      instructions: { en: [
        'Remove the button-head Allen screws around the cable bushing #1 flange.',
        'Carefully draw the brown epoxy bushing out of the tank.',
        'Handle it gently — a chipped bushing is scrap.',
        'Place it upright on protective foam.',
        'Self-check: bushing surface clean and undamaged, all screws kept.',
      ] },
      tools: { en: ['Ratchet', '5 mm Allen key', 'Foam sheet'] },
    },
    {
      id: 8, estMin: 8, hazard: false,
      media: [img('12'), anim(8)],
      title: { en: 'Dismantle: remove cable bushing #2' },
      instructions: { en: [
        'Remove the button-head Allen screws around the cable bushing #2 flange.',
        'Carefully draw the second bushing out of the tank.',
        'Place it upright on protective foam beside bushing #1.',
        'Self-check: both bushings undamaged and clearly separated (#1 and #2).',
      ] },
      tools: { en: ['Ratchet', '5 mm Allen key', 'Foam sheet'] },
    },
    {
      id: 9, estMin: 8, hazard: false,
      media: [img('13'), img('14'), anim(9)],
      title: { en: 'Dismantle: remove the closing sheets' },
      instructions: { en: [
        'Remove the perimeter nuts holding each closing sheet (cover plate).',
        'Take off the closing sheets and lift out the O-ring seals.',
        'Keep each O-ring safe and mark its position.',
        'Self-check: sealing faces not scratched, O-rings stored flat and labelled.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket'] },
    },

    // ============ SCRAP & CLEAR ============
    {
      id: 10, estMin: 6, hazard: false,
      media: [anim(10)],
      title: { en: 'Scrap the unwanted busbars' },
      instructions: { en: [
        'Sort the removed busbars: reusable ones to the protected rack, unwanted ones to scrap.',
        'Move the unwanted busbars to the marked scrap area.',
        'Record the scrapped items on the job card.',
        'Self-check: only unwanted busbars scrapped — reusable parts kept.',
      ] },
      tools: { en: ['Scrap bin', 'Job card'] },
    },
    {
      id: 11, estMin: 6, hazard: true,
      media: [img('15'), anim(11)],
      title: { en: 'Scrap the empty S1 tank' },
      instructions: { en: [
        'Confirm the S1 tank is fully empty and gas-free.',
        'Move the empty S1 enclosure to the scrap area with the trolley or crane.',
        'Record the scrapped tank against the job card.',
        'Self-check: tank empty, no reusable parts left inside before scrapping.',
      ] },
      tools: { en: ['Handling trolley', 'Overhead crane ≥ 3.2 t', 'Job card'] },
      warning: { en: 'Confirm the tank is gas-free before scrapping — never cut or drill a tank that may still hold SF6. Keep clear during any lift.' },
    },
    {
      id: 12, estMin: 6, hazard: false,
      media: [anim(12)],
      title: { en: 'Empty the Solution 1 enclosure' },
      instructions: { en: [
        'Clear any remaining parts, hardware and packing from the S1 enclosure area.',
        'Return reusable parts to their labelled bins.',
        'Leave the workstation clean and ready for the S3 build.',
        'Self-check: nothing from the S1 job left on the bench or floor.',
      ] },
      tools: { en: ['Parts bins', 'Cleaning tissue'] },
    },

    // ============ PREPARE THE SOLUTION 3 TANK ============
    {
      id: 13, estMin: 12, hazard: true,
      media: [img('16'), anim(13)],
      title: { en: 'Clean the Solution 3 tank' },
      instructions: { en: [
        'Put on chemical-resistant gloves and goggles before touching methanol.',
        'Wipe every internal surface of the S3 tank with methanol and lint-free tissue.',
        'Clean around every bushing opening and sealing face.',
        'Vacuum out all dust and loose particles; clean the bottom last.',
        'Self-check: surfaces free from dust, oil and foreign material — this is a gas compartment.',
      ] },
      tools: { en: ['Chemical gloves', 'Tissue roll', 'Methanol', 'Vacuum cleaner'] },
      warning: { en: 'Methanol is flammable and toxic — it passes through skin and its vapour causes dizziness. Keep the container closed when not pouring, keep ventilation on, and keep all sparks and hot work away. If it touches skin, wash with water at once and report it.' },
    },

    // ============ ASSEMBLE INTO THE SOLUTION 3 TANK ============
    {
      id: 14, estMin: 12, hazard: true,
      media: [anim(14)],
      title: { en: 'Assemble: fit the DS/ES' },
      instructions: { en: [
        'Clean the DS/ES mating face and check the O-ring sits fully in its groove — not twisted or pinched. Apply grease and silicone oil.',
        'Fit the DS/ES into the S3 tank on its guide pins — the mechanism must never contact the tank.',
        'Bolt it down and torque (per drawing — TBD).',
        'Reconnect the Harting control connectors (A, D, E) and check the status indicator.',
        'Self-check: O-ring seated, mechanism operates DS-close / ES-close cleanly.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Guide pins', 'Ratchet', '17 mm socket', 'Torque wrench', 'Molykote grease', 'Silicone oil'] },
      warning: { en: 'A pinched O-ring means an SF6 leak. Guide the DS/ES by the guide pins only — never put fingers between the part and the tank flange while it hangs.' },
    },
    {
      id: 15, estMin: 10, hazard: false,
      media: [anim(15)],
      title: { en: 'Assemble: fit the internal busbars (BB)' },
      instructions: { en: [
        'Clean each busbar contact face; if scratched, polish with 700–1000 grit sandpaper.',
        'Fit each internal busbar in its position inside the S3 tank.',
        'Bolt each joint and torque (per drawing — TBD). Mark each bolt with the red marker.',
        'Self-check: solid metal-to-metal contact, every bolt torqued and marked.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench', 'Sandpaper 700–1000 grit', 'Molykote grease'] },
    },
    {
      id: 16, estMin: 12, hazard: true,
      media: [anim(16)],
      title: { en: 'Assemble: fit the circuit breaker' },
      instructions: { en: [
        'Fit the CB lifting fixture and take up the load on the crane and chain block.',
        'Lower the breaker into the S3 tank — keep it clear of the tank sides.',
        'Seat it on its mount and secure with its bolts; torque (per drawing — TBD).',
        'Self-check: breaker square in the tank, never touched the sides, all bolts marked.',
      ] },
      tools: { en: ['Overhead crane ≥ 3.2 t', 'Chain block 0.5 t', 'CB fixture', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Suspended load: keep everyone clear. If the breaker touches the tank sides it is damaged and rejected — lower it slowly and straight.' },
    },
    {
      id: 17, estMin: 10, hazard: false,
      media: [anim(17)],
      title: { en: 'Assemble: fit cable bushing #1' },
      instructions: { en: [
        'Inspect cable bushing #1 and clean the flange contact area; apply grease.',
        'Fit the bushing using guide pins so it cannot fall.',
        'Fit the button-head Allen screws and torque (per drawing — TBD).',
        'Self-check: bushing seated square, O-ring not pinched, screws marked.',
      ] },
      tools: { en: ['Guide pins', 'Ratchet', '5 mm Allen key', 'Torque wrench', 'Molykote grease'] },
    },
    {
      id: 18, estMin: 10, hazard: false,
      media: [anim(18)],
      title: { en: 'Assemble: fit cable bushing #2' },
      instructions: { en: [
        'Inspect cable bushing #2 and clean the flange contact area; apply grease.',
        'Fit the bushing using guide pins so it cannot fall.',
        'Fit the button-head Allen screws and torque (per drawing — TBD).',
        'Self-check: both bushings (#1 and #2) seated square and gas-tight.',
      ] },
      tools: { en: ['Guide pins', 'Ratchet', '5 mm Allen key', 'Torque wrench', 'Molykote grease'] },
    },
    {
      id: 19, estMin: 8, hazard: false,
      media: [anim(19)],
      title: { en: 'Assemble: fit the closing sheets' },
      instructions: { en: [
        'Clean each closing-sheet sealing face and lay the O-ring into a true circle.',
        'Apply grease and silicone oil to each O-ring.',
        'Fit the closing sheets and tighten the perimeter nuts in a cross pattern (per drawing — TBD).',
        'Self-check: covers flat, O-rings seated, no gap at the corners.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench', 'Molykote grease', 'Silicone oil'] },
    },
    {
      id: 20, estMin: 14, hazard: false,
      media: [img('17'), img('18'), anim(20)],
      title: { en: 'Assemble: install the Current Transformers (CTs)' },
      instructions: { en: [
        'Check each CT direction before fitting: P1 faces up, P2 faces down.',
        'Fit each CT over its support with the insulation rubbers; keep a 1 mm gap so the CT does not touch the plate.',
        'Lead each CT wire through the support rods.',
        'Crimp a lug on every CT wire and test the CTs before the tank is closed.',
        'Self-check: P1 up / P2 down on all CTs; every core tested and recorded.',
      ] },
      tools: { en: ['Insulation rubber supports', 'Wire crimper', '6 mm lugs', 'CT test set'] },
      warning: { en: 'A reversed CT (P1/P2 swapped) fails final testing after the tank is sealed — check every CT before you continue. Only a trained operator runs the CT test set.' },
    },
    {
      id: 21, estMin: 10, hazard: false,
      media: [anim(21)],
      title: { en: 'Assemble: fit the required busbars (BB)' },
      instructions: { en: [
        'Fit the remaining required busbars that connect the breaker, CTs and bushings.',
        'Clean every contact face; polish with 700–1000 grit sandpaper if scratched.',
        'Bolt each joint and torque (per drawing — TBD); keep the specified busbar gaps.',
        'Self-check: all connections tight and marked, alignment correct.',
      ] },
      tools: { en: ['Ratchet', '8 mm Allen socket', 'Torque wrench', 'Sandpaper 700–1000 grit'] },
    },
    {
      id: 22, estMin: 8, hazard: false,
      media: [img('19'), img('20'), anim(22)],
      title: { en: 'Assemble: fit the zeolite housing' },
      instructions: { en: [
        'Clean the zeolite housing (filter ring flange) and its sealing face.',
        'Fit the housing in its position with the O-ring seated.',
        'Bolt it and torque (per drawing — TBD).',
        'Self-check: housing seated flat, ready to receive the zeolite bag.',
      ] },
      tools: { en: ['Ratchet', '17 mm socket', 'Torque wrench', 'Molykote grease'] },
    },

    // ============ CLOSE, VACUUM, GAS & TEST ============
    {
      id: 23, estMin: 12, hazard: true,
      media: [anim(23)],
      title: { en: 'Install the zeolite & close the S3 tank — 20 minutes' },
      instructions: { en: [
        'Vacuum the inside of the tank; wipe the sealing surface, O-ring groove and O-ring.',
        'Weigh the zeolite bag to its specified weight on the scale.',
        'Open the zeolite — you now have 20 minutes to seal the tank.',
        'Fit the zeolite bag in its housing, then close the tank cover.',
        'Tighten the nuts in a cross pattern in stages — first 30%, then 60%, then 100% (torque per drawing — TBD).',
        'Self-check: tank sealed inside the 20-minute window, every nut marked.',
      ] },
      tools: { en: ['Vacuum cleaner', 'Weighing scale', 'Tissue roll', 'Loctite threadlocker', 'Ratchet', '17 mm socket', 'Torque wrench'] },
      warning: { en: 'Close the tank within 20 minutes of opening the zeolite — it absorbs moisture from the air, and wet zeolite fails the dew-point test.' },
    },
    {
      id: 24, estMin: 8, hazard: true,
      media: [anim(24)],
      title: { en: 'Perform the vacuum process' },
      instructions: { en: [
        'Connect the DN8 hose between the vacuum pump and the tank (adapter if needed).',
        'Switch the machine on and start the vacuum.',
        'Watch the screen: the pressure must go DOWN to 0.8 mbar or lower before you stop.',
        'Self-check: write the final vacuum value on the process record before you disconnect.',
      ] },
      tools: { en: ['Vacuum pump ≥ 60 m³/h', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Certified personnel only. Check the hose and couplings are fully engaged before starting — a hose released under vacuum whips violently. Vent the line before disconnecting any coupling.' },
    },
    {
      id: 25, estMin: 8, hazard: true,
      media: [anim(25)],
      title: { en: 'Fill the tank with SF6 gas' },
      instructions: { en: [
        'Turn on the main supply and booster pump on the SF6 gas machine.',
        'Set the filling handle, open the cylinder valve and set the selector to "Filling".',
        'Fill the tank to its rated filling pressure — watch the gauge the whole time.',
        'Self-check: check every hose, cap and connection by hand and by ear — nothing loose, no hissing.',
      ] },
      tools: { en: ['SF6 gas machine', 'DN8 hose', 'DN20→DN8 adapter'] },
      warning: { en: 'Do not exceed the rated filling pressure. SF6 is colourless, odourless and heavier than air — a leak silently replaces the air at floor level. Keep ventilation running. If you hear hissing or feel dizzy: close the valve, leave the area, report.' },
    },
    {
      id: 26, estMin: 8, hazard: true,
      media: [img('21'), anim(26)],
      title: { en: 'Final quality checks — dew point & SF6 purity' },
      instructions: { en: [
        'Connect the SF6 analyzer (DILO MultiAnalyser) with the self-closing hose only.',
        'Measure the dew point: it must be −25 °C or colder.',
        'Verify the SF6 purity: it must be 99.75% or higher.',
        'Write both values on the process record.',
        'If either value fails: stop, disconnect, and inform the supervisor — do not re-test on your own.',
      ] },
      tools: { en: ['SF6 gas analyzer', 'Self-closing hose'] },
      warning: { en: 'Certified personnel only. The analyzer vents SF6 sample gas while it measures — keep ventilation running and connect only with the self-closing hose so gas cannot free-flow.' },
    },
  ],
}

// ---- merge English base with ./gis-s1-to-s3-translations.json (ar/ur/hi) ----
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
  id: 'gis-s1-to-s3-transfer',
  order: 7,
  icon: 'gis-tank',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'safety_glasses', 'gloves', 'hearing_protection', 'safety_boots', 'arm_sleeves', 'face_shield'],
  placeholder: true,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
