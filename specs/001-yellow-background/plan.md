# Implementation Plan: Yellow Background Refresh

**Branch**: `001-yellow-background` | **Date**: 2026-01-21 | **Spec**: `/specs/001-yellow-background/spec.md`
**Input**: Feature specification from `/specs/001-yellow-background/spec.md`

## Summary

Unify page backgrounds to a single, accessible light-yellow theme across the guided onboarding（两步泡泡）、首页、以及首页底部按钮可到达的主入口页（文献/搜索/个人中心等）. Keep cards/blocks white, ensure text/button contrast ≥4.5:1（次要文字≥3:1）, avoid flash/jump during load, and centralize the yellow color definition in one shared theme source for maintainability.

## Technical Context

**Language/Version**: WeChat Mini Program (JavaScript, WXML/WXSS)  
**Primary Dependencies**: Native WeChat Mini Program runtime only (no extra UI libs identified)  
**Storage**: N/A (visual styling change only)  
**Testing**: Manual visual verification across target pages + WCAG contrast check tool; sample reloads to ensure no flicker  
**Target Platform**: WeChat Mini Program on iOS/Android (standard webview container)  
**Project Type**: Single mini-program project with `pages/` entries  
**Performance Goals**: Background color renders on first paint; zero additional JS; keep 60fps scrolling  
**Constraints**: Centralized theme color definition; avoid inline/background conflicts; maintain readability in light/default mode; dark mode keeps same palette with contrast recheck  
**Scale/Scope**: Onboarding（两步泡泡）+ 首页 + 首页底部按钮入口页（文献/搜索/个人中心等）; no backend/API impact

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Safety-first mental health UX: PASS — purely visual background update; no copy/flows change, keep existing disclaimers/help unchanged.  
- Privacy & data minimization: PASS — no data collection/storage/transmission changes.  
- Content quality & source transparency: PASS — no content/claims altered.  
- Mini-program performance & native fit: PASS — WXSS-only; reuse shared import; routing untouched; ensure background set before render to avoid flash.

Post-Phase 1 re-check: PASS (design retains visual-only scope; contrast guardrails documented).

## Project Structure

### Documentation (this feature)

```text
specs/001-yellow-background/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output (/speckit.plan)
├── data-model.md        # Phase 1 output (/speckit.plan)
├── quickstart.md        # Phase 1 output (/speckit.plan)
├── contracts/           # Phase 1 output (/speckit.plan)
└── tasks.md             # Phase 2 output (/speckit.tasks - not created here)
```

### Source Code (repository root)

```text
app.js / app.json / app.wxss
pages/
├── home/
├── index/
├── my-page/
├── ocd/
├── search/
└── other routed pages reachable from footer entries
styles/                # common WXSS (target location for theme palette)
utils/                 # shared helpers (not expected for this change)
```

**Structure Decision**: Single WeChat Mini Program; introduce `styles/theme.wxss` to hold the shared yellow background + text palette tokens, imported by target page WXSS files and applied to the outermost containers.

## Complexity Tracking

No constitution violations to justify for this feature.
