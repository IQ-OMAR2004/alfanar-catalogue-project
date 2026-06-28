import { motion } from 'framer-motion'
import TopBar from '../components/TopBar.jsx'
import Icon from '../components/Icon.jsx'
import Credit from '../components/Credit.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Completion screen: confirms the job is done and compares actual time to the
// estimate. Restart the same task or return to the task grid.
export default function Complete({ task, result, onRestart, onTasks }) {
  const { t, tr } = useI18n()

  const estMin = result?.totalMin ?? task?.estimatedTotalMin ?? 0
  const actualMin = Math.max(1, Math.round((result?.elapsedMs ?? 0) / 60000))
  const delta = actualMin - estMin
  const verdict =
    delta < 0
      ? t('complete.faster', { n: Math.abs(delta) })
      : delta > 0
        ? t('complete.slower', { n: delta })
        : t('complete.onTime')
  const verdictTone = delta <= 0 ? 'good' : 'over'

  return (
    <section className="screen complete">
      <TopBar />

      <motion.div
        className="complete-body"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="complete-mark"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
        >
          <span className="complete-mark-ring" />
          <Icon name="check" size={72} />
        </motion.span>

        <h1 className="complete-title display">{t('complete.title')}</h1>
        <p className="complete-task">{tr(task?.title)}</p>
        <p className="complete-sub">{t('complete.sub')}</p>

        <div className="complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-label mono">{t('complete.estimate')}</span>
            <span className="complete-stat-value display">
              {t('tasks.minutes', { n: estMin })}
            </span>
          </div>
          <div className="complete-stat complete-stat--accent">
            <span className="complete-stat-label mono">{t('complete.actual')}</span>
            <span className="complete-stat-value display">
              {t('tasks.minutes', { n: actualMin })}
            </span>
          </div>
        </div>

        <p className={`complete-verdict complete-verdict--${verdictTone} mono`}>
          {verdict}
        </p>

        <div className="complete-actions">
          <button type="button" className="btn btn--primary btn--xl" onClick={onRestart}>
            <Icon name="replay" size={26} />
            {t('complete.restart')}
          </button>
          <button type="button" className="btn btn--ghost btn--xl" onClick={onTasks}>
            <Icon name="chevron-left" size={26} className="btn-lead-icon" />
            {t('complete.tasks')}
          </button>
        </div>
      </motion.div>

      <Credit />
    </section>
  )
}
