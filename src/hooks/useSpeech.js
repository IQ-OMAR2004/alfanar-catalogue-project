import { useCallback, useEffect, useRef, useState } from 'react'

// Map our locale codes to BCP-47 tags the speech engine understands.
const BCP47 = { en: 'en-US', ar: 'ar-SA', ur: 'ur-PK', hi: 'hi-IN' }

// Optional audio narration via the Web Speech API. This is a clean hook + slot
// — when real recorded narration is added later, swap the body of `speak` to
// play an <audio> source without changing callers. `availableFor(lang)` reports
// whether the device actually has a voice for that locale (varies by OS).
export function useSpeech() {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window
  const [voices, setVoices] = useState([])
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef(null)

  useEffect(() => {
    if (!supported) return
    const load = () => setVoices(window.speechSynthesis.getVoices())
    load()
    window.speechSynthesis.addEventListener?.('voiceschanged', load)
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load)
      window.speechSynthesis.cancel()
    }
  }, [supported])

  const voiceFor = useCallback(
    (lang) => {
      const tag = BCP47[lang] || lang
      const base = tag.split('-')[0]
      return (
        voices.find((v) => v.lang === tag) ||
        voices.find((v) => v.lang?.startsWith(base)) ||
        null
      )
    },
    [voices],
  )

  const availableFor = useCallback(
    (lang) => supported && (voices.length === 0 || !!voiceFor(lang)),
    [supported, voices.length, voiceFor],
  )

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text, lang) => {
      if (!supported || !text) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(
        Array.isArray(text) ? text.join('. ') : text,
      )
      u.lang = BCP47[lang] || lang
      const v = voiceFor(lang)
      if (v) u.voice = v
      u.rate = 0.95
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
      utterRef.current = u
      setSpeaking(true)
      window.speechSynthesis.speak(u)
    },
    [supported, voiceFor],
  )

  return { supported, speaking, speak, stop, availableFor }
}
