# Contracts — Floating AI Agent Ball

No new backend or third-party API contracts are committed for this visual + client-side feature. The AI service integration uses a placeholder configuration pattern:

## AI Service Request (Client-Side Contract)

**Method**: `POST` via `wx.request`

**Request Headers**:
```
Content-Type: application/json
Authorization: Bearer {API_KEY}
```

**Request Body**:
```json
{
  "model": "{MODEL_NAME}",
  "messages": [
    { "role": "user", "content": "{USER_MESSAGE}" }
  ],
  "temperature": 0.7
}
```

**Response Body (expected)**:
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "{AI_REPLY_TEXT}"
      }
    }
  ]
}
```

**Fallback (when API_KEY is empty)**:
- Simulated response returned after 1s delay: "API Key未配置，请在配置中填入真实密钥后重试。"

**Error Handling**:
- Timeout (>8s): Display "请求超时，请检查网络后重试。"
- HTTP error: Display "服务暂时不可用，请稍后重试。"

## Notes

- The exact API format (endpoint, model name, response schema) will be confirmed when the AI provider is selected (D-001).
- This contract follows a generic OpenAI-compatible chat completion pattern for maximum flexibility.
- No server-side endpoints are introduced; all logic runs client-side in the Mini Program.
