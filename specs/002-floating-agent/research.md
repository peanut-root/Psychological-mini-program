# Research — Floating AI Agent Ball

## Component Architecture

- **Decision**: Use a WeChat Mini Program custom component (`components/floating-ball/`) rather than per-page duplication.
- **Rationale**: The floating ball needs to appear on 5-7 main pages. A custom component encapsulates drag logic, edge-snap animation, panel toggle, and API communication in one place. Each page only needs to import it in `.json` and place the tag in `.wxml`. This follows WeChat's official component documentation and the existing project pattern (if any components exist).
- **Alternatives considered**: Per-page code duplication (breaks maintainability, FR-010 state consistency); global overlay via `app.wxss` (would affect all pages including splash/splash2, violating A-001); page template inheritance (not supported by WeChat Mini Program).

## Floating Ball Drag & Edge Snap

- **Decision**: Use `bindtouchstart`/`bindtouchmove`/`bindtouchend` for touch handling, `wx.createSelectorQuery()` to get screen dimensions, and CSS `transition` for edge-snap animation (300ms ease-out). Position stored in `data` as `ballX`/`ballY` and persisted via `wx.setStorageSync('floatingBallPosition', {x, y, side})`.
- **Rationale**: Touch events are the native WeChat Mini Program way to handle drag. `setSelectorQuery` gives accurate viewport dimensions. CSS transition is hardware-accelerated and avoids JS animation loops. Local storage persistence satisfies FR-010 and SC-002.
- **Alternatives considered**: `setInterval` animation loop (used in splash pages but wasteful for a static ball; 60fps polling unnecessary when ball is idle); `movable-area`/`movable-view` (WeChat built-in component — limited customization for edge-snap behavior and custom icon sizing).

## Chat Panel UX

- **Decision**: Panel slides in from the right side of the screen as a half-width overlay (~70% screen width). Contains: message list (scroll-view), text input + send button at bottom, close button in header. Uses `wx:for` to render `ChatMessage` array. Keyboard height obtained via `wx.onKeyboardHeightChange` to avoid SC-006 violation.
- **Rationale**: Right-side slide-in is consistent with common mobile chat patterns. `scroll-view` is the WeChat-native scrolling container. `wx.onKeyboardHeightChange` is specifically designed for the keyboard overlay problem (FR-009, SC-006).
- **Alternatives considered**: Full-screen panel (too intrusive, blocks entire page context); bottom-sheet panel (conflicts with keyboard on mobile); new page navigation (loses page context, violates FR-010).

## AI API Integration

- **Decision**: Use `wx.request` for API calls. API configuration stored in `utils/ai-api.js` with a placeholder `API_KEY = ''` and `API_URL = ''`. When API Key is empty, return a simulated response after 1s delay. Request format follows a generic chat completion pattern (messages array with role/content). Timeout set to 8000ms.
- **Rationale**: `wx.request` is the standard WeChat Mini Program HTTP client. Placeholder config allows easy swap-in of real credentials. Mock fallback satisfies FR-007. 8s timeout provides buffer beyond the 5s SC-004 target to account for network variance.
- **Alternatives considered**: WebSocket for streaming responses (adds complexity; not needed for text-only chat); Serverless Function proxy (would require backend infrastructure; out of scope); third-party SDKs (adds bundle size and dependency risk).

## State Management & Cross-Page Consistency

- **Decision**: Floating ball position stored in `wx.setStorageSync`. Chat history stored under key `floatingBall:chatHistory` with a max of 50 messages (oldest pruned). Panel open/closed state is per-page (each component instance manages its own state), but position is shared. No global state manager needed.
- **Rationale**: Simple key-value storage is sufficient for this scope. 50-message cap prevents memory bloat (edge case:超长对话). Per-page panel state is natural since each page has its own component instance; users won't expect an open panel to persist when navigating between pages.
- **Alternatives considered**: Global `getApp().globalData` (would lose state on app restart); `wx.cloud` database (overkill for local-only chat history).

## Target Pages Audit

**Pages to mount floating ball** (main pages reachable from home footer):
1. `pages/home/home` — Main home page
2. `pages/search/search` — Search page
3. `pages/my-page/my-page` — Personal center
4. `pages/ocd/ocd` — OCD page
5. `pages/literature/literature` — Literature list

**Pages to EXCLUDE** (per A-001):
- `pages/splash/splash` — Onboarding step 1
- `pages/splash2/splash2` — Onboarding step 2
- All other sub-pages (detail pages, forms, etc.)

**Existing `pages/ai/ai`**: Standalone AI page already exists with a basic placeholder UI. The floating ball provides a superior always-accessible experience. The standalone page can remain as a legacy entry point or be enhanced separately.
