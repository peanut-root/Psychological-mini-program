// pages/weather/weather.js
Page({
  data: {},
  onLoad() {},
  linkMood() {
    wx.showToast({
      title: '关联成功',
      icon: 'success'
    })
  },
  goBack() {
    wx.navigateBack()
  }
})

