import { pget } from './utils/request'
import { initWeMiniUserInfo, loadSession } from './utils/async'
import { loadBaseUserInfo } from './pages/customer/async'

App({
  data: {},
  onLaunch: function() {
    console.log('开始登录')
    login().then(() => {
      loadBaseUserInfo().then(res => {
        if(res.code === 200) {
          console.log('基础信息')
          console.log(res)
        }
      })
    })
    console.log('登录结束')
  }
})

function login() {
  return new Promise((resolve, reject) => {
    let session = wx.getStorageSync('session')
    console.log('历史 session:')
    console.log(session)
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
              console.log('后台新 session：')
              console.log(wx.getStorageSync('session'))
              console.log(result)
              if(msg.firstLogin) {
                wx.getUserInfo({
                  success: userInfoResult => {
                    console.log('get userinfo:')
                    console.log(userInfoResult.userInfo)
                    initWeMiniUserInfo(userInfoResult.userInfo).then(res => {
                      console.log('init user info')
                      console.log(res)
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