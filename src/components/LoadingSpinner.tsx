interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Color variant */
  color?: 'emerald' | 'white' | 'gray' | 'current'
  /** Additional CSS classes */
  className?: string
  /** Screen reader label */
  label?: string
}

const sizeClasses = {
  xs: 'w-3 h-3 border-2',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
}

const colorClasses = {
  emerald: {
    track: 'border-emerald-200',
    spinner: 'border-emerald-600',
  },
  white: {
    track: 'border-white/30',
    spinner: 'border-white',
  },
  gray: {
    track: 'border-gray-200',
    spinner: 'border-gray-600',
  },
  current: {
    track: 'border-current/20',
    spinner: 'border-current',
  },
}

export default function LoadingSpinner({
  size = 'md',
  color = 'emerald',
  className = '',
  label = 'Loading',
}: LoadingSpinnerProps) {
  const colors = colorClasses[color]

  return (
    <div
      className={`relative inline-block ${className}`}
      role="status"
      aria-label={label}
    >
      <div className={`${sizeClasses[size]} ${colors.track} rounded-full`}></div>
      <div
        className={`absolute top-0 left-0 ${sizeClasses[size]} ${colors.spinner} rounded-full border-t-transparent animate-spin`}
      ></div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Button spinner - for use inside buttons
export function ButtonSpinner({ className = '' }: { className?: string }) {
  return (
    <LoadingSpinner size="sm" color="current" className={className} />
  )
}

// Full width loading bar
export function LoadingBar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-1 bg-gray-200 overflow-hidden ${className}`}>
      <div className="h-full bg-emerald-600 animate-loading-bar"></div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 50%; }
          100% { transform: translateX(400%); width: 30%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Dots loading animation
export function LoadingDots({
  size = 'md',
  color = 'emerald',
}: {
  size?: 'sm' | 'md' | 'lg'
  color?: 'emerald' | 'gray' | 'white'
}) {
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  }

  const dotColors = {
    emerald: 'bg-emerald-600',
    gray: 'bg-gray-400',
    white: 'bg-white',
  }

  return (
    <span className="inline-flex items-center gap-1" role="status" aria-label="Loading">
      <span
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      ></span>
      <span
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      ></span>
      <span
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      ></span>
      <span className="sr-only">Loading</span>
    </span>
  )
}

// Pulse loading for text placeholders
export function LoadingPulse({
  width = 'w-24',
  height = 'h-4',
  className = '',
}: {
  width?: string
  height?: string
  className?: string
}) {
  return (
    <div
      className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading</span>
    </div>
  )
}
