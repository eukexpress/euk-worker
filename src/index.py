# src/index.py
from js import Response, fetch
import json

async def on_fetch(request):
    url = request.url
    path = url.pathname
    
    # Get origins from environment variables
    frontend_origin = FRONTEND_ORIGIN
    backend_origin = BACKEND_ORIGIN
    
    # Route API requests to backend
    if path.startswith('/api/'):
        backend_url = backend_origin + path + url.search
        print(f"🔄 API Request: {path}")
        
        # Forward the request
        response = await fetch(backend_url, {
            'method': request.method,
            'headers': request.headers,
            'body': request.body
        })
        return response
    
    # Route all other requests to frontend
    else:
        frontend_url = frontend_origin + path + url.search
        print(f"🌐 Frontend Request: {path}")
        
        response = await fetch(frontend_url, {
            'method': request.method,
            'headers': request.headers,
            'body': request.body
        })
        return response