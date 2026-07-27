// Surge Arrester Tests — Commissioning Manual poster 1-10
// (reference WI-NG-6460-002-020).
//
// Purpose, as printed: to guide the responsible persons in conducting surge
// arrester tests.  Test equipment: power factor insulation test equipment,
// ammeter, IR tester, EHV/HV tester.
//
// PLACEHOLDER pending SME review — transcribed from the manual.
import tr from './csd-surge-arrester-tests-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: 'Surge Arrester Tests' },
  summary: { en: 'Commissioning tests on surge arresters — insulation resistance, dissipation factor (tan δ) and leakage current.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 15, hazard: false, media: [A('sa-setup')],
      title: { en: 'Set up the instrument & clean the bushings' },
      instructions: { en: [
        'Set up the CALIBRATED test instrument to be used on a firm, reasonably level base in a dry area.',
        'Check the calibration label is valid before you use the instrument.',
        'Thoroughly clean all bushings of the surge arresters to be tested.',
        'Self-check: instrument level and stable, every bushing clean and dry.',
      ] },
      tools: { en: ['Calibrated test instrument', 'Cleaning cloth', 'Spirit level'] },
      warning: { en: 'A dirty or damp bushing puts surface leakage into every reading that follows. Clean and dry it first, or the results are not the arrester.' },
    },
    {
      id: 3, estMin: 25, hazard: true, media: [A('sa-ir')],
      title: { en: 'Insulation resistance test' },
      instructions: { en: [
        'Perform insulation resistance testing with an injected DC voltage of 2.5 kV as per the test connections.',
        'For a single-stack arrester use the single-stack connection. For a multi-stack arrester take the overall, the lower stack and the upper stack connections in turn.',
        'Repeat the test connections on the applicable arresters for the other two phases, Y and B.',
        'Record the test results on the applicable test forms and evaluate as per standards (> 1 MΩ).',
        'Self-check: every stack and phase recorded, each above 1 MΩ.',
      ] },
      tools: { en: ['IR tester (Megger)', 'HV test leads', 'Earthing leads', 'Test form'] },
      warning: { en: 'The test leads carry 2.5 kV DC. An arrester holds charge — discharge it to earth after every measurement before you move a lead to the next stack.' },
    },
    {
      id: 4, estMin: 30, hazard: true, media: [A('sa-tandelta')],
      title: { en: 'Dissipation factor (tan δ) test' },
      instructions: { en: [
        'Perform the dissipation factor (tan δ) test as per the test connections, using the power factor insulation test equipment.',
        'Use the single-stack connection or the multi-stack connection to match the arrester being tested.',
        'Repeat the test connections on the applicable arresters for the other two phases, Y and B.',
        'Record the test results on the applicable test forms and evaluate as per standards (0.5%).',
        'Self-check: a tan δ value recorded for every arrester and phase.',
      ] },
      tools: { en: ['Power factor insulation test equipment', 'HV lead', 'Earthing leads', 'Test form'] },
      warning: { en: 'The power factor set energises the arrester at high voltage. Keep the area barriered, and let the set discharge the object before anybody touches a connection.' },
    },
    {
      id: 5, estMin: 25, hazard: true, media: [A('sa-leakage')],
      title: { en: 'Leakage current test' },
      instructions: { en: [
        'Connect the EHV / HV tester with a rated voltage to the surge arrester as per the test connection.',
        'Disconnect the earth from the surge arrester so the whole leakage current passes through the meter.',
        'Measure the leakage current for phase R as shown, with the earth disconnected.',
        'Repeat the measurement for phases Y and B.',
        'Record the measured values in the applicable test forms. The leakage current must not exceed 30 mA.',
        'Self-check: earth reconnected on every arrester before you leave the area.',
      ] },
      tools: { en: ['EHV / HV tester', 'Ammeter / clamp meter', 'Test form'] },
      warning: { en: 'The arrester earth is deliberately disconnected for this measurement, so the arrester cannot do its job while the test runs. Keep everybody clear, take the reading, and reconnect the earth immediately afterwards.' },
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
    id: 'prepare', from: 1, to: 2,
    title: {
      en: 'Preparation', ar: 'التحضير', ur: 'تیاری',
      hi: 'तैयारी', fr: 'Préparation',
    },
  },
  {
    id: 'tests', from: 3, to: 5,
    title: {
      en: 'Arrester measurements', ar: 'قياسات مانع الصواعق', ur: 'ارسٹر پیمائشیں',
      hi: 'अरेस्टर मापन', fr: 'Mesures sur parafoudre',
    },
  },
]

export default {
  id: 'csd-surge-arrester-tests',
  order: 25,
  icon: 'arrester',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
