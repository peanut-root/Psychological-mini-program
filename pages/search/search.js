// pages/search/search.js
Page({
  data: {
    keyword: '',
    results: []
  },

  onLoad(options) {
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      })
      this.onSearch()
    }
  },

  onInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  onSearch() {
    const keyword = this.data.keyword
    if (!keyword.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    
    // 模拟搜索结果显示
    const results = [
      {
        id: 1,
        title: '抑郁症相关知识',
        desc: '关于抑郁症的症状、原因和治疗方法...'
      },
      {
        id: 2,
        title: '焦虑症缓解方法',
        desc: '如何应对焦虑情绪，保持心理健康...'
      }
    ]
    
    this.setData({
      results: results
    })
  },

  onResultClick(e) {
    const id = e.currentTarget.dataset.id
    // 根据结果跳转到相应页面
    wx.showToast({
      title: '查看详情',
      icon: 'none'
    })
  },

  goBack() {
    wx.navigateBack()
  }
})

