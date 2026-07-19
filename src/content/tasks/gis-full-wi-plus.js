// GIS Full Dismantle & Assemble (WI+) — PHOTO variant of ./gis-full-wi.js.
//
// Same 60-step ALFA-G work instruction (AES:AE04:IED:WI:250:00 rev 01,
// 30/06/2026) — every title, instruction, tool, warning and translation is
// reused verbatim from the base task. What changes is the media: each step
// shows the real shop-floor photographs from the controlled Word document
// where they exist, and falls back to the base task's animation only for the
// few steps the document does not photograph separately (42, 43, 56).
//
// Photo -> step mapping lives in ./gis-full-wi-plus-photos.json (step id ->
// document image numbers, in document order). Files are the same images
// exported to web JPEGs at public/media/gis-wi-plus/img<N>.jpg, where <N> is
// the original document image number, so any photo can be traced back.
//
// The map is curated (see scripts/rebuild.py in the work notes): tool/material
// product-shot images are excluded (they are already named in each step's tools
// list, shown on the right), Word's duplicate images are de-duplicated, each
// real photo appears in only one step, and steps are capped so the photo grid
// stays legible.
//
// PLACEHOLDER pending SME review — photo placement is derived from the document
// and has not been confirmed by a subject-matter expert.
import base from './gis-full-wi.js'
import photos from './gis-full-wi-plus-photos.json'

const img = (n) => ({ type: 'image', src: `/media/gis-wi-plus/img${n}.jpg` })

// Photos where the document has them; the base animation only where it does not
// (per the original brief: "use the photos, and if there is no photo use the
// animation"). Never both, so the photo gallery is never diluted by a tiny
// animation cell.
const steps = base.steps.map((s) => {
  const shots = photos[String(s.id)] || []
  return { ...s, media: shots.length ? shots.map(img) : [].concat(s.media) }
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
