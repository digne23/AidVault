import type { ReactNode } from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export default function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <>
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
        style={style}
        aria-hidden="true"
      />
      {animation === 'wave' && (
        <style>{`
          @keyframes skeleton-wave {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          .skeleton-wave {
            background: linear-gradient(90deg, #e5e7eb 0px, #f3f4f6 40px, #e5e7eb 80px);
            background-size: 200px 100%;
            animation: skeleton-wave 1.6s ease-in-out infinite;
          }
        `}</style>
      )}
    </>
  )
}

// Pre-built skeleton patterns
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }
  return <Skeleton variant="circular" className={sizeClasses[size]} />
}

export function SkeletonButton({ className = '' }: { className?: string }) {
  return <Skeleton variant="rounded" className={`h-10 w-24 ${className}`} />
}

// Card skeleton
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-4 w-1/3" />
          <Skeleton variant="text" className="h-6 w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" className="h-4 w-full mb-2" />
      <Skeleton variant="text" className="h-4 w-2/3" />
    </div>
  )
}

// Stats card skeleton
export function SkeletonStatsCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center">
        <Skeleton variant="rounded" className="w-12 h-12 mr-4" />
        <div className="flex-1">
          <Skeleton variant="text" className="h-3 w-20 mb-2" />
          <Skeleton variant="text" className="h-6 w-28" />
        </div>
      </div>
    </div>
  )
}

// Transaction row skeleton
export function SkeletonTransactionRow({ className = '' }: { className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1">
          <Skeleton variant="text" className="h-4 w-24 mb-1" />
          <Skeleton variant="text" className="h-3 w-32" />
        </div>
        <div className="text-right">
          <Skeleton variant="text" className="h-5 w-20 mb-1" />
          <Skeleton variant="text" className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

// Chart skeleton
export function SkeletonChart({ height = 300, className = '' }: { height?: number; className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <Skeleton variant="text" className="h-5 w-32 mb-4" />
      <Skeleton variant="rounded" className="w-full" height={height} />
    </div>
  )
}

// Table skeleton
export function SkeletonTable({ rows = 5, columns = 4, className = '' }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="grid gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4 w-20" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} variant="text" className={`h-4 ${j === 0 ? 'w-32' : 'w-20'}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Page skeleton wrapper
export function SkeletonPage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`animate-pulse ${className}`} aria-busy="true" aria-label="Loading content">
      {children}
    </div>
  )
}

// Vault page skeleton
export function VaultPageSkeleton() {
  return (
    <SkeletonPage className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Skeleton variant="text" className="h-8 w-48 mb-2" />
          <Skeleton variant="text" className="h-4 w-64" />
        </div>

        {/* Main balance card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Skeleton variant="text" className="h-4 w-32 mb-3" />
              <Skeleton variant="text" className="h-12 w-48 mb-2" />
              <Skeleton variant="text" className="h-4 w-64" />
            </div>
            <div className="flex gap-3">
              <Skeleton variant="rounded" className="h-12 w-32" />
              <Skeleton variant="rounded" className="h-12 w-32" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-8">
            <Skeleton variant="rounded" className="h-3 w-full mb-2" />
            <div className="flex justify-between">
              <Skeleton variant="text" className="h-3 w-24" />
              <Skeleton variant="text" className="h-3 w-32" />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </div>

        {/* Recent transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <Skeleton variant="text" className="h-5 w-40" />
          </div>
          <SkeletonTransactionRow />
          <SkeletonTransactionRow />
          <SkeletonTransactionRow />
        </div>
      </div>
    </SkeletonPage>
  )
}

// History page skeleton
export function HistoryPageSkeleton() {
  return (
    <SkeletonPage className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton variant="text" className="h-8 w-56 mb-2" />
            <Skeleton variant="text" className="h-4 w-48" />
          </div>
          <Skeleton variant="rounded" className="h-10 w-32" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <Skeleton variant="text" className="h-4 w-24 mb-2" />
              <div className="flex gap-2">
                <Skeleton variant="rounded" className="h-10 w-16" />
                <Skeleton variant="rounded" className="h-10 w-20" />
                <Skeleton variant="rounded" className="h-10 w-24" />
                <Skeleton variant="rounded" className="h-10 w-20" />
              </div>
            </div>
            <div>
              <Skeleton variant="text" className="h-4 w-16 mb-2" />
              <Skeleton variant="rounded" className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Transactions list */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
            <Skeleton variant="text" className="h-4 w-24 col-span-5" />
            <Skeleton variant="text" className="h-4 w-16 col-span-3" />
            <Skeleton variant="text" className="h-4 w-16 col-span-2" />
            <Skeleton variant="text" className="h-4 w-16 col-span-2" />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonTransactionRow key={i} />
          ))}
        </div>
      </div>
    </SkeletonPage>
  )
}

// Dashboard page skeleton
export function DashboardPageSkeleton() {
  return (
    <SkeletonPage className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton variant="text" className="h-10 w-64 mx-auto mb-4" />
          <Skeleton variant="text" className="h-5 w-96 mx-auto" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SkeletonChart height={300} />
          <SkeletonChart height={300} />
        </div>

        {/* Impact metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <Skeleton variant="text" className="h-6 w-40 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-3" />
                <Skeleton variant="text" className="h-8 w-16 mx-auto mb-1" />
                <Skeleton variant="text" className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <Skeleton variant="text" className="h-5 w-32" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTransactionRow key={i} />
          ))}
        </div>
      </div>
    </SkeletonPage>
  )
}
