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
