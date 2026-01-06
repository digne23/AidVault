import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { supabase } from '../../lib/supabase'

interface Donation {
  id: string
  user_id: string
  amount: number
  created_at: string
  user?: {
    email: string
    full_name: string
  }
}

interface DonationStats {
  total: number
  count: number
  average: number
  largest: number
}

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [stats, setStats] = useState<DonationStats>({
    total: 0,
    count: 0,
    average: 0,
    largest: 0,
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalDonations, setTotalDonations] = useState(0)
  const [monthlyData, setMonthlyData] = useState<{ month: string; amount: number }[]>([])
  const donationsPerPage = 10

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true)
      try {
        // Get all donations for stats (from demo_donations for demo purposes)
        const { data: allDonations, count } = await supabase
          .from('demo_donations')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })

        setTotalDonations(count || 0)

        if (allDonations && allDonations.length > 0) {
          const total = allDonations.reduce((sum, d) => sum + Number(d.amount), 0)
          const largest = Math.max(...allDonations.map((d) => Number(d.amount)))
          setStats({
            total,
            count: allDonations.length,
            average: total / allDonations.length,
            largest,
          })

          // Calculate monthly data
          const monthlyMap = new Map<string, number>()
          const now = new Date()
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            monthlyMap.set(monthKey, 0)
          }

          allDonations.forEach((d) => {
            const date = new Date(d.created_at)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            if (monthlyMap.has(monthKey)) {
              monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + Number(d.amount))
            }
          })

          setMonthlyData(
            Array.from(monthlyMap.entries()).map(([month, amount]) => ({ month, amount }))
          )
        }

        // Fetch paginated donations from demo_donations
        const from = (currentPage - 1) * donationsPerPage
        const to = from + donationsPerPage - 1

        const { data: paginatedDonations } = await supabase
          .from('demo_donations')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, to)

        if (paginatedDonations) {
          // Map demo_donations to match expected format
          const donationsWithUsers = paginatedDonations.map((d) => ({
            ...d,
            user_id: d.id,
            user: {
              full_name: d.donor_name || 'Anonymous',
              email: d.impact_description || '',
            },
          }))

          setDonations(donationsWithUsers)
        }
      } catch (error) {
        console.error('Error fetching donations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [currentPage])

  const totalPages = Math.ceil(totalDonations / donationsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-white text-lg">Loading donations...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Donations</h1>
        <p className="text-gray-400 mt-1">Track and analyze all platform donations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(stats.total)}</p>
          <p className="text-gray-400 text-sm">Total Donated</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white">{stats.count}</p>
          <p className="text-gray-400 text-sm">Total Donations</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(stats.average)}</p>
          <p className="text-gray-400 text-sm">Average Donation</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(stats.largest)}</p>
          <p className="text-gray-400 text-sm">Largest Donation</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Donations</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#F3F4F6' }}
                formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
              />
              <Bar dataKey="amount" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Donations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Donor</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {donation.user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {donation.user?.full_name || 'Unknown'}
                          </p>
                          <p className="text-gray-400 text-xs">{donation.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-pink-400 font-semibold">
                        {formatCurrency(donation.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(donation.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-400">
                    No donations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
