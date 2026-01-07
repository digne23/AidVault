import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface PartnerWithLogo {
  name: string
  logo: string
  website: string
  description: string
}

interface PartnerWithAbbrev {
  name: string
  abbrev: string
  color: string
  textColor?: string
  website: string
  description: string
}

type Partner = PartnerWithLogo | PartnerWithAbbrev

function isPartnerWithLogo(partner: Partner): partner is PartnerWithLogo {
  return 'logo' in partner
}

// Styled logo component for partners with abbreviations
function AbbrevLogo({ abbrev, color, textColor = '#FFFFFF' }: { abbrev: string; color: string; textColor?: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-lg"
      style={{ backgroundColor: color }}
    >
      <span
        className="font-bold text-center leading-tight"
        style={{
          color: textColor,
          fontSize: abbrev.length > 5 ? '0.75rem' : abbrev.length > 3 ? '0.875rem' : '1.125rem'
        }}
      >
        {abbrev}
      </span>
    </div>
  )
}

// Image logo component with error handling
function ImageLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain p-2"
      loading="lazy"
    />
  )
}

// Partner logo component - simple logo display
function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
      title={partner.name}
    >
      <div className="w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28">
        {isPartnerWithLogo(partner) ? (
          <ImageLogo src={partner.logo} alt={partner.name} />
        ) : (
          <AbbrevLogo abbrev={partner.abbrev} color={partner.color} textColor={partner.textColor} />
        )}
      </div>
    </a>
  )
}

// Partners data
const financialPartners: Partner[] = [
  {
    name: 'Bank of Kigali',
    logo: '/partners/bank-of-kigali.png',
    website: 'https://www.bk.rw',
    description: "Rwanda's leading commercial bank supporting financial inclusion initiatives.",
  },
  {
    name: 'Equity Bank',
    logo: '/partners/equity.png',
    website: 'https://www.equitybankgroup.com',
    description: 'Regional banking partner enabling secure savings and microfinance services.',
  },
  {
    name: 'I&M Bank',
    logo: '/partners/im-bank.png',
    website: 'https://www.imbank.com',
    description: 'Commercial bank providing secure fund management and transactions.',
  },
  {
    name: 'World Bank',
    logo: '/partners/worldbank1.png',
    website: 'https://www.worldbank.org',
    description: 'International financial institution supporting education investments.',
  },
  {
    name: 'African Development Bank',
    logo: '/partners/afdb1.png',
    website: 'https://www.afdb.org',
    description: 'Continental bank financing education infrastructure projects.',
  },
]

const techPartners: Partner[] = [
  {
    name: 'MTN Rwanda',
    logo: '/partners/mtn.png',
    website: 'https://www.mtn.co.rw',
    description: 'Mobile money partner enabling seamless MoMo transactions.',
  },
  {
    name: 'Airtel Rwanda',
    logo: '/partners/airtelrw.png',
    website: 'https://www.airtel.co.rw',
    description: 'Telecommunications partner expanding Airtel Money accessibility.',
  },
  {
    name: 'Visa',
    logo: '/partners/visacard.png',
    website: 'https://www.visa.com',
    description: 'International payment network for cross-border donations.',
  },
  {
    name: 'Mastercard Foundation',
    logo: '/partners/mastercard.png',
    website: 'https://mastercardfdn.org',
    description: 'Global payment technology enabling secure transactions.',
  },
]

const ngoPartners: Partner[] = [
  {
    name: 'UNICEF',
    logo: '/partners/unicef.png',
    website: 'https://www.unicef.org',
    description: "UN children's agency supporting education and child welfare.",
  },
  {
    name: 'USAID',
    logo: '/partners/usaid1.png',
    website: 'https://www.usaid.gov',
    description: 'U.S. agency supporting education and economic growth.',
  },
  {
    name: 'UK FCDO',
    logo: '/partners/fcdo1.png',
    website: 'https://www.gov.uk/fcdo',
    description: 'UK Foreign Office supporting education initiatives.',
  },
  {
    name: 'GIZ',
    logo: '/partners/giz.png',
    website: 'https://www.giz.de',
    description: 'German agency supporting vocational training and education.',
  },
  {
    name: 'Save the Children',
    logo: '/partners/sc.png',
    website: 'https://www.savethechildren.org',
    description: 'Global NGO focused on child welfare and education.',
  },
  {
    name: 'World Vision',
    logo: '/partners/world-vision.png',
    website: 'https://www.worldvision.org',
    description: 'Humanitarian organization supporting community development.',
  },
]

const govPartners: Partner[] = [
  {
    name: 'MINEDUC',
    logo: '/partners/mineduc.png',
    website: 'https://www.mineduc.gov.rw',
    description: 'Ministry of Education ensuring national policy alignment.',
  },
  {
    name: 'RISA',
    logo: '/partners/risa.png',
    website: 'https://www.risa.rw',
    description: 'Rwanda Information Society Authority - digital transformation.',
  },
  {
    name: 'RDB',
    logo: '/partners/rdb.png',
    website: 'https://www.rdb.rw',
    description: 'Rwanda Development Board supporting innovation.',
  },
]

const partnerCategories = [
  { key: 'financial', label: 'Financial & Development Partners', partners: financialPartners, color: 'emerald' },
  { key: 'tech', label: 'Technology Partners', partners: techPartners, color: 'blue' },
  { key: 'ngo', label: 'NGO & Humanitarian Partners', partners: ngoPartners, color: 'pink' },
  { key: 'gov', label: 'Government Partners', partners: govPartners, color: 'amber' },
]

// All partners for the logo grid
const allPartners = [...financialPartners, ...techPartners, ...ngoPartners, ...govPartners]

export default function Partners() {
  const { t } = useTranslation('partners')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">{allPartners.length}+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('stats.activePartners')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">4</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('stats.sectorsCovered')}</p>
            </div>
            <div>
              <Link to="/partner-countries" className="block hover:opacity-80 transition-opacity">
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">18</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('stats.partnerCountries')}</p>
              </Link>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">5</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('stats.yearsCollaboration')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Partners - Single Display */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {allPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 hover:scale-110 transition-transform duration-300"
                title={partner.name}
              >
                {isPartnerWithLogo(partner) ? (
                  <ImageLogo src={partner.logo} alt={partner.name} />
                ) : (
                  <AbbrevLogo abbrev={partner.abbrev} color={partner.color} textColor={partner.textColor} />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Countries CTA */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('globalReach.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('globalReach.description')}
          </p>
          <Link
            to="/partner-countries"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('globalReach.viewCountries')}
          </Link>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t('becomePartner.title')}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            {t('becomePartner.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partners@aidvault.org"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('becomePartner.contactUs')}
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500/20 text-white font-medium rounded-lg border border-white/30 hover:bg-emerald-500/30 transition-colors"
            >
              {t('becomePartner.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
