import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Vault, Transaction } from '../types/database'

interface VaultData {
  vault: Vault | null
  transactions: Transaction[]
  totalDonated: number
  loading: boolean
  error: string | null
}

interface UseVaultReturn extends VaultData {
  addFunds: (amount: number) => Promise<{ error: string | null }>
  withdrawFunds: (amount: number) => Promise<{ error: string | null }>
  makeDonation: (customAmount?: number) => Promise<{ error: string | null; donatedAmount?: number }>
  refetch: () => Promise<void>
  isEligibleForDonation: boolean
  daysUntilEligible: number
  monthsUntilEligible: number
  projectedDonation: number
  minimumDonation: number
  savingsStartDate: Date | null
  progressPercentage: number
  currentBalance: number
}

const DONATION_ELIGIBILITY_DAYS = 180 // 6 months
const DONATION_PERCENTAGE = 0.20 // 20%

export function useVault(): UseVaultReturn {
  const { user } = useAuth()
  const [vault, setVault] = useState<Vault | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalDonated, setTotalDonated] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVaultData = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch vault
      const { data: vaultData, error: vaultError } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (vaultError && vaultError.code !== 'PGRST116') {
        throw vaultError
      }

      setVault(vaultData)

      // Fetch recent transactions
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (txError) throw txError
      setTransactions(txData || [])

      // Calculate total donated
      const { data: donationData, error: donationError } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', user.id)
        .eq('type', 'donation')

      if (donationError) throw donationError

      const total = (donationData || []).reduce((sum, d) => sum + Number(d.amount), 0)
      setTotalDonated(total)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vault data')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchVaultData()
  }, [fetchVaultData])

  const addFunds = async (amount: number): Promise<{ error: string | null }> => {
    if (!user || !vault) return { error: 'No vault found' }
    if (amount <= 0) return { error: 'Amount must be positive' }

    try {
      const newBalance = Number(vault.balance) + amount

      // Update vault balance
      const { error: updateError } = await supabase
        .from('vaults')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('id', vault.id)

      if (updateError) throw updateError

      // Record transaction
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'deposit',
          amount: amount,
        })

      if (txError) throw txError

      await fetchVaultData()
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to add funds' }
    }
  }

  const withdrawFunds = async (amount: number): Promise<{ error: string | null }> => {
    if (!user || !vault) return { error: 'No vault found' }
    if (amount <= 0) return { error: 'Amount must be positive' }
    if (amount > Number(vault.balance)) return { error: 'Insufficient balance' }

    try {
      const newBalance = Number(vault.balance) - amount

      const { error: updateError } = await supabase
        .from('vaults')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('id', vault.id)

      if (updateError) throw updateError

      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'withdrawal',
          amount: amount,
        })

      if (txError) throw txError

      await fetchVaultData()
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to withdraw funds' }
    }
  }

  const makeDonation = async (customAmount?: number): Promise<{ error: string | null; donatedAmount?: number }> => {
    if (!user || !vault) return { error: 'No vault found' }
    if (!isEligibleForDonation) return { error: 'Not eligible for donation yet' }

    const minDonation = Number(vault.balance) * DONATION_PERCENTAGE
    const donationAmount = customAmount ?? minDonation

    if (donationAmount < minDonation) {
      return { error: `Minimum donation is ${minDonation.toLocaleString()} RWF (20% of your balance)` }
    }
    if (donationAmount > Number(vault.balance)) {
      return { error: 'Donation amount exceeds your balance' }
    }
    if (donationAmount <= 0) return { error: 'No funds to donate' }

    try {
      const newBalance = Number(vault.balance) - donationAmount
      const now = new Date().toISOString()

      // Update vault balance and reset created_at to start new 6-month cycle
      const { error: updateError } = await supabase
        .from('vaults')
        .update({
          balance: newBalance,
          updated_at: now,
          created_at: now // Reset savings start date for next cycle
        })
        .eq('id', vault.id)

      if (updateError) throw updateError

      // Record donation transaction
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'donation',
          amount: donationAmount,
        })

      if (txError) throw txError

      // Record in donations table
      const { error: donationError } = await supabase
        .from('donations')
        .insert({
          user_id: user.id,
          amount: donationAmount,
        })

      if (donationError) throw donationError

      await fetchVaultData()
      return { error: null, donatedAmount: donationAmount }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to process donation' }
    }
  }

  // Calculate eligibility
  const savingsStartDate = vault ? new Date(vault.created_at) : null
  const now = new Date()

  let daysElapsed = 0
  if (savingsStartDate) {
    daysElapsed = Math.floor((now.getTime() - savingsStartDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const daysUntilEligible = Math.max(0, DONATION_ELIGIBILITY_DAYS - daysElapsed)
  const monthsUntilEligible = Math.floor(daysUntilEligible / 30)
  const remainingDays = daysUntilEligible % 30
  const isEligibleForDonation = daysUntilEligible === 0
  const progressPercentage = Math.min(100, (daysElapsed / DONATION_ELIGIBILITY_DAYS) * 100)
  const currentBalance = vault ? Number(vault.balance) : 0
  const projectedDonation = currentBalance * DONATION_PERCENTAGE
  const minimumDonation = projectedDonation

  return {
    vault,
    transactions,
    totalDonated,
    loading,
    error,
    addFunds,
    withdrawFunds,
    makeDonation,
    refetch: fetchVaultData,
    isEligibleForDonation,
    daysUntilEligible: remainingDays,
    monthsUntilEligible,
    projectedDonation,
    minimumDonation,
    savingsStartDate,
    progressPercentage,
    currentBalance,
  }
}
