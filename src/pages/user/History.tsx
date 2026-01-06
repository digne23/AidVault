import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTransactions } from '../../hooks/useTransactions'
import type { TransactionType, SortOrder } from '../../hooks/useTransactions'
import { ImpactSummary } from '../../components/ImpactCalculator'
import { HistoryPageSkeleton } from '../../components/Skeleton'
import { InlineError } from '../../components/ErrorBoundary'

export default function History() {
  const { t } = useTranslation('history')
  const {
    transactions,
    stats,
    loading,
    error,
    page,
    totalCount,
    totalPages,
    setPage,
    setFilter,
    setSortOrder,
    setDateRange,
    exportToCSV,
    currentFilter,
    currentSortOrder,
    startDate,
    endDate,
  } = useTransactions()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')

  const filterOptions: { value: TransactionType; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'deposit', label: t('deposits') },
    { value: 'withdrawal', label: t('withdrawals') },
    { value: 'donation', label: t('donations') },
  ]

  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'newest', label: t('newestFirst') },
    { value: 'oldest', label: t('oldestFirst') },
  ]

  const handleApplyDateRange = () => {
    const start = tempStartDate ? new Date(tempStartDate) : null
    const end = tempEndDate ? new Date(tempEndDate) : null
    setDateRange(start, end)
    setShowDatePicker(false)
  }

  const handleClearDateRange = () => {
    setTempStartDate('')
    setTempEndDate('')
    setDateRange(null, null)
    setShowDatePicker(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
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

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600'
      case 'withdrawal':
        return 'text-orange-600'
      case 'donation':
        return 'text-pink-600'
      default:
        return 'text-gray-600'
    }
  }

  const getAmountPrefix = (type: string) => {
    return type === 'deposit' ? '+' : '-'
  }

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'deposit':
        return t('deposit')
      case 'withdrawal':
        return t('withdrawal')
      case 'donation':
        return t('donation')
      default:
        return type
    }
  }

  if (loading && transactions.length === 0) {
    return <HistoryPageSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InlineError
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t('subtitle')}</p>
          </div>
          <button
            onClick={exportToCSV}
            className="mt-4 sm:mt-0 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('exportCSV')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalDeposited')}</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.totalDeposited.toLocaleString()} RWF</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalWithdrawn')}</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{stats.totalWithdrawn.toLocaleString()} RWF</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalDonated')}</p>
                <p className="text-xl font-bold text-pink-600 dark:text-pink-400">{stats.totalDonated.toLocaleString()} RWF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('filterByType')}</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentFilter === option.value
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('sort')}</label>
              <select
                value={currentSortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('dateRange')}</label>
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`px-4 py-2 border rounded-lg flex items-center transition-colors ${
                  startDate || endDate
                    ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {startDate || endDate ? t('dateSet') : t('selectDates')}
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('startDate')}</label>
                      <input
                        type="date"
                        value={tempStartDate}
                        onChange={(e) => setTempStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('endDate')}</label>
                      <input
                        type="date"
                        value={tempEndDate}
                        onChange={(e) => setTempEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleApplyDateRange}
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        {t('apply')}
                      </button>
                      <button
                        onClick={handleClearDateRange}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t('clear')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(startDate || endDate) && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">{t('showing')}</span>
                {startDate && (
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded mr-2">
                    {t('from', { date: startDate.toLocaleDateString() })}
                  </span>
                )}
                {endDate && (
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded mr-2">
                    {t('to', { date: endDate.toLocaleDateString() })}
                  </span>
                )}
                <button
                  onClick={handleClearDateRange}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {transactions.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('noTransactionsYet')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                {currentFilter !== 'all'
                  ? t('noFilteredTransactions', { type: currentFilter })
                  : t('noTransactionsDesc')}
              </p>
              {currentFilter !== 'all' ? (
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('showAllTransactions')}
                </button>
              ) : (
                <Link
                  to="/user/vault"
                  className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  {t('addYourFirstFunds')}
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Table Header - Hidden on mobile */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-5">{t('transaction')}</div>
                <div className="col-span-3">{t('date')}</div>
                <div className="col-span-2 text-right">{t('amount')}</div>
                <div className="col-span-2 text-right">{t('status')}</div>
              </div>

              {/* Transaction Items */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                      {/* Transaction Type & Icon */}
                      <div className="flex items-center col-span-5 mb-2 sm:mb-0">
                        {getTransactionIcon(tx.type)}
                        <div className="ml-4">
                          <p className="font-medium text-gray-900 dark:text-white capitalize">{getTransactionTypeLabel(tx.type)}</p>
                          {tx.type === 'donation' && (
                            <p className="text-sm">
                              <ImpactSummary amount={Number(tx.amount)} />
                            </p>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                            {formatDate(tx.created_at)} at {formatTime(tx.created_at)}
                          </p>
                        </div>
                      </div>

                      {/* Date - Hidden on mobile */}
                      <div className="hidden sm:block col-span-3">
                        <p className="text-gray-900 dark:text-white">{formatDate(tx.created_at)}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatTime(tx.created_at)}</p>
                      </div>

                      {/* Amount */}
                      <div className="col-span-2 text-right">
                        <span className={`text-lg font-semibold ${getAmountColor(tx.type)}`}>
                          {getAmountPrefix(tx.type)}{Number(tx.amount).toLocaleString()} RWF
                        </span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 text-right hidden sm:block">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                          {t('completed')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('showingPagination', { start: (page - 1) * 10 + 1, end: Math.min(page * 10, totalCount), total: totalCount })}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Page Numbers */}
                      <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (page <= 3) {
                            pageNum = i + 1
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = page - 2 + i
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                page === pageNum
                                  ? 'bg-emerald-600 text-white'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                      </div>

                      <span className="sm:hidden text-sm text-gray-600 dark:text-gray-400">
                        {t('pageOfPages', { current: page, total: totalPages })}
                      </span>

                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Loading Overlay for page changes */}
        {loading && transactions.length > 0 && (
          <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  )
}
