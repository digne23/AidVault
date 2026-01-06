import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Theme = 'light' | 'dark'
type Currency = 'RWF' | 'USD' | 'EUR'
type Language = 'en' | 'rw' | 'fr'

interface Preferences {
  theme: Theme
  currency: Currency
  language: Language
}

interface PreferencesContextType {
  preferences: Preferences
  setTheme: (theme: Theme) => void
  setCurrency: (currency: Currency) => void
  setLanguage: (language: Language) => void
  formatCurrency: (amount: number) => string
}

const defaultPreferences: Preferences = {
  theme: 'light',
  currency: 'RWF',
  language: 'en',
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

// Exchange rates (approximate - in production you'd fetch these from an API)
const exchangeRates: Record<Currency, number> = {
  RWF: 1,
  USD: 0.00076, // 1 RWF = 0.00076 USD (approximate)
  EUR: 0.00070, // 1 RWF = 0.00070 EUR (approximate)
}

const currencySymbols: Record<Currency, string> = {
  RWF: 'RWF',
  USD: '$',
  EUR: '€',
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()

  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage.getItem('aidvault-preferences')
    if (saved) {
      try {
        return { ...defaultPreferences, ...JSON.parse(saved) }
      } catch {
        return defaultPreferences
      }
    }
    return defaultPreferences
  })

  // Apply theme to document
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [preferences.theme])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('aidvault-preferences', JSON.stringify(preferences))
  }, [preferences])

  // Sync i18next language with preferences
  useEffect(() => {
    if (i18n.language !== preferences.language) {
      i18n.changeLanguage(preferences.language)
    }
  }, [preferences.language, i18n])

  const setTheme = (theme: Theme) => {
    setPreferences(prev => ({ ...prev, theme }))
  }

  const setCurrency = (currency: Currency) => {
    setPreferences(prev => ({ ...prev, currency }))
  }

  const setLanguage = (language: Language) => {
    setPreferences(prev => ({ ...prev, language }))
    i18n.changeLanguage(language)
  }

  const formatCurrency = (amount: number): string => {
    const { currency } = preferences
    const convertedAmount = amount * exchangeRates[currency]

    if (currency === 'RWF') {
      return `${Math.round(convertedAmount).toLocaleString()} RWF`
    }

    return `${currencySymbols[currency]}${convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setTheme,
        setCurrency,
        setLanguage,
        formatCurrency,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
}
