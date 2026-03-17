// pages/search/search.js
Page({
  data: {
    keyword: '',
    results: [],
    searched: false,
    history: [],
    recommendations: [
      '抑郁症',
      '焦虑症',
      '强迫症',
      '双向情感障碍',
      '躯体化障碍',
      'ADHD',
      '失眠',
      '社交恐惧'
    ]
  },

  onLoad(options) {
    // 加载搜索历史
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({
      history: history
    })

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

  clearInput() {
    this.setData({
      keyword: '',
      searched: false
    })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    
    // 保存到搜索历史
    this.saveToHistory(keyword)
    
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
      results: results,
      searched: true
    })
  },

  // 保存搜索历史
  saveToHistory(keyword) {
    let history = this.data.history
    // 移除重复项
    history = history.filter(item => item !== keyword)
    // 添加到最前面
    history.unshift(keyword)
    // 最多保留10条
    if (history.length > 10) {
      history = history.slice(0, 10)
    }
    
    this.setData({
      history: history
    })
    wx.setStorageSync('searchHistory', history)
  },

  // 点击标签搜索
  onTagClick(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      keyword: keyword
    })
    this.onSearch()
  },

  // 清空搜索历史
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            history: []
          })
          wx.removeStorageSync('searchHistory')
        }
      }
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

