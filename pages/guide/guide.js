// pages/guide/guide.js
Page({
  data: {

  },

  onLoad() {

  },

  // 返回主页
  goBack() {
    wx.navigateBack()
  },

  // 跳转到医院推荐
  navigateToHospital() {
    wx.navigateTo({
      url: '/pages/hospital/hospital'
    })
  },

  // 跳转到就诊背书
  navigateToEndorsement() {
    wx.navigateTo({
      url: '/pages/endorsement/endorsement'
    })
  },

  // 跳转到就诊流程介绍
  navigateToProcess() {
    wx.showToast({
      title: '就诊流程介绍功能开发中',
      icon: 'none'
    })
  }
})
