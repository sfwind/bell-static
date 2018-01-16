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
    const { url } = ev.currentTarget.dataset
    if(url) {
      wx.navigateTo({ url: url })
    }
  }
})