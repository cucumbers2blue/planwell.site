# PlanWell Desktop Website

This repository hosts the static marketing site for PlanWell Desktop at planwellmd.com.

## Page Overview

- `index.html` - Home page with desktop-first conversion hierarchy
- `products.html` - Product packaging and companion tools
- `changelog.html` - Retired public changelog notice with pointers to current update surfaces
- `privacy.html` - Privacy policy and no-tracking statement
- `assets/css/style.css` - Shared visual system and responsive layout
- `assets/js/main.js` - Lightweight UI behavior (year + copy helper only)
- `assets/images/` - Screenshots and media assets

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx http-server
```

Open `http://localhost:8000` and verify nav links and CTA targets.

## Available Products

### Core Offers
- **PlanWell Desktop (Paid)** - Mac App Store desktop app
- **PlanWell Web (Free)** - Fully functional browser app at app.planwellmd.com

### Companion Tools
- **Chrome Extension** - [Chrome Web Store](https://chromewebstore.google.com/detail/planwell-schedule/jonkonglfokjegcdonimhaoaddiofcjp)
- **Raycast Extension** - [Raycast Store](https://www.raycast.com/Raynold/planwell)
- **PlanWell iOS App** - [App Store](https://apps.apple.com/id/app/planwell-teacher-planner/id6755210899)
- **Homebrew Cask** - `brew install --cask cucumbers2blue/planwell/planwell`

## Release Workflow

1. Ship PlanWell Desktop updates through the Mac App Store listing.
2. Keep page messaging, screenshots, and product links aligned with the current app packaging.
3. Commit/push any site copy or styling changes to `main`; GitHub Pages redeploys automatically.

## Deployment

The site is served from `main` via GitHub Pages at https://cucumbers2blue.github.io/planwell.site/. Asset URLs include query params for cache busting.

## Download Behaviour

- Primary desktop CTA points to the Mac App Store listing.
- PlanWell Web is positioned as a full free app, not a trial.
- No analytics or tracking scripts are included in this website.

---

Built for teachers who want local-first planning and full file ownership.
