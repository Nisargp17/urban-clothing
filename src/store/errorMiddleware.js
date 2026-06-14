import { isRejectedWithValue } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../utils/apiHelpers';

/**
 * Global RTK Query error middleware.
 *
 * - Logs all rejected API actions in dev.
 * - Provides a centralized place for toast notifications.
 * - Keeps the store pure; toast side-effects are optional.
 */

/** @type {import('@reduxjs/toolkit').Middleware} */
export const rtkQueryErrorMiddleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    const endpointName = action.meta?.arg?.endpointName || 'unknown';
    const message = extractErrorMessage(payload);

    // Development logging
    if (import.meta.env.DEV) {
      console.warn(`[API Rejected] ${endpointName}:`, payload);
    }

    // ------------------------------------------------------------------
    // Centralized toast / notification hook (optional integration)
    // Dispatch a custom "api/error" action that a UI toast listener
    // can subscribe to. This keeps middleware side-effect free
    // while still allowing global error UI.
    // ------------------------------------------------------------------
    const errorEvent = new CustomEvent('api-error', {
      detail: { message, endpoint: endpointName, status: payload?.status },
    });
    window.dispatchEvent(errorEvent);
  }

  return next(action);
};
