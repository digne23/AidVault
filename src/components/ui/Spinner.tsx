interface SpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Color theme of the spinner */
  color?: 'primary' | 'secondary' | 'white' | 'emerald' | 'gray'
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  label?: string
}

const sizeClasses = {
  xs: 'w-3 h-3 border-[2px]',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
}

const colorClasses = {
  primary: 'border-blue-600 border-t-transparent',
  secondary: 'border-indigo-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  emerald: 'border-emerald-600 border-t-transparent',
  gray: 'border-gray-400 border-t-transparent',
}

export default function Spinner({
  size = 'md',
  color = 'primary',
  className = '',
  label = 'Loading',
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-block ${className}`}
    >
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          rounded-full
          animate-spin
        `}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Compound component for full-page loading state
interface SpinnerOverlayProps {
  /** Whether the overlay is visible */
  visible?: boolean
  /** Size of the spinner */
  size?: SpinnerProps['size']
  /** Color theme of the spinner */
  color?: SpinnerProps['color']
  /** Loading message to display */
  message?: string
  /** Whether to blur the background */
  blur?: boolean
}

export function SpinnerOverlay({
  visible = true,
  size = 'lg',
  color = 'primary',
  message,
  blur = false,
}: SpinnerOverlayProps) {
  if (!visible) return null

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-white/80 dark:bg-gray-900/80
        ${blur ? 'backdrop-blur-sm' : ''}
      `}
      role="dialog"
      aria-modal="true"
      aria-label={message || 'Loading'}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size={size} color={color} label={message || 'Loading'} />
        {message && (
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

// Inline loading component for buttons and inline contexts
interface SpinnerInlineProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md'
  /** Color theme of the spinner */
  color?: SpinnerProps['color']
  /** Text to display next to the spinner */
  text?: string
  /** Position of text relative to spinner */
  textPosition?: 'left' | 'right'
  /** Additional CSS classes */
  className?: string
}

export function SpinnerInline({
  size = 'sm',
  color = 'primary',
  text,
  textPosition = 'right',
  className = '',
}: SpinnerInlineProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      role="status"
    >
      {text && textPosition === 'left' && (
        <span className="text-current">{text}</span>
      )}
      <Spinner size={size} color={color} label={text || 'Loading'} />
      {text && textPosition === 'right' && (
        <span className="text-current">{text}</span>
      )}
    </span>
  )
}
