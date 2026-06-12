// pages/user-info/user-info.js
const app = getApp()

const DEFAULT_USER_INFO = {
  avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  nickName: '心理健康用户',
  userId: '1000001',
  gender: '保密'
}

Page({
  data: {
    isLoggedIn: false,
    userInfo: DEFAULT_USER_INFO,
    draftAvatarUrl: DEFAULT_USER_INFO.avatarUrl,
    draftNickName: ''
  },

  onLoad() {
    this.syncUserInfo()
  },

  onShow() {
    this.syncUserInfo()
  },

  syncUserInfo() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      app.globalData.userInfo = userInfo
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo,
        draftAvatarUrl: userInfo.avatarUrl || DEFAULT_USER_INFO.avatarUrl,
        draftNickName: userInfo.nickName || ''
      })
      return
    }

    app.globalData.userInfo = null
    this.setData({
      isLoggedIn: false,
      userInfo: DEFAULT_USER_INFO,
      draftAvatarUrl: this.data.draftAvatarUrl || DEFAULT_USER_INFO.avatarUrl,
      draftNickName: this.data.draftNickName || ''
    })
  },

  // 登录使用头像昵称填写能力；当前项目没有后端账号体系，资料保存在本地。
  onLogin() {
    const nickName = (this.data.draftNickName || '').trim() || DEFAULT_USER_INFO.nickName
    const userInfo = {
      avatarUrl: this.data.draftAvatarUrl || DEFAULT_USER_INFO.avatarUrl,
      nickName: nickName,
      userId: this.data.userInfo.userId || DEFAULT_USER_INFO.userId,
      gender: this.data.userInfo.gender || '保密'
    }

    this.saveUserInfo(userInfo)

    wx.showToast({
      title: '登录成功',
      icon: 'success'
    })
  },

  saveUserInfo(userInfo) {
    wx.setStorageSync('userInfo', userInfo)
    app.globalData.userInfo = userInfo

    this.setData({
      isLoggedIn: true,
      userInfo: userInfo,
      draftAvatarUrl: userInfo.avatarUrl,
      draftNickName: userInfo.nickName
    })
  },

  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    if (!avatarUrl) return

    if (this.data.isLoggedIn) {
      const userInfo = Object.assign({}, this.data.userInfo, {
        avatarUrl: avatarUrl
      })
      this.saveUserInfo(userInfo)
      wx.showToast({
        title: '头像更新成功',
        icon: 'success'
      })
      return
    }

    this.setData({
      draftAvatarUrl: avatarUrl
    })
  },

  onNicknameInput(e) {
    this.setData({
      draftNickName: e.detail.value
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
          const userInfo = Object.assign({}, this.data.userInfo, {
            nickName: res.content
          })

          this.saveUserInfo(userInfo)

          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
        }
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
          app.globalData.userInfo = null

          this.setData({
            isLoggedIn: false,
            userInfo: DEFAULT_USER_INFO,
            draftAvatarUrl: DEFAULT_USER_INFO.avatarUrl,
            draftNickName: ''
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
