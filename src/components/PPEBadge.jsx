import Icon from './Icon.jsx'
import PPEArt, { hasPPEArt } from './PPEArt.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

// A required-PPE pill: illustration + localized label. `compact` drops the
// label (used on dense task cards).
//
// Prefers the full-colour <PPEArt> illustration so the item reads as the real
// piece of kit rather than a generic outline, and falls back to the line glyph
// for anything the art set does not cover.
export default function PPEBadge({ item, compact = false }) {
  const { t } = useI18n()
  const label = t(`ppe.${item}`)
  const size = compact ? 24 : 26
  return (
    <span className="ppe-badge" title={label}>
      {hasPPEArt(item) ? <PPEArt name={item} size={size} /> : <Icon name={item} size={size} />}
      {!compact && <span className="ppe-badge-label">{label}</span>}
    </span>
  )
}
