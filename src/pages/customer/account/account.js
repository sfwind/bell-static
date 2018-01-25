import { loadPersonAccount } from '../async'

Page({
  data: {
    nickName: null,
    riseId: null,
    memberId: null,
    memberType: null,
    mobile: null,
    coupons: []
  },
  onLoad: function() {
    loadPersonAccount().then(res => {
      if(res.code === 200) {
        let msg = res.msg
        this.setData({
          nickName: msg.nickName,
          riseId: msg.riseId,
          memberId: msg.memberId,
          memberType: msg.memberType,
          mobile: msg.mobile,
          coupons: msg.coupons
        })
      }
    })
  },
  handleModifyMobileNo: function() {
    wx.navigateTo({
      url: '../mobile/mobile'
    })
  }
})