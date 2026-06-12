// pages/ai/ai.js
const { sendChatMessage, BOT_NAME } = require('../../utils/ai-api')

const WELCOME_MESSAGE = `你好，我是${BOT_NAME}，专门用于心理健康与精神疾病科普。我可以帮你了解症状表现、常见误解、治疗方式和就医准备，但不能替代医生诊断。`

Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    debugText: ''
  },
  onLoad() {
    console.log('AI page onLoad')
    // 初始化消息
    this.setData({
      messages: [{
        role: 'assistant',
        content: WELCOME_MESSAGE
      }],
      inputValue: '',
      isLoading: false,
      debugText: `${BOT_NAME}已准备好`
    })
  },
  onShow() {
    console.log('AI page onShow')
    this.resetChat()
  },
  resetChat() {
    this.setData({
      messages: [{
        role: 'assistant',
        content: WELCOME_MESSAGE
      }],
      inputValue: '',
      isLoading: false,
      debugText: '已重置对话'
    })
  },
  goBack() {
    wx.navigateBack()
  },
  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMessage() {
    const { inputValue, messages } = this.data
    if (!inputValue.trim()) return

    // 添加用户消息
    const newMessages = (messages || []).concat([{
      role: 'user',
      content: inputValue
    }])
    this.setData({
      messages: newMessages,
      inputValue: '',
      isLoading: true
    })

    console.log('AI sendMessage', newMessages)
    this.setData({ debugText: '正在请求科普回复...' })

    // 发送到AI
    sendChatMessage(newMessages).then(reply => {
      console.log('AI reply received', reply)
      this.setData({
        messages: newMessages.concat([{
          role: 'assistant',
          content: reply
        }]),
        isLoading: false,
        debugText: `${BOT_NAME}已回复`
      })
    }).catch(err => {
      console.error('AI error', err)
      this.setData({ debugText: `${BOT_NAME}调用失败: ` + err.message })
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
      this.setData({
        isLoading: false
      })
    })
  }
})
