function initializeReadProgressTracker() {
    if (window.spReadProgressTracker && window.spReadProgressTracker.initialized) return;
    
    const editMode = document.body.classList.contains('has-edit-mode-menu');
    if (editMode) {
        initializeForEditMode();
        return;
    }
    
    try {
        initializeProgressCalculation();
        window.spReadProgressTracker = { initialized: true };
    } catch (error) {
        console.error('Error initializing read progress tracker:', error);
    }
}

function initializeForEditMode() {
    // In edit mode, show the tracker but don't activate scroll tracking
    const trackerElement = document.querySelector('.sp-read-progress-tracker');
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
    const trackerElement = document.querySelector('.sp-read-progress-tracker');
    if (!trackerElement) return;
    
    // Use the content area wrapper instead of dropzone (which disappears when content is added)
    const contentArea = trackerElement.querySelector('.progress-content-area');
    const progressFill = trackerElement.querySelector('.progress-fill');
    const progressPercentage = trackerElement.querySelector('.progress-percentage');
    const progressBar = trackerElement.querySelector('.progress-bar');
    const progressTracker = trackerElement.querySelector('.progress-tracker');
    
    if (!contentArea || !progressFill) return;
    
    let isVisible = false;
    let currentProgress = 0;
    
    // Configuration from fragment settings
    const smoothScrolling = trackerElement.querySelector('[data-smooth-scrolling]') ? 
        trackerElement.querySelector('[data-smooth-scrolling]').dataset.smoothScrolling === 'true' : true;
    
    function checkForContent() {
        if (!contentArea) return false;
        
        // Check if content area has actual content (beyond the default dropzone alert)
        const dropzone = contentArea.querySelector('lfr-drop-zone');
        let hasRealContent = false;
        
        if (!dropzone) {
            // Dropzone has been replaced with content
            hasRealContent = contentArea.children.length > 0;
        } else {
            // Check if dropzone has been populated with content
            hasRealContent = dropzone.children.length > 1 || 
                (dropzone.children.length === 1 && !dropzone.querySelector('.alert'));
        }
        
        if (hasRealContent) {
            trackerElement.classList.add('has-content');
            if (!isVisible) {
                showProgressTracker();
                startProgressTracking();
            }
        } else {
            trackerElement.classList.remove('has-content');
            hideProgressTracker();
        }
        
        return hasRealContent;
    }
    
    function showProgressTracker() {
        if (progressTracker) {
            progressTracker.classList.add('visible');
            isVisible = true;
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
        
        const contentRect = contentArea.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the content area has been scrolled through
        const contentTop = contentRect.top;
        const contentHeight = contentRect.height;
        const contentBottom = contentTop + contentHeight;
        
        let progress = 0;
        
        if (contentTop <= 0 && contentBottom >= viewportHeight) {
            // Content is larger than viewport and we're in the middle
            progress = Math.abs(contentTop) / (contentHeight - viewportHeight);
        } else if (contentTop <= 0 && contentBottom < viewportHeight) {
            // We've scrolled past most of the content
            progress = 1;
        } else if (contentTop > 0) {
            // Content hasn't started yet
            progress = 0;
        }
        
        // Ensure progress is between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
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
        
        // Initial calculation
        calculateReadingProgress();
    }
    
    // Watch for content changes in dropzone
    const observer = new MutationObserver(checkForContent);
    observer.observe(dropzone, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // Initial content check
    checkForContent();
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