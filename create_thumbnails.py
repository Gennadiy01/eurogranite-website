#!/usr/bin/env python3
"""
Script to create 32x32 thumbnail images from granite textures
with center cropping for better representation
"""

import os
from PIL import Image, ImageOps

def create_thumbnail(input_path, output_path, size=(64, 64)):
    """Create a center-cropped thumbnail"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Create center-cropped square thumbnail
            thumb = ImageOps.fit(img, size, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
            
            # Save thumbnail
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            thumb.save(output_path, 'JPEG', quality=85, optimize=True)
            print(f"Created thumbnail: {output_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def main():
    base_path = "public/images/textures"
    thumbs_path = "public/images/textures/thumbs"
    
    # Mapping of directories and their files
    textures = {
        'black': ['gabro.jpg'],
        'gray': ['pokost.jpg'],
        'red-brown': [
            '2-vasylivske-rodovyshhe.jpg',
            '3-didkovytske-rodovyshhe.jpg', 
            '5-kapustynske-rodovyshhe.jpg',
            '6-leznykivske-rodovyshhe.jpg',
            '8-mezhyritske-rodovyshhe.jpg',
            '9-omelyanivske-rodovyshhe.jpg',
            'maple-red-gr6.jpg'
        ],
        'pink-gray': ['leopard-gg1a.jpg'],
        'green': ['maslavske.jpg'],
        'labradorite': ['labro.jpg']
    }
    
    total_created = 0
    
    for category, files in textures.items():
        for filename in files:
            input_file = os.path.join(base_path, category, filename)
            output_file = os.path.join(thumbs_path, category, filename)
            
            if os.path.exists(input_file):
                create_thumbnail(input_file, output_file)
                total_created += 1
            else:
                print(f"Warning: Source file not found: {input_file}")
    
    print(f"\nCompleted! Created {total_created} thumbnails.")

if __name__ == "__main__":
    main()