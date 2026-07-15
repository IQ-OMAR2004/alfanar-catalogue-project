// GIS Full Dismantle & Assemble (WI+) — PHOTO variant of ./gis-full-wi.js.
//
// Same 60-step ALFA-G work instruction (AES:AE04:IED:WI:250:00 rev 01,
// 30/06/2026) — every title, instruction, tool, warning and translation is
// reused verbatim from the base task. What changes is the media: each step
// leads with the real shop-floor photographs taken from the controlled Word
// document, followed by the base task's animation as a closing summary slide.
//
// The document numbers most steps but not all (steps 1–4 and 8 are unnumbered
// narrative, 22/24/41/42 are glued to callout text, and "38." appears twice —
// a numbering bug in the controlled doc). Steps 4, 5 and 31 share a paragraph
// block with their neighbours, so the document gives them no separately
// identifiable photo; those fall back to the animation alone.
//
// Photo -> step mapping lives in ./gis-full-wi-plus-photos.json (step id ->
// document image numbers, in document order). Files are the same images
// exported to web JPEGs at public/media/gis-wi-plus/img<N>.jpg, where <N> is
// the original document image number, so any photo can be traced back.
//
// PLACEHOLDER pending SME review — photo placement is derived from document
// order and has not been confirmed by a subject-matter expert.
import base from './gis-full-wi.js'
import photos from './gis-full-wi-plus-photos.json'

const img = (n) => ({ type: 'image', src: `/media/gis-wi-plus/img${n}.jpg` })

// Photos first (document order), then the base animation as the last slide.
const steps = base.steps.map((s) => {
  const shots = photos[String(s.id)] || []
  const anim = [].concat(s.media)
  return { ...s, media: shots.length ? [...shots.map(img), ...anim] : anim }
})

export default {
  ...base,
  id: 'gis-full-wi-plus',
  order: 9,
  title: {
    en: 'GIS Full Dismantle & Assemble (WI+)',
    ar: 'التفكيك والتجميع الكامل لخزان GIS (تعليمات العمل +)',
    ur: 'GIS ٹینک مکمل علیحدگی اور تنصیب (WI+)',
    hi: 'GIS टैंक पूर्ण निराकरण और संयोजन (WI+)',
    fr: 'Démontage et assemblage complets GIS (WI+)',
  },
  summary: {
    en: 'The complete 60-step work instruction, shown with the real photographs from the shop floor.',
    ar: 'تعليمات العمل الكاملة المكوّنة من 60 خطوة، معروضة بالصور الحقيقية من أرض المصنع.',
    ur: 'مکمل 60 مراحل ورک انسٹرکشن، فیکٹری فلور کی اصل تصاویر کے ساتھ۔',
    hi: 'संपूर्ण 60-चरण कार्य निर्देश, शॉप फ़्लोर की वास्तविक तस्वीरों के साथ।',
    fr: 'L’instruction de travail complète en 60 étapes, illustrée par les photographies réelles prises à l’atelier.',
  },
  steps,
}
