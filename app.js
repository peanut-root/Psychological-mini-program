// app.js
App({
  onLaunch() {
    this.initCloud()
    this.clearChatHistory()
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow() {
    this.clearChatHistory()
  },
  clearChatHistory() {
    wx.removeStorageSync('floatingBall:chatHistory')
  },
  initCloud() {
    if (!wx.cloud || this.globalData.cloudReady) return

    try {
      wx.cloud.init({
        traceUser: true
      })
      this.globalData.cloudReady = true
    } catch (err) {
      console.warn('云开发初始化失败，将使用本地评论兜底', err)
      this.globalData.cloudReady = false
    }
  },
  globalData: {
    userInfo: null,
    cloudReady: false
  }
})
