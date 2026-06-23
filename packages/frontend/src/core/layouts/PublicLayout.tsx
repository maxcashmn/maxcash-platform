import { Outlet, Link } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              MaxCash
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/loan-products" className="text-sm text-gray-600 hover:text-gray-900">
                Loan Products
              </Link>
              <Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link to="/login" className="btn-primary text-sm px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="btn-secondary text-sm px-4 py-2">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MaxCash. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
