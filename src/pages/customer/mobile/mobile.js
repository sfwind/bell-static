import { loadPersonProfile, sendValidCode, updateWeXinId, validSms } from '../async'
import { alertMsg, showSuccess } from '../../../utils/wxUtil'

Page({
  data: {
    mobile: null,
    vertificationCode: null,
    weXinId: null,
    oversea: false,
    waiting: false,
    remainSeconds: 60,
    enableSubmit: false
  },
  onLoad: function() {
    // foreign
    // internal
  },
  handleSwitchUserMode: function() {
    this.setData({
      oversea: !this.data.oversea
    }, () => {
      this._checkEnableSubmit()
    })
  },
  handleMobileChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      mobile: value
    }, () => {
      this._checkEnableSubmit()
    })
  },
  handleVertificationCodeChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      vertificationCode: value
    }, () => {
      this._checkEnableSubmit()
    })
  },
  handleWeXinIdChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      weXinId: value
    }, () => {
      this._checkEnableSubmit()
    })
  },
  handleGetVertifyCode: function() {
    const { waiting, mobile } = this.data
    if(waiting) {
      return
    }
    sendValidCode(mobile).then(res => {
      if(res.code === 200) {

      } else {
        alertMsg(res.msg)
      }
    })
    this.setData({
      waiting: true
    })
    let timeInterval = setInterval(() => {
      let remainSeconds = this.data.remainSeconds
      if(remainSeconds === 0) {
        clearInterval(timeInterval)
        this.setData({
          waiting: false,
          remainSeconds: 60
        })
      } else {
        this.setData({
          remainSeconds: remainSeconds - 1
        })
      }
    }, 1000)
  },
  handleUpdate: function() {
    if(!this.data.oversea) {
      this._handleUpdateMobileNo()
    } else {
      this._handleUpdateWeXinId()
    }
  },
  _handleUpdateMobileNo: function() {
    const { vertificationCode, enableSubmit } = this.data
    if(enableSubmit) {
      validSms(vertificationCode).then(res => {
        if(res.code === 200) {
          showSuccess('提交成功')
        } else {
          alertMsg(res.msg)
        }
      })
    }
  },
  _handleUpdateWeXinId: function() {
    const { weXinId, enableSubmit } = this.data
    if(enableSubmit) {
      updateWeXinId(weXinId).then(res => {
        if(res.code === 200) {
          showSuccess('提交成功')
        } else {
          alertMsg(res.msg)
        }
      })
    }
  },
  _checkEnableSubmit: function() {
    const { mobile, vertificationCode, weXinId, oversea } = this.data
    let enableSubmit
    if(!oversea) {
      enableSubmit = mobile != '' && mobile && vertificationCode != '' && vertificationCode
    } else {
      enableSubmit = weXinId != '' && weXinId
    }
    this.setData({ enableSubmit: enableSubmit })
  }
})