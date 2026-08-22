import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import CommitteesPage from './pages/public/CommitteesPage';
import CommitteeDetailPage from './pages/public/CommitteeDetailPage';
import VenuePage from './pages/public/VenuePage';
import AwardsPage from './pages/public/AwardsPage';
import TeamPage from './pages/public/TeamPage';
import SchedulePage from './pages/public/SchedulePage';
import GalleryPage from './pages/public/GalleryPage';
import FaqPage from './pages/public/FaqPage';
import ContactPage from './pages/public/ContactPage';
import RegisterPage from './pages/public/RegisterPage';

// Admin Pages & Layouts
import AdminRoute from './components/auth/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import RegistrationsManager from './pages/admin/RegistrationsManager';
import PaymentVerification from './pages/admin/PaymentVerification';
import CommitteesManager from './pages/admin/CommitteesManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import AllocationsManager from './pages/admin/AllocationsManager';
import SettingsManager from './pages/admin/SettingsManager';

// Delegate Pages & Layouts
import DelegateRoute from './components/auth/DelegateRoute';
import DelegateLayout from './components/layout/DelegateLayout';
import DelegateLoginPage from './pages/delegate/DelegateLoginPage';
import DelegateDashboard from './pages/delegate/DelegateDashboard';
import DelegatePaymentPage from './pages/delegate/DelegatePaymentPage';

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<><Navbar /><div className="flex-1 min-h-screen"><Outlet /></div><Footer /></>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/committees" element={<CommitteesPage />} />
          <Route path="/committees/:slug" element={<CommitteeDetailPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/vvs-1" element={<GalleryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="registrations" element={<RegistrationsManager />} />
          <Route path="payments" element={<PaymentVerification />} />
          <Route path="committees" element={<CommitteesManager />} />
          <Route path="committees/:id/portfolios" element={<PortfolioManager />} />
          <Route path="allocations" element={<AllocationsManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>

        {/* Delegate Auth Route */}
        <Route path="/delegate/login" element={<DelegateLoginPage />} />

        {/* Protected Delegate Routes */}
        <Route path="/delegate" element={<DelegateRoute><DelegateLayout /></DelegateRoute>}>
          <Route index element={<DelegateDashboard />} />
          <Route path="payment" element={<DelegatePaymentPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

