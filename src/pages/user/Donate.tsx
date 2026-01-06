import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVault } from '../../hooks/useVault'
import ImpactCalculator from '../../components/ImpactCalculator'
import { InlineError } from '../../components/ErrorBoundary'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useToast } from '../../contexts/ToastContext'

export default function Donate() {
  const { t } = useTranslation('donate')
  const {
    loading,
    error,
    isEligibleForDonation,
    daysUntilEligible,
    monthsUntilEligible,
    currentBalance,
    minimumDonation,
    progressPercentage,
    makeDonation,
  } = useVault()

  const toast = useToast()
  const [donationAmount, setDonationAmount] = useState('')
  const [useCustomAmount, setUseCustomAmount] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [donationError, setDonationError] = useState<string | null>(null)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [finalDonatedAmount, setFinalDonatedAmount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  // Set initial donation amount to minimum (20%)
  useEffect(() => {
    if (minimumDonation > 0 && !donationAmount) {
      setDonationAmount(minimumDonation.toFixed(2))
    }
  }, [minimumDonation, donationAmount])

  const effectiveDonationAmount = useCustomAmount
    ? parseFloat(donationAmount) || 0
    : minimumDonation

  const handleDonate = async () => {
    if (!confirmed) {
      const msg = t('confirmationRequired')
      setDonationError(msg)
      toast.warning(t('confirmationRequired'), msg)
      return
    }

    if (effectiveDonationAmount < minimumDonation) {
      const msg = t('invalidAmount', { amount: minimumDonation.toLocaleString() })
      setDonationError(msg)
      toast.error(t('invalidAmount', { amount: minimumDonation.toLocaleString() }), msg)
      return
    }

    setProcessing(true)
    setDonationError(null)

    const { error, donatedAmount } = await makeDonation(
      useCustomAmount ? effectiveDonationAmount : undefined
    )

    if (error) {
      setDonationError(error)
      toast.error(error, error)
      setProcessing(false)
      return
    }

    const finalAmount = donatedAmount || effectiveDonationAmount
    setFinalDonatedAmount(finalAmount)
    setDonationSuccess(true)
    setShowConfetti(true)
    setProcessing(false)
    toast.success(t('thankYou'), t('makingRealDifference'))

    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">{t('loadingDonationDetails')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InlineError
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  // Success State
  if (donationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: ['#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6'][
                      Math.floor(Math.random() * 5)
                    ],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('thankYou')}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('makingRealDifference')}
            </p>

            {/* Impact Calculator */}
            <ImpactCalculator amount={finalDonatedAmount} mode="expanded" className="mb-8 text-left" />

            {/* New Cycle Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-8">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {t('cycleReset')}
              </p>
            </div>

            {/* Share Buttons (Optional) */}
            <div className="flex justify-center gap-3 mb-8">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                {t('share')}
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {t('copyLink')}
              </button>
            </div>

            <Link
              to="/user/vault"
              className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              {t('returnToVault')}
            </Link>
          </div>
        </div>

        {/* Add confetti animation styles */}
        <style>{`
          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti-fall linear forwards;
          }
          .animate-bounce-slow {
            animation: bounce 2s infinite;
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(-5%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateY(0);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
        `}</style>
      </div>
    )
  }

  // Not Eligible State
  if (!isEligibleForDonation) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
            {/* Clock Icon */}
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('almostThere')}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('notYetEligible')}
            </p>

            {/* Time Remaining */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 mb-6">
              <p className="text-amber-800 dark:text-amber-300 text-lg font-medium">
                {monthsUntilEligible > 0
                  ? t('timeUntilDonate', { months: monthsUntilEligible, days: daysUntilEligible })
                  : t('daysUntilDonate', { days: daysUntilEligible })}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{t('progress')}</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Current Savings & Projected Donation */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('currentSavings')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentBalance.toLocaleString()} RWF</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{t('projectedDonation')}</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{minimumDonation.toLocaleString()} RWF</p>
              </div>
            </div>

            <Link
              to="/user/vault"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              {t('backToVault')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Eligible - Donation Form
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('congratulations')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('reachedMilestone')}
          </p>
        </div>

        {/* Commitment Explanation */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {t('commitmentExplanation')}
            </p>
          </div>
        </div>

        {/* Donation Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('donationSummary')}</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('yourVaultBalance')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentBalance.toLocaleString()} RWF</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{t('minimumDonation')}</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{minimumDonation.toLocaleString()} RWF</p>
            </div>
          </div>

          {/* Custom Amount Option */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={useCustomAmount}
                onChange={(e) => {
                  setUseCustomAmount(e.target.checked)
                  if (e.target.checked) {
                    setDonationAmount(minimumDonation.toFixed(2))
                  }
                }}
                className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t('donateMoreOption')}</span>
            </label>

            {useCustomAmount && (
              <div className="relative">
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min={minimumDonation}
                  max={currentBalance}
                  step="1"
                  className="block w-full pl-4 pr-16 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">RWF</span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {t('minMaxRange', { min: minimumDonation.toLocaleString(), max: currentBalance.toLocaleString() })}
                </p>
              </div>
            )}
          </div>

          {/* After Donation Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t('afterDonationKeep')}</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {(currentBalance - effectiveDonationAmount).toLocaleString()} RWF
              </span>
            </div>
          </div>
        </div>

        {/* Impact Preview */}
        <ImpactCalculator
          amount={effectiveDonationAmount}
          mode="expanded"
          title={t('whatYourDonationCanAchieve')}
          className="mb-6"
        />

        {/* Confirmation Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked)
                if (e.target.checked) setDonationError(null)
              }}
              className="w-5 h-5 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 mt-0.5"
            />
            <span className="ml-3 text-gray-700 dark:text-gray-300">
              {t('confirmationText', { amount: effectiveDonationAmount.toLocaleString() })}
            </span>
          </label>
        </div>

        {/* Error Display */}
        {donationError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{donationError}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDonate}
            disabled={processing || !confirmed}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
          >
            {processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('processingDonation')}
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {t('completeDonation', { amount: effectiveDonationAmount.toLocaleString() })}
              </>
            )}
          </button>

          <Link
            to="/user/vault"
            className="py-4 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center"
          >
            {t('cancel')}
          </Link>
        </div>
      </div>
    </div>
  )
}
