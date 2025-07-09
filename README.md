# Scottish Power Corporate Website - Liferay Fragment Collection

A complete recreation of the Scottish Power corporate website built using Liferay Client Extensions and Fragments with dynamic content capabilities.

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
│   ├── sp-header/                 # Navigation header
│   ├── sp-hero/                   # Hero section with quote form
│   ├── sp-half-price-weekends/    # Promotional content
│   ├── sp-service-blocks/         # Service highlights
│   ├── sp-product-cards/          # Product showcase
│   ├── sp-support-sections/       # Customer support
│   ├── sp-awards/                 # Awards and certifications
│   ├── sp-testimonials/           # Customer testimonials
│   └── sp-footer/                 # Site footer
├── index.html                  # Complete website demo
├── demo.html                   # Fragment component demo
├── fragment-loader.js          # Fragment loading utility
├── scottish-power-collection.zip # Liferay fragment collection package
├── DEPLOYMENT_GUIDE.md         # Production deployment instructions
└── scottish-power-collection.json # Liferay collection metadata
```

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
- Personal/Business toggle
- Mobile-responsive hamburger menu
- Search functionality

### Hero (sp-hero)
- Quote form with postcode validation
- Background image with overlay
- Call-to-action buttons
- Multiple layout options

### Half-Price Weekends (sp-half-price-weekends)
- Promotional content display
- Badge and benefit highlighting
- Multiple visual styles

### Service Blocks (sp-service-blocks)
- Configurable 2-4 column layouts
- Hover effects and animations
- Icon and text combinations

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
   # Deploy CSS theme
   blade deploy client-extensions/scottishpower-theme-css
   
   # Deploy JavaScript theme
   blade deploy client-extensions/scottishpower-theme-js
   ```

2. **Import Fragment Collection**:
   - Package the `fragments/` directory as a ZIP file
   - Import through Liferay's Fragment admin interface
   - Map fragment configurations to content

3. **Configure Content**:
   - Use Liferay's fragment configuration system
   - Map editable elements to content fields
   - Set up content workflows

## 🎯 Key Features

### Content Management
- **Dynamic Content**: All text and images are editable through Liferay
- **Configuration Options**: Each fragment has configurable display options
- **Responsive Design**: Mobile-first approach with flexible layouts
- **SEO Optimization**: Semantic HTML and meta tag support

### User Experience
- **Performance**: Optimized CSS and JavaScript
- **Accessibility**: WCAG compliant components
- **Cross-browser**: Support for modern browsers
- **Progressive Enhancement**: Graceful degradation for older browsers

### Developer Experience
- **Modular Architecture**: Component-based system
- **Consistent Theming**: CSS variables for easy customization
- **Documentation**: Comprehensive component documentation
- **Testing**: Built-in demo and testing capabilities

## 🔄 Development Workflow

### Local Development
1. Start the development server: `python3 -m http.server 5000`
2. Open `index.html` for full site preview
3. Open `demo.html` for component testing
4. Edit fragments in `fragments/` directory
5. Test changes with fragment loader

### Fragment Development
1. Create new fragment directory in `fragments/`
2. Add required files: `fragment.json`, `configuration.json`, `index.html`, `index.css`, `index.js`
3. Test fragment in isolation
4. Add to fragment loader configuration
5. Update collection metadata

## 📊 Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Components load as needed
- **CSS Optimization**: Minimized stylesheets with design tokens
- **JavaScript Optimization**: Vanilla JavaScript for minimal overhead
- **Image Optimization**: CDN-delivered optimized images
- **Caching**: Fragment-level caching in Liferay

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Fallbacks for older browsers
- **Accessibility**: Screen reader compatibility

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
- Troubleshooting guide

### Updates
- Version-controlled fragment collection
- Backward compatibility considerations
- Update procedures for Liferay deployments
- Testing protocols for changes

---

**Built for Scottish Power** | **Powered by Liferay** | **Ready for Production**