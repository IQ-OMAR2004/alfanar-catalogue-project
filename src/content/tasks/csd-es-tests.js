// 13.8 kV Switchgear Earthing Switch Tests — Commissioning Manual poster 1-6
// (reference WI-NG-6460-002-028 to 029).
//
// Purpose, as printed: to guide the responsible persons in conducting 13.8 kV
// switchgear earthing switch tests.
// Test equipment: Megger IR test kit, contact resistance test kit, circuit
// breaker analyzer.
//
// The connections are the same as the circuit breaker poster, with one addition
// the manual calls out explicitly: the earthing wire is removed from the
// earthing switch before the insulation test, otherwise the measurement is
// simply reading the earth bond.
//
// PLACEHOLDER pending SME review — transcribed from the manual. The contact
// resistance criterion is carried through exactly as printed ("> 1 GΩ") and
// flagged in the step; confirm it against the controlled test form.
import tr from './csd-es-tests-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: '13.8 kV Earthing Switch Tests' },
  summary: { en: 'Commissioning tests on a 13.8 kV switchgear earthing switch — insulation resistance, contact resistance and open/close timing.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 20, hazard: true, media: [A('ir-test')],
      title: { en: 'Insulation resistance test' },
      instructions: { en: [
        'Remove the earthing wire from the earthing switch before you start.',
        'Inject 5 kV DC for 1 minute at phase R, with phases Y and B connected to earth, as per the test connection diagram.',
        'Repeat the same connection and measurement for phase Y, then for phase B.',
        'Record the measured values in the applicable test forms and evaluate them against the acceptable criteria (> 100 MΩ).',
        'Self-check: earthing wire removed, three readings recorded above 100 MΩ.',
      ] },
      tools: { en: ['Megger IR test kit', 'HV test leads', 'Earthing leads', 'Test form'] },
      warning: { en: 'Removing the earthing wire takes away the earth this switch provides. Treat the compartment as live-capable from that moment, and put the earthing wire back as soon as the test is finished.' },
    },
    {
      id: 3, estMin: 15, hazard: true, media: [A('contact-resistance')],
      title: { en: 'Contact resistance test' },
      instructions: { en: [
        'Inject 100 A for 1 minute at phase R as per the test connection diagram.',
        'Repeat the same connection and measurement for phase Y, then for phase B.',
        'Record the measured values in the applicable test forms and evaluate them against the acceptable criteria (> 1 GΩ as printed in the manual — confirm the correct limit and unit on the controlled test form before accepting the result).',
        'Self-check: three readings recorded against the criterion on the form.',
      ] },
      tools: { en: ['Contact resistance test kit', 'Heavy current leads', 'Test form'] },
      warning: { en: '100 A flows in the test leads. Make both connections firm before you start the injection — a loose clamp at this current heats and arcs.' },
    },
    {
      id: 4, estMin: 20, hazard: true, media: [A('timing-test')],
      title: { en: 'OPEN and CLOSE timing test' },
      instructions: { en: [
        'Connect the analyzer as per the test connection diagram: main supply to the analyzer, contacts to the timing inputs, and the close and trip coils to the (+) and (−) of the battery or the DC panel.',
        'Perform the OPEN and the CLOSE timing measurements.',
        'Print and record the measured values in the applicable test forms and evaluate them against the acceptable criteria (< 20 msec).',
        'Self-check: printout attached to the test form, every phase within 20 msec.',
      ] },
      tools: { en: ['Circuit breaker analyzer', 'Timing leads', 'Coil leads', 'Test form'] },
      warning: { en: 'The earthing switch will operate during this test. Confirm nobody is working in the compartment and keep clear of the mechanism before you give the first command.' },
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
      en: 'Earthing switch tests', ar: 'اختبارات مفتاح التأريض', ur: 'ارتھنگ سوئچ جانچ',
      hi: 'अर्थिंग स्विच टेस्ट', fr: 'Essais du sectionneur de terre',
    },
  },
]

export default {
  id: 'csd-es-tests',
  order: 21,
  icon: 'earth-switch',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
