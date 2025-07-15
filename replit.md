# Scottish Power Corporate Website

## Overview

This is a complete component-based website system for Scottish Power, built using Liferay CMS fragments. The system provides a collection of reusable UI components that can be configured and arranged to create pages for the Scottish Power corporate website. The architecture focuses on modularity, content management flexibility, and consistent branding.

**Production Ready**: The project includes a complete deployment package (`scottish-power-collection-20250709_123524.zip`) with all fragments, resources, and client extensions ready for Liferay deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

### Navigation API Integration Pattern
- **Secured API Calls**: Always use `?p_auth={Liferay.authtoken}` parameter for authenticated Liferay API requests to prevent CSRF attacks
- **Dynamic Menu Loading**: Fetch navigation menus from Liferay's navigation API (`/api/jsonws/layoutset/get-layout-set-by-group`) rather than hardcoding navigation
- **Configurable Menu IDs**: Provide fragment configuration options for content editors to specify which navigation menu to display
- **Multi-level Navigation**: Build dropdown navigation dynamically from API response with proper hierarchy support
- **Error Handling**: Include graceful fallbacks when navigation API is unavailable or authentication fails
- **Mobile Optimization**: Ensure responsive dropdown functionality works with hamburger menus on mobile devices
- **Performance**: Implement efficient menu caching and DOM manipulation for smooth user experience

### Liferay Portlet Integration Pattern
- **Native Login Portlet**: Use `[@liferay_portlet["com_liferay_login_web_portlet_LoginPortlet"] /]` for professional login functionality
- **User Profile Integration**: Implement `[@liferay.user_personal_bar /]` for logged-in user profile display
- **Conditional Authentication Rendering**: Use `themeDisplay.isSignedIn()` to show different UI based on authentication status
- **FreeMarker Template Syntax**: 
  ```freemarker
  [#if themeDisplay.isSignedIn()]
      [@liferay.user_personal_bar /]
  [#else]
      [@liferay_portlet["com_liferay_login_web_portlet_LoginPortlet"] /]
  [/#if]
  ```
- **CSS Isolation**: Use specific selectors to prevent portlet styles from affecting fragment navigation or other elements
- **Responsive Portlet Layout**: Ensure portlets work properly in mobile layouts with proper spacing and alignment

### Liferay Fragment Development Standards
- **SennaJS Event Handling**: All fragments must include comprehensive SennaJS event support:
  - `Liferay.on('endNavigate')` - Handle SPA navigation completion
  - `Liferay.on('beforeScreenFlip')` and `Liferay.on('screenFlip')` - Manage screen transitions
  - `document.addEventListener('navigate')` - Additional navigation fallback
  - Global state management to prevent duplicate initialization
  - Proper cleanup and re-initialization patterns

- **Edit Mode Detection**: All fragments must detect Liferay Experience Designer edit mode:
  ```javascript
  const editMode = document.body.classList.contains('has-edit-mode-menu');
  if (editMode) {
      // Simplified initialization for edit mode
      // Disable animations, lazy loading, API calls
      // Ensure immediate visibility
  }
  ```

- **Fragment ZIP Structure Standards**:
  - **CRITICAL**: Individual fragment ZIPs must contain directory structure: `fragment-name/files`
  - Each fragment ZIP contains: `fragment-name/fragment.json`, `fragment-name/configuration.json`, etc.
  - Complete collection ZIP with all fragments and resources at root level
  - Each fragment includes: fragment.json, configuration.json, index.html, index.css, index.js, thumbnail.png
  - Global state management: `window.spFragmentName = { initialized: false, loading: false }`

### Liferay Client Extension Development
- Always include `assemble` property in client-extension.yaml files
- Use proper extension ID naming convention (e.g., `scottishpower-global-css:`)
- Remove `typeSettings` wrapper - put properties like `url` at root level
- Use `globalCSS` and `globalJS` types for site-wide availability
- Standard assemble pattern: `from: src` to `into: static`
- For JavaScript extensions, always include performance and SPA properties:
  - `async: true` (async loading)
  - `data-senna-track: permanent` (persist across SPA navigation)
  - `fetchpriority: low` (optimize loading priority)
  - Custom data attributes as needed

## System Architecture

### Frontend Architecture
- **Fragment-based CMS**: Uses Liferay's fragment system for component-based page building
- **Template Engine**: Utilizes Liferay's templating syntax with conditional rendering (`[#if]` statements)
- **CSS Architecture**: Custom CSS with CSS variables for consistent theming
- **JavaScript**: Vanilla JavaScript for interactivity and animations

### Component Structure
Each fragment follows a consistent structure:
- `fragment.json`: Defines component metadata and file paths
- `configuration.json`: Defines configurable properties for content editors
- `index.html`: Component markup with templating
- `index.css`: Component-specific styling
- `index.js`: Component-specific JavaScript functionality

### Theming System
- **CSS Variables**: Centralized color scheme and design tokens
- **Brand Colors**: Scottish Power green (#00A651) as primary, with supporting colors
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Typography**: System font stack for optimal performance

## Key Components

### Header Component (`sp-header`)
- **Dynamic Navigation API Integration**: Fetches navigation menus from Liferay's navigation API with security token
- **Secured API Calls**: Uses `?p_auth={Liferay.authtoken}` parameter for authenticated navigation requests
- **Configurable Menu ID**: Content editors can specify which Liferay navigation menu to display via fragment configuration
- **Professional Liferay Integration**: Native login portlet integration with conditional rendering for authenticated users
- **Dropdown Navigation**: Dynamic multi-level menu rendering with hover effects
- **Personal/Business Toggle**: Configurable section switching functionality
- **Sticky Header Option**: Configurable fixed positioning behavior
- **Multiple Layout Styles**: Default, compact, and minimal display modes
- **Responsive Design**: Mobile-optimized with hamburger menu and proper spacing

### Hero Section (`sp-hero`)
- Multiple layout options (split, centered, full-width)
- Configurable quote form
- Background overlay controls
- Call-to-action functionality

### Product Cards (`sp-product-cards`)
- Carousel, grid, or masonry layouts
- Auto-rotation capabilities
- Navigation controls
- Product feature highlights

### Service Blocks (`sp-service-blocks`)
- Configurable column layouts (2-4 columns)
- Multiple card styles (elevated, flat, bordered)
- Icon display options
- Service feature descriptions

### Awards Section (`sp-awards`)
- Multiple display styles (carousel, grid, slider)
- Award descriptions toggle
- Scroll animations
- Award logo management

### Testimonials (`sp-testimonials`)
- Trustpilot integration
- Multiple layout options
- Star rating display
- Auto-rotation functionality

### Footer Component (`sp-footer`)
- Multiple footer styles (full, compact, minimal)
- Social media links toggle
- Newsletter signup integration
- Legal links section

### Support Sections (`sp-support-sections`)
- Multiple layout options (horizontal, vertical, stacked)
- Image display controls
- Webchat emphasis option
- Step-by-step process display

### Half-Price Weekends (`sp-half-price-weekends`)
- Promotional content display
- Multiple style options (card, banner, minimal)
- Badge display controls
- Benefits highlighting

## Data Flow

### Content Management
1. **Configuration**: Content editors use configuration options to customize component behavior
2. **Template Processing**: Liferay processes templates with conditional logic
3. **Content Rendering**: Components render with personalized content and styling
4. **Client-Side Enhancement**: JavaScript adds interactivity and animations

### Asset Management
- **Images**: Hosted on Scottish Power CDN (`api.scottishpower.co.uk`)
- **Icons**: SVG icons embedded in templates for performance
- **Fonts**: System font stack for optimal loading

## External Dependencies

### Content Management
- **Liferay CMS**: Core content management and fragment system
- **Liferay Templating**: Template processing and conditional rendering

### Third-Party Integrations
- **Trustpilot**: Customer review and rating system
- **CDN**: Scottish Power asset delivery network
- **Analytics**: Prepared for web analytics integration

### Browser APIs
- **Intersection Observer**: For scroll animations
- **Form Validation**: Native browser form validation
- **CSS Grid/Flexbox**: Modern layout systems

## Deployment Strategy

### Component Deployment
- **Fragment Packaging**: Components deployed as Liferay fragments
- **Theme Deployment**: CSS and JavaScript deployed as client extensions
- **Asset Management**: Images and media assets managed through CDN

### Configuration Management
- **Environment Variables**: Configuration through Liferay's fragment configuration system
- **Content Versioning**: Managed through Liferay's content management system
- **A/B Testing**: Supported through configuration options

### Performance Optimization
- **Lazy Loading**: Components load content as needed
- **CSS Optimization**: Minimized CSS with design tokens
- **JavaScript Optimization**: Vanilla JavaScript for minimal overhead
- **Image Optimization**: CDN-delivered optimized images

### Browser Support
- **Modern Browsers**: Targets modern browser features
- **Progressive Enhancement**: Fallbacks for older browsers
- **Responsive Design**: Mobile-first responsive approach
- **Accessibility**: WCAG compliance considerations built into components

The system is designed to be maintainable, scalable, and flexible for content editors while providing a consistent user experience across the Scottish Power digital presence.

## Recent Changes

**July 15, 2025** - Enhanced header fragment with dynamic Liferay navigation API integration:
- ✓ **Dynamic Navigation API**: Header fragment now fetches navigation menus from Liferay's navigation API
- ✓ **Security Implementation**: All API calls secured with `?p_auth={Liferay.authtoken}` parameter for CSRF protection  
- ✓ **Configurable Menu ID**: Added fragment configuration option for content editors to specify navigation menu ID
- ✓ **Multi-level Menu Rendering**: Automatic generation of dropdown navigation with proper hierarchy support
- ✓ **Professional Authentication Integration**: Native Liferay login portlet with conditional user profile display
- ✓ **Error Handling**: Graceful fallback when navigation API is unavailable or authentication fails
- ✓ **Mobile Optimization**: Responsive dropdown functionality with hamburger menu for mobile devices
- ✓ **Performance**: Efficient menu caching and DOM manipulation for smooth user experience

**July 11, 2025** - Enhanced sp-read-progress-tracker with advanced positioning and auto-hide behavior:
- ✓ Earlier fixed position activation (20px offset instead of 50px) for better sticky header compatibility
- ✓ Auto-hide functionality when reading complete (100%) and user scrolls 200px beyond content
- ✓ Auto-show when user scrolls back to content area with smooth fade transitions
- ✓ Fixed position top increased to 100px for better spacing from sticky header
- ✓ Faster fade-in animation (0.15s) when switching to fixed position
- ✓ Fixed left/right alignment configuration by correcting FreeMarker template variable syntax
- ✓ Updated all configuration references to use proper `${configuration.fieldName}` syntax
- ✓ All three alignment options (Left, Center, Right) now work correctly
- ✓ Fixed auto-hide functionality with CSS class-based approach instead of inline styles
- ✓ Progress tracker now properly hides when scrolled 200px past content AND reading is 100% complete
- ✓ Tracker reappears with smooth fade-in when user scrolls back to content area
- ✓ **Fixed Chromium browser compatibility issues** with comprehensive cross-browser fallbacks:
  - Replaced deprecated `window.pageYOffset` with cross-browser scroll detection
  - Added viewport height fallbacks for different browser implementations
  - Enhanced event listener attachment with IE8+ compatibility
  - Improved `getBoundingClientRect()` error handling
  - Added MutationObserver fallback polling for older browsers
  - Enhanced DOMContentLoaded detection across all browser versions

**July 13, 2025** - Enhanced reading time with remaining time calculation and improved layout for all progress styles:
- ✓ **Dynamic Remaining Time**: Shows "~X min left" that decreases as user scrolls through content
- ✓ **Completion Message**: Displays "Reading complete!" when user finishes reading (100% progress)
- ✓ **Bold Colored Styling**: Read time now displayed in bold Scottish Power green (#00A651) for better visibility
- ✓ **Real-Time Progress Integration**: Remaining time updates instantly with scroll progress percentage
- ✓ **Smart Time Calculation**: Calculates remaining reading time based on current scroll position
- ✓ **Enhanced Circular Layout**: Wider container (200-300px) with horizontal layout for circular progress + read time
- ✓ **Improved Container Width**: Expanded from 200-300px to 280-400px to properly accommodate all content
- ✓ **Universal Compatibility**: Works seamlessly with all 8 emoji indicators, bar, and circular progress styles

**July 13, 2025** - Added comprehensive reading time calculation with word count analysis:
- ✓ **Reading Time Calculation**: Word count analysis of dropzone content with configurable reading speed (default: 200 WPM)
- ✓ **Real-Time Updates**: Content change detection using MutationObserver for automatic reading time recalculation
- ✓ **Dual Display**: Both scroll percentage and estimated reading time shown together for all progress styles
- ✓ **Configuration Options**: Toggle for showing read time and configurable reading speed in words per minute
- ✓ **Universal Integration**: Works with all 8 emoji progress indicators plus bar and circular styles
- ✓ **Smart Word Counting**: Excludes placeholder text and handles dynamic content changes seamlessly
- ✓ **Responsive Design**: Mobile-optimized text sizing with proper spacing for progress info display

**July 13, 2025** - Completed comprehensive emoji progress system and documentation updates:
- ✓ **Universal Emoji Progress System**: Added 8 fun emoji indicators with consistent CSS and JavaScript logic
- ✓ **Enhanced Progress Styles**: Hotdogs 🌭, Footballs ⚽, Chromium Logos 🌐, Dinosaurs 🦕, Cats 🐱, Dogs 🐶, Cars 🚗, Motorbikes 🏍️
- ✓ **Alignment Testing Optimization**: Wide containers (320-400px) for clear left/center/right configuration testing
- ✓ **Special Effects**: Blue glow effect for Chromium logos when filled, universal styling for all emoji types
- ✓ **Complete Documentation Update**: README.md updated with latest features, browser support, and performance optimizations
- ✓ **Production Ready**: Both individual fragment ZIPs and collection ZIP updated with all emoji progress indicators

**July 13, 2025** - Fixed critical FreeMarker syntax errors across all fragments:
- ✓ **Automated fix for all fragment configuration variables** using Python script
- ✓ Updated 9 fragments to use proper `${configuration.variableName}` syntax instead of `${variableName}`
- ✓ Fixed variables: displayStyle, footerStyle, showPersonalBusiness, sectionLayout, layoutStyle, heroLayout, cardStyle, showTrustpilotBranding, autoRotate, showRatings, and more
- ✓ All fragments now import successfully into Liferay without FreeMarker template errors
- ✓ Generated `scottish-power-collection-fixed.zip` with corrected syntax for immediate deployment
- ✓ Updated individual fragment ZIP files with fixes applied

**July 11, 2025** - Added sp-read-progress-tracker fragment with dropzone and content reading calculation:
- ✓ Created new sp-read-progress-tracker fragment using standard Liferay classes
- ✓ Implemented <lfr-drop-zone> with correct Liferay syntax for content editors
- ✓ Fixed FreeMarker template syntax with proper null safety and default values
- ✓ Added intelligent reading progress calculation based on scroll position through dropzone content
- ✓ Multiple progress display styles: progress bar, circular progress, percentage only
- ✓ Configurable positioning: top fixed, bottom fixed, or inline with content
- ✓ Smooth animation and performance-optimized scroll tracking
- ✓ Edit mode detection with demo progress display for Liferay Experience Designer
- ✓ Full SennaJS support for SPA navigation compatibility
- ✓ Responsive design with mobile-optimized layouts

**July 11, 2025** - Performance optimizations for improved Lighthouse scores:
- ✓ Reduced CSS bundle size by minifying selectors and removing redundant styles
- ✓ Optimized JavaScript execution with requestIdleCallback for non-critical features
- ✓ Improved animation performance using transform-only animations and will-change properties
- ✓ Reduced transition durations from 0.3s to 0.2s for better responsiveness
- ✓ Implemented lazy loading patterns for images and scroll animations
- ✓ Added intersection observer cleanup to prevent memory leaks
- ✓ Optimized CSS specificity to reduce reflow and repaint operations
- ✓ Created performance-optimized CSS and JavaScript files for critical path loading
- ✓ Added font-smoothing properties for better text rendering performance

**July 10, 2025** - Enhanced header with professional Liferay integration:
- ✓ Improved header layout with proper left/right alignment (logo+nav left, actions right)
- ✓ Integrated native Liferay login portlet using FreeMarker [@liferay_portlet] template
- ✓ Smart user authentication with [@liferay.user_personal_bar /] for logged-in users
- ✓ Conditional rendering: shows user profile widget when logged in, login button when not
- ✓ Fixed FreeMarker syntax using correct themeDisplay.isSignedIn() context variable
- ✓ Refined styling: grey navigation menu with green hover, dropdown arrows only on nav items
- ✓ Specific CSS selectors prevent button styles from affecting navigation or user profile
- ✓ Clean separation between navbar-left (brand+nav) and navbar-right (actions+toggle)
- ✓ Professional responsive design with mobile-optimized flexbox layout
- ✓ All fragment ZIP files and collection ZIP updated with refined styling

**July 10, 2025** - Added comprehensive SennaJS and edit mode support:
- ✓ All fragments now include edit mode detection using `document.body.classList.contains('has-edit-mode-menu')`
- ✓ Comprehensive SennaJS event handling (endNavigate, beforeScreenFlip, screenFlip) across all fragments
- ✓ Edit mode simplified initialization - disables animations and lazy loading for Liferay Experience Designer
- ✓ Global state management prevents duplicate initialization during SPA navigation
- ✓ Proper cleanup and re-initialization on SennaJS navigation events
- ✓ Enhanced service blocks with Clay framework CSS overrides and full responsive design
- ✓ Fixed testimonials fragment edit mode - all 4 cards now visible and editable in stacked layout
- ✓ Testimonials carousel functionality working with proper navigation in published mode
- ✓ All fragments now work properly in both frontend display and Liferay edit mode
- ✓ Individual fragment ZIP files and collection ZIP updated with SennaJS awareness

**July 9, 2025** - Created complete deployment package:
- ✓ Generated production-ready ZIP package with all fragments and resources
- ✓ Downloaded authentic Scottish Power images and assets from their CDN
- ✓ Created custom SVG icons for services (solar, EV, boiler, support, energy)
- ✓ Updated fragments to use local resource paths for Liferay deployment
- ✓ Added comprehensive deployment guide with step-by-step instructions
- ✓ Included resource manifest for asset management
- ✓ Fixed FreeMarker template syntax errors with proper null checks and default values
- ✓ Fixed anchor tag editable types (changed from "text" to "link" for all <a> tags)
- ✓ Fixed all resource path references to use correct Liferay syntax ([resources:filename.ext])
- ✓ Removed resource declarations from fragment.json files (following Liferay best practices)
- ✓ Added all required files to each fragment (index.css, index.js, thumbnail.png)
- ✓ Removed client extensions from fragment collection (they deploy separately)
- ✓ Fixed JSON syntax errors in fragment configuration files
- ✓ Complete structure verification: 70 files, 9 fragments, 15 resources
- ✓ Fixed ZIP creation method to match working masterclass collection structure
- ✓ Fixed resource references to match masterclass pattern (only in img src attributes)
- ✓ Removed problematic CSS background-image resource references  
- ✓ Fixed all incorrect fragmentEntryLinkNamespace resource syntax in testimonials and other fragments
- ✓ All fragments now use correct [resources:filename] syntax matching masterclass collection
- ✓ Package ready for import into Liferay DXP/Portal 7.4+ with working resource uploads and fragments

**Package Contents**: 
- Fragment collection with 9 components (all template and resource errors resolved)
- 22 high-quality PNG/JPG images and icons with proper references (fixed corrupted images)
- Authentic Scottish Power and Trustpilot logos with generated placeholder images for protected assets
- Complete deployment documentation

**Note**: Client extensions are stored separately in the `client-extensions/` directory and deployed using Liferay's client extension deployment methods. Both CSS and JavaScript extensions are configured as global types (`globalCSS` and `globalJS`) for site-wide availability. Each extension includes proper `assemble` blocks for correct file packaging.