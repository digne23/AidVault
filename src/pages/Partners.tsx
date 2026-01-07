import { Link } from 'react-router-dom'

interface Partner {
  name: string
  logo: React.ReactNode
  description: string
  type: 'sponsor' | 'tech' | 'ngo' | 'government'
  country: string
}

// SVG Logo Components for real brand recognition
const BKLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#00529B" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">BK</text>
    <text x="50" y="36" textAnchor="middle" fill="#FFD700" fontSize="6" fontFamily="Arial">Bank of Kigali</text>
  </svg>
)

const MTNLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#FFCC00" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="#000" fontSize="18" fontWeight="bold" fontFamily="Arial">MTN</text>
  </svg>
)

const AirtelLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#ED1C24" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">airtel</text>
  </svg>
)

const EquityLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#8B0000" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">EQUITY</text>
    <text x="50" y="36" textAnchor="middle" fill="#FFD700" fontSize="6" fontFamily="Arial">BANK</text>
  </svg>
)

const RISALogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#00A651" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">RISA</text>
  </svg>
)

const UNICEFLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#00AEEF" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">UNICEF</text>
  </svg>
)

const WorldBankLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#002244" rx="4"/>
    <text x="50" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">WORLD</text>
    <text x="50" y="32" textAnchor="middle" fill="#FFD700" fontSize="10" fontWeight="bold" fontFamily="Arial">BANK</text>
  </svg>
)

const USAIDLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#002868" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">USAID</text>
    <rect x="10" y="30" width="20" height="4" fill="#BF0A30"/>
  </svg>
)

const DFIDLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#4A0080" rx="4"/>
    <text x="50" y="20" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">UK AID</text>
    <text x="50" y="32" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">FCDO</text>
  </svg>
)

const GIZLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#E30613" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">GIZ</text>
  </svg>
)

const AfDBLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#006341" rx="4"/>
    <text x="50" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">AfDB</text>
  </svg>
)

const SaveChildrenLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#E31837" rx="4"/>
    <text x="50" y="18" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">SAVE THE</text>
    <text x="50" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">CHILDREN</text>
  </svg>
)

const WorldVisionLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#FF6600" rx="4"/>
    <text x="50" y="18" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">WORLD</text>
    <text x="50" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">VISION</text>
  </svg>
)

const MastercardLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#1A1F71" rx="4"/>
    <circle cx="40" cy="20" r="12" fill="#EB001B"/>
    <circle cx="60" cy="20" r="12" fill="#F79E1B"/>
    <ellipse cx="50" cy="20" rx="6" ry="10" fill="#FF5F00"/>
  </svg>
)

const VisaLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#1A1F71" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="Arial">VISA</text>
  </svg>
)

const MINEDUCLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#00A651" rx="4"/>
    <text x="50" y="18" textAnchor="middle" fill="#FFD700" fontSize="7" fontFamily="Arial">MINEDUC</text>
    <text x="50" y="30" textAnchor="middle" fill="white" fontSize="6" fontFamily="Arial">Rwanda</text>
  </svg>
)

const RDBLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#003366" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="#00A651" fontSize="16" fontWeight="bold" fontFamily="Arial">RDB</text>
  </svg>
)

const IMLogo = () => (
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <rect width="100" height="40" fill="#C8102E" rx="4"/>
    <text x="50" y="28" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">I&M</text>
  </svg>
)

const partners: Partner[] = [
  // Rwandan Financial Partners
  {
    name: 'Bank of Kigali',
    logo: <BKLogo />,
    description: "Rwanda's leading commercial bank supporting financial inclusion and digital banking initiatives.",
    type: 'sponsor',
    country: 'Rwanda',
  },
  {
    name: 'Equity Bank Rwanda',
    logo: <EquityLogo />,
    description: 'Regional banking partner enabling secure savings infrastructure and microfinance services.',
    type: 'sponsor',
    country: 'Rwanda',
  },
  {
    name: 'I&M Bank Rwanda',
    logo: <IMLogo />,
    description: 'Commercial bank providing secure fund management and transaction processing.',
    type: 'sponsor',
    country: 'Rwanda',
  },
  // Tech Partners
  {
    name: 'MTN Rwanda',
    logo: <MTNLogo />,
    description: 'Mobile money partner enabling seamless MoMo transactions across Rwanda.',
    type: 'tech',
    country: 'Rwanda',
  },
  {
    name: 'Airtel Rwanda',
    logo: <AirtelLogo />,
    description: 'Telecommunications partner expanding Airtel Money payment accessibility.',
    type: 'tech',
    country: 'Rwanda',
  },
  {
    name: 'Mastercard Foundation',
    logo: <MastercardLogo />,
    description: 'Global payment technology partner enabling secure international transactions.',
    type: 'tech',
    country: 'USA',
  },
  {
    name: 'Visa Inc.',
    logo: <VisaLogo />,
    description: 'International payment network supporting cross-border donations and payments.',
    type: 'tech',
    country: 'USA',
  },
  // International NGOs
  {
    name: 'UNICEF Rwanda',
    logo: <UNICEFLogo />,
    description: "United Nations children's agency supporting education and child welfare programs.",
    type: 'ngo',
    country: 'International',
  },
  {
    name: 'Save the Children',
    logo: <SaveChildrenLogo />,
    description: 'Global NGO partner focused on child welfare and educational support programs.',
    type: 'ngo',
    country: 'UK',
  },
  {
    name: 'World Vision Rwanda',
    logo: <WorldVisionLogo />,
    description: 'International humanitarian organization supporting community development.',
    type: 'ngo',
    country: 'USA',
  },
  // Government & Development Partners
  {
    name: 'MINEDUC Rwanda',
    logo: <MINEDUCLogo />,
    description: 'Ministry of Education ensuring alignment with national education policies.',
    type: 'government',
    country: 'Rwanda',
  },
  {
    name: 'RISA',
    logo: <RISALogo />,
    description: 'Rwanda Information Society Authority - digital transformation and e-government partner.',
    type: 'government',
    country: 'Rwanda',
  },
  {
    name: 'Rwanda Development Board',
    logo: <RDBLogo />,
    description: 'National development agency supporting innovation and sustainable growth.',
    type: 'government',
    country: 'Rwanda',
  },
  // International Development Partners
  {
    name: 'World Bank',
    logo: <WorldBankLogo />,
    description: 'International financial institution supporting education sector investments.',
    type: 'sponsor',
    country: 'International',
  },
  {
    name: 'USAID',
    logo: <USAIDLogo />,
    description: 'U.S. development agency supporting education and economic growth programs.',
    type: 'ngo',
    country: 'USA',
  },
  {
    name: 'UK FCDO',
    logo: <DFIDLogo />,
    description: 'UK Foreign, Commonwealth & Development Office supporting education initiatives.',
    type: 'ngo',
    country: 'UK',
  },
  {
    name: 'GIZ Rwanda',
    logo: <GIZLogo />,
    description: 'German development agency supporting vocational training and education.',
    type: 'ngo',
    country: 'Germany',
  },
  {
    name: 'African Development Bank',
    logo: <AfDBLogo />,
    description: 'Continental development bank financing education infrastructure projects.',
    type: 'sponsor',
    country: 'International',
  },
]

const partnerTypes = [
  { key: 'sponsor', label: 'Financial & Development Partners', color: 'emerald' },
  { key: 'tech', label: 'Technology Partners', color: 'blue' },
  { key: 'ngo', label: 'NGO & Humanitarian Partners', color: 'pink' },
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Partners
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto">
            Together with our valued partners from Rwanda and around the world,
            we're building a stronger foundation for education and community development.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">18+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Partners</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">4</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sectors Covered</p>
            </div>
            <div>
              <Link to="/partner-countries" className="block hover:opacity-80 transition-opacity">
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">15+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Partner Countries</p>
              </Link>
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
                        <div className="w-20 h-10 flex-shrink-0 overflow-hidden rounded">
                          {partner.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                            {partner.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                              {type.label.split(' ')[0]}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {partner.country}
                            </span>
                          </div>
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

      {/* Partner Countries CTA */}
      <section className="py-12 sm:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Global Reach
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Our partnerships span across 15+ countries, bringing together diverse expertise
            and resources to support education in Rwanda and beyond.
          </p>
          <Link
            to="/partner-countries"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Partner Countries
          </Link>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
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
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
