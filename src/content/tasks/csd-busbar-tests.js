// 13.8 kV Switchgear Busbar Tests — Commissioning Manual poster 1-7
// (reference WI-NG-6460-002-028 to 029).
//
// Purpose, as printed: to guide the responsible persons in conducting 13.8 kV
// switchgear busbar tests.  Test equipment: Megger IR test kit.
//
// Two measurements: a phase check that proves both ends of a bar belong to the
// same phase (the reading must be zero), and an insulation resistance
// measurement per phase at 5 kV.
//
// PLACEHOLDER pending SME review — transcribed from the manual.
import tr from './csd-busbar-tests-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: '13.8 kV Busbar Tests' },
  summary: { en: 'Commissioning tests on 13.8 kV switchgear busbars — phase checking end to end, then insulation resistance on each conductor.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 20, hazard: true, media: [A('bb-phase-check')],
      title: { en: 'Phase checking for busbar' },
      instructions: { en: [
        'Apply 1 kV DC test voltage by connecting the megger terminals at one end of the busbar, as shown in the figure.',
        'Ground the other end through a switch and measure the resistance by closing that switch.',
        'Repeat the test for phase Y (with phases R and B open) and then for phase B (with phases Y and R open).',
        'Record the measured resistance in the applicable test forms. It must equal zero, which indicates both ends belong to the same phase.',
        'Self-check: a zero reading obtained on all three phases.',
      ] },
      tools: { en: ['Megger IR test kit', 'Test leads', 'Shorting switch', 'Test form'] },
      warning: { en: 'Work at one end at a time and keep the far end under your own control. A reading that is not zero means the ends are not the same phase — stop and report it instead of re-terminating on your own.' },
    },
    {
      id: 3, estMin: 25, hazard: true, media: [A('bb-ir')],
      title: { en: 'Insulation resistance measurement' },
      instructions: { en: [
        'Conduct the test as per the connection diagram with 5 kV DC applied from the IR / capacitance tester, for a duration of 1 minute.',
        'Test phase R first, then repeat the same connection for phase Y and for phase B.',
        'Record the measured IR values in the applicable test forms and evaluate them against the standards / set criteria (> 100 MΩ).',
        'Self-check: three readings recorded, each above 100 MΩ.',
      ] },
      tools: { en: ['Megger IR test kit', 'HV test leads', 'Earthing leads', 'Test form'] },
      warning: { en: 'A busbar holds its charge after a 5 kV test. Discharge each conductor to earth and leave the discharge stick on it before you touch a terminal or move to the next phase.' },
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
    id: 'tests', from: 2, to: 3,
    title: {
      en: 'Busbar tests', ar: 'اختبارات القضبان الناقلة', ur: 'بس بار جانچ',
      hi: 'बसबार टेस्ट', fr: 'Essais des jeux de barres',
    },
  },
]

export default {
  id: 'csd-busbar-tests',
  order: 22,
  icon: 'busbar',
  difficulty: 'intermediate',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
