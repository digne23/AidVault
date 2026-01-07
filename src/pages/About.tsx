import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation('about')

  const team = t('team', { returnObjects: true }) as Array<{
    name: string
    role: string
    bio: string
  }>

  const teamColors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-rose-600',
  ]

  const values = [
    {
      title: t('valueTransparency'),
      description: t('valueTransparencyDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: t('valueEducationFirst'),
      description: t('valueEducationFirstDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: t('valueCommunity'),
      description: t('valueCommunityDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: t('valueTrust'),
      description: t('valueTrustDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t('valueImpact'),
      description: t('valueImpactDesc'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 dark:text-white font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
                {t('whoWeAre')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('platformBuilt')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('whoWeAreP1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('whoWeAreP2')}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">2025</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('founded')}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">18</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('countries')}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">2,500+</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('donors')}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">100%</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('transparent')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium mb-6">
              {t('ourStory')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('storyTitle')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                <p className="text-xl leading-relaxed mb-6">
                  {t('storyP1')}
                </p>
                <p className="leading-relaxed mb-6">
                  {t('storyP2')}
                </p>
                <p className="leading-relaxed mb-6">
                  {t('storyP3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-6">
              {t('meetTeam')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('teamSubtitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('teamDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className={`w-32 h-32 bg-gradient-to-br ${teamColors[index % teamColors.length]} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg`}>
                  {member.name
                    .split(' ')
                    .filter(n => !['Miss.', 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'].includes(n))
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
              {t('ourValues')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('whatWeStandFor')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('valuesDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('joinCommunity')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('joinCommunityDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('createYourAccount')}
            </Link>
            <Link
              to="/how-it-works"
              className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
            >
              {t('learnHowItWorks', { ns: 'landing' })}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
