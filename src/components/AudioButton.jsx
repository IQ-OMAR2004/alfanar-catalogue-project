import Icon from './Icon.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useSpeech } from '../hooks/useSpeech.js'

// Per-step "read aloud" button — valuable for low-literacy workers. Uses the
// device speech engine now; the hook is a clean slot for recorded narration
// later. Hidden entirely when the device has no voice for the chosen language.
export default function AudioButton({ lines, title }) {
  const { lang, t } = useI18n()
  const { supported, speaking, speak, stop, availableFor } = useSpeech()

  if (!supported || !availableFor(lang)) return null

  const text = [title, ...(Array.isArray(lines) ? lines : [lines])]
    .filter(Boolean)
    .join('. ')

  return (
    <button
      type="button"
      className="audio-btn"
      data-on={speaking || undefined}
      onClick={() => (speaking ? stop() : speak(text, lang))}
      aria-label={speaking ? t('a11y.stopAudio') : t('a11y.playAudio')}
    >
      <Icon name={speaking ? 'stop' : 'play'} size={22} />
      {speaking && (
        <span className="audio-wave" aria-hidden="true">
          <i /><i /><i />
        </span>
      )}
    </button>
  )
}
