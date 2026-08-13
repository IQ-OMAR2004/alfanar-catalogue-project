// 13.8 kV Switchgear HV Tests (Manual photos)
// PHOTO edition of ./csd-hv-tests.js — identical procedure, wording and
// translations; every step shows the connection diagram printed on poster
// 1-8 of the CSD Commissioning Manual instead of the animation.
// Steps the manual does not illustrate keep the animated edition's animation.
import base from './csd-hv-tests.js'
import { photoVariant } from '../csd-photos.js'

export default photoVariant(base, { 1: 'safety', 2: 'hv-cb-on', 3: 'hv-cb-off' }, {
  id: 'csd-hv-tests-photos',
  order: 29,
  title: {
    en: '13.8 kV Switchgear HV Tests (Manual photos)',
    ar: 'اختبارات الجهد العالي 13.8 kV (صور الدليل)',
    ur: '13.8 kV سوئچ گیئر HV جانچ (کتابچے کی تصاویر)',
    hi: '13.8 kV स्विचगियर HV टेस्ट (मैनुअल फ़ोटो)',
    fr: 'Essais HT appareillage 13,8 kV (photos du manuel)',
  },
  summary: {
    en: 'The same VLF high-voltage tests, shown with the connection diagrams printed in the commissioning manual.',
    ar: 'نفس اختبارات الجهد العالي VLF، معروضة بمخططات التوصيل المطبوعة في الدليل.',
    ur: 'وہی VLF ہائی وولٹیج جانچ، کتابچے میں چھپے جوڑ کے خاکوں کے ساتھ۔',
    hi: 'वही VLF हाई-वोल्टेज टेस्ट, मैनुअल में छपे कनेक्शन डायग्राम के साथ।',
    fr: 'Les mêmes essais VLF, illustrés par les schémas du manuel.',
  },
})
