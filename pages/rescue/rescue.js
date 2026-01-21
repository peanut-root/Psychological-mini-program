// pages/rescue/rescue.js
Page({
  data: {

  },

  onLoad() {

  },

  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '4001619995',
      success: () => {
        console.log('拨打电话成功')
      },
      fail: () => {
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  },

  goBack() {
    wx.navigateBack()
  }
})

