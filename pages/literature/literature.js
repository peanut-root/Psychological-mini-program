// pages/literature/literature.js
Page({
  data: {
    literatureList: [
      { id: 1, title: '抑郁症的认知行为疗法最新研究进展' },
      { id: 2, title: '青少年焦虑症的早期干预策略' },
      { id: 3, title: 'AI辅助诊断双相情感障碍的可行性研究' }
    ]
  },
  onLoad() {},
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/literature-detail-${id}/literature-detail-${id}`
    })
  },
  goBack() {
    wx.navigateBack()
  }
})

