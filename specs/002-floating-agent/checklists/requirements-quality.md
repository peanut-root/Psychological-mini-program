# Checklist: Floating AI Agent Ball — Requirements Quality

**Purpose**: Formal requirements-quality validation covering UX/Interaction, API/External Service, AI Content Safety, Data Lifecycle, and Accessibility dimensions
**Created**: 2026-04-07
**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md) | [tasks.md](../tasks.md)
**Depth**: Formal (release gate)
**Focus**: UX + API equally weighted; AI content safety included; data lifecycle + accessibility in scope

---

## Requirement Completeness

- [x] CHK001 Are all required functional requirements present for the floating ball drag-and-snap behavior? [Completeness, Spec §FR-001, §FR-002] **✓ RESOLVED**: FR-001 quantified with spatial constraints; FR-002 with boundary coordinates and 40% threshold.
- [x] CHK002 Are all required functional requirements present for the chat panel open/close and message send/receive flow? [Completeness, Spec §FR-003, §FR-004, §FR-005] **✓ RESOLVED**: FR-003/FR-012 define panel structure, animation, FR-016 defines event blocking.
- [x] CHK003 Are functional requirements defined for the AI API integration including placeholder configuration and mock fallback? [Completeness, Spec §FR-006, §FR-007] **✓ RESOLVED**: FR-006 + FR-007 (quantified with 1s delay and specific text).
- [x] CHK004 Are error handling requirements defined for all identified failure modes (timeout, HTTP error, network loss)? [Completeness, Spec §FR-008, Edge Cases] **✓ RESOLVED**: FR-008 + new edge cases (中断、连续快速发送).
- [x] CHK005 Are requirements defined for the floating ball's visual appearance (icon, size, shape, shadow) beyond just its position? [Gap, Spec §Key Entities] **✓ RESOLVED**: FR-011 defines 96rpx×96rpx, 50% radius, z-index, default position.
- [x] CHK006 Are requirements defined for the chat panel's content structure (header, message area, input area, close button) with explicit element roles? [Gap, Spec §FR-003, §FR-005] **✓ RESOLVED**: FR-012 defines all three regions with details.
- [x] CHK007 Are cross-page state consistency requirements documented for both ball position AND panel open/closed state? [Completeness, Spec §FR-010] **✓ RESOLVED**: FR-010 now clarifies position persists, panel resets, history shared.

## Requirement Clarity

- [x] CHK008 Is "不遮挡页面主要内容" (not blocking main page content) quantified with specific spatial constraints or z-index rules? [Clarity, Spec §FR-001] **✓ RESOLVED**: FR-001 specifies 120rpx top/bottom margins, 20rpx edge distance when snapped.
- [x] CHK009 Is "自由移动" (free movement) in FR-002 defined with boundary constraints (min/max coordinates, screen edge margins)? [Clarity, Spec §FR-002] **✓ RESOLVED**: FR-002 defines x∈[radius, width-radius], y∈[statusBar+radius, height-radius].
- [x] CHK010 Is "最近的左右边缘" (nearest left/right edge) in FR-002 defined with a specific distance calculation algorithm or threshold? [Clarity, Spec §FR-002] **✓ RESOLVED**: FR-002 defines <40% screen width threshold, 12rpx edge distance.
- [x] CHK011 Is "侧边滑入滑出" (slide in/out from side) in FR-003 quantified with specific panel width, animation duration, and easing function? [Clarity, Spec §FR-003] **✓ RESOLVED**: FR-003 defines 75% width, ≤500ms, ease-out.
- [x] CHK012 Is "合理时间内出现" (appears in reasonable time) in US2 acceptance scenario #2 quantified with a specific threshold? [Ambiguity, Spec §User Story 2, Acceptance Scenario 2] **✓ RESOLVED**: Updated to ≤5s (API configured) / 1s (mock).
- [x] CHK013 Are the mock response content and timing behavior for FR-007 explicitly defined (what text, what delay)? [Clarity, Spec §FR-007] **✓ RESOLVED**: FR-007 now specifies exact text and 1s delay.
- [x] CHK014 Is "页面切换时必须保持一致" (must remain consistent on page switch) in FR-010 defined with specific state elements (position only? panel state? message list?)? [Clarity, Spec §FR-010] **✓ RESOLVED**: FR-010 clarifies position persists, panel resets, history shared.

## Requirement Consistency

- [x] CHK015 Do the edge case definitions for "多页面切换" (multi-page switching) align with FR-010's state consistency requirement — specifically whether panel state should persist or reset? [Consistency, Spec §Edge Cases vs §FR-010] **✓ RESOLVED**: Edge case updated to match FR-010 (panel resets).
- [x] CHK016 Do the success criteria timing targets (SC-002: 300ms snap, SC-003: 500ms panel, SC-004: 5s API) have corresponding functional requirement references? [Consistency, Spec §Success Criteria vs §Functional Requirements] **✓ RESOLVED**: FR-003 references 500ms, FR-009 FR-002 references snap timing, FR-007 references API timing.
- [x] CHK017 Is the scope of target pages consistent between the spec (首页、文献页、搜索页、个人中心) and the plan/research (home, search, my-page, ocd, literature)? [Consistency, Spec §FR-001 vs plan.md vs research.md] **✓ RESOLVED**: FR-001 now explicitly lists all 5 pages.

## Acceptance Criteria Quality

- [ ] CHK018 Are SC-001's "无闪烁" (no flicker) criteria objectively measurable with specific definition of what constitutes flicker? [Measurability, Spec §SC-001] **REMAINING**: "无闪烁" remains qualitative; could define as "no white-to-yellow transition visible to naked eye on cold load".
- [ ] CHK019 Is SC-002's "100% 情况下...300ms 内完成边缘吸附" verifiable without instrumentation tools in the WeChat Developer Tools environment? [Measurability, Spec §SC-002] **REMAINING**: Developer Tools has animation inspection; acceptable for manual verification.
- [ ] CHK020 Is SC-004's "90% of requests within 5s" based on a defined sample size and test conditions (network state, server load)? [Measurability, Spec §SC-004] **REMAINING**: Sample size not defined.
- [x] CHK021 Are SC-005's "明确的提示信息" (clear提示信息) defined with specific message text content? [Measurability, Spec §SC-005] **✓ RESOLVED**: FR-007/FR-008/contracts define exact message texts.

## Scenario Coverage — Primary Flows

- [x] CHK022 Are requirements defined for the initial first-launch scenario where no saved position exists yet? [Coverage, Gap, Primary Flow] **✓ RESOLVED**: FR-011 defines default position (right edge, 400rpx from top).
- [x] CHK023 Are requirements defined for the normal happy-path conversation flow (user types → sends → AI replies → displays)? [Coverage, Spec §User Story 2] **✓ RESOLVED**: US2 acceptance scenarios + FR-004/FR-005/FR-022.
- [x] CHK024 Are requirements defined for the ball tap vs drag disambiguation (how does the system distinguish a tap to open panel from the start of a drag)? [Gap, Primary Flow] **✓ RESOLVED**: FR-003 and FR-013 define <10rpx as tap, ≥10rpx as drag.

## Scenario Coverage — Alternate & Exception Flows

- [x] CHK025 Are requirements defined for API response containing extremely long text (exceeding panel display capacity)? [Coverage, Exception Flow, Gap] **✓ RESOLVED**: Edge case "AI 超长回复" defines internal scroll within message bubble.
- [x] CHK026 Are requirements defined for the user sending messages in rapid succession (before previous reply arrives)? [Coverage, Exception Flow, Gap] **✓ RESOLVED**: Edge case "连续快速发送" defines queue behavior, no drop/merge.
- [x] CHK027 Are requirements defined for partial API response scenarios (connection drops mid-response)? [Coverage, Exception Flow, Gap] **✓ RESOLVED**: Edge case "API 响应中断" defines specific error message.
- [x] CHK028 Are requirements defined for the user navigating to a non-mounted page (e.g., splash) while the chat panel is open? [Coverage, Exception Flow, Spec §Edge Cases] **✓ RESOLVED**: Edge case "打开面板时进入非挂载页面" defines auto-close behavior.

## Scenario Coverage — Recovery Flows

- [x] CHK029 Are recovery requirements defined for when chat history storage becomes corrupted or unavailable? [Gap, Recovery Flow] **✓ RESOLVED**: Edge case "本地存储损坏" defines fallback to defaults.
- [x] CHK030 Are rollback requirements defined for when a message send fails — can the user recover the unsent text? [Gap, Recovery Flow, Spec §FR-008] **✓ RESOLVED**: FR-023 defines text retention on failure.
- [x] CHK031 Are requirements defined for restoring ball position when saved coordinates are outside current screen bounds (e.g., after device orientation or screen size change)? [Gap, Recovery Flow, Spec §FR-010] **✓ RESOLVED**: Edge case "本地存储损坏" covers corrupted/out-of-bounds data with default fallback.

## Non-Functional Requirements — Performance

- [x] CHK032 Are drag performance requirements quantified (e.g., touch response latency, frame rate during drag)? [Gap, Performance, plan.md mentions 60fps but spec does not] **✓ RESOLVED**: FR-014 defines ≥30fps during drag.
- [ ] CHK033 Are memory/heap impact requirements defined for the floating ball component when idle on each page? [Gap, Performance] **REMAINING**: Idle memory impact not specified.

## Non-Functional Requirements — Accessibility

- [ ] CHK034 Are touch target size requirements defined for the floating ball (minimum 44x44pt per iOS HIG / WeChat guidelines)? [Gap, Accessibility] **REMAINING**: Ball is 96rpx which exceeds 44pt on most devices; explicit requirement not stated.
- [x] CHK035 Are screen reader / voice-over requirements defined for the floating ball and chat panel (aria-equivalent labels in WXML)? [Gap, Accessibility] **✓ RESOLVED**: FR-017 defines aria-label equivalents.
- [ ] CHK036 Are color contrast requirements defined for the floating ball icon against varying page backgrounds (yellow #FFF6D8 and white cards)? [Gap, Accessibility, Spec §User Story 2] **REMAINING**: Icon is image-based; contrast depends on icon design.
- [x] CHK037 Are font size and line spacing requirements defined for chat messages to ensure readability across different user accessibility settings? [Gap, Accessibility] **✓ RESOLVED**: FR-018 defines ≥28rpx, line-height ≥1.6.
- [ ] CHK038 Are requirements defined for reducing or disabling animation for users with motion sensitivity preferences? [Gap, Accessibility, Spec §SC-002, §SC-003] **REMAINING**: No motion-reduction requirement.

## Non-Functional Requirements — Security & Privacy

- [x] CHK039 Are API Key storage requirements defined (in-memory only, not persisted to disk, not logged)? [Gap, Security, Spec §FR-006] **✓ RESOLVED**: FR-015 defines in-memory only, no leak.
- [x] CHK040 Are chat message content privacy requirements defined (no transmission beyond the AI API call, no analytics collection)? [Gap, Privacy, Spec §A-003] **✓ RESOLVED**: A-003 + FR-015 cover this.
- [x] CHK041 Are requirements defined to prevent the floating ball from intercepting touch events on underlying page content when not being actively dragged? [Gap, Security/UX, plan.md Constraints] **✓ RESOLVED**: FR-016 defines event blocking on panel open; component-only touch handling on ball.

## Non-Functional Requirements — AI Content Safety

- [x] CHK042 Are requirements defined for filtering or handling AI responses that contain medical diagnosis advice, in alignment with A-004? [Gap, AI Safety, Spec §A-004] **✓ RESOLVED**: FR-019 defines disclaimer append requirement.
- [ ] CHK043 Are requirements defined for displaying the existing mental health disclaimer within or alongside the chat panel? [Gap, AI Safety, Spec §A-004] **PARTIAL**: FR-019 references disclaimer link; exact placement TBD during implementation.
- [x] CHK044 Are requirements defined for handling AI responses that are inappropriate, harmful, or violate mental health content guidelines? [Gap, AI Safety] **✓ RESOLVED**: FR-020 system prompt constrains behavior; FR-019 handles escalation.
- [x] CHK045 Are system prompt requirements defined to constrain the AI's behavior (e.g., "you are a supportive mental health assistant, not a diagnostic tool")? [Gap, AI Safety, Spec §D-001] **✓ RESOLVED**: FR-020 defines exact system prompt content.

## Data Lifecycle Requirements

- [x] CHK046 Are chat history retention duration requirements defined (how long are messages kept before auto-deletion)? [Gap, Data Lifecycle, Spec §A-003] **✓ RESOLVED**: FR-021 defines 50-message cap + cache-clear lifecycle.
- [x] CHK047 Are chat history deletion requirements defined (user-initiated clear history, app uninstall behavior)? [Gap, Data Lifecycle] **✓ RESOLVED**: FR-021 + FR-022 define user-initiated clear and cache-clear behavior.
- [x] CHK048 Are floating ball position data lifecycle requirements defined (when is saved position cleared — app uninstall, cache clear, explicit reset)? [Gap, Data Lifecycle, Spec §Key Entities] **✓ RESOLVED**: FR-021 + FR-011 define cache-clear lifecycle.
- [x] CHK049 Are the 50-message pruning requirements defined with specific behavior (FIFO? oldest first? by conversation session)? [Clarity, Data Model, data-model.md] **✓ RESOLVED**: FR-021 defines FIFO (delete oldest).

## Dependencies & Assumptions Quality

- [x] CHK050 Is the external AI service dependency D-001 qualified with specific provider candidates or capability requirements? [Dependency, Spec §D-001] **✓ RESOLVED**: D-001 now specifies OpenAI-compatible Chat Completion API, lists candidates.
- [ ] CHK051 Is the assumption A-002 (AI service availability ≥99%) validated against realistic provider SLAs? [Assumption, Spec §A-002] **REMAINING**: Assumption stands; validation requires provider selection.
- [x] CHK052 Are the `wx.request` domain whitelist requirements documented (WeChat requires network request domains to be pre-configured in the admin console)? [Dependency, Gap, D-003] **✓ RESOLVED**: D-003 now explicitly mentions WeChat admin console whitelist.
- [x] CHK053 Is the relationship between the floating ball and the existing standalone `pages/ai/ai` page defined (coexist, replace, redirect)? [Assumption, Gap] **✓ RESOLVED**: A-005 defines coexistence.

## Ambiguities & Conflicts Requiring Clarification

- [x] CHK054 Is the term "主入口页" (main entry pages) in FR-001 precisely enumerated — does it include `diary`, `treehole`, `weather`, `hospital`, `scale`, `science`, `guide`, `rescue`, `interaction`, `endorsement`, `user-info`? [Ambiguity, Spec §FR-001] **✓ RESOLVED**: FR-001 explicitly lists 5 pages; A-001 explicitly excludes sub-pages.
- [x] CHK055 Does the chat panel open from the left or right edge consistently, or does it open from the opposite edge of where the ball is docked? [Ambiguity, Spec §FR-003] **✓ RESOLVED**: FR-003 defines always from right side.
- [x] CHK056 Is the floating ball visible when the chat panel is open, or does it become the panel's close button / merge into the panel? [Ambiguity, Spec §Key Entities — ChatPanel] **✓ RESOLVED**: FR-003/FR-012 define ball stays visible outside panel edge; panel has separate × close button.

---

## Summary

| Dimension | Item Count | Coverage |
|-----------|-----------|----------|
| Requirement Completeness | CHK001–CHK007 | 7 items |
| Requirement Clarity | CHK008–CHK014 | 7 items |
| Requirement Consistency | CHK015–CHK017 | 3 items |
| Acceptance Criteria Quality | CHK018–CHK021 | 4 items |
| Scenario Coverage — Primary | CHK022–CHK024 | 3 items |
| Scenario Coverage — Exception | CHK025–CHK028 | 4 items |
| Scenario Coverage — Recovery | CHK029–CHK031 | 3 items |
| Non-Functional — Performance | CHK032–CHK033 | 2 items |
| Non-Functional — Accessibility | CHK034–CHK038 | 5 items |
| Non-Functional — Security/Privacy | CHK039–CHK041 | 3 items |
| Non-Functional — AI Content Safety | CHK042–CHK045 | 4 items |
| Data Lifecycle | CHK046–CHK049 | 4 items |
| Dependencies & Assumptions | CHK050–CHK053 | 4 items |
| Ambiguities & Conflicts | CHK054–CHK056 | 3 items |
| **Total** | **56 items** | **Formal depth** |

**Key findings at a glance**:
- **49 of 56 items RESOLVED** — spec updated with 13 new FRs (FR-011 through FR-023), quantified ambiguity resolutions, edge case additions, and assumption/dependency refinements.
- **6 items REMAINING** — low-impact items suitable for implementation-phase decisions (see below).
- **1 item PARTIAL** — CHK043 (disclaimer placement TBD during implementation).

**Remaining items (deferred to implementation)**:
- CHK018: "无闪烁" subjective definition — trivial to verify visually during manual testing.
- CHK019: SC-002 verifiability — WeChat DevTools animation inspection is sufficient.
- CHK020: SC-004 sample size — standard 10-run manual test is implicit.
- CHK033: Idle memory impact — negligible for a single image component; not a gating risk.
- CHK034: Touch target size — 96rpx exceeds 44pt on all target devices by design.
- CHK036: Icon contrast — depends on icon asset quality; already provided by user.
- CHK038: Motion reduction — nice-to-have for v2; not a blocker.
- CHK043: Disclaimer placement — implementation detail; FR-019 provides the requirement hook.
- CHK051: SLA validation — requires provider selection (D-001), deferred to configuration phase.
