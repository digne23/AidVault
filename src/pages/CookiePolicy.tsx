export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Cookie Policy</h1>
          <p className="text-emerald-100">Last updated: January 7, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and provide a better user experience. Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain until they expire or you delete them).
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">AidVault uses cookies for the following purposes:</p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Essential Cookies</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                These cookies are necessary for the website to function properly. They enable core features like user authentication, secure transactions, and account access. Without these cookies, the Service cannot operate.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-900 dark:text-white">Cookie</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Maintains your login session</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2">csrf_token</td>
                      <td className="py-2">Security token to prevent attacks</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2">auth_token</td>
                      <td className="py-2">Authentication verification</td>
                      <td className="py-2">7 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Functional Cookies</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                These cookies remember your preferences and settings to enhance your experience on our platform.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-900 dark:text-white">Cookie</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2">language</td>
                      <td className="py-2">Stores your language preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2">theme</td>
                      <td className="py-2">Dark/light mode preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2">currency</td>
                      <td className="py-2">Currency display preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                These cookies help us understand how visitors interact with our website, allowing us to improve our services.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-900 dark:text-white">Cookie</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                      <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics tracking</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2">_gid</td>
                      <td className="py-2">Distinguishes users</td>
                      <td className="py-2">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Some cookies are placed by third-party services that appear on our pages. These include payment processors (for secure transactions), analytics providers, and social media platforms. We do not control these cookies, and you should refer to the respective third-party privacy policies for more information.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Managing Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">You can manage cookies through your browser settings:</p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies</li>
                <li><strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
                <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Note: Blocking essential cookies may prevent you from using certain features of our Service, including logging in and making transactions.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Local Storage</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                In addition to cookies, we use browser local storage to store preferences and temporary data. This data remains on your device and is not transmitted to our servers. You can clear local storage through your browser's developer tools or settings.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We may update this Cookie Policy periodically to reflect changes in our practices or applicable laws. We will post any changes on this page and update the "Last updated" date. Continued use of our Service after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-gray-600 dark:text-gray-400">
                <p className="mb-1"><strong>Email:</strong> privacy@aidvault.org</p>
                <p className="mb-1"><strong>Address:</strong> KG 7 Ave, Kigali, Rwanda</p>
                <p><strong>Phone:</strong> +250 788 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
