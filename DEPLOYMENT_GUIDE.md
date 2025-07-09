# Scottish Power Fragment Collection - Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Scottish Power corporate website fragment collection to Liferay DXP/Portal.

## Package Contents

The `scottish-power-collection-20250709_123524.zip` file contains:

```
scottish-power-collection/
├── collection.json                 # Fragment collection metadata
├── fragments/                      # All fragment components
│   ├── sp-header/                     # Navigation header
│   ├── sp-hero/                       # Hero section with quote form
│   ├── sp-half-price-weekends/        # Promotional content
│   ├── sp-service-blocks/             # Service highlights
│   ├── sp-product-cards/              # Product showcase
│   ├── sp-support-sections/           # Customer support
│   ├── sp-awards/                     # Awards and certifications
│   ├── sp-testimonials/               # Customer testimonials
│   └── sp-footer/                     # Site footer
├── resources/                      # Images and assets
│   ├── scottishpower-logo.svg
│   ├── trustpilot-logo.png
│   ├── rating-five.png
│   ├── solar-panel-image.jpg
│   ├── boiler-care-image.jpg
│   ├── heat-pump-image.jpg
│   ├── smart-meter-image.jpg
│   ├── green-energy-image.jpg
│   ├── customer-service-image.jpg
│   ├── icon-solar.svg
│   ├── icon-ev.svg
│   ├── icon-boiler.svg
│   ├── icon-support.svg
│   ├── icon-energy.svg
│   └── manifest.json
└── client-extensions/              # CSS and JavaScript themes
    ├── scottishpower-theme-css/
    └── scottishpower-theme-js/
```

## Prerequisites

- Liferay DXP 7.4+ or Liferay Portal CE 7.4+
- Admin access to Liferay instance
- Fragment collection import capability
- Client extension deployment capability

## Deployment Steps

### 1. Deploy Client Extensions

First, deploy the CSS and JavaScript theme extensions:

```bash
# Navigate to client extensions directory
cd client-extensions

# Deploy CSS theme
blade deploy scottishpower-theme-css

# Deploy JavaScript theme
blade deploy scottishpower-theme-js
```

Or use the Liferay Workspace:

```bash
# Build and deploy CSS theme
./gradlew :client-extensions:scottishpower-theme-css:deploy

# Build and deploy JavaScript theme
./gradlew :client-extensions:scottishpower-theme-js:deploy
```

### 2. Import Fragment Collection

1. **Access Fragment Admin**:
   - Go to `Site Administration` → `Design` → `Fragments`
   - Click on `Collections` tab

2. **Import Collection**:
   - Click `Import` button
   - Select the `scottish-power-collection-20250709_123524.zip` file
   - Click `Import`

3. **Verify Import**:
   - Confirm all 9 fragments are imported:
     - sp-header
     - sp-hero
     - sp-half-price-weekends
     - sp-service-blocks
     - sp-product-cards
     - sp-support-sections
     - sp-awards
     - sp-testimonials
     - sp-footer

### 3. Configure Fragment Resources

1. **Upload Resources**:
   - The resources should be automatically imported with the collection
   - Verify in `Site Administration` → `Content & Data` → `Documents and Media`

2. **Check Resource Links**:
   - Resources are referenced using Liferay's resource path syntax
   - Format: `[#assign resource_path = fragmentEntryLinkNamespace + '/resources/']${resource_path}filename.ext`

### 4. Create Page Templates

1. **Create Master Page Template**:
   - Go to `Site Administration` → `Design` → `Page Templates`
   - Click `Master Pages` → `New`
   - Add the sp-header fragment to the header area
   - Add the sp-footer fragment to the footer area

2. **Create Content Page Template**:
   - Click `Page Templates` → `New`
   - Choose `Content Page Template`
   - Add fragments in this order:
     - sp-hero (for landing pages)
     - sp-half-price-weekends (promotional)
     - sp-service-blocks (services overview)
     - sp-product-cards (product showcase)
     - sp-support-sections (customer support)
     - sp-awards (trust indicators)
     - sp-testimonials (social proof)

### 5. Configure Fragment Settings

Each fragment has configurable options:

#### sp-header
- `headerStyle`: default, compact, minimal
- `showPersonalBusiness`: true/false
- `showSearch`: true/false
- `stickyHeader`: true/false

#### sp-hero
- `layoutStyle`: split, centered, full-width
- `showQuoteForm`: true/false
- `overlayOpacity`: 0-100
- `showFeatures`: true/false

#### sp-half-price-weekends
- `displayStyle`: card, banner, minimal
- `showBadge`: true/false
- `showBenefits`: true/false

#### sp-service-blocks
- `columnCount`: 2, 3, 4
- `cardStyle`: elevated, flat, bordered
- `showIcons`: true/false

#### sp-product-cards
- `layoutStyle`: carousel, grid, masonry
- `showNavigation`: true/false
- `autoRotate`: true/false

#### sp-support-sections
- `layoutStyle`: horizontal, vertical, stacked
- `showImages`: true/false
- `emphasizeWebchat`: true/false

#### sp-awards
- `displayStyle`: carousel, grid, slider
- `showDescriptions`: true/false
- `animateOnScroll`: true/false

#### sp-testimonials
- `displayStyle`: carousel, grid, masonry
- `showTrustpilotBranding`: true/false
- `autoRotate`: true/false
- `showRatings`: true/false

#### sp-footer
- `footerStyle`: full, compact, minimal
- `showSocialLinks`: true/false
- `showNewsletter`: true/false
- `showLegalLinks`: true/false

### 6. Content Configuration

1. **Edit Fragment Content**:
   - All text content is editable through data-lfr-editable attributes
   - Images can be replaced through the fragment editor
   - Links can be configured with target URLs

2. **SEO Configuration**:
   - Set appropriate meta titles and descriptions
   - Configure Open Graph tags
   - Set canonical URLs

### 7. Testing and Validation

1. **Responsive Testing**:
   - Test on mobile, tablet, and desktop
   - Verify touch interactions work properly
   - Check navigation functionality

2. **Performance Testing**:
   - Validate page load times
   - Check image optimization
   - Verify CSS/JS minification

3. **Accessibility Testing**:
   - Test with screen readers
   - Verify keyboard navigation
   - Check color contrast ratios

## Troubleshooting

### Common Issues

1. **Resources Not Loading**:
   - Verify resource path syntax is correct
   - Check Documents and Media for uploaded resources
   - Ensure proper permissions are set

2. **Fragment Not Displaying**:
   - Check fragment configuration settings
   - Verify CSS theme is deployed
   - Review browser console for errors

3. **JavaScript Not Working**:
   - Ensure JavaScript theme is deployed
   - Check for JavaScript errors in console
   - Verify jQuery dependencies if needed

### Support Resources

- **Liferay Documentation**: https://learn.liferay.com/
- **Fragment Development**: https://learn.liferay.com/dxp/latest/en/site-building/developer-guide/developing-page-fragments.html
- **Client Extensions**: https://learn.liferay.com/dxp/latest/en/liferay-development/client-extensions.html

## Maintenance

### Regular Updates

1. **Content Updates**:
   - Review and update testimonials quarterly
   - Update product information as needed
   - Refresh images annually

2. **Performance Monitoring**:
   - Monitor page load times
   - Check for broken links
   - Validate form submissions

3. **Security Updates**:
   - Keep Liferay instance updated
   - Review and update dependencies
   - Monitor for security vulnerabilities

### Version Control

- Maintain version history of fragment changes
- Document configuration changes
- Keep backup of working deployments

## Support

For technical support with this fragment collection, please refer to:
- Fragment collection documentation
- Liferay community forums
- Scottish Power development team

---

**Deployment Package**: `scottish-power-collection-20250709_123524.zip`
**Collection Version**: 1.0.0
**Compatible with**: Liferay DXP 7.4+, Liferay Portal CE 7.4+
**Last Updated**: July 9, 2025