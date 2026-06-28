import { useEffect, useRef } from 'react'

// Keep the wall panel awake. Re-acquires the lock when the tab becomes visible
// again (the lock is released by the browser on visibility change).
export function useWakeLock(active = true) {
  const lockRef = useRef(null)

  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return
    let cancelled = false

    const acquire = async () => {
      try {
        lockRef.current = await navigator.wakeLock.request('screen')
      } catch {
        /* denied or not allowed (e.g. low battery) — non-fatal */
      }
    }

    const onVisible = () => {
      if (!cancelled && document.visibilityState === 'visible') acquire()
    }

    acquire()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      lockRef.current?.release?.().catch(() => {})
      lockRef.current = null
    }
  }, [active])
}
