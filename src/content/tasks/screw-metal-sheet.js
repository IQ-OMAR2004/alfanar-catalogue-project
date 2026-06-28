// PLACEHOLDER PROCEDURE — technically plausible, pending SME review.
export default {
  id: 'screw-metal-sheet',
  order: 2,
  icon: 'screw',
  difficulty: 'basic',
  ppe: ['safety_glasses', 'gloves'],
  estimatedTotalMin: 10,
  placeholder: true,

  title: {
    en: 'Drive Screws into the Sheet',
    ar: 'تثبيت البراغي في الصفيحة',
    ur: 'شیٹ میں پیچ کسیں',
    hi: 'शीट में स्क्रू कसें',
  },
  summary: {
    en: 'Mark, pilot and fasten a metal sheet with self-tapping screws.',
    ar: 'علّم وثقّب مبدئيًا وثبّت صفيحة معدنية باستخدام براغي ذاتية القلاووظ.',
    ur: 'دھاتی شیٹ کو نشان لگائیں، پائلٹ سوراخ کریں اور سیلف ٹیپنگ پیچوں سے کسیں۔',
    hi: 'मेटल शीट को चिह्नित करें, पायलट छेद करें और सेल्फ-टैपिंग स्क्रू से कसें।',
  },

  steps: [
    {
      id: 1,
      estMin: 2,
      hazard: false,
      media: { type: 'svg', src: 'screw-metal-sheet/step-1' },
      title: {
        en: 'Mark the drill points',
        ar: 'علّم نقاط الثقب',
        ur: 'ڈرل کے مقامات نشان زد کریں',
        hi: 'ड्रिल बिंदु चिह्नित करें',
      },
      instructions: {
        en: [
          'Measure from the reference edge.',
          'Centre-punch each hole position.',
          'Double-check the spacing before drilling.',
        ],
        ar: [
          'قِس انطلاقًا من الحافة المرجعية.',
          'اطرق مركز كل موضع ثقب بمخراز التعليم.',
          'تحقّق مرتين من التباعد قبل الثقب.',
        ],
        ur: [
          'حوالہ کنارے سے پیمائش کریں۔',
          'ہر سوراخ کے مقام پر سینٹر پنچ لگائیں۔',
          'ڈرل کرنے سے پہلے فاصلے کی دوبارہ جانچ کریں۔',
        ],
        hi: [
          'संदर्भ किनारे से माप लें।',
          'प्रत्येक छेद की स्थिति पर सेंटर-पंच करें।',
          'ड्रिल करने से पहले दूरी की दोबारा जांच करें।',
        ],
      },
    },
    {
      id: 2,
      estMin: 2,
      hazard: false,
      media: { type: 'svg', src: 'screw-metal-sheet/step-2' },
      title: {
        en: 'Clamp the sheet',
        ar: 'ثبّت الصفيحة بالملزمة',
        ur: 'شیٹ کو کلیمپ کریں',
        hi: 'शीट को क्लैंप करें',
      },
      instructions: {
        en: [
          'Align the sheet to the frame.',
          'Clamp it down firmly.',
          'Check that it cannot shift.',
        ],
        ar: [
          'حاذِ الصفيحة مع الإطار.',
          'ثبّتها بإحكام بالملزمة.',
          'تأكّد من أنها لا يمكن أن تتزحزح.',
        ],
        ur: [
          'شیٹ کو فریم کے ساتھ سیدھ میں کریں۔',
          'اسے مضبوطی سے کلیمپ کریں۔',
          'یقینی بنائیں کہ یہ ہل نہیں سکتی۔',
        ],
        hi: [
          'शीट को फ्रेम के साथ संरेखित करें।',
          'इसे मजबूती से क्लैंप करें।',
          'जांचें कि यह खिसक नहीं सकती।',
        ],
      },
    },
    {
      id: 3,
      estMin: 3,
      hazard: false,
      media: { type: 'svg', src: 'screw-metal-sheet/step-3' },
      title: {
        en: 'Pilot the holes',
        ar: 'اثقب الثقوب التمهيدية',
        ur: 'پائلٹ سوراخ کریں',
        hi: 'पायलट छेद करें',
      },
      instructions: {
        en: [
          'Fit the correct drill bit.',
          'Drill a pilot hole at each mark.',
          'Clear the swarf away.',
        ],
        ar: [
          'ركّب لقمة الثقب الصحيحة.',
          'اثقب ثقبًا تمهيديًا عند كل علامة.',
          'أزِل نُشارة المعدن.',
        ],
        ur: [
          'درست ڈرل بٹ لگائیں۔',
          'ہر نشان پر ایک پائلٹ سوراخ کریں۔',
          'دھات کا برادہ صاف کر دیں۔',
        ],
        hi: [
          'सही ड्रिल बिट लगाएं।',
          'प्रत्येक निशान पर पायलट छेद ड्रिल करें।',
          'धातु का बुरादा हटा दें।',
        ],
      },
    },
    {
      id: 4,
      estMin: 3,
      hazard: false,
      media: { type: 'svg', src: 'screw-metal-sheet/step-4' },
      title: {
        en: 'Drive the screws',
        ar: 'ثبّت البراغي',
        ur: 'پیچ کسیں',
        hi: 'स्क्रू कसें',
      },
      instructions: {
        en: [
          'Set the driver clutch torque.',
          'Drive each self-tapping screw straight.',
          'Seat it flush — do not over-tighten.',
        ],
        ar: [
          'اضبط عزم قابض المفك.',
          'ثبّت كل برغي ذاتي القلاووظ بشكل مستقيم.',
          'اجعله مستويًا مع السطح — لا تُفرط في الإحكام.',
        ],
        ur: [
          'ڈرائیور کلچ کا ٹارک سیٹ کریں۔',
          'ہر سیلف ٹیپنگ پیچ کو سیدھا کسیں۔',
          'اسے سطح کے برابر بٹھائیں — زیادہ نہ کسیں۔',
        ],
        hi: [
          'ड्राइवर क्लच टॉर्क सेट करें।',
          'प्रत्येक सेल्फ-टैपिंग स्क्रू को सीधा कसें।',
          'इसे सतह के बराबर बैठाएं — अधिक न कसें।',
        ],
      },
    },
  ],
}
