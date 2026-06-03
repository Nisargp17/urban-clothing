import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../store/apiSlice';
import { authStart, authSuccess, authFailure, logout, clearError } from '../store/authSlice';

/**
 * Production-grade auth hook.
 * Bridges RTK Query mutations with Redux auth state.
 * Handles loading, errors, success redirects, and token persistence.
 */
export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();

  /**
   * Normalize API response — handle { success, token, user } and { token, user } shapes.
   */
  const normalizeAuthResponse = (data) => {
    const payload = data?.success !== undefined ? data : data;
    return {
      token: payload?.token || payload?.accessToken || null,
      user: payload?.user || null,
    };
  };

  /**
   * Extract a human-readable error message from any API error shape.
   */
  const extractErrorMessage = (err) => {
    if (!err) return 'An unexpected error occurred. Please try again.';
    if (err.data?.message) return err.data.message;
    if (err.data?.error) return err.data.error;
    if (err.error) return err.error;
    if (typeof err.data === 'string') return err.data;
    if (err.status === 401) return 'Invalid email or password.';
    if (err.status === 409) return 'An account with this email already exists.';
    if (err.status === 422) return 'Please check your input and try again.';
    if (err.status === 500) return 'Server error. Please try again later.';
    return 'Something went wrong. Please try again.';
  };

  /**
   * Login handler.
   * @param {{ email: string, password: string }} credentials
   * @param {{ redirectTo?: string }} options
   */
  const login = useCallback(
    async (credentials, options = {}) => {
      dispatch(authStart());
      try {
        const result = await loginMutation(credentials).unwrap();
        const { token, user } = normalizeAuthResponse(result);

        if (!token || !user) {
          dispatch(authFailure('Invalid response from server. Please try again.'));
          return { success: false };
        }

        dispatch(authSuccess({ token, user }));
        navigate(options.redirectTo || '/');
        return { success: true, user };
      } catch (err) {
        const message = extractErrorMessage(err);
        dispatch(authFailure(message));
        return { success: false, error: message };
      }
    },
    [dispatch, loginMutation, navigate]
  );

  /**
   * Register handler.
   * @param {{ name: string, email: string, password: string }} userData
   * @param {{ redirectTo?: string }} options
   */
  const register = useCallback(
    async (userData, options = {}) => {
      dispatch(authStart());
      try {
        const result = await registerMutation(userData).unwrap();
        const { token, user } = normalizeAuthResponse(result);

        if (!token || !user) {
          dispatch(authFailure('Invalid response from server. Please try again.'));
          return { success: false };
        }

        dispatch(authSuccess({ token, user }));
        navigate(options.redirectTo || '/');
        return { success: true, user };
      } catch (err) {
        const message = extractErrorMessage(err);
        dispatch(authFailure(message));
        return { success: false, error: message };
      }
    },
    [dispatch, registerMutation, navigate]
  );

  /**
   * Logout handler — clears state, storage, and redirects.
   */
  const logoutUser = useCallback(
    (options = {}) => {
      dispatch(logout());
      navigate(options.redirectTo || '/');
    },
    [dispatch, navigate]
  );

  /**
   * Clear any existing auth error.
   */
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading || isLoginLoading || isRegisterLoading,
    error: auth.error,
    login,
    register,
    logout: logoutUser,
    clearError: clearAuthError,
  };
}
