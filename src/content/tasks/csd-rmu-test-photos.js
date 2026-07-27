// Ring Main Unit Test (Manual photos)
// PHOTO edition of ./csd-rmu-test.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-9 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-rmu-test.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 2: 'rmu-ir', 3: 'rmu-cr', 4: 'rmu-timing' }, {
  id: 'csd-rmu-test-photos',
  order: 30,
  title: {
    en: 'Ring Main Unit Test (Manual photos)',
    ar: 'اختبار وحدة الحلقة الرئيسية (صور الدليل)',
    ur: 'رنگ مین یونٹ ٹیسٹ (مینوئل تصاویر)',
    hi: 'रिंग मेन यूनिट टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essai unité en boucle (photos du manuel)',
  },
  summary: {
    en: 'The same ring main unit tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات وحدة الحلقة الرئيسية، معروضة بمخططات التوصيل المطبوعة في الدليل.',
    ur: 'وہی رنگ مین یونٹ ٹیسٹ، مینوئل میں چھپے کنکشن ڈایاگرام کے ساتھ۔',
    hi: 'वही रिंग मेन यूनिट टेस्ट, मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais d’unité en boucle, illustrés par les schémas du manuel.',
  },
})
