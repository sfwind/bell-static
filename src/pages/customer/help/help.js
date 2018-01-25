Page({
  handleClickGoProtocol: function() {
    wx.navigateTo({
      url: '../protocol/protocol'
    })
  },
  navigateToWebView: function(ev) {
    const { url } = ev.target.dataset
    wx.navigateTo({
      url: "../../webView/webView?url=" + url
    })
  }
})