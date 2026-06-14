/**
 * API Helper Utilities
 * Normalization, error extraction, and response guards.
 */

/**
 * Extract a human-readable message from any API error shape.
 * @param {unknown} err
 * @returns {string}
 */
export function extractErrorMessage(err) {
  if (!err) return 'An unexpected error occurred. Please try again.';

  // RTK Query / fetchBaseQuery error shape
  if (typeof err === 'object') {
    if ('data' in err && err.data) {
      if (typeof err.data === 'string') return err.data;
      if (err.data.message && typeof err.data.message === 'string') return err.data.message;
      if (err.data.error && typeof err.data.error === 'string') return err.data.error;
      if (Array.isArray(err.data.errors) && err.data.errors.length > 0) {
        return err.data.errors.join('. ');
      }
    }
    if ('error' in err && typeof err.error === 'string') return err.error;
    if ('status' in err) {
      const status = Number(err.status);
      if (status === 400) return 'Invalid request. Please check your input.';
      if (status === 401) return 'Session expired. Please log in again.';
      if (status === 403) return 'You do not have permission to perform this action.';
      if (status === 404) return 'The requested resource was not found.';
      if (status === 409) return 'This resource already exists.';
      if (status === 422) return 'Please check your input and try again.';
      if (status === 429) return 'Too many requests. Please wait a moment and try again.';
      if (status >= 500) return 'Server error. Please try again later.';
    }
  }

  if (err instanceof Error) return err.message;
  return 'Something went wrong. Please try again.';
}

/**
 * Normalize paginated API responses to a guaranteed shape.
 * @param {unknown} response
 * @param {string} [itemKey='items']
 * @returns {{ success: boolean, data: any[], page: number, pages: number, total: number, message?: string }}
 */
export function normalizePaginatedResponse(response, itemKey = 'items') {
  if (!response || typeof response !== 'object') {
    return { success: false, data: [], page: 1, pages: 1, total: 0 };
  }

  const raw = /** @type {Record<string, unknown>} */ (response);

  const data =
    Array.isArray(raw.products) ? raw.products :
    Array.isArray(raw.orders) ? raw.orders :
    Array.isArray(raw.data) ? raw.data :
    Array.isArray(raw[itemKey]) ? raw[itemKey] :
    Array.isArray(raw) ? raw : [];

  return {
    success: raw.success === true,
    data,
    page: Number(raw.page) || 1,
    pages: Number(raw.pages) || 1,
    total: Number(raw.total) || data.length,
    message: typeof raw.message === 'string' ? raw.message : undefined,
  };
}

/**
 * Normalize a single-item API response.
 * @param {unknown} response
 * @param {string} [itemKey='item']
 * @returns {{ success: boolean, data: any | null, message?: string }}
 */
export function normalizeSingleResponse(response, itemKey = 'item') {
  if (!response || typeof response !== 'object') {
    return { success: false, data: null };
  }
  const raw = /** @type {Record<string, unknown>} */ (response);
  const data =
    raw.product ?? raw.order ?? raw.user ?? raw[itemKey] ?? raw;
  return {
    success: raw.success === true,
    data: data && typeof data === 'object' ? data : null,
    message: typeof raw.message === 'string' ? raw.message : undefined,
  };
}

/**
 * Check if an error should trigger a retry.
 * @param {{ status?: number | string; error?: string }} error
 * @returns {boolean}
 */
export function shouldRetry(error) {
  if (!error) return false;
  const status = Number(error.status);
  if (!Number.isNaN(status)) {
    const retryStatuses = [408, 429, 500, 502, 503, 504];
    if (retryStatuses.includes(status)) return true;
  }
  const msg = String(error.error || '').toLowerCase();
  const retryMessages = ['fetch failed', 'network error', 'failed to fetch', 'timeout'];
  return retryMessages.some((pattern) => msg.includes(pattern));
}
