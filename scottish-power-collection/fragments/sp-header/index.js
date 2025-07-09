
/* JavaScript for sp-header */

// Global state management
window.spNavigation = window.spNavigation || {
    initialized: false,
    loading: false,
    retryCount: 0
};

// Clean initialization function
function initializeNavigation() {
    // Prevent multiple simultaneous loads
    if (window.spNavigation.loading) {
        console.log('Navigation already loading, skipping...');
        return;
    }
    
    // Check if navigation already exists and is populated
    const navContainer = document.querySelector('.navbar-nav');
    if (navContainer && navContainer.children.length > 1) {
        console.log('Navigation already loaded, skipping...');
        return;
    }
    
    window.spNavigation.loading = true;
    console.log('Initializing header navigation...');
    
    // Get configuration
    const fragmentElement = document.querySelector('[data-lfr-fragment-entry-link-id]');
    const configurationNamespace = fragmentElement ? 
        fragmentElement.getAttribute('data-lfr-fragment-entry-link-id') : '';
    
    const navigationMenuId = window.fragmentNamespace && 
        window.fragmentNamespace[configurationNamespace] && 
        window.fragmentNamespace[configurationNamespace].navigationMenuId || '36850';
    
    console.log('Using navigation menu ID:', navigationMenuId);
    
    // Fetch navigation menu data
    fetchNavigationMenu(navigationMenuId);
}

// Single robust initialization setup
(function setupNavigation() {
    // Immediate initialization if DOM is ready
    if (document.readyState !== 'loading') {
        initializeNavigation();
    } else {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    }
    
    // SennaJS support with cleanup
    if (typeof Liferay !== 'undefined' && Liferay.on) {
        Liferay.on('endNavigate', function() {
            console.log('Page navigation completed, reinitializing...');
            window.spNavigation.initialized = false;
            window.spNavigation.loading = false;
            setTimeout(initializeNavigation, 200);
        });
    }
})();

function fetchNavigationMenu(menuId) {
    console.log('Fetching navigation menu ID:', menuId);
    
    // Check if Liferay object exists and has authToken
    if (typeof Liferay === 'undefined' || !Liferay.authToken) {
        console.warn('Liferay context not available. Building fallback navigation.');
        buildFallbackNavigation();
        window.spNavigation.loading = false;
        window.spNavigation.initialized = true;
        return;
    }
    
    const apiUrl = `/o/headless-delivery/v1.0/navigation-menus/${menuId}?nestedFields=true&p_auth=${Liferay.authToken}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Navigation menu loaded with', data.navigationMenuItems ? data.navigationMenuItems.length : 0, 'items');
            renderNavigationMenu(data.navigationMenuItems);
            
            // Mark as completed
            window.spNavigation.loading = false;
            window.spNavigation.initialized = true;
        })
        .catch(error => {
            console.error('Error fetching navigation menu:', error);
            
            // Build fallback navigation
            buildFallbackNavigation();
            
            // Mark as completed
            window.spNavigation.loading = false;
            window.spNavigation.initialized = true;
        });
}

function renderNavigationMenu(menuItems) {
    const navContainer = document.querySelector('.navbar-nav');
    
    if (!navContainer) {
        console.warn('Navigation container not found');
        return;
    }
    
    if (!menuItems || menuItems.length === 0) {
        console.warn('No menu items to render');
        buildFallbackNavigation();
        return;
    }
    
    // Clear existing navigation items
    navContainer.innerHTML = '';
    
    // Build navigation HTML
    menuItems.forEach(item => {
        const navItem = createNavigationItem(item);
        navContainer.appendChild(navItem);
    });
    
    console.log('Navigation rendered successfully');
}

function buildFallbackNavigation() {
    console.log('Building fallback navigation...');
    
    const navContainer = document.querySelector('.navbar-nav');
    if (!navContainer) {
        console.error('Cannot build fallback navigation - no container found');
        return;
    }
    
    // Clear loading state
    navContainer.innerHTML = '';
    
    // Create basic navigation structure
    const fallbackItems = [
        { name: 'Energy', link: '/energy' },
        { name: 'Solar', link: '/solar' },
        { name: 'EV Charging', link: '/ev-charging' },
        { name: 'Home Services', link: '/home-services' },
        { name: 'Help', link: '/help' }
    ];
    
    fallbackItems.forEach(item => {
        const navItem = createNavigationItem(item);
        navContainer.appendChild(navItem);
    });
    
    console.log('Fallback navigation built successfully');
}

function createNavigationItem(item) {
    const navItem = document.createElement('div');
    navItem.className = 'nav-item';
    
    // Check if item has children for dropdown
    if (item.navigationMenuItems && item.navigationMenuItems.length > 0) {
        navItem.classList.add('dropdown');
        
        // Create dropdown toggle
        const navLink = document.createElement('a');
        navLink.href = item.link || '#';
        navLink.className = 'nav-link dropdown-toggle';
        navLink.textContent = item.name;
        navItem.appendChild(navLink);
        
        // Create dropdown menu
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        
        // Add child items
        item.navigationMenuItems.forEach(childItem => {
            const dropdownItem = document.createElement('a');
            dropdownItem.href = childItem.link || '#';
            dropdownItem.className = 'dropdown-item';
            dropdownItem.textContent = childItem.name;
            dropdownMenu.appendChild(dropdownItem);
        });
        
        navItem.appendChild(dropdownMenu);
    } else {
        // Simple navigation link
        const navLink = document.createElement('a');
        navLink.href = item.link || '#';
        navLink.className = 'nav-link';
        navLink.textContent = item.name;
        navItem.appendChild(navLink);
    }
    
    return navItem;
}

// Initialize dropdown functionality
function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

// Ensure script persists across SennaJS navigation
if (typeof window.scottishPowerHeaderInitialized === 'undefined') {
    window.scottishPowerHeaderInitialized = true;
    
    // Mark this script as permanent for SennaJS
    const scriptElements = document.querySelectorAll('script[src*="sp-header"]');
    scriptElements.forEach(script => {
        script.setAttribute('data-senna-track', 'permanent');
    });
}

// Initialize dropdowns with SennaJS support
function initializeDropdownsWithSennaSupport() {
    setTimeout(function() {
        initializeDropdowns();
        console.log('🎯 Dropdowns initialized with SennaJS support');
    }, 100);
}

// Initialize dropdowns after navigation events
document.addEventListener('DOMContentLoaded', initializeDropdownsWithSennaSupport);

// Re-initialize dropdowns after SennaJS navigation
if (typeof Liferay !== 'undefined' && Liferay.on) {
    Liferay.on('endNavigate', initializeDropdownsWithSennaSupport);
}
