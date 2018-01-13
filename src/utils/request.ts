import AppConfig from './config'

declare let wx: any

// 配置请求路径
const URL_PREFIX = AppConfig.local_domain

function pget(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  console.log('session state', session.state)
  return new Promise(function(resolve, reject) {
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
      fail: res => reject(res)
    })
  })
}

function ppost(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  console.log('session state', session.state)
  return new Promise(function(resolve, reject) {
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
      fail: res => reject(res)
    })
  })
}

export { pget, ppost }