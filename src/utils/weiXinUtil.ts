declare let wx: any
declare let require: any

var _ = require('../libs/lodash/lodash.core.min.js')

export const alertMsg = (param1: string, param2?: string) => {
  let params = {
    showCancel: false,
    confirmText: '关闭'
  }
  if(param2) {
    _.defaults(params, { title: param1, content: param2 })
  } else {
    _.defaults(params, { content: param1 })
  }
  wx.showModal(params)
}

export const showSuccess = (content?: string) => {
  let params = {
    icon: 'success',
    duration: 1500,
    mask: true
  }
  if(content) {
    _.defaults(params, { title: content })
  }
  wx.showToast(params)
}