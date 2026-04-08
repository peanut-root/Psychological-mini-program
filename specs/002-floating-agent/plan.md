# Implementation Plan: Floating AI Agent Ball

**Branch**: `002-floating-agent` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-floating-agent/spec.md`

## Summary

Add a draggable floating ball component to all main pages of the "心屿" WeChat Mini Program. The ball uses a custom icon (`images/floating-ball-icon.png`), supports touch-drag with edge-snap animation, and opens/closes an AI chat panel on tap. The chat panel connects to an external AI service via `wx.request`, with the API Key stored as a configurable placeholder. Existing `pages/ai/ai` serves as the standalone AI page reference but the floating ball provides an always-accessible overlay experience.

## Technical Context

**Language/Version**: WeChat Mini Program (JavaScript, WXML/WXSS)  
**Primary Dependencies**: Native WeChat Mini Program runtime (`wx.request`, `wx.setStorageSync`, touch events via `bindtouchstart/bindtouchmove/bindtouchend`)  
**Storage**: `wx.setStorageSync` for floating ball position persistence and chat history cache  
**Testing**: Manual visual verification across target pages; no CLI test framework available  
**Target Platform**: WeChat Mini Program on iOS/Android (standard webview container)  
**Project Type**: Single WeChat Mini Program with `pages/` directory structure  
**Performance Goals**: 60fps during drag; background color renders on first paint; zero additional JS for rendering; chat API response within 5s (SC-004)  
**Constraints**: Centralized component architecture; use existing `styles/theme.wxss` yellow theme (#FFF6D8); avoid inline style conflicts; floating ball must not block touch events on underlying content when not being dragged  
**Scale/Scope**: Mount on ~5-7 main pages (home, literature, search, my-page, ocd, etc.); exclude splash/splash2; no backend changes required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution file (`.specify/memory/constitution.md`) is a blank template with no defined principles or gates. No constitution violations to check against.

- **Safety-first mental health UX**: PASS — floating ball is a visual overlay; existing mental health disclaimers and content remain unchanged.
- **Privacy & data minimization**: PASS — chat messages stored locally only; no PII collected beyond what user types.
- **Mini-program performance & native fit**: PASS — component-based approach using existing patterns; no new external dependencies.

Post-Phase 1 re-check: PASS (design retains visual-only scope plus local chat storage; no backend changes).

## Project Structure

### Documentation (this feature)

```text
specs/002-floating-agent/
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
images/
└── floating-ball-icon.png          # Floating ball icon
components/
└── floating-ball/
    ├── floating-ball.wxml          # Floating ball + chat panel template
    ├── floating-ball.wxss          # Styles for ball, panel, animations
    ├── floating-ball.js            # Drag logic, edge snap, panel toggle, API calls
    └── floating-ball.json          # Component config
pages/
├── home/home.wxml                  # Import floating-ball component
├── search/search.wxml              # Import floating-ball component
├── my-page/my-page.wxml            # Import floating-ball component
├── literature/literature.wxml      # Import floating-ball component
├── ocd/ocd.wxml                    # Import floating-ball component
└── ... (other main pages)
utils/
└── ai-api.js                       # AI API wrapper (wx.request, mock fallback)
styles/
└── theme.wxss                      # Existing theme (yellow background)
```

**Structure Decision**: Use a **reusable custom component** (`components/floating-ball/`) rather than duplicating code across pages. Each target page imports the component in its `.json` config and places the tag in its `.wxml`. The AI API wrapper lives in `utils/ai-api.js` for separation of concerns. This follows WeChat Mini Program best practices for shared UI elements.

## Complexity Tracking

No constitution violations to justify for this feature.
