import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  vault?: {
    balance: number
    created_at: string
  }
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const usersPerPage = 10

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      try {
        // Get total count
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        setTotalUsers(count || 0)

        // Fetch users with pagination
        const from = (currentPage - 1) * usersPerPage
        const to = from + usersPerPage - 1

        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, to)

        if (profilesData) {
          // Fetch vaults for these users
          const userIds = profilesData.map((u) => u.id)
          const { data: vaultsData } = await supabase
            .from('vaults')
            .select('user_id, balance, created_at')
            .in('user_id', userIds)

          // Merge vault data with users
          const usersWithVaults = profilesData.map((user) => ({
            ...user,
            vault: vaultsData?.find((v) => v.user_id === user.id),
          }))

          setUsers(usersWithVaults)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage])

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(totalUsers / usersPerPage)

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
          <span className="text-white text-lg">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">View and manage all registered users</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
            {totalUsers} total users
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">User</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Email</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Vault Balance</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Joined</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="text-white font-medium">{user.full_name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-medium ${
                          user.vault && user.vault.balance > 0 ? 'text-emerald-400' : 'text-gray-400'
                        }`}
                      >
                        {user.vault ? formatCurrency(user.vault.balance) : 'No vault'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6">
                      {user.vault && user.vault.balance > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-600/50 text-gray-400 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    {searchTerm ? 'No users found matching your search' : 'No users registered yet'}
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
              Showing {(currentPage - 1) * usersPerPage + 1} to{' '}
              {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
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
