import { Link } from 'react-router-dom'

interface Country {
  name: string
  code: string
}

// East African Community
const eacCountries: Country[] = [
  { name: 'Rwanda', code: 'rw' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Burundi', code: 'bi' },
]

// Other African Nations
const otherAfricanCountries: Country[] = [
  { name: 'DR Congo', code: 'cd' },
  { name: 'South Africa', code: 'za' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Ethiopia', code: 'et' },
]

// International Partners
const internationalCountries: Country[] = [
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Canada', code: 'ca' },
  { name: 'Japan', code: 'jp' },
  { name: 'China', code: 'cn' },
  { name: 'India', code: 'in' },
]

const allCountries = [...eacCountries, ...otherAfricanCountries, ...internationalCountries]

// Flag component
function CountryFlag({ country }: { country: Country }) {
  return (
    <div className="flex flex-col items-center p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
      <img
        src={`https://flagcdn.com/w160/${country.code}.png`}
        alt={`${country.name} flag`}
        className="w-16 sm:w-20 md:w-24 h-auto rounded shadow-md"
        loading="lazy"
      />
      <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-center">
        {country.name}
      </span>
    </div>
  )
}

export default function PartnerCountries() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Global Reach
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Our network spans {allCountries.length} countries across multiple continents,
            uniting diverse expertise to transform education in Rwanda.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">{eacCountries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">East African Community</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{otherAfricanCountries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Other African Nations</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">{internationalCountries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">International Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* East African Community */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            East African Community
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {eacCountries.map((country) => (
              <CountryFlag key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* Other African Nations */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Other African Nations
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {otherAfricanCountries.map((country) => (
              <CountryFlag key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* International Partners */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            International Partners
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
            {internationalCountries.map((country) => (
              <CountryFlag key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* Headquarters Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://flagcdn.com/w160/rw.png"
            alt="Rwanda flag"
            className="w-24 h-auto mx-auto mb-4 rounded shadow-lg"
          />
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
