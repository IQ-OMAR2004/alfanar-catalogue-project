// Task aggregator. Every module in ./tasks/*.js is auto-discovered, so adding a
// task is just dropping a file (see SCHEMA.md). Sorted by `order`.
const modules = import.meta.glob('./tasks/*.js', { eager: true })

export const tasks = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

export const getTask = (id) => tasks.find((t) => t.id === id) || null

// Sum of per-step estimates (source of truth for remaining/elapsed math).
export const taskTotalMin = (task) =>
  task?.steps?.reduce((sum, s) => sum + (s.estMin || 0), 0) ?? 0

// ---------------------------------------------------------------- folders
// The work-instruction side is grouped into three folders. A folder is also the
// boundary for unattended auto-play: the loop walks the folder's own tasks and
// never wanders into another folder, so a panel left running on the GIS bay
// keeps showing GIS work.
//
// `taskIds` is explicit for the first two folders; "testing" deliberately has
// none, which makes it the catch-all — a new commissioning task dropped into
// ./tasks lands there automatically instead of vanishing from the grid.
export const FOLDERS = [
  {
    id: 'gis',
    icon: 'gis-tank',
    color: '#0A82C6',
    taskIds: ['gis-full-wi', 'gis-full-wi-plus'],
    title: {
      en: 'GIS',
      ar: 'GIS',
      ur: 'GIS',
      hi: 'GIS',
      fr: 'GIS',
    },
    sub: {
      en: 'The full 60-step dismantle and assemble work instruction',
      ar: 'تعليمات العمل الكاملة للتفكيك والتجميع المكوّنة من 60 خطوة',
      ur: 'علیحدگی اور تنصیب کی مکمل 60 مرحلوں والی کام کی ہدایات',
      hi: 'पूरा 60-चरण निराकरण और संयोजन वर्क इंस्ट्रक्शन',
      fr: 'L’instruction complète de démontage et d’assemblage en 60 étapes',
    },
  },
  {
    id: 'other',
    icon: 'switchgear',
    color: '#8E5BC4',
    taskIds: [
      'gis-tank-modification',
      'gis-tank-modification-animated',
      'gis-s1-to-s3-transfer',
    ],
    title: {
      en: 'Other',
      ar: 'أخرى',
      ur: 'دیگر',
      hi: 'अन्य',
      fr: 'Autres',
    },
    sub: {
      en: 'Tank modification and the Solution 1 to Solution 3 transfer',
      ar: 'تعديل الخزان والنقل من الحل 1 إلى الحل 3',
      ur: 'ٹینک کی ترمیم اور Solution 1 سے Solution 3 منتقلی',
      hi: 'टैंक मॉडिफिकेशन और सोल्यूशन 1 से सोल्यूशन 3 स्थानांतरण',
      fr: 'Modification de cuve et transfert Solution 1 vers Solution 3',
    },
  },
  {
    id: 'testing',
    icon: 'breaker-test',
    color: '#1F9D6B',
    taskIds: null, // catch-all: everything not claimed above
    title: {
      en: 'Testing',
      ar: 'الاختبارات',
      ur: 'جانچ',
      hi: 'टेस्टिंग',
      fr: 'Essais',
    },
    sub: {
      en: 'Commissioning tests from the CSD manual, animated and with manual photos',
      ar: 'اختبارات الإدخال في الخدمة من دليل CSD، برسوم متحركة وبصور الدليل',
      ur: 'CSD کتابچے کی کمیشننگ جانچ، متحرک تصاویر اور کتابچے کی تصاویر کے ساتھ',
      hi: 'CSD मैनुअल के कमीशनिंग टेस्ट, एनिमेशन और मैनुअल फ़ोटो के साथ',
      fr: 'Essais de mise en service du manuel CSD, animés et avec photos du manuel',
    },
  },
]

const CLAIMED = new Set(FOLDERS.flatMap((f) => f.taskIds || []))

// Tasks belonging to a folder, in grid order. The catch-all folder gets
// whatever no other folder claimed.
export const folderTasks = (folderId) => {
  const folder = FOLDERS.find((f) => f.id === folderId)
  if (!folder) return []
  if (!folder.taskIds) return tasks.filter((t) => !CLAIMED.has(t.id))
  return folder.taskIds.map((id) => getTask(id)).filter(Boolean)
}

export const getFolder = (id) => FOLDERS.find((f) => f.id === id) || null

// Which folder a task lives in — used to keep auto-play inside its own folder
// even when a run was started from somewhere else.
export const folderOfTask = (taskId) => {
  const named = FOLDERS.find((f) => f.taskIds?.includes(taskId))
  if (named) return named.id
  return FOLDERS.find((f) => !f.taskIds)?.id ?? null
}

// The next task in the same folder, wrapping — the unattended loop.
export const nextTaskInFolder = (taskId, folderId) => {
  const list = folderTasks(folderId || folderOfTask(taskId))
  if (!list.length) return null
  const i = list.findIndex((t) => t.id === taskId)
  return list[(i + 1) % list.length].id
}
