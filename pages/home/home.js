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

  onLoad() {
    // 检查是否完成过启动引导
    const hasOnboarded = wx.getStorageSync('hasOnboarded')
    if (!hasOnboarded) {
      wx.reLaunch({
        url: '/pages/splash/splash'
      })
      return
    }

    // 两页泡泡均点击 Skip：主页疾病科普区留空（不显示默认三项）
    const skipped1 = wx.getStorageSync('bubbleSkippedStep1')
    const skipped2 = wx.getStorageSync('bubbleSkippedStep2')
    if (skipped1 && skipped2) {
      this.setData({
        scienceBlocks: []
      })
      return
    }

    // 从本地存储获取第二个泡泡页选择的疾病
    const selectedDiseases = wx.getStorageSync('selectedNumbers')
    if (selectedDiseases && selectedDiseases.length === 3) {
      // 将选择的疾病映射到关键词和疾病名称
      const scienceBlocks = selectedDiseases.map((disease, index) => {
        return {
          id: index + 1,
          keyword: this.getDiseaseKeyword(disease),
          disease: disease
        }
      })
      this.setData({
        scienceBlocks: scienceBlocks
      })
    }
  },

  // 根据疾病名称获取对应的关键词
  getDiseaseKeyword(disease) {
    const keywordMap = {
      '创伤后应激障碍': '创伤记忆',
      '焦虑症': '焦虑',
      '精神分裂症': '幻觉妄想',
      '物质成瘾': '依赖问题',
      '双相情感障碍': '情绪波动',
      '抑郁症': '情绪低落',
      '注意力缺陷与多动障碍': '注意力分散',
      '躯体化症状': '身体不适',
      '强迫症': '反复纠结',
      '性欲倒错': '性行为异常',
      '特定恐惧症': '特定害怕'
    }
    return keywordMap[disease] || '关注'
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
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
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
  },

  // 临时函数：重置引导状态（仅用于测试）
  resetOnboarding() {
    wx.removeStorageSync('hasOnboarded')
    wx.removeStorageSync('selectedNumbers')
    wx.removeStorageSync('bubbleSkippedStep1')
    wx.removeStorageSync('bubbleSkippedStep2')
    wx.showToast({
      title: '已重置引导状态，请重启小程序',
      icon: 'none',
      duration: 2000
    })
  },

  // 跳转到泡泡界面（仅用于测试）
  goToSplash() {
    wx.reLaunch({
      url: '/pages/splash/splash'
    })
  }
})

