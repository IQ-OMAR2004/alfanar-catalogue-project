import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'

// Generic confirm modal (used for quit-with-confirm so an accidental corner
// double-tap can't drop a worker out of a task). Big, well-separated buttons;
// the safe/cancel action is emphasised and focused by default.
export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  tone = 'warn',
}) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (open) cancelRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onPointerDown={(e) => e.target === e.currentTarget && onCancel?.()}
        >
          <motion.div
            className="dialog"
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.92, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <span className={`dialog-icon dialog-icon--${tone}`}>
              <Icon name={tone === 'warn' ? 'warning' : 'shield'} size={36} />
            </span>
            <h2 className="dialog-title display">{title}</h2>
            {body && <p className="dialog-body">{body}</p>}
            <div className="dialog-actions">
              <button
                ref={cancelRef}
                type="button"
                className="btn btn--primary btn--lg"
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className="btn btn--ghost-danger btn--lg"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
