import AppConfig from './config'

declare let wx: any

// 配置请求路径
const URL_PREFIX = AppConfig.app_domain

function pget(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  console.log('session state', session.state)
  return new Promise(function(resolve, reject) {
    wx.showLoading({ title: '', mask: true })
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json',
        'platform': 'we-mini',
        'sk': session.state
      },
      method: 'GET',
      success: res => {
        if(res.statusCode === 200) {
          resolve(res.data)
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
    wx.showLoading({ title: '', mask: true })
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json',
        'platform': 'we-mini',
        'sk': session.state
      },
      method: 'POST',
      success: res => {
        if(res.statusCode === 200) {
          resolve(res.data)
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

export { pget, ppost }