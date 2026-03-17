Page({
  data: {
    result: null
  },

  onShow() {
    const result = wx.getStorageSync('lastEndorsement');
    if (result) {
      this.setData({ result });
    }
  },

  reEdit() {
    wx.navigateTo({
      url: '/pages/endorsement/endorsement'
    });
  }
});