# Repository Guidelines

## Layout
- `index.html` is the only HTML document; keep the hero copy, download CTA, and footer concise.
- `assets/css/style.css` owns the Tahoe-inspired glass UI—stick to CSS custom properties and existing class names.
- `assets/js/main.js` keeps lightweight UX behaviour (tabs, smooth scrolling, analytics). It simply logs clicks on the external download link.
- `assets/images/` contains the single hero screenshot. Compress replacements before committing.

## Development
- Serve locally with `python3 -m http.server 8000` (or `npx http-server`) and ensure the download CTA opens the GitHub Releases page in a new tab.
- Keep the page single-screen; new sections should be justified in issues before implementation.

## Style & Copy
- Maintain 2-space indentation in HTML/CSS; use semantic class names already in use (`hero-meta`, `glass-frame`, etc.).
- Tone: technical, concise, aimed at early adopters. Avoid marketing filler and “coming soon” language.
- Update the hero bullet list only when the product’s differentiators change.

## Release Flow
- Distribution lives on this repo’s releases. Upload the notarized DMG(s)—`PlanWell.md-<ver>-arm64.dmg` is the primary asset—and include the ZIP only as an optional fallback.
- After uploading, sanity-check the release page manually to confirm both DMG and ZIP are visible; the landing page links straight to this listing.
- Remove local installer artifacts from the working tree after publishing (`rm PlanWell.md*.dmg* PlanWell.md*.zip*`).

## Pull Requests
- Include before/after screenshots or a short screen recording for visual tweaks.
- Note the release tag you verified against and list manual tests (CTA opens GitHub Releases, assets downloadable).
- Tag reviewers familiar with release automation when touching `assets/js/main.js`.
