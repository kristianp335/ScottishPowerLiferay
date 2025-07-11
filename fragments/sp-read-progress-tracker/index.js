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
        
        // Check if content area has actual content (beyond the default dropzone alert)
        const dropzone = contentArea.querySelector('lfr-drop-zone');
        let hasRealContent = false;
        
        if (!dropzone) {
            // Dropzone has been replaced with content
            hasRealContent = contentArea.children.length > 0;
            console.log('Dropzone replaced with content, children count:', contentArea.children.length);
        } else {
            // Check if dropzone has been populated with content
            hasRealContent = dropzone.children.length > 1 || 
                (dropzone.children.length === 1 && !dropzone.querySelector('.alert'));
            console.log('Dropzone found, children count:', dropzone.children.length, 'has alert:', !!dropzone.querySelector('.alert'));
        }
        
        console.log('Content check result:', hasRealContent);
        
        if (hasRealContent) {
            trackerElement.classList.add('has-content');
            if (!isVisible) {
                showProgressTracker();
                startProgressTracking();
            }
        } else {
            trackerElement.classList.remove('has-content');
            // For now, show the tracker even without content for testing
            showProgressTracker();
            startProgressTracking();
        }
        
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
        
        // Get all actual content elements inside the content area
        const allContentElements = contentArea.querySelectorAll('*:not(.alert):not(lfr-drop-zone)');
        
        if (allContentElements.length === 0) {
            console.log('No content found to track');
            return;
        }
        
        // Calculate the full content area bounds including all dropped content
        let topMostElement = null;
        let bottomMostElement = null;
        let totalHeight = 0;
        
        for (let element of allContentElements) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const elementBottom = rect.bottom + window.pageYOffset;
            
            if (!topMostElement || elementTop < (topMostElement.getBoundingClientRect().top + window.pageYOffset)) {
                topMostElement = element;
            }
            if (!bottomMostElement || elementBottom > (bottomMostElement.getBoundingClientRect().bottom + window.pageYOffset)) {
                bottomMostElement = element;
            }
        }
        
        if (!topMostElement || !bottomMostElement) {
            console.log('Could not determine content bounds');
            return;
        }
        
        // Calculate reading progress based on scroll position through all content
        const topRect = topMostElement.getBoundingClientRect();
        const bottomRect = bottomMostElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Content bounds
        const contentTop = topRect.top + window.pageYOffset;
        const contentBottom = bottomRect.bottom + window.pageYOffset;
        const contentHeight = contentBottom - contentTop;
        
        // Current scroll position
        const scrollTop = window.pageYOffset;
        const viewportTop = scrollTop;
        const viewportBottom = scrollTop + viewportHeight;
        
        let progress = 0;
        
        if (viewportTop >= contentBottom) {
            // Scrolled past all content
            progress = 1;
        } else if (viewportBottom <= contentTop) {
            // Haven't reached content yet
            progress = 0;
        } else {
            // Calculate progress based on how much content has been scrolled through
            const scrolledPastStart = Math.max(0, viewportTop - contentTop);
            const totalScrollableDistance = Math.max(1, contentHeight - viewportHeight);
            progress = Math.min(1, scrolledPastStart / totalScrollableDistance);
        }
        
        console.log('Progress calculation:', {
            contentTop: Math.round(contentTop),
            contentBottom: Math.round(contentBottom),
            contentHeight: Math.round(contentHeight),
            scrollTop: Math.round(scrollTop),
            viewportTop: Math.round(viewportTop),
            viewportBottom: Math.round(viewportBottom),
            progress: Math.round(progress * 100) + '%',
            elementsFound: allContentElements.length
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
        
        // Force tracker to be visible immediately
        showProgressTracker();
        
        // Initial calculation with delay to ensure DOM is ready
        setTimeout(() => {
            calculateReadingProgress();
        }, 100);
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