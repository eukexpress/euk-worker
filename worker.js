export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Configuration
    const FRONTEND_ORIGIN = 'https://eukexpress.netlify.app'; // UPDATE THIS with your actual Netlify URL after deployment
    const BACKEND_ORIGIN = 'https://eukexpress.onrender.com'; // Your Render backend

    // BACKEND ROUTES - All API, docs, and health endpoints
    if (path.startsWith('/api/') || 
        path === '/docs' || 
        path === '/openapi.json' || 
        path === '/health') {
      
      const backendUrl = BACKEND_ORIGIN + path + url.search;
      console.log(🔄 Backend Request: );
      
      return fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // FRONTEND ROUTES - Everything else goes to Netlify
    try {
      const frontendUrl = FRONTEND_ORIGIN + path + url.search;
      console.log(🌐 Frontend Request:  -> );
      
      const response = await fetch(frontendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      // Handle 404 by serving index.html (for client-side routing)
      if (response.status === 404) {
        const indexUrl = FRONTEND_ORIGIN + '/index.html';
        return fetch(indexUrl, {
          method: request.method,
          headers: request.headers,
        });
      }

      return response;
    } catch (error) {
      console.error('Frontend connection error:', error);
      
      return new Response(
        <!DOCTYPE html>
        <html>
          <head><title>EukExpress - Temporarily Unavailable</title></head>
          <body>
            <h1>Service Temporarily Unavailable</h1>
            <p>We're having trouble connecting. Please try again later.</p>
            <p><a href="/">Return to Home</a></p>
          </body>
        </html>
      , {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
};
