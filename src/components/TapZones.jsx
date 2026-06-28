import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// The whole interaction surface for the step screen. Translates physical taps,
// swipes, keys and the corner-quit gesture into four semantic events, applying
// the RTL mirror (decision A): in Arabic/Urdu the "forward" side is the LEFT.
//
//   onForward  advance (StepView: next step, or finish on the last step)
//   onBack     previous step (no-op when canBack is false)
//   onReplay   restart the animation (center tap)
//   onQuit     double-tap the bottom-leading corner
//
// Persistent affordances (faint chevrons, center-replay hint, corner ✕) make
// the invisible gestures discoverable for first-time / low-literacy workers.
const TAP_MOVE = 24 // px — above this a pointer gesture counts as a swipe
const SWIPE_MIN = 46 // px — horizontal distance to register a swipe
const DEBOUNCE = 280 // ms — ignore repeat forward/back within this window
const DBL_TAP = 420 // ms — corner double-tap window

export default function TapZones({
  rtl = false,
  canBack = true,
  isLast = false,
  tap = true, // when false (phone mode) only swipe/keys navigate; taps are inert
  onForward,
  onBack,
  onReplay,
  onQuit,
}) {
  const { t } = useI18n()
  const ref = useRef(null)
  const start = useRef(null)
  const lastAction = useRef(0)
  const lastCornerTap = useRef(0)

  // Physical side ↔ semantic action, mirrored for RTL.
  const fire = (action) => {
    if (action === 'forward' || action === 'back') {
      const now = performance.now()
      if (now - lastAction.current < DEBOUNCE) return
      lastAction.current = now
    }
    if (action === 'forward') onForward?.()
    else if (action === 'back') {
      if (canBack) onBack?.()
    } else if (action === 'replay') onReplay?.()
    else if (action === 'quit') onQuit?.()
  }

  const physLeft = () => fire(rtl ? 'forward' : 'back')
  const physRight = () => fire(rtl ? 'back' : 'forward')

  const inCorner = (x, y, rect) => {
    const bottom = y > rect.height * 0.74
    const lead = rtl ? x > rect.width * 0.82 : x < rect.width * 0.18
    return bottom && lead
  }

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }

  const onPointerUp = (e) => {
    const s = start.current
    start.current = null
    if (!s) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    const dist = Math.hypot(dx, dy)
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Swipe: horizontal, dominant. Leftward = forward in LTR / back in RTL.
    if (dist > TAP_MOVE && Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      const leftward = dx < 0
      fire(leftward === !rtl ? 'forward' : 'back')
      return
    }

    // Tap: classify by position. Corner (quit) wins, then center, then sides.
    if (dist <= TAP_MOVE && tap) {
      if (inCorner(x, y, rect)) {
        const now = performance.now()
        if (now - lastCornerTap.current < DBL_TAP) {
          lastCornerTap.current = 0
          fire('quit')
        } else {
          lastCornerTap.current = now
        }
        return
      }
      const w = rect.width
      if (x > w * 0.34 && x < w * 0.66) fire('replay')
      else if (x <= w * 0.34) physLeft()
      else physRight()
    }
  }

  // Keyboard fallback (a panel may have a keyboard). Physical-side mapping keeps
  // it consistent with the on-screen chevrons.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') physRight()
      else if (e.key === 'ArrowLeft') physLeft()
      else if (e.key === ' ' || e.key === 'Enter') fire('replay')
      else if (e.key === 'Escape') fire('quit')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtl, canBack, isLast])

  // Positioning is logical: back is always inline-start, forward inline-end —
  // which the dir attribute mirrors to the correct physical side. Only the
  // chevron glyph is chosen by direction so it points the right way.
  const forwardGlyph = rtl ? 'chevron-left' : 'chevron-right'
  const backGlyph = rtl ? 'chevron-right' : 'chevron-left'

  return (
    <div
      ref={ref}
      className="tap-zones"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (start.current = null)}
    >
      {/* faint side chevrons */}
      <div
        className="tz-aff tz-aff--back"
        data-disabled={!canBack || undefined}
        aria-hidden="true"
      >
        <Icon name={backGlyph} size={56} />
      </div>

      <div className="tz-aff tz-aff--forward" aria-hidden="true">
        {isLast ? (
          <span className="tz-finish">
            <Icon name="check" size={52} />
          </span>
        ) : (
          <Icon name={forwardGlyph} size={56} />
        )}
      </div>

      {/* center replay hint */}
      <div className="tz-center-hint" aria-hidden="true">
        <Icon name="replay" size={30} />
        <span className="mono">{t('step.replay')}</span>
      </div>

      {/* bottom-leading corner quit hint */}
      <div className="tz-quit-hint" data-rtl={rtl || undefined} aria-hidden="true">
        <Icon name="x" size={22} />
        <span className="mono">{t('a11y.quitHint')}</span>
      </div>
    </div>
  )
}
