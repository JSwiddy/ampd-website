# AMPD Organizations Landing Page

A clean, static landing page converted from Shopify to be hosted on Vercel.

## Features

- **No cart/e-commerce functionality** - Pure informational landing page
- **Responsive design** - Mobile, tablet, and desktop optimized
- **Fast loading** - Minimal dependencies, optimized assets
- **Interactive elements**:
  - Animated logo carousel
  - PDF modal for "Science Behind AMPD"
  - Smooth scrolling navigation
  - Sticky header with scroll effects

## Project Structure

```
/
├── index.html          # Main landing page
├── styles.css          # All styles
├── script.js           # Modal and interactions
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Local Development

1. Open `index.html` in your browser
2. Or use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? (accept default or customize)
   - In which directory is your code located? **./`**

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository (or drag & drop folder)
4. Click "Deploy"

### Option 3: GitHub Integration

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Connect GitHub repo to Vercel
3. Auto-deploys on every push

## Customization

### Update Links

Replace placeholder links in `index.html`:
- Line 32-34: Navigation links
- Line 37: Contact link
- Line 56 & 334: Demo/pilot program links

### Update Images

All images are currently hosted on Shopify CDN. To use your own:
1. Place images in an `images/` folder
2. Update image `src` attributes in `index.html`

### Update Content

Edit text directly in `index.html`:
- Hero headline (line 49-53)
- Pillar descriptions (lines 104-142)
- Module descriptions (lines 174-218)
- Testimonial (lines 243-254)

### Styling

All styles are in `styles.css`:
- Colors: Lines 10-15 (CSS variables)
- Typography: Lines 19-30
- Responsive breakpoints: Lines 650+ (mobile), 600+ (tablet)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (latest)

## Performance

- No external dependencies except Google Fonts
- Images hosted on CDN (Shopify)
- Minimal JavaScript (~50 lines)
- CSS ~700 lines (unminified)

## License

All rights reserved - AMPD 2026
