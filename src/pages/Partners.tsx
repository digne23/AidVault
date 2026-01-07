interface Partner {
  name: string
  logo: string
  description: string
  type: 'sponsor' | 'tech' | 'ngo' | 'government'
}

const partners: Partner[] = [
  {
    name: 'Bank of Kigali',
    logo: 'BK',
    description: 'Rwanda\'s leading commercial bank supporting financial inclusion initiatives.',
    type: 'sponsor',
  },
  {
    name: 'MTN Rwanda',
    logo: 'MTN',
    description: 'Mobile money partner enabling seamless digital transactions across Rwanda.',
    type: 'tech',
  },
  {
    name: 'UNICEF Rwanda',
    logo: 'UNICEF',
    description: 'Working together to improve education access for children across the region.',
    type: 'ngo',
  },
  {
    name: 'Ministry of Education',
    logo: 'MINEDUC',
    description: 'Government partnership ensuring alignment with national education goals.',
    type: 'government',
  },
  {
    name: 'Equity Bank',
    logo: 'EQ',
    description: 'Banking partner providing secure savings and transaction infrastructure.',
    type: 'sponsor',
  },
  {
    name: 'Airtel Rwanda',
    logo: 'AIRTEL',
    description: 'Telecommunications partner expanding mobile payment accessibility.',
    type: 'tech',
  },
  {
    name: 'Save the Children',
    logo: 'STC',
    description: 'Collaborating on child welfare and educational support programs.',
    type: 'ngo',
  },
  {
    name: 'Rwanda Development Board',
    logo: 'RDB',
    description: 'Supporting innovation and sustainable development initiatives.',
    type: 'government',
  },
  {
    name: 'I&M Bank',
    logo: 'I&M',
    description: 'Financial services partner enabling secure fund management.',
    type: 'sponsor',
  },
  {
    name: 'World Vision Rwanda',
    logo: 'WV',
    description: 'Partnership focused on child education and community development.',
    type: 'ngo',
  },
  {
    name: 'RISA',
    logo: 'RISA',
    description: 'Rwanda Information Society Authority - digital transformation partner.',
    type: 'government',
  },
  {
    name: 'Tigo Rwanda',
    logo: 'TIGO',
    description: 'Mobile services partner enhancing digital payment solutions.',
    type: 'tech',
  },
]

const partnerTypes = [
  { key: 'sponsor', label: 'Financial Partners', color: 'emerald' },
  { key: 'tech', label: 'Technology Partners', color: 'blue' },
  { key: 'ngo', label: 'NGO Partners', color: 'pink' },
  { key: 'government', label: 'Government Partners', color: 'amber' },
]

export default function Partners() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sponsor':
        return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
      case 'tech':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
      case 'ngo':
        return 'bg-pink-500/20 text-pink-600 dark:text-pink-400'
      case 'government':
        return 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
    }
  }

  const getLogoBg = (type: string) => {
    switch (type) {
      case 'sponsor':
        return 'from-emerald-500 to-teal-600'
      case 'tech':
        return 'from-blue-500 to-indigo-600'
      case 'ngo':
        return 'from-pink-500 to-rose-600'
      case 'government':
        return 'from-amber-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Partners
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto">
            Together with our valued partners, we're building a stronger foundation
            for education and community development across Rwanda.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">12+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Partners</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">4</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sectors Covered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">30+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Districts Reached</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">5</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years of Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners by Category */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {partnerTypes.map((type) => {
            const typePartners = partners.filter((p) => p.type === type.key)
            if (typePartners.length === 0) return null

            return (
              <div key={type.key} className="mb-12 last:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {type.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {typePartners.map((partner) => (
                    <div
                      key={partner.name}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getLogoBg(partner.type)} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-sm">
                            {partner.logo}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {partner.name}
                          </h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                            {type.label.replace(' Partners', '')}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        {partner.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-12 sm:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Partner
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our mission to transform education funding in Rwanda. Whether you're
            a financial institution, technology company, NGO, or government agency,
            there's a place for you in our growing network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partners@aidvault.org"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
