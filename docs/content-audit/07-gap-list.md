# 07 - The Gap List

Consolidated list of every content slot across the site, grouped by page, with status.

---

## /index.html (Home)

### Meta
- Title [REAL: `"AMPD – The All-In-One Platform for High School Athletics"`]
- Meta description [REAL: `"Workouts, schedules, communications, daily readiness check-ins, and the only built-in mental performance system in high school sports."`]
- OG title [REAL: matches title]
- OG description [REAL: slight variation of meta description]
- OG image [REAL: AMPD app icon]

### Hero
- H1 [REAL: `"The all-in-one platform for high school athletics."`]
- Subhead [REAL: `"Workouts, schedules, check-ins, communications, and the only built-in mental performance system in high school sports."`]
- CTA [REAL: `"Get a Demo"`]
- Hero image [REAL: product screenshot showing coach and athlete views]

### Logo Carousel
- Label [REAL: `"Built for high school athletics across the country"`]
- 18 state association logos [UNCLEAR: displayed as if partners/users; all hotlinked from Wikipedia/external sites -- could break, may be misleading]

### Features Grid
- Section heading [REAL: `"Everything your athletic department needs — in one place."`]
- Mental Performance card [REAL: icon + title + description + "Learn More"]
- Training card [REAL: icon + title + description + "Learn More"]
- Schedules card [REAL: icon + title + description + "Learn More"]
- Readiness card [REAL: icon + title + description + "Learn More"]
- **MISSING: Communication card** -- Communication is a platform module listed everywhere else (nav, footer, platform page) but has no card on the home features grid
- **MISSING: Grades card** -- Grades is a live product but not represented here

### Comparison / Value Prop
- H2 [REAL: `"Built for high school. Priced for high school."`]
- 6 checklist items [REAL]
- CTA [REAL: `"Get a Demo"`]
- Visual [REAL: product screenshot]
- **NOTE:** `"NFC wristband check-in"` is listed but never explained anywhere on the site

### How It Works
- H2 [REAL: `"Your program, live the same day."`]
- Subhead [REAL: `"No IT department. No procurement. No confusion."`]
- 3 step cards [ALL REAL]

### Trust / Compliance
- H2 [REAL: `"Compliance & safety first."`]
- Subhead [REAL: `"Designed from the ground up to meet the standards schools require."`]
- 4 trust cards [ALL REAL: FERPA, Privacy-First, School-Safe, District Ready]

### Footer
- Tagline [REAL: `"The all-in-one platform for high school athletics."`]
- CTA line [REAL: `"See AMPD in action"`]
- CTA button [REAL: `"Get a Demo"`]
- Platform links [REAL: 5 items]
- Company links [REAL: 5 items]
- Copyright [REAL: `"(c) 2026 AMPD Technologies LLC"`]
- Social [REAL: Instagram only]
- **NOTE:** Index footer layout differs from other main pages (has inline CTA, different bottom bar arrangement)

---

## /about.html (About)

### Meta
- Title [REAL: `"About | AMPD"`]
- Meta description [REAL: `"AMPD was built by someone who lived through it."`]
- **MISSING: OG description** -- no og:description tag

### Hero
- H1 [REAL: `"Built by someone who lived it."`]
- Body [REAL: full paragraph about the founder's journey]

### Stats
- 3 stats [ALL REAL: `"10+ Years in Athletics"`, `"5 Platform Modules"`, `"1 Mission: Develop Athletes"`]
- **NOTE:** `"5 Platform Modules"` may be inaccurate if Grades counts as a module

### Founder
- Section header [REAL: `"Our Founder"`]
- Photo [REAL: John Swiderek photo]
- Name [REAL: `"John Swiderek"`]
- Title [REAL: `"Founder & CEO"`]
- Bio [REAL: full paragraph]

### Values
- Section header [REAL: `"What We Believe"`]
- 3 value cards [ALL REAL: Athletes First, Simplicity, Accessibility]

### CTA Band
- H2 [REAL: `"Ready to build a stronger program?"`]
- Subtext [REAL: `"See how AMPD can transform your athletic department."`]
- CTA [REAL: `"Get a Demo"`]

---

## /demo.html (Get a Demo)

### Meta
- Title [REAL: `"Get a Demo — AMPD"`]
- Meta description [REAL: `"See why athletic departments are switching to AMPD."`]
- **MISSING: OG tags** -- no og:title, og:description, og:image

### Form Section
- H1 [REAL: `"Get a Demo"`]
- Subhead [REAL: full paragraph]
- Form fields [REAL: Name, Email, Role, Organization, Message]
- Submit button [REAL: `"Request Your Demo"`]
- Success message [REAL: `"You're on your way."` / `"Your demo request is in. We'll reach out within 24 hours."`]
- **BUG: Backend requires fields not in form** (orgType, teamSize, timeline) -- submissions likely fail with 400 error
- **BUG: Backend emails reference "pilot program"** instead of "demo"

---

## /mission.html (Mission)

### Meta
- Title [REAL: `"Mission | AMPD"`]
- Meta description [REAL: `"Our mission is to equip coaches and athletic departments with a daily system for developing the whole athlete."`]
- **MISSING: OG tags** -- no og:title, og:description, og:image

### Hero
- H1 [REAL: `"Our Mission"`]
- Body [REAL: full paragraph]

### Mission Body
- 2 paragraphs [REAL]
- Blockquote [REAL: `"AMPD is here to inspire athletes and build team cultures that last beyond the season."`]

### CTA Band
- H2 [REAL: `"Ready to develop your athletes the right way?"`]
- Subtext [REAL: `"See how AMPD can transform your program."`]
- CTA [REAL: `"Get a Demo"`]

---

## /platform.html (Platform)

### Meta
- Title [REAL: `"Platform | AMPD"`]
- Meta description [REAL: `"Mental performance, training, schedules, readiness, and communication — all in one platform."`]
- **MISSING: OG tags** -- no og:title, og:description, og:image

### Hero
- H1 [REAL: `"The AMPD Platform"`]
- Body [REAL: full paragraph]
- CTA [REAL: `"Get a Demo"`]

### Feature Sections (5 sections)
- Mental Performance [REAL: heading + description + 3 bullets + icon]
- Training [REAL: heading + description + 3 bullets + icon]
- Schedules & Itineraries [REAL: heading + description + 3 bullets + icon]
- Readiness Check-Ins [REAL: heading + description + 3 bullets + icon]
- Communication [REAL: heading + description + 3 bullets + AI-generated visual]
- **MISSING: Grades section** -- live product not represented
- **MISSING: Real product screenshots** -- all feature sections show icons/illustrations instead of actual app UI
- **NOTE:** Communication visual filename reveals it was AI-generated (`ChatGPT_Image_...`)

### CTA Band
- H2 [REAL: `"Ready to see it in action?"`]
- Subtext [REAL: `"Get a walkthrough of the platform built for your program."`]
- CTA [REAL: `"Get a Demo"`]

---

## /safety.html (Safety & Privacy)

### Meta
- Title [REAL: `"Safety & Privacy — AMPD"`]
- Meta description [REAL: `"AMPD is built with student data privacy at the center. FERPA compliant, data encrypted, and district ready."`]
- **MISSING: OG tags** -- no og:title, og:description, og:image

### Hero
- H1 [REAL: `"Safety & Privacy"`]
- Body [REAL: full paragraph]

### Safety Cards
- 4 cards [ALL REAL: FERPA Compliant, Data Encrypted, US Based Hosting, District Ready]

### FAQ
- Section header [REAL: `"Common Security Questions"`]
- 5 FAQ items [ALL REAL]

### CTA Band
- H2 [REAL: `"Protect your athletes. Develop them daily."`]
- Subtext [REAL: `"See how AMPD works for your program."`]
- CTA [REAL: `"Get a Demo"`]

---

## /privacy-policy.html (Privacy Policy)

### Meta
- Title [REAL: `"Privacy Policy — AMPD"`]
- Meta description [REAL]
- OG tags [REAL: all present]

### Content
- H1 [REAL: `"Privacy Policy"`]
- Effective date [REAL: `"March 12, 2026"`]
- 14 legal sections [ALL REAL]
- Contact email [REAL: `sales@liveampd.com`]
- **NOTE:** Uses Poppins font instead of Manrope (inconsistent with rest of site)
- **NOTE:** Header/footer use different structure than main pages
- **NOTE:** Contact email is `sales@liveampd.com` here but `privacy@liveampd.com` in terms.html

---

## /terms.html (Terms of Service)

### Meta
- Title [REAL: `"Terms of Service — AMPD"`]
- Meta description [REAL]
- OG tags [REAL: all present]

### Content
- H1 [REAL: `"Terms of Service"`]
- Effective date [REAL: `"April 8, 2026"`]
- 13 legal sections [ALL REAL]
- Contact email [REAL: `privacy@liveampd.com`]
- Physical address [REAL: `1229 E Algonquin Road, Arlington Heights, IL 60005`]
- **NOTE:** Uses Poppins font instead of Manrope (inconsistent with rest of site)
- **NOTE:** Header/footer use different structure than main pages

---

## /request-pilot.html (Redirect)

- Redirect to `/demo.html` [REAL: functioning redirect]
- No content gaps

---

## Cross-Site Issues Summary

### Critical
1. **Demo form is likely broken** -- backend requires fields (orgType, teamSize, timeline) not present in form HTML
2. **Backend still says "pilot program"** -- confirmation emails reference "pilot program request" instead of "demo"

### Structural Inconsistencies
3. **Two different header implementations** -- main pages vs legal pages have different nav structure, labels, and CTA text
4. **Two different footer implementations** -- main pages vs legal pages are completely different designs
5. **Two different fonts** -- main pages use Manrope; legal pages use Poppins
6. **Inconsistent CSS cache-busting** -- `styles.css?v=115` (index), `?v=75` (main), `?v=58` (legal)
7. **Inconsistent JS cache-busting** -- `script.js?v=10` (index), `?v=8` (main), `?v=6` (legal)

### Content Gaps
8. **No Communication card on home page** -- 4 feature cards shown but Communication (5th module) is missing
9. **Grades product not on website** -- live product only mentioned in Terms of Service
10. **No coming-soon products referenced** -- Counsel, Training Room, Fuel are absent
11. **NFC wristband check-in unexplained** -- listed as a feature but never elaborated
12. **No product screenshots on platform page** -- only icons/illustrations
13. **"5 Platform Modules" stat may be wrong** -- doesn't account for Grades

### Missing Meta/SEO
14. **No OG tags on about.html, demo.html, mission.html, platform.html, safety.html**
15. **Inconsistent CTA labels** -- "Get a Demo" (main) vs "Demo & Pricing" (legal) -- no pricing page exists

### Asset Risks
16. **18 logo carousel images are hotlinked from external sites** -- can break anytime
17. **Communication visual is AI-generated** -- may want real product screenshot
18. **"Coming Soon" app store badges only on legal pages** -- inconsistent with rest of site

### Contact Info Inconsistency
19. **Different contact emails** -- `sales@liveampd.com` (privacy policy) vs `privacy@liveampd.com` (terms)
20. **Physical address only in terms.html** -- not in privacy policy
