import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'alfanar.device'
const DeviceContext = createContext(null)

// Two layout modes:
//   'kiosk' — the default wall-mounted landscape experience.
//   'phone' — a portrait, single-column layout for a worker's own phone.
// The mode is a manual choice (toggle button), persisted, and auto-defaulted to
// 'phone' on small screens. It mirrors the pre-paint logic in index.html so the
// first render already matches (no flash).
function initialMode() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'phone' || v === 'kiosk') return v
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 820) {
    return 'phone'
  }
  return 'kiosk'
}

export function DeviceProvider({ children }) {
  const [mode, setModeState] = useState(initialMode)

  useEffect(() => {
    document.documentElement.dataset.device = mode
  }, [mode])

  const setMode = useCallback((m) => {
    if (m !== 'phone' && m !== 'kiosk') return
    setModeState(m)
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(
    () => setModeState((prev) => {
      const next = prev === 'phone' ? 'kiosk' : 'phone'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    }),
    [],
  )

  const value = useMemo(
    () => ({ mode, isPhone: mode === 'phone', setMode, toggle }),
    [mode, setMode, toggle],
  )

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export function useDevice() {
  const ctx = useContext(DeviceContext)
  if (!ctx) throw new Error('useDevice must be used within <DeviceProvider>')
  return ctx
}
