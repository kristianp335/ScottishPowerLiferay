/**
 * Fragment Loader for Scottish Power Liferay Collection
 * Loads and processes fragment content for demo purposes
 */

class FragmentLoader {
    constructor() {
        this.fragments = [
            { name: 'sp-header', container: 'header-fragment' },
            { name: 'sp-hero', container: 'hero-fragment' },
            { name: 'sp-half-price-weekends', container: 'half-price-fragment' },
            { name: 'sp-service-blocks', container: 'service-blocks-fragment' },
            { name: 'sp-product-cards', container: 'product-cards-fragment' },
            { name: 'sp-support-sections', container: 'support-sections-fragment' },
            { name: 'sp-awards', container: 'awards-fragment' },
            { name: 'sp-read-progress-tracker', container: 'progress-tracker-fragment' },
            { name: 'sp-testimonials', container: 'testimonials-fragment' },
            { name: 'sp-footer', container: 'footer-fragment' }
        ];
        
        this.loadedFragments = new Set();
        this.initializeLoader();
    }

    initializeLoader() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadAllFragments();
        });
    }

    async loadAllFragments() {
        for (let i = 0; i < this.fragments.length; i++) {
            const fragment = this.fragments[i];
            setTimeout(() => {
                this.loadFragment(fragment.name, fragment.container);
            }, i * 300);
        }
    }

    async loadFragment(fragmentName, containerId) {
        try {
            const response = await fetch(`fragments/${fragmentName}/index.html`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const html = await response.text();
            const processedHtml = this.processLiferayTemplate(html);
            
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = processedHtml;
                this.loadedFragments.add(fragmentName);
                
                // Initialize fragment-specific functionality
                this.initializeFragmentFeatures(fragmentName, container);
                
                // Add animation classes
                this.addAnimations(container);
                
                console.log(`Fragment ${fragmentName} loaded successfully`);
            }
            
        } catch (error) {
            console.warn(`Could not load fragment ${fragmentName}:`, error);
            this.showFragmentPlaceholder(fragmentName, containerId);
        }
    }

    processLiferayTemplate(html) {
        return html
            // Remove Liferay conditional statements but keep content
            .replace(/\[#if[^\]]*\]/g, '')
            .replace(/\[#else\]/g, '')
            .replace(/\[#elseif[^\]]*\]/g, '')
            .replace(/\[#\/if\]/g, '')
            // Remove Liferay-specific attributes
            .replace(/data-lfr-editable-id="[^"]*"/g, '')
            .replace(/data-lfr-editable-type="[^"]*"/g, '')
            .replace(/data-lfr-background-image-id="[^"]*"/g, '')
            // Process style attributes that might have conditional logic
            .replace(/\[#if[^\]]*\]style="[^"]*"[^>]*>/g, '')
            .replace(/style="display: none;"[^>]*>/g, '')
            .replace(/class="[^"]*hidden[^"]*"/g, 'class=""');
    }

    showFragmentPlaceholder(fragmentName, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="padding: 60px 20px; text-align: center; color: var(--sp-text-secondary); background-color: var(--sp-light-grey); border-radius: var(--sp-border-radius); margin: 20px 0;">
                    <h3>${fragmentName.replace('sp-', '').replace('-', ' ').toUpperCase()}</h3>
                    <p>Fragment component ready for Liferay deployment</p>
                    <small>Enable full functionality in Liferay CMS environment</small>
                </div>
            `;
        }
    }

    addAnimations(container) {
        const elements = container.querySelectorAll('*');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 50);
        });
    }

    initializeFragmentFeatures(fragmentName, container) {
        switch (fragmentName) {
            case 'sp-header':
                this.initializeHeaderFeatures(container);
                break;
            case 'sp-hero':
                this.initializeHeroFeatures(container);
                break;
            case 'sp-product-cards':
                this.initializeCarouselFeatures(container);
                break;
            case 'sp-testimonials':
                this.initializeCarouselFeatures(container);
                break;
            case 'sp-awards':
                this.initializeCarouselFeatures(container);
                break;
            default:
                this.initializeCommonFeatures(container);
        }
    }

    initializeHeaderFeatures(container) {
        // Initialize dropdown menus
        const dropdowns = container.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    menu.classList.toggle('active');
                });
            }
        });

        // Initialize mobile menu
        const mobileToggle = container.querySelector('.mobile-toggle');
        const mobileMenu = container.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }

        // Initialize sticky behavior
        const header = container.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            });
        }
    }

    initializeHeroFeatures(container) {
        // Initialize quote form
        const quoteForm = container.querySelector('.quote-form');
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(quoteForm);
                console.log('Quote form submitted:', Object.fromEntries(formData));
                alert('Quote request submitted successfully! (Demo mode)');
            });
        }

        // Initialize postcode validation
        const postcodeInput = container.querySelector('input[name="postcode"]');
        if (postcodeInput) {
            postcodeInput.addEventListener('input', (e) => {
                const postcode = e.target.value.toUpperCase();
                // Simple UK postcode validation
                const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/;
                if (postcodeRegex.test(postcode)) {
                    e.target.classList.add('valid');
                    e.target.classList.remove('invalid');
                } else {
                    e.target.classList.add('invalid');
                    e.target.classList.remove('valid');
                }
            });
        }
    }

    initializeCarouselFeatures(container) {
        const carousels = container.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');
            const items = carousel.querySelectorAll('.carousel-item');
            let currentIndex = 0;

            function showItem(index) {
                items.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
            }

            if (prevBtn && nextBtn && items.length > 0) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                    showItem(currentIndex);
                });

                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % items.length;
                    showItem(currentIndex);
                });

                // Initialize first item
                showItem(0);
            }

            // Auto-rotation
            if (carousel.dataset.autoRotate === 'true' && items.length > 1) {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % items.length;
                    showItem(currentIndex);
                }, 5000);
            }
        });
    }

    initializeCommonFeatures(container) {
        // Initialize forms
        const forms = container.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                console.log('Form submitted:', Object.fromEntries(formData));
                alert('Form submitted successfully! (Demo mode)');
            });
        });

        // Initialize scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                }
            });
        }, observerOptions);

        const animatedElements = container.querySelectorAll('.fade-in, .slide-up');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Get loading status
    getLoadingStatus() {
        return {
            total: this.fragments.length,
            loaded: this.loadedFragments.size,
            fragments: Array.from(this.loadedFragments)
        };
    }
}

// Initialize the fragment loader
const fragmentLoader = new FragmentLoader();

// Export for use in other scripts
window.ScottishPowerFragments = {
    loader: fragmentLoader,
    getStatus: () => fragmentLoader.getLoadingStatus()
};