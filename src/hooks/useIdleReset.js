import { useEffect, useRef } from 'react'

// Kiosk hygiene: after `timeoutMs` of no interaction, call `onIdle` (return to
// task selection). Any pointer/key/touch activity restarts the timer. Pass
// `enabled = false` on screens where idle-reset shouldn't run (e.g. the
// language gate / task grid themselves).
export function useIdleReset(onIdle, { timeoutMs = 180000, enabled = true } = {}) {
  const cb = useRef(onIdle)
  cb.current = onIdle

  useEffect(() => {
    if (!enabled) return
    let timer

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => cb.current?.(), timeoutMs)
    }

    const events = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [timeoutMs, enabled])
}
