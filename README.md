# MMA Maintenance — Workstation

**Repo:** https://github.com/CamG360/mma-maintenance  
**Live tool:** https://camg360.github.io/mma-maintenance/

---

## What this is

Self-contained workstation for MMA maintenance. Contains the source regime design, body assessment and issues docs, UX prototypes from three AI models, and the deployed checklist tool.

The live tool is the Gemini prototype, deployed as-is via GitHub Pages. No build step. No backend.

---

## Contents and status

| Component | File | Status |
|-----------|------|--------|
| Deployed checklist | `index.html` | Live — tested daily |
| Maintenance Regime source | `_supporting/MMA_Maintenance-Regime_1513.200626.md` | One-shot — tested daily |
| Body Assessment source | `_supporting/SP_Body-Assessment_1516.200626.md` | One-shot — tested daily |
| Body Issues collation | `_supporting/SP_Body-Issues_1516.200626.md` | One-shot — tested daily |
| GPT UX prototype | `ux_modelling/MMA_maintenance_checklist_GPT_210626.html` | Reference |
| Claude UX prototype | `ux_modelling/MMA_maintenance_checklist_Claude_210626.jsx` | Reference (JSX — not browser-ready without build) |
| Gemini UX prototype | `ux_modelling/MMA_maintenance_checklist_Gemini_210626.html` | Deployed as MVO |

---

## Docs

| Doc | Path |
|-----|------|
| Design note | `design-notes/DN-MMA-Maintenance-Repo-v1_0-20260621.md` |
| Planning working paper | `_Ops/PWP-MMA-Maintenance-v1_0-20260621.md` |
| Decisions | `_Ops/DECISIONS.md` |
