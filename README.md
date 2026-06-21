# MMA Maintenance Regime

A dynamic baseline maintenance tracking tool — static HTML page with accordion-based UI for organizing and managing MMA (Maintenance Management Architecture) requirements.

## What it is

Single-page HTML application (`index.html`) that provides an interactive interface for tracking and managing maintenance regimes using a dynamic baseline approach. Built with Tailwind CSS for styling and vanilla JavaScript for accordion interactions.

## Folder Map

```
mma-maintenance/
├── index.html          # Main application page
├── README.md           # This file
└── _Ops/
    └── DECISIONS.md    # Technical decisions and rationale
```

## Setup

No build step required. The application runs directly from `index.html` in any modern browser.

### Quick Start
1. Open `index.html` in a web browser
2. Use accordion controls to expand/collapse maintenance regime sections
3. Content is loaded from the HTML structure — no external data sources

### Dependencies
- Tailwind CSS (loaded via CDN: `cdn.tailwindcss.com`)
- Vanilla JavaScript (no framework required)

## Editing & Extending

- **Styling:** Modify Tailwind classes in element attributes; custom CSS is in the `<style>` block
- **Content:** Edit text directly in HTML elements
- **Functionality:** Add/modify JavaScript in the script section at the end of `index.html`

## Related Documentation

See [`_Ops/DECISIONS.md`](_Ops/DECISIONS.md) for technical decisions, architecture notes, and design rationale.

---

**Repository:** https://github.com/CamG360/mma-maintenance  
**Last Updated:** 2026-06-21
