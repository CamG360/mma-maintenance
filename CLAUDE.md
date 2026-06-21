# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-file static HTML app (`index.html`) — an interactive MMA maintenance regime tracker. No build step, no framework, no backend. Open the file directly in a browser.

**Dependencies:** Tailwind CSS via CDN only (`cdn.tailwindcss.com`).

## Running

Open `index.html` in any modern browser. No server needed.

To view with live reload during edits, any static file server works — e.g.:
```
npx serve .
python -m http.server 8080
```

## Architecture

Everything lives in `index.html`. Three logical layers, all inline:

**Data** — `regimeData` array (line ~116). Each entry has `id`, `title`, optional `subtitle`, and `items[]`. Items have `id`, `exercise`, `dose`, and optional `area`. This is the single source of truth for all checklist content. To add, remove, or reorder sections or exercises, edit this array.

**State** — `let state = {}` loaded from `localStorage` key `mmaRegimeState`. Keys are item IDs; presence of a key means checked. Mutated in `handleCheck()`, persisted immediately via `localStorage.setItem`.

**Render** — `renderChecklist()` rebuilds the entire DOM from scratch on init or reset. `handleCheck()` does targeted DOM updates (strike-through, section progress bar) without re-rendering. `updateProgress()` recomputes and updates the global progress bar.

**Accordion** — CSS class `.open` on `.accordion-content` drives expand/collapse via `max-height` transition. `aria-expanded` on the button is the authoritative toggle state.

## CSS rules

Custom styles are in the `<style>` block in `<head>`. The `.accordion-content.open` rule uses `max-height: 2000px` as an upper bound for the CSS transition — if a section ever exceeds this height it will clip silently.

Tailwind is loaded from CDN, so responsive utilities work normally. Per project conventions: do not use Tailwind responsive classes (e.g. `md:hidden`) to toggle visibility on elements that also have a custom CSS class rule — use explicit `@media` blocks in the `<style>` block instead.

## Supporting files

- `_supporting/` — source markdown notes (body assessment, maintenance regime spec). Reference material; not loaded by the app.
- `prototypes/` — HTML/JSX prototypes from Claude, GPT, and Gemini used during design exploration. Not production code.
- `_Ops/DECISIONS.md` — ADRs for tech choices made in this repo.
