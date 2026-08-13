// 13.8 kV Busbar Tests (Manual photos)
// PHOTO edition of ./csd-busbar-tests.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-7 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-busbar-tests.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 2: 'bb-phase', 3: ['bb-ir-r', 'bb-ir-y', 'bb-ir-b'] }, {
  id: 'csd-busbar-tests-photos',
  order: 28,
  title: {
    en: '13.8 kV Busbar Tests (Manual photos)',
    ar: 'اختبارات القضبان الناقلة 13.8 kV (صور الدليل)',
    ur: '13.8 kV بس بار جانچ (کتابچے کی تصاویر)',
    hi: '13.8 kV बसबार टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essais jeux de barres 13,8 kV (photos du manuel)',
  },
  summary: {
    en: 'The same busbar tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات القضبان الناقلة، معروضة بمخططات التوصيل المطبوعة في الدليل.',
    ur: 'وہی بس بار جانچ، کتابچے میں چھپے جوڑ کے خاکوں کے ساتھ۔',
    hi: 'वही बसबार टेस्ट, मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais de jeux de barres, illustrés par les schémas du manuel.',
  },
})
