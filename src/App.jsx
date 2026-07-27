import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LanguageGate from './screens/LanguageGate.jsx'
import SectionGate from './screens/SectionGate.jsx'
import TaskGrid from './screens/TaskGrid.jsx'
import TaskIndex from './screens/TaskIndex.jsx'
import StepView from './screens/StepView.jsx'
import Complete from './screens/Complete.jsx'
import SafetyMap from './screens/SafetyMap.jsx'
import SafetyZone from './screens/SafetyZone.jsx'
import CoachOverlay from './components/CoachOverlay.jsx'
import { useI18n } from './i18n/I18nProvider.jsx'
import { useDevice } from './device/DeviceProvider.jsx'
import { getTask, tasks } from './content/index.js'
import { getZone } from './content/safety/zones.js'
import { useKioskGuards } from './hooks/useKioskGuards.js'
import { useWakeLock } from './hooks/useWakeLock.js'
import { useFullscreen } from './hooks/useFullscreen.js'
import { useIdleReset } from './hooks/useIdleReset.js'

const COACH_KEY = 'alfanar.coachSeen'
const IDLE_MS = 180000 // 3 min — kiosk auto-reset to task selection

// Lightweight screen state machine (no router needed). Two branches hang off
// the section gate: the work-instruction side (tasks → index → step → complete)
// and the safety side (zone map → zone). <SectionSwitcher> moves between them
// from anywhere.
export default function App() {
  const { chosen, rtl } = useI18n()
  const { isPhone } = useDevice()
  const [screen, setScreen] = useState(chosen ? 'section' : 'gate')
  const [taskId, setTaskId] = useState(null)
  const [zoneId, setZoneId] = useState(null)
  const [startAt, setStartAt] = useState(0) // step index the run begins on
  const [runId, setRunId] = useState(0) // bump to remount StepView (restart)
  const [result, setResult] = useState(null)
  const [autoplay, setAutoplay] = useState(false) // unattended step + task loop
  const [indexOpen, setIndexOpen] = useState(false) // mid-task index overlay
  const [coachOpen, setCoachOpen] = useState(false)
  const [coachSeen, setCoachSeen] = useState(() => {
    try {
      return localStorage.getItem(COACH_KEY) === '1'
    } catch {
      return false
    }
  })

  // Kiosk hardening — for the wall panel. On a personal phone we don't force
  // fullscreen, keep the screen awake, or auto-reset on idle.
  useKioskGuards(!isPhone)
  useWakeLock(!isPhone)
  const { enter } = useFullscreen()

  // Enter fullscreen on the very first interaction (kiosk only; browsers
  // require a gesture).
  useEffect(() => {
    if (isPhone) return
    const onFirst = () => {
      enter()
      window.removeEventListener('pointerdown', onFirst)
    }
    window.addEventListener('pointerdown', onFirst, { once: true })
    return () => window.removeEventListener('pointerdown', onFirst)
  }, [enter, isPhone])

  // Idle auto-reset only while guiding a task on the kiosk.
  const backToTasks = useCallback(() => {
    setScreen('tasks')
    setTaskId(null)
    setResult(null)
    setIndexOpen(false)
  }, [])
  // Auto-play is itself continuous activity, so the idle reset stands down.
  useIdleReset(backToTasks, { timeoutMs: IDLE_MS, enabled: !isPhone && screen === 'step' && !autoplay })

  const task = getTask(taskId)
  const zone = getZone(zoneId)

  // Picking a task opens its index first — the worker chooses where to start
  // instead of always being dropped on step 1.
  const openTask = (id) => {
    setTaskId(id)
    setResult(null)
    setScreen('index')
  }

  const beginAt = (index) => {
    setStartAt(index)
    setResult(null)
    setRunId((r) => r + 1)
    setScreen('step')
    setIndexOpen(false)
    // The coach card would freeze an unattended loop — skip it in auto-play.
    if (!coachSeen && !autoplay) setCoachOpen(true)
  }

  const startTask = (id) => {
    setTaskId(id)
    setStartAt(0)
    setResult(null)
    setRunId((r) => r + 1)
    setScreen('step')
    if (!coachSeen && !autoplay) setCoachOpen(true)
  }

  const restart = () => {
    setResult(null)
    setStartAt(0)
    setRunId((r) => r + 1)
    setScreen('step')
  }

  // Next task in grid order, wrapping back to the first (the loop).
  const nextTaskId = (id) => {
    const i = tasks.findIndex((t) => t.id === id)
    return tasks.length ? tasks[(i + 1) % tasks.length].id : null
  }

  const completeTask = (res) => {
    // In auto-play, roll straight into the next task and keep looping;
    // otherwise show the normal completion screen.
    if (autoplay) {
      const next = nextTaskId(taskId)
      if (next) {
        startTask(next)
        return
      }
    }
    setResult(res)
    setScreen('complete')
  }

  const toggleAutoplay = () => {
    setAutoplay((on) => {
      if (!on) setCoachOpen(false) // don't let the coach card block the loop
      return !on
    })
  }

  const dismissCoach = () => {
    setCoachOpen(false)
    setCoachSeen(true)
    try {
      localStorage.setItem(COACH_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  // Section switch from anywhere: leaves the current job and lands on the other
  // side's own entry screen.
  const switchSection = (next) => {
    setIndexOpen(false)
    setAutoplay(false)
    if (next === 'safety') {
      setScreen('safetyMap')
    } else {
      setZoneId(null)
      setScreen('tasks')
    }
  }

  const openZone = (id) => {
    setZoneId(id)
    setScreen('safetyZone')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === 'gate' && (
          <ScreenShell key="gate">
            <LanguageGate onSelect={() => setScreen('section')} />
          </ScreenShell>
        )}

        {screen === 'section' && (
          <ScreenShell key="section">
            <SectionGate
              onPick={(s) => setScreen(s === 'safety' ? 'safetyMap' : 'tasks')}
            />
          </ScreenShell>
        )}

        {screen === 'tasks' && (
          <ScreenShell key="tasks">
            <TaskGrid onStart={openTask} onSwitchSection={switchSection} />
          </ScreenShell>
        )}

        {screen === 'index' && task && (
          <ScreenShell key={`index-${taskId}`}>
            <TaskIndex task={task} onPick={beginAt} onBack={backToTasks} />
          </ScreenShell>
        )}

        {screen === 'step' && task && (
          <ScreenShell key={`step-${taskId}-${runId}`}>
            <StepView
              task={task}
              startAt={startAt}
              autoplay={autoplay}
              onToggleAutoplay={toggleAutoplay}
              onComplete={completeTask}
              onQuit={backToTasks}
              onSwitchSection={switchSection}
              indexOpen={indexOpen}
              onOpenIndex={() => setIndexOpen(true)}
              onCloseIndex={() => setIndexOpen(false)}
            />
            <CoachOverlay open={coachOpen} onDismiss={dismissCoach} rtl={rtl} />
          </ScreenShell>
        )}

        {screen === 'complete' && task && (
          <ScreenShell key="complete">
            <Complete
              task={task}
              result={result}
              onRestart={restart}
              onTasks={backToTasks}
            />
          </ScreenShell>
        )}

        {screen === 'safetyMap' && (
          <ScreenShell key="safetyMap">
            <SafetyMap onPick={openZone} onSwitchSection={switchSection} />
          </ScreenShell>
        )}

        {screen === 'safetyZone' && zone && (
          <ScreenShell key={`safetyZone-${zoneId}`}>
            <SafetyZone
              zone={zone}
              onBack={() => setScreen('safetyMap')}
              onPickZone={openZone}
              onSwitchSection={switchSection}
            />
          </ScreenShell>
        )}
      </AnimatePresence>
    </div>
  )
}

// Crossfade wrapper so screen swaps don't jump.
function ScreenShell({ children }) {
  return (
    <motion.div
      className="screen-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
