import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVault } from '../../hooks/useVault'
import { useToast } from '../../contexts/ToastContext'
import { ButtonSpinner } from '../../components/LoadingSpinner'
import ImpactCalculator from '../../components/ImpactCalculator'

const PRESET_AMOUNTS = [100000, 200000, 500000, 1000000, 2500000, 5000000]

const PAYMENT_METHODS = [
  {
    id: 'momo',
    name: 'MTN Mobile Money',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'card',
    name: 'Debit/Credit Card',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600',
  },
]

export default function AddFunds() {
  const { t } = useTranslation('addFunds')
  const navigate = useNavigate()
  const toast = useToast()
  const { addFunds, currentBalance } = useVault()

  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'amount' | 'payment' | 'confirm'>('amount')

  const numAmount = parseFloat(amount) || 0
  const projectedDonation = numAmount * 0.2

  const handlePresetClick = (preset: number) => {
    setAmount(preset.toString())
  }

  const handleContinueToPayment = () => {
    if (numAmount < 100000) {
      toast.warning(t('minimumAmountWarning'), t('minimumAmountWarning'))
      return
    }
    setStep('payment')
  }

  const handleSelectPayment = (methodId: string) => {
    setSelectedMethod(methodId)
    setStep('confirm')
  }

  const handleConfirmPayment = async () => {
    if (!selectedMethod) return

    setLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const { error } = await addFunds(numAmount)

    if (error) {
      toast.error(t('paymentFailed'), error)
      setLoading(false)
      return
    }

    toast.success(t('fundsAdded'), t('fundsAddedDesc', { amount: numAmount.toLocaleString() }))
    setLoading(false)
    navigate('/user/vault')
  }

  const handleBack = () => {
    if (step === 'payment') setStep('amount')
    else if (step === 'confirm') setStep('payment')
  }

  const getPaymentMethodName = (methodId: string) => {
    const methodKey = methodId as 'momo' | 'airtel' | 'bank' | 'card'
    return t(`paymentMethods.${methodKey}`)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/user/vault"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToVault')}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('currentBalance', { amount: currentBalance.toLocaleString() })}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step === 'amount' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === 'amount' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t('stepAmount')}</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 mx-2 ${step !== 'amount' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`flex items-center ${step === 'payment' ? 'text-emerald-600 dark:text-emerald-400' : step === 'confirm' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === 'payment' ? 'bg-emerald-600 text-white' :
                step === 'confirm' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t('stepPayment')}</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 mx-2 ${step === 'confirm' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`flex items-center ${step === 'confirm' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === 'confirm' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t('stepConfirm')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Amount */}
            {step === 'amount' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('howMuchToAdd')}</h2>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('enterAmount')}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-4 pr-20 py-4 text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0"
                      min="100000"
                      step="1000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg font-medium">
                      RWF
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('minimumDeposit')}</p>
                </div>

                {/* Preset Amounts */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t('quickSelect')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                          amount === preset.toString()
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 scale-105'
                            : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {preset >= 1000000
                          ? `${(preset / 1000000).toFixed(preset % 1000000 === 0 ? 0 : 1)}M`
                          : `${(preset / 1000).toFixed(0)}K`
                        }
                      </button>
                    ))}
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinueToPayment}
                  disabled={numAmount < 100000}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {t('continueToPayment')}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 'payment' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('selectPaymentMethod')}</h2>
                </div>

                <div className="space-y-4">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleSelectPayment(method.id)}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all flex items-center"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mr-4`}>
                        {method.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">{getPaymentMethodName(method.id)}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('instantTransfer')}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 'confirm' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('confirmYourDeposit')}</h2>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t('amount')}</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{numAmount.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t('paymentMethod')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedMethod && getPaymentMethodName(selectedMethod)}
                      </span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t('newBalance')}</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {(currentBalance + numAmount).toLocaleString()} RWF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {t('depositInfo', { amount: projectedDonation.toLocaleString() })}
                    </p>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ButtonSpinner className="mr-2" />
                      {t('processingPayment')}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('confirmAndAdd', { amount: numAmount.toLocaleString() })}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deposit Summary Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">{t('depositSummary')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-emerald-100">{t('amount')}</span>
                  <span className="font-bold">{numAmount.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">{t('youKeep')}</span>
                  <span className="font-semibold">{(numAmount * 0.8).toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">{t('forChildren')}</span>
                  <span className="font-semibold">{projectedDonation.toLocaleString()} RWF</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between">
                  <span className="text-emerald-100">{t('newBalance')}</span>
                  <span className="text-xl font-bold">{(currentBalance + numAmount).toLocaleString()} RWF</span>
                </div>
              </div>
            </div>

            {/* Impact Preview */}
            {numAmount >= 100000 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('yourPotentialImpact')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('potentialImpactDesc', { amount: projectedDonation.toLocaleString() })}
                </p>
                <ImpactCalculator amount={projectedDonation} mode="compact" />
              </div>
            )}

            {/* Security Badge */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('securePayment')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('sslEncryption')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
