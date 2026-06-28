// PLACEHOLDER PROCEDURE — technically plausible, pending SME review.
export default {
  id: 'soldering',
  order: 3,
  icon: 'solder',
  difficulty: 'intermediate',
  ppe: ['safety_glasses', 'fume_extraction'],
  estimatedTotalMin: 12,
  placeholder: true,

  title: {
    en: 'Solder a Joint',
    ar: 'لحام وصلة',
    ur: 'جوڑ کو سولڈر کریں',
    hi: 'जोड़ को सोल्डर करें',
  },
  summary: {
    en: 'Make a clean, reliable soldered electrical joint.',
    ar: 'نفّذ وصلة كهربائية ملحومة نظيفة وموثوقة.',
    ur: 'ایک صاف اور قابلِ اعتماد سولڈر شدہ برقی جوڑ بنائیں۔',
    hi: 'एक साफ और भरोसेमंद सोल्डर किया हुआ विद्युत जोड़ बनाएं।',
  },

  steps: [
    {
      id: 1,
      estMin: 3,
      hazard: true,
      media: { type: 'svg', src: 'soldering/step-1' },
      title: {
        en: 'Heat & tin the iron',
        ar: 'سخّن مكواة اللحام واطلِها بالقصدير',
        ur: 'آئرن کو گرم کریں اور ٹن کریں',
        hi: 'आयरन को गर्म करें और टिन करें',
      },
      instructions: {
        en: [
          'Switch on the fume extraction.',
          'Let the iron reach working temperature.',
          'Tin the tip with fresh solder.',
        ],
        ar: [
          'شغّل جهاز شفط الأبخرة.',
          'اترك المكواة حتى تصل إلى درجة حرارة التشغيل.',
          'اطلِ السن بطبقة من القصدير الطازج.',
        ],
        ur: [
          'دھواں نکالنے کا نظام آن کریں۔',
          'آئرن کو کام کرنے کے درجہ حرارت تک پہنچنے دیں۔',
          'نوک کو تازہ سولڈر سے ٹن کریں۔',
        ],
        hi: [
          'धुआं निष्कासन (फ्यूम एक्सट्रैक्शन) चालू करें।',
          'आयरन को कार्यशील तापमान तक पहुंचने दें।',
          'टिप को ताजा सोल्डर से टिन करें।',
        ],
      },
      warning: {
        en: 'The tip reaches 350 °C — never touch it.',
        ar: 'يصل السن إلى ٣٥٠ °م — لا تلمسه أبدًا.',
        ur: 'نوک ۳۵۰ °س تک پہنچ جاتی ہے — اسے کبھی نہ چھوئیں۔',
        hi: 'टिप 350 °C तक पहुंचती है — इसे कभी न छुएं।',
      },
    },
    {
      id: 2,
      estMin: 2,
      hazard: false,
      media: { type: 'svg', src: 'soldering/step-2' },
      title: {
        en: 'Clean & flux the joint',
        ar: 'نظّف الوصلة وضع عليها المصهر (الفلكس)',
        ur: 'جوڑ کو صاف کریں اور فلکس لگائیں',
        hi: 'जोड़ को साफ करें और फ्लक्स लगाएं',
      },
      instructions: {
        en: [
          'Clean the pad and the lead.',
          'Apply a little flux.',
          'Hold the work steady.',
        ],
        ar: [
          'نظّف وسادة اللحام والطرف الموصّل.',
          'ضع كمية قليلة من المصهر (الفلكس).',
          'ثبّت قطعة العمل بثبات.',
        ],
        ur: [
          'پیڈ اور لیڈ کو صاف کریں۔',
          'تھوڑا سا فلکس لگائیں۔',
          'کام کو مستحکم پکڑے رکھیں۔',
        ],
        hi: [
          'पैड और लीड को साफ करें।',
          'थोड़ा फ्लक्स लगाएं।',
          'काम को स्थिर पकड़ें।',
        ],
      },
    },
    {
      id: 3,
      estMin: 4,
      hazard: true,
      media: { type: 'svg', src: 'soldering/step-3' },
      title: {
        en: 'Heat the joint & flow solder',
        ar: 'سخّن الوصلة وأسِل القصدير فيها',
        ur: 'جوڑ کو گرم کریں اور سولڈر بہائیں',
        hi: 'जोड़ को गर्म करें और सोल्डर बहाएं',
      },
      instructions: {
        en: [
          'Heat the pad and lead together.',
          'Feed solder into the joint, not the tip.',
          'Remove the solder, then the iron.',
        ],
        ar: [
          'سخّن وسادة اللحام والطرف الموصّل معًا.',
          'وجّه القصدير إلى الوصلة وليس إلى سن المكواة.',
          'أبعِد القصدير أولًا ثم المكواة.',
        ],
        ur: [
          'پیڈ اور لیڈ کو ایک ساتھ گرم کریں۔',
          'سولڈر کو جوڑ میں ڈالیں، نوک پر نہیں۔',
          'پہلے سولڈر ہٹائیں، پھر آئرن۔',
        ],
        hi: [
          'पैड और लीड को एक साथ गर्म करें।',
          'सोल्डर को जोड़ में डालें, टिप पर नहीं।',
          'पहले सोल्डर हटाएं, फिर आयरन।',
        ],
      },
      warning: {
        en: 'Hot joint — keep fingers clear.',
        ar: 'الوصلة ساخنة — أبعِد أصابعك عنها.',
        ur: 'گرم جوڑ — انگلیاں دور رکھیں۔',
        hi: 'गर्म जोड़ — उंगलियां दूर रखें।',
      },
    },
    {
      id: 4,
      estMin: 3,
      hazard: false,
      media: { type: 'svg', src: 'soldering/step-4' },
      title: {
        en: 'Inspect the joint',
        ar: 'افحص الوصلة',
        ur: 'جوڑ کا معائنہ کریں',
        hi: 'जोड़ का निरीक्षण करें',
      },
      instructions: {
        en: [
          'Look for a smooth, shiny cone.',
          'Check for bridges or cold joints.',
          'Clean off any flux residue.',
        ],
        ar: [
          'تحقّق من وجود مخروط أملس ولامع.',
          'افحص بحثًا عن جسور لحام أو وصلات باردة.',
          'أزِل أي بقايا للمصهر (الفلكس).',
        ],
        ur: [
          'ایک ہموار، چمکدار مخروط (کون) تلاش کریں۔',
          'برجز یا ٹھنڈے جوڑوں کی جانچ کریں۔',
          'فلکس کی کوئی باقیات صاف کریں۔',
        ],
        hi: [
          'एक चिकने, चमकदार शंकु (कोन) की तलाश करें।',
          'ब्रिज या कोल्ड जॉइंट की जांच करें।',
          'किसी भी फ्लक्स अवशेष को साफ करें।',
        ],
      },
    },
  ],
}
