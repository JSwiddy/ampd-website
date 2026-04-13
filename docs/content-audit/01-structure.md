# 01 - Site Structure

## All Files in Repo (non-git)

```
/index.html              — Home page
/about.html              — About / Founder page
/demo.html               — Demo request form page
/mission.html            — Mission statement page
/platform.html           — Platform features page
/safety.html             — Safety & Privacy page
/privacy-policy.html     — Legal: Privacy Policy
/terms.html              — Legal: Terms of Service
/request-pilot.html      — Redirect stub (redirects to /demo.html)
/styles.css              — Global stylesheet
/script.js               — Global JS (scroll, header, mobile nav, logo slider)
/pilot-form.js           — Demo form submission handler
/api/pilot-request.js    — Vercel serverless function (Postmark email)
/vercel.json             — Vercel config (headers, redirects, rewrites)
/README.md               — Repo readme
/.gitignore              — Git ignore
/.vercel/                — Vercel project config
```

## Page Routes

| Route                  | File                  | Purpose                         |
|------------------------|-----------------------|---------------------------------|
| `/`                    | `index.html`          | Home / landing page             |
| `/about.html`          | `about.html`          | About the founder               |
| `/demo.html`           | `demo.html`           | Demo request form               |
| `/mission.html`        | `mission.html`        | Mission statement               |
| `/platform.html`       | `platform.html`       | Platform feature breakdown      |
| `/safety.html`         | `safety.html`         | Safety & privacy overview       |
| `/privacy-policy.html` | `privacy-policy.html` | Privacy Policy (legal)          |
| `/terms.html`          | `terms.html`          | Terms of Service (legal)        |
| `/request-pilot.html`  | `request-pilot.html`  | Redirect to `/demo.html`        |

**Catch-all rewrite** in `vercel.json`: any unmatched route (except the pages above and `/api/`) serves `index.html`.

**Legacy Shopify redirects** in `vercel.json`: `/pages/*`, `/products/*`, `/collections/*`, `/cart`, `/account/*`, etc. all redirect to `/`.

## Shared Elements

### Header (appears in every page)
Two distinct header implementations exist:
1. **Main pages** (index, about, demo, mission, platform, safety): Use `<nav>` with `<ul class="nav-menu">` structure, dropdown on Platform, CTA labeled "Get a Demo"
2. **Legal pages** (privacy-policy, terms): Use flat `<a>` links with classes `header-nav__link` / `header-nav__cta`, CTA labeled "Demo & Pricing"

### Footer
Two distinct footer implementations exist:
1. **Main pages** (index has a slightly different layout; about/demo/mission/platform/safety share a version): 3-column grid (Brand + tagline, Platform links, Company links) + optional 4th CTA column + bottom bar with social + copyright
2. **Legal pages** (privacy-policy, terms): Completely inline-styled footer with "Coming Soon" app store badges, FERPA/COPPA compliance badges, different link structure

### Mobile Nav
All pages have a `.mobile-nav-overlay` with links to About, Platform, Mission, Safety, and "Get a Demo" CTA. Legal pages use "Demo & Pricing" instead.

## Brand Assets Location
All brand images hosted on **Cloudinary** (`res.cloudinary.com/dhzjg43qc/...`). No local image files in the repo.

External images used:
- Logo carousel: Wikipedia, association websites (NFHS, IHSA, etc.)
- App store badges: `developer.apple.com`, `play.google.com` (only in legal page footers)

## Styling System
- Single `styles.css` file with CSS custom properties (`:root` variables)
- Font: Manrope (Google Fonts) on main pages; Poppins on legal pages
- Base font size: `10px` (rem-based sizing)
- Color scheme: Dark background (`#111111`), light text
- Legal pages use inline `<style>` blocks with hardcoded colors (not using CSS variables)
- Cache-busted via query string: `styles.css?v=115` (index), `?v=75` (main pages), `?v=58` (legal pages) -- versions are inconsistent

## Content Management Pattern
All content is hardcoded directly in HTML files. No CMS, no templating, no includes. Each page is a standalone HTML document with its own copy of the header/footer.

## Analytics
All pages include Microsoft Clarity tracking (`s3mr0yz0xe`).
