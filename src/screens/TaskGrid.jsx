import { motion } from 'framer-motion'
import TopBar from '../components/TopBar.jsx'
import Icon from '../components/Icon.jsx'
import PPEBadge from '../components/PPEBadge.jsx'
import ReviewRibbon from '../components/ReviewRibbon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { tasks, taskTotalMin } from '../content/index.js'

// Task selection: a grid of large, glanceable cards. Each shows icon, name,
// one-line summary, difficulty, step count, total time and required PPE.
export default function TaskGrid({ onStart }) {
  const { t, tr } = useI18n()

  return (
    <section className="screen tasks">
      <TopBar />

      <div className="tasks-head">
        <div>
          <h1 className="tasks-heading display">{t('tasks.heading')}</h1>
          <p className="tasks-sub">{t('tasks.sub')}</p>
        </div>
        <ReviewRibbon />
      </div>

      <ul className="tasks-grid">
        {tasks.map((task, i) => {
          const total = task.estimatedTotalMin || taskTotalMin(task)
          return (
            <motion.li
              key={task.id}
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.07 * i + 0.05, type: 'spring', stiffness: 240, damping: 24 }}
            >
              <button type="button" className="task-card" onClick={() => onStart(task.id)}>
                <span className="task-card-top">
                  <span className="task-card-icon">
                    <Icon name={task.icon} size={46} />
                  </span>
                  <span className={`task-diff task-diff--${task.difficulty} mono`}>
                    {t(`difficulty.${task.difficulty}`)}
                  </span>
                </span>

                <span className="task-card-body">
                  <span className="task-card-title display">{tr(task.title)}</span>
                  <span className="task-card-summary">{tr(task.summary)}</span>
                </span>

                <span className="task-card-meta">
                  <span className="task-meta-item mono">
                    <span className="task-meta-dot" aria-hidden="true" />
                    {t('tasks.steps', { n: task.steps.length })}
                  </span>
                  <span className="task-meta-item mono">
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false" className="task-meta-clock">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t('tasks.minutes', { n: total })}
                  </span>
                </span>

                {task.ppe?.length > 0 && (
                  <span className="task-card-ppe">
                    {task.ppe.map((p) => (
                      <PPEBadge key={p} item={p} compact />
                    ))}
                  </span>
                )}

                <span className="task-card-go" aria-hidden="true">
                  <Icon name="chevron-right" size={26} />
                </span>
              </button>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
