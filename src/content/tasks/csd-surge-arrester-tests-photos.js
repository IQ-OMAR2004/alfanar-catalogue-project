// Surge Arrester Tests (Manual photos)
// PHOTO edition of ./csd-surge-arrester-tests.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-10 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-surge-arrester-tests.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 3: 'sa-ir', 4: 'sa-tandelta', 5: 'sa-leakage' }, {
  id: 'csd-surge-arrester-tests-photos',
  order: 31,
  title: {
    en: 'Surge Arrester Tests (Manual photos)',
    ar: 'اختبارات مانع الصواعق (صور الدليل)',
    ur: 'سرج ارسٹر ٹیسٹ (مینوئل تصاویر)',
    hi: 'सर्ज अरेस्टर टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essais parafoudre (photos du manuel)',
  },
  summary: {
    en: 'The same surge arrester tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات مانع الصواعق، معروضة بمخططات التوصيل المطبوعة في الدليل.',
    ur: 'وہی سرج ارسٹر ٹیسٹ، مینوئل میں چھپے کنکشن ڈایاگرام کے ساتھ۔',
    hi: 'वही सर्ज अरेस्टर टेस्ट, मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais de parafoudre, illustrés par les schémas du manuel.',
  },
})
