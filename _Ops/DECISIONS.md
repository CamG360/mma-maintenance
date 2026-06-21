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

## ADR-004: Repo as Self-Contained Workstation

**Problem:** Maintenance regime, body assessment, and issues docs were in Personal_OS — three levels deep, disconnected from the tool, and not version-controlled alongside the UX artefacts.

**Options Considered:**
1. Keep source docs in Personal_OS/Health/Body; link from repo
2. Move all related artefacts into the repo (chosen)

**Solution:** The repo is the single source of truth for all MMA maintenance artefacts — source docs, UX prototypes, and the deployed tool.

**Rationale:**
- Removes three-deep navigation friction
- All artefacts version-controlled together
- Source docs can be replugged into any UX or model without restructuring
- Status visible directly in repo (Open Projects Register can reference repo state)
- Separation of concerns: Personal_OS holds knowledge; repo holds operational tool and its artefacts

**Status:** Implemented

---

## ADR-005: One Repo Per MVO HTML Tool

**Problem:** GitHub Pages requires `index.html` at the repo root, making one repo hosting multiple independent tools impractical without a routing layer.

**Options Considered:**
1. Multiple tools in one repo with subdirectory routing
2. One repo per tool (chosen)

**Solution:** Each MVO HTML tool gets its own repo. Repos may be grouped under a Tools GitHub org as the count grows.

**Rationale:**
- Deployment is trivial (root index.html → GitHub Pages)
- Each tool is independently versioned and deployable
- Clean separation; easy to replicate the pattern for new tools

**Status:** Implemented. Candidate for containerising under a Tools org when count warrants.

---

## Pending Decisions

- Data persistence model (if needed)
- Real-time synchronization approach
- Mobile responsiveness enhancements
- Body assessment as interactive tool
- Body issues as interactive tool

---

**Last Updated:** 2026-06-21
