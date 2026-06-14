import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Route guard: only for non-authenticated users.
 * Redirects authenticated users away from /login and /register.
 */
export function GuestOnly({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
}
