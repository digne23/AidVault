import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations
import enCommon from './locales/en/common.json'
import enNav from './locales/en/nav.json'
import enLanding from './locales/en/landing.json'
import enAuth from './locales/en/auth.json'
import enAbout from './locales/en/about.json'
import enHowItWorks from './locales/en/howItWorks.json'
import enMission from './locales/en/mission.json'
import enDashboard from './locales/en/dashboard.json'
import enVault from './locales/en/vault.json'
import enDonate from './locales/en/donate.json'
import enAddFunds from './locales/en/addFunds.json'
import enHistory from './locales/en/history.json'
import enSettings from './locales/en/settings.json'
import enComponents from './locales/en/components.json'
import enFooter from './locales/en/footer.json'
import enErrors from './locales/en/errors.json'

// Kinyarwanda translations
import rwCommon from './locales/rw/common.json'
import rwNav from './locales/rw/nav.json'
import rwLanding from './locales/rw/landing.json'
import rwAuth from './locales/rw/auth.json'
import rwAbout from './locales/rw/about.json'
import rwHowItWorks from './locales/rw/howItWorks.json'
import rwMission from './locales/rw/mission.json'
import rwDashboard from './locales/rw/dashboard.json'
import rwVault from './locales/rw/vault.json'
import rwDonate from './locales/rw/donate.json'
import rwAddFunds from './locales/rw/addFunds.json'
import rwHistory from './locales/rw/history.json'
import rwSettings from './locales/rw/settings.json'
import rwComponents from './locales/rw/components.json'
import rwFooter from './locales/rw/footer.json'
import rwErrors from './locales/rw/errors.json'

// French translations
import frCommon from './locales/fr/common.json'
import frNav from './locales/fr/nav.json'
import frLanding from './locales/fr/landing.json'
import frAuth from './locales/fr/auth.json'
import frAbout from './locales/fr/about.json'
import frHowItWorks from './locales/fr/howItWorks.json'
import frMission from './locales/fr/mission.json'
import frDashboard from './locales/fr/dashboard.json'
import frVault from './locales/fr/vault.json'
import frDonate from './locales/fr/donate.json'
import frAddFunds from './locales/fr/addFunds.json'
import frHistory from './locales/fr/history.json'
import frSettings from './locales/fr/settings.json'
import frComponents from './locales/fr/components.json'
import frFooter from './locales/fr/footer.json'
import frErrors from './locales/fr/errors.json'

const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    landing: enLanding,
    auth: enAuth,
    about: enAbout,
    howItWorks: enHowItWorks,
    mission: enMission,
    dashboard: enDashboard,
    vault: enVault,
    donate: enDonate,
    addFunds: enAddFunds,
    history: enHistory,
    settings: enSettings,
    components: enComponents,
    footer: enFooter,
    errors: enErrors,
  },
  rw: {
    common: rwCommon,
    nav: rwNav,
    landing: rwLanding,
    auth: rwAuth,
    about: rwAbout,
    howItWorks: rwHowItWorks,
    mission: rwMission,
    dashboard: rwDashboard,
    vault: rwVault,
    donate: rwDonate,
    addFunds: rwAddFunds,
    history: rwHistory,
    settings: rwSettings,
    components: rwComponents,
    footer: rwFooter,
    errors: rwErrors,
  },
  fr: {
    common: frCommon,
    nav: frNav,
    landing: frLanding,
    auth: frAuth,
    about: frAbout,
    howItWorks: frHowItWorks,
    mission: frMission,
    dashboard: frDashboard,
    vault: frVault,
    donate: frDonate,
    addFunds: frAddFunds,
    history: frHistory,
    settings: frSettings,
    components: frComponents,
    footer: frFooter,
    errors: frErrors,
  },
}

// Get saved language from localStorage
const getSavedLanguage = (): string => {
  try {
    const saved = localStorage.getItem('aidvault-preferences')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.language && ['en', 'rw', 'fr'].includes(parsed.language)) {
        return parsed.language
      }
    }
  } catch {
    // Ignore parsing errors
  }
  return 'en'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: [
      'common',
      'nav',
      'landing',
      'auth',
      'about',
      'howItWorks',
      'mission',
      'dashboard',
      'vault',
      'donate',
      'addFunds',
      'history',
      'settings',
      'components',
      'footer',
      'errors',
    ],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: true,
    },
    detection: {
      order: ['localStorage'],
      caches: [],
    },
  })

export default i18n
