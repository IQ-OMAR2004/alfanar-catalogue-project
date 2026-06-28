import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Honest provenance: marks the demo procedures as placeholder content awaiting
// subject-matter-expert review, so they're never mistaken for verified work
// instructions. `inline` is the compact variant for the step screen.
export default function ReviewRibbon({ inline = false }) {
  const { t } = useI18n()
  return (
    <span className={`review-ribbon mono${inline ? ' review-ribbon--inline' : ''}`}>
      <Icon name="shield" size={14} />
      {t('common.placeholder')}
    </span>
  )
}
