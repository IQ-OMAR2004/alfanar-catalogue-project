import { motion } from 'framer-motion'
import TopBar from '../components/TopBar.jsx'
import Icon from '../components/Icon.jsx'
import PPEBadge from '../components/PPEBadge.jsx'
import ReviewRibbon from '../components/ReviewRibbon.jsx'
import SectionSwitcher from '../components/SectionSwitcher.jsx'
import Credit from '../components/Credit.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { FOLDERS, folderTasks, taskTotalMin } from '../content/index.js'

// Task selection, in two levels. With no folder chosen it shows the three
// folders; inside a folder it shows that folder's tasks. Grouping also gives
// unattended auto-play its boundary — see nextTaskInFolder in content/index.js.
export default function TaskGrid({ folderId, onPickFolder, onBackToFolders, onStart, onSwitchSection }) {
  const { t, tr } = useI18n()
  const folder = FOLDERS.find((f) => f.id === folderId) || null

  if (!folder) {
    return (
      <section className="screen tasks">
        <TopBar>
          {onSwitchSection && <SectionSwitcher section="wi" onSwitch={onSwitchSection} />}
        </TopBar>

        <div className="tasks-head">
          <div>
            <h1 className="tasks-heading display">{t('folders.heading')}</h1>
            <p className="tasks-sub">{t('folders.sub')}</p>
          </div>
          <ReviewRibbon />
        </div>

        <ul className="folders-grid">
          {FOLDERS.map((f, i) => {
            const list = folderTasks(f.id)
            const mins = list.reduce((s2, tk) => s2 + (tk.estimatedTotalMin || taskTotalMin(tk)), 0)
            return (
              <motion.li
                key={f.id}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.07 * i + 0.05, type: 'spring', stiffness: 240, damping: 24 }}
              >
                <button
                  type="button"
                  className="folder-card"
                  style={{ '--folder': f.color }}
                  onClick={() => onPickFolder(f.id)}
                >
                  <span className="folder-card-icon">
                    <Icon name={f.icon} size={46} />
                  </span>
                  <span className="folder-card-body">
                    <span className="folder-card-title display">{tr(f.title)}</span>
                    <span className="folder-card-sub">{tr(f.sub)}</span>
                  </span>
                  <span className="folder-card-meta mono">
                    {t('folders.tasks', { n: list.length })} · {t('tasks.minutes', { n: mins })}
                  </span>
                  <span className="folder-card-go" aria-hidden="true">
                    <Icon name="chevron-right" size={24} />
                  </span>
                </button>
              </motion.li>
            )
          })}
        </ul>

        <Credit />
      </section>
    )
  }

  const list = folderTasks(folder.id)

  return (
    <section className="screen tasks" style={{ '--folder': folder.color }}>
      <TopBar>
        {onSwitchSection && <SectionSwitcher section="wi" onSwitch={onSwitchSection} />}
      </TopBar>

      <div className="tasks-head">
        <div className="tasks-head-text">
          <button type="button" className="folder-back" onClick={onBackToFolders}>
            <Icon name="chevron-left" size={18} />
            <span>{t('folders.back')}</span>
          </button>
          <h1 className="tasks-heading display">{tr(folder.title)}</h1>
          <p className="tasks-sub">{tr(folder.sub)}</p>
        </div>
        <ReviewRibbon />
      </div>

      <ul className="tasks-grid">
        {list.map((task, i) => {
          const total = task.estimatedTotalMin || taskTotalMin(task)
          return (
            <motion.li
              key={task.id}
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.07 * i + 0.05, type: 'spring', stiffness: 240, damping: 24 }}
            >
              <button type="button" className="task-card" onClick={() => onStart(task.id)}>
                {/* Direct children of the card grid: a wrapper here would have
                    swallowed both grid-areas and stacked the icon on top of the
                    difficulty tag in one corner. */}
                <span className="task-card-icon">
                  <Icon name={task.icon} size={46} />
                </span>
                <span className={`task-diff task-diff--${task.difficulty} mono`}>
                  {t(`difficulty.${task.difficulty}`)}
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

      <Credit />
    </section>
  )
}
