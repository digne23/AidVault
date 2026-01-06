interface LoadingScreenProps {
  /** Custom message to display */
  message?: string
  /** Show the logo */
  showLogo?: boolean
  /** Background style */
  variant?: 'default' | 'transparent' | 'overlay'
}

export default function LoadingScreen({
  message = 'Loading...',
  showLogo = true,
  variant = 'default',
}: LoadingScreenProps) {
  const bgClasses = {
    default: 'bg-white',
    transparent: 'bg-transparent',
    overlay: 'bg-white/80 backdrop-blur-sm',
  }

  return (
    <div className={`fixed inset-0 ${bgClasses[variant]} flex flex-col items-center justify-center z-50`}>
      {showLogo && (
        <div className="mb-8">
          {/* AidVault Logo */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 text-center">AidVault</h1>
        </div>
      )}

      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-emerald-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      {/* Loading Message */}
      <div className="mt-6 flex items-center gap-1">
        <span className="text-gray-600 font-medium">{message}</span>
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </span>
      </div>
    </div>
  )
}

// Mini loading screen for sections
export function SectionLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-10 h-10 border-4 border-emerald-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-10 h-10 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500 text-sm">{message}</p>
    </div>
  )
}
