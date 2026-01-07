import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { useVault } from '../../hooks/useVault'
import { usePreferences } from '../../contexts/PreferencesContext'
import AddFundsModal from '../../components/AddFundsModal'
import { ImpactSummary } from '../../components/ImpactCalculator'
import { VaultPageSkeleton } from '../../components/Skeleton'
import { InlineError } from '../../components/ErrorBoundary'

export default function Vault() {
  const { t } = useTranslation('vault')
  const { user } = useAuth()
  const { formatCurrency } = usePreferences()
  const {
    vault,
    transactions,
    totalDonated,
    loading,
    error,
    addFunds,
    isEligibleForDonation,
    daysUntilEligible,
    monthsUntilEligible,
    projectedDonation,
    savingsStartDate,
    progressPercentage,
  } = useVault()

  const [showAddFundsModal, setShowAddFundsModal] = useState(false)

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTransactionDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        )
      case 'withdrawal':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
        )
      case 'donation':
        return (
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return <VaultPageSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InlineError
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('welcomeBack', { name: userName })}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('vaultOverview')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vault Balance Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">{t('yourVaultBalance')}</p>
                  <p className="text-4xl font-bold mt-2">
                    {formatCurrency(vault?.balance ? Number(vault.balance) : 0)}
                  </p>
                  <p className="text-emerald-100 text-sm mt-2">
                    {t('balanceBreakdown')}
                  </p>
                </div>
                <div className="bg-white/20 rounded-2xl p-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setShowAddFundsModal(true)}
                className="mt-6 w-full sm:w-auto px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('addFunds')}
              </button>
            </div>

            {/* Savings Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('savingsProgress')}</h2>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{t('started', { date: savingsStartDate ? formatDate(savingsStartDate) : 'N/A' })}</span>
                <span>{t('sixMonthMilestone')}</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEligibleForDonation ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('eligibleToDonate')}</span>
                  ) : (
                    <span>
                      {monthsUntilEligible > 0
                        ? t('timeUntilEligible', { months: monthsUntilEligible, days: daysUntilEligible })
                        : t('daysUntilEligible', { days: daysUntilEligible })}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Projected Donation Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('projectedDonation')}</h2>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                    {formatCurrency(projectedDonation)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    {t('donationPercentage')}
                  </p>
                </div>
                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-xl p-3">
                  <svg className="w-8 h-8 text-pink-500 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>

              {isEligibleForDonation && projectedDonation > 0 ? (
                <Link
                  to="/user/donate"
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {t('makeYourDonation')}
                </Link>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {t('keepSaving')}
                </p>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentTransactions')}</h2>
                <Link
                  to="/user/history"
                  className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {t('viewHistory')}
                </Link>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{t('noTransactions')}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{t('addFundsToStart')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        {getTransactionIcon(tx.type)}
                        <div className="ml-4">
                          <p className="font-medium text-gray-900 dark:text-white capitalize">{t(tx.type)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatTransactionDate(tx.created_at)}</p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${
                          tx.type === 'deposit'
                            ? 'text-green-600 dark:text-green-400'
                            : tx.type === 'withdrawal'
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-pink-600 dark:text-pink-400'
                        }`}
                      >
                        {tx.type === 'deposit' ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <h2 className="text-lg font-semibold mb-4">{t('yourImpact')}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm">{t('totalDonated')}</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalDonated)}</p>
                </div>
                {totalDonated > 0 && (
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-blue-100 text-sm mb-2">{t('youveProvided')}</p>
                    <ImpactSummary amount={totalDonated} className="text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('quickActions')}</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowAddFundsModal(true)}
                  className="w-full py-3 px-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('addFunds')}
                </button>
                <Link
                  to="/user/donate"
                  className="w-full py-3 px-4 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-lg font-medium hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {t('directDonation')}
                </Link>
                <Link
                  to="/user/history"
                  className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {t('viewHistory')}
                </Link>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-300 mb-3">{t('howItWorksTitle')}</h2>
              <ul className="space-y-3 text-sm text-amber-800 dark:text-amber-200">
                <li className="flex items-start">
                  <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                  <span>{t('step1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                  <span>{t('step2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                  <span>{t('step3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                  <span>{t('step4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      <AddFundsModal
        isOpen={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
        onAddFunds={addFunds}
        currentBalance={vault?.balance ? Number(vault.balance) : 0}
      />
    </div>
  )
}
