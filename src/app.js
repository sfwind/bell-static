import { pget } from './utils/request'
import { initWeMiniUserInfo, loadSession } from './utils/async'
import { loadBaseUserInfo } from './pages/customer/async'
import { alertMsg } from './utils/weiXinUtil'

App({
  globalData: {
    nickName: '',
    headImgUrl: ''
  },
  onLaunch: function() {
    let _this = this
    login().then(() => {
      loadBaseUserInfo().then(res => {
        if(res.code === 200) {
          const { nickname, headimgurl } = res.msg
          this.globalData.nickName = nickname
          this.globalData.headImgUrl = headimgurl
        }
      })
    })
  }
})

function login() {
  return new Promise((resolve, reject) => {
    let session = wx.getStorageSync('session')
    if(!session || !session.state || session.expireDate <= new Date().getTime()) {
      console.log('当前用户未登录或者登录已经过期')
      wx.login({
        success: res => {
          loadSession(res.code).then(result => {
            if(result.code === 200) {
              let msg = result.msg
              wx.setStorageSync('session', {
                expireDate: msg.expireDate,
                state: msg.state
              })
              if(msg.firstLogin) {
                wx.getUserInfo({
                  success: userInfoResult => {
                    initWeMiniUserInfo(userInfoResult.userInfo).then(res => {
                      if(res.code !== null) {
                        alertMsg(res.msg)
                      }
                    })
                  }
                })
              }
              resolve()
            } else {
              reject()
            }
          })
        },
        fail: () => {
          reject()
        }
      })
    } else {
      resolve()
    }
  })
}