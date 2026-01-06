import { Routes, Route } from 'react-router-dom'
import { Layout, UserLayout } from './components/layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import ToastContainer from './components/Toast'
import { ToastProvider } from './contexts/ToastContext'
import { PreferencesProvider } from './contexts/PreferencesContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'

// Public Pages
import Landing from './pages/Landing'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Mission from './pages/Mission'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// User Pages
import Vault from './pages/user/Vault'
import Donate from './pages/user/Donate'
import History from './pages/user/History'
import AddFunds from './pages/user/AddFunds'
import Settings from './pages/user/Settings'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminTransactions from './pages/admin/AdminTransactions'
import AdminDonations from './pages/admin/AdminDonations'
import AdminAnalytics from './pages/admin/AdminAnalytics'

// Placeholder pages for new routes

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-600">Privacy policy content coming soon.</p>
    </div>
  )
}

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600">Terms of service content coming soon.</p>
    </div>
  )
}

function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
      <p className="text-gray-600">Cookie policy content coming soon.</p>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <PreferencesProvider>
        <AdminAuthProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes with Header/Footer */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
                <Route path="how-it-works" element={<HowItWorks />} />
                <Route path="mission" element={<Mission />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="cookies" element={<CookiePolicy />} />
              </Route>

              {/* Protected User Routes with Sidebar */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="vault" element={<Vault />} />
                <Route path="add-funds" element={<AddFunds />} />
                <Route path="donate" element={<Donate />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Admin Login (public) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="donations" element={<AdminDonations />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>

              {/* 404 Not Found - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Toast notifications */}
            <ToastContainer />
          </ToastProvider>
        </AdminAuthProvider>
      </PreferencesProvider>
    </ErrorBoundary>
  )
}

export default App
