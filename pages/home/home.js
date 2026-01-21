// pages/home/home.js
Page({
  data: {
    toastShow: false,
    toastText: '',
    scienceBlocks: [
      { id: 1, keyword: '焦虑', disease: '焦虑症' },
      { id: 2, keyword: '情绪低落', disease: '抑郁症' },
      { id: 3, keyword: '反复纠结', disease: '强迫症' }
    ]
  },

  // 导航函数
  navigateToUserInfo() {
    wx.navigateTo({
      url: '/pages/user-info/user-info'
    })
  },

  navigateToRescue() {
    wx.navigateTo({
      url: '/pages/rescue/rescue'
    })
  },

  navigateToGuide() {
    this.showToast('敬请期待，就诊指南完善中')
  },

  navigateToScience() {
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/science/science'
      })
    }, 300)
  },

  navigateToLiterature() {
    wx.navigateTo({
      url: '/pages/literature/literature'
    })
  },

  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  // Toast提示
  showToast(text) {
    this.setData({
      toastShow: true,
      toastText: text
    })
    setTimeout(() => {
      this.setData({
        toastShow: false
      })
    }, 2000)
  }
})

