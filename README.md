# PlanWell.md Landing Page

This repository hosts the GitHub Pages site for PlanWell.md (planwellmd.com). The site includes product pages, changelog, and download links for all PlanWell apps and extensions.

## Page Overview

- `index.html` - Homepage with hero section, download buttons, Raycast install badge
- `products.html` - Product listings for all apps (Desktop, Web, Chrome, Raycast, iOS Beta, macOS Sync Beta)
- `changelog.html` - Version history and release notes for all products
- `privacy.html` - Privacy policy
- `assets/css/style.css` - macOS Tahoe-inspired glass UI styling
- `assets/js/main.js` - Lightweight UI behavior (navigation, analytics)
- `assets/images/` - Screenshots and media assets

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx http-server
```

Open `http://localhost:8000` and click the download button to confirm it opens the GitHub Releases page.

## Available Products

### Production (Available Now)
- **Desktop App** - macOS Electron app (v0.1.1)
- **Web App** - Browser-based at app.planwellmd.com
- **Chrome Extension** - [Chrome Web Store](https://chromewebstore.google.com/detail/planwell-schedule/jonkonglfokjegcdonimhaoaddiofcjp)
- **Raycast Extension** - [Raycast Store](https://www.raycast.com/Raynold/planwell)

### Beta (TestFlight)
- **iOS App** - Beta signup at planwellmd.com/beta
- **macOS Sync** - Calendar sync menu bar app

## Release Workflow

1. Produce the notarized Apple silicon ZIP from the app repository (`npm run mac:ship:zip`).
2. Upload the notarized DMG artifacts to this repo’s matching release tag (add the ZIP only as a secondary option):
   ```bash
   gh release upload v<ver> \
     planwell.md/dist-electron/PlanWell.md-<ver>-arm64.dmg \
     planwell.md/dist-electron/PlanWell.md-<ver>.dmg \
     planwell.md/dist-electron/PlanWell.md-<ver>-macOS-arm64.zip \
     --repo cucumbers2blue/planwell.site --clobber
   ```
3. No script changes are required—the landing page CTA links directly to the release listing. Keep the button label in `index.html` current if messaging changes.
4. Commit/push any site copy or styling changes to `main`; GitHub Pages redeploys automatically.

## Deployment

The site is served from `main` via GitHub Pages at https://cucumbers2blue.github.io/planwell.site/. Asset URLs include query params for basic cache busting.

## Download Behaviour

- The "Download for macOS" CTA opens https://github.com/cucumbers2blue/planwell.site/releases in a new tab; customers choose the installer they need from the release assets.

---

Built for technical educators who prefer owning their workflow.
