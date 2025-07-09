# Scottish Power Corporate Website

## Overview

This is a component-based website system for Scottish Power, built using Liferay CMS fragments. The system provides a collection of reusable UI components that can be configured and arranged to create pages for the Scottish Power corporate website. The architecture focuses on modularity, content management flexibility, and consistent branding.

## User Preferences

Preferred communication style: Simple, everyday language.

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