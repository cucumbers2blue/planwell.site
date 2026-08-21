# PlanWell Website

This repository hosts the static PlanWell marketing site at planwellmd.com.

## Page Overview

- `index.html` - Home page for PlanWell for Mac
- `products.html` - Redirect to the home page
- `changelog.html` - Redirect to the home page
- `privacy.html` - Privacy policy and no-tracking statement
- `support.html` - Support, troubleshooting, and contact information
- `assets/css/style.css` - Shared visual system and responsive layout
- `assets/js/main.js` - Lightweight UI behavior (year + copy helper only)
- `assets/images/` - Screenshots and media assets
- `flash/index.html` - Public Music + Design flashcard library, organized by grade
- `design/index.html` - Redirects to `/flash/`
- `source/grade-6-design-flashcards/` - Shared flashcard player and deck data
- Class documents (The Pantry / `/classes/`) were removed. Students get docs via Google Classroom.

## Music + Design Flashcards

Student landing page: [planwellmd.com/flash/](https://planwellmd.com/flash/).

Current library:

- Grade 6 Design decks (digital citizenship, computer systems, …)
- Grade 6 Music decks (Task A score symbols, …)

Source lives in `source/grade-6-design-flashcards/`. Grades contain subjects,
and subjects contain decks, so future grades can be added as data. Rebuild with:

```bash
node scripts/build-grade-6-design-flashcards.mjs
```

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx http-server
```

Open `http://localhost:8000` and verify nav links and CTA targets.

## Available Products

### Core offer
- **PlanWell Timetable** - Native Mac app on the [Mac App Store](https://apps.apple.com/app/planwell-timetable/id6797381808?mt=12)

### Companion Tools
- **PlanWell Web** - Basic browser planner at [app.planwellmd.com](https://app.planwellmd.com)
- **Chrome Extension** - [Chrome Web Store](https://chromewebstore.google.com/detail/planwell-schedule/jonkonglfokjegcdonimhaoaddiofcjp)
- **Raycast Extension** - [Raycast Store](https://www.raycast.com/Raynold/planwell)
- **PlanWell CLI** - [npm](https://www.npmjs.com/package/planwell-cli)

## Release Workflow

1. Ship PlanWell updates through the Mac App Store listing.
2. Keep page messaging, screenshots, and product links aligned with the current app packaging.
3. Commit/push any site copy or styling changes to `main`; GitHub Pages redeploys automatically.

## Deployment

The site is served from `main` via GitHub Pages at https://cucumbers2blue.github.io/planwell.site/. Asset URLs include query params for cache busting.

## Download Behaviour

- Primary CTA points to the current Mac App Store listing.
- PlanWell Web appears as a secondary browser option.
- No analytics or tracking scripts are included in this website.

---

Built for teachers who want local-first planning and full file ownership.
