import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Transaction {
  id: string
  user_id: string
  type: 'deposit' | 'withdrawal' | 'donation'
  amount: number
  created_at: string
  user?: {
    email: string
    full_name: string
  }
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const transactionsPerPage = 15

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true)
      try {
        // Use demo_donations as transactions for demo purposes
        // All demo_donations are treated as 'donation' type transactions
        const { count } = await supabase
          .from('demo_donations')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })

        // Filter by type if needed (only 'donation' or 'all' will show demo data)
        if (filter !== 'all' && filter !== 'donation') {
          setTotalTransactions(0)
          setTransactions([])
          setLoading(false)
          return
        }

        setTotalTransactions(count || 0)

        // Fetch with pagination
        const from = (currentPage - 1) * transactionsPerPage
        const to = from + transactionsPerPage - 1

        const { data: paginatedData } = await supabase
          .from('demo_donations')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, to)

        if (paginatedData) {
          // Map demo_donations to transaction format
          const transactionsWithUsers = paginatedData.map((d) => ({
            id: d.id,
            user_id: d.id,
            type: 'donation' as const,
            amount: d.amount,
            created_at: d.created_at,
            user: {
              full_name: d.donor_name || 'Anonymous',
              email: d.impact_description || '',
            },
          }))

          setTransactions(transactionsWithUsers)
        }
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [currentPage, filter])

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-emerald-500/20 text-emerald-400'
      case 'withdrawal':
        return 'bg-amber-500/20 text-amber-400'
      case 'donation':
        return 'bg-pink-500/20 text-pink-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
      case 'withdrawal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        )
      case 'donation':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  const totalPages = Math.ceil(totalTransactions / transactionsPerPage)

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
          <span className="text-white text-lg">Loading transactions...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 mt-1">View all platform transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
            {totalTransactions} total
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['all', 'deposit', 'withdrawal', 'donation'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Type</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">User</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getTypeStyles(
                          tx.type
                        )}`}
                      >
                        {getTypeIcon(tx.type)}
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{tx.user?.full_name || 'Unknown'}</p>
                        <p className="text-gray-400 text-xs">{tx.user?.email || tx.user_id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-semibold ${
                          tx.type === 'deposit'
                            ? 'text-emerald-400'
                            : tx.type === 'donation'
                            ? 'text-pink-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {tx.type === 'deposit' ? '+' : '-'}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(tx.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(tx.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No transactions found
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
              Showing {(currentPage - 1) * transactionsPerPage + 1} to{' '}
              {Math.min(currentPage * transactionsPerPage, totalTransactions)} of {totalTransactions}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
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
