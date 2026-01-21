// pages/index/index.js
Page({
  data: {
    searchValue: '',
    toastShow: false,
    toastText: '',
    diseaseList: [
      { id: 1, label: '抑郁症', icon: '💧', type: 'depression', color: '#DBEAFE', animClass: 'bubble-anim-1', x: 50, y: 50 },
      { id: 2, label: '焦虑症', icon: '⚠️', type: 'anxiety', color: '#FEF3C7', animClass: 'bubble-anim-2', x: 150, y: 80 },
      { id: 3, label: '双相', icon: '⚖️', type: 'bipolar', color: '#EDE9FE', animClass: 'bubble-anim-3', x: 100, y: 150 },
      { id: 4, label: '强迫症', icon: '🔄', type: 'ocd', color: '#DCFCE7', animClass: 'bubble-anim-4', x: 200, y: 100 },
      { id: 5, label: '躯体化', icon: '❤️', type: 'somatic', color: '#FEE2E2', animClass: 'bubble-anim-5', x: 80, y: 200 },
      { id: 6, label: 'ADHD', icon: '⚡', type: 'adhd', color: '#FFEDD5', animClass: 'bubble-anim-6', x: 180, y: 180 }
    ],
    literatureList: [
      {
        id: 1,
        title: '抑郁症的认知行为疗法最新研究进展',
        source: '《心理学报》2023',
        desc: '研究表明，结合数字化工具的认知行为疗法对抑郁症的治疗效果显著提升...'
      },
      {
        id: 2,
        title: '青少年焦虑症的早期干预策略',
        source: '《中国心理卫生杂志》2023',
        desc: '家庭环境干预与学校心理辅导相结合的方式，能有效降低青少年焦虑水平...'
      },
      {
        id: 3,
        title: 'AI辅助诊断双相情感障碍的可行性研究',
        source: '《中华精神科杂志》2023',
        desc: '基于机器学习的AI系统在双相情感障碍诊断中的准确率达到87.3%...'
      }
    ]
  },

  onLoad() {
    this.initBubbles()
  },

  // 搜索相关
  onSearchClick() {
    // 搜索框被点击时的处理
  },

  onSearchConfirm(e) {
    const value = e.detail.value
    if (value.trim()) {
      this.showToast('进入搜索页面...')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/search/search?keyword=' + value
        })
      }, 600)
    }
  },

  // 导航函数
  navigateToUserInfo() {
    this.showToast('进入个人信息页面...')
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/user-info/user-info'
      })
    }, 600)
  },

  navigateToRescue() {
    this.showToast('正在拨打救助电话...')
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/rescue/rescue'
      })
    }, 600)
  },

  navigateToScale() {
    this.showToast('进入SCL-90量表测评...')
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/scale/scale'
      })
    }, 600)
  },

  navigateToScience() {
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/science/science'
      })
    }, 300)
  },

  navigateToAI() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/ai/ai'
      })
    }, 300)
  },

  navigateToGame() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/game/game'
      })
    }, 300)
  },

  navigateToTreehole() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/treehole/treehole'
      })
    }, 300)
  },

  navigateToDiary() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/diary/diary'
      })
    }, 300)
  },

  navigateToWeather() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/weather/weather'
      })
    }, 300)
  },

  navigateToLiterature() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/literature/literature'
      })
    }, 300)
  },

  navigateToLiteratureDetail(e) {
    const id = e.currentTarget.dataset.id
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/literature-detail-${id}/literature-detail-${id}`
      })
    }, 300)
  },

  navigateToDisease(e) {
    const type = e.currentTarget.dataset.type
    const pageMap = {
      'depression': '/pages/depression/depression',
      'anxiety': '/pages/anxiety/anxiety',
      'bipolar': '/pages/bipolar/bipolar',
      'ocd': '/pages/ocd/ocd',
      'somatic': '/pages/somatic/somatic',
      'adhd': '/pages/adhd/adhd'
    }
    const url = pageMap[type]
    if (url) {
      setTimeout(() => {
        wx.navigateTo({
          url: url
        })
      }, 300)
    }
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

  // 初始化气泡动画
  initBubbles() {
    // 简单版本：使用CSS动画
    // 复杂版本可以在小程序中使用canvas或定时器更新位置
    // 这里使用简化版本，气泡会按照CSS动画移动
  }
})

