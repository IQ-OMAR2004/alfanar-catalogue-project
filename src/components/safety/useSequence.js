import { useEffect, useRef, useState } from 'react'

// Drives a looping "one item at a time" walkthrough shared by both safety
// animation styles. Returns the active index plus the controls the screen
// exposes, so the two views stay in step with each other behaviourally even
// though they look nothing alike.
//
//   count     number of items in the sequence
//   stepMs    dwell per item
//   holdMs    extra pause on the last item before looping
//   reduced   when true, no timer runs — the sequence sits on the last item so
//             a reduced-motion viewer sees the complete answer immediately
export function useSequence(count, { stepMs = 1500, holdMs = 2400, reduced = false } = {}) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [run, setRun] = useState(0) // bump to replay from the start
  const last = count - 1
  const timer = useRef(null)

  useEffect(() => {
    setI(reduced ? last : 0)
  }, [count, run, reduced, last])

  useEffect(() => {
    if (reduced || paused || count < 1) return undefined
    const delay = i === last ? holdMs : stepMs
    timer.current = setTimeout(() => setI((p) => (p >= last ? 0 : p + 1)), delay)
    return () => clearTimeout(timer.current)
  }, [i, last, count, paused, reduced, stepMs, holdMs])

  return {
    index: Math.min(i, Math.max(0, last)),
    paused,
    atEnd: i >= last,
    replay: () => {
      setPaused(false)
      setRun((r) => r + 1)
    },
    togglePause: () => setPaused((p) => !p),
    goTo: (n) => {
      setI(Math.max(0, Math.min(last, n)))
      setPaused(true)
    },
  }
}
