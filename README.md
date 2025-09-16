# PlanWell Landing Page

This repository contains the production landing page for PlanWell.md - a visual planning tool for teachers with full Obsidian integration.

## About PlanWell

PlanWell is a desktop application that bridges the gap between visual planning tools and markdown-based workflows. It offers two modes:

- **PlanWell Mode**: Visual drag-and-drop interface for teachers who prefer guided workflows
- **Obsidian Mode**: Direct vault integration for users who want full markdown control

## Features

- Period-based scheduling (not generic time slots)
- Global configurability for any school schedule worldwide
- Markdown-first storage with YAML frontmatter
- Bidirectional sync between visual interface and Obsidian
- Local storage, no cloud dependencies
- Privacy-focused design

## Production Status ✅

**Current Version**: 0.1.0 (September 2025)
- ✅ Fully functional download buttons
- ✅ Responsive design with hero screenshot
- ✅ Tabbed demo videos (PlanWell Mode + Obsidian Mode)
- ✅ Direct download from GitHub Releases
- ✅ Google Form contact integration
- ✅ Production-ready code (debug logging removed)

## Site Structure

```
├── index.html              # Main landing page
├── assets/
│   ├── css/style.css      # Responsive stylesheet with video tabs
│   ├── js/main.js         # Download handling and GitHub API integration
│   └── images/            # Hero screenshot and assets
└── README.md
```

## Key Features

### Download System
- Automatic GitHub API integration for latest releases
- Fallback direct download system
- Real-time file size and version updates
- Download tracking and analytics ready

### Demo Integration
- Hero screenshot above videos
- Tabbed interface for PlanWell vs Obsidian modes
- Responsive YouTube video embeds
- Professional presentation layout

### Contact System
- Google Form integration for user feedback
- No email handling required
- Direct feedback loop for development

## Local Development

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

## Release Workflow

1. Generate the notarized Apple silicon ZIP from the app repository (`npm run mac:ship:zip`).
2. Upload both the versioned archive `PlanWell.md-<ver>-macOS-arm64.zip` and the stable alias `PlanWell.md-macOS-arm64.zip` to this repo’s matching release tag (`gh release upload v<ver> … --repo cucumbers2blue/planwell.site --clobber`).
3. Update `assets/js/main.js` if the stable filename or repo target changes; the script auto-refreshes version/size details from the latest release.
4. Push any site changes to `main`; GitHub Pages deploys automatically.

## Deployment

Automatically deployed via GitHub Pages from main branch:
- Cache busting with version parameters
- Instant updates on git push
- No build process required

## Download

Landing page: https://cucumbers2blue.github.io/planwell.site/

Downloads resolve to assets on the [`cucumbers2blue/planwell.site` releases](https://github.com/cucumbers2blue/planwell.site/releases) page. The buttons first try the GitHub API for the newest tag, then fall back to the stable asset URL (`PlanWell.md-macOS-arm64.zip`).

## Analytics & Tracking

Built-in event tracking for:
- Download button clicks
- Video tab interactions  
- Navigation usage
- Ready for Google Analytics or Plausible integration

---

Built with ♥ by a teacher, for teachers who value their data and workflow freedom.
