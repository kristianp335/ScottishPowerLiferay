/* JavaScript for sp-testimonials */

// Global state management for testimonials
window.spTestimonials = window.spTestimonials || {
    initialized: false,
    loading: false
};

// Initialize testimonials functionality
function initializeTestimonials() {
    // Check if in edit mode
    const editMode = document.body.classList.contains('has-edit-mode-menu');
    
    if (editMode) {
        console.log('Testimonials: Edit mode detected - simplified initialization');
        initializeForEditMode();
        return;
    }
    
    if (window.spTestimonials.loading || window.spTestimonials.initialized) {
        return;
    }
    
    window.spTestimonials.loading = true;
    console.log('Initializing testimonials...');
    
    initializeTestimonialsDisplay();
    initializeScrollAnimations();
    
    window.spTestimonials.loading = false;
    window.spTestimonials.initialized = true;
}

function initializeForEditMode() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '1';
        testimonial.style.transform = 'none';
        testimonial.style.visibility = 'visible';
    });
    
    window.spTestimonials.loading = false;
    window.spTestimonials.initialized = true;
}

function initializeTestimonialsDisplay() {
    // Initialize star ratings
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach(rating => {
        const score = rating.getAttribute('data-score');
        if (score) {
            generateStars(rating, parseFloat(score));
        }
    });
    
    // Initialize any carousel functionality
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        // Basic carousel setup
        const track = carousel.querySelector('.testimonials-track');
        if (track) {
            track.style.display = 'flex';
            track.style.gap = '20px';
        }
    }
}

function generateStars(container, score) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">★</span>';
    }
    
    container.innerHTML = starsHTML;
}

function initializeScrollAnimations() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(20px)';
            testimonial.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(testimonial);
        });
    }
}

// Setup with SennaJS support
(function setupTestimonials() {
    if (document.readyState !== 'loading') {
        initializeTestimonials();
    } else {
        document.addEventListener('DOMContentLoaded', initializeTestimonials);
    }
    
    if (typeof Liferay !== 'undefined' && Liferay.on) {
        Liferay.on('endNavigate', function() {
            window.spTestimonials.initialized = false;
            window.spTestimonials.loading = false;
            setTimeout(initializeTestimonials, 200);
        });
        
        Liferay.on('screenFlip', function() {
            setTimeout(initializeTestimonials, 100);
        });
    }
    
    document.addEventListener('navigate', function() {
        setTimeout(initializeTestimonials, 100);
    });
})();
