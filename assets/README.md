# Assets Directory

This directory contains all images and media files for the idontwear website.

## Directory Structure

```
assets/
├── images/
│   ├── products/          # Product photography
│   ├── logos/            # Brand logos and icons
│   └── backgrounds/      # Background textures/patterns
└── README.md            # This file
```

## Image Specifications

### Product Images
**Location:** `assets/images/products/`
**Format:** JPEG or PNG
**Dimensions:** 400x400px recommended (square format)
**Style Guidelines:**
- Lo-fi, grainy quality (intentionally low-res for 90s aesthetic)
- Muted colors (warm greys, earth tones, deep browns)
- Raw, unpolished photography style
- High contrast, harsh lighting acceptable
- Pixelated/compressed look encouraged

**Required Product Images:**
- `destroyed_denim_jacket.jpg` - Distressed denim jacket
- `leather_satchel.jpg` - Full grain leather bag
- `cargo_vest.jpg` - Military surplus vest
- `work_boots.jpg` - Steel toe boots
- `chain_wallet.jpg` - Leather wallet with chain
- `oversized_hoodie.jpg` - Faded black hoodie
- `cargo_pants.jpg` - Olive green cargo pants

### Logo
**Location:** `assets/images/logos/`
**Format:** PNG (with transparency) or GIF
**Dimensions:** 200x60px for header, 32x32px for favicon
**Style Guidelines:**
- Brutalist typography
- Monospace or serif fonts
- Black/white or very muted colors
- Pixelated/bitmap style preferred
- Should work on light backgrounds

**Required Logo Files:**
- `idontwear_logo.png` - Main header logo
- `favicon.ico` - Browser favicon (16x16, 32x32)

### Background Textures (Optional)
**Location:** `assets/images/backgrounds/`
**Format:** JPEG or PNG
**Dimensions:** Tileable patterns preferred
**Style Guidelines:**
- Subtle noise/grain textures
- Paper textures
- Concrete/industrial textures
- Very low opacity when used

## Image Optimization

For authentic 90s/early 2000s aesthetic:
- Compress images heavily (visible artifacts OK)
- Use limited color palettes
- Add film grain or digital noise
- Embrace pixelation and low resolution
- Avoid modern photo editing polish

## Usage in HTML

Images should be referenced using relative paths:
```html
<img src="assets/images/products/destroyed_denim_jacket.jpg" alt="Destroyed Denim Jacket">
<img src="assets/images/logos/idontwear_logo.png" alt="idontwear">
```

## File Naming Convention

- Use lowercase letters only
- Use underscores instead of spaces
- Be descriptive but concise
- Match product IDs from products.html