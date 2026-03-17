// pages/user-info/user-info.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: {
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      nickName: '心理健康用户',
      userId: '1000001',
      gender: '保密'
    }
  },

  onLoad() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      })
    }
  },

  // 微信登录
  onLogin() {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        const userInfo = {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          userId: '1000001', // 实际应该从服务器获取
          gender: res.userInfo.gender === 1 ? '男' : res.userInfo.gender === 2 ? '女' : '保密'
        }
        
        // 保存用户信息到本地
        wx.setStorageSync('userInfo', userInfo)
        
        this.setData({
          isLoggedIn: true,
          userInfo: userInfo
        })
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      },
      fail: () => {
        wx.showToast({
          title: '登录取消',
          icon: 'none'
        })
      }
    })
  },

  // 修改昵称
  editNickname() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入新昵称',
      success: (res) => {
        if (res.confirm && res.content) {
          const userInfo = this.data.userInfo
          userInfo.nickName = res.content
          
          this.setData({
            userInfo: userInfo
          })
          
          wx.setStorageSync('userInfo', userInfo)
          
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 更换头像
  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        const userInfo = this.data.userInfo
        userInfo.avatarUrl = tempFilePath
        
        this.setData({
          userInfo: userInfo
        })
        
        wx.setStorageSync('userInfo', userInfo)
        
        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        })
      }
    })
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          
          this.setData({
            isLoggedIn: false,
            userInfo: {
              avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
              nickName: '心理健康用户',
              userId: '1000001',
              gender: '保密'
            }
          })
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  },

  goBack() {
    wx.navigateBack()
  },

  navigateToEndorsementResult() {
    wx.navigateTo({
      url: '/pages/endorsement-result/endorsement-result'
    })
  },

  // 临时函数：重置引导状态（仅用于测试）
  resetOnboarding() {
    wx.removeStorageSync('hasOnboarded')
    wx.removeStorageSync('selectedNumbers')
    wx.removeStorageSync('selectedNumbersStep1')
    wx.showToast({
      title: '已重置引导状态，请重启小程序',
      icon: 'none',
      duration: 2000
    })
  }
})

