# 05 - Image & Asset Inventory

## Cloudinary-Hosted Brand Assets

| Image | URL | Used On | Type |
|-------|-----|---------|------|
| AMPD White Logo | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1770487124/AMPD_White_ms0gvl.png` | Every page (header + footer) | REAL logo |
| AMPD App Icon | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1772744732/AMPD_APP_ICON_epn4op.png` | Every page (favicon, OG image) | REAL icon |
| Hero Image | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1772741117/AMPD-HERO_udpmsr.png` | index.html (hero section) | REAL product screenshot |
| Comparison Visual | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1773080891/MNEWREFLECTIOn_sthymr.png` | index.html (comparison section) | REAL product screenshot |
| Mental Performance Icon | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1770487126/NEWLIGHTNINGBRAIN_fs1pqy.png` | index.html (feature card), platform.html (feature section) | REAL icon/illustration |
| Training Icon | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1770487126/DUMBBELLICON_gcw2iu.png` | index.html (feature card), platform.html (feature section) | REAL icon/illustration |
| Schedules Icon | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1770487125/REMINDERSICON_yvc0c9.png` | index.html (feature card), platform.html (feature section) | REAL icon/illustration |
| Readiness Icon | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1772747720/READINESSICON_drsduy.png` | index.html (feature card), platform.html (feature section) | REAL icon/illustration |
| Communication Visual | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1772748106/ChatGPT_Image_Mar_5_2026_04_01_35_PM_bs959b.png` | platform.html (communication section) | UNCLEAR -- filename suggests AI-generated image ("ChatGPT_Image") |
| Founder Photo | `https://res.cloudinary.com/dhzjg43qc/image/upload/v1771266906/IMG_2341_2_zaguii.jpg` | about.html (team section) | REAL photo |

## External Images (Logo Carousel - index.html)

| Logo | Source URL | Alt Text |
|------|-----------|----------|
| NFHS | `https://upload.wikimedia.org/wikipedia/en/5/51/National_Federation_of_State_High_School_Associations_logo.svg` | NFHS |
| IHSA | `https://upload.wikimedia.org/wikipedia/commons/6/61/Illinois_High_School_Association_Logo.svg` | IHSA |
| MIAA | `https://www.miaa.net/sites/default/files/2022-07/MIAA_Logo.svg` | MIAA |
| PIAA | `https://upload.wikimedia.org/wikipedia/en/f/f4/PIAA_newlogo.png` | PIAA |
| FHSAA | `https://upload.wikimedia.org/wikipedia/en/9/94/FHSAA_logo.png` | FHSAA |
| MSHSL | `https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Minnesota_State_High_School_League_logo.svg/...` | MSHSL |
| TSSAA | `https://upload.wikimedia.org/wikipedia/en/8/84/TSSAA_logo.jpg` | TSSAA |
| KHSAA | `https://cdn2.khsaa.org/wp-content/themes/khsaa-theme/images/logo.png` | KHSAA |
| OHSAA | `https://upload.wikimedia.org/wikipedia/en/f/fc/Ohsaa-logo.png` | OHSAA |
| MHSAA | `https://upload.wikimedia.org/wikipedia/en/5/54/MHSAA_Web_Logo.png` | MHSAA |
| GHSA | `https://upload.wikimedia.org/wikipedia/en/1/13/Georgia_High_School_Association_Logo.png` | GHSA |
| NCHSAA | `https://www.nchsaa.org/wp-content/uploads/2023/08/Color-2nd-nchsaa-logo.png` | NCHSAA |
| VHSL | `https://upload.wikimedia.org/wikipedia/en/0/0a/Virginia_High_School_League_logo.png` | VHSL |
| CIF | `https://upload.wikimedia.org/wikipedia/en/6/6e/California_Interscholastic_Federation_logo.svg` | CIF |
| WIAA | `https://upload.wikimedia.org/wikipedia/en/0/08/WIAA.PNG` | WIAA |
| IHSAA | `https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Indiana_High_School_Athletic_Association_(logo).png/...` | IHSAA |
| MSHSAA | `https://upload.wikimedia.org/wikipedia/en/3/3d/Missouri_State_High_School_Activities_Association_(emblem).png` | MSHSAA |
| AHSAA | `https://upload.wikimedia.org/wikipedia/commons/6/64/AHSAA_logo.PNG` | AHSAA |

**NOTE:** These are all hotlinked from Wikipedia and external sites. They could break at any time if those URLs change. The carousel label says "Built for high school athletics across the country" which implies these associations use or endorse AMPD, which may not be accurate.

## External Images (Legal Page Footers)

| Image | Source URL | Used On |
|-------|-----------|---------|
| App Store Badge | `https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg` | privacy-policy.html, terms.html (footer) |
| Google Play Badge | `https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png` | privacy-policy.html, terms.html (footer) |

Both badges are grayed out (opacity 0.5) and non-interactive, with "Coming Soon" label above them.

## SVG Icons (Inline)

All icons are inline SVGs throughout the site:
- Checkmark icons (feature lists, comparison list, trust cards)
- Shield icon (FERPA card)
- Lock icon (Privacy card)
- Map pin icon (US Hosting card)
- Grid icon (District Ready card)
- Dropdown arrow (nav)
- Navigation arrows (logo carousel prev/next)
- Instagram icon (footer social)

No icon library (no FontAwesome, no icon sprites). All hand-coded inline SVGs.

## Missing Assets / Gaps

1. **No real product screenshots on platform.html** -- Each feature section uses the same small icon/illustration instead of showing actual app UI. The hero on index.html has a product screenshot, but the platform detail page does not.
2. **Communication visual is AI-generated** -- Filename `ChatGPT_Image_Mar_5_2026_04_01_35_PM_bs959b.png` suggests this was generated by ChatGPT/DALL-E, not an actual product screenshot.
3. **No local images** -- Everything is hosted externally (Cloudinary or hotlinked). No fallback if Cloudinary or external URLs go down.
4. **Logo carousel relies on hotlinks** -- 18 logos from Wikipedia and organization websites could break without notice.
