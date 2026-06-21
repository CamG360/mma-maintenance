# DN-MMA-Maintenance-Repo-v1_0 — 0640.210626

## Purpose

Document the architectural and structural decisions for the `mma-maintenance` repo as a self-contained MMA maintenance workstation.

---

## Problem Statement

MMA maintenance content (regime, assessment, issues) was dispersed across Personal_OS, requiring three levels of navigation to locate. No single canonical location existed to version-control the content, compare UX representations, or iterate on the tool without context-switching.

---

## Design Decisions

### 1. Repo as workstation

All related artefacts — source docs, UX prototypes, and the deployed tool — live in one repo. The repo is the single source of truth. Personal_OS is not the home for operational artefacts belonging to a live tool.

Rationale: removes cognitive friction; version control covers all artefacts; content can be replugged into any UX or model; comparison between representations is immediate.

### 2. Static HTML MVO — no build step

Tool is a single `index.html` file. Tailwind CSS via CDN. Vanilla JavaScript. No framework, no build process, no backend.

Rationale: instant deployment; zero infrastructure cost; editable directly; portable.

### 3. GitHub Pages for deployment

`index.html` at repo root deploys automatically to `https://camg360.github.io/mma-maintenance/`.

Rationale: zero infrastructure; free; instant; no separate deploy pipeline required.

### 4. Data-driven checklist

All checklist content is defined in a single `regimeData` array in `index.html` (line ~116). To add, remove, or reorder sections or exercises, edit only this array. The render functions consume it without modification.

### 5. State in localStorage

Checkbox state is persisted in `localStorage` under key `mmaRegimeState` as a flat object keyed by item ID. No backend required for MVO.

### 6. One repo per tool

Each MVO HTML tool gets its own repo. GitHub Pages requires `index.html` at root, making multi-tool repos impractical without a routing layer. Repos may be grouped under a Tools GitHub org as the count grows.

---

## Schema / Content

### `regimeData` item structure

```js
{
  id: string,          // unique, stable — used as localStorage key
  title: string,       // section heading
  subtitle?: string,   // optional rule displayed under heading
  items: [
    {
      id: string,      // unique, stable — used as localStorage key
      exercise: string,
      dose: string,
      area?: string    // optional badge label
    }
  ]
}
```

### Source documents in `_supporting/`

| File | Content | Status |
|------|---------|--------|
| `MMA_Maintenance-Regime_1513.200626.md` | Full maintenance regime (sections 1–9) | One-shot, tested daily |
| `SP_Body-Assessment_1516.200626.md` | Body baseline assessment template | One-shot, tested daily |
| `SP_Body-Issues_1516.200626.md` | Current body issues collation (20 Jun 2026) | One-shot, tested daily |

The checklist `regimeData` was derived from the maintenance regime source doc. If the regime is updated, the source doc and `regimeData` must be updated together.

### UX prototypes in `prototypes/`

| File | Tool | Notes |
|------|------|-------|
| `MMA_maintenance_checklist_GPT_210626.html` | GPT | Plain HTML, browser-ready |
| `MMA_maintenance_checklist_Claude_210626.jsx` | Claude | JSX — requires React build to run |
| `MMA_maintenance_checklist_Gemini_210626.html` | Gemini | Plain HTML, deployed as MVO |

---

## Quality Gates

- Tool opens directly in browser with no build step
- `localStorage` state persists across sessions
- `regimeData` is the only place checklist content is defined — no duplication in DOM
- `max-height: 2000px` CSS transition cap — sufficient for current content, must be raised if sections exceed this height
- Tailwind responsive classes must not be applied to elements that also carry a custom CSS class rule (load-order conflict); use `@media` blocks in the `<style>` block instead

---

## Out of Scope (v1)

- Body assessment as an interactive tool
- Body issues as an interactive tool
- Syncing regime source doc to `regimeData` automatically
- Backend, multi-user, or data sync
- Claude JSX prototype as a runnable tool

---

## Acceptance Criteria

- Tool deployed and accessible at `https://camg360.github.io/mma-maintenance/`
- Three source docs version-controlled in `_supporting/`
- Three UX prototypes preserved in `prototypes/` for comparison
- Checkbox state persists across browser sessions via localStorage
- `regimeData` matches regime source doc content

---

## Summary

Minimal viable workstation: one repo containing the regime source, assessment and issues docs, three UX explorations, and a deployed static HTML checklist. No build tooling, no backend, no friction to iterate.

---

## Metadata

| Field | Value |
|-------|-------|
| ID | DN-MMA-001 |
| Title | MMA Maintenance Repo — Design Note |
| Artifact | Design Note |
| Definition | Architectural and structural decisions for the mma-maintenance repo workstation |
| Logic Path | Problem (scattered content) → Decision (repo as workstation, static MVO, GitHub Pages) → Outcome (live tool, version-controlled source) |
| Filepath | `mma-maintenance/design-notes/DN-MMA-Maintenance-Repo-v1_0-20260621.md` |
| Problem | MMA maintenance content dispersed; no single workstation; no UX comparison point |
| Approach Type | Design decision record |
| Purpose | Govern architectural choices for the workstation |
| Objective | Document decisions so future iterations can be informed and consistent |
| Outcome | Self-contained repo workstation with deployed MVO tool |
| Preparer | C1 |
| Reviewer | H |
| Confidence | High |
| Tested | Yes — tool deployed and used daily |
| Classification | L2 |
| Sources | `_supporting/MMA_Maintenance-Regime_1513.200626.md`, `_Ops/DECISIONS.md` |
| Timestamp | #ver 0640.210626 |
