
/* JavaScript for sp-header */

// Navigation initialization function
function initializeNavigation() {
    console.log('🏗️ Header fragment initializing...');
    
    // Get the navigation menu ID from fragment configuration
    const fragmentElement = document.querySelector('[data-lfr-fragment-entry-link-id]');
    const configurationNamespace = fragmentElement ? 
        fragmentElement.getAttribute('data-lfr-fragment-entry-link-id') : '';
    
    console.log('🔍 Fragment element found:', !!fragmentElement);
    console.log('🏷️ Configuration namespace:', configurationNamespace);
    console.log('🌐 Window fragmentNamespace exists:', !!window.fragmentNamespace);
    
    if (window.fragmentNamespace) {
        console.log('📋 Available namespaces:', Object.keys(window.fragmentNamespace));
        if (window.fragmentNamespace[configurationNamespace]) {
            console.log('⚙️ Fragment configuration:', window.fragmentNamespace[configurationNamespace]);
        }
    }
    
    // Get configuration value or use default
    const navigationMenuId = window.fragmentNamespace && 
        window.fragmentNamespace[configurationNamespace] && 
        window.fragmentNamespace[configurationNamespace].navigationMenuId || '36850';
    
    console.log('🗂️ Using navigation menu ID:', navigationMenuId);
    
    // Fetch navigation menu data
    fetchNavigationMenu(navigationMenuId);
}

// Listen for multiple initialization events
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Listen for SennaJS navigation events
if (typeof Liferay !== 'undefined' && Liferay.on) {
    // Listen for SennaJS page navigation start
    Liferay.on('beforeNavigate', function() {
        console.log('🚢 SennaJS navigation starting...');
    });
    
    // Listen for SennaJS page navigation completion
    Liferay.on('endNavigate', function() {
        console.log('🚢 SennaJS navigation completed, reinitializing navigation...');
        setTimeout(initializeNavigation, 100); // Small delay to ensure DOM is ready
    });
}

// Listen for fragment re-rendering events
if (typeof Liferay !== 'undefined' && Liferay.component) {
    // Listen for fragment updates
    document.addEventListener('fragmentEntryLinkRendered', function(event) {
        console.log('🔄 Fragment re-rendered, reinitializing navigation...');
        setTimeout(initializeNavigation, 100);
    });
}

// Fallback: Check and reinitialize periodically
setInterval(function() {
    const navContainer = document.querySelector('.navbar-nav');
    if (navContainer && navContainer.children.length === 0) {
        console.log('🔧 Navigation container is empty, reinitializing...');
        initializeNavigation();
    }
}, 2000);

function fetchNavigationMenu(menuId) {
    console.log('🚀 Attempting to fetch navigation menu...');
    console.log('📊 Menu ID requested:', menuId);
    console.log('🔐 Liferay object exists:', typeof Liferay !== 'undefined');
    
    if (typeof Liferay !== 'undefined') {
        console.log('🎫 Liferay.authToken exists:', !!Liferay.authToken);
        console.log('👤 Liferay.ThemeDisplay exists:', !!Liferay.ThemeDisplay);
        if (Liferay.ThemeDisplay) {
            console.log('🌍 Site Group ID:', Liferay.ThemeDisplay.getSiteGroupId());
            console.log('🏢 Company ID:', Liferay.ThemeDisplay.getCompanyId());
        }
    }
    
    // Check if Liferay object exists and has authToken
    if (typeof Liferay === 'undefined' || !Liferay.authToken) {
        console.warn('⚠️ Liferay context not available. Building fallback navigation.');
        buildFallbackNavigation();
        return;
    }
    
    const apiUrl = `/o/headless-delivery/v1.0/navigation-menus/${menuId}?nestedFields=true&p_auth=${Liferay.authToken}`;
    console.log('🌐 API URL:', apiUrl);
    
    fetch(apiUrl)
        .then(response => {
            console.log('📡 Response status:', response.status);
            console.log('📡 Response headers:', [...response.headers.entries()]);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Navigation menu data received:', data);
            console.log('📝 Menu items count:', data.navigationMenuItems ? data.navigationMenuItems.length : 0);
            
            if (data.navigationMenuItems) {
                console.log('🗂️ Menu items:', data.navigationMenuItems.map(item => ({
                    name: item.name,
                    link: item.link,
                    hasChildren: !!(item.navigationMenuItems && item.navigationMenuItems.length > 0)
                })));
            }
            
            renderNavigationMenu(data.navigationMenuItems);
        })
        .catch(error => {
            console.error('❌ Error fetching navigation menu:', error);
            console.log('🔄 Building fallback navigation menu');
            
            // Try alternative API endpoints for debugging
            if (typeof Liferay !== 'undefined' && Liferay.ThemeDisplay) {
                const siteId = Liferay.ThemeDisplay.getSiteGroupId();
                const altUrl = `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus`;
                console.log('🔍 Trying alternative endpoint:', altUrl);
                
                fetch(altUrl + `?p_auth=${Liferay.authToken}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('📋 Available navigation menus for site:', data);
                    })
                    .catch(altError => {
                        console.error('❌ Alternative endpoint also failed:', altError);
                    });
            }
            
            // Build fallback navigation
            buildFallbackNavigation();
        });
}

function renderNavigationMenu(menuItems) {
    console.log('🎨 Attempting to render navigation menu...');
    
    const navContainer = document.querySelector('.navbar-nav');
    console.log('📍 Nav container found:', !!navContainer);
    console.log('📝 Menu items to render:', menuItems ? menuItems.length : 'none');
    
    if (!navContainer) {
        console.warn('⚠️ No .navbar-nav container found in DOM');
        console.log('🔍 Available navigation elements:', 
            Array.from(document.querySelectorAll('[class*="nav"]')).map(el => ({
                className: el.className,
                tagName: el.tagName
            }))
        );
        return;
    }
    
    if (!menuItems) {
        console.warn('⚠️ No menu items provided to render');
        return;
    }
    
    // Clear existing navigation items
    console.log('🧹 Clearing existing navigation items');
    navContainer.innerHTML = '';
    
    // Build navigation HTML
    console.log('🏗️ Building navigation HTML...');
    menuItems.forEach((item, index) => {
        console.log(`📦 Creating nav item ${index + 1}:`, item.name);
        const navItem = createNavigationItem(item);
        navContainer.appendChild(navItem);
    });
    
    console.log('✅ Navigation menu rendered successfully');
}

function buildFallbackNavigation() {
    console.log('🔧 Building fallback navigation...');
    
    const navContainer = document.querySelector('.navbar-nav');
    if (!navContainer) {
        console.error('❌ Cannot build fallback navigation - no container found');
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
    
    console.log('✅ Fallback navigation built successfully');
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
