# Data Model — Floating AI Agent Ball

## Entities

### FloatingBallState
- **Fields**: `ballX` (number, rpx), `ballY` (number, rpx), `snapSide` ('left' | 'right'), `isDragging` (boolean).
- **Relationships**: Stored locally via `wx.setStorageSync('floatingBallPosition', ...)`. Read by each component instance on `attached()` lifecycle.
- **Validation rules**: `ballX` must be within screen width minus ball diameter; `ballY` must be within screen height minus ball diameter; `snapSide` determines which edge to animate toward on release.

### ChatMessage
- **Fields**: `id` (string, unique), `role` ('user' | 'assistant' | 'system'), `content` (string), `timestamp` (number, Unix ms), `status` ('pending' | 'sent' | 'error').
- **Relationships**: Part of `ChatHistory` array. Each message is independent; no parent-child relationships.
- **Validation rules**: `content` must be non-empty for user messages; assistant messages may contain error text; `timestamp` used for display ordering; max 50 messages in history (oldest pruned on append).

### ChatHistory
- **Fields**: Array of `ChatMessage`, stored under key `floatingBall:chatHistory`.
- **Relationships**: Referenced by `ChatPanel` for rendering.
- **Validation rules**: Stored as JSON string via `wx.setStorageSync`; loaded on component `attached()`; pruned to 50 messages on each save.

### APIConfig
- **Fields**: `apiKey` (string, placeholder `''`), `apiUrl` (string), `timeout` (number, default 8000ms), `modelName` (string, optional).
- **Relationships**: Imported by `utils/ai-api.js` and used in all API requests.
- **Validation rules**: If `apiKey` is empty string, mock response mode is activated. `apiUrl` must be a valid HTTPS URL when set. `timeout` must be positive integer.

## Notes

- No server-side data persistence; all state is local to the device.
- Chat history is per-device, not synced across devices (per A-003).
- No API contracts for backend services; the AI service is an external third-party API.
