import { useEffect, useState } from 'react'
import { useToast, type Toast as ToastData, type ToastType } from '../contexts/ToastContext'

const toastStyles: Record<ToastType, { bg: string; border: string; icon: string; iconBg: string }> = {
  success: {
    bg: 'bg-white',
    border: 'border-green-200',
    icon: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  error: {
    bg: 'bg-white',
    border: 'border-red-200',
    icon: 'text-red-600',
    iconBg: 'bg-red-100',
  },
  warning: {
    bg: 'bg-white',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  info: {
    bg: 'bg-white',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
}

const toastIcons: Record<ToastType, React.ReactElement> = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const styles = toastStyles[toast.type]

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(enterTimer)
  }, [])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(onDismiss, 200)
  }

  return (
    <div
      className={`
        ${styles.bg} ${styles.border}
        border rounded-lg shadow-lg p-4 max-w-sm w-full
        transform transition-all duration-200 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${styles.iconBg} ${styles.icon} flex items-center justify-center`}>
          {toastIcons[toast.type]}
        </div>

        {/* Content */}
        <div className="flex-1 pt-0.5">
          <p className="font-medium text-gray-900">{toast.title}</p>
          {toast.message && (
            <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
          )}
        </div>

        {/* Dismiss Button */}
        {toast.dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-3"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

// Standalone toast for use outside of context (if needed)
export function StandaloneToast({
  type,
  title,
  message,
  onDismiss,
  show,
}: {
  type: ToastType
  title: string
  message?: string
  onDismiss?: () => void
  show: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const styles = toastStyles[type]

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show])

  if (!show && !isVisible) return null

  return (
    <div
      className={`
        fixed top-4 right-4 z-[100]
        ${styles.bg} ${styles.border}
        border rounded-lg shadow-lg p-4 max-w-sm w-full
        transform transition-all duration-200 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${styles.iconBg} ${styles.icon} flex items-center justify-center`}>
          {toastIcons[type]}
        </div>
        <div className="flex-1 pt-0.5">
          <p className="font-medium text-gray-900">{title}</p>
          {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
