import { loadPersonInfo } from '../async'

Page({
  data: {
    category: {
      description: '描述信息',
      linkUrl: 'http://www.baidu.com'
    }
  },
  onLoad: function() {
    console.log(...this.data)
  },
  handleClickCategory: function(ev) {
    console.log('you click the icon')
    console.log(ev)
    const { url } = ev.currentTarget.dataset
    wx.navigateTo({
      url: url
    })
  }
})