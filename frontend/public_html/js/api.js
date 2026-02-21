// API client for all backend endpoints

const API_BASE = '/api/v1';

const api = {
    // Authentication
    login: (credentials) => fetch(${API_BASE}/auth/login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }),
    
    logout: () => fetch(${API_BASE}/auth/logout, { method: 'POST' }),
    
    // Dashboard (Layer 1)
    getDashboard: () => fetch(${API_BASE}/dashboard, {
        headers: { 'Authorization': Bearer  }
    }),
    
    // Shipment History (Layer 2)
    getShipments: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return fetch(${API_BASE}/shipments?, {
            headers: { 'Authorization': Bearer  }
        });
    },
    
    // Shipment Operations (Layer 3)
    getShipment: (tracking) => fetch(${API_BASE}/shipments/, {
        headers: { 'Authorization': Bearer  }
    }),
    
    updateStatus: (tracking, data) => fetch(${API_BASE}/shipments//status, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    // Interventions
    toggleCustoms: (tracking, data) => fetch(${API_BASE}/shipments//interventions/customs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    toggleSecurity: (tracking, data) => fetch(${API_BASE}/shipments//interventions/security, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    reportDamage: (tracking, data) => fetch(${API_BASE}/shipments//interventions/damage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    initiateReturn: (tracking, data) => fetch(${API_BASE}/shipments//interventions/return, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    reportDelay: (tracking, data) => fetch(${API_BASE}/shipments//interventions/delay, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    // Communication
    sendMessage: (tracking, data) => fetch(${API_BASE}/shipments//message, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer `n        },
        body: JSON.stringify(data)
    }),
    
    // Create Shipment
    createShipment: (formData) => fetch(${API_BASE}/shipments/create, {
        method: 'POST',
        headers: { 'Authorization': Bearer  },
        body: formData
    }),
    
    // Public Tracking
    trackPublic: (tracking) => fetch(${API_BASE}/public/track/)
};