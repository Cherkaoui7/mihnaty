/**
 * Smart fetch wrapper that routes external API calls through
 * the local CORS proxy when the app is served from localhost.
 * 
 * When opened via file:// or served from localhost, browsers block
 * cross-origin requests to external APIs (CORS). This wrapper
 * transparently rewrites the URL to go through /proxy?url=...
 * so the request is made server-side, bypassing CORS.
 *
 * Usage: drop-in replacement for fetch(url, options).
 */
window.apiFetch = function(url, options) {
  // Direct fetch (production or dev), no proxies allowed
  return fetch(url, options);
};
