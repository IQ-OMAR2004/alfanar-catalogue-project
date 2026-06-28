import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ui from '../content/ui.json'
import { DEFAULT_LOCALE, LOCALE_CODES, getLocale } from './locales.js'

const STORAGE_KEY = 'alfanar.lang'
const I18nContext = createContext(null)

function readStoredLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v && LOCALE_CODES.includes(v)) return v
  } catch {
    /* private mode / disabled storage */
  }
  return null
}

// Resolve "a.b.c" against the ui dictionary for one locale.
function lookup(dict, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
}

// Interpolate {placeholders} from a vars object.
function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (m, k) =>
    vars[k] != null ? String(vars[k]) : m,
  )
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => readStoredLang() || DEFAULT_LOCALE)
  // Whether the worker has explicitly chosen a language yet (gates the picker).
  const [chosen, setChosen] = useState(() => readStoredLang() != null)

  const locale = getLocale(lang)

  // Reflect locale onto <html> (lang + dir) so logical CSS + fonts switch
  // globally with zero layout shift inside components.
  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = locale.dir
    el.style.setProperty('--font-locale', locale.font)
  }, [lang, locale.dir, locale.font])

  const setLang = useCallback((next) => {
    if (!LOCALE_CODES.includes(next)) return
    setLangState(next)
    setChosen(true)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  // UI-chrome translator. Fallback chain: requested -> English -> key.
  const t = useCallback(
    (key, vars) => {
      let val = lookup(ui[lang], key)
      if (val == null) val = lookup(ui[DEFAULT_LOCALE], key)
      if (val == null) return key // never blank
      return interpolate(val, vars)
    },
    [lang],
  )

  // Content-field translator for {en,ar,ur,hi} objects (titles, instructions,
  // warnings). Fallback chain: requested -> English -> first available.
  const tr = useCallback(
    (field) => {
      if (field == null) return ''
      if (typeof field === 'string') return field
      if (field[lang] != null) return field[lang]
      if (field[DEFAULT_LOCALE] != null) return field[DEFAULT_LOCALE]
      const first = Object.values(field).find((v) => v != null)
      return first ?? ''
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, locale, dir: locale.dir, rtl: locale.dir === 'rtl', chosen, setLang, t, tr }),
    [lang, locale, chosen, setLang, t, tr],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
