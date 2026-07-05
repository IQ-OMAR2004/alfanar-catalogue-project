// GIS Tank Modification — ANIMATED variant.
// Same procedure as ./gis-tank-modification.js (all 34 Work-Proposal steps —
// transfer after boxing through packing — their titles,
// instructions, tools, warnings and every translation are reused verbatim), but
// every step's media is a hand-authored SVG/CSS animation instead of the
// document photos. Each step N renders the component at
// src/animations/gis-tank-modification-animated/step-N.jsx.
//
// PLACEHOLDER pending SME review — the animations are realistic illustrations
// of the ALFA-G equipment and action, not engineering drawings. Verify against
// the controlled documents (GIS Work Proposal 1 + AES:AE04:IED:WI:250:00).
import base from './gis-tank-modification.js'

// Reuse the fully-merged steps (all languages intact); only the media changes.
const steps = base.steps.map((s) => ({
  ...s,
  media: { type: 'svg', src: `gis-tank-modification-animated/step-${s.id}` },
}))

export default {
  ...base,
  id: 'gis-tank-modification-animated',
  order: 6,
  title: {
    en: 'GIS Tank Modification (Animated)',
    ar: 'تعديل خزان GIS (رسوم متحركة)',
    ur: 'GIS ٹینک ترمیم (متحرک)',
    hi: 'GIS टैंक संशोधन (एनिमेटेड)',
  },
  summary: {
    en: 'The full GIS tank procedure — every step shown as a clear looping animation.',
    ar: 'إجراء خزان GIS كاملاً — كل خطوة معروضة كرسم متحرك واضح ومتكرر.',
    ur: 'مکمل GIS ٹینک طریقہ کار — ہر مرحلہ ایک واضح، بار بار چلنے والی اینیمیشن کے طور پر۔',
    hi: 'संपूर्ण GIS टैंक प्रक्रिया — हर चरण एक स्पष्ट लूपिंग एनिमेशन के रूप में।',
  },
  steps,
}
