import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../contexts/ToastContext'
import { ButtonSpinner } from './LoadingSpinner'

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFunds: (amount: number) => Promise<{ error: string | null }>
  currentBalance: number
}

const PRESET_AMOUNTS = [100000, 200000, 500000, 1000000, 2500000, 5000000]

export default function AddFundsModal({ isOpen, onClose, onAddFunds, currentBalance }: AddFundsModalProps) {
  const { t } = useTranslation('components')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const toast = useToast()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError(t('addFundsModal.invalidAmount'))
      toast.warning(t('addFundsModal.invalidAmount'), t('addFundsModal.invalidAmount'))
      return
    }

    setLoading(true)
    const { error: addError } = await onAddFunds(numAmount)

    if (addError) {
      setError(addError)
      toast.error(t('addFundsModal.failedToAdd'), addError)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    toast.success(t('addFundsModal.fundsAdded'), t('addFundsModal.fundsAddedDesc', { amount: numAmount.toLocaleString() }))

    setTimeout(() => {
      setSuccess(false)
      setAmount('')
      onClose()
    }, 1500)
  }

  const handlePresetClick = (preset: number) => {
    setAmount(preset.toString())
  }

  const handleClose = () => {
    setAmount('')
    setError(null)
    setSuccess(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('addFundsModal.fundsAdded')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{t('addFundsModal.fundsAddedDesc', { amount: Number(amount).toLocaleString() })}</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('addFundsModal.title')}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t('addFundsModal.currentBalance')} {currentBalance.toLocaleString()} RWF
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('addFundsModal.amount')}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-4 pr-16 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                      min="1"
                      step="1"
                      disabled={loading}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                      RWF
                    </span>
                  </div>
                </div>

                {/* Preset Amounts */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('addFundsModal.quickSelect')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                          amount === preset.toString()
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700 text-gray-700 dark:text-gray-300'
                        }`}
                        disabled={loading}
                      >
                        {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {t('addFundsModal.donationInfo')}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !amount}
                  className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ButtonSpinner className="mr-2" />
                      {t('addFundsModal.processing')}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {t('addFundsModal.addAmount', { amount: amount ? Number(amount).toLocaleString() : '0' })}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
