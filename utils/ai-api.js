// utils/ai-api.js
// AI API wrapper — placeholder config with mock fallback

// --- Configuration placeholders (FR-006, D-001) ---
const API_KEY = '66b1c0f9-a6b7-4359-8afa-a9341f2c630e'
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/responses'
const MODEL_NAME = 'doubao-seed-2-0-pro-260215'
const TIMEOUT = 60000 // 👈 这里修改为 60000 (60秒)

/**
 * Send chat messages to the AI service.
 * When API_KEY is empty, returns a mock response after 1s.
 *
 * @param {Array} messages - Array of {role, content} objects, where content can be string or array for multimodal
 * @returns {Promise<string>} AI reply text
 */
console.log('utils/ai-api.js loaded', {
  API_URL,
  MODEL_NAME,
  apiKeyPresent: !!API_KEY
})

function sendChatMessage(messages) {
  return new Promise((resolve, reject) => {
    console.log('sendChatMessage called', {
      apiKeyPresent: !!API_KEY,
      messageCount: messages.length
    })

    if (!API_KEY || API_KEY === '') {
      console.warn('AI API key is empty, using mock fallback')
      setTimeout(() => {
        resolve('AI 服务配置中，请稍后填写 API Key')
      }, 1000)
      return
    }

    const userMessages = messages.filter(msg => msg.role === 'user')
    const latestUser = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null

    if (!latestUser) {
      reject(new Error('没有可发送的用户消息'))
      return
    }

    const input = [{
      role: 'user',
      content: [{
        type: 'input_text',
        text: latestUser.content
      }]
    }]

    console.log('sendChatMessage request', {
      apiKeyPresent: !!API_KEY,
      apiUrl: API_URL,
      model: MODEL_NAME,
      input
    })

    // Real API request
    wx.request({
      url: API_URL,
      method: 'POST',
      dataType: 'json',
      data: {
        model: MODEL_NAME,
        input: input
      },
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      timeout: TIMEOUT, // 现在这里会使用 60000
      success(res) {
        console.log('API Response:', res.statusCode, res.data)
        if (res.statusCode === 200 && res.data) {
          const responseData = res.data
          let replyText = null

          const parseTextItem = item => {
            if (!item) return null
            if (typeof item === 'string') {
              const trimmed = item.trim()
              if (trimmed && !/^rs_/.test(trimmed) && !/^resp_/.test(trimmed)) return trimmed
              return null
            }
            if (Array.isArray(item)) {
              for (const sub of item) {
                const found = parseTextItem(sub)
                if (found) return found
              }
              return null
            }
            if (typeof item === 'object') {
              if (item.type === 'text' || item.type === 'output_text' || item.type === 'response_text') {
                return (item.text || item.value || item.response || '').trim() || null
              }
              if (typeof item.response === 'string') {
                const trimmed = item.response.trim()
                if (trimmed && !/^rs_/.test(trimmed) && !/^resp_/.test(trimmed)) return trimmed
              }
              if (typeof item.output_text === 'string' && item.output_text.trim()) {
                return item.output_text.trim()
              }
              if (typeof item.response_text === 'string' && item.response_text.trim()) {
                return item.response_text.trim()
              }
              if (item.content) {
                const found = parseTextItem(item.content)
                if (found) return found
              }
              if (item.output) {
                const found = parseTextItem(item.output)
                if (found) return found
              }
              if (item.value && typeof item.value === 'string' && item.value.trim()) {
                return item.value.trim()
              }
            }
            return null
          }

          const extractReply = data => {
            if (!data) return null
            const fromOutput = parseTextItem(data.output)
            if (fromOutput) return fromOutput
            const fromResponse = parseTextItem(data.response)
            if (fromResponse) return fromResponse
            if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text.trim()
            if (typeof data.response_text === 'string' && data.response_text.trim()) return data.response_text.trim()
            return null
          }

          replyText = extractReply(responseData)
          if (!replyText && responseData.blocks) {
            replyText = parseTextItem(responseData.blocks)
          }

          if (replyText) {
            resolve(replyText)
          } else {
            console.error('AI response parsing failed', responseData)
            reject(new Error('服务暂时不可用，请稍后重试。'))
          }
        } else {
          console.error('AI request returned non-200 status', res.statusCode, res.data)
          const errorMsg = res.data && res.data.error && (res.data.error.message || res.data.error.code)
          reject(new Error(errorMsg || '服务暂时不可用，请稍后重试。'))
        }
      },
      fail(err) {
        console.error('AI request failed', err)
        if (err.errMsg && err.errMsg.indexOf('timeout') !== -1) {
          reject(new Error('请求超时，请检查网络后重试。'))
        } else {
          const errorMsg = err.errMsg || '服务暂时不可用，请稍后重试。'
          reject(new Error(errorMsg))
        }
      }
    })
  })
}

module.exports = {
  sendChatMessage
}