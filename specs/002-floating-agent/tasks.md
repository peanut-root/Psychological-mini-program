# Tasks: Floating AI Agent Ball

**Input**: Design documents from `/specs/002-floating-agent/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Automated tests not requested; include manual verification per user story.

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared component and utility scaffolding.

- [x] T001 Create `components/floating-ball/` directory with `floating-ball.json` (`{"component": true, "usingComponents": {}}`).
- [x] T002 Create `utils/ai-api.js` module stub exporting placeholder `sendChatMessage` function.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Implement AI API wrapper in `utils/ai-api.js`
- [x] T004 [P] Create floating-ball component WXML + WXSS skeleton
- [x] T005 [P] Create floating-ball component JS logic stub
- [x] T006 Verify icon file exists at `images/floating-ball-icon.png` (219KB, already placed).

**Checkpoint**: Foundation ready — component skeleton, API wrapper, and icon in place. User story implementation can now begin.

---

## Phase 3: User Story 1 — 悬浮球展示与拖动 (Priority: P1) 🎯 MVP

**Goal**: Floating ball renders on target pages, supports touch-drag, and auto-snaps to screen edges.

**Independent Test**: Load target pages (home, search, my-page, ocd, literature) → verify ball appears with correct icon → drag ball → release → verify edge-snap within 300ms. No chat panel or API needed.

### Implementation for User Story 1

- [x] T007 [US1] Implement ball icon rendering in `components/floating-ball/floating-ball.wxml`
- [x] T008 [US1] Implement touch handlers in `components/floating-ball/floating-ball.js`
- [x] T009 [US1] Add edge-snap CSS transition in `components/floating-ball/floating-ball.wxss`
- [x] T010 [US1] Persist ball position via `wx.setStorageSync`
- [x] T011 [P] [US1] Mount on `pages/home/home`
- [x] T012 [P] [US1] Mount on `pages/search/search`
- [x] T013 [P] [US1] Mount on `pages/my-page/my-page`
- [x] T014 [P] [US1] Mount on `pages/ocd/ocd`
- [x] T015 [P] [US1] Mount on `pages/literature/literature`
- [x] T016 [US1] Verify ball NOT on splash/splash2 (no import added)
- [ ] T017 [US1] Manual check: drag + snap + persistence across pages (requires WeChat DevTools)

**Checkpoint**: User Story 1 independently verifiable (SC-001, SC-002). Ball is visible, draggable, snap-animated, and persistent across all target pages.

---

## Phase 4: User Story 2 — AI 对话面板展开与交互 (Priority: P2)

**Goal**: Tap ball → chat panel slides in with message list, input, send button. Messages display with mock replies.

**Independent Test**: Tap ball on any mounted page → panel slides in within 500ms → type and send message → message appears in list → mock reply appears. No real API connectivity needed.

### Implementation for User Story 2

- [x] T018 [US2] Build chat panel WXML
- [x] T019 [US2] Build chat panel WXSS
- [x] T020 [US2] Implement panel toggle logic
- [x] T021 [US2] Implement chat history persistence
- [x] T022 [US2] Implement sendMessage()
- [x] T023 [US2] Implement keyboard height handling
- [ ] T024 [US2] Manual check: panel animation + mock replies (requires WeChat DevTools)

**Checkpoint**: User Story 2 independently verifiable (SC-003, SC-005, SC-006). Chat panel fully functional with mock responses, keyboard handling, and history persistence.

---

## Phase 5: User Story 3 — API 接入与对话能力 (Priority: P3)

**Goal**: Connect chat to real AI service when API Key is configured; maintain mock fallback when empty.

**Independent Test**: Set `API_KEY` and `API_URL` in `utils/ai-api.js` → send message → verify real AI reply arrives within 5s. Reset to empty → verify mock response returns.

### Implementation for User Story 3

- [x] T025 [US3] Add configuration constants in `utils/ai-api.js`
- [x] T026 [US3] Implement real API request in `utils/ai-api.js`
- [x] T027 [US3] Implement error handling in `utils/ai-api.js`
- [x] T028 [US3] Add retry UI in `floating-ball.wxml`
- [ ] T029 [US3] Manual check: API connectivity (requires WeChat DevTools + valid API Key)

**Checkpoint**: User Story 3 independently verifiable (SC-004, SC-005). End-to-end API connectivity works; mock fallback and error handling functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and hygiene.

- [x] T030 [P] Theme consistency: panel header uses #FFF6D8 yellow theme, ball is transparent bg
- [x] T031 [P] Final consistency: component mounted on all 5 pages, not on splash/splash2
- [ ] T032 Run full quickstart.md validation checklist (requires WeChat DevTools)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can proceed sequentially in priority order (P1 → P2 → P3).
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories. Delivers: visible, draggable, snap-animated ball on 5 pages.
- **User Story 2 (P2)**: Can start after Foundational — Builds on US1's component but independently testable. Delivers: chat panel with mock replies.
- **User Story 3 (P3)**: Can start after Foundational — Replaces mock with real API in `utils/ai-api.js`. Delivers: end-to-end AI connectivity.

### Within Each User Story

- Models/component structure before behavior logic.
- Behavior logic before integration with pages.
- Core implementation before manual checks.
- Story complete before moving to next priority.

### Parallel Opportunities

- **Phase 2**: T003 (API wrapper), T004 (WXML/WXSS skeleton), T005 (JS stub), T006 (icon check) can run in parallel — different files, no dependencies.
- **US1**: T011–T015 (mount on 5 pages) can run in parallel — each page file is independent.
- **US2**: T018 (WXML), T019 (WXSS) can run in parallel; T020–T023 depend on panel structure being in place.
- **US3**: T025 (config), T026 (API request), T027 (error handling) can run in parallel within `utils/ai-api.js` if split carefully; T028 (retry UI) depends on error state being available.
- **Polish**: T030 (theme check), T031 (consistency sweep) can run in parallel.

### Parallel Example: US1 Page Mounts

```bash
# Launch all page mount tasks together (different files, no dependencies):
Task: "Mount on pages/home/home — update home.json + home.wxml"
Task: "Mount on pages/search/search — update search.json + search.wxml"
Task: "Mount on pages/my-page/my-page — update my-page.json + my-page.wxml"
Task: "Mount on pages/ocd/ocd — update ocd.json + ocd.wxml"
Task: "Mount on pages/literature/literature — update literature.json + literature.wxml"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T006)
3. Complete Phase 3: User Story 1 (T007–T017)
4. **STOP and VALIDATE**: Ball renders on all 5 pages, drags, snaps, persists position.
5. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Ball is visible and draggable → Test independently → Demo.
3. Add User Story 2 → Chat panel with mock replies → Test independently → Demo.
4. Add User Story 3 → Real API connectivity → Test independently → Demo.
5. Polish → Theme consistency, full regression.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (ball + page mounts)
   - Developer B: User Story 2 (chat panel UI + mock)
   - Developer C: User Story 3 (API integration)
3. Stories complete and integrate independently.
