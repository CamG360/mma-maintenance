# Technical Decisions — MMA Maintenance

## ADR-001: Static HTML Single-Page Approach

**Problem:** Need a lightweight, deployable maintenance regime tracker with minimal dependencies.

**Options Considered:**
1. Static HTML + Vanilla JS (chosen)
2. React/Vue SPA with build process
3. Backend API with dynamic rendering

**Solution:** Single HTML file with embedded Tailwind CSS (CDN) and vanilla JavaScript for interactivity.

**Rationale:**
- No build step required; direct browser rendering
- Minimal deployment complexity
- Fast load time; easy to share and iterate
- Suitable for content-driven tool (not real-time data sync)

**Status:** Implemented

**Reuse Instructions:**
- Edit HTML directly in `index.html`
- Use Tailwind utility classes for responsive design
- Keep all CSS and JS within the same file for portability

---

## ADR-002: Accordion UI for Maintenance Regime Organization

**Problem:** Presenting hierarchical maintenance data (regimes, tasks, requirements) in a compact interface.

**Solution:** Accordion components with smooth expand/collapse transitions and aria-expanded attributes.

**Rationale:**
- Reduces visual clutter; users see only relevant sections
- Progressive disclosure matches mental model of nested regimes
- CSS transitions provide smooth UX feedback
- Accessible via keyboard navigation and screen readers

**Status:** Implemented

**Artifacts:**
- Accordion styles: `.accordion-content`, `.accordion-button`, `.chevron`
- Transition duration: 0.3s ease-in-out

---

## ADR-003: Dark Theme with Custom Scrollbar

**Problem:** Ensure visual consistency and accessibility in low-light environments.

**Solution:** Dark theme (zinc-950 background, zinc-100 text) with styled scrollbars.

**Rationale:**
- Reduces eye strain in dark environments
- Emerald-500 accent color provides visual hierarchy
- Custom scrollbar styling keeps UI cohesive across browsers

**Status:** Implemented

---

## Pending Decisions

- Data persistence model (if needed)
- Real-time synchronization approach
- Mobile responsiveness enhancements

---

**Last Updated:** 2026-06-21
