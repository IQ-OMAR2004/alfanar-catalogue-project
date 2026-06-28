// PLACEHOLDER PROCEDURE — technically plausible, pending SME review.
// English is authoritative here; ar/ur/hi are added by translation pass and
// fall back to English until then. Keep ids / media.src / estMin / hazard fixed.
export default {
  id: 'lv-box-wiring',
  order: 1,
  icon: 'lv-box',
  difficulty: 'intermediate',
  ppe: ['insulated_gloves', 'safety_glasses'],
  estimatedTotalMin: 18,
  placeholder: true,

  title: {
    en: 'Wire the LV Box',
    ar: 'توصيل أسلاك صندوق الجهد المنخفض',
    ur: 'لو وولٹیج باکس کی وائرنگ کریں',
    hi: 'एलवी बॉक्स की वायरिंग करें',
  },
  summary: {
    en: 'Land and terminate conductors in a low-voltage distribution box.',
    ar: 'ربط وإنهاء توصيل الموصلات في صندوق توزيع جهد منخفض.',
    ur: 'لو وولٹیج تقسیم باکس میں کنڈکٹرز کو جوڑیں اور ٹرمینیٹ کریں۔',
    hi: 'लो-वोल्टेज डिस्ट्रीब्यूशन बॉक्स में कंडक्टरों को जोड़ें और टर्मिनेट करें।',
  },

  steps: [
    {
      id: 1,
      estMin: 3,
      hazard: true,
      media: { type: 'svg', src: 'lv-box-wiring/step-1' },
      title: {
        en: 'Isolate the power',
        ar: 'عزل مصدر الكهرباء',
        ur: 'بجلی کو الگ کریں',
        hi: 'बिजली को आइसोलेट करें',
      },
      instructions: {
        en: [
          'Switch the main breaker OFF.',
          'Lock out and tag the isolator.',
          'Confirm zero voltage with the tester.',
        ],
        ar: [
          'أوقف القاطع الرئيسي (وضع OFF).',
          'اقفل العازل وعلّم عليه ببطاقة التحذير.',
          'تأكد من انعدام الجهد باستخدام جهاز الفحص.',
        ],
        ur: [
          'مین بریکر کو آف کریں۔',
          'آئسولیٹر کو لاک آؤٹ کریں اور ٹیگ لگائیں۔',
          'ٹیسٹر سے صفر وولٹیج کی تصدیق کریں۔',
        ],
        hi: [
          'मेन ब्रेकर को OFF करें।',
          'आइसोलेटर को लॉक-आउट करें और टैग लगाएं।',
          'टेस्टर से शून्य वोल्टेज की पुष्टि करें।',
        ],
      },
      warning: {
        en: 'Do not proceed until the tester reads 0 V.',
        ar: 'لا تتابع العمل حتى يُظهر جهاز الفحص قراءة 0 فولت.',
        ur: 'جب تک ٹیسٹر 0 وولٹ نہ دکھائے، آگے نہ بڑھیں۔',
        hi: 'जब तक टेस्टर 0 V न दिखाए, तब तक आगे न बढ़ें।',
      },
    },
    {
      id: 2,
      estMin: 4,
      hazard: false,
      media: { type: 'svg', src: 'lv-box-wiring/step-2' },
      title: {
        en: 'Strip the conductors',
        ar: 'تعرية الموصلات',
        ur: 'کنڈکٹرز کی موصلیت اتاریں',
        hi: 'कंडक्टरों को स्ट्रिप करें',
      },
      instructions: {
        en: [
          'Measure and mark the strip length.',
          'Strip the insulation without nicking the copper.',
          'Twist stranded cores tight and straight.',
        ],
        ar: [
          'قِس طول التعرية وضع علامة عليه.',
          'انزع العزل دون خدش النحاس.',
          'افتل الأسلاك المجدولة بإحكام وباستقامة.',
        ],
        ur: [
          'اسٹرپ کی لمبائی ناپیں اور نشان لگائیں۔',
          'تانبے کو نقصان پہنچائے بغیر انسولیشن اتاریں۔',
          'اسٹرینڈڈ کوروں کو مضبوطی اور سیدھائی سے بٹیں۔',
        ],
        hi: [
          'स्ट्रिप लंबाई मापें और निशान लगाएं।',
          'तांबे को बिना खरोंचे इन्सुलेशन हटाएं।',
          'स्ट्रैंडेड कोर को कसकर और सीधा मोड़ें।',
        ],
      },
    },
    {
      id: 3,
      estMin: 4,
      hazard: false,
      media: { type: 'svg', src: 'lv-box-wiring/step-3' },
      title: {
        en: 'Land the conductors',
        ar: 'تركيب الموصلات',
        ur: 'کنڈکٹرز کو جوڑیں',
        hi: 'कंडक्टरों को जोड़ें',
      },
      instructions: {
        en: [
          'Match each core to its terminal: L, N, E.',
          'Insert the copper fully into the terminal.',
          'Leave no bare conductor exposed.',
        ],
        ar: [
          'طابق كل سلك مع طرفه المخصص: L (الحي)، N (المحايد)، E (الأرضي).',
          'أدخل النحاس بالكامل داخل الطرف.',
          'لا تترك أي موصل عارٍ مكشوفًا.',
        ],
        ur: [
          'ہر کور کو اس کے ٹرمینل سے ملائیں: L، N، E۔',
          'تانبے کو ٹرمینل میں مکمل طور پر داخل کریں۔',
          'کوئی ننگا کنڈکٹر کھلا نہ چھوڑیں۔',
        ],
        hi: [
          'प्रत्येक कोर को उसके टर्मिनल से मिलाएं: L, N, E।',
          'तांबे को टर्मिनल में पूरी तरह डालें।',
          'कोई भी नंगा कंडक्टर खुला न छोड़ें।',
        ],
      },
    },
    {
      id: 4,
      estMin: 4,
      hazard: false,
      media: { type: 'svg', src: 'lv-box-wiring/step-4' },
      title: {
        en: 'Torque the terminals',
        ar: 'إحكام عزم الأطراف',
        ur: 'ٹرمینلز کو ٹارک کریں',
        hi: 'टर्मिनलों को टॉर्क करें',
      },
      instructions: {
        en: [
          'Set the screwdriver to the rated torque.',
          'Tighten each terminal until it clicks.',
          'Mark every terminal you have checked.',
        ],
        ar: [
          'اضبط المفك على عزم الربط المقرر.',
          'اربط كل طرف حتى تسمع صوت النقرة.',
          'ضع علامة على كل طرف تم فحصه.',
        ],
        ur: [
          'اسکریو ڈرائیور کو مقررہ ٹارک پر سیٹ کریں۔',
          'ہر ٹرمینل کو کلک کی آواز تک کسیں۔',
          'ہر چیک شدہ ٹرمینل پر نشان لگائیں۔',
        ],
        hi: [
          'स्क्रूड्राइवर को निर्धारित टॉर्क पर सेट करें।',
          'प्रत्येक टर्मिनल को क्लिक होने तक कसें।',
          'जांचे गए हर टर्मिनल पर निशान लगाएं।',
        ],
      },
    },
    {
      id: 5,
      estMin: 3,
      hazard: true,
      media: { type: 'svg', src: 'lv-box-wiring/step-5' },
      title: {
        en: 'Label, close & energize',
        ar: 'وضع البطاقات، الإغلاق والتشغيل',
        ur: 'لیبل لگائیں، بند کریں اور بجلی بحال کریں',
        hi: 'लेबल लगाएं, बंद करें और ऊर्जावान करें',
      },
      instructions: {
        en: [
          'Fit the core ferrules and labels.',
          'Refit the cover and remove the lock-out.',
          'Restore power and re-test for correct polarity.',
        ],
        ar: [
          'ركّب أطواق نهايات الأسلاك والبطاقات التعريفية.',
          'أعد تركيب الغطاء وأزل القفل التحذيري.',
          'أعد توصيل الكهرباء وأعد الفحص للتأكد من صحة القطبية.',
        ],
        ur: [
          'کور فیرولز اور لیبل لگائیں۔',
          'کور دوبارہ لگائیں اور لاک آؤٹ ہٹائیں۔',
          'بجلی بحال کریں اور درست پولیریٹی کے لیے دوبارہ ٹیسٹ کریں۔',
        ],
        hi: [
          'कोर फेरूल और लेबल लगाएं।',
          'कवर दोबारा लगाएं और लॉक-आउट हटाएं।',
          'बिजली बहाल करें और सही पोलैरिटी के लिए दोबारा जांचें।',
        ],
      },
      warning: {
        en: 'Confirm correct polarity before energizing.',
        ar: 'تأكد من صحة القطبية قبل التشغيل.',
        ur: 'بجلی بحال کرنے سے پہلے درست پولیریٹی کی تصدیق کریں۔',
        hi: 'ऊर्जावान करने से पहले सही पोलैरिटी की पुष्टि करें।',
      },
    },
  ],
}
