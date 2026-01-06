import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface ImpactTier {
  id: string
  threshold: number
  labelKey: string
  singularLabelKey: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface ImpactItem {
  tier: ImpactTier
  count: number
}

interface ImpactCalculatorProps {
  /** The donation amount to calculate impact for */
  amount: number
  /** Display mode - compact for single line, expanded for detailed view */
  mode?: 'compact' | 'expanded'
  /** Whether to animate the count changes */
  animate?: boolean
  /** Additional CSS classes */
  className?: string
  /** Title to display above the impact */
  title?: string
  /** Show empty state when amount is 0 */
  showEmpty?: boolean
}

// Impact tiers from highest to lowest value (in RWF)
const impactTiers: ImpactTier[] = [
  {
    id: 'full-year',
    threshold: 1000000,
    labelKey: 'childFullYear',
    singularLabelKey: 'childFullYear',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    id: 'six-months-tuition',
    threshold: 500000,
    labelKey: 'childrenTuition6Months',
    singularLabelKey: 'childTuition6Months',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'three-months-tuition',
    threshold: 250000,
    labelKey: 'childrenTuition3Months',
    singularLabelKey: 'childTuition3Months',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: 'one-month-tuition',
    threshold: 100000,
    labelKey: 'childrenTuition1Month',
    singularLabelKey: 'childTuition1Month',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'month-supplies',
    threshold: 50000,
    labelKey: 'monthsOfSchoolSupplies',
    singularLabelKey: 'monthOfSchoolSupplies',
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'week-meals',
    threshold: 25000,
    labelKey: 'weeksOfSchoolMeals',
    singularLabelKey: 'weekOfSchoolMeals',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'notebook-sets',
    threshold: 10000,
    labelKey: 'notebookAndPencilSets',
    singularLabelKey: 'notebookAndPencilSet',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 'basic-supplies',
    threshold: 5000,
    labelKey: 'notebooksAndPencils',
    singularLabelKey: 'notebookAndPencils',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
]

function calculateImpact(amount: number): ImpactItem[] {
  const impacts: ImpactItem[] = []
  let remaining = amount

  for (const tier of impactTiers) {
    if (remaining >= tier.threshold) {
      const count = Math.floor(remaining / tier.threshold)
      impacts.push({ tier, count })
      remaining = remaining % tier.threshold
    }
  }

  return impacts
}

function AnimatedNumber({ value, animate }: { value: number; animate: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value)
      return
    }

    const duration = 500
    const startTime = Date.now()
    const startValue = displayValue

    const updateValue = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (value - startValue) * easeOut)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      }
    }

    requestAnimationFrame(updateValue)
  }, [value, animate])

  return <span>{displayValue}</span>
}

export default function ImpactCalculator({
  amount,
  mode = 'expanded',
  animate = true,
  className = '',
  title,
  showEmpty = true,
}: ImpactCalculatorProps) {
  const { t } = useTranslation('components')
  const impacts = useMemo(() => calculateImpact(amount), [amount])

  if (amount <= 0 && !showEmpty) {
    return null
  }

  if (amount <= 0) {
    return (
      <div className={`${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          {t('impactCalculator.enterAmountToSee')}
        </div>
      </div>
    )
  }

  if (mode === 'compact') {
    return <CompactImpact impacts={impacts} className={className} animate={animate} />
  }

  return (
    <ExpandedImpact
      impacts={impacts}
      amount={amount}
      className={className}
      title={title}
      animate={animate}
    />
  )
}

// Compact mode - single line summary
function CompactImpact({
  impacts,
  className,
  animate,
}: {
  impacts: ImpactItem[]
  className?: string
  animate: boolean
}) {
  const { t } = useTranslation('components')

  if (impacts.length === 0) {
    return <span className={className}>{t('impactCalculator.everyDollarHelps')}</span>
  }

  const parts = impacts.map((impact, index) => {
    const labelKey = impact.count === 1 ? impact.tier.singularLabelKey : impact.tier.labelKey
    return (
      <span key={impact.tier.id}>
        <span className={`font-semibold ${impact.tier.color}`}>
          <AnimatedNumber value={impact.count} animate={animate} />
        </span>{' '}
        {t(`impactCalculator.${labelKey}`)}
        {index < impacts.length - 1 && <span className="text-gray-400"> + </span>}
      </span>
    )
  })

  return <span className={className}>{parts}</span>
}

// Expanded mode - detailed breakdown with icons
function ExpandedImpact({
  impacts,
  amount,
  className,
  title,
  animate,
}: {
  impacts: ImpactItem[]
  amount: number
  className?: string
  title?: string
  animate: boolean
}) {
  const { t } = useTranslation('components')

  return (
    <div className={className}>
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('impactCalculator.yourDonationOf')}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {amount.toLocaleString()} RWF
            </p>
          </div>
        </div>

        {/* Impact Items */}
        {impacts.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('impactCalculator.canProvide')}</p>
            {impacts.map((impact) => (
              <ImpactRow key={impact.tier.id} impact={impact} animate={animate} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('impactCalculator.everyContribution')}
          </p>
        )}

        {/* Footer message */}
        <div className="mt-6 pt-4 border-t border-emerald-200 dark:border-emerald-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('impactCalculator.impactEstimates')}
          </p>
        </div>
      </div>
    </div>
  )
}

function ImpactRow({ impact, animate }: { impact: ImpactItem; animate: boolean }) {
  const { t } = useTranslation('components')
  const labelKey = impact.count === 1 ? impact.tier.singularLabelKey : impact.tier.labelKey

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className={`w-10 h-10 ${impact.tier.bgColor} rounded-lg flex items-center justify-center ${impact.tier.color}`}>
        {impact.tier.icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-900 dark:text-white font-medium">
          <span className={`text-xl font-bold ${impact.tier.color}`}>
            <AnimatedNumber value={impact.count} animate={animate} />
          </span>{' '}
          {t(`impactCalculator.${labelKey}`)}
        </p>
      </div>
    </div>
  )
}

// Helper component for showing impact in a badge format
export function ImpactBadge({
  amount,
  className = '',
}: {
  amount: number
  className?: string
}) {
  const { t } = useTranslation('components')
  const impacts = useMemo(() => calculateImpact(amount), [amount])

  if (impacts.length === 0 || amount <= 0) {
    return null
  }

  const primaryImpact = impacts[0]
  const labelKey = primaryImpact.count === 1
    ? primaryImpact.tier.singularLabelKey
    : primaryImpact.tier.labelKey

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${primaryImpact.tier.bgColor} ${primaryImpact.tier.color} ${className}`}>
      <span className="w-4 h-4">{primaryImpact.tier.icon}</span>
      <span>{primaryImpact.count} {t(`impactCalculator.${labelKey}`)}</span>
    </span>
  )
}

// Mini version for inline use
export function ImpactSummary({
  amount,
  className = '',
}: {
  amount: number
  className?: string
}) {
  const { t } = useTranslation('components')
  const impacts = useMemo(() => calculateImpact(amount), [amount])

  if (impacts.length === 0 || amount <= 0) {
    return <span className={`text-gray-500 dark:text-gray-400 ${className}`}>—</span>
  }

  const primaryImpact = impacts[0]
  const hasMore = impacts.length > 1
  const labelKey = primaryImpact.count === 1
    ? primaryImpact.tier.singularLabelKey
    : primaryImpact.tier.labelKey

  return (
    <span className={`${className}`}>
      <span className={`font-medium ${primaryImpact.tier.color}`}>
        {primaryImpact.count} {t(`impactCalculator.${labelKey}`)}
      </span>
      {hasMore && (
        <span className="text-gray-400 dark:text-gray-500"> {t('impactCalculator.moreImpacts', { count: impacts.length - 1 })}</span>
      )}
    </span>
  )
}
