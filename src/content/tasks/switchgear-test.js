// PLACEHOLDER PROCEDURE — technically plausible, pending SME review.
export default {
  id: 'switchgear-test',
  order: 4,
  icon: 'switchgear',
  difficulty: 'advanced',
  ppe: ['insulated_gloves', 'safety_glasses', 'arc_flash_hood'],
  estimatedTotalMin: 22,
  placeholder: true,

  title: {
    en: 'Test the Switchgear',
    ar: 'اختبار لوحة المفاتيح الكهربائية',
    ur: 'سوئچ گیئر کی جانچ کریں',
    hi: 'स्विचगियर का परीक्षण करें',
  },
  summary: {
    en: 'Commission-test an MV switchgear panel: insulation, trip and handover.',
    ar: 'اختبار تشغيل لوحة مفاتيح الجهد المتوسط: العزل والفصل والتسليم.',
    ur: 'ایم وی سوئچ گیئر پینل کا کمیشننگ ٹیسٹ: انسولیشن، ٹرپ اور حوالگی۔',
    hi: 'एमवी स्विचगियर पैनल का कमीशन-परीक्षण: इन्सुलेशन, ट्रिप और हैंडओवर।',
  },

  steps: [
    {
      id: 1,
      estMin: 4,
      hazard: true,
      media: { type: 'svg', src: 'switchgear-test/step-1' },
      title: {
        en: 'Visual & PPE check',
        ar: 'الفحص البصري ومعدات الوقاية الشخصية',
        ur: 'بصری معائنہ اور پی پی ای کی جانچ',
        hi: 'दृश्य और पीपीई जाँच',
      },
      instructions: {
        en: [
          'Confirm the panel is isolated and locked out.',
          'Put on full arc-flash PPE.',
          'Inspect for damage and loose parts.',
        ],
        ar: [
          'تأكد من عزل اللوحة وقفلها بنظام الإغلاق.',
          'ارتدِ معدات الوقاية الكاملة ضد الوميض القوسي.',
          'افحص بحثاً عن أي تلف أو أجزاء غير محكمة.',
        ],
        ur: [
          'تصدیق کریں کہ پینل آئسولیٹ اور لاک آؤٹ ہے۔',
          'مکمل آرک فلیش پی پی ای پہنیں۔',
          'نقصان اور ڈھیلے پرزوں کا معائنہ کریں۔',
        ],
        hi: [
          'पुष्टि करें कि पैनल अलग और लॉक-आउट है।',
          'पूरा आर्क-फ्लैश पीपीई पहनें।',
          'क्षति और ढीले पुर्जों के लिए निरीक्षण करें।',
        ],
      },
      warning: {
        en: 'Treat every conductor as live until proven dead.',
        ar: 'تعامل مع كل موصل على أنه مكهرب حتى يثبت خلوه من الجهد.',
        ur: 'ہر کنڈکٹر کو اس وقت تک زندہ سمجھیں جب تک یہ ثابت نہ ہو کہ وہ مردہ ہے۔',
        hi: 'हर कंडक्टर को तब तक जीवंत मानें जब तक यह सिद्ध न हो जाए कि वह निष्क्रिय है।',
      },
    },
    {
      id: 2,
      estMin: 6,
      hazard: true,
      media: { type: 'svg', src: 'switchgear-test/step-2' },
      title: {
        en: 'Insulation-resistance test',
        ar: 'اختبار مقاومة العزل',
        ur: 'انسولیشن ریزسٹنس ٹیسٹ',
        hi: 'इन्सुलेशन-प्रतिरोध परीक्षण',
      },
      instructions: {
        en: [
          'Connect the insulation tester.',
          'Apply test voltage across each phase.',
          'Record readings above the minimum.',
        ],
        ar: [
          'قم بتوصيل جهاز اختبار العزل.',
          'طبّق جهد الاختبار على كل طور.',
          'سجّل القراءات الأعلى من الحد الأدنى.',
        ],
        ur: [
          'انسولیشن ٹیسٹر کو منسلک کریں۔',
          'ہر فیز پر ٹیسٹ وولٹیج لگائیں۔',
          'کم از کم حد سے اوپر کی ریڈنگز ریکارڈ کریں۔',
        ],
        hi: [
          'इन्सुलेशन परीक्षक को जोड़ें।',
          'प्रत्येक फेज़ पर परीक्षण वोल्टेज लगाएँ।',
          'न्यूनतम से ऊपर की रीडिंग दर्ज करें।',
        ],
      },
      warning: {
        en: 'Test voltage present — keep others clear.',
        ar: 'يوجد جهد اختبار — أبقِ الآخرين بعيداً.',
        ur: 'ٹیسٹ وولٹیج موجود ہے — دوسروں کو دور رکھیں۔',
        hi: 'परीक्षण वोल्टेज मौजूद है — दूसरों को दूर रखें।',
      },
    },
    {
      id: 3,
      estMin: 6,
      hazard: true,
      media: { type: 'svg', src: 'switchgear-test/step-3' },
      title: {
        en: 'Functional trip test',
        ar: 'اختبار الفصل الوظيفي',
        ur: 'فنکشنل ٹرپ ٹیسٹ',
        hi: 'कार्यात्मक ट्रिप परीक्षण',
      },
      instructions: {
        en: [
          'Inject test current into the relay.',
          'Confirm the breaker trips within time.',
          'Reset and repeat for each phase.',
        ],
        ar: [
          'احقن تيار الاختبار في المرحّل.',
          'تأكد من فصل القاطع ضمن الزمن المحدد.',
          'أعد الضبط وكرّر لكل طور.',
        ],
        ur: [
          'ریلے میں ٹیسٹ کرنٹ داخل کریں۔',
          'تصدیق کریں کہ بریکر مقررہ وقت کے اندر ٹرپ کرتا ہے۔',
          'ری سیٹ کریں اور ہر فیز کے لیے دہرائیں۔',
        ],
        hi: [
          'रिले में परीक्षण धारा प्रवाहित करें।',
          'पुष्टि करें कि ब्रेकर समय के भीतर ट्रिप करता है।',
          'रीसेट करें और प्रत्येक फेज़ के लिए दोहराएँ।',
        ],
      },
      warning: {
        en: 'The mechanism moves under power — keep hands clear.',
        ar: 'تتحرك الآلية تحت الطاقة — أبقِ يديك بعيداً.',
        ur: 'میکانزم پاور کے تحت حرکت کرتا ہے — ہاتھ دور رکھیں۔',
        hi: 'तंत्र शक्ति के तहत गति करता है — हाथ दूर रखें।',
      },
    },
    {
      id: 4,
      estMin: 3,
      hazard: false,
      media: { type: 'svg', src: 'switchgear-test/step-4' },
      title: {
        en: 'Record the results',
        ar: 'تسجيل النتائج',
        ur: 'نتائج ریکارڈ کریں',
        hi: 'परिणाम दर्ज करें',
      },
      instructions: {
        en: [
          'Log every reading on the test sheet.',
          'Note pass or fail against the limits.',
          'Sign and date the record.',
        ],
        ar: [
          'دوّن كل قراءة في ورقة الاختبار.',
          'سجّل النجاح أو الفشل مقابل الحدود المقررة.',
          'وقّع السجل وأرّخه.',
        ],
        ur: [
          'ہر ریڈنگ کو ٹیسٹ شیٹ پر درج کریں۔',
          'حدود کے مقابلے میں پاس یا فیل نوٹ کریں۔',
          'ریکارڈ پر دستخط اور تاریخ درج کریں۔',
        ],
        hi: [
          'प्रत्येक रीडिंग को परीक्षण शीट पर दर्ज करें।',
          'सीमाओं के विरुद्ध पास या फेल नोट करें।',
          'रिकॉर्ड पर हस्ताक्षर करें और तारीख डालें।',
        ],
      },
    },
    {
      id: 5,
      estMin: 3,
      hazard: true,
      media: { type: 'svg', src: 'switchgear-test/step-5' },
      title: {
        en: 'Re-energize & hand over',
        ar: 'إعادة التشغيل والتسليم',
        ur: 'دوبارہ توانائی دیں اور حوالے کریں',
        hi: 'पुनः ऊर्जान्वित करें और सौंपें',
      },
      instructions: {
        en: [
          'Remove all test leads and locks.',
          'Restore the supply in sequence.',
          'Confirm healthy indications and hand over.',
        ],
        ar: [
          'انزع جميع أسلاك الاختبار والأقفال.',
          'أعد التغذية الكهربائية بالتسلسل الصحيح.',
          'تأكد من المؤشرات السليمة وقم بالتسليم.',
        ],
        ur: [
          'تمام ٹیسٹ لیڈز اور لاکس ہٹا دیں۔',
          'سپلائی کو ترتیب وار بحال کریں۔',
          'درست انڈیکیشنز کی تصدیق کریں اور حوالے کریں۔',
        ],
        hi: [
          'सभी परीक्षण लीड और लॉक हटा दें।',
          'आपूर्ति को क्रम में बहाल करें।',
          'सही संकेतों की पुष्टि करें और सौंप दें।',
        ],
      },
      warning: {
        en: 'Confirm all personnel are clear before energizing.',
        ar: 'تأكد من ابتعاد جميع الأفراد قبل التشغيل.',
        ur: 'توانائی دینے سے پہلے تصدیق کریں کہ تمام افراد دور ہیں۔',
        hi: 'ऊर्जान्वित करने से पहले पुष्टि करें कि सभी कर्मी दूर हैं।',
      },
    },
  ],
}
