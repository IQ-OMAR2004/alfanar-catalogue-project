// Official alfanar logo lockup (globe + الفنار / alfanar), exactly as used in the
// brand book: the blue logo on light surfaces, the white logo reversed on dark.
// Both files ship locally (public/brand) so the kiosk renders the real mark
// fully offline. The blue/white swap is pure CSS off html[data-theme].
import { asset } from '../utils/asset.js'

export default function Logo({ height = 38, className = '' }) {
  return (
    <span
      className={`brand-logo ${className}`.trim()}
      style={{ height }}
      role="img"
      aria-label="alfanar"
    >
      <img
        src={asset('/brand/logo-blue.svg')}
        alt="alfanar"
        className="brand-logo-img brand-logo-img--light"
        draggable="false"
      />
      <img
        src={asset('/brand/logo-white.svg')}
        alt="alfanar"
        className="brand-logo-img brand-logo-img--dark"
        draggable="false"
      />
    </span>
  )
}
