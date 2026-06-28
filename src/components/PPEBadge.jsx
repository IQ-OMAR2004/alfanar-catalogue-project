import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// A required-PPE pill: icon + localized label. `compact` drops the label (used
// on dense task cards).
export default function PPEBadge({ item, compact = false }) {
  const { t } = useI18n()
  const label = t(`ppe.${item}`)
  return (
    <span className="ppe-badge" title={label}>
      <Icon name={item} size={compact ? 22 : 24} />
      {!compact && <span className="ppe-badge-label">{label}</span>}
    </span>
  )
}
