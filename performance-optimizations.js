/* Performance Optimized JavaScript for Scottish Power Fragments */

(function() {
    'use strict';
    
    // Performance optimization - only load when needed
    let animationObserver;
    let lazyImageObserver;
    
    // Initialize critical functionality immediately
    document.addEventListener('DOMContentLoaded', function() {
        initializeCriticalFeatures();
        
        // Defer non-critical features
        requestIdleCallback(function() {
            initializeScrollAnimations();
            initializeLazyLoading();
        });
    });
    
    /**
     * Initialize critical features that affect LCP
     */
    function initializeCriticalFeatures() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('.navbar-nav').classList.toggle('show');
            });
        }
        
        // Dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(function(dropdown) {
            dropdown.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                if (menu) {
                    menu.classList.toggle('show');
                }
            });
        });
        
        // Close dropdowns on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                    menu.classList.remove('show');
                });
            }
        });
    }
    
    /**
     * Optimized scroll animations - only observe elements that need animation
     */
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
        if (!animatedElements.length) return;
        
        animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animationObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(function(element) {
            animationObserver.observe(element);
        });
    }
    
    /**
     * Lazy loading for images - improve LCP
     */
    function initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (!lazyImages.length) return;
        
        lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    lazyImageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(function(img) {
            lazyImageObserver.observe(img);
        });
    }
    
    /**
     * Debounced scroll handler for performance
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Optimize form validation - only validate on blur/submit
     */
    function initializeFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
            
            form.addEventListener('submit', function(e) {
                let isValid = true;
                inputs.forEach(function(input) {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }
    
    /**
     * Simplified field validation
     */
    function validateField(field) {
        const value = field.value.trim();
        const required = field.hasAttribute('required');
        
        if (required && !value) {
            field.classList.add('error');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            field.classList.add('error');
            return false;
        }
        
        field.classList.remove('error');
        return true;
    }
    
    /**
     * Simple email validation
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    /**
     * Cleanup observers on page unload
     */
    window.addEventListener('beforeunload', function() {
        if (animationObserver) {
            animationObserver.disconnect();
        }
        if (lazyImageObserver) {
            lazyImageObserver.disconnect();
        }
    });
    
    // Export for module usage
    window.SPPerformance = {
        initializeCriticalFeatures: initializeCriticalFeatures,
        initializeScrollAnimations: initializeScrollAnimations,
        initializeLazyLoading: initializeLazyLoading,
        debounce: debounce
    };
})();