// 13.8 kV Earthing Switch Tests (Manual photos)
// PHOTO edition of ./csd-es-tests.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-6 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-es-tests.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 2: 'es-ir', 3: 'es-cr', 4: 'es-timing' }, {
  id: 'csd-es-tests-photos',
  order: 27,
  title: {
    en: '13.8 kV Earthing Switch Tests (Manual photos)',
    ar: 'اختبارات مفتاح التأريض 13.8 kV (صور الدليل)',
    ur: '13.8 kV ارتھنگ سوئچ جانچ (کتابچے کی تصاویر)',
    hi: '13.8 kV अर्थिंग स्विच टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essais sectionneur de terre 13,8 kV (photos du manuel)',
  },
  summary: {
    en: 'The same earthing switch tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات مفتاح التأريض، معروضة بمخططات التوصيل المطبوعة في الدليل.',
    ur: 'وہی ارتھنگ سوئچ جانچ، کتابچے میں چھپے جوڑ کے خاکوں کے ساتھ۔',
    hi: 'वही अर्थिंग स्विच टेस्ट, मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais de sectionneur de terre, illustrés par les schémas du manuel.',
  },
})
