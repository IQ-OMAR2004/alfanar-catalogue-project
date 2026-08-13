import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MediaPlayer from '../components/MediaPlayer.jsx'
import TapZones from '../components/TapZones.jsx'
import ProgressBeacon from '../components/ProgressBeacon.jsx'
import TimeChip from '../components/TimeChip.jsx'
import SafetyBanner from '../components/SafetyBanner.jsx'
import PPEBadge from '../components/PPEBadge.jsx'
import AudioButton from '../components/AudioButton.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import ModeToggle from '../components/ModeToggle.jsx'
import DeviceToggle from '../components/DeviceToggle.jsx'
import AutoplayToggle from '../components/AutoplayToggle.jsx'
import Icon from '../components/Icon.jsx'
import ToolIcon from '../components/ToolIcon.jsx'
import ReviewRibbon from '../components/ReviewRibbon.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import TaskIndex from './TaskIndex.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useDevice } from '../device/DeviceProvider.jsx'

// The guided step screen. One full-viewport step at a time: looping animation
// on one side, instructions on the other, progress header across the top. All
// navigation flows through <TapZones> (tap / swipe / keys / single-tap corner
// quit — one press leaves the task, there is no confirmation step), which
// applies the RTL mirror. See §4 of the brief.
// How long each step is shown before auto-play advances (adjustable).
const AUTOPLAY_MS = 10000

export default function StepView({
  task,
  onComplete,
  onQuit,
  autoplay = false,
  onToggleAutoplay,
  startAt = 0,
  onSwitchSection,
  indexOpen = false,
  onOpenIndex,
  onCloseIndex,
}) {
  const { t, tr, rtl } = useI18n()
  const { isPhone } = useDevice()
  const [index, setIndex] = useState(() =>
    Math.max(0, Math.min(task.steps.length - 1, startAt)),
  )
  const [dir, setDir] = useState(1) // 1 forward, -1 back (for the slide)
  const [animKey, setAnimKey] = useState(0) // bump to restart the animation
  const [paused, setPaused] = useState(false)
  const startedAt = useRef(Date.now())

  // The header reserves room for the floating control cluster so the
  // remaining-time label never lands underneath it. The cluster's width changes
  // with the feature set (index, auto-play, audio, section, device, language,
  // theme) and with the language, so measure it rather than guess a number.
  const controlsRef = useRef(null)
  const [reserve, setReserve] = useState(null)
  useEffect(() => {
    const el = controlsRef.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(([entry]) => {
      setReserve(Math.ceil(entry.contentRect.width) + 28)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const steps = task.steps
  const total = steps.length
  const step = steps[index]
  const isLast = index === total - 1
  const canBack = index > 0

  // Time math (source of truth = per-step estMin). `weights` is the same series
  // the progress bar scrubs against, so a drag lands on the step whose segment
  // the worker actually pointed at.
  const weights = useMemo(() => steps.map((st) => st.estMin || 0), [steps])
  const { totalMin, beforeMin } = useMemo(() => {
    const totalMin = steps.reduce((s, st) => s + (st.estMin || 0), 0)
    const beforeMin = steps
      .slice(0, index)
      .reduce((s, st) => s + (st.estMin || 0), 0)
    return { totalMin, beforeMin }
  }, [steps, index])
  const remainingMin = Math.max(0, totalMin - beforeMin)
  const fraction = totalMin ? beforeMin / totalMin : 0

  const goForward = () => {
    if (isLast) {
      onComplete?.({ elapsedMs: Date.now() - startedAt.current, totalMin })
      return
    }
    setDir(1)
    setIndex((i) => Math.min(total - 1, i + 1))
    setPaused(false)
    setAnimKey((k) => k + 1)
  }

  const goBack = () => {
    if (!canBack) return
    setDir(-1)
    setIndex((i) => Math.max(0, i - 1))
    setPaused(false)
    setAnimKey((k) => k + 1)
  }

  const replay = () => {
    setPaused(false)
    setAnimKey((k) => k + 1)
  }

  // Jump straight to a step — from the progress scrubber or the task index.
  const goTo = (next) => {
    const target = Math.max(0, Math.min(total - 1, next))
    if (target === index) {
      onCloseIndex?.()
      return
    }
    setDir(target > index ? 1 : -1)
    setIndex(target)
    setPaused(false)
    setAnimKey((k) => k + 1)
    onCloseIndex?.()
  }

  // Auto-play: advance one step every AUTOPLAY_MS. The timer restarts whenever
  // the step changes (index), the animation replays (animKey) or auto-play is
  // toggled, and it holds while the animation is center-tap paused. On the last
  // step, goForward() calls onComplete → App loops to the next task. A ref keeps
  // the timer from resetting on every render (goForward is a fresh closure).
  const goForwardRef = useRef(goForward)
  goForwardRef.current = goForward
  useEffect(() => {
    if (!autoplay || paused) return undefined
    const id = setTimeout(() => goForwardRef.current(), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [autoplay, paused, index, animKey])

  // Slide direction respects reading direction: forward enters from the
  // inline-end side (right in LTR, left in RTL).
  const sign = dir * (rtl ? -1 : 1)
  const enterX = sign * 64
  const exitX = -sign * 64

  const instructions = tr(step.instructions) || []
  const tools = step.tools ? tr(step.tools) || [] : []
  // <ToolIcon> classifies by English keyword, so feed it the English name while
  // the chip shows the translated one — otherwise every tool in Arabic, Urdu,
  // Hindi and French fell back to the same generic glyph. The per-language
  // arrays are index-aligned by construction.
  const toolsEn = step.tools?.en || tools
  const warning = step.warning ? tr(step.warning) : null

  return (
    <section
      className="screen step"
      aria-roledescription="work instruction step"
      style={reserve ? { '--step-controls-reserve': `${reserve}px` } : undefined}
    >
      {/* ---- Visual layer (below the tap surface; non-interactive) -------- */}
      <div className="step-visual">
        <div className="step-header">
          <ProgressBeacon
            current={index + 1}
            total={total}
            fraction={fraction}
            remaining={t('step.remaining', { n: remainingMin })}
            weights={weights}
            onSeek={goTo}
          />
        </div>

        <div className="step-body-wrap">
          <AnimatePresence initial={false} mode="popLayout" custom={sign}>
            <motion.div
              key={step.id}
              className="step-body"
              initial={{ x: enterX, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: exitX, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34, opacity: { duration: 0.16 } }}
            >
              {/* Animation column */}
              <div className="step-media-col">
                <MediaPlayer
                  key={animKey}
                  media={step.media}
                  paused={paused}
                />
              </div>

              {/* Instruction column */}
              <div className="step-instructions">
                <div className="step-instructions-head">
                  <span className="step-kicker mono">
                    {t('step.of', { current: index + 1, total })}
                  </span>
                  <h1 className="step-title display">{tr(step.title)}</h1>
                </div>

                <div className="step-chips">
                  <TimeChip tone="accent">
                    {t('step.estimated', { n: step.estMin })}
                  </TimeChip>
                  {task.ppe?.slice(0, 3).map((p) => (
                    <PPEBadge key={p} item={p} compact />
                  ))}
                </div>

                <ol className="step-list">
                  {instructions.map((line, i) => (
                    <li key={i} className="step-list-item">
                      <span className="step-list-num mono">{i + 1}</span>
                      <span className="step-list-text">{line}</span>
                    </li>
                  ))}
                </ol>

                {tools.length > 0 && (
                  <div className="step-tools">
                    <span className="step-tools-label mono">{t('step.tools')}</span>
                    <ul className="step-tools-list">
                      {tools.map((tool, i) => (
                        <li key={i} className="step-tool-chip mono">
                          <ToolIcon name={toolsEn[i] ?? tool} size={20} delay={(i % 6) * 0.25} />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {warning && <SafetyBanner text={warning} />}

                {task.placeholder && <ReviewRibbon inline />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---- Interaction surface (taps / swipe / keys / corner-quit) ------ */}
      {/* On a phone, taps are inert (explicit nav buttons drive it) — only
          swipe + keys stay live. On the kiosk, full gesture model. */}
      <TapZones
        rtl={rtl}
        canBack={canBack}
        isLast={isLast}
        tap={!isPhone}
        onForward={goForward}
        onBack={goBack}
        onReplay={replay}
        onQuit={() => onQuit?.()}
      />

      {/* ---- Floating controls (above the tap surface) ------------------- */}
      <div className="step-controls" ref={controlsRef} onPointerDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="ctl-btn"
          onClick={onOpenIndex}
          aria-label={t('a11y.openIndex')}
          title={t('index.open')}
        >
          <Icon name="list" size={22} />
        </button>
        {onToggleAutoplay && <AutoplayToggle on={autoplay} onToggle={onToggleAutoplay} />}
        <AudioButton lines={instructions} title={tr(step.title)} />
        {onSwitchSection && <SectionSwitcher section="wi" onSwitch={onSwitchSection} compact />}
        <DeviceToggle />
        <LangSwitcher compact />
        <ModeToggle />
      </div>

      {/* Mid-task index — jump to any stage or step without losing the run. */}
      <AnimatePresence>
        {indexOpen && (
          <motion.div
            className="index-modal"
            onPointerDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <TaskIndex task={task} current={index} onPick={goTo} onClose={onCloseIndex} overlay />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Phone-only bottom nav bar (explicit, above the tap surface) -- */}
      {isPhone && (
        <nav className="step-phone-nav" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="phone-nav-btn phone-nav-btn--ghost"
            onClick={() => onQuit?.()}
            aria-label={t('a11y.quitHint')}
          >
            <Icon name="x" size={24} />
          </button>
          <button
            type="button"
            className="phone-nav-btn phone-nav-btn--ghost"
            onClick={goBack}
            disabled={!canBack}
            aria-label={t('nav.previous')}
          >
            <Icon name={rtl ? 'chevron-right' : 'chevron-left'} size={26} />
          </button>
          <button
            type="button"
            className="phone-nav-btn phone-nav-btn--ghost"
            onClick={replay}
            aria-label={t('step.replay')}
          >
            <Icon name="replay" size={24} />
          </button>
          <button
            type="button"
            className="phone-nav-btn phone-nav-btn--primary"
            onClick={goForward}
            aria-label={isLast ? t('step.done') : t('nav.next')}
          >
            <span>{isLast ? t('step.done') : t('nav.next')}</span>
            <Icon name={isLast ? 'check' : rtl ? 'chevron-left' : 'chevron-right'} size={24} />
          </button>
        </nav>
      )}

    </section>
  )
}
