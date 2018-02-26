import { mark } from '../../../utils/async'
import { loadPersonProfile, validSms, sendValidCode } from '../async'
import { alertMsg } from '../../../utils/wxUtil'

Page({
  data: {
    defaultIsFull: true,
    phone: null,
    weixinId: null,
    sending: false,
    disable: false,
    code: null,
    seconds: 0,
    oversea: false,
    enableSubmit: true,
  },
  intervalTrigger: null,
  onLoad: function () {
    mark({ module: "打点", function: "个人中心", action: "打开绑定电话页面" })

    loadPersonProfile().then(res => {
      if(res.code === 200) {
        this.setData({ defaultIsFull: res.msg.isFull })
      }
    })
  },

  onClick() {
    let { phone } = this.data

    let NUMBER_REG = /^[0-9]+$/
    if(!phone) {
      alertMsg('请输入手机号码')
      return
    }
    if(!NUMBER_REG.test(phone)) {
      alertMsg('请输入格式正确的手机')
      return
    }
    if(this.intervalTrigger) {
      clearInterval(this.intervalTrigger)
    }
    this.setData({ seconds: 60, sending: true })
    this.intervalTrigger = setInterval(() => {
      this.setData({ seconds: this.data.seconds - 1 })
      if(this.data.seconds <= 0) {
        this.setData({ sending: false })
        clearInterval(this.intervalTrigger)
      }
    }, 1000)
    sendValidCode(phone).then(res => {
      if(res.code !== 200) {
        alertMsg(res.msg)
      }
    })
  },

  onSubmit() {
    const { code, oversea, weixinId } = this.data

    // 海外用户
    if(oversea) {
      updateWeXinId(weixinId).then(res => {
        if(res.code !== 200) {
          alertMsg(res.msg)
        }
      })
    } else {
      //国内用户
      if(!code) {
        alertMsg('请输入验证码')
        return
      }
      validSms(code).then(res => {
        if(res.code !== 200) {
          alertMsg('验证输入错误<br/>请重新输入')
        } else {
          alertMsg('验证成功')
        }
      })
    }
  },

  handleChangePhone(e) {
    let value = e.detail.value
    if(value && this.data.code) {
      this.setData({ phone: value, disable: false })
    } else {
      this.setData({ phone: value, disable: true })
    }
  },

  handleChangeCode(e) {
    let value = e.detail.value
    if(value && this.data.phone) {
      this.setData({ code: value, disable: false })
    } else {
      this.setData({ code: value, disable: true })
    }
  }
})