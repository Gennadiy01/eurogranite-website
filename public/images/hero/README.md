# Hero Images Optimization Guide

## Current Status ⚠️
- **Issue**: Both `Im_Hero.jpg` and `Im_Hero.webp` are actually WebP format (5000x3752px, 690KB each)
- **Problem**: No real JPG fallback + oversized images
- **PageSpeed Impact**: -667KB potential savings

## Required Actions 🎯

### 1. Create Responsive Image Variants
Generate these 6 files to replace current 2 files:

```
📱 Mobile (400px width):
   ├── Im_Hero-400.webp (~30KB)
   └── Im_Hero-400.jpg (~40KB)

💻 Desktop (800px width):
   ├── Im_Hero-800.webp (~60KB)
   └── Im_Hero-800.jpg (~80KB)

🖥️ Large screens (1200px width):
   ├── Im_Hero-1200.webp (~100KB)
   └── Im_Hero-1200.jpg (~130KB)
```

### 2. Optimization Tools

**🌐 Online (Recommended):**
- [Squoosh.app](https://squoosh.app) - Google's image optimizer
- [TinyPNG.com](https://tinypng.com) - Bulk optimization

**💻 Desktop:**
- GIMP (free)
- Photoshop
- Canva

### 3. Step-by-Step Process

1. **Find Original**: Get high-quality source image (preferably JPG)
2. **Resize**: Create 3 sizes (400px, 800px, 1200px width)
3. **Convert**: Save each size as both WebP and JPG
4. **Replace**: Upload new files to this folder
5. **Activate**: Uncomment srcSet lines in Hero.jsx

### 4. Expected Results 📈

- **File Size**: 1,380KB → ~440KB (68% reduction)
- **PageSpeed**: +15-25 points improvement
- **LCP**: ~400-600ms faster loading
- **Mobile**: Much better performance

### 5. After Optimization

Update `src/components/organisms/Hero/Hero.jsx`:

```javascript
// Uncomment these lines after creating variants:
srcSet: {
  webp: \`/images/hero/Im_Hero-400.webp 400w, /images/hero/Im_Hero-800.webp 800w, /images/hero/Im_Hero-1200.webp 1200w\`,
  jpg: \`/images/hero/Im_Hero-400.jpg 400w, /images/hero/Im_Hero-800.jpg 800w, /images/hero/Im_Hero-1200.jpg 1200w\`
}
```

Then update picture element to use srcSet instead of single src.

---
**🚀 Priority**: CRITICAL for PageSpeed optimization
**💰 Savings**: ~667KB (largest improvement opportunity)