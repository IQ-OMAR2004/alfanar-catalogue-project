// Mono uppercase micro-label chip — the brand's "engineering tell". Used for
// per-step estimates and totals. `tone`: 'accent' | 'plain' | 'ghost'.
export default function TimeChip({ children, tone = 'plain' }) {
  return (
    <span className={`time-chip time-chip--${tone} mono`}>
      <svg viewBox="0 0 24 24" width="15" height="15" className="time-chip-ic" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </span>
  )
}
