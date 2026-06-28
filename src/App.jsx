import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LanguageGate from './screens/LanguageGate.jsx'
import TaskGrid from './screens/TaskGrid.jsx'
import StepView from './screens/StepView.jsx'
import Complete from './screens/Complete.jsx'
import CoachOverlay from './components/CoachOverlay.jsx'
import { useI18n } from './i18n/I18nProvider.jsx'
import { useDevice } from './device/DeviceProvider.jsx'
import { getTask } from './content/index.js'
import { useKioskGuards } from './hooks/useKioskGuards.js'
import { useWakeLock } from './hooks/useWakeLock.js'
import { useFullscreen } from './hooks/useFullscreen.js'
import { useIdleReset } from './hooks/useIdleReset.js'

const COACH_KEY = 'alfanar.coachSeen'
const IDLE_MS = 180000 // 3 min — kiosk auto-reset to task selection

// Lightweight screen state machine (no router needed for four screens).
export default function App() {
  const { chosen, rtl } = useI18n()
  const { isPhone } = useDevice()
  const [screen, setScreen] = useState(chosen ? 'tasks' : 'gate')
  const [taskId, setTaskId] = useState(null)
  const [runId, setRunId] = useState(0) // bump to remount StepView (restart)
  const [result, setResult] = useState(null)
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
  }, [])
  useIdleReset(backToTasks, { timeoutMs: IDLE_MS, enabled: !isPhone && screen === 'step' })

  const task = getTask(taskId)

  const startTask = (id) => {
    setTaskId(id)
    setResult(null)
    setRunId((r) => r + 1)
    setScreen('step')
    if (!coachSeen) setCoachOpen(true)
  }

  const restart = () => {
    setResult(null)
    setRunId((r) => r + 1)
    setScreen('step')
  }

  const completeTask = (res) => {
    setResult(res)
    setScreen('complete')
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

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === 'gate' && (
          <ScreenShell key="gate">
            <LanguageGate onSelect={() => setScreen('tasks')} />
          </ScreenShell>
        )}

        {screen === 'tasks' && (
          <ScreenShell key="tasks">
            <TaskGrid onStart={startTask} />
          </ScreenShell>
        )}

        {screen === 'step' && task && (
          <ScreenShell key={`step-${taskId}-${runId}`}>
            <StepView task={task} onComplete={completeTask} onQuit={backToTasks} />
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
