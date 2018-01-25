import { closeLearningNotify, loadBaseUserInfo, loadStudyNotifyStatus, openLearningNotify } from '../async'

Page({
  data: {
    nickName: '',
    headImgUrl: '',
    studyNotify: false
  },
  onLoad: function() {
    const app = getApp()
    const { nickName, headImgUrl } = app.globalData
    if(nickName && nickName != '' && headImgUrl && headImgUrl != '') {
      this.setData({
        nickName: nickName,
        headImgUrl: headImgUrl
      })
    } else {
      loadBaseUserInfo().then(res => {
        this.setData({
          nickName: res.msg.nickname,
          headImgUrl: res.msg.headimgurl
        })
      })
    }
    loadStudyNotifyStatus().then(res => {
      if(res.code === 200) {
        this.setData({
          studyNotify: res.msg
        })
      }
    })
  },
  handleClickCategory: function(ev) {
    const { url } = ev.currentTarget.dataset
    if(url) {
      wx.navigateTo({ url: url })
    }
  },
  switchLearningNotify: function(ev) {
    const { value } = ev.detail
    if(value) {
      openLearningNotify()
    } else {
      closeLearningNotify()
    }
    this.setData({ studyNotify: value })
  }
})