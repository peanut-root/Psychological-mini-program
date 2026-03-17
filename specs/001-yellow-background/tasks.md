# Tasks: Yellow Background Refresh

**Input**: Design documents from `/specs/001-yellow-background/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Automated tests not requested; include manual verification per user story.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared theme resources.

- [X] T001 Create `styles/theme.wxss` with palette classes (`.bg-app-yellow`, `.text-on-yellow-primary`, `.text-on-yellow-secondary`, `.btn-on-yellow`, optional `.page-fill`) using colors from research.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Baseline analysis to avoid regressions before applying theme.

- [X] T002 Audit target pages reachable from home footer/onboarding, list current background/inline colors in `specs/001-yellow-background/research.md` (append “Target Pages Audit”).
- [X] T003 Ensure `app.wxss` leaves `page` background transparent (or neutral) so page-level wrappers can show yellow; remove conflicting global backgrounds if present.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - 一致的明亮黄背景 (Priority: P1) 🎯 MVP

**Goal**: Target pages render unified light-yellow background with no flash/jump.

**Independent Test**: Load onboarding（两步泡泡）、首页、footer入口页，verify background is `#FFF6D8` on first paint with no other base colors.

### Implementation for User Story 1

- [X] T004 [P] [US1] Import `styles/theme.wxss` and apply `.bg-app-yellow` + `.page-fill` wrapper in `pages/index/index.wxml` + `pages/index/index.wxss` (onboarding/landing).
- [X] T005 [P] [US1] Import theme and wrap root container with `.bg-app-yellow` in `pages/home/home.wxml` + `pages/home/home.wxss`; ensure footer entry area inherits yellow.
- [X] T006 [P] [US1] Import theme and wrap root container with `.bg-app-yellow` in `pages/search/search.wxml` + `pages/search/search.wxss`.
- [X] T007 [P] [US1] Import theme and wrap root container with `.bg-app-yellow` in `pages/my-page/my-page.wxml` + `pages/my-page/my-page.wxss`.
- [X] T008 [P] [US1] Import theme and wrap root container with `.bg-app-yellow` in `pages/ocd/ocd.wxml` + `pages/ocd/ocd.wxss`.
- [X] T009 [US1] Remove or override any inline/legacy background colors in `pages/*` files identified in T002 that conflict with the yellow base (document resolved items in `specs/001-yellow-background/research.md`).
- [X] T010 [US1] Manual check: load each target page twice (cold/warm) to confirm no white-to-yellow flash; note results in `specs/001-yellow-background/quickstart.md`.

**Checkpoint**: User Story 1 independently verifiable (SC-001, SC-003).

---

## Phase 4: User Story 2 - 可读性与对比度保障 (Priority: P2)

**Goal**: Text/buttons on yellow remain readable with required contrast; buttons fit their cards/containers.

**Independent Test**: Measure contrast of text/buttons on yellow ≥4.5:1 (primary/btn) and ≥3:1 (secondary); visually confirm button alignment within cards.

### Implementation for User Story 2

- [X] T011 [P] [US2] Apply `.text-on-yellow-primary` / `.text-on-yellow-secondary` to text directly on yellow backgrounds in `pages/index/index.wxml` and `pages/home/home.wxml`; ensure card-contained text keeps existing white-background styles.
- [X] T012 [P] [US2] Ensure buttons placed on yellow use `.btn-on-yellow` (or compatible color) and fit within card/container layouts in `pages/home/home.wxss` and `pages/index/index.wxss` (respect FR-007).
- [X] T013 [US2] Manual contrast verification using WCAG tool; record ratios for primary/secondary text and buttons in `specs/001-yellow-background/quickstart.md`.

**Checkpoint**: User Story 2 independently verifiable (SC-002).

---

## Phase 5: User Story 3 - 主题可维护性 (Priority: P3)

**Goal**: Single source of truth for theme color; all target pages consume shared tokens.

**Independent Test**: Confirm only `styles/theme.wxss` defines the yellow palette; all target page WXSS import it; no duplicate hex values for the palette elsewhere.

### Implementation for User Story 3

- [X] T014 [P] [US3] Deduplicate any remaining yellow/text color definitions by replacing with references to `styles/theme.wxss` in target page WXSS files (home, index, search, my-page, ocd).
- [X] T015 [US3] Add brief usage notes/comments in `styles/theme.wxss` and ensure `specs/001-yellow-background/quickstart.md` reflects final token names/import paths.

**Checkpoint**: User Story 3 independently verifiable (SC-001, SC-004 maintainability aspect).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and hygiene.

- [X] T016 [P] Run dark-mode device spot-check to confirm palette remains readable; note in `specs/001-yellow-background/quickstart.md`.
- [X] T017 [P] Final consistency sweep: navigation between themed pages shows continuous yellow background with no seams; log any residual issues and fixes in `specs/001-yellow-background/research.md`.

---

## Dependencies & Execution Order

- Phase order: Setup → Foundational (blocks stories) → US1 (P1, MVP) → US2 (P2) → US3 (P3) → Polish.
- Story dependencies: US2 and US3 depend on foundational and benefit from US1 palette being in place; they remain independently testable.
- Within stories: apply imports/wrappers before cleanup; cleanup before manual checks; contrast checks after color application.

## Parallel Opportunities

- [P] tasks across different page files (T004–T008, T011–T012, T016–T017) can run concurrently.
- US2 and US3 can proceed in parallel after US1 completes if team capacity allows.

## Parallel Examples per Story

- US1: T004–T008 can be executed in parallel on separate pages; T009 waits on audit outcomes.
- US2: T011 (text styling) and T012 (button styling) can run in parallel; T013 follows for measurement.
- US3: T014 can be parallelized per file; T015 is final consolidation.

## Implementation Strategy

- MVP first: Complete Setup + Foundational → deliver US1 and validate backgrounds (meets SC-001/SC-003). 
- Incremental: After US1 sign-off, ship US2 for contrast/fit, then US3 for maintainability; polish to close dark-mode/flicker checks.

