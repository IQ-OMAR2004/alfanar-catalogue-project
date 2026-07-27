// 13.8 kV Switchgear HV Tests — Commissioning Manual poster 1-8
// (reference WI-NG-6460-002-028 to 29).
//
// Purpose, as printed: to guide the responsible persons in conducting 13.8 kV
// switchgear HV tests.  Test equipment: VLF HV test instrument.
//
// The same VLF withstand is run twice: once with the circuit breaker ON, once
// with it OFF. Both runs need all earth wiring removed and the earth switch in
// the ON position, and both are judged on leakage current against the factory
// test value.
//
// PLACEHOLDER pending SME review — transcribed from the manual.
import tr from './csd-hv-tests-translations.json'
import { safetyStep } from '../csd-safety.js'

const A = (n) => ({ type: 'svg', src: `csd-commissioning/${n}` })

const EN = {
  title: { en: '13.8 kV Switchgear HV Tests' },
  summary: { en: 'VLF high-voltage withstand on 13.8 kV switchgear — run with the breaker closed and again with it open, judged on leakage current.' },
  steps: [
    safetyStep(),
    {
      id: 2, estMin: 30, hazard: true, media: [A('vlf-cb-on')],
      title: { en: 'VLF high voltage test — breaker ON' },
      instructions: { en: [
        'Put the circuit breaker ON, remove all earth wiring, and leave the earth switch in the ON position.',
        'Inject 3 Uo (3 × rated voltage / √3) for a duration of 1 minute at phase R, with phases Y and B earthed, as per the connection diagram.',
        'Repeat the same procedure for the remaining two phases, Y and B.',
        'Record the leakage current for each phase. It must be as per the factory test value (< 10 microA).',
        'Self-check: three leakage readings recorded, each under 10 microA.',
      ] },
      tools: { en: ['VLF HV test instrument', 'HV connection lead', 'Earthing leads', 'Test form'] },
      warning: { en: 'This applies three times the phase voltage. Nobody may be inside the barriered area while the set is energised, and the object must be discharged and earthed through the test set before anybody approaches it.' },
    },
    {
      id: 3, estMin: 30, hazard: true, media: [A('vlf-cb-off')],
      title: { en: 'VLF high voltage test — breaker OFF' },
      instructions: { en: [
        'Put the circuit breaker OFF, remove all earth wiring, and leave the earth switch in the ON position.',
        'Inject 3 Uo (3 × rated voltage / √3) for a duration of 1 minute at phase R, with phases Y and B earthed, as per the connection diagram.',
        'Repeat the same procedure for the remaining two phases, Y and B.',
        'Record the leakage current for each phase. It must be as per the factory test value (< 10 microA).',
        'Self-check: three leakage readings recorded, each under 10 microA.',
      ] },
      tools: { en: ['VLF HV test instrument', 'HV connection lead', 'Earthing leads', 'Test form'] },
      warning: { en: 'With the breaker open the test voltage also stresses the open contact gap. Keep the same barriers and distance as the breaker-ON run, and never approach until the set has discharged the object.' },
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
    id: 'vlf', from: 2, to: 3,
    title: {
      en: 'VLF withstand test', ar: 'اختبار التحمل VLF', ur: 'VLF وِد اسٹینڈ ٹیسٹ',
      hi: 'VLF विदस्टैंड टेस्ट', fr: 'Essai de tenue VLF',
    },
  },
]

export default {
  id: 'csd-hv-tests',
  order: 23,
  icon: 'hv-test',
  difficulty: 'advanced',
  ppe: ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots'],
  placeholder: true,
  sections,
  title: mergeF(EN.title, tr.meta && tr.meta.title),
  summary: mergeF(EN.summary, tr.meta && tr.meta.summary),
  steps,
}
