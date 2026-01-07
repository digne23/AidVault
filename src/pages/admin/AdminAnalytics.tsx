import { useState, useEffect } from 'react'
import { usePreferences } from '../../contexts/PreferencesContext'
import {
  AreaChart,
  Area,
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
import { supabase } from '../../lib/supabase'

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

// Cost estimates for impact calculations (in RWF)
const SCHOOL_SUPPLIES_COST = 65000
const TUITION_MONTH_COST = 97500
const CHILD_SUPPORT_COST = 260000

export default function AdminAnalytics() {
  const { formatCurrency } = usePreferences()
  const [loading, setLoading] = useState(true)
  const [totalDonated, setTotalDonated] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [monthlyData, setMonthlyData] = useState<{ month: string; donations: number; savings: number }[]>([])
  const [userGrowth, setUserGrowth] = useState<{ month: string; users: number }[]>([])
  const [donationRanges, setDonationRanges] = useState<{ range: string; count: number }[]>([])
  const [transactionTypes, setTransactionTypes] = useState<{ type: string; count: number }[]>([])

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true)
      try {
        // Fetch all donations
        const { data: donations } = await supabase
          .from('donations')
          .select('amount, created_at')
          .order('created_at', { ascending: true })

        // Fetch all vaults
        const { data: vaults } = await supabase.from('vaults').select('balance')

        // Fetch all users
        const { data: users } = await supabase
          .from('profiles')
          .select('created_at')
          .order('created_at', { ascending: true })

        // Fetch all transactions
        const { data: transactions } = await supabase.from('transactions').select('type, amount')

        if (donations) {
          const total = donations.reduce((sum, d) => sum + Number(d.amount), 0)
          setTotalDonated(total)

          // Calculate monthly donations
          const monthlyMap = new Map<string, { donations: number; savings: number }>()
          const now = new Date()
          for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            monthlyMap.set(monthKey, { donations: 0, savings: 0 })
          }

          donations.forEach((d) => {
            const date = new Date(d.created_at)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            if (monthlyMap.has(monthKey)) {
              const current = monthlyMap.get(monthKey)!
              monthlyMap.set(monthKey, { ...current, donations: current.donations + Number(d.amount) })
            }
          })

          setMonthlyData(
            Array.from(monthlyMap.entries()).map(([month, data]) => ({
              month,
              donations: data.donations,
              savings: Math.floor(Math.random() * 500000) + 100000, // Simulated savings data
            }))
          )

          // Calculate donation ranges
          const ranges = [
            { range: '0-50K', min: 0, max: 50000, count: 0 },
            { range: '50K-100K', min: 50000, max: 100000, count: 0 },
            { range: '100K-200K', min: 100000, max: 200000, count: 0 },
            { range: '200K-500K', min: 200000, max: 500000, count: 0 },
            { range: '500K+', min: 500000, max: Infinity, count: 0 },
          ]

          donations.forEach((d) => {
            const amount = Number(d.amount)
            const range = ranges.find((r) => amount >= r.min && amount < r.max)
            if (range) range.count++
          })

          setDonationRanges(ranges.map((r) => ({ range: r.range, count: r.count })))
        }

        if (vaults) {
          const total = vaults.reduce((sum, v) => sum + Number(v.balance), 0)
          setTotalSavings(total)
        }

        if (users) {
          setTotalUsers(users.length)

          // Calculate user growth
          const growthMap = new Map<string, number>()
          const now = new Date()
          for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            growthMap.set(monthKey, 0)
          }

          users.forEach((u) => {
            const date = new Date(u.created_at)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            if (growthMap.has(monthKey)) {
              growthMap.set(monthKey, (growthMap.get(monthKey) || 0) + 1)
            }
          })

          // Make it cumulative
          let cumulative = 0
          const cumulativeData: { month: string; users: number }[] = []
          growthMap.forEach((count, month) => {
            cumulative += count
            cumulativeData.push({ month, users: cumulative })
          })

          setUserGrowth(cumulativeData)
        }

        if (transactions) {
          // Count by type
          const typeCounts = new Map<string, number>()
          transactions.forEach((t) => {
            typeCounts.set(t.type, (typeCounts.get(t.type) || 0) + 1)
          })

          setTransactionTypes(
            Array.from(typeCounts.entries()).map(([type, count]) => ({
              type: type.charAt(0).toUpperCase() + type.slice(1),
              count,
            }))
          )
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Calculate impact metrics
  const impactMetrics = {
    schoolSupplies: Math.floor(totalDonated / SCHOOL_SUPPLIES_COST),
    tuitionMonths: Math.floor(totalDonated / TUITION_MONTH_COST),
    childrenSupported: Math.floor(totalDonated / CHILD_SUPPORT_COST),
  }

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
          <span className="text-white text-lg">Loading analytics...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Comprehensive platform insights and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5">
          <p className="text-indigo-100 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-white">{formatNumber(totalUsers)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5">
          <p className="text-emerald-100 text-sm mb-1">Total Savings</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalSavings)}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl p-5">
          <p className="text-pink-100 text-sm mb-1">Total Donated</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalDonated)}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl p-5">
          <p className="text-amber-100 text-sm mb-1">Children Supported</p>
          <p className="text-3xl font-bold text-white">{formatNumber(impactMetrics.childrenSupported)}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
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
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === 'donations' ? 'Donations' : 'Savings',
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stackId="1"
                  stroke="#EC4899"
                  fill="#EC4899"
                  fillOpacity={0.6}
                  name="Donations"
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stackId="2"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="Savings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                  formatter={(value) => [Number(value), 'Total Users']}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: '#6366F1', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Donation Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Donation Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationRanges} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis type="category" dataKey="range" stroke="#9CA3AF" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [Number(value), 'Donations']}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Types */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="type"
                >
                  {transactionTypes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {transactionTypes.map((item, index) => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-gray-400 text-sm">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Impact Metrics</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatNumber(impactMetrics.schoolSupplies)}</p>
                <p className="text-gray-400 text-sm">School Supplies Sets</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatNumber(impactMetrics.tuitionMonths)}</p>
                <p className="text-gray-400 text-sm">Months of Tuition</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatNumber(impactMetrics.childrenSupported)}</p>
                <p className="text-gray-400 text-sm">Children Supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
