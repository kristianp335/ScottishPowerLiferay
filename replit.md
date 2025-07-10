# Scottish Power Corporate Website

## Overview

This is a complete component-based website system for Scottish Power, built using Liferay CMS fragments. The system provides a collection of reusable UI components that can be configured and arranged to create pages for the Scottish Power corporate website. The architecture focuses on modularity, content management flexibility, and consistent branding.

**Production Ready**: The project includes a complete deployment package (`scottish-power-collection-20250709_123524.zip`) with all fragments, resources, and client extensions ready for Liferay deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

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

- **Fragment Structure Standards**:
  - Individual ZIP files for each fragment using create_fragment_zips.py
  - Complete collection ZIP with all fragments and resources
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
- Configurable navigation with dropdown menus
- Personal/Business toggle functionality
- Sticky header option
- Multiple layout styles (default, compact, minimal)

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