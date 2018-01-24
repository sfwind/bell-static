import { URL_PREFIX } from './config'
import { initWeMiniUserInfo, loadSession } from './async'

declare let wx: any

function pget(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  console.log('session state', session.state)
  return new Promise(function(resolve, reject) {
    console.log(session.state)
    wx.showLoading({ title: '', mask: true })
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json;charset=utf-8',
        'platform': 'we_mini',
        'sk': session.state
      },
      method: 'GET',
      success: res => {
        console.log(res)
        if(res.statusCode === 200) {
          resolve(res.data)
        } else if(res.statusCode === 700) {
          console.log('未登录')
          wx.setStorageSync('session', {})
        } else {
          reject(res)
        }
      },
      fail: (res) => {
        console.log(res)
        reject(res)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

function ppost(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  console.log('session state', session.state)
  return new Promise(function(resolve, reject) {
    console.log(session.state)
    wx.showLoading({ title: '', mask: true })
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json;charset=utf-8',
        'platform': 'we_mini',
        'sk': session.state
      },
      method: 'POST',
      success: res => {
        if(res.statusCode === 200) {
          resolve(res.data)
        } else if(res.statusCode === 700) {
          console.log('未登录')
          wx.setStorageSync('session', {})
        } else {
          reject(res)
        }
      },
      fail: (res) => {
        console.log(res)
        reject(res)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

// function reLogin() {
//   wx.login({
//     success: res => {
//       loadSession(res.code).then(result => {
//         console.log(result)
// if(result.code === 200) {
//   let msg = result.msg
//   wx.setStorageSync('session', {
//     expireDate: msg.expireDate,
//     state: msg.state
//   })
//   console.log('后台新 session：')
//   console.log(wx.getStorageSync('session'))
//   console.log(result)
//   if(msg.firstLogin) {
//     wx.getUserInfo({
//       success: userInfoResult => {
//         console.log('get userinfo:')
//         console.log(userInfoResult.userInfo)
//         initWeMiniUserInfo(userInfoResult.userInfo).then(res => {
//           console.log('init user info')
//           console.log(res)
//         })
//       }
//     })
//   }
// }
//       })
//     }
//   })
// }

export { pget, ppost }