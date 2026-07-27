import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// The task index — every stage of a job and every step inside it, on one
// screen. Shown once after a task is picked (choose where to start) and again
// as an overlay from the step screen (jump somewhere else mid-task), which is
// the same component in a modal: `overlay` swaps the chrome, nothing else.
//
//   task       the task object (uses task.sections when present)
//   current    0-based index of the step being guided, or null on the start screen
//   onPick     (index0) => void
//   onClose    overlay only — dismiss without moving
//   onBack     start screen only — back to the task list
export default function TaskIndex({ task, current = null, onPick, onClose, onBack, overlay = false }) {
  const { t, tr } = useI18n()
  const steps = task.steps

  // Group steps by the task's declared stages; a task with no `sections` gets a
  // single implicit group so the screen still works.
  const groups = useMemo(() => {
    const secs = task.sections
    if (!secs?.length) {
      return [{ id: 'all', title: null, steps: steps.map((s, i) => ({ s, i })) }]
    }
    return secs.map((sec) => ({
      id: sec.id,
      title: sec.title,
      steps: steps
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.id >= sec.from && s.id <= sec.to),
    }))
  }, [task, steps])

  const minutesOf = (list) => list.reduce((sum, { s }) => sum + (s.estMin || 0), 0)

  return (
    <section className={`screen index${overlay ? ' index--overlay' : ''}`}>
      <header className="index-head">
        <div className="index-head-text">
          <span className="index-kicker mono">{tr(task.title)}</span>
          <h1 className="index-heading display">
            {overlay ? t('index.title') : t('index.heading')}
          </h1>
          {!overlay && <p className="index-sub">{t('index.sub')}</p>}
        </div>

        <div className="index-head-actions">
          {!overlay && (
            <button type="button" className="btn btn--primary index-start" onClick={() => onPick(0)}>
              <Icon name="play" size={20} />
              <span>{t('index.start')}</span>
            </button>
          )}
          {overlay && (
            <button type="button" className="ctl-btn" onClick={onClose} aria-label={t('index.close')}>
              <Icon name="x" size={24} />
            </button>
          )}
          {!overlay && onBack && (
            <button type="button" className="ctl-btn" onClick={onBack} aria-label={t('nav.previous')}>
              <Icon name="x" size={24} />
            </button>
          )}
        </div>
      </header>

      <div className="index-scroll">
        <ol className="index-groups">
          {groups.map((g, gi) => {
            const first = g.steps[0]
            const holdsCurrent =
              current != null && g.steps.some(({ i }) => i === current)
            return (
              <motion.li
                key={g.id}
                className="index-group"
                data-active={holdsCurrent || undefined}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: Math.min(gi * 0.05, 0.3), duration: 0.28 }}
              >
                <button
                  type="button"
                  className="index-group-head"
                  onClick={() => first && onPick(first.i)}
                >
                  <span className="index-group-no mono">{gi + 1}</span>
                  <span className="index-group-text">
                    <span className="index-group-title display">
                      {g.title ? tr(g.title) : t('index.allSteps')}
                    </span>
                    <span className="index-group-meta mono">
                      {t('tasks.steps', { n: g.steps.length })} · {t('tasks.minutes', { n: minutesOf(g.steps) })}
                    </span>
                  </span>
                  <span className="index-group-go" aria-hidden="true">
                    <Icon name="chevron-right" size={22} />
                  </span>
                </button>

                <ul className="index-steps">
                  {g.steps.map(({ s, i }) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        className="index-step"
                        data-current={i === current || undefined}
                        data-done={current != null && i < current ? true : undefined}
                        onClick={() => onPick(i)}
                        aria-label={`${t('step.of', { current: i + 1, total: steps.length })} — ${tr(s.title)}`}
                      >
                        <span className="index-step-no mono">{i + 1}</span>
                        <span className="index-step-title">{tr(s.title)}</span>
                        {i === current && (
                          <span className="index-step-here mono">{t('index.current')}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
