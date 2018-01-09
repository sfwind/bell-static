// 全局配置

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log('登录', res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.globalData.userInfo = res.userInfo
              // 所以此处加入 callback 以防止这种情况 getUserInfo 在 Page.onLoad 事件之后才返回
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})