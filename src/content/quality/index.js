// Quality section content — transcribed from three controlled QC documents plus
// the marking convention used on the GIS work-instruction photographs.
//
//   ITP    Inspection and Test Plan for metalclad GIS 13.8–36 kV,
//          ITP-SWGR-04, Yanbu Factory, SO 1175650, 13 July 2026
//   FAT    FAT punch list, HVDC Converter Station COA–SOA link, KUDMI
//          (W402 & W405), SO 1108308, FAT 23 July 2026
//   DEFECT Quality Control Report — MVSG panel inspection (defected panel),
//          Saudi Pharma Factory, SO 1162271-70, 8 July 2026
//   MARKS  The red / yellow attention triangles, green sequence circles and
//          red / blue marker rules used on the photographs in
//          "GIS TANK MODIFICATION 30062026"
//
// PLACEHOLDER pending SME review — transcribed from the documents; each area
// also carries the page or row image it came from so a worker can read the
// controlled original rather than only the transcription.

const img = (name) => `/media/quality/${name}.jpg`

// ---------------------------------------------------------------- 1 · ITP
export const ITP = {
  id: 'itp',
  icon: 'clipboard-check',
  color: '#0A82C6',
  title: {
    en: 'Inspection & Test Plan',
    ar: 'خطة الفحص والاختبار',
    ur: 'معائنہ اور جانچ کا منصوبہ',
    hi: 'इंस्पेक्शन और टेस्ट प्लान',
    fr: 'Plan d’inspection et d’essais',
  },
  sub: {
    en: 'What is inspected, to which standard, and who witnesses it',
    ar: 'ما الذي يُفحص، ووفق أي معيار، ومن يشهده',
    ur: 'کیا جانچا جاتا ہے، کس معیار پر، اور کون گواہ ہوتا ہے',
    hi: 'क्या जाँचा जाता है, किस मानक पर, और कौन गवाह होता है',
    fr: 'Ce qui est contrôlé, selon quelle norme, et qui y assiste',
  },
  meta: {
    doc: 'ITP-SWGR-04',
    order: 'SO 1175650',
    date: '13 July 2026',
    spec: 'IEC 62271-200',
    equipment: 'ALFA-G INS metalclad, 36 kV, 1250 A, 3ph, 60 Hz, 25 kA/3 s',
  },
  // W = witness point, RC = review of certificate — the two inspection types
  // the plan uses.
  items: [
    {
      no: '1.1 a', type: 'W',
      test: { en: 'Power frequency withstand voltage — main circuit', ar: 'تحمّل الجهد بتردد الشبكة — الدائرة الرئيسية', ur: 'پاور فریکوئنسی برداشت وولٹیج — مین سرکٹ', hi: 'पावर फ़्रीक्वेंसी विदस्टैंड वोल्टेज — मेन सर्किट', fr: 'Tenue à fréquence industrielle — circuit principal' },
      std: 'IEC 62271-200, 7.1',
      proc: '13.8 kV: 38 kV (60 s) · 36 kV: 70 kV (60 s) · ±1% · 45–65 Hz',
      accept: { en: 'No disruptive discharge', ar: 'لا يحدث تفريغ كهربائي', ur: 'کوئی تخریبی ڈسچارج نہ ہو', hi: 'कोई डिसरप्टिव डिस्चार्ज न हो', fr: 'Aucune décharge disruptive' },
    },
    {
      no: '1.1 b', type: 'W',
      test: { en: 'Withstand test on auxiliary and control circuits', ar: 'اختبار التحمّل لدوائر التغذية المساعدة والتحكم', ur: 'معاون اور کنٹرول سرکٹ پر برداشت جانچ', hi: 'ऑग्ज़िलरी और कंट्रोल सर्किट पर विदस्टैंड टेस्ट', fr: 'Essai de tenue sur circuits auxiliaires et de commande' },
      std: 'IEC 62271-200, 7.2',
      proc: '2 kV · 60 s · ±1% · 45–65 Hz',
      accept: { en: 'No disruptive discharge during each test', ar: 'لا يحدث تفريغ أثناء أي اختبار', ur: 'ہر جانچ کے دوران کوئی ڈسچارج نہ ہو', hi: 'हर टेस्ट के दौरान कोई डिस्चार्ज न हो', fr: 'Aucune décharge pendant chaque essai' },
    },
    {
      no: '1.2', type: 'W',
      test: { en: 'Resistance of the main circuit (sample panel)', ar: 'مقاومة الدائرة الرئيسية (لوحة عيّنة)', ur: 'مین سرکٹ کی مزاحمت (نمونہ پینل)', hi: 'मेन सर्किट की रेज़िस्टेंस (सैंपल पैनल)', fr: 'Résistance du circuit principal (panneau échantillon)' },
      std: 'IEC 62271-200, 7.3',
      proc: '50 A ≤ Idc ≤ rated normal current',
      accept: { en: 'Must not differ by more than 20% from the resistance measured before the temperature-rise test', ar: 'ألا تختلف بأكثر من 20% عن المقاومة المقاسة قبل اختبار ارتفاع الحرارة', ur: 'درجہ حرارت بڑھنے کی جانچ سے پہلے ماپی گئی مزاحمت سے 20% سے زیادہ فرق نہ ہو', hi: 'टेम्परेचर-राइज़ टेस्ट से पहले मापी गई रेज़िस्टेंस से 20% से ज़्यादा अंतर न हो', fr: 'Ne doit pas s’écarter de plus de 20 % de la résistance mesurée avant l’essai d’échauffement' },
    },
    {
      no: '1.3', type: 'W',
      test: { en: 'Tightness test', ar: 'اختبار الإحكام', ur: 'گیس بندش کی جانچ', hi: 'टाइटनेस टेस्ट', fr: 'Essai d’étanchéité' },
      std: 'IEC 62271-200, 7.4',
      proc: 'All current ratings for the bay',
      accept: { en: 'Gas tightness measured together with the tests of 6.102 and 6.106 on each type of compartment; leakage within the declared rate', ar: 'يُقاس إحكام الغاز مع اختبارات 6.102 و6.106 لكل نوع حجرة؛ والتسرّب ضمن المعدل المعلن', ur: 'گیس بندش 6.102 اور 6.106 کی جانچ کے ساتھ ہر قسم کے خانے پر ماپی جائے؛ لیکیج اعلان کردہ حد میں ہو', hi: 'गैस टाइटनेस 6.102 और 6.106 के टेस्ट के साथ हर तरह के कम्पार्टमेंट पर मापी जाए; लीकेज घोषित दर के भीतर हो', fr: 'Étanchéité mesurée avec les essais 6.102 et 6.106 sur chaque type de compartiment ; fuite dans la limite déclarée' },
    },
    {
      no: '1.6', type: 'RC',
      test: { en: 'Pressure test of the enclosure', ar: 'اختبار ضغط الحاوية', ur: 'غلاف کے دباؤ کی جانچ', hi: 'एनक्लोज़र का प्रेशर टेस्ट', fr: 'Essai de pression de l’enveloppe' },
      std: 'IEC 62271-200',
      proc: 'As per manometer indication, all enclosures',
      accept: { en: 'Pressure holds as declared for the enclosure', ar: 'يبقى الضغط كما هو معلن للحاوية', ur: 'دباؤ غلاف کے اعلان کردہ مطابق برقرار رہے', hi: 'प्रेशर एनक्लोज़र के घोषित मान पर बना रहे', fr: 'La pression se maintient à la valeur déclarée' },
    },
    {
      no: '2.1', type: 'W',
      test: { en: 'Circuit breaker — mechanical operation, open and closed positions', ar: 'قاطع الدائرة — التشغيل الميكانيكي، وضعا الفتح والغلق', ur: 'سرکٹ بریکر — مکینیکل عمل، کھلی اور بند حالت', hi: 'सर्किट ब्रेकर — मैकेनिकल ऑपरेशन, ओपन और क्लोज़ पोज़ीशन', fr: 'Disjoncteur — manœuvre mécanique, positions ouvert et fermé' },
      std: 'IEC 62271-100, 7.101',
      proc: '5 operations or attempts',
      accept: { en: 'The switching device opens and closes correctly on every operation', ar: 'يفتح جهاز القطع ويغلق بشكل صحيح في كل عملية', ur: 'سوئچنگ آلہ ہر عمل پر درست کھلے اور بند ہو', hi: 'स्विचिंग डिवाइस हर ऑपरेशन पर सही खुले और बंद हो', fr: 'L’appareil s’ouvre et se ferme correctement à chaque manœuvre' },
    },
    {
      no: '2.2', type: 'W',
      test: { en: 'Circuit breaker — timing test', ar: 'قاطع الدائرة — اختبار التوقيت', ur: 'سرکٹ بریکر — وقت کی جانچ', hi: 'सर्किट ब्रेकर — टाइमिंग टेस्ट', fr: 'Disjoncteur — essai de chronométrage' },
      std: 'IEC 62271-100',
      proc: 'Open / close timing on the sample panel',
      accept: { en: 'Within the manufacturer’s declared operating times', ar: 'ضمن أزمنة التشغيل المعلنة من الصانع', ur: 'کارخانہ دار کے اعلان کردہ آپریٹنگ وقت کے اندر', hi: 'निर्माता के घोषित ऑपरेटिंग समय के भीतर', fr: 'Dans les temps de manœuvre déclarés par le constructeur' },
    },
    {
      no: '3', type: 'W',
      test: { en: 'Earthing switch & disconnector — operation and interlocks', ar: 'مفتاح التأريض والفاصل — التشغيل والتعشيقات', ur: 'ارتھنگ سوئچ اور ڈس کنیکٹر — عمل اور انٹرلاک', hi: 'अर्थिंग स्विच और डिस्कनेक्टर — ऑपरेशन और इंटरलॉक', fr: 'Sectionneur de terre et sectionneur — manœuvre et verrouillages' },
      std: 'IEC 62271-102',
      proc: 'Operation and interlock check',
      accept: { en: 'Operates correctly; every interlock holds', ar: 'يعمل بشكل صحيح وكل تعشيق فعّال', ur: 'درست کام کرے؛ ہر انٹرلاک قائم رہے', hi: 'सही काम करे; हर इंटरलॉक टिका रहे', fr: 'Fonctionne correctement ; chaque verrouillage tient' },
    },
    {
      no: '4.6', type: 'RC',
      test: { en: 'Voltage transformer — accuracy test', ar: 'محوّل الجهد — اختبار الدقة', ur: 'وولٹیج ٹرانسفارمر — درستگی کی جانچ', hi: 'वोल्टेज ट्रांसफ़ॉर्मर — एक्युरेसी टेस्ट', fr: 'Transformateur de tension — essai de précision' },
      std: 'IEC 61869-3, 7.3.5',
      proc: 'As per IEC 61869-3, 7.3.5',
      accept: { en: 'Errors within the limits specified for the declared accuracy class', ar: 'الأخطاء ضمن الحدود المحددة لفئة الدقة المعلنة', ur: 'اعلان کردہ درستگی کے درجے کی مقررہ حدود میں غلطیاں ہوں', hi: 'घोषित एक्युरेसी क्लास की तय सीमाओं के भीतर त्रुटियाँ हों', fr: 'Erreurs dans les limites de la classe de précision déclarée' },
    },
    {
      no: '5.5', type: 'RC',
      test: { en: 'Current transformer — accuracy test', ar: 'محوّل التيار — اختبار الدقة', ur: 'کرنٹ ٹرانسفارمر — درستگی کی جانچ', hi: 'करंट ट्रांसफ़ॉर्मर — एक्युरेसी टेस्ट', fr: 'Transformateur de courant — essai de précision' },
      std: 'IEC 61869-2, 7.3.5',
      proc: 'As per IEC 61869-2, 7.3.5',
      accept: { en: 'Errors within the limits specified for the declared accuracy class', ar: 'الأخطاء ضمن الحدود المحددة لفئة الدقة المعلنة', ur: 'اعلان کردہ درستگی کے درجے کی مقررہ حدود میں غلطیاں ہوں', hi: 'घोषित एक्युरेसी क्लास की तय सीमाओं के भीतर त्रुटियाँ हों', fr: 'Erreurs dans les limites de la classe de précision déclarée' },
    },
  ],
  pages: Array.from({ length: 8 }, (_, i) => img(`itp-${String(i + 1).padStart(2, '0')}`)),
}

// ------------------------------------------------------------ 2 · FAT list
export const FAT = {
  id: 'fat',
  icon: 'punch-list',
  color: '#E8873C',
  title: {
    en: 'FAT punch list',
    ar: 'قائمة ملاحظات اختبار المصنع',
    ur: 'FAT نقائص کی فہرست',
    hi: 'FAT पंच लिस्ट',
    fr: 'Liste de réserves FAT',
  },
  sub: {
    en: 'What the third-party inspector raised, and how each point was cleared',
    ar: 'ما سجّله المفتش المستقل، وكيف عولجت كل نقطة',
    ur: 'فریقِ ثالث کے معائنہ کار نے کیا اٹھایا، اور ہر نکتہ کیسے حل ہوا',
    hi: 'थर्ड-पार्टी इंस्पेक्टर ने क्या उठाया, और हर बिंदु कैसे क्लियर हुआ',
    fr: 'Ce que l’inspecteur tiers a relevé, et comment chaque point a été levé',
  },
  meta: {
    doc: 'FAT punch list',
    order: 'SO 1108308',
    date: 'FAT 23 July 2026',
    project: 'HVDC Converter Station, COA–SOA link — KUDMI (W402 & W405)',
  },
  items: [
    { no: 1, cleared: true, on: '27.07.2026',
      desc: { en: 'CT1 & CT2 label on the backside of the front door to be fixed properly on the proposed witness panel', ar: 'تثبيت ملصق CT1 وCT2 خلف الباب الأمامي بشكل صحيح على لوحة الشهود المقترحة', ur: 'سامنے کے دروازے کی پشت پر CT1 اور CT2 لیبل بالمشاہدہ معائنے والے پینل پر درست لگایا جائے', hi: 'सामने के दरवाज़े के पीछे CT1 और CT2 लेबल प्रस्तावित विटनेस पैनल पर सही लगाया जाए', fr: 'Étiquette CT1 et CT2 au dos de la porte avant à fixer correctement sur le panneau témoin' },
      reply: { en: 'Complied — photo attached', ar: 'تم الامتثال — الصورة مرفقة', ur: 'تعمیل ہو گئی — تصویر منسلک', hi: 'अनुपालन हुआ — फ़ोटो संलग्न', fr: 'Conforme — photo jointe' } },
    { no: 2, cleared: true, on: '27.07.2026',
      desc: { en: 'VCB label to be fixed properly on the proposed witness panel', ar: 'تثبيت ملصق VCB بشكل صحيح على لوحة الشهود المقترحة', ur: 'VCB لیبل بالمشاہدہ معائنے والے پینل پر درست لگایا جائے', hi: 'VCB लेबल प्रस्तावित विटनेस पैनल पर सही लगाया जाए', fr: 'Étiquette VCB à fixer correctement sur le panneau témoin' },
      reply: { en: 'Complied — photo attached', ar: 'تم الامتثال — الصورة مرفقة', ur: 'تعمیل ہو گئی — تصویر منسلک', hi: 'अनुपालन हुआ — फ़ोटो संलग्न', fr: 'Conforme — photo jointe' } },
    { no: 3, cleared: true, on: '27.07.2026',
      desc: { en: 'Door limit switch label found missing on the proposed witness panel', ar: 'ملصق مفتاح حد الباب مفقود على لوحة الشهود المقترحة', ur: 'بالمشاہدہ معائنے والے پینل پر دروازے کے لمٹ سوئچ کا لیبل غائب پایا گیا', hi: 'प्रस्तावित विटनेस पैनल पर डोर लिमिट स्विच का लेबल गायब मिला', fr: 'Étiquette du fin de course de porte manquante sur le panneau témoin' },
      reply: { en: 'Complied — photo attached', ar: 'تم الامتثال — الصورة مرفقة', ur: 'تعمیل ہو گئی — تصویر منسلک', hi: 'अनुपालन हुआ — फ़ोटो संलग्न', fr: 'Conforme — photo jointe' } },
    { no: 4, cleared: true, on: '29.07.2026',
      desc: { en: 'Clean the VCB front surface', ar: 'تنظيف السطح الأمامي للقاطع VCB', ur: 'VCB کی سامنے کی سطح صاف کریں', hi: 'VCB की सामने की सतह साफ़ करें', fr: 'Nettoyer la face avant du VCB' },
      reply: { en: 'Noted and complied', ar: 'تمت الملاحظة والامتثال', ur: 'نوٹ کر لیا اور تعمیل ہو گئی', hi: 'नोट किया और अनुपालन हुआ', fr: 'Noté et conforme' } },
    { no: 5, cleared: true, on: '29.07.2026',
      desc: { en: 'SF6 gas to be filled on all panels as per the proposed design requirements', ar: 'تعبئة غاز SF6 في كل اللوحات وفق متطلبات التصميم المقترحة', ur: 'تمام پینلوں میں SF6 گیس تجویز کردہ ڈیزائن کے مطابق بھری جائے', hi: 'सभी पैनलों में SF6 गैस प्रस्तावित डिज़ाइन के अनुसार भरी जाए', fr: 'Remplir le SF6 sur tous les panneaux selon les exigences de conception' },
      reply: { en: 'Noted; will be rectified wherever required', ar: 'تمت الملاحظة؛ وسيُصحَّح حيثما لزم', ur: 'نوٹ کر لیا؛ جہاں ضرورت ہو درست کیا جائے گا', hi: 'नोट किया; जहाँ ज़रूरी हो ठीक किया जाएगा', fr: 'Noté ; sera corrigé partout où nécessaire' } },
    { no: 6, cleared: true, on: '27.07.2026',
      desc: { en: 'All tags to be installed with the engraved type', ar: 'تركيب كل اللافتات من النوع المحفور', ur: 'تمام ٹیگ کندہ قسم کے لگائے جائیں', hi: 'सभी टैग एनग्रेव्ड प्रकार के लगाए जाएँ', fr: 'Toutes les étiquettes doivent être du type gravé' },
      reply: { en: 'Comply', ar: 'مطابق', ur: 'تعمیل', hi: 'अनुपालन', fr: 'Conforme' } },
    { no: 7, cleared: true, on: '27.07.2026',
      desc: { en: 'Cable gasket to be provided on the proposed witness panel', ar: 'توفير حشية الكابل على لوحة الشهود المقترحة', ur: 'بالمشاہدہ معائنے والے پینل پر کیبل گاسکٹ فراہم کی جائے', hi: 'प्रस्तावित विटनेस पैनल पर केबल गास्केट दिया जाए', fr: 'Prévoir un joint de câble sur le panneau témoin' },
      reply: { en: 'Complied — photo attached', ar: 'تم الامتثال — الصورة مرفقة', ur: 'تعمیل ہو گئی — تصویر منسلک', hi: 'अनुपालन हुआ — फ़ोटो संलग्न', fr: 'Conforme — photo jointe' } },
    { no: 8, cleared: true, on: '27.07.2026',
      desc: { en: 'Routine test reports to be provided for all panels', ar: 'تقديم تقارير الاختبار الروتيني لكل اللوحات', ur: 'تمام پینلوں کی معمول کی جانچ رپورٹیں فراہم کی جائیں', hi: 'सभी पैनलों की रूटीन टेस्ट रिपोर्ट दी जाए', fr: 'Fournir les rapports d’essais de série pour tous les panneaux' },
      reply: { en: 'Attached document provided', ar: 'تم تقديم المستند المرفق', ur: 'منسلک دستاویز فراہم کر دی گئی', hi: 'संलग्न दस्तावेज़ दिया गया', fr: 'Document joint fourni' } },
    { no: 9, cleared: true, on: '27.07.2026',
      desc: { en: 'All review certificates to be provided as per the ITP', ar: 'تقديم كل شهادات المراجعة وفق خطة الفحص والاختبار', ur: 'ITP کے مطابق تمام جائزہ سندیں فراہم کیے جائیں', hi: 'ITP के अनुसार सभी रिव्यू सर्टिफ़िकेट दिए जाएँ', fr: 'Fournir tous les certificats de revue conformément à l’ITP' },
      reply: { en: 'Attached document provided', ar: 'تم تقديم المستند المرفق', ur: 'منسلک دستاویز فراہم کر دی گئی', hi: 'संलग्न दस्तावेज़ दिया गया', fr: 'Document joint fourni' } },
  ],
  pages: Array.from({ length: 6 }, (_, i) => img(`fat-${String(i + 1).padStart(2, '0')}`)),
}

// --------------------------------------------------------- 3 · Defect report
export const DEFECTS = {
  id: 'defects',
  icon: 'defect',
  color: '#C0392B',
  title: {
    en: 'Defective panel report',
    ar: 'تقرير اللوحة المعيبة',
    ur: 'خراب پینل کی رپورٹ',
    hi: 'डिफ़ेक्टिव पैनल रिपोर्ट',
    fr: 'Rapport de panneau défectueux',
  },
  sub: {
    en: 'Damage found on a panel returned from site — what it looks like and what it costs',
    ar: 'أضرار وُجدت في لوحة عادت من الموقع — كيف تبدو وماذا تكلّف',
    ur: 'سائٹ سے واپس آئے پینل میں ملا نقصان — یہ کیسا لگتا ہے اور اس کی قیمت کیا ہے',
    hi: 'साइट से लौटे पैनल में मिला नुक़सान — यह कैसा दिखता है और इसकी क़ीमत क्या है',
    fr: 'Dommages relevés sur un panneau retourné du site — à quoi cela ressemble et ce que cela coûte',
  },
  meta: {
    doc: 'QC report — defected panel inspection',
    order: 'SO 1162271-70',
    date: '8 July 2026',
    project: 'Saudi Pharma Factory — Alfa-12, 17.5 kV, 1250 A, 60 Hz, 25 kA/3 s',
    panel: '(K09) OUTGOING-04 · serial ALFA-12/0218/03.2026/0745',
  },
  intro: {
    en: 'Panels returned from site are inspected to identify damage caused during transport, offloading or installation. Every item below needs replacement — this is what careless handling costs.',
    ar: 'تُفحص اللوحات العائدة من الموقع لتحديد الأضرار الناتجة أثناء النقل أو التفريغ أو التركيب. كل بند أدناه يحتاج استبدالًا — هذه تكلفة المناولة غير المنضبطة.',
    ur: 'سائٹ سے واپس آنے والے پینل جانچے جاتے ہیں تاکہ نقل و حمل، اتارنے یا تنصیب کے دوران ہونے والا نقصان معلوم ہو۔ نیچے ہر شے کو تبدیلی درکار ہے — لاپروا رکھ رکھاؤ کی یہی قیمت ہے۔',
    hi: 'साइट से लौटे पैनल जाँचे जाते हैं ताकि परिवहन, उतारने या इंस्टॉलेशन के दौरान हुआ नुक़सान पता चले। नीचे हर आइटम को बदलने की ज़रूरत है — लापरवाह हैंडलिंग की यही क़ीमत है।',
    fr: 'Les panneaux retournés du site sont inspectés pour identifier les dommages survenus au transport, au déchargement ou à l’installation. Chaque point ci-dessous exige un remplacement — voilà ce que coûte une manutention négligente.',
  },
  panelPhoto: img('panel-info'),
  // Every visual observation carries the report's own row, photo included.
  observations: [
    { no: 1, name: { en: 'Limit switch damage', ar: 'تلف مفتاح الحد', ur: 'لمٹ سوئچ خراب', hi: 'लिमिट स्विच खराब', fr: 'Fin de course endommagé' } },
    { no: 2, name: { en: 'LV door bend', ar: 'انثناء باب الجهد المنخفض', ur: 'LV دروازہ مڑا ہوا', hi: 'LV दरवाज़ा मुड़ा हुआ', fr: 'Porte BT déformée' } },
    { no: 3, name: { en: 'LV right-hand-side frame bend', ar: 'انثناء الإطار الأيمن للجهد المنخفض', ur: 'LV دائیں طرف کا فریم مڑا ہوا', hi: 'LV दाईं ओर का फ़्रेम मुड़ा हुआ', fr: 'Cadre BT côté droit déformé' } },
    { no: 4, name: { en: 'Control cable entry duct damage', ar: 'تلف مجرى دخول كابل التحكم', ur: 'کنٹرول کیبل داخلے کی ڈکٹ خراب', hi: 'कंट्रोल केबल एंट्री डक्ट खराब', fr: 'Goulotte d’entrée des câbles de commande endommagée' } },
    { no: 5, name: { en: 'End cover damage', ar: 'تلف الغطاء الطرفي', ur: 'سرے کا ڈھکن خراب', hi: 'एंड कवर खराब', fr: 'Capot d’extrémité endommagé' } },
    { no: 6, name: { en: 'Panel top sheet damage', ar: 'تلف اللوح العلوي للوحة', ur: 'پینل کی اوپری چادر خراب', hi: 'पैनल की ऊपरी शीट खराब', fr: 'Tôle supérieure du panneau endommagée' } },
    { no: 7, name: { en: 'LV top control cable entry duct damage', ar: 'تلف مجرى كابل التحكم العلوي للجهد المنخفض', ur: 'LV اوپری کنٹرول کیبل داخلے کی ڈکٹ خراب', hi: 'LV ऊपरी कंट्रोल केबल एंट्री डक्ट खराब', fr: 'Goulotte supérieure BT endommagée' } },
    { no: 8, name: { en: 'Lift hook damage', ar: 'تلف خطاف الرفع', ur: 'اٹھانے کا ہک خراب', hi: 'लिफ़्ट हुक खराब', fr: 'Anneau de levage endommagé' } },
    { no: 9, name: { en: 'Panel right-hand-side frame damage', ar: 'تلف الإطار الأيمن للوحة', ur: 'پینل کے دائیں طرف کا فریم خراب', hi: 'पैनल के दाईं ओर का फ़्रेम खराब', fr: 'Cadre du panneau côté droit endommagé' } },
    { no: 10, name: { en: 'LV top sheet damage', ar: 'تلف اللوح العلوي للجهد المنخفض', ur: 'LV اوپری چادر خراب', hi: 'LV ऊपरी शीट खराब', fr: 'Tôle supérieure BT endommagée' } },
    { no: 11, name: { en: 'VCB facial cover damage', ar: 'تلف الغطاء الأمامي للقاطع VCB', ur: 'VCB کا اگلا ڈھکن خراب', hi: 'VCB का फ़्रंट कवर खराब', fr: 'Capot frontal du VCB endommagé' } },
    { no: 12, name: { en: 'VCB tulip plastic cover damaged', ar: 'تلف الغطاء البلاستيكي لتوليب القاطع VCB', ur: 'VCB ٹیولپ کا پلاسٹک ڈھکن خراب', hi: 'VCB ट्यूलिप का प्लास्टिक कवर खराब', fr: 'Capot plastique des tulipes VCB endommagé' } },
  ].map((o) => ({
    ...o,
    photo: img(`obs-${String(o.no).padStart(2, '0')}`),
    action: {
      en: 'Needs replacement',
      ar: 'يحتاج استبدالًا',
      ur: 'تبدیلی درکار',
      hi: 'बदलने की ज़रूरत',
      fr: 'Remplacement nécessaire',
    },
  })),
  functionalPhoto: img('functional'),
  functional: [
    { id: 'F1', name: { en: 'Main relay function', ar: 'وظيفة المرحّل الرئيسي', ur: 'مین ریلے کا عمل', hi: 'मेन रिले फंक्शन', fr: 'Fonction relais principal' }, state: 'ok' },
    { id: 'F2', name: { en: 'VCB racking function', ar: 'وظيفة إدخال وإخراج القاطع', ur: 'VCB ریکنگ کا عمل', hi: 'VCB रैकिंग फंक्शन', fr: 'Fonction d’embrochage VCB' }, state: 'damaged' },
    { id: 'F3', name: { en: 'VCB door interlock function', ar: 'وظيفة تعشيق باب القاطع', ur: 'VCB دروازے کے انٹرلاک کا عمل', hi: 'VCB डोर इंटरलॉक फंक्शन', fr: 'Verrouillage de porte VCB' }, state: 'ok' },
    { id: 'F4', name: { en: 'VCB to earthing interlock function', ar: 'وظيفة تعشيق القاطع مع التأريض', ur: 'VCB تا ارتھنگ انٹرلاک کا عمل', hi: 'VCB से अर्थिंग इंटरलॉक फंक्शन', fr: 'Verrouillage VCB / mise à la terre' }, state: 'ok' },
    { id: 'F5', name: { en: 'VT door interlock function', ar: 'وظيفة تعشيق باب محوّل الجهد', ur: 'VT دروازے کے انٹرلاک کا عمل', hi: 'VT डोर इंटरलॉक फंक्शन', fr: 'Verrouillage de porte TT' }, state: 'na' },
    { id: 'F6', name: { en: 'VT racking function', ar: 'وظيفة إدخال وإخراج محوّل الجهد', ur: 'VT ریکنگ کا عمل', hi: 'VT रैकिंग फंक्शन', fr: 'Fonction d’embrochage TT' }, state: 'na' },
    { id: 'F7', name: { en: 'Earthing function', ar: 'وظيفة التأريض', ur: 'ارتھنگ کا عمل', hi: 'अर्थिंग फंक्शन', fr: 'Fonction de mise à la terre' }, state: 'ok' },
  ],
}

// ------------------------------------------------------------ 4 · Marking key
// The annotation vocabulary used on the GIS work-instruction photographs:
// 92 red attention triangles, 33 yellow ones, numbered green sequence circles,
// and the two marker-pen colours that signal who signed a joint off.
export const MARKS = {
  id: 'marks',
  icon: 'marker',
  color: '#E3B505',
  title: {
    en: 'Marking key',
    ar: 'دليل العلامات',
    ur: 'نشان لگانے کی کلید',
    hi: 'मार्किंग की-गाइड',
    fr: 'Clé des repères',
  },
  sub: {
    en: 'What the arrows, circles and marker colours on the work-instruction photos mean',
    ar: 'ماذا تعني الأسهم والدوائر وألوان الأقلام على صور تعليمات العمل',
    ur: 'کام کی ہدایات کی تصاویر پر تیر، دائرے اور مارکر کے رنگ کیا معنی رکھتے ہیں',
    hi: 'वर्क इंस्ट्रक्शन की फ़ोटो पर तीर, गोले और मार्कर के रंग का क्या मतलब है',
    fr: 'Ce que signifient les flèches, les cercles et les couleurs de marqueur sur les photos',
  },
  meta: {
    doc: 'GIS TANK MODIFICATION 30062026',
    counts: '92 red · 33 yellow · numbered green circles',
  },
  keys: [
    {
      id: 'red-arrow', kind: 'triangle', color: '#EE0000', glyph: '!',
      name: { en: 'Red attention arrow', ar: 'سهم انتباه أحمر', ur: 'سرخ توجہ تیر', hi: 'लाल ध्यान तीर', fr: 'Flèche d’attention rouge' },
      means: {
        en: 'A critical point. Getting this one wrong damages the equipment or injures somebody — stop and check it before you move on.',
        ar: 'نقطة حرجة. الخطأ فيها يُتلف المعدة أو يصيب شخصًا — توقف وتحقق قبل المتابعة.',
        ur: 'ایک نازک نکتہ۔ یہاں غلطی آلے کو نقصان یا کسی کو زخمی کرتی ہے — آگے بڑھنے سے پہلے رک کر جانچیں۔',
        hi: 'एक अहम बिंदु। यहाँ ग़लती उपकरण को नुक़सान या किसी को चोट देती है — आगे बढ़ने से पहले रुककर जाँचें।',
        fr: 'Un point critique. Une erreur ici endommage l’équipement ou blesse quelqu’un — s’arrêter et vérifier avant de continuer.',
      },
    },
    {
      id: 'yellow-arrow', kind: 'triangle', color: '#FFD400', glyph: '!',
      name: { en: 'Yellow attention arrow', ar: 'سهم انتباه أصفر', ur: 'زرد توجہ تیر', hi: 'पीला ध्यान तीर', fr: 'Flèche d’attention jaune' },
      means: {
        en: 'A caution point. Easy to get wrong and easy to miss — look at it deliberately, but it is not an immediate hazard.',
        ar: 'نقطة تنبيه. يسهل الخطأ فيها ويسهل إغفالها — انظر إليها بقصد، لكنها ليست خطرًا مباشرًا.',
        ur: 'احتیاط کا نکتہ۔ یہاں غلطی اور نظرانداز ہونا آسان ہے — جان بوجھ کر دیکھیں، مگر یہ فوری خطرہ نہیں۔',
        hi: 'सावधानी का बिंदु। यहाँ ग़लती और अनदेखी आसान है — जानबूझकर देखें, पर यह तुरंत ख़तरा नहीं है।',
        fr: 'Un point de vigilance. Facile à rater et à mal faire — le regarder délibérément, mais ce n’est pas un danger immédiat.',
      },
    },
    {
      id: 'green-circle', kind: 'circle', color: '#92D050', glyph: '1',
      name: { en: 'Green numbered circle', ar: 'دائرة خضراء مرقّمة', ur: 'سبز نمبر والا دائرہ', hi: 'हरा नंबर वाला गोला', fr: 'Cercle vert numéroté' },
      means: {
        en: 'The order to work in on that photograph. Follow the numbers 1, 2, 3 — they are the sequence, not a list of parts.',
        ar: 'ترتيب العمل في تلك الصورة. اتبع الأرقام 1 و2 و3 — فهي تسلسل وليست قائمة أجزاء.',
        ur: 'اُس تصویر میں کام کی ترتیب۔ نمبر 1، 2، 3 کی پیروی کریں — یہ ترتیب ہے، پرزوں کی فہرست نہیں۔',
        hi: 'उस फ़ोटो में काम का क्रम। नंबर 1, 2, 3 का पालन करें — यह क्रम है, पुर्ज़ों की सूची नहीं।',
        fr: 'L’ordre de travail sur cette photo. Suivre les numéros 1, 2, 3 — c’est une séquence, pas une liste de pièces.',
      },
    },
    {
      id: 'blue-marker', kind: 'marker', color: '#2C7AC0',
      name: { en: 'Blue marker', ar: 'قلم أزرق', ur: 'نیلا مارکر', hi: 'नीला मार्कर', fr: 'Marqueur bleu' },
      means: {
        en: 'Production’s own visual confirmation: the operator has torqued the joint and checked it. A blue line across a bolt and its nut means it has been done.',
        ar: 'تأكيد بصري من الإنتاج: العامل ربط الوصلة بالعزم وفحصها. خط أزرق عبر المسمار وصامولته يعني أنها أُنجزت.',
        ur: 'پیداوار کی اپنی بصری تصدیق: آپریٹر نے جوڑ کو ٹارک کر کے جانچا۔ بولٹ اور نٹ پر نیلی لکیر کا مطلب ہے کام ہو چکا۔',
        hi: 'प्रोडक्शन की अपनी दृश्य पुष्टि: ऑपरेटर ने जोड़ को टॉर्क करके जाँचा। बोल्ट और नट पर नीली लकीर का मतलब है काम हो चुका।',
        fr: 'Confirmation visuelle de la production : l’opérateur a serré l’assemblage au couple et l’a vérifié. Un trait bleu sur le boulon et son écrou signifie que c’est fait.',
      },
    },
    {
      id: 'red-marker', kind: 'marker', color: '#D8352A',
      name: { en: 'Red marker', ar: 'قلم أحمر', ur: 'سرخ مارکر', hi: 'लाल मार्कर', fr: 'Marqueur rouge' },
      means: {
        en: 'Quality Control’s confirmation, added on top of the blue one. A joint carries both lines only after QC has verified it — never mark a joint red yourself.',
        ar: 'تأكيد مراقبة الجودة، يُضاف فوق الأزرق. لا تحمل الوصلة الخطين إلا بعد تحقق الجودة — لا تضع العلامة الحمراء بنفسك أبدًا.',
        ur: 'معیار کی جانچ کی تصدیق، نیلے کے اوپر لگائی جاتی ہے۔ جوڑ پر دونوں لکیریں تبھی ہوتی ہیں جب QC تصدیق کر لے — سرخ نشان خود کبھی نہ لگائیں۔',
        hi: 'क्वालिटी कंट्रोल की पुष्टि, नीले के ऊपर लगाई जाती है। जोड़ पर दोनों लकीरें तभी होती हैं जब QC जाँच ले — लाल निशान खुद कभी न लगाएँ।',
        fr: 'Confirmation du contrôle qualité, ajoutée par-dessus le bleu. Un assemblage ne porte les deux traits qu’après vérification par le CQ — ne jamais marquer en rouge soi-même.',
      },
    },
  ],
}

export const QUALITY_AREAS = [ITP, FAT, DEFECTS, MARKS]
export const getQualityArea = (id) => QUALITY_AREAS.find((a) => a.id === id) || null
