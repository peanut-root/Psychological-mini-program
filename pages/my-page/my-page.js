// pages/my-page/my-page.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo') || app.globalData.userInfo
    app.globalData.userInfo = userInfo || null
    this.setData({
      userInfo: userInfo || null,
      hasUserInfo: !!userInfo
    })
  },

  navigateToUserInfo() {
    wx.navigateTo({
      url: '/pages/user-info/user-info'
    })
  },

  navigateToDiary() {
    wx.navigateTo({
      url: '/pages/diary/diary'
    })
  },

  navigateToTreehole() {
    wx.navigateTo({
      url: '/pages/treehole/treehole'
    })
  },

  navigateToEndorsementResult() {
    wx.navigateTo({
      url: '/pages/endorsement-result/endorsement-result'
    })
  }
})
