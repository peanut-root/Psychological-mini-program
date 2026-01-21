// pages/interaction/interaction.js
Page({
  data: {

  },

  onLoad() {

  },

  navigateToAI() {
    wx.navigateTo({
      url: '/pages/ai/ai'
    })
  },

  navigateToGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  },

  navigateToTreehole() {
    wx.navigateTo({
      url: '/pages/treehole/treehole'
    })
  }
})

