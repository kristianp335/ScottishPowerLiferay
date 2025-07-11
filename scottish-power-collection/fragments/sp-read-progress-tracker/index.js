function initializeReadProgressTracker() {
    // Use fragmentElement for proper scoping - each fragment instance is independent
    if (!fragmentElement) {
        console.error('fragmentElement not available - cannot initialize progress tracker');
        return;
    }
    
    // Check if this specific fragment instance is already initialized
    if (fragmentElement.dataset.progressInitialized === 'true') {
        console.log('Read progress tracker already initialized for this fragment instance');
        return;
    }
    
    // Mark this fragment instance as initialized
    fragmentElement.dataset.progressInitialized = 'true';
    
    const editMode = document.body.classList.contains('has-edit-mode-menu');
    if (editMode) {
        initializeForEditMode();
        return;
    }
    
    try {
        initializeProgressCalculation();
    } catch (error) {
        console.error('Error initializing read progress tracker:', error);
    }
}

function initializeForEditMode() {
    // In edit mode, show the tracker but don't activate scroll tracking
    const trackerElement = fragmentElement.querySelector('.sp-read-progress-tracker');
    if (trackerElement) {
        trackerElement.classList.add('has-content');
        const progressFill = trackerElement.querySelector('.progress-fill');
        const progressPercentage = trackerElement.querySelector('.progress-percentage');
        
        // Show 50% progress for demonstration in edit mode
        if (progressFill) {
            progressFill.style.width = '50%';
        }
        if (progressPercentage) {
            progressPercentage.textContent = '50%';
        }
        
        // Make tracker visible
        const progressTracker = trackerElement.querySelector('.progress-tracker');
        if (progressTracker) {
            progressTracker.classList.add('visible');
        }
    }
}

function initializeProgressCalculation() {
    // Use fragmentElement to scope to this specific fragment instance
    const trackerElement = fragmentElement.querySelector('.sp-read-progress-tracker');
    if (!trackerElement) {
        console.log('Progress tracker element not found in fragment');
        return;
    }
    
    // Find the content area that contains the dropped content
    const contentArea = fragmentElement.querySelector('.progress-content-area');
    const progressFill = fragmentElement.querySelector('.progress-fill');
    const progressPercentage = fragmentElement.querySelector('.progress-percentage');
    const progressBar = fragmentElement.querySelector('.progress-bar');
    const progressTracker = fragmentElement.querySelector('.progress-tracker');
    
    console.log('Progress tracker elements found:', {
        trackerElement: !!trackerElement,
        contentArea: !!contentArea,
        progressFill: !!progressFill,
        progressTracker: !!progressTracker
    });
    
    if (!contentArea || !progressFill) {
        console.log('Missing required elements for progress tracker');
        return;
    }
    
    let isVisible = false;
    let currentProgress = 0;
    
    // Configuration from fragment settings
    const smoothScrolling = trackerElement.querySelector('[data-smooth-scrolling]') ? 
        trackerElement.querySelector('[data-smooth-scrolling]').dataset.smoothScrolling === 'true' : true;
    
    function checkForContent() {
        if (!contentArea) return false;
        
        // Look for Liferay layout structure items (actual dropped content)
        const layoutItems = contentArea.querySelectorAll('.lfr-layout-structure-item-basic-component-html, .lfr-layout-structure-item, [data-layout-structure-item-id]');
        const dropzone = contentArea.querySelector('lfr-drop-zone');
        
        let hasRealContent = false;
        
        if (layoutItems.length > 0) {
            // Found Liferay layout structure items - this is actual dropped content
            hasRealContent = true;
            console.log('Found Liferay layout items:', layoutItems.length);
        } else if (!dropzone) {
            // Dropzone has been replaced with other content
            hasRealContent = contentArea.children.length > 0;
            console.log('Dropzone replaced with content, children count:', contentArea.children.length);
        } else {
            // Check if dropzone has been populated with content
            hasRealContent = dropzone.children.length > 1 || 
                (dropzone.children.length === 1 && !dropzone.querySelector('.alert'));
            console.log('Dropzone found, children count:', dropzone.children.length, 'has alert:', !!dropzone.querySelector('.alert'));
        }
        
        console.log('Content check result:', hasRealContent, 'Layout items found:', layoutItems.length);
        
        if (hasRealContent) {
            trackerElement.classList.add('has-content');
        } else {
            trackerElement.classList.remove('has-content');
        }
        
        // Always show tracker and start tracking regardless of content
        showProgressTracker();
        startProgressTracking();
        
        return hasRealContent;
    }
    
    function showProgressTracker() {
        if (progressTracker) {
            progressTracker.classList.add('visible');
            progressTracker.style.display = 'block';
            isVisible = true;
            console.log('Progress tracker made visible');
        }
    }
    
    function hideProgressTracker() {
        if (progressTracker) {
            progressTracker.classList.remove('visible');
            isVisible = false;
        }
    }
    
    function calculateReadingProgress() {
        if (!contentArea || !isVisible) return;
        
        // Find the specific content container - the progress-content-area div itself
        const contentRect = contentArea.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        // Get absolute positions
        const contentTop = contentRect.top + scrollTop;
        const contentBottom = contentRect.bottom + scrollTop;
        const contentHeight = contentRect.height;
        
        // Calculate progress based on how much of the content area has been scrolled through
        let progress = 0;
        
        if (scrollTop + viewportHeight >= contentBottom) {
            // Bottom of content is visible (fully read)
            progress = 1;
        } else if (scrollTop >= contentTop) {
            // Started reading content
            const scrolledIntoContent = (scrollTop + viewportHeight) - contentTop;
            const totalReadableHeight = contentHeight;
            progress = Math.min(1, Math.max(0, scrolledIntoContent / totalReadableHeight));
        } else if (scrollTop + viewportHeight > contentTop) {
            // Content is partially visible at bottom of viewport
            const visibleHeight = (scrollTop + viewportHeight) - contentTop;
            progress = Math.min(0.1, visibleHeight / contentHeight);
        }
        
        // Ensure progress is between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        console.log('Progress calculation:', {
            contentTop: Math.round(contentTop),
            contentBottom: Math.round(contentBottom),
            contentHeight: Math.round(contentHeight),
            scrollTop: Math.round(scrollTop),
            viewportHeight: Math.round(viewportHeight),
            scrollPlusViewport: Math.round(scrollTop + viewportHeight),
            progress: Math.round(progress * 100) + '%'
        });
        
        updateProgressDisplay(progress);
    }
    
    function updateProgressDisplay(progress) {
        const percentage = Math.round(progress * 100);
        
        if (currentProgress === percentage) return;
        currentProgress = percentage;
        
        // Update progress bar or circle
        if (progressBar.closest('.circle')) {
            // Circular progress
            const degrees = progress * 360;
            progressBar.style.background = `conic-gradient(#00A651 ${degrees}deg, #e9ecef ${degrees}deg)`;
        } else {
            // Linear progress bar
            progressFill.style.width = `${percentage}%`;
        }
        
        // Update percentage text
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        
        // Add completion effect
        if (percentage === 100) {
            progressTracker.classList.add('completed');
            setTimeout(() => {
                progressTracker.classList.remove('completed');
            }, 2000);
        }
    }
    
    function startProgressTracking() {
        // Prevent duplicate event listeners
        if (fragmentElement.dataset.trackingStarted === 'true') {
            return;
        }
        fragmentElement.dataset.trackingStarted = 'true';
        
        // Throttled scroll handler for performance
        let ticking = false;
        
        function updateProgress() {
            calculateReadingProgress();
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                if (smoothScrolling) {
                    requestAnimationFrame(updateProgress);
                } else {
                    updateProgress();
                }
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', calculateReadingProgress, { passive: true });
        
        // Initial calculation immediately and with delay
        calculateReadingProgress();
        setTimeout(() => {
            calculateReadingProgress();
        }, 500);
        
        console.log('Progress tracking started for fragment');
    }
    
    // Always show tracker initially (for testing)
    showProgressTracker();
    
    // Watch for content changes in content area - including when content is dropped
    const observer = new MutationObserver((mutations) => {
        console.log('Content area mutations detected:', mutations.length);
        setTimeout(() => {
            checkForContent();
            // Recalculate progress when content changes
            if (isVisible) {
                calculateReadingProgress();
            }
        }, 100);
    });
    observer.observe(contentArea, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // Initial content check with delay
    setTimeout(() => {
        checkForContent();
    }, 100);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeReadProgressTracker);

// SennaJS support for SPA navigation
if (window.Liferay) {
    Liferay.on('endNavigate', function() {
        window.spReadProgressTracker = { initialized: false };
        setTimeout(initializeReadProgressTracker, 100);
    });
    
    Liferay.on('beforeScreenFlip', function() {
        // Clean up existing instances
        const existingTrackers = document.querySelectorAll('.progress-tracker');
        existingTrackers.forEach(tracker => {
            tracker.classList.remove('visible');
        });
    });
}

// Additional navigation fallback
document.addEventListener('navigate', function() {
    window.spReadProgressTracker = { initialized: false };
    setTimeout(initializeReadProgressTracker, 100);
});