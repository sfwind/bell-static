declare let wx: any

const URL_PREFIX = ''

function pget(url: string, query?: any) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json' // 默认值
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
  return new Promise(function(resolve, reject) {
    wx.request({
      url: URL_PREFIX + url,
      data: query,
      header: {
        'content-type': 'application/json'
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