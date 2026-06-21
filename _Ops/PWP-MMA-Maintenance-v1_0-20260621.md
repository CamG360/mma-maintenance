# PWP-MMA-Maintenance-v1_0 — 0640.210626

Planning Working Paper — MMA Maintenance Workstation

---

## What

A self-contained repo workstation for MMA maintenance. Covers regime design, body assessment and issues tracking (source docs), UX prototyping across three AI models, and a deployed daily-use checklist tool.

Scope (v1): maintenance checklist tool and source docs. Body assessment and issues capture are source docs only — not interactive tools in this version.

---

## Why

| Driver | Detail |
|--------|--------|
| Cognitive friction | Regime, assessment, issues were scattered across Personal_OS three levels deep |
| Single source of truth | One repo holds all related artefacts — version controlled, easy to find |
| UX comparison | Three AI models produced competing prototypes; repo makes comparison immediate |
| Repluggability | Source docs can feed any UX, model, or future tool without restructuring |
| Pattern establishment | One-repo-per-tool pattern for MVO HTML tools to be replicated across other projects |

---

## How

1. Designed maintenance regime, body assessment, and body issues as one-shot markdown docs — AI-assisted, structured as tables for clarity and machine-readability.
2. Three AI models (GPT, Claude, Gemini) each produced a UX prototype from the same source material.
3. Gemini prototype selected as MVO — plain HTML, cleanest implementation, deployable as-is.
4. Deployed via GitHub Pages — `index.html` at repo root, zero infrastructure.
5. Source docs retained in `_supporting/` as the canonical regime reference.
6. All artefacts committed to the repo as the single workstation.

Note on Claude prototype: Claude produced JSX (React syntax), not plain HTML. It cannot open directly in a browser without a build step. It is retained as a design reference.

---

## Status

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Maintenance Regime source | `_supporting/MMA_Maintenance-Regime_1513.200626.md` | One-shot — testing daily | Drives checklist `regimeData` |
| Body Assessment source | `_supporting/SP_Body-Assessment_1516.200626.md` | One-shot — testing daily | Source doc only in v1 |
| Body Issues collation | `_supporting/SP_Body-Issues_1516.200626.md` | One-shot — testing daily | Current issues as of 20 Jun 2026 |
| GPT UX prototype | `ux_modelling/MMA_maintenance_checklist_GPT_210626.html` | Reference | |
| Claude UX prototype | `ux_modelling/MMA_maintenance_checklist_Claude_210626.jsx` | Reference | JSX — not browser-ready |
| Gemini UX prototype | `ux_modelling/MMA_maintenance_checklist_Gemini_210626.html` | Deployed as MVO | |
| Live tool | `index.html` → GitHub Pages | Live — tested daily | https://camg360.github.io/mma-maintenance/ |

---

## Outcomes

- Self-contained workstation operational: all regime artefacts in one repo
- Three UX perspectives produced and preserved for comparison
- MVO deployed and in daily use
- Repo-as-workstation and one-repo-per-tool patterns established and documented

---

## Open questions / next steps

| Item | Notes |
|------|-------|
| Body assessment as interactive tool | Future — assess after regime tool is stable |
| Body issues as interactive tool | Future — may merge with assessment tool |
| Regime source → checklist data sync | Currently manual: source doc and `regimeData` must be updated in step |
| `ux_modelling/` folder rename | Consider renaming to `prototypes/` — more standard for solo dev/dev use |
| Claude JSX prototype | Can be built as a React app if a build step is ever warranted |

---

## Template note

This PWP structure (What / Why / How / Status / Outcomes / Open questions) is applicable to other single-tool repos. Candidate: timelog. Add project-specific tables once scope is determined.

---

## References

| Resource | Location |
|----------|----------|
| Repo | https://github.com/CamG360/mma-maintenance |
| Live tool | https://camg360.github.io/mma-maintenance/ |
| Design note | `design-notes/DN-MMA-Maintenance-Repo-v1_0-20260621.md` |
| Decisions | `_Ops/DECISIONS.md` |

---

## Metadata

| Field | Value |
|-------|-------|
| ID | PWP-MMA-001 |
| Title | MMA Maintenance Workstation — Planning Working Paper |
| Artifact | Planning Working Paper |
| Definition | Project narrative, approach, status, and outcomes for the mma-maintenance repo workstation |
| Logic Path | Why (friction) → How (one-shot docs, UX exploration, Gemini selected) → Outcome (live workstation) |
| Filepath | `mma-maintenance/_Ops/PWP-MMA-Maintenance-v1_0-20260621.md` |
| Problem | MMA maintenance content dispersed; no single project view |
| Approach Type | Planning and status record |
| Purpose | Capture project rationale and status for continuity and replication |
| Objective | Establish MMA maintenance workstation; document pattern for future tool repos |
| Outcome | Operational workstation; established repo-per-tool pattern |
| Preparer | C1 |
| Reviewer | H |
| Confidence | High |
| Tested | Yes |
| Classification | L2 |
| Sources | `_supporting/MMA_Maintenance-Regime_1513.200626.md`, `design-notes/DN-MMA-Maintenance-Repo-v1_0-20260621.md` |
| Timestamp | #ver 0640.210626 |
