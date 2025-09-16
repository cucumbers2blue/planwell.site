# Repository Guidelines

## Layout
- `index.html` is the only HTML document; keep the hero copy, download CTA, and footer concise.
- `assets/css/style.css` owns the Tahoe-inspired glass UI—stick to CSS custom properties and existing class names.
- `assets/js/main.js` handles release discovery, button wiring, and fallback logic. Update the stable filename or repo constants only when distribution changes.
- `assets/images/` contains the single hero screenshot. Compress replacements before committing.

## Development
- Serve locally with `python3 -m http.server 8000` (or `npx http-server`) and verify both download buttons initiate the ZIP.
- Test the fallback by blocking `api.github.com` in devtools and ensuring the stable URL still triggers a download.
- Keep the page single-screen; new sections should be justified in issues before implementation.

## Style & Copy
- Maintain 2-space indentation in HTML/CSS; use semantic class names already in use (`hero-meta`, `glass-frame`, etc.).
- Tone: technical, concise, aimed at early adopters. Avoid marketing filler and “coming soon” language.
- Update the hero bullet list only when the product’s differentiators change.

## Release Flow
- Distribution lives on this repo’s releases. Upload both the versioned `PlanWell.md-<ver>-macOS-arm64.zip` and stable `PlanWell.md-macOS-arm64.zip` (plus optional `.sha256`).
- After uploading, run `curl https://api.github.com/repos/cucumbers2blue/planwell.site/releases/latest` to confirm asset names and sizes.
- Remove local ZIP artifacts from the working tree after publishing (`rm PlanWell.md*.zip*`).

## Pull Requests
- Include before/after screenshots or a short screen recording for visual tweaks.
- Note the release tag you verified against and list manual tests (API fetch + fallback).
- Tag reviewers familiar with release automation when touching `assets/js/main.js`.
