import { Link } from 'react-router-dom'

interface Country {
  name: string
  flag: string
  region: 'africa' | 'europe' | 'americas' | 'asia'
  partnerTypes: string[]
  description: string
}

const countries: Country[] = [
  // Africa
  {
    name: 'Rwanda',
    flag: '🇷🇼',
    region: 'africa',
    partnerTypes: ['Financial', 'Technology', 'Government', 'NGO'],
    description: 'Our home country and primary focus, with extensive partnerships across all sectors.',
  },
  {
    name: 'Kenya',
    flag: '🇰🇪',
    region: 'africa',
    partnerTypes: ['Financial', 'Technology'],
    description: 'Regional banking partnerships including Equity Bank supporting East African expansion.',
  },
  {
    name: 'Uganda',
    flag: '🇺🇬',
    region: 'africa',
    partnerTypes: ['Technology', 'NGO'],
    description: 'Cross-border mobile money partnerships and NGO collaboration.',
  },
  {
    name: 'Tanzania',
    flag: '🇹🇿',
    region: 'africa',
    partnerTypes: ['Technology'],
    description: 'Telecommunications partnerships for mobile payment infrastructure.',
  },
  {
    name: 'South Africa',
    flag: '🇿🇦',
    region: 'africa',
    partnerTypes: ['Financial', 'Technology'],
    description: 'Financial technology partnerships and payment processing support.',
  },
  {
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'africa',
    partnerTypes: ['Technology'],
    description: 'Fintech collaboration and digital payment solutions.',
  },
  // Europe
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'europe',
    partnerTypes: ['Development', 'NGO'],
    description: 'UK FCDO development support and Save the Children partnership.',
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    region: 'europe',
    partnerTypes: ['Development'],
    description: 'GIZ partnership for vocational training and education programs.',
  },
  {
    name: 'Belgium',
    flag: '🇧🇪',
    region: 'europe',
    partnerTypes: ['NGO', 'Development'],
    description: 'European Union development initiatives and educational support.',
  },
  {
    name: 'Netherlands',
    flag: '🇳🇱',
    region: 'europe',
    partnerTypes: ['NGO'],
    description: 'Dutch NGO partnerships focused on sustainable development.',
  },
  {
    name: 'Switzerland',
    flag: '🇨🇭',
    region: 'europe',
    partnerTypes: ['NGO', 'Financial'],
    description: 'Humanitarian organizations and financial institution partnerships.',
  },
  // Americas
  {
    name: 'United States',
    flag: '🇺🇸',
    region: 'americas',
    partnerTypes: ['Development', 'Technology', 'NGO'],
    description: 'USAID, Mastercard Foundation, Visa, and World Vision partnerships.',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    region: 'americas',
    partnerTypes: ['NGO', 'Development'],
    description: 'Canadian international development and NGO support.',
  },
  // Asia & International
  {
    name: 'Japan',
    flag: '🇯🇵',
    region: 'asia',
    partnerTypes: ['Development'],
    description: 'JICA development cooperation and educational infrastructure support.',
  },
  {
    name: 'China',
    flag: '🇨🇳',
    region: 'asia',
    partnerTypes: ['Technology', 'Development'],
    description: 'Technology partnerships and development cooperation initiatives.',
  },
]

const regions = [
  { key: 'africa', label: 'Africa', color: 'emerald' },
  { key: 'europe', label: 'Europe', color: 'blue' },
  { key: 'americas', label: 'Americas', color: 'pink' },
  { key: 'asia', label: 'Asia', color: 'amber' },
]

export default function PartnerCountries() {
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'africa':
        return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      case 'europe':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'americas':
        return 'bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800'
      case 'asia':
        return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800'
    }
  }

  const getRegionStats = (regionKey: string) => {
    return countries.filter((c) => c.region === regionKey).length
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Partner Countries
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Our global network spans {countries.length} countries across 4 continents,
            uniting diverse expertise to transform education in Rwanda.
          </p>
        </div>
      </section>

      {/* Region Stats */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {regions.map((region) => (
              <div
                key={region.key}
                className={`text-center p-6 rounded-xl border ${getRegionColor(region.key)}`}
              >
                <p className="text-3xl sm:text-4xl font-bold">{getRegionStats(region.key)}</p>
                <p className="text-sm mt-1 opacity-80">{region.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Flags - Single Display */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Our Partner Countries
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14">
            {countries.map((country) => (
              <div
                key={country.name}
                className="flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-default"
                title={country.name}
              >
                <span className="text-6xl sm:text-7xl md:text-8xl">
                  {country.flag}
                </span>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-3 font-medium">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headquarters Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block">🇷🇼</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Headquartered in Rwanda
          </h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Our main office is located at KABC, Kigali, Rwanda - the heart of Africa's
            fastest-growing tech ecosystem. From here, we coordinate our global partnerships
            to deliver maximum impact for children's education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/partners"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              View All Partners
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500/20 text-white font-medium rounded-lg border border-white/20 hover:bg-emerald-500/30 transition-colors"
            >
              About AidVault
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
