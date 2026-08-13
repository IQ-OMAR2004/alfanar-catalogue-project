// 13.8 kV CB Tests (Manual photos)
// PHOTO edition of ./csd-cb-tests.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-5.1 and 1-5.2 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-cb-tests.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 2: 'cb-ir', 3: 'cb-cr', 4: 'cb-timing', 5: 'cb-antipump', 6: 'cb-racking' }, {
  id: 'csd-cb-tests-photos',
  order: 26,
  title: {
    en: '13.8 kV CB Tests (Manual photos)',
    ar: 'اختبارات قاطع 13.8 kV (صور الدليل)',
    ur: '13.8 kV CB جانچ (کتابچے کی تصاویر)',
    hi: '13.8 kV CB टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essais disjoncteur 13,8 kV (photos du manuel)',
  },
  summary: {
    en: 'The same circuit breaker tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات القاطع، معروضة بمخططات التوصيل المطبوعة في دليل الإدخال في الخدمة.',
    ur: 'وہی سرکٹ بریکر جانچ، کمیشننگ کتابچے میں چھپے جوڑ کے خاکوں کے ساتھ۔',
    hi: 'वही सर्किट ब्रेकर टेस्ट, कमीशनिंग मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais de disjoncteur, illustrés par les schémas de raccordement du manuel.',
  },
})
