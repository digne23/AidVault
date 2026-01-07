import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { usePlatformStats } from '../hooks/usePlatformStats'
import { DashboardPageSkeleton } from '../components/Skeleton'
import { usePreferences } from '../contexts/PreferencesContext'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function Dashboard() {
  const { t } = useTranslation('dashboard')
  const { formatCurrency } = usePreferences()
  const {
    totalDonated,
    totalSavings,
    activeSavers,
    completedDonations,
    monthlyDonations,
    growthData,
    donationDistribution,
    recentDonations,
    impactMetrics,
    lastUpdated,
    loading,
  } = usePlatformStats()

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  if (loading) {
    return <DashboardPageSkeleton />
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Home
            </Link>
            <svg
              className="w-4 h-4 mx-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 dark:text-white font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-blue-100 mb-6">
            {t('subtitle')}
          </p>
          <p className="text-sm text-blue-200">
            {t('lastUpdated', {
              date: lastUpdated.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            })}
          </p>
        </div>
      </section>

      {/* Key Metrics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Donated */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                All Time
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(totalDonated)}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('totalAmountDonated')}</p>
          </div>

          {/* Total Savings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                Current
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(totalSavings)}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('beingSavedInVaults')}</p>
          </div>

          {/* Active Savers */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatNumber(activeSavers)}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('activeSavers')}</p>
          </div>

          {/* Completed Donations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatNumber(completedDonations)}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('donationsMade')}</p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            {t('analytics')}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('platformInsights')}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly Donations Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('monthlyDonations')}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyDonations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k RWF`}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), t('donations')]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Over Time Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('growthOverTime')}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k RWF`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    stroke="#9CA3AF"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value, name) => [
                      name === 'totalDonations' ? formatCurrency(value as number) : formatNumber(value as number),
                      name === 'totalDonations' ? t('cumulativeDonations') : t('totalUsers'),
                    ]}
                  />
                  <Legend
                    formatter={(value) =>
                      value === 'totalDonations' ? t('cumulativeDonations') : t('totalUsers')
                    }
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="totalDonations"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donation Distribution Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('donationDistribution')}</h3>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donationDistribution as Array<{ range: string; count: number; percentage: number; [key: string]: string | number }>}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="range"
                    label={(entry) => `${entry.name}: ${((entry.percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
                  >
                    {donationDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} ${t('donations').toLowerCase()}`,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {donationDistribution.map((item, index) => (
                <div key={item.range} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentActivity')}</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {donation.donorName || t('someoneDonated', { amount: formatCurrency(donation.amount) })}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {donation.donorName ? `${formatCurrency(donation.amount)} • ${donation.timeAgo}` : donation.timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              {t('realImpact')}
            </span>
            <h2 className="text-3xl font-bold mb-4">{t('whatYourDonationsAccomplish')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('impactBasedOn', { amount: formatCurrency(totalDonated) })}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {/* School Supplies */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">
                {formatNumber(impactMetrics.schoolSupplies)}
              </p>
              <p className="text-gray-400">{t('setsOfSchoolSupplies')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('booksNotebooksPencils')}</p>
            </div>

            {/* Tuition Funded */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">{formatNumber(impactMetrics.tuitionMonths)}</p>
              <p className="text-gray-400">{t('monthsOfTuition')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('keepingChildrenInSchool')}</p>
            </div>

            {/* Children Supported */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">
                {formatNumber(impactMetrics.childrenSupported)}
              </p>
              <p className="text-gray-400">{t('childrenSupported')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('fullSemesterOfEducation')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Statement */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-8 lg:p-12 border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('transparencyPromise')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('transparencyP1')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('transparencyP2')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/mission"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {t('learnAboutMission')}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border border-blue-200 dark:border-blue-800"
                  >
                    How It Works
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('bePartOfSomethingBigger')}</h2>
          <p className="text-xl text-emerald-100 mb-8">
            {t('joinSaversCount', { count: activeSavers })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              {t('startSavingToday')}
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-400 transition-colors"
            >
              {t('learnAboutUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
