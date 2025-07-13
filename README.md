# Scottish Power Corporate Website - Liferay Fragment Collection

A comprehensive Liferay fragment collection for the Scottish Power corporate website, featuring modular, reusable UI components with advanced functionality, performance optimizations, and innovative reading progress tracking.

## 🚀 Quick Start

1. **View the Website**: Open [index.html](index.html) for the complete Scottish Power website demo
2. **Fragment Demo**: Open [demo.html](demo.html) to see individual fragment components
3. **Deploy to Liferay**: Use `scottish-power-collection.zip` for production deployment
4. **Deployment Guide**: Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions

## 📁 Project Structure

```
├── client-extensions/          # Liferay Client Extensions
│   ├── scottishpower-theme-css/    # CSS theme extension
│   └── scottishpower-theme-js/     # JavaScript theme extension
├── fragments/                  # Liferay Fragment Components
│   ├── sp-header/                 # Navigation header with Liferay login
│   ├── sp-hero/                   # Hero section with quote form
│   ├── sp-half-price-weekends/    # Promotional content
│   ├── sp-service-blocks/         # Service highlights
│   ├── sp-product-cards/          # Product showcase
│   ├── sp-support-sections/       # Customer support
│   ├── sp-awards/                 # Awards and certifications
│   ├── sp-testimonials/           # Customer testimonials
│   ├── sp-read-progress-tracker/  # NEW: Advanced reading progress tracker
│   └── sp-footer/                 # Site footer
├── fragment-zips/              # Individual fragment ZIP files
├── index.html                  # Complete website demo
├── demo.html                   # Fragment component demo
├── fragment-loader.js          # Fragment loading utility
├── performance-optimizations.css # Lighthouse-optimized CSS
├── performance-optimizations.js  # Performance-optimized JavaScript
├── scottish-power-collection.zip # Liferay fragment collection package
├── DEPLOYMENT_GUIDE.md         # Production deployment instructions
└── scottish-power-collection.json # Liferay collection metadata
```

## 🆕 Latest Features (July 2025)

### Read Progress Tracker (sp-read-progress-tracker)
**Advanced reading progress tracking with dropzone content area:**

- **Universal Progress Tracking**: Tracks reading progress through any content dropped in the fragment's dropzone
- **Multiple Display Styles**: 
  - Progress bar with customizable colors
  - Circular/donut progress indicator
  - **8 Fun Emoji Indicators**: Hotdogs 🌭, Footballs ⚽, Chromium Logos 🌐, Dinosaurs 🦕, Cats 🐱, Dogs 🐶, Cars 🚗, Motorbikes 🏍️
- **Flexible Positioning**: Inline above content, top fixed, or bottom fixed
- **Smart Behavior**: Transitions from inline to fixed position when scrolled past, auto-hides when reading complete
- **Configurable Alignment**: Left, center, or right alignment for all progress styles
- **Edit Mode Support**: Simplified initialization for Liferay Experience Designer
- **SPA Navigation**: Full SennaJS support for seamless page transitions
- **Performance Optimized**: Efficient scroll tracking with cross-browser compatibility

### Performance Optimizations
- **Lighthouse-Optimized**: CSS and JavaScript files optimized for Core Web Vitals
- **LCP Improvements**: Critical CSS and lazy loading strategies
- **FID Optimization**: RequestIdleCallback for non-critical features
- **CLS Prevention**: Stable layouts with defined dimensions
- **Animation Performance**: Transform-only animations with will-change properties

### Technical Enhancements
- **FreeMarker Syntax Fixes**: All configuration variables use proper `${configuration.fieldName}` syntax
- **SennaJS Integration**: Complete SPA navigation support across all fragments
- **Edit Mode Detection**: All fragments detect and adapt to Liferay Experience Designer
- **Cross-Browser Compatibility**: Enhanced support for Chromium browsers with comprehensive fallbacks
- **Memory Management**: Proper cleanup of observers and event listeners

## 🎨 Design System

### Brand Colors
- **Primary Green**: #00A651 (Scottish Power signature color)
- **Dark Green**: #006B3C (Headers and emphasis)
- **Light Green**: #E8F5E8 (Backgrounds and highlights)
- **Accent Orange**: #FF6B35 (Call-to-action buttons)
- **Accent Blue**: #0066CC (Links and secondary actions)

### Typography
- **Font Stack**: System fonts for optimal performance
- **Headings**: 600-700 font weight
- **Body Text**: 400 font weight, 1.6 line height

### Layout
- **Container**: 1200px max-width with responsive breakpoints
- **Grid System**: CSS Grid and Flexbox for layouts
- **Spacing**: 20px, 40px, 60px, 80px scale
- **Border Radius**: 8px standard

## 🔧 Fragment Components

### Header (sp-header)
- Sticky navigation with dropdown menus
- **Liferay Login Integration**: Native login portlet and user authentication
- Personal/Business toggle
- Mobile-responsive hamburger menu
- Smart user state management

### Hero (sp-hero)
- Quote form with postcode validation
- Background image with overlay
- Call-to-action buttons
- Multiple layout options

### Read Progress Tracker (sp-read-progress-tracker) ⭐ NEW
- **Dropzone Content Area**: Uses `<lfr-drop-zone>` for flexible content management
- **Universal Emoji System**: 8 fun progress indicators with consistent logic
- **Smart Positioning**: Auto-transitions from inline to fixed with early activation
- **Auto-Hide Behavior**: Hides when reading complete and scrolled past content
- **Perfect Alignment Testing**: Wide containers (320-400px) for clear left/center/right testing

### Half-Price Weekends (sp-half-price-weekends)
- Promotional content display
- Badge and benefit highlighting
- Multiple visual styles

### Service Blocks (sp-service-blocks)
- Configurable 2-4 column layouts
- Hover effects and animations
- Icon and text combinations
- **Clay Framework Integration**: Enhanced styling compatibility

### Product Cards (sp-product-cards)
- Carousel, grid, and masonry layouts
- Product feature highlighting
- Auto-rotation capabilities

### Support Sections (sp-support-sections)
- Contact method display
- Webchat integration
- Multiple layout configurations

### Awards (sp-awards)
- Award logo carousel
- Description toggles
- Scroll animations

### Testimonials (sp-testimonials)
- Trustpilot integration
- Customer review display
- Star rating system
- **Edit Mode Optimization**: All cards visible in Liferay Experience Designer

### Footer (sp-footer)
- Comprehensive link structure
- Newsletter signup
- Social media integration
- Legal compliance links

## 🚀 Deployment to Liferay

### Prerequisites
- Liferay DXP 7.4+ or Liferay Portal CE 7.4+
- Fragment collection deployment capability
- Client extension support

### Deployment Steps

1. **Deploy Client Extensions**:
   ```bash
   # Deploy CSS theme (globalCSS type)
   blade deploy client-extensions/scottishpower-theme-css
   
   # Deploy JavaScript theme (globalJS type)
   blade deploy client-extensions/scottishpower-theme-js
   ```

2. **Import Fragment Collection**:
   - Use `scottish-power-collection.zip` for complete deployment
   - Import through Liferay's Fragment admin interface
   - All fragments include proper FreeMarker syntax and configuration
   - Resources are embedded with correct `[resources:filename]` syntax

3. **Individual Fragment Deployment**:
   - Use individual ZIP files from `fragment-zips/` directory
   - Each ZIP contains proper directory structure: `fragment-name/files`
   - Ready for selective deployment and testing

## 🔄 Development Workflow

### Local Development
1. Start the development server: `python3 -m http.server 5000`
2. Open `index.html` for full site preview
3. Open `demo.html` for component testing
4. Edit fragments in `fragments/` directory
5. Test changes with fragment loader

### Fragment Development Standards
- **SennaJS Events**: All fragments include comprehensive SPA navigation support
- **Edit Mode Detection**: Components detect Liferay Experience Designer with `document.body.classList.contains('has-edit-mode-menu')`
- **Global State Management**: Prevents duplicate initialization with `window.spFragmentName = { initialized: false }`
- **FreeMarker Syntax**: Use `${configuration.fieldName}` for all configuration variables
- **Performance First**: Optimized animations, lazy loading, and minimal DOM manipulation

## 📊 Performance & Browser Support

### Lighthouse Optimizations
- **LCP (Largest Contentful Paint)**: Optimized with critical CSS and lazy loading
- **FID (First Input Delay)**: Minimized JavaScript execution with requestIdleCallback
- **CLS (Cumulative Layout Shift)**: Stable layouts with defined dimensions
- **Performance Score**: Target 90+ on mobile and desktop

### Full Browser Support
- **Chrome/Chromium**: 60+ (with enhanced compatibility fixes for latest versions)
- **Firefox**: 55+
- **Safari**: 11+ (including iOS Safari)
- **Edge**: 79+ (Chromium-based)

### Progressive Enhancement
- **Internet Explorer**: 11+ (basic functionality with graceful degradation)
- **Older Mobile Browsers**: Enhanced fallbacks for iOS 10+ and Android 6+
- **Low-End Devices**: Optimized performance with reduced animations on request

### Technical Compatibility
- **Intersection Observer**: With polyfill fallback for older browsers
- **CSS Grid/Flexbox**: With fallback layouts for IE11
- **Modern JavaScript**: ES6+ features with comprehensive cross-browser support
- **Touch/Gesture Support**: Full touch support for mobile and tablet devices

### Accessibility
- **WCAG 2.1 AA**: Compliance considerations built into all components
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements
- **High Contrast**: Respects user preference for reduced motion and high contrast

## 🔐 Security & Compliance

### Data Protection
- **No Analytics**: No tracking or analytics implementation
- **GDPR Compliant**: Privacy-first approach
- **Secure Forms**: Input validation and sanitization
- **Content Security**: XSS protection in templates

### Accessibility
- **WCAG 2.1 AA**: Accessibility compliance
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Sufficient contrast ratios

## 📞 Support & Maintenance

### Documentation
- Component-level documentation in each fragment
- Configuration guide for content editors
- Developer setup instructions
- Comprehensive browser compatibility guide

### Recent Updates (July 2025)
- **Complete Emoji Progress System**: 8 fun emoji-based progress indicators
- **Enhanced Browser Compatibility**: Fixed Chromium browser issues
- **FreeMarker Syntax Fixes**: Automated correction across all fragments
- **Performance Optimizations**: Lighthouse-optimized CSS and JavaScript
- **SennaJS Integration**: Full SPA navigation support
- **Edit Mode Detection**: Proper Liferay Experience Designer support

---

**Built for Scottish Power** | **Powered by Liferay** | **Ready for Production** | **Performance Optimized**