import { loadPersonAccount } from '../async'

Page({
  data: {
    nickName: '',
    riseId: '',
    memberId: '',
    memberType: '',
    mobile: '',
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
  onShow: function() {

  },
  onReady: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  }
})