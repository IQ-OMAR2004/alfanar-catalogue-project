// The SAFETY PRECAUTIONS block printed at the head of every poster in the CSD
// Commissioning Manual. It is identical on all six posters, so it is written
// once here and every commissioning task opens with it as step 1.
//
// Printed wording:
//   "The following Safety precautions shall be taken in consideration prior,
//    during and after conducting the test measurements."
//   1 Safety tagging shall be implemented
//   2 Isolate the Area by Safety Warning Tape
//   3 Keep a Safe Distance from the device being tested
//   4 Wear Appropriate Personal Protective Equipment (PPE) prior to starting
//     any testing activity — safety helmet, high visibility clothing,
//     protective gloves, safety footwear
//   5 Implementation of Proper Grounding
//
// Translations live inline rather than in each task's JSON, because the step is
// shared: one wording, one place to correct it.

// The PPE the poster itself pictures, in donning order.
export const CSD_PPE = ['safety_helmet', 'hi_vis', 'gloves', 'safety_boots']

export function safetyStep({ id = 1, estMin = 10 } = {}) {
  return {
    id,
    estMin,
    hazard: true,
    media: [{ type: 'svg', src: 'csd-commissioning/safety-prep' }],
    title: {
      en: 'Safety precautions before testing',
      ar: 'احتياطات السلامة قبل الاختبار',
      ur: 'ٹیسٹ سے پہلے حفاظتی احتیاطیں',
      hi: 'टेस्ट से पहले सुरक्षा सावधानियाँ',
      fr: 'Précautions de sécurité avant les essais',
    },
    instructions: {
      en: [
        'Implement safety tagging on the equipment to be tested.',
        'Isolate the area with safety warning tape.',
        'Keep a safe distance from the device being tested.',
        'Wear your PPE before starting any testing activity: safety helmet, high-visibility clothing, protective gloves and safety footwear.',
        'Implement proper grounding before you connect any test instrument.',
        'Self-check: all five precautions are in place before the first connection is made.',
      ],
      ar: [
        'ضع بطاقات السلامة على المعدة التي ستُختبر.',
        'اعزل المنطقة بشريط التحذير.',
        'حافظ على مسافة آمنة من الجهاز الجاري اختباره.',
        'ارتدِ مهمات الوقاية قبل بدء أي نشاط اختبار: خوذة أمان، ملابس عالية الوضوح، قفازات واقية، وحذاء أمان.',
        'نفّذ التأريض الصحيح قبل توصيل أي جهاز اختبار.',
        'فحص ذاتي: الاحتياطات الخمسة كلها مطبّقة قبل إجراء أول توصيلة.',
      ],
      ur: [
        'جس آلے کا ٹیسٹ کرنا ہے اس پر سیفٹی ٹیگ لگائیں۔',
        'علاقے کو حفاظتی وارننگ ٹیپ سے الگ کریں۔',
        'زیرِ ٹیسٹ آلے سے محفوظ فاصلہ رکھیں۔',
        'کوئی بھی ٹیسٹ شروع کرنے سے پہلے PPE پہنیں: سیفٹی ہیلمٹ، ہائی وزیبلٹی لباس، حفاظتی دستانے اور سیفٹی جوتے۔',
        'کوئی بھی ٹیسٹ آلہ جوڑنے سے پہلے درست ارتھنگ کریں۔',
        'سیلف چیک: پہلا کنکشن لگانے سے پہلے پانچوں احتیاطیں مکمل ہوں۔',
      ],
      hi: [
        'जिस उपकरण का टेस्ट करना है उस पर सेफ़्टी टैग लगाएँ।',
        'क्षेत्र को सेफ़्टी वार्निंग टेप से अलग करें।',
        'टेस्ट किए जा रहे उपकरण से सुरक्षित दूरी रखें।',
        'कोई भी टेस्ट शुरू करने से पहले PPE पहनें: सेफ़्टी हेलमेट, हाई-विज़िबिलिटी कपड़े, सुरक्षा दस्ताने और सेफ़्टी जूते।',
        'कोई भी टेस्ट उपकरण जोड़ने से पहले सही अर्थिंग करें।',
        'सेल्फ़-चेक: पहला कनेक्शन लगाने से पहले पाँचों सावधानियाँ पूरी हों।',
      ],
      fr: [
        'Poser les étiquettes de consignation sur l’équipement à essayer.',
        'Isoler la zone avec du ruban de signalisation.',
        'Garder une distance de sécurité par rapport à l’appareil essayé.',
        'Mettre les EPI avant toute activité d’essai : casque, vêtement haute visibilité, gants de protection et chaussures de sécurité.',
        'Mettre en œuvre une mise à la terre correcte avant de raccorder un appareil de mesure.',
        'Auto-contrôle : les cinq précautions sont en place avant le premier raccordement.',
      ],
    },
    tools: {
      en: ['Safety tags', 'Safety warning tape', 'Earthing / grounding set', 'PPE set'],
      ar: ['بطاقات سلامة', 'شريط تحذير', 'طقم تأريض', 'طقم مهمات الوقاية'],
      ur: ['سیفٹی ٹیگ', 'وارننگ ٹیپ', 'ارتھنگ سیٹ', 'PPE سیٹ'],
      hi: ['सेफ़्टी टैग', 'वार्निंग टेप', 'अर्थिंग सेट', 'PPE सेट'],
      fr: ['Étiquettes de consignation', 'Ruban de signalisation', 'Kit de mise à la terre', 'Jeu d’EPI'],
    },
    warning: {
      en: 'These five precautions apply prior to, during and after conducting the test measurements. Do not start any test until all of them are in place.',
      ar: 'تنطبق هذه الاحتياطات الخمسة قبل إجراء القياسات وأثناءها وبعدها. لا تبدأ أي اختبار قبل تطبيقها جميعًا.',
      ur: 'یہ پانچوں احتیاطیں ٹیسٹ سے پہلے، دوران اور بعد میں لاگو ہوتی ہیں۔ جب تک سب مکمل نہ ہوں کوئی ٹیسٹ شروع نہ کریں۔',
      hi: 'ये पाँचों सावधानियाँ टेस्ट से पहले, दौरान और बाद में लागू होती हैं। जब तक सभी पूरी न हों कोई टेस्ट शुरू न करें।',
      fr: 'Ces cinq précautions s’appliquent avant, pendant et après les mesures d’essai. Ne commencer aucun essai tant qu’elles ne sont pas toutes en place.',
    },
  }
}
