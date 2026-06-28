// Resolve a runtime asset path against Vite's base URL.
// Content/data references files with a root-absolute path (e.g. '/media/x.jpg',
// '/brand/logo.svg'). That works at the dev root, but on GitHub Pages the app is
// served from a subpath ('/alfanar-catalogue-project/'), so those must be
// rewritten to live under import.meta.env.BASE_URL. External and already-relative
// paths are returned untouched.
export function asset(path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
    return path
  }
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path
}
