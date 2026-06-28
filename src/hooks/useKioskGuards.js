import { useEffect } from 'react'

// Input hardening for a public wall panel. Blocks the gestures and shortcuts
// that would let a stray touch escape the app:
//   - context menu (long-press / right-click)
//   - pinch-zoom and double-tap-zoom (Safari gesture events + ctrl+wheel)
//   - browser back/forward via history trap
//   - selection drag
// Pull-to-refresh / overscroll bounce is handled in global.css.
export function useKioskGuards(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const prevent = (e) => e.preventDefault()

    // Block multi-touch pinch and Safari gesture zoom.
    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault()
    }
    const onWheel = (e) => {
      if (e.ctrlKey) e.preventDefault() // trackpad/ctrl zoom
    }
    // Suppress accidental double-tap zoom (iOS): cancel a 2nd tap <300ms.
    let lastTouch = 0
    const onTouchEnd = (e) => {
      const now = e.timeStamp
      if (now - lastTouch < 300) e.preventDefault()
      lastTouch = now
    }

    document.addEventListener('contextmenu', prevent)
    document.addEventListener('gesturestart', prevent)
    document.addEventListener('gesturechange', prevent)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd, { passive: false })
    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('dragstart', prevent)

    // Trap the back gesture: keep a dummy state on the stack and re-push it.
    const onPopState = () => history.pushState(null, '', location.href)
    history.pushState(null, '', location.href)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('gesturestart', prevent)
      document.removeEventListener('gesturechange', prevent)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('dragstart', prevent)
      window.removeEventListener('popstate', onPopState)
    }
  }, [enabled])
}
