import { URL_PREFIX } from './config'
import { initSession } from './async'

declare let wx: any

function pget(url: string, query?: any) {
  let session = wx.getStorageSync('session')
  return new Promise(function(resolve, reject) {
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
        if(res.statusCode === 200) {
          resolve(res.data)
        } else if(res.statusCode === 700) {
          wx.setStorageSync('session', {})
        } else {
          reject(res)
        }
      },
      fail: (res) => {
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
  return new Promise(function(resolve, reject) {
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
          wx.setStorageSync('session', {})
        } else {
          reject(res)
        }
      },
      fail: (res) => {
        reject(res)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

export { pget, ppost }