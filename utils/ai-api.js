// utils/ai-api.js
// AI API wrapper - 心理科普助手接口封装

// --- Configuration placeholders (FR-006, D-001) ---
const API_KEY = '66b1c0f9-a6b7-4359-8afa-a9341f2c630e'
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/responses'
const MODEL_NAME = 'doubao-seed-2-0-pro-260215'
const TIMEOUT = 15000
const BOT_NAME = '心屿科普助手'
const SYSTEM_PROMPT = [
  `你是${BOT_NAME}，只负责心理健康和精神疾病科普。`,
  '用简体中文回答，语气温和、清楚、简短，优先控制在 120 字以内。',
  '你可以解释概念、症状、常见误解、就医建议和自助记录方法。',
  '不要做医疗诊断，不要替代医生；涉及自伤、自杀或紧急风险时，先提醒立即联系身边可信任的人、当地急救或心理危机热线。',
  '如果问题与心理科普无关，请简短说明你主要提供心理科普，并把回答拉回心理健康相关角度。'
].join('\n')

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
        resolve(`${BOT_NAME}服务配置中，请稍后再试。`)
      }, 300)
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
        text: `${SYSTEM_PROMPT}\n\n用户问题：${latestUser.content}\n\n请直接给用户回复，不要复述以上规则。`
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
        input: input,
        max_output_tokens: 360
      },
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      timeout: TIMEOUT,
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
  sendChatMessage,
  BOT_NAME,
  SYSTEM_PROMPT
}
