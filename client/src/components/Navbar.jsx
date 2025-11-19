import { Link, useLocation } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Menu, X, Activity, Heart } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
  ];

  const protectedLinks = [
    { path: '/symptom', label: 'Check Symptoms' },
    { path: '/diseases', label: 'Diseases' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/history', label: 'History' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-2 border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="w-10 h-10 text-primary-500 group-hover:text-secondary-500 transition-colors duration-300 animate-pulse" />
              <Activity className="w-5 h-5 text-secondary-500 absolute -bottom-1 -right-1" />
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Health Checker
              </span>
              <p className="text-xs text-gray-500 font-medium">SDG 3</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isSignedIn && protectedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-700">
                    Hi, {user?.publicMetadata?.name || user?.firstName || 'User'}! 👋
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.publicMetadata?.county || 'Kenya'}
                  </span>
                </div>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-secondary text-sm py-2 px-6">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-6">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-primary-50"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            {publicLinks.concat(isSignedIn ? protectedLinks : []).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold mb-2 transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'text-gray-700 hover:bg-primary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isSignedIn && (
              <div className="mt-4 space-y-2">
                <Link to="/login" className="block btn-secondary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;