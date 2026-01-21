// pages/treehole/treehole.js
Page({
  data: {
    content: ''
  },
  onLoad() {},
  onInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  publish() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success'
    })
    setTimeout(() => {
      this.setData({
        content: ''
      })
    }, 1500)
  },
  goBack() {
    wx.navigateBack()
  }
})

