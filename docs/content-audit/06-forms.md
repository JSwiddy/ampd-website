# 06 - Forms and Interactive Elements

## Demo Request Form (`/demo.html`)

### Location
- File: `/demo.html`, lines 21-26
- Form ID: `pilotForm`
- Handler: `/pilot-form.js`
- Backend: `/api/pilot-request.js` (Vercel serverless function)

### Form Fields

| Field | Type | ID | Required | Placeholder | Label |
|-------|------|-----|----------|-------------|-------|
| Name | text | `name` | Yes | `"Your full name"` | `"Name *"` |
| Email | email | `email` | Yes | `"your@email.com"` | `"Email *"` |
| Role | text | `role` | Yes | `"e.g., AD, Head Coach"` | `"Your Role *"` |
| Organization | text | `organization` | Yes | `"Your school name"` | `"School or Organization *"` |
| Message | textarea | `message` | No | `"Tell us about your program..."` | `"Message (Optional)"` |

### Submit Button
- Label: `"Request Your Demo"`
- Loading state: Changes to `"Sending..."`

### Success State
- Hidden by default (`style="display:none"`)
- Green checkmark SVG
- H3: `"You're on your way."`
- Body: `"Your demo request is in. We'll reach out within 24 hours."`

### Backend Processing
The serverless function at `/api/pilot-request.js` expects these additional fields that are NOT in the current form:
- `orgType` (required in backend validation)
- `teamSize` (required in backend validation)
- `phone` (optional)
- `timeline` (required in backend validation)

**MISMATCH:** The backend requires `orgType`, `teamSize`, and `timeline` fields, but the current HTML form does not include them. The `pilot-form.js` also has code for custom dropdown validation and phone number formatting that reference elements not present in the current form. This means:
1. Form submissions will FAIL with a 400 error ("Missing required fields") because the backend requires fields the form does not send
2. OR the backend validation was written for an older version of the form and hasn't been updated

### Email Flow
On successful submission (if it were to work):
1. Sends notification email to AMPD team via Postmark (subject: `"New Pilot Program Request - {organization}"`)
2. Sends confirmation email to the submitter (subject: `"Thank you for your AMPD pilot program request"`)
3. Confirmation body references "pilot program request" even though the form says "Demo" -- language mismatch

---

## Interactive Elements

### Logo Carousel (`/index.html`)
- Location: lines 96-130
- Auto-sliding every 3 seconds
- Manual prev/next arrow buttons
- Responsive: shows 2 (mobile), 3, 4, or 6 logos depending on viewport
- JS handler in `/script.js` lines 74-130

### Mobile Navigation Toggle
- Location: Every page (hamburger button)
- JS handler in `/script.js` lines 52-72
- Opens `.mobile-nav-overlay` with slide-in animation
- Closes on link click or toggle click
- Adds `nav-lock` class to body (presumably prevents scroll)

### Header Scroll Effect
- JS handler in `/script.js` lines 38-49
- Adds `.scrolled` class to header when page scrolls past 60px
- Presumably changes header background/styling

### Smooth Scroll
- JS handler in `/script.js` lines 1-16
- Smooth scrolls to anchor targets for `href="#..."` links

### Scroll Reveal Animation
- JS handler in `/script.js` lines 18-35
- IntersectionObserver watches `.reveal` elements
- Adds `.visible` class when element enters viewport
- NOTE: No elements in the current HTML have the `.reveal` class, so this code is unused

### FAQ Accordion (`/safety.html`)
- Location: lines 22-28
- Uses native HTML `<details>/<summary>` elements
- No JavaScript required
- 5 FAQ items, all collapsed by default

### Platform Page Navigation
- Anchor links from nav dropdown: `#mental-performance`, `#training`, `#schedules`, `#readiness`, `#communication`
- Each section has corresponding `id` attribute on platform.html
- Smooth scroll handled by script.js

---

## Issues Found

1. **Form/backend field mismatch**: The demo form sends 5 fields but the backend requires 8, which would cause 400 errors on submission
2. **"Pilot program" language in backend**: The API and confirmation emails still reference "pilot program" while the website says "demo"
3. **Unused JS code**: `pilot-form.js` has custom dropdown and phone formatting code for elements that don't exist in the current form
4. **Unused reveal animation**: `script.js` observes `.reveal` elements but none exist in the HTML
5. **No form validation UX**: No inline validation, no error state display (only a browser alert on failure)
