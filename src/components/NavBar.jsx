import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartContext, useWishlistContext } from '../hooks/useRedux';
import { useAuth } from '../hooks/useAuth';
import { SoundToggle } from './SoundToggle';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

function Navbar({ onSearchClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleDrawer } = useCartContext();
  const { count: wishlistCount } = useWishlistContext();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <>
      {/* Apple-style Glass Capsule Nav — always glass, always distorting */}
      <nav
        className="fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          top-3 md:top-5
          left-3 right-3
          md:left-1/2 md:-translate-x-1/2
          md:w-auto md:min-w-[720px] md:max-w-4xl
          rounded-2xl
          backdrop-blur-[40px]
          backdrop-saturate-[180%]
          backdrop-contrast-[110%]
          bg-gradient-to-b from-white/[0.25] via-white/[0.08] to-white/[0.02]
          border border-white/[0.18]
          shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.35)]
        "
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-12 md:h-14">
          {/* Logo */}
          <Link
            to="/"
            className="text-sm md:text-base font-semibold tracking-[0.15em] hover:opacity-60 transition-opacity"
          >
            URBAN
          </Link>

          {/* Desktop center links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[11px] tracking-[0.15em] font-medium group py-1 ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {link.label.toUpperCase()}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#2a2520] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={onSearchClick} aria-label="Search" className="opacity-50 hover:opacity-100 transition-opacity p-1">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-[10px] tracking-[0.15em] font-bold text-[#c4a35a] bg-[#2a2520] px-2.5 py-1 rounded-md hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
                  >
                    ADMIN
                  </Link>
                )}
                <Link
                  to="/account"
                  className="opacity-50 hover:opacity-100 transition-opacity text-[11px] tracking-[0.15em] font-medium"
                  title="My Account"
                >
                  ACCOUNT
                </Link>
                <button
                  onClick={logout}
                  className="opacity-50 hover:opacity-100 transition-opacity p-1"
                  title="Sign out"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="opacity-50 hover:opacity-100 transition-opacity text-[11px] tracking-[0.15em] font-medium">
                ACCOUNT
              </Link>
            )}
            <Link to="/wishlist" className="relative opacity-50 hover:opacity-100 transition-opacity p-1">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 text-white text-[0.5rem] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <SoundToggle />
            <button id="cart-target" onClick={toggleDrawer} className="relative opacity-50 hover:opacity-100 transition-opacity p-1">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#c4a35a] text-[#2a2520] text-[0.5rem] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={onSearchClick} aria-label="Search" className="p-1">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="/wishlist" className="relative p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 text-white text-[0.5rem] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <SoundToggle />
            <button id="cart-target" onClick={toggleDrawer} className="relative p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#c4a35a] text-[#2a2520] text-[0.5rem] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-[#2a2520] transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-[#2a2520] transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-[#2a2520] transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-4 space-y-1 border-t border-[#2a2520]/10 pt-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium tracking-wider rounded-lg transition-all duration-200 active:scale-[0.98] ${
                  location.pathname === link.path
                    ? 'bg-[#2a2520] text-white'
                    : 'hover:bg-[#2a2520]/5 active:bg-[#2a2520]/10'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : '0ms' }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="block px-3 py-2.5 text-sm font-medium tracking-wider rounded-lg bg-[#2a2520]/5">
                  {user?.name?.toUpperCase() || 'USER'}
                </div>
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium tracking-wider rounded-lg hover:bg-[#2a2520]/5 active:bg-[#2a2520]/10 active:scale-[0.98] transition-all duration-200"
                >
                  ACCOUNT
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2.5 text-sm font-medium tracking-wider rounded-lg hover:bg-[#2a2520]/5 active:bg-[#2a2520]/10 active:scale-[0.98] transition-all duration-200"
                >
                  LOGOUT
                </button>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-bold tracking-wider rounded-lg bg-[#2a2520] text-[#c4a35a] hover:bg-[#c4a35a] hover:text-[#2a2520] active:scale-[0.98] transition-all duration-200"
                  >
                    ADMIN
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium tracking-wider rounded-lg hover:bg-[#2a2520]/5 active:bg-[#2a2520]/10 active:scale-[0.98] transition-all duration-200"
              >
                ACCOUNT
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
