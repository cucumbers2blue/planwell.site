# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single entry page; keep hero copy, CTA, and download module intact.
- `assets/css/style.css` holds layout, tab, and responsive rules; consolidate custom styles here.
- `assets/js/main.js` owns GitHub release fetching and fallback download logic; avoid duplicating API calls elsewhere.
- `assets/images/` stores hero shots and icons; optimize new media before committing.
- Place supporting docs beside this file; avoid adding build artifacts to the repo root.

## Build, Test, and Development Commands
- `python3 -m http.server 8000` — serve locally for quick smoke checks.
- `npx http-server` — alternative static server, honors SPA-style routing.
- `npm run lint` (if local tooling installed) — run your configured HTML/CSS lint setup before pushing.
- Use `open http://localhost:8000` to verify download buttons resolve to both latest and stable assets.

## Coding Style & Naming Conventions
- Follow existing 2-space indentation in HTML/CSS; use semicolon-terminated JS and `const`/`let` appropriately.
- Keep classes kebab-case (e.g., `download-button`); camelCase JS functions aligned with current patterns.
- Prefer declarative CSS selectors over inline styles; update `style.css` comments when reorganizing sections.
- Run Prettier or EditorConfig defaults that match current formatting before committing.

## Testing Guidelines
- Execute manual regression by loading `index.html` and exercising video tabs, download buttons, and contact form.
- When touching `main.js`, test API fallbacks by temporarily throttling or mocking the GitHub call in devtools.
- Record observed version strings and file sizes in PR descriptions when altering download logic.

## Commit & Pull Request Guidelines
- Use concise, imperative commit subjects (e.g., `Update download fallback messaging`).
- Squash cosmetic tweaks before opening a PR; reference Jira/GitHub issues in the first line of the body when relevant.
- PRs must include: purpose summary, screenshots for visual changes, and reproduction steps for testing.
- Tag reviewers familiar with release automation when touching `main.js` or deployment notes.

## Release & Download Flow Tips
- Host notarized artifacts on GitHub Releases for this repository (`cucumbers2blue/planwell.site`). Attach both the versioned `PlanWell.md-<ver>-macOS-arm64.zip` and the stable `PlanWell.md-macOS-arm64.zip` (plus optional `.sha256`).
- After uploading, hit `https://api.github.com/repos/cucumbers2blue/planwell.site/releases/latest` to confirm metadata and spot typos before announcing the build.
