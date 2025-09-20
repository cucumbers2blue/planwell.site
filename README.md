# PlanWell.md Landing Page

This repository hosts the GitHub Pages site that distributes the latest PlanWell.md build. The page is intentionally minimal—one hero panel with the download CTA and a link to the YouTube build log.

## Page Overview

- `index.html` renders the entire site (brand header, hero copy, download button, YouTube link, release metadata footer).
- `assets/css/style.css` provides the macOS Tahoe–inspired glass UI for the hero layout. No additional sections exist.
- `assets/js/main.js` keeps lightweight UI behaviour (tab switching, smooth scrolling, analytics pings) and logs clicks on the download link.
- `assets/images/` stores the single screenshot used in the hero card.

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx http-server
```

Open `http://localhost:8000` and click the download button to confirm it opens the GitHub Releases page.

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
