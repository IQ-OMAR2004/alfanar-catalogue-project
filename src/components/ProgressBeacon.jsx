import { useI18n } from '../i18n/I18nProvider.jsx'

// The step progress header. A slim bar whose fill ends in a glowing beacon dot
// — the alfanar lighthouse motif, kept subtle. Shows "Step X of Y" and the
// remaining estimated time. Presentational only; math lives in StepView.
//
//   current   1-based step number
//   total     step count
//   fraction  0..1 fill (time-weighted)
//   remaining "12 min left" string (already localized)
export default function ProgressBeacon({ current, total, fraction, remaining }) {
  const { t } = useI18n()
  const pct = Math.max(0, Math.min(1, fraction)) * 100

  return (
    <div className="progress-beacon">
      <div className="progress-beacon-row">
        <span className="progress-beacon-step mono">
          {t('step.of', { current, total })}
        </span>
        {remaining && (
          <span className="progress-beacon-remaining mono">{remaining}</span>
        )}
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={t('a11y.progress')}
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
