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
  // Only proxy if the target is an external URL
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  
  // Only proxy when running on localhost (dev server) or file://
  const needsProxy = window.location.protocol === 'file:' ||
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';

  if (isExternal && needsProxy && window.location.protocol !== 'file:') {
    // Route through the local CORS proxy
    const proxyUrl = '/proxy?url=' + encodeURIComponent(url);
    return fetch(proxyUrl, options);
  }

  // Direct fetch (production, or file:// where proxy isn't available)
  return fetch(url, options);
};
