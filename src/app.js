import { pget } from './utils/request'
import { initSession } from './utils/async'
import { loadBaseUserInfo } from './pages/customer/async'
import { alertMsg } from './utils/wxUtil'

App({
  globalData: {
    nickName: '',
    headImgUrl: ''
  },
  onLaunch: function() {
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
      console.debug('当前用户未登录或者登录已经过期')
      wx.login({
        success: res => {
          console.log('load login code: ' + res.code)
          initSession(res.code).then(result => {
            if(result.code === 200) {
              let msg = result.msg
              wx.setStorageSync('session', {
                expireDate: msg.expireDate,
                state: msg.state
              })
              console.debug('用户登录成功')
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