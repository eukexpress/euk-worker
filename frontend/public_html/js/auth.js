// Authentication handling

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await api.login({ username, password });
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem('token', data.access_token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Login failed: ' + data.detail);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
    
    // Check authentication on protected pages
    const protectedPages = ['dashboard.html', 'history.html', 'operations.html', 'create.html', 'bulk-email.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage) && !localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }
});