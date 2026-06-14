/**
 * Centralized API Configuration
 * Environment-aware, scalable, and strictly typed via JSDoc.
 */

/** @type {string} */
export const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000/api';

/** @type {number} Request timeout in milliseconds */
export const REQUEST_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

/** @type {number} Max retry attempts for transient failures */
export const MAX_RETRIES = Number(import.meta.env.VITE_API_MAX_RETRIES) || 3;

/** @type {number} Base delay (ms) between retries; exponential backoff applied */
export const RETRY_DELAY_BASE = Number(import.meta.env.VITE_API_RETRY_DELAY) || 1000;

/** @type {string[]} HTTP status codes that trigger automatic retry */
export const RETRY_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/** @type {string[]} Network error patterns that trigger retry */
export const RETRY_ERROR_MESSAGES = ['fetch failed', 'network error', 'failed to fetch', 'timeout'];

/** @type {boolean} Enable verbose request logging in development */
export const DEBUG_API = import.meta.env.DEV && import.meta.env.VITE_DEBUG_API !== 'false';

/** @type {string} LocalStorage key for JWT token */
export const TOKEN_KEY = 'token';

/** @type {string} LocalStorage key for user object */
export const USER_KEY = 'user';
