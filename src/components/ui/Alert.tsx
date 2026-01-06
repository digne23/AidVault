import { useState, useEffect } from 'react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertProps {
  /** Type of alert which determines styling and icon */
  type?: AlertType
  /** Title of the alert (optional) */
  title?: string
  /** Main content/message of the alert */
  children: React.ReactNode
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  /** Callback when alert is dismissed */
  onDismiss?: () => void
  /** Auto-dismiss after specified milliseconds (0 = no auto-dismiss) */
  autoDismiss?: number
  /** Additional CSS classes */
  className?: string
  /** Whether to show the icon */
  showIcon?: boolean
}

const typeStyles = {
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    icon: 'text-emerald-500',
    title: 'text-emerald-800',
    dismissButton: 'text-emerald-500 hover:bg-emerald-100 focus:ring-emerald-400',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-500',
    title: 'text-red-800',
    dismissButton: 'text-red-500 hover:bg-red-100 focus:ring-red-400',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: 'text-amber-500',
    title: 'text-amber-800',
    dismissButton: 'text-amber-500 hover:bg-amber-100 focus:ring-amber-400',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    dismissButton: 'text-blue-500 hover:bg-blue-100 focus:ring-blue-400',
  },
}

const icons = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

export default function Alert({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  autoDismiss = 0,
  className = '',
  showIcon = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const styles = typeStyles[type]
  const icon = icons[type]

  useEffect(() => {
    if (autoDismiss > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoDismiss)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, 200)
  }

  if (!isVisible) return null

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`
        ${styles.container}
        border rounded-xl p-4
        transition-all duration-200
        ${isExiting ? 'opacity-0 translate-y-[-10px]' : 'opacity-100 translate-y-0'}
        ${className}
      `}
    >
      <div className="flex gap-3">
        {/* Icon */}
        {showIcon && (
          <div className={`flex-shrink-0 ${styles.icon}`} aria-hidden="true">
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`font-semibold mb-1 ${styles.title}`}>{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={`
              flex-shrink-0 p-1 rounded-lg
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
              ${styles.dismissButton}
            `}
            aria-label="Dismiss alert"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Alert with action buttons
interface AlertWithActionsProps extends Omit<AlertProps, 'dismissible' | 'onDismiss'> {
  /** Primary action button */
  primaryAction?: {
    label: string
    onClick: () => void
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function AlertWithActions({
  type = 'info',
  title,
  children,
  primaryAction,
  secondaryAction,
  className = '',
  showIcon = true,
}: AlertWithActionsProps) {
  const styles = typeStyles[type]
  const icon = icons[type]

  const buttonStyles = {
    success: {
      primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      secondary: 'text-emerald-700 hover:bg-emerald-100',
    },
    error: {
      primary: 'bg-red-600 hover:bg-red-700 text-white',
      secondary: 'text-red-700 hover:bg-red-100',
    },
    warning: {
      primary: 'bg-amber-600 hover:bg-amber-700 text-white',
      secondary: 'text-amber-700 hover:bg-amber-100',
    },
    info: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'text-blue-700 hover:bg-blue-100',
    },
  }

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`${styles.container} border rounded-xl p-4 ${className}`}
    >
      <div className="flex gap-3">
        {showIcon && (
          <div className={`flex-shrink-0 ${styles.icon}`} aria-hidden="true">
            {icon}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold mb-1 ${styles.title}`}>{title}</h3>
          )}
          <div className="text-sm mb-3">{children}</div>

          {(primaryAction || secondaryAction) && (
            <div className="flex gap-2">
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-lg
                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${buttonStyles[type].primary}
                  `}
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-lg
                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${buttonStyles[type].secondary}
                  `}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Toast-style alert for notifications
interface ToastAlertProps {
  /** Type of alert */
  type?: AlertType
  /** Message to display */
  message: string
  /** Whether the toast is visible */
  visible: boolean
  /** Callback when toast should be hidden */
  onClose: () => void
  /** Auto-hide after specified milliseconds (0 = no auto-hide) */
  duration?: number
  /** Position of the toast */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

export function ToastAlert({
  type = 'info',
  message,
  visible,
  onClose,
  duration = 5000,
  position = 'top-right',
}: ToastAlertProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onClose, 200)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  useEffect(() => {
    if (!visible) {
      setIsExiting(false)
    }
  }, [visible])

  if (!visible) return null

  const styles = typeStyles[type]
  const icon = icons[type]

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`
        fixed z-50 ${positionClasses[position]}
        ${styles.container}
        border rounded-xl p-4 shadow-lg
        min-w-[300px] max-w-md
        transition-all duration-200
        ${isExiting ? 'opacity-0 translate-y-[-10px]' : 'opacity-100 translate-y-0'}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 ${styles.icon}`} aria-hidden="true">
          {icon}
        </div>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={() => {
            setIsExiting(true)
            setTimeout(onClose, 200)
          }}
          className={`
            flex-shrink-0 p-1 rounded-lg
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
            ${styles.dismissButton}
          `}
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
