import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_URL,
  REQUEST_TIMEOUT,
  RETRY_STATUS_CODES,
  RETRY_ERROR_MESSAGES,
  DEBUG_API,
  TOKEN_KEY,
} from './apiConfig';

// ------------------------------------------------------------------
// 1. Core fetchBaseQuery with auth header and timeout signal
// ------------------------------------------------------------------

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Content-Type is set automatically by fetch for JSON/FormData.
    // We only explicitly set it when body is NOT FormData.
    const token = getState()?.auth?.token || localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// ------------------------------------------------------------------
// 2. Timeout wrapper
// ------------------------------------------------------------------

function withTimeout(promise, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      controller.signal.addEventListener('abort', () => {
        reject({ status: 408, data: { message: 'Request timeout' } });
      });
    }),
  ]).finally(() => clearTimeout(timer));
}

// ------------------------------------------------------------------
// 3. Retry wrapper with exponential backoff
// ------------------------------------------------------------------

async function withRetry(args, api, extraOptions, attempt = 1) {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (!result.error) return result;

  const status = Number(result.error.status);
  const msg = String(result.error.error || result.error.data?.message || '').toLowerCase();

  const isRetryable =
    RETRY_STATUS_CODES.includes(status) ||
    RETRY_ERROR_MESSAGES.some((pattern) => msg.includes(pattern.toLowerCase()));

  if (!isRetryable || attempt >= 3) return result;

  const delay = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
  if (DEBUG_API) {
    console.warn(`[API] Retry ${attempt}/3 for ${args.url} in ${delay}ms (status ${status})`);
  }

  await new Promise((r) => setTimeout(r, delay));
  return withRetry(args, api, extraOptions, attempt + 1);
}

// ------------------------------------------------------------------
// 4. Production baseQuery with interceptors + 401 global logout
// ------------------------------------------------------------------

/**
 * Custom baseQuery that provides:
 * - Automatic auth headers
 * - Request/response logging in dev
 * - Timeout enforcement
 * - Exponential retry for transient errors
 * - Global 401 detection (dispatches logout)
 * - Consistent error normalization
 */
export const customBaseQuery = async (args, api, extraOptions = {}) => {
  const startTime = performance.now();
  const url = typeof args === 'string' ? args : args.url;

  if (DEBUG_API) {
    console.log(`[API] ▶ ${typeof args === 'object' ? args.method || 'GET' : 'GET'} ${url}`);
  }

  // Merge timeout signal if not already present
  let finalArgs = args;
  if (typeof args === 'object' && args.body instanceof FormData === false) {
    // For JSON requests, ensure headers have Content-Type when needed
    if (args.body && typeof args.body === 'object' && !args.headers?.['Content-Type']) {
      finalArgs = {
        ...args,
        headers: {
          'Content-Type': 'application/json',
          ...args.headers,
        },
      };
    }
  }

  // Run with timeout + retry
  const result = await withTimeout(
    withRetry(finalArgs, api, extraOptions),
    REQUEST_TIMEOUT
  );

  const duration = Math.round(performance.now() - startTime);

  if (DEBUG_API) {
    if (result.error) {
      console.error(`[API] ✖ ${url} — ${result.error.status} (${duration}ms)`, result.error);
    } else {
      console.log(`[API] ✔ ${url} — 200 (${duration}ms)`);
    }
  }

  // ------------------------------------------------------------------
  // 5. Global 401 handler — dispatch logout so UI reacts immediately
  // ------------------------------------------------------------------
  if (result.error?.status === 401) {
    const { logout } = await import('../store/authSlice');
    api.dispatch(logout());
    if (DEBUG_API) {
      console.warn('[API] 401 detected — dispatching logout');
    }
  }

  // ------------------------------------------------------------------
  // 6. Normalize error shape for consumers
  // ------------------------------------------------------------------
  if (result.error) {
    const normalized = {
      status: result.error.status,
      data: result.error.data,
      error: result.error.error,
    };
    return { error: normalized };
  }

  return result;
};
