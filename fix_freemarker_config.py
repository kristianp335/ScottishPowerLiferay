#!/usr/bin/env python3
"""
Fix FreeMarker configuration variable syntax across all fragments.
Replace variables like ${displayStyle} with ${configuration.displayStyle}
"""

import os
import re
import glob

def fix_freemarker_variables(file_path):
    """Fix FreeMarker configuration variables in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # List of configuration variables that need the configuration. prefix
        config_vars = [
            'displayStyle', 'footerStyle', 'showPersonalBusiness', 'sectionLayout',
            'layoutStyle', 'heroLayout', 'cardStyle', 'showTrustpilotBranding',
            'autoRotate', 'showRatings', 'showSocialLinks', 'showNewsletter',
            'stickyHeader', 'headerLayout', 'showImages', 'enableWebchat',
            'showBadge', 'showBenefits', 'columnCount', 'enableAutoRotate',
            'showNavigation', 'showDescriptions', 'backgroundOverlay',
            'quoteFormStyle', 'enableQuoteForm'
        ]
        
        # Fix each configuration variable
        for var in config_vars:
            # Pattern to match variable usage but not if already prefixed with configuration.
            # This handles cases like: ${displayStyle!"default"} but not ${configuration.displayStyle!"default"}
            pattern = r'\$\{(?!configuration\.)(' + re.escape(var) + r'[^}]*)\}'
            replacement = r'${configuration.\1}'
            content = re.sub(pattern, replacement, content)
            
            # Also fix conditional statements like [#if (displayStyle!'default')]
            pattern = r'\[#if\s*\((?!configuration\.)(' + re.escape(var) + r'[^)]*)\)'
            replacement = r'[#if (configuration.\1)'
            content = re.sub(pattern, replacement, content)
            
            # Fix elseif statements
            pattern = r'\[#elseif\s*\((?!configuration\.)(' + re.escape(var) + r'[^)]*)\)'
            replacement = r'[#elseif (configuration.\1)'
            content = re.sub(pattern, replacement, content)
        
        # Write back if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed: {file_path}")
            return True
        else:
            print(f"⚪ No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix all fragment HTML files"""
    print("🔧 Fixing FreeMarker configuration syntax across all fragments...")
    
    # Find all index.html files in fragments
    pattern = "scottish-power-collection/fragments/*/index.html"
    html_files = glob.glob(pattern)
    
    fixed_count = 0
    total_count = len(html_files)
    
    for file_path in html_files:
        if fix_freemarker_variables(file_path):
            fixed_count += 1
    
    print(f"\n📊 Summary:")
    print(f"   Total files processed: {total_count}")
    print(f"   Files with fixes applied: {fixed_count}")
    print(f"   Files unchanged: {total_count - fixed_count}")
    
    if fixed_count > 0:
        print(f"\n✅ All FreeMarker configuration syntax errors fixed!")
        print(f"   Variables now use proper ${{configuration.variableName}} syntax")
    else:
        print(f"\n⚪ No FreeMarker syntax errors found")

if __name__ == "__main__":
    main()