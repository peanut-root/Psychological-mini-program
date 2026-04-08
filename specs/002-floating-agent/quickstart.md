# Quickstart — Floating AI Agent Ball

## Implementation steps

1) **Create the floating-ball component** at `components/floating-ball/`:
   - `floating-ball.json`: Set `"component": true`
   - `floating-ball.wxml`: Ball element (`image` with icon) + chat panel overlay (scroll-view for messages, input + send button)
   - `floating-ball.wxss`: Ball styles (fixed position, z-index above page content, border-radius for round shape), panel styles (slide-in animation, keyboard-adjusted height)
   - `floating-ball.js`: Touch handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`), edge-snap logic, panel toggle, message send/receive, local storage persistence

2) **Create the AI API wrapper** at `utils/ai-api.js`:
   - Export `sendChatMessage(messages, config)` function
   - Use `wx.request` with configurable `API_KEY` and `API_URL` placeholders
   - Return mock response when `API_KEY` is empty
   - Handle timeout and HTTP errors gracefully

3) **Mount the component on target pages**:
   - Add component import to each page's `.json`: `"usingComponents": { "floating-ball": "../../components/floating-ball/floating-ball" }`
   - Add `<floating-ball />` tag to each page's `.wxml` (as the last element, so it renders on top)
   - Target pages: `home`, `search`, `my-page`, `ocd`, `literature`

4) **Configure the AI API**:
   - Set `API_KEY = ''` and `API_URL = ''` in `utils/ai-api.js` as placeholders
   - Document the configuration process for future setup

5) **Test the implementation**:
   - Verify ball renders on all target pages with correct icon
   - Test drag + edge-snap on both edges
   - Test panel open/close animation
   - Test message send with empty API Key (mock response)
   - Test keyboard overlay behavior

## Testing checklist (manual)

- [ ] Floating ball appears on home, search, my-page, ocd, literature pages
- [ ] Ball does NOT appear on splash/splash2 pages
- [ ] Ball icon (`images/floating-ball-icon.png`) renders correctly
- [ ] Drag ball freely on screen; release → snaps to nearest edge within 300ms
- [ ] Tap ball when docked → chat panel slides in from right within 500ms
- [ ] Tap close button → panel slides out, ball returns to edge
- [ ] Type message and send → message appears in list, mock reply appears (when API Key empty)
- [ ] Virtual keyboard opens → input area stays visible above keyboard
- [ ] Navigate between pages → ball position persists, panel state resets per page
- [ ] Reload小程序 → ball restores to last saved position
