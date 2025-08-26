# PlanWell Landing Page

This repository contains the landing page for PlanWell - a visual planning tool for teachers with full Obsidian integration.

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

## Development

This is a static HTML/CSS/JavaScript site hosted on GitHub Pages.

### Structure

```
├── index.html              # Main landing page
├── assets/
│   ├── css/style.css      # Stylesheet matching PlanWell app design
│   ├── js/main.js         # Download handling and interactions
│   └── images/            # Screenshots and assets
└── README.md
```

### Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

### Deployment

The site is automatically deployed via GitHub Pages from the main branch.

## Download

The latest version of PlanWell can be downloaded from the [Releases](https://github.com/cucumbers2blue/planwell.site/releases) page.

## Contact

For feedback and support, please use the contact form on the website or email feedback@planwell.site.

---

Built with ♥ by a teacher, for teachers who value their data and workflow freedom.