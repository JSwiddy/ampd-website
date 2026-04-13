# 03 - Shared Component Content

## Navigation (Header)

### Main Pages (index, about, demo, mission, platform, safety)
Consistent across all 6 pages:
- **Logo**: AMPD white logo (Cloudinary), links to `/`
- **Nav items**:
  - `"About"` -> `/about.html`
  - `"Platform"` -> `/platform.html` (with dropdown arrow)
    - Dropdown: `"Mental Performance"`, `"Training"`, `"Schedules"`, `"Readiness Check-Ins"`, `"Communication"`
  - `"Mission"` -> `/mission.html`
  - `"Safety"` -> `/safety.html`
- **CTA button**: `"Get a Demo"` -> `/demo.html`

### Legal Pages (privacy-policy, terms)
Different nav structure using flat links and different classes:
- **Nav items**:
  - `"Platform"` -> `/platform.html`
  - `"The Why"` -> `/about.html` (NOTE: different label than main pages which use "About")
  - `"Mission"` -> `/mission.html`
  - `"Safety"` -> `/safety.html`
- **CTA button**: `"Demo & Pricing"` -> `/demo.html` (NOTE: different label than main pages)
- **No dropdown** on Platform link
- **No "About" link** -- uses "The Why" instead

### INCONSISTENCIES
1. CTA label: `"Get a Demo"` (main) vs `"Demo & Pricing"` (legal) -- there is no pricing page
2. About link label: `"About"` (main nav) vs `"The Why"` (legal nav and footer Company column)
3. Nav structure: `<ul>/<li>` (main) vs flat `<a>` tags (legal)
4. Platform dropdown: present (main) vs absent (legal)

---

## Mobile Navigation

### Main Pages
- `"About"` -> `/about.html`
- `"Platform"` -> `/platform.html`
- `"Mission"` -> `/mission.html`
- `"Safety"` -> `/safety.html`
- `"Get a Demo"` (btn-primary) -> `/demo.html`

### Legal Pages
- `"Platform"` -> `/platform.html`
- `"The Why"` -> `/about.html`
- `"Mission"` -> `/mission.html`
- `"Safety"` -> `/safety.html`
- `"Demo & Pricing"` (btn-primary) -> `/demo.html`

---

## Footer

### Main Pages Footer (about, demo, mission, platform, safety)
Three-column grid + optional 4th CTA column:

**Brand Column:**
- Logo: AMPD white logo (Cloudinary)
- Tagline: `"The all-in-one platform for high school athletics."`

**Platform Column:**
- Header: `"Platform"`
- Links: `"Mental Performance"`, `"Training"`, `"Schedules"`, `"Readiness"`, `"Communication"`

**Company Column:**
- Header: `"Company"`
- Links: `"The Why"` (-> about.html), `"Mission"`, `"Safety"`, `"Privacy Policy"`, `"Terms of Service"`

**CTA Column (about, demo, mission, platform, safety only -- NOT index):**
- Header: `"See AMPD in action"`
- Body: `"Get a walkthrough of the platform built for your program."`
- CTA: `"Get a Demo"`

**Bottom Bar:**
- Social: Instagram icon (links to `https://www.instagram.com/get_ampd_up/`)
- Copyright: `"(c) 2026 AMPD Technologies LLC. All Rights Reserved."`
- Legal link: `"Privacy Policy"`

### Index Page Footer (slightly different)
- Same grid but Brand column includes:
  - Extra line: `"See AMPD in action"` (as `footer-cta-line`)
  - Extra CTA button: `"Get a Demo"`
- Bottom bar layout: copyright on left, social on right (reversed from other pages)
- No 4th CTA column

### Legal Pages Footer (privacy-policy, terms)
Completely different inline-styled footer:

**Brand Column:**
- Logo: AMPD white logo
- Tagline: `"Develop athletes. Every day."` (DIFFERENT from main pages)
- `"Coming Soon"` label
- App Store badge (grayed out, non-clickable)
- Google Play badge (grayed out, non-clickable)

**Platform Column:**
- Header: `"Platform"`
- Links: `"Platform"`, `"Get a Demo"` (only 2 links, DIFFERENT from main pages)

**Company Column:**
- Header: `"Company"`
- Links: `"The Why"`, `"Mission"`, `"Safety"` (NO Privacy Policy or Terms links here)

**Compliance Badges:**
- `"FERPA Compliant"` with green shield icon
- `"COPPA Compliant"` with green shield icon

**Bottom:**
- Instagram social link
- Copyright: `"(c) 2026 AMPD Technologies LLC. All Rights Reserved."`
- `"Privacy Policy"` link
- `"Terms of Service"` link

---

## Shared CTA Patterns

Every main content page ends with a `cta-band` section:
| Page | H2 | Subtext | CTA Label |
|------|-----|---------|-----------|
| about | `"Ready to build a stronger program?"` | `"See how AMPD can transform your athletic department."` | `"Get a Demo"` |
| mission | `"Ready to develop your athletes the right way?"` | `"See how AMPD can transform your program."` | `"Get a Demo"` |
| platform | `"Ready to see it in action?"` | `"Get a walkthrough of the platform built for your program."` | `"Get a Demo"` |
| safety | `"Protect your athletes. Develop them daily."` | `"See how AMPD works for your program."` | `"Get a Demo"` |

All CTAs link to `/demo.html`.

---

## "Coming Soon" Badges

Only appear in the **legal pages footer**:
- `"Coming Soon"` label above grayed-out App Store / Google Play badges
- Both badges are `opacity: 0.5` and `pointer-events: none`
- Not present anywhere else on the site
