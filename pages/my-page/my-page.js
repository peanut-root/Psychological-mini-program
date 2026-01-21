// pages/my-page/my-page.js
Page({
  data: {

  },

  onLoad() {

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
  }
})

