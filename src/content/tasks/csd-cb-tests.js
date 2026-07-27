// 13.8 kV Switchgear Circuit Breaker Tests — National Grid SA, Commissioning
// Services Department, Commissioning Manual posters 1-5.1 and 1-5.2
// (reference WI-NG-6460-002-028 to 029).
//
// Purpose, as printed: to guide the responsible persons in conducting GIS
// 13.8 kV switchgear circuit breaker tests.
// Test equipment: Megger IR test kit, contact resistance test kit, circuit
// breaker analyzer.
//
// Step 1 carries the five SAFETY PRECAUTIONS printed at the head of every
// poster; they apply before, during and after every measurement.
//
// PLACEHOLDER pending SME review — transcribed from the manual. One acceptance
// criterion is carried through exactly as printed and flagged in the step
// itself: the contact resistance limit reads "> 1 GΩ" on the poster, which is
// the opposite sense to how contact resistance is normally judged (a few tens
// of µΩ, maximum). Confirm against the controlled test form before use.
import tr from './csd-cb-tests-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: '13.8 kV CB Tests' },
  summary: { en: 'Commissioning tests on a 13.8 kV switchgear circuit breaker — insulation, contact resistance, timing, anti-pump and racking indications.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 20, hazard: true, media: [A('ir-test')],
      title: { en: 'Insulation resistance test' },
      instructions: { en: [
        'Inject 5 kV DC for 1 minute at phase R, with phases Y and B connected to earth, as per the test connection diagram.',
        'Repeat the same connection and measurement for phase Y, then for phase B.',
        'Record the measured values in the applicable test forms and evaluate them against the acceptable criteria (> 100 MΩ).',
        'Self-check: three readings recorded, each above 100 MΩ.',
      ] },
      tools: { en: ['Megger IR test kit', 'HV test leads', 'Earthing leads', 'Test form'] },
      warning: { en: 'The test leads carry 5 kV DC. Nobody touches the switchgear while the test is running, and the circuit is discharged to earth after every measurement before any lead is moved.' },
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
        'Connect the circuit breaker analyzer as per the test connection diagram: main supply to the analyzer, contacts to the timing inputs, and the close and trip coils to the (+) and (−) of the battery or the DC panel.',
        'Perform the OPEN and the CLOSE timing measurements.',
        'Print and record the measured values in the applicable test forms and evaluate them against the acceptable criteria (< 20 msec).',
        'Self-check: printout attached to the test form, every phase within 20 msec.',
      ] },
      tools: { en: ['Circuit breaker analyzer', 'Timing leads', 'Coil leads', 'Test form'] },
      warning: { en: 'The breaker will operate during this test. Confirm nobody is working on the truck or the mechanism, and keep clear of the moving parts before you give the first command.' },
    },
    {
      id: 5, estMin: 12, hazard: true, media: [A('anti-pump')],
      title: { en: 'Anti-pump relay function verification' },
      instructions: { en: [
        'Close the circuit breaker electrically and keep the close signal applied.',
        'Observe that the close circuit has an open contact, which prevents any further close operation for as long as the close signal is maintained.',
        'Confirm that the anti-pump relay (Y-relay) stops the breaker from closing again immediately after it has been tripped open on concurrent close and trip signals.',
        'Record the result in the applicable test form.',
        'Self-check: only one close operation occurs while the close signal is held.',
      ] },
      tools: { en: ['Control supply', 'Test form'] },
      warning: { en: 'This test operates the breaker on live control supply. Give concurrent close and trip signals only from the control position, never by forcing the mechanism by hand.' },
    },
    {
      id: 6, estMin: 12, hazard: true, media: [A('racking')],
      title: { en: 'Indications during racking in and out' },
      instructions: { en: [
        'Rack the circuit breaker in and out with the racking handle, through the opening for manual spring-charging.',
        'While it travels, verify the CHARGED / DISCHARGED indicator and the CLOSED / OPEN indicator follow the real state of the breaker.',
        'Verify the operations counter steps on, and check the CLOSE and OPEN pushbuttons and the rating plate.',
        'Record the result in the applicable test form.',
        'Self-check: every indication agrees with the actual breaker position and state.',
      ] },
      tools: { en: ['Racking handle', 'Test form'] },
      warning: { en: 'Rack only with the door closed and the handle fully engaged. Do not stand in front of the truck while racking, and stop immediately if the handle binds.' },
    },
  ],
}

// ---- merge English base with ./csd-cb-tests-translations.json --------------
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
      en: 'Safety preparation',
      ar: 'تحضيرات السلامة',
      ur: 'حفاظتی تیاری',
      hi: 'सुरक्षा तैयारी',
      fr: 'Préparation sécurité',
    },
  },
  {
    id: 'electrical', from: 2, to: 4,
    title: {
      en: 'Electrical measurements',
      ar: 'القياسات الكهربائية',
      ur: 'برقی پیمائشیں',
      hi: 'विद्युत मापन',
      fr: 'Mesures électriques',
    },
  },
  {
    id: 'functional', from: 5, to: 6,
    title: {
      en: 'Functional checks',
      ar: 'الفحوصات الوظيفية',
      ur: 'فنکشنل چیک',
      hi: 'फंक्शनल जाँच',
      fr: 'Contrôles fonctionnels',
    },
  },
]

export default {
  id: 'csd-cb-tests',
  order: 20,
  icon: 'breaker-test',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}

export { EN, sections }
