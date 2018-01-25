Page({
  data: {
    url: ''
  },
  onLoad: function(option) {
    if(option) {
      const { url } = option
      this.setData({
        url: url
      })
    }
  }
})