// pages/ai/ai.js
const { sendChatMessage } = require('../../utils/ai-api')

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
        content: '你好，我是一个AI心理科普助手。我可以为你介绍各种心理健康知识、心理疾病、症状表现等。无论你对哪方面的心理问题感兴趣，或者你正经历某些心理相关的症状，都可以随时问我，我会尽力给你准确的科普解答。'
      }],
      inputValue: '',
      isLoading: false,
      debugText: 'AI 页面已加载'
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
        content: '你好，我是一个AI心理科普助手。我可以为你介绍各种心理健康知识、心理疾病、症状表现等。无论你对哪方面的心理问题感兴趣，或者你正经历某些心理相关的症状，都可以随时问我，我会尽力给你准确的科普解答。'
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
    const newMessages = [...messages, {
      role: 'user',
      content: inputValue
    }]
    this.setData({
      messages: newMessages,
      inputValue: '',
      isLoading: true
    })

    console.log('AI sendMessage', newMessages)
    this.setData({ debugText: '正在发送消息...' })

    // 发送到AI
    sendChatMessage(newMessages).then(reply => {
      console.log('AI reply received', reply)
      this.setData({
        messages: [...newMessages, {
          role: 'assistant',
          content: reply
        }],
        isLoading: false,
        debugText: 'AI 已返回回复'
      })
    }).catch(err => {
      console.error('AI error', err)
      this.setData({ debugText: 'AI 调用失败: ' + err.message })
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

