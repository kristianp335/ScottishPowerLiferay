
#!/usr/bin/env python3
import os
import zipfile
from pathlib import Path

def create_fragment_zip(fragment_name, source_dir, output_dir):
    """Create a ZIP file for a single fragment"""
    zip_filename = f"{fragment_name}.zip"
    zip_path = os.path.join(output_dir, zip_filename)
    
    # Create the ZIP file
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        fragment_dir = os.path.join(source_dir, fragment_name)
        
        if not os.path.exists(fragment_dir):
            print(f"Warning: Fragment directory {fragment_dir} does not exist")
            return False
        
        # Add all files from the fragment directory
        for root, dirs, files in os.walk(fragment_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Create archive path: fragment_name/file_name
                relative_path = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, relative_path)
                print(f"Added {relative_path} to {zip_filename}")
    
    print(f"Created {zip_filename}")
    return True

def main():
    # Configuration
    source_dir = "scottish-power-collection/fragments"
    output_dir = "fragment-zips"
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # List of fragments to create ZIPs for
    fragments = [
        "sp-awards",
        "sp-footer", 
        "sp-half-price-weekends",
        "sp-header",
        "sp-hero",
        "sp-product-cards",
        "sp-service-blocks",
        "sp-support-sections",
        "sp-testimonials"
    ]
    
    print("Creating individual fragment ZIP files...")
    print(f"Source directory: {source_dir}")
    print(f"Output directory: {output_dir}")
    print("-" * 50)
    
    success_count = 0
    for fragment in fragments:
        if create_fragment_zip(fragment, source_dir, output_dir):
            success_count += 1
        print()
    
    print(f"Successfully created {success_count}/{len(fragments)} fragment ZIP files")
    print(f"ZIP files saved to: {output_dir}/")

if __name__ == "__main__":
    main()
