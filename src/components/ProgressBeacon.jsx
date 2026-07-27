import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

// The step progress header. A slim bar whose fill ends in a glowing beacon dot
// — the alfanar lighthouse motif, kept subtle. Shows "Step X of Y" and the
// remaining estimated time.
//
// The bar is also the scrubber: press anywhere on it, or drag the beacon, to
// jump straight to that step. The track is time-weighted (a 12-minute step is
// twice as wide as a 6-minute one), so a position maps back to a step through
// the same cumulative-minutes math that drives the fill.
//
//   current   1-based step number
//   total     step count
//   fraction  0..1 fill (time-weighted)
//   remaining "12 min left" string (already localized)
//   weights   per-step minutes, used to map a scrub position back to a step
//   onSeek    (index0) => void; omit to render a plain, non-interactive bar
export default function ProgressBeacon({
  current,
  total,
  fraction,
  remaining,
  weights,
  onSeek,
}) {
  const { t, rtl } = useI18n()
  const trackRef = useRef(null)
  const [drag, setDrag] = useState(null) // 0..1 while scrubbing, else null (drives the render)
  // The same value in a ref: state updates are batched, so a press and release
  // that land in one batch would leave `drag` still null when the release is
  // handled and the jump would be silently dropped. The ref is always current.
  const dragRef = useRef(null)
  const seekable = typeof onSeek === 'function' && total > 1

  const pct = Math.max(0, Math.min(1, drag ?? fraction)) * 100

  // Position along the track -> step index, via cumulative minutes. Falls back
  // to an even split when a task carries no per-step estimates.
  const indexAt = useCallback(
    (f) => {
      const even = () =>
        Math.min(total - 1, Math.max(0, Math.round(f * (total - 1))))
      const w = weights?.length === total ? weights : null
      if (!w) return even()
      const sum = w.reduce((s, n) => s + (n || 0), 0)
      if (!sum) return even()
      let acc = 0
      const target = f * sum
      for (let i = 0; i < total; i++) {
        acc += w[i] || 0
        if (target < acc) return i
      }
      return total - 1
    },
    [weights, total],
  )

  const fracFromEvent = useCallback(
    (clientX) => {
      const el = trackRef.current
      if (!el) return 0
      const r = el.getBoundingClientRect()
      if (!r.width) return 0
      const raw = (clientX - r.left) / r.width
      // The track is laid out with logical properties, so in RTL its visual
      // start is on the right — mirror the pointer position to match.
      return Math.max(0, Math.min(1, rtl ? 1 - raw : raw))
    },
    [rtl],
  )

  // Pointer capture keeps the drag alive when the finger slides off the 12px
  // ribbon, but it throws for a pointer id the browser is not tracking — never
  // let that abort the press itself.
  const capture = (e, on) => {
    const el = trackRef.current
    if (!el) return
    try {
      if (on) el.setPointerCapture?.(e.pointerId)
      else el.releasePointerCapture?.(e.pointerId)
    } catch {
      /* pointer already released, or a synthetic event */
    }
  }

  const setBoth = (v) => {
    dragRef.current = v
    setDrag(v)
  }

  const begin = (e) => {
    if (!seekable) return
    e.stopPropagation()
    capture(e, true)
    setBoth(fracFromEvent(e.clientX))
  }

  const move = (e) => {
    if (dragRef.current == null) return
    e.stopPropagation()
    setBoth(fracFromEvent(e.clientX))
  }

  const end = (e) => {
    if (dragRef.current == null) return
    e.stopPropagation()
    capture(e, false)
    onSeek(indexAt(fracFromEvent(e.clientX)))
    setBoth(null)
  }

  // While scrubbing, the label previews the step you would land on.
  const previewIndex = drag == null ? null : indexAt(drag)

  // Keyboard access for the slider itself. The step screen already binds the
  // arrow keys globally, so only act when the bar has focus and swallow the
  // event so the step does not advance twice.
  const onKey = (e) => {
    if (!seekable) return
    const go = (delta) => {
      e.preventDefault()
      e.stopPropagation()
      const next = Math.max(0, Math.min(total - 1, current - 1 + delta))
      if (next !== current - 1) onSeek(next)
    }
    if (e.key === 'ArrowRight') go(rtl ? -1 : 1)
    else if (e.key === 'ArrowLeft') go(rtl ? 1 : -1)
    else if (e.key === 'Home') go(-(current - 1))
    else if (e.key === 'End') go(total - current)
  }

  // A pointer released outside the track still ends the drag.
  useEffect(() => {
    if (drag == null) return undefined
    const cancel = () => {
      dragRef.current = null
      setDrag(null)
    }
    window.addEventListener('pointercancel', cancel)
    return () => window.removeEventListener('pointercancel', cancel)
  }, [drag])

  return (
    <div className="progress-beacon">
      <div className="progress-beacon-row">
        <span className="progress-beacon-step mono">
          {t('step.of', {
            current: previewIndex == null ? current : previewIndex + 1,
            total,
          })}
        </span>
        {remaining && (
          <span className="progress-beacon-remaining mono">{remaining}</span>
        )}
      </div>

      <div
        ref={trackRef}
        className={`progress-track${seekable ? ' progress-track--seek' : ''}`}
        data-dragging={drag != null || undefined}
        role={seekable ? 'slider' : 'progressbar'}
        tabIndex={seekable ? 0 : undefined}
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={seekable ? t('a11y.seek') : t('a11y.progress')}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={end}
        onKeyDown={onKey}
      >
        {/* segment ticks — one per step, an engineering read */}
        <div className="progress-ticks" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className="progress-tick" data-done={i < current} />
          ))}
        </div>
        <div className="progress-fill" style={{ inlineSize: `${pct}%` }}>
          <span className="progress-beacon-dot" />
        </div>
      </div>
    </div>
  )
}
