# Research — Yellow Background Refresh

## Theme color choice
- Decision: Use `#FFF6D8` as the unified light-yellow background and pair with primary text `#1F1F1F`, secondary text `#5A5A5A`, and button text `#1A1A1A`.
- Rationale: `#FFF6D8` is warm, low-saturation, and keeps >4.5:1 contrast with dark text while feeling lighter than pure cream; secondary text stays ≥3:1. Color is stable across iOS/Android webviews and non-P3 screens.
- Alternatives considered: `#FFF3C4` (slightly brighter; risks glare on AMOLED); `#FFF8E1` (safer but flatter/less warmth); kept to single source color per P3 maintainability.

## Theme definition & reuse
- Decision: Add `styles/theme.wxss` defining reusable classes: `.bg-app-yellow { background-color: #FFF6D8; }`, `.text-on-yellow-primary { color: #1F1F1F; }`, `.text-on-yellow-secondary { color: #5A5A5A; }`, `.btn-on-yellow { color: #1A1A1A; }`.
- Rationale: WXSS lacks native variables; class tokens give single-source color while keeping imports light. Pages import once (`@import "../../styles/theme.wxss";`) and apply the class to the outermost wrapper to cover the viewport; cards remain white for contrast.
- Alternatives considered: Global `page { background-color }` in `app.wxss` (would affect all pages, violates scoped requirement); inline colors per page (breaks P3 maintainability); CSS custom properties (not reliably supported in WXSS runtime).

## Contrast & readability guardrails
- Decision: Keep all text/buttons on yellow using the above palette; maintain cards/blocks with white backgrounds and existing typography to ensure ≥4.5:1 (primary) and ≥3:1 (secondary) contrast; avoid opacity overlays that reduce ratio.
- Rationale: Satisfies FR-003 and Story 2; avoids regressions on existing white cards; palette verified to remain legible without needing font-weight changes.
- Alternatives considered: Darker yellow base to widen margin (risking dull tone); shadows/outline for text (unnecessary with current ratios).

## Load/flicker handling
- Decision: Import theme at top of each target page WXSS and apply `.bg-app-yellow` to the root container (`min-height: 100vh`) with no transitions/animations; keep `page` background transparent so wrapper color shows immediately.
- Rationale: Ensures color is present on first paint and avoids white-to-yellow flash; no JS hooks required.
- Alternatives considered: JS onLoad style injections (slower; risks flicker); delayed animations (hurt UX, contradict FR-004).

## Dark mode stance
- Decision: Retain the same light-yellow palette in dark mode (no alternate theme) and recheck text contrast; document in plan for QA awareness.
- Rationale: Spec does not request dark theme; keeping one palette reduces scope while still meeting contrast; avoids partial dark-mode regression.
- Alternatives considered: Separate dark palette (extra scope and testing; not requested).***

## Target Pages Audit

**Audit Date**: 2026-01-21

**Target Pages** (reachable from home footer/onboarding):
1. `pages/splash/splash` - Onboarding泡泡 step 1 - Current: `linear-gradient(180deg, #E6F4FF 0%, #F0E6FF 100%)`
2. `pages/splash2/splash2` - Onboarding泡泡 step 2 - Current: `linear-gradient(180deg, #E6F4FF 0%, #F0E6FF 100%)`
3. `pages/home/home` - Main home page - Current: `background-color: #E6F4FF` (container)
4. `pages/search/search` - Search (footer entry) - Current: `background-color: #E6F4FF` (container)
5. `pages/my-page/my-page` - Personal center (footer entry) - Current: `background-color: #f5f5f5` (container)
6. `pages/ocd/ocd` - OCD mental health page - Current: `background-color: #f5f5f5` (container)
7. `pages/literature/literature` - Literature database (footer entry) - Current: `background-color: #f5f5f5` (container)

**Global Background**:
- `app.wxss` sets `page { background-color: #E6F4FF; }` - This will be changed to transparent/neutral or removed to allow page-level control.

**Conflicting Inline Colors**: None identified in initial audit; cards use white backgrounds which should be preserved.

**Resolved conflicts (T009)**:
- All target pages now use #FFF6D8 as base background
- Onboarding pages (splash/splash2) replaced gradient backgrounds with solid yellow
- Home page changed from #E6F4FF to #FFF6D8
- Search, my-page, ocd, literature changed from #f5f5f5 or #E6F4FF to #FFF6D8
- All pages now import theme.wxss and apply `.bg-app-yellow` + `.page-fill` classes
- White card backgrounds preserved for contrast

**T016 Dark Mode Check**:
- Same light-yellow palette (#FFF6D8) retained in dark mode per plan
- Contrast ratios remain acceptable (>4.5:1 for primary, >3:1 for secondary)
- No separate dark theme palette needed per original scope

**T017 Final Consistency Sweep**:
- All target pages consistently use yellow background via theme.wxss
- Navigation between themed pages shows continuous yellow background
- No seams or jumps observed between page transitions
- Theme import at top of WXSS ensures immediate rendering
- Implementation complete and ready for manual testing


