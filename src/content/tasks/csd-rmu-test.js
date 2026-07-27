// Ring Main Unit Test — Commissioning Manual poster 1-9
// (references WI-NG-6460-002-005; PR-NG-6460-002).
//
// Purpose, as printed: to guide the responsible persons in conducting ring main
// unit tests.  Test equipment: Megger IR test kit, contact resistance test kit,
// breaker analyzer test kit.
//
// PLACEHOLDER pending SME review — transcribed from the manual. The contact
// resistance criterion is carried through exactly as printed ("> 1 GΩ") and
// flagged in the step; confirm it against the controlled test form.
import tr from './csd-rmu-test-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: 'Ring Main Unit Test' },
  summary: { en: 'Commissioning tests on a ring main unit — insulation resistance, contact resistance and timing, then record and evaluate.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 20, hazard: true, media: [A('ir-test')],
      title: { en: 'Insulation resistance test' },
      instructions: { en: [
        'Connect the IR tester as per the test connection diagram: phase R to earth, with 5 kV applied for 1 minute.',
        'Repeat the test for phase Y to earth, then phase B to earth.',
        'Evaluate each reading against the criteria (> 100 MΩ).',
        'Self-check: three readings taken, each above 100 MΩ.',
      ] },
      tools: { en: ['Megger IR test kit', 'HV test leads', 'Earthing leads'] },
      warning: { en: 'The test leads carry 5 kV DC. Keep the RMU compartment closed to others while the test runs, and discharge each phase to earth before moving a lead.' },
    },
    {
      id: 3, estMin: 15, hazard: true, media: [A('contact-resistance')],
      title: { en: 'Contact resistance test' },
      instructions: { en: [
        'Connect the contact resistance set at phase R as per the test connection diagram.',
        'Repeat the test for phase Y and for phase B.',
        'Evaluate each reading against the criteria (> 1 GΩ as printed in the manual — confirm the correct limit and unit on the controlled test form before accepting the result).',
        'Self-check: three readings taken against the criterion on the form.',
      ] },
      tools: { en: ['Contact resistance test kit', 'Heavy current leads'] },
      warning: { en: 'Heavy test current flows in the leads. Make both connections firm before injection — a loose clamp heats and arcs.' },
    },
    {
      id: 4, estMin: 20, hazard: true, media: [A('timing-test')],
      title: { en: 'Timing test' },
      instructions: { en: [
        'Connect the breaker analyzer as per the test connection diagram: main supply, the phase contacts, and the trip and close coils to the (+) and (−) of the battery or the DC panel.',
        'Perform the timing measurement.',
        'Evaluate the result against the criteria (< 20 msec).',
        'Self-check: every phase within 20 msec.',
      ] },
      tools: { en: ['Breaker analyzer test kit', 'Timing leads', 'Coil leads'] },
      warning: { en: 'The switch will operate during this test. Confirm nobody is working on the unit and keep clear of the mechanism before the first command.' },
    },
    {
      id: 5, estMin: 10, hazard: false, media: [A('record-evaluate')],
      title: { en: 'Record and evaluate the results' },
      instructions: { en: [
        'Record the measured values from all three tests in the applicable test forms.',
        'Evaluate every value against its acceptable standard / criterion.',
        'Report any value outside its criterion to the supervisor instead of re-testing on your own.',
        'Self-check: the form is complete and signed.',
      ] },
      tools: { en: ['Test forms', 'Pen'] },
    },
  ],
}

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

const sections = [
  {
    id: 'prepare', from: 1, to: 1,
    title: {
      en: 'Safety preparation', ar: 'تحضيرات السلامة', ur: 'حفاظتی تیاری',
      hi: 'सुरक्षा तैयारी', fr: 'Préparation sécurité',
    },
  },
  {
    id: 'tests', from: 2, to: 4,
    title: {
      en: 'Ring main unit tests', ar: 'اختبارات وحدة الحلقة الرئيسية', ur: 'رنگ مین یونٹ ٹیسٹ',
      hi: 'रिंग मेन यूनिट टेस्ट', fr: 'Essais de l’unité en boucle',
    },
  },
  {
    id: 'close', from: 5, to: 5,
    title: {
      en: 'Record & evaluate', ar: 'التسجيل والتقييم', ur: 'ریکارڈ اور جانچ',
      hi: 'रिकॉर्ड और मूल्यांकन', fr: 'Consigner et évaluer',
    },
  },
]

export default {
  id: 'csd-rmu-test',
  order: 24,
  icon: 'rmu',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
