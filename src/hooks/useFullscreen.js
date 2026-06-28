import { useCallback, useEffect, useState } from 'react'

// Fullscreen control for kiosk launch. Browsers require a user gesture to enter
// fullscreen, so callers wire `enter` to the first tap (see App).
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    () => !!document.fullscreenElement,
  )

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const enter = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.({
          navigationUI: 'hide',
        })
      }
    } catch {
      /* not permitted (e.g. embedded/dev) — non-fatal */
    }
  }, [])

  const exit = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen?.()
    } catch {
      /* ignore */
    }
  }, [])

  const supported =
    typeof document !== 'undefined' &&
    !!document.documentElement.requestFullscreen

  return { isFullscreen, enter, exit, supported }
}
