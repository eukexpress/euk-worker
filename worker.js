export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Configuration
    const FRONTEND_ORIGIN = 'http://69.57.162.187'; // Your hosting server
    const BACKEND_ORIGIN = 'https://eukexpress.onrender.com'; // Your Render backend

    // Route API requests to Render backend
    if (path.startsWith('/api/')) {
      const backendUrl = BACKEND_ORIGIN + path + url.search;
      console.log(🔄 Proxying API request to: );
      
      return fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Route documentation requests to backend
    if (path === '/docs' || path === '/openapi.json' || path === '/health') {
      const backendUrl = BACKEND_ORIGIN + path + url.search;
      console.log(📚 Proxying docs request to: );
      
      return fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Everything else goes to frontend hosting
    const frontendUrl = FRONTEND_ORIGIN + path + url.search;
    console.log(🌐 Proxying frontend request to: );
    
    return fetch(frontendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }
};
