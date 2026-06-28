import { useCallback, useEffect, useState } from 'react'

const KEY = 'alfanar.theme'

function systemTheme() {
  return typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Manual light/dark with persistence; falls back to the OS preference until the
// worker chooses (and tracks the OS live while unset). Factory lighting varies,
// so the manual override matters. The initial value is also set pre-paint in
// index.html to avoid a flash.
export function useTheme() {
  const [explicit, setExplicit] = useState(() => {
    try {
      const v = localStorage.getItem(KEY)
      return v === 'light' || v === 'dark' ? v : null
    } catch {
      return null
    }
  })
  const [system, setSystem] = useState(systemTheme)

  // Track OS changes only while the user hasn't picked.
  useEffect(() => {
    if (typeof matchMedia === 'undefined') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setSystem(e.matches ? 'dark' : 'light')
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const theme = explicit ?? system

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B2138' : '#0A82C6')
  }, [theme])

  const toggle = useCallback(() => {
    setExplicit((prev) => {
      const next = (prev ?? systemTheme()) === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
