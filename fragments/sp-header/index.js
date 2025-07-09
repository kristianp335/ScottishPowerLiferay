
/* JavaScript for sp-header */

document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation menu ID from fragment configuration
    const fragmentElement = document.querySelector('[data-lfr-fragment-entry-link-id]');
    const configurationNamespace = fragmentElement ? 
        fragmentElement.getAttribute('data-lfr-fragment-entry-link-id') : '';
    
    // Get configuration value or use default
    const navigationMenuId = window.fragmentNamespace && 
        window.fragmentNamespace[configurationNamespace] && 
        window.fragmentNamespace[configurationNamespace].navigationMenuId || '36850';
    
    // Fetch navigation menu data
    fetchNavigationMenu(navigationMenuId);
});

function fetchNavigationMenu(menuId) {
    // Check if Liferay object exists and has authToken
    if (typeof Liferay === 'undefined' || !Liferay.authToken) {
        console.warn('Liferay context not available. Using static navigation.');
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
            renderNavigationMenu(data.navigationMenuItems);
        })
        .catch(error => {
            console.error('Error fetching navigation menu:', error);
            console.log('Falling back to static navigation menu');
        });
}

function renderNavigationMenu(menuItems) {
    const navContainer = document.querySelector('.nav-menu');
    if (!navContainer || !menuItems) {
        return;
    }
    
    // Clear existing navigation items
    navContainer.innerHTML = '';
    
    // Build navigation HTML
    menuItems.forEach(item => {
        const navItem = createNavigationItem(item);
        navContainer.appendChild(navItem);
    });
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

// Initialize dropdowns after menu is rendered
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for menu to be potentially updated
    setTimeout(initializeDropdowns, 100);
});
