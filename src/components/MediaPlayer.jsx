import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { resolveAnimation } from '../animations/index.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useDevice } from '../device/DeviceProvider.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { asset } from '../utils/asset.js'
import Icon from './Icon.jsx'

// Format-agnostic media slot. A step's `media` is either a single item
// {type, src} or an ARRAY of items (multiple photos for clarity). Types: 'svg'
// (animation component) | 'image' | 'gif' | 'video'. Swapping in real footage
// later is just a data change — no screen code edits.
//
// Layout differs by device:
//   kiosk — multi-photo arrays render as a GRID (all photos visible at once on
//           the large landscape panel).
//   phone — the grid would shrink each photo to an illegible thumbnail, so a
//           multi-photo step becomes a full-width swipeable FILMSTRIP (one photo
//           per view) and every photo is tap-to-enlarge into a fullscreen
//           lightbox. This is the readable, glove-friendly fix for small screens.
export default function MediaPlayer({ media, paused = false, reduced }) {
  const sysReduced = useReducedMotion()
  const isReduced = reduced ?? sysReduced
  const { isPhone } = useDevice()
  const [lightbox, setLightbox] = useState(null) // open photo index, or null

  if (!media) return <MediaFallback />
  const items = Array.isArray(media) ? media.filter(Boolean) : [media]
  if (items.length === 0) return <MediaFallback />

  // Only raster photos/gifs are worth enlarging (SVG animations + video aren't).
  const zoomable = (it) => !!it && (it.type === 'image' || it.type === 'gif')
  const canZoom = (i) => isPhone && zoomable(items[i])
  const open = (i) => canZoom(i) && setLightbox(i)

  let inner
  if (items.length === 1) {
    inner = (
      <MediaItem
        item={items[0]}
        paused={paused}
        reduced={isReduced}
        zoom={canZoom(0)}
        onZoom={() => open(0)}
      />
    )
  } else if (isPhone) {
    inner = <PhoneFilmstrip items={items} paused={paused} reduced={isReduced} onZoom={open} />
  } else {
    inner = (
      <div className="media-grid" data-count={Math.min(items.length, 9)}>
        {items.map((item, i) => (
          <div key={i} className="media-cell">
            <MediaItem item={item} paused={paused} reduced={isReduced} />
            <span className="media-cell-no mono" aria-hidden="true">{i + 1}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {inner}
      {lightbox != null && (
        <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}

// Phone: a horizontal scroll-snap filmstrip — each photo fills the box width, so
// it renders at (near) its native resolution instead of a cramped grid cell. A
// live counter + dots make the multi-photo nature discoverable.
function PhoneFilmstrip({ items, paused, reduced, onZoom }) {
  const { t } = useI18n()
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = ref.current
    if (!el || !el.clientWidth) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    setActive(Math.max(0, Math.min(items.length - 1, i)))
  }

  return (
    <div className="media-film-wrap">
      <div className="media-film" ref={ref} onScroll={onScroll}>
        {items.map((item, i) => (
          <button
            type="button"
            key={i}
            className="media-film-cell"
            onClick={() => onZoom(i)}
            aria-label={`${t('step.photoOf', { n: i + 1, total: items.length })} — ${t('step.enlarge')}`}
          >
            <MediaItem item={item} paused={paused} reduced={reduced} />
            {(item.type === 'image' || item.type === 'gif') && (
              <span className="media-film-zoom" aria-hidden="true">
                <Icon name="zoom" size={16} />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="media-film-bar" aria-hidden="true">
        <span className="media-film-count mono">
          {active + 1} / {items.length}
        </span>
        <span className="media-film-dots">
          {items.map((_, i) => (
            <span key={i} className="media-film-dot" data-on={i === active || undefined} />
          ))}
        </span>
      </div>
    </div>
  )
}

// Fullscreen photo viewer. Portaled to <body> so it escapes the step's animated
// (transformed) subtree and truly covers the viewport. Tap the backdrop or the
// close button to dismiss; arrows page through a multi-photo step.
function Lightbox({ items, index, onClose }) {
  const { t } = useI18n()
  const [i, setI] = useState(index)
  const item = items[i]
  const many = items.length > 1
  const go = (delta) => setI((p) => (p + delta + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      } else if (many && e.key === 'ArrowRight') {
        e.stopPropagation()
        go(1)
      } else if (many && e.key === 'ArrowLeft') {
        e.stopPropagation()
        go(-1)
      }
    }
    // Capture phase so the step-level key handlers don't also fire (e.g. Esc=quit).
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [many, items.length])

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label={t('step.closePhoto')}>
        <Icon name="x" size={26} />
      </button>

      <img
        className="lightbox-img"
        src={asset(item.src)}
        alt={item.alt || ''}
        onClick={(e) => e.stopPropagation()}
      />

      {many && (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label={t('nav.previous')}
          >
            <Icon name="chevron-left" size={30} />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label={t('nav.next')}
          >
            <Icon name="chevron-right" size={30} />
          </button>
          <span className="lightbox-count mono" aria-hidden="true">
            {i + 1} / {items.length}
          </span>
        </>
      )}
    </div>,
    document.body,
  )
}

function MediaItem({ item, paused, reduced, zoom = false, onZoom }) {
  if (item.type === 'svg') {
    const Anim = resolveAnimation(item.src)
    if (!Anim) return <MediaFallback label={item.src} />
    return (
      <div className="media-stage" data-paused={paused || undefined}>
        <Anim paused={paused} reduced={reduced} />
      </div>
    )
  }

  if (item.type === 'video') {
    return (
      <div className="media-stage">
        <video className="media-video" src={asset(item.src)} poster={asset(item.poster)}
          autoPlay={!paused} loop muted playsInline />
      </div>
    )
  }

  if (item.type === 'gif' || item.type === 'image') {
    // On a single-photo phone step the stage itself is the tap-to-enlarge target.
    const stageProps = onZoom
      ? {
          role: 'button',
          tabIndex: 0,
          onClick: onZoom,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onZoom()
            }
          },
        }
      : {}
    return (
      <div className={`media-stage${zoom ? ' media-stage--zoom' : ''}`} {...stageProps}>
        <img className="media-img" src={asset(item.src)} alt={item.alt || ''} loading="eager" />
        {zoom && (
          <span className="media-film-zoom" aria-hidden="true">
            <Icon name="zoom" size={16} />
          </span>
        )}
      </div>
    )
  }

  return <MediaFallback label={item.type} />
}

// Shown before a step's hand-authored animation exists, or for an unknown
// format. Keeps the layout stable and on-brand.
function MediaFallback({ label }) {
  return (
    <div className="media-stage media-fallback">
      <svg viewBox="0 0 120 90" width="42%" aria-hidden="true">
        <rect x="2" y="2" width="116" height="86" rx="6" fill="none"
          stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
        <circle cx="60" cy="45" r="16" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="14;18;14" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M54 45l9 0M59 41l4 4-4 4" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && <span className="mono media-fallback-label">{label}</span>}
    </div>
  )
}
