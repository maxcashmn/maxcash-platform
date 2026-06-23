import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './core/providers/QueryProvider';
import { AuthProvider } from './core/providers/AuthProvider';
import { ToastProvider } from './core/providers/ToastProvider';
import { ProtectedRoute } from './core/routing/ProtectedRoute';

// Layouts
import { AuthLayout } from './core/layouts/AuthLayout';
import { AppLayout } from './core/layouts/AppLayout';
import { PublicLayout } from './core/layouts/PublicLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Unauthorized } from './pages/auth/Unauthorized';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { LoanProducts } from './pages/public/LoanProducts';
import { FAQ } from './pages/public/FAQ';
import { Contact } from './pages/public/Contact';

// Role-based Pages
import { Dashboard as BorrowerDashboard } from './pages/borrower/Dashboard';
import { Dashboard as ManagerDashboard } from './pages/manager/Dashboard';
import { Dashboard as AuditorDashboard } from './pages/auditor/Dashboard';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';

// Borrower Pages
import { LoanApplication } from './pages/borrower/LoanApplication';
import { MyLoans } from './pages/borrower/MyLoans';
import { LoanDetails } from './pages/borrower/LoanDetails';
import { RepaymentSchedule } from './pages/borrower/RepaymentSchedule';
import { Transactions } from './pages/borrower/Transactions';
import { Profile } from './pages/borrower/Profile';
import { Settings } from './pages/borrower/Settings';
import { Notifications } from './pages/borrower/Notifications';

// Manager Pages
import { ReviewApplications } from './pages/manager/ReviewApplications';
import { AssignedBorrowers } from './pages/manager/AssignedBorrowers';

// Auditor Pages
import { AuditTrail } from './pages/auditor/AuditTrail';

// Admin Pages
import { Users } from './pages/admin/Users';
import { Loans as AdminLoans } from './pages/admin/Loans';
import { AuditLogs } from './pages/admin/AuditLogs';

// Route constants
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  UNAUTHORIZED: '/unauthorized',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/loan-products" element={<LoanProducts />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
              </Route>

              {/* Protected Routes - Borrower */}
              <Route element={<ProtectedRoute allowedRoles={['borrower']} />}>
                <Route element={<AppLayout />}>
                  <Route path={ROUTES.DASHBOARD} element={<BorrowerDashboard />} />
                  <Route path="/loan-application" element={<LoanApplication />} />
                  <Route path="/my-loans" element={<MyLoans />} />
                  <Route path="/my-loans/:id" element={<LoanDetails />} />
                  <Route path="/repayment-schedule" element={<RepaymentSchedule />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path={ROUTES.PROFILE} element={<Profile />} />
                  <Route path={ROUTES.SETTINGS} element={<Settings />} />
                  <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
                </Route>
              </Route>

              {/* Protected Routes - Manager */}
              <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
                <Route element={<AppLayout />}>
                  <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                  <Route path="/manager/review" element={<ReviewApplications />} />
                  <Route path="/manager/borrowers" element={<AssignedBorrowers />} />
                </Route>
              </Route>

              {/* Protected Routes - Auditor */}
              <Route element={<ProtectedRoute allowedRoles={['auditor']} />}>
                <Route element={<AppLayout />}>
                  <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
                  <Route path="/auditor/audit-trail" element={<AuditTrail />} />
                </Route>
              </Route>

              {/* Protected Routes - Admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AppLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/loans" element={<AdminLoans />} />
                  <Route path="/admin/audit-logs" element={<AuditLogs />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
