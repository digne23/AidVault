import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Transaction } from '../types/database'

export type TransactionType = 'all' | 'deposit' | 'withdrawal' | 'donation'
export type SortOrder = 'newest' | 'oldest'

interface TransactionStats {
  totalDeposited: number
  totalWithdrawn: number
  totalDonated: number
}

interface UseTransactionsOptions {
  type?: TransactionType
  sortOrder?: SortOrder
  startDate?: Date | null
  endDate?: Date | null
  page?: number
  pageSize?: number
}

interface UseTransactionsReturn {
  transactions: Transaction[]
  stats: TransactionStats
  loading: boolean
  error: string | null
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasMore: boolean
  setPage: (page: number) => void
  setFilter: (type: TransactionType) => void
  setSortOrder: (order: SortOrder) => void
  setDateRange: (start: Date | null, end: Date | null) => void
  refetch: () => Promise<void>
  exportToCSV: () => void
  currentFilter: TransactionType
  currentSortOrder: SortOrder
  startDate: Date | null
  endDate: Date | null
}

const PAGE_SIZE = 10

export function useTransactions(options: UseTransactionsOptions = {}): UseTransactionsReturn {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState<TransactionStats>({
    totalDeposited: 0,
    totalWithdrawn: 0,
    totalDonated: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(options.page || 1)
  const [pageSize] = useState(options.pageSize || PAGE_SIZE)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState<TransactionType>(options.type || 'all')
  const [sortOrder, setSortOrder] = useState<SortOrder>(options.sortOrder || 'newest')
  const [startDate, setStartDate] = useState<Date | null>(options.startDate || null)
  const [endDate, setEndDate] = useState<Date | null>(options.endDate || null)

  const fetchStats = useCallback(async () => {
    if (!user) return

    try {
      // Fetch all transactions for stats
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('type, amount')
        .eq('user_id', user.id)

      if (fetchError) throw fetchError

      const stats = (data || []).reduce(
        (acc, tx) => {
          const amount = Number(tx.amount)
          switch (tx.type) {
            case 'deposit':
              acc.totalDeposited += amount
              break
            case 'withdrawal':
              acc.totalWithdrawn += amount
              break
            case 'donation':
              acc.totalDonated += amount
              break
          }
          return acc
        },
        { totalDeposited: 0, totalWithdrawn: 0, totalDonated: 0 }
      )

      setStats(stats)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }, [user])

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Build query
      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)

      // Apply type filter
      if (filter !== 'all') {
        query = query.eq('type', filter)
      }

      // Apply date range filter
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString())
      }
      if (endDate) {
        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)
        query = query.lte('created_at', endOfDay.toISOString())
      }

      // Apply sorting
      query = query.order('created_at', { ascending: sortOrder === 'oldest' })

      // Apply pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      setTransactions(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }, [user, filter, sortOrder, startDate, endDate, page, pageSize])

  useEffect(() => {
    fetchTransactions()
    fetchStats()
  }, [fetchTransactions, fetchStats])

  const handleSetFilter = (type: TransactionType) => {
    setFilter(type)
    setPage(1) // Reset to first page when filter changes
  }

  const handleSetSortOrder = (order: SortOrder) => {
    setSortOrder(order)
    setPage(1)
  }

  const handleSetDateRange = (start: Date | null, end: Date | null) => {
    setStartDate(start)
    setEndDate(end)
    setPage(1)
  }

  const exportToCSV = async () => {
    if (!user) return

    try {
      // Fetch all transactions for export
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)

      if (filter !== 'all') {
        query = query.eq('type', filter)
      }

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString())
      }
      if (endDate) {
        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)
        query = query.lte('created_at', endOfDay.toISOString())
      }

      query = query.order('created_at', { ascending: sortOrder === 'oldest' })

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      if (!data || data.length === 0) {
        alert('No transactions to export')
        return
      }

      // Create CSV content
      const headers = ['Date', 'Type', 'Amount', 'Transaction ID']
      const rows = data.map((tx) => [
        new Date(tx.created_at).toLocaleString(),
        tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        tx.type === 'deposit' ? `+${Number(tx.amount).toLocaleString()} RWF` : `-${Number(tx.amount).toLocaleString()} RWF`,
        tx.id,
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `aidvault-transactions-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Failed to export CSV:', err)
      alert('Failed to export transactions')
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize)
  const hasMore = page < totalPages

  return {
    transactions,
    stats,
    loading,
    error,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasMore,
    setPage,
    setFilter: handleSetFilter,
    setSortOrder: handleSetSortOrder,
    setDateRange: handleSetDateRange,
    refetch: fetchTransactions,
    exportToCSV,
    currentFilter: filter,
    currentSortOrder: sortOrder,
    startDate,
    endDate,
  }
}
