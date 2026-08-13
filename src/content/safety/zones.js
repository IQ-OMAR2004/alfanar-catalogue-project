// Factory PPE zone map — transcribed from the controlled deck "zones ppe.pptx"
// (slide 1: the plant layout with a PPE emoji label pinned inside every zone).
//
// Each zone carries:
//   id      stable key used in URLs/state
//   no      the zone number printed on the map (5 appears twice — west and east)
//   colour  the fill colour the map itself uses, so the app's chips and hotspot
//           highlight match the printed plan exactly
//   rect    hotspot as a fraction of the map image (x0,y0,x1,y1), measured from
//           the image by colour-region analysis rather than by eye
//   ppe     required items, already in DONNING order (cap → helmet → eyes →
//           ears → mask → sleeves → gloves; gloves always last)
//
// Emoji → PPE reading used for the transcription:
//   🧢 safety cap   🪖 safety helmet   🥽 safety glasses   🎧 hearing protection
//   😷 dust mask    🦾 arm sleeves     ✋🏿 work gloves      🧤 insulated gloves
//
// PLACEHOLDER pending SME review — the zone geometry and the PPE lists come
// from the deck; confirm against the plant's controlled HSE signage before any
// shop-floor use.

// Canonical donning order. A zone's `ppe` is sorted through this so every zone
// teaches the same sequence — you cannot put a helmet over a cap you have not
// put on yet, and gloves always go on last.
export const DONNING_ORDER = [
  'safety_cap',
  'safety_helmet',
  'safety_glasses',
  'hearing_protection',
  'dust_mask',
  'arm_sleeves',
  'insulated_gloves',
  'gloves',
]

const order = (items) =>
  [...items].sort((a, b) => DONNING_ORDER.indexOf(a) - DONNING_ORDER.indexOf(b))

const zone = (z) => ({ ...z, ppe: order(z.ppe) })

export const ZONES = [
  zone({
    id: 'z1-testing',
    no: '1',
    color: '#E0564C',
    rect: [0.244, 0.704, 0.481, 0.917],
    name: {
      en: 'Testing',
      ar: 'الاختبار',
      ur: 'جانچ',
      hi: 'टेस्टिंग',
      fr: 'Essais',
    },
    ppe: ['gloves', 'safety_cap', 'insulated_gloves'],
  }),
  zone({
    id: 'z2-final-assembly',
    no: '2',
    color: '#3EA8A8',
    rect: [0.238, 0.470, 0.498, 0.678],
    name: {
      en: 'Final assembly',
      ar: 'التجميع النهائي',
      ur: 'حتمی اسمبلی',
      hi: 'फ़ाइनल असेंबली',
      fr: 'Assemblage final',
    },
    ppe: ['gloves', 'safety_cap', 'safety_helmet', 'hearing_protection', 'dust_mask'],
  }),
  zone({
    id: 'z3-gis-panel',
    no: '3',
    color: '#D9B310',
    rect: [0.484, 0.700, 0.756, 0.917],
    name: {
      en: 'GIS panel',
      ar: 'لوحة GIS',
      ur: 'GIS پینل',
      hi: 'GIS पैनल',
      fr: 'Tableau GIS',
    },
    ppe: ['gloves', 'safety_cap', 'dust_mask', 'safety_helmet'],
  }),
  zone({
    id: 'z4-sub-assembly',
    no: '4',
    color: '#3FAE5A',
    rect: [0.500, 0.470, 0.629, 0.678],
    name: {
      en: 'Sub-assembly',
      ar: 'التجميع الفرعي',
      ur: 'ذیلی اسمبلی',
      hi: 'सब-असेंबली',
      fr: 'Sous-assemblage',
    },
    ppe: ['gloves', 'safety_cap', 'hearing_protection'],
  }),
  zone({
    id: 'z5-lv-west',
    no: '5',
    color: '#E8873C',
    // The map prints ZONE 5 twice, and the two areas carry DIFFERENT PPE — kept
    // separate here (west / east) rather than merged, so each area shows exactly
    // what the deck requires for it.
    rect: [0.096, 0.283, 0.232, 0.457],
    name: {
      en: 'LV box wiring — west',
      ar: 'أسلاك صندوق الجهد المنخفض — غرب',
      ur: 'LV ڈبے کی وائرنگ — مغرب',
      hi: 'LV बॉक्स वायरिंग — पश्चिम',
      fr: 'Câblage coffret BT — ouest',
    },
    ppe: ['gloves', 'safety_cap'],
  }),
  zone({
    id: 'z5-lv-east',
    no: '5',
    color: '#D4692A',
    rect: [0.634, 0.326, 0.770, 0.683],
    name: {
      en: 'LV box wiring — east',
      ar: 'أسلاك صندوق الجهد المنخفض — شرق',
      ur: 'LV ڈبے کی وائرنگ — مشرق',
      hi: 'LV बॉक्स वायरिंग — पूर्व',
      fr: 'Câblage coffret BT — est',
    },
    ppe: ['gloves', 'safety_cap', 'hearing_protection', 'dust_mask'],
  }),
  zone({
    id: 'z6-conveyor',
    no: '6',
    color: '#2E86C8',
    rect: [0.237, 0.283, 0.629, 0.457],
    name: {
      en: 'Conveyor line',
      ar: 'خط الناقل',
      ur: 'کنویئر لائن',
      hi: 'कन्वेयर लाइन',
      fr: 'Ligne convoyeur',
    },
    ppe: [
      'gloves',
      'safety_cap',
      'hearing_protection',
      'safety_glasses',
      'safety_helmet',
      'arm_sleeves',
    ],
  }),
  zone({
    id: 'z7-packing',
    no: '7',
    color: '#2C9BA6',
    rect: [0.777, 0.735, 0.862, 0.909],
    name: {
      en: 'Packing',
      ar: 'التغليف',
      ur: 'پیکنگ',
      hi: 'पैकिंग',
      fr: 'Emballage',
    },
    ppe: [
      'gloves',
      'safety_cap',
      'hearing_protection',
      'safety_glasses',
      'safety_helmet',
      'dust_mask',
    ],
  }),
  zone({
    id: 'z8-busbar',
    no: '8',
    color: '#9B5BC4',
    rect: [0.777, 0.600, 0.859, 0.722],
    name: {
      en: 'Bus-bar',
      ar: 'القضبان الناقلة',
      ur: 'بس بار',
      hi: 'बसबार',
      fr: 'Jeu de barres',
    },
    ppe: ['gloves', 'dust_mask', 'arm_sleeves'],
  }),
  zone({
    id: 'z9-sub-store',
    no: '9',
    color: '#E07B39',
    rect: [0.779, 0.113, 0.858, 0.309],
    name: {
      en: 'Sub-store',
      ar: 'المخزن الفرعي',
      ur: 'ذیلی اسٹور',
      hi: 'सब-स्टोर',
      fr: 'Magasin secondaire',
    },
    ppe: ['gloves', 'safety_helmet', 'dust_mask'],
  }),
  zone({
    id: 'z10-vcb',
    no: '10',
    color: '#A38C55',
    rect: [0.021, 0.522, 0.235, 0.722],
    name: {
      en: 'VCB line',
      ar: 'خط VCB',
      ur: 'VCB لائن',
      hi: 'VCB लाइन',
      fr: 'Ligne VCB',
    },
    ppe: ['hearing_protection', 'dust_mask', 'safety_cap', 'gloves', 'safety_helmet'],
  }),
  zone({
    id: 'z11-mimic',
    no: '11',
    color: '#6FA82E',
    rect: [0.636, 0.065, 0.761, 0.300],
    name: {
      en: 'Mimic area',
      ar: 'منطقة الميميك',
      ur: 'میمک حصہ',
      hi: 'मिमिक एरिया',
      fr: 'Zone synoptique',
    },
    ppe: [
      'gloves',
      'safety_cap',
      'hearing_protection',
      'safety_glasses',
      'safety_helmet',
      'dust_mask',
    ],
  }),
]

export const getZone = (id) => ZONES.find((z) => z.id === id) || null

export const MAP_SRC = '/media/safety/zone-map.jpg'
export const MAP_RATIO = 1704 / 923
