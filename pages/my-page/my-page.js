// pages/my-page/my-page.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false
  },

  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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