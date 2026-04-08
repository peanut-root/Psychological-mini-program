// utils/ai-api.js
// AI API wrapper — placeholder config with mock fallback

// --- Configuration placeholders (FR-006, D-001) ---
const API_KEY = ''
const API_URL = ''
const MODEL_NAME = ''
const TIMEOUT = 8000

/**
 * Send chat messages to the AI service.
 * When API_KEY is empty, returns a mock response after 1s.
 *
 * @param {Array} messages - Array of {role, content} objects
 * @returns {Promise<string>} AI reply text
 */
function sendChatMessage(messages) {
  return new Promise((resolve, reject) => {
    if (!API_KEY || API_KEY === '') {
      // Mock fallback (FR-007)
      setTimeout(() => {
        resolve('AI 服务配置中，请稍后填写 API Key')
      }, 1000)
      return
    }

    // Real API request — implemented in T026
    wx.request({
      url: API_URL,
      method: 'POST',
      data: {
        model: MODEL_NAME,
        messages: messages,
        temperature: 0.7
      },
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      timeout: TIMEOUT,
      success(res) {
        if (res.statusCode === 200 && res.data && res.data.choices && res.data.choices.length > 0) {
          resolve(res.data.choices[0].message.content)
        } else {
          reject(new Error('服务暂时不可用，请稍后重试。'))
        }
      },
      fail(err) {
        if (err.errMsg && err.errMsg.indexOf('timeout') !== -1) {
          reject(new Error('请求超时，请检查网络后重试。'))
        } else {
          reject(new Error('服务暂时不可用，请稍后重试。'))
        }
      }
    })
  })
}

module.exports = {
  sendChatMessage
}
