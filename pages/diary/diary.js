// pages/diary/diary.js
Page({
  data: {
    title: '',
    content: ''
  },

  onLoad() {

  },

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  onContentInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  saveDiary() {
    if (!this.data.title.trim() && !this.data.content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    // 保存日志到本地存储
    const diaries = wx.getStorageSync('diaries') || []
    diaries.unshift({
      id: Date.now(),
      title: this.data.title,
      content: this.data.content,
      date: new Date().toLocaleString()
    })
    wx.setStorageSync('diaries', diaries)

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  goBack() {
    wx.navigateBack()
  }
})

