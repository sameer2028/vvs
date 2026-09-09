/**
 * adminFetch - A wrapper around fetch that automatically attaches
 * the admin JWT token as an Authorization: Bearer header.
 * 
 * This is needed because cross-origin cookies are blocked by modern
 * browsers when client and API are on different domains.
 * 
 * Usage: import { adminFetch } from '../../utils/adminFetch';
 *        const response = await adminFetch('/api/admin/dashboard');
 */
export function adminFetch(url, options = {}) {
  const token = localStorage.getItem('vvs_admin_token');
  const headers = { ...(options.headers || {}) };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    credentials: 'include', // still try cookies as backup
    headers
  });
}
