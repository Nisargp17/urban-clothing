import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { rehydrateAuth } from './store/authSlice';
import './App.css';
import Navbar from './components/NavBar';
import GooeyCursor from './components/GooeyCursor';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorLabel } from './components/CursorLabel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';
import { PageLoader } from './components/PageLoader';
import { JsonLdOrganization } from './components/JsonLd';
import { CartToast } from './components/CartToast';
import { RequireAdmin } from './components/RequireAdmin';
import { useLenis } from './hooks/useLenis';
import { useWebVitals } from './hooks/useWebVitals';
import HomePage from './pages/HomePage/HomePage';
import gsap from 'gsap';

// Lazy load all non-landing pages for optimal bundle splitting
const ShopPage = lazy(() => import('./pages/ShopPage/ShopPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage/CollectionsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage/FaqPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage/WishlistPage'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage/TrackOrderPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/CheckoutPage/OrderConfirmationPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage/OrderHistoryPage'));

// Admin pages (separate chunk)
const AdminLayout = lazy(() => import('./pages/AdminPage/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminPage/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/AdminPage/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/AdminPage/AdminOrders'));
const AdminCustomers = lazy(() => import('./pages/AdminPage/AdminCustomers'));
const AdminNotFound = lazy(() => import('./pages/AdminPage/AdminNotFound'));

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'exiting' | 'entering'
  const latestLocation = useRef(location);
  const isFirstRender = useRef(true);

  // Always track latest location in ref
  latestLocation.current = location;

  // Phase 1: Start exit when route changes
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname && phase === 'idle') {
      setPhase('exiting');
    }
  }, [location, displayLocation, phase]);

  // Phase 2: Exit animation — slide out + fade
  useEffect(() => {
    if (phase !== 'exiting') return;

    const main = mainRef.current;
    if (!main) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayLocation(latestLocation.current);
        window.scrollTo(0, 0);
        setPhase('entering');
      },
    });

    tl.to(main, { x: -40, opacity: 0, duration: 0.25, ease: 'power2.in' });

    return () => tl.kill();
  }, [phase]);

  // Phase 3: Enter animation — slide in from right + fade
  useEffect(() => {
    if (phase !== 'entering') return;

    const main = mainRef.current;
    if (!main) return;

    // Skip entrance animation on first render (LoadingScreen handles it)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(main, { x: 0, opacity: 1 });
      setPhase('idle');
      return;
    }

    // New content is now rendered but invisible — position it off-screen right
    gsap.set(main, { x: 40, opacity: 0 });

    gsap.to(main, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => setPhase('idle'),
    });
  }, [phase]);

  return (
    <main ref={mainRef} className="will-change-transform">
      <Suspense fallback={<PageLoader />}>
        <Routes location={displayLocation}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
}

function MainApp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  useLenis();
  useWebVitals();

  // Rehydrate auth from localStorage on app load
  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <ScrollToTopOnRoute />
      <ScrollProgress />

      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#2a2520] focus:text-white focus:text-xs focus:tracking-[0.2em] focus:font-medium focus:shadow-lg focus:rounded-lg focus:outline-none"
      >
        Skip to content
      </a>

      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <GooeyCursor />
      <CursorLabel />
      <CartDrawer />
      <CartToast />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollToTop />
      <div className="noise-overlay" aria-hidden="true" />
      <div id="main-content" className="overflow-x-hidden">
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </div>
      <JsonLdOrganization />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Admin routes — separate layout, no main site UI */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Suspense fallback={<PageLoader />}>
                  <AdminLayout />
                </Suspense>
              </RequireAdmin>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminProducts />
                </Suspense>
              }
            />
            <Route
              path="orders"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminOrders />
                </Suspense>
              }
            />
            <Route
              path="customers"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminCustomers />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminNotFound />
                </Suspense>
              }
            />
          </Route>

          {/* Main app — all customer-facing pages */}
          <Route path="*" element={<MainApp />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
