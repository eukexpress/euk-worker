export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Configuration
    const FRONTEND_ORIGIN = 'http://69.57.162.187'; // Your hosting server
    const BACKEND_ORIGIN = 'https://eukexpress.onrender.com'; // Your Render backend

    // Handle API routes
    if (path.startsWith('/api/')) {
      return fetch(BACKEND_ORIGIN + path + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Handle documentation routes
    if (path === '/docs' || path === '/openapi.json' || path === '/health') {
      return fetch(BACKEND_ORIGIN + path + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Handle all other routes (frontend)
    return fetch(FRONTEND_ORIGIN + path + url.search, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }
};