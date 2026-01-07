import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

interface MonthlyDonation {
  month: string
  amount: number
}

interface GrowthData {
  date: string
  totalDonations: number
  totalUsers: number
}

interface DonationDistribution {
  range: string
  count: number
  percentage: number
}

interface RecentDonation {
  id: string
  amount: number
  createdAt: Date
  timeAgo: string
  donorName: string
}

interface ImpactMetrics {
  schoolSupplies: number
  tuitionMonths: number
  childrenSupported: number
}

interface PlatformStats {
  totalDonated: number
  totalSavings: number
  activeSavers: number
  completedDonations: number
  monthlyDonations: MonthlyDonation[]
  growthData: GrowthData[]
  donationDistribution: DonationDistribution[]
  recentDonations: RecentDonation[]
  impactMetrics: ImpactMetrics
  lastUpdated: Date
  loading: boolean
  error: string | null
}

// Cost estimates for impact calculations (in RWF)
const SCHOOL_SUPPLIES_COST = 65000 // 65,000 RWF per set of supplies
const TUITION_MONTH_COST = 97500 // 97,500 RWF per month of tuition
const CHILD_SUPPORT_COST = 260000 // 260,000 RWF to fully support a child for a semester

// Generate placeholder data for demonstration
function generatePlaceholderData(): Omit<PlatformStats, 'loading' | 'error'> {
  const now = new Date()

  // Generate last 12 months of donation data
  const monthlyDonations: MonthlyDonation[] = []
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    // Simulate growth trend with some variation
    const baseAmount = 150000 + (11 - i) * 25000
    const variation = Math.random() * 50000 - 25000
    monthlyDonations.push({
      month: monthName,
      amount: Math.round(baseAmount + variation),
    })
  }

  // Generate growth data (cumulative)
  const growthData: GrowthData[] = []
  let cumulativeDonations = 0
  let cumulativeUsers = 100
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    cumulativeDonations += monthlyDonations[11 - i].amount
    cumulativeUsers += Math.floor(Math.random() * 150) + 50
    growthData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      totalDonations: cumulativeDonations,
      totalUsers: cumulativeUsers,
    })
  }

  // Donation distribution
  const donationDistribution: DonationDistribution[] = [
    { range: '1K-65K RWF', count: 485, percentage: 35 },
    { range: '65K-130K RWF', count: 412, percentage: 30 },
    { range: '130K-650K RWF', count: 345, percentage: 25 },
    { range: '650K+ RWF', count: 138, percentage: 10 },
  ]

  // Recent donations (in RWF) with Rwandan donor names
  const recentDonations: RecentDonation[] = []
  const donationAmounts = [32500, 65000, 130000, 97500, 195000, 260000, 58500, 104000, 162500, 390000]
  const donorNames = [
    'Nshuti Daniel',
    'Uwayezu Michael',
    'Mugisha Samuel',
    'Nsengiyumva Joseph',
    'Habimana David',
    'Niyonzima Paul',
    'Bizimana John',
    'Nkurunziza Peter',
    'Manirakiza Andrew',
    'Habyarimana Thomas',
  ]
  for (let i = 0; i < 10; i++) {
    const minutesAgo = Math.floor(Math.random() * 1440) // Random time in last 24 hours
    const donationTime = new Date(now.getTime() - minutesAgo * 60 * 1000)
    recentDonations.push({
      id: `donation-${i}`,
      amount: donationAmounts[i],
      createdAt: donationTime,
      timeAgo: getTimeAgo(donationTime),
      donorName: donorNames[i],
    })
  }
  recentDonations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  // Calculate totals (in RWF)
  const totalDonated = 373685000
  const totalSavings = 203216000
  const activeSavers = 2547
  const completedDonations = 1380

  // Impact metrics based on total donated
  const impactMetrics: ImpactMetrics = {
    schoolSupplies: Math.floor(totalDonated / SCHOOL_SUPPLIES_COST),
    tuitionMonths: Math.floor(totalDonated / TUITION_MONTH_COST),
    childrenSupported: Math.floor(totalDonated / CHILD_SUPPORT_COST),
  }

  return {
    totalDonated,
    totalSavings,
    activeSavers,
    completedDonations,
    monthlyDonations,
    growthData,
    donationDistribution,
    recentDonations,
    impactMetrics,
    lastUpdated: now,
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
}

export function usePlatformStats(): PlatformStats & { refetch: () => Promise<void> } {
  const [stats, setStats] = useState<Omit<PlatformStats, 'loading' | 'error'>>(() =>
    generatePlaceholderData()
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const now = new Date()
      const placeholder = generatePlaceholderData()

      // Fetch demo donations from Supabase (for public dashboard display)
      const { data: demoDonations, error: demoError } = await supabase
        .from('demo_donations')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch platform stats
      const { data: platformStats } = await supabase
        .from('platform_stats')
        .select('*')
        .eq('id', 1)
        .single()

      // Fetch real vaults for savings total
      const { data: vaultsData } = await supabase
        .from('vaults')
        .select('balance')

      if (!demoError && demoDonations && demoDonations.length > 0) {
        // Calculate totals from demo_donations
        const totalDonated = demoDonations.reduce((sum, d) => sum + Number(d.amount), 0)
        const realTotalSavings = vaultsData?.reduce((sum, v) => sum + Number(v.balance), 0) || 0

        // Calculate monthly donations from demo data
        const monthlyMap = new Map<string, number>()
        demoDonations.forEach((d) => {
          const date = new Date(d.created_at)
          const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
          monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + Number(d.amount))
        })

        // Build monthly donations array
        const monthlyDonations: MonthlyDonation[] = []
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
          monthlyDonations.push({
            month: monthKey,
            amount: monthlyMap.get(monthKey) || 0,
          })
        }

        // Recent donations from demo_donations
        const recentDonations: RecentDonation[] = demoDonations.slice(0, 10).map((d, i) => ({
          id: d.id || `demo-donation-${i}`,
          amount: Number(d.amount),
          createdAt: new Date(d.created_at),
          timeAgo: getTimeAgo(new Date(d.created_at)),
          donorName: d.donor_name || 'Anonymous',
        }))

        // Impact metrics
        const impactMetrics: ImpactMetrics = {
          schoolSupplies: Math.floor(totalDonated / SCHOOL_SUPPLIES_COST),
          tuitionMonths: Math.floor(totalDonated / TUITION_MONTH_COST),
          childrenSupported: Math.floor(totalDonated / CHILD_SUPPORT_COST),
        }

        // Donation distribution from demo data
        const distributionRanges = [
          { range: '30K-65K RWF', min: 30000, max: 65000 },
          { range: '65K-130K RWF', min: 65000, max: 130000 },
          { range: '130K-300K RWF', min: 130000, max: 300000 },
          { range: '300K+ RWF', min: 300000, max: Infinity },
        ]
        const donationDistribution: DonationDistribution[] = distributionRanges.map((range) => {
          const count = demoDonations.filter(
            (d) => Number(d.amount) >= range.min && Number(d.amount) < range.max
          ).length
          return {
            range: range.range,
            count,
            percentage: Math.round((count / demoDonations.length) * 100),
          }
        })

        setStats({
          totalDonated: platformStats?.total_donated || totalDonated,
          totalSavings: platformStats?.total_savings || realTotalSavings || placeholder.totalSavings,
          activeSavers: platformStats?.total_users || vaultsData?.length || placeholder.activeSavers,
          completedDonations: demoDonations.length,
          monthlyDonations,
          growthData: placeholder.growthData,
          donationDistribution,
          recentDonations,
          impactMetrics,
          lastUpdated: now,
        })
      } else {
        // Fallback to placeholder data if no demo donations
        setStats(generatePlaceholderData())
      }
    } catch (err) {
      // On error, still show placeholder data
      console.error('Failed to fetch platform stats:', err)
      setStats(generatePlaceholderData())
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchStats])

  // Update timeAgo for recent donations periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        recentDonations: prev.recentDonations.map((d) => ({
          ...d,
          timeAgo: getTimeAgo(d.createdAt),
        })),
      }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return {
    ...stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
