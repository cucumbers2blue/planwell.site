# PlanWell.md Landing Page

This repository hosts the GitHub Pages site that distributes the latest PlanWell.md build. The page is intentionally minimal—one hero panel with the download CTA and a link to the YouTube build log.

## Page Overview

- `index.html` renders the entire site (brand header, hero copy, download button, YouTube link, release metadata footer).
- `assets/css/style.css` provides the macOS Tahoe–inspired glass UI for the hero layout. No additional sections exist.
- `assets/js/main.js` fetches `releases/latest` from this repository, injects the current version + file size, and wires the fallback stable ZIP.
- `assets/images/` stores the single screenshot used in the hero card.

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx http-server
```

Open `http://localhost:8000` and click the download button to confirm both the API and fallback URLs resolve.

## Release Workflow

1. Produce the notarized Apple silicon ZIP from the app repository (`npm run mac:ship:zip`).
2. Upload both the versioned archive `PlanWell.md-<ver>-macOS-arm64.zip` and the stable alias `PlanWell.md-macOS-arm64.zip` to this repo’s matching release tag:
   ```bash
   gh release upload v<ver> \
     planwell.md/dist-electron/PlanWell.md-<ver>-macOS-arm64.zip \
     planwell.md/PlanWell.md-macOS-arm64.zip \
     --repo cucumbers2blue/planwell.site --clobber
   ```
3. Adjust `assets/js/main.js` only if the repo owner/name or stable filename ever changes. The script auto-refreshes version and file size values.
4. Commit/push any site copy or styling changes to `main`; GitHub Pages redeploys automatically.

## Deployment

The site is served from `main` via GitHub Pages at https://cucumbers2blue.github.io/planwell.site/. Asset URLs include query params for basic cache busting.

## Download Behaviour

- Primary: fetch latest release JSON (`/releases/latest`) and pull the first matching `.zip` asset, preferring the stable filename.
- Fallback: direct link to `https://github.com/cucumbers2blue/planwell.site/releases/latest/download/PlanWell.md-macOS-arm64.zip` in case the API fails.

---

Built for technical educators who prefer owning their workflow.
