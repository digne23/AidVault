import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface EmptyStateProps {
  /** Icon to display */
  icon?: ReactNode
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Primary action button */
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** Secondary action */
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

const sizeClasses = {
  sm: {
    container: 'py-8',
    iconWrapper: 'w-12 h-12 mb-3',
    icon: 'w-6 h-6',
    title: 'text-base',
    description: 'text-sm',
    button: 'px-4 py-2 text-sm',
  },
  md: {
    container: 'py-12',
    iconWrapper: 'w-16 h-16 mb-4',
    icon: 'w-8 h-8',
    title: 'text-lg',
    description: 'text-sm',
    button: 'px-5 py-2.5 text-sm',
  },
  lg: {
    container: 'py-16',
    iconWrapper: 'w-20 h-20 mb-6',
    icon: 'w-10 h-10',
    title: 'text-xl',
    description: 'text-base',
    button: 'px-6 py-3',
  },
}

// Default icons for common empty states
export const EmptyStateIcons = {
  transactions: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  search: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  inbox: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  folder: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  users: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  wallet: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className = '',
}: EmptyStateProps) {
  const sizes = sizeClasses[size]

  const ActionButton = ({ actionConfig, primary = true }: { actionConfig: NonNullable<EmptyStateProps['action']>; primary?: boolean }) => {
    const baseClasses = `${sizes.button} rounded-lg font-medium transition-colors flex items-center justify-center`
    const variantClasses = primary
      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

    if (actionConfig.href) {
      return (
        <Link to={actionConfig.href} className={`${baseClasses} ${variantClasses}`}>
          {actionConfig.label}
        </Link>
      )
    }

    return (
      <button onClick={actionConfig.onClick} className={`${baseClasses} ${variantClasses}`}>
        {actionConfig.label}
      </button>
    )
  }

  return (
    <div className={`text-center ${sizes.container} ${className}`}>
      {/* Icon */}
      {icon && (
        <div className={`${sizes.iconWrapper} bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400`}>
          <div className={sizes.icon}>{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3 className={`${sizes.title} font-semibold text-gray-900 dark:text-white mb-2`}>{title}</h3>

      {/* Description */}
      {description && (
        <p className={`${sizes.description} text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6`}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {action && <ActionButton actionConfig={action} primary />}
          {secondaryAction && <ActionButton actionConfig={secondaryAction} primary={false} />}
        </div>
      )}
    </div>
  )
}

// Pre-configured empty states for common scenarios
export function NoTransactionsEmptyState() {
  const { t } = useTranslation('components')

  return (
    <EmptyState
      icon={EmptyStateIcons.transactions}
      title={t('emptyState.noTransactionsTitle')}
      description={t('emptyState.noTransactionsDesc')}
      action={{
        label: t('emptyState.addFirstFunds'),
        href: '/user/vault',
      }}
    />
  )
}

export function NoDonationsEmptyState() {
  const { t } = useTranslation('components')

  return (
    <EmptyState
      icon={EmptyStateIcons.heart}
      title={t('emptyState.noDonationsTitle')}
      description={t('emptyState.noDonationsDesc')}
      action={{
        label: t('emptyState.viewYourVault'),
        href: '/user/vault',
      }}
    />
  )
}

export function NoSearchResultsEmptyState({ onClear }: { onClear?: () => void }) {
  const { t } = useTranslation('components')

  return (
    <EmptyState
      icon={EmptyStateIcons.search}
      title={t('emptyState.noResultsTitle')}
      description={t('emptyState.noResultsDesc')}
      action={onClear ? { label: t('emptyState.clearFilters'), onClick: onClear } : undefined}
      size="sm"
    />
  )
}

export function NoDataEmptyState() {
  const { t } = useTranslation('components')

  return (
    <EmptyState
      icon={EmptyStateIcons.chart}
      title={t('emptyState.noDataTitle')}
      description={t('emptyState.noDataDesc')}
      size="sm"
    />
  )
}
