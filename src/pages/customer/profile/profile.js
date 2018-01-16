import { loadPersonProfile } from '../async'

const industryList = [
  '互联网/电商',
  '软件/IT服务',
  '咨询',
  '人力资源',
  '法律',
  '快消品',
  '银行/证券/保险',
  '机械/重工',
  '房地产',
  '学术/科研/院校',
  '医药/医疗设备',
  '通信/电子',
  '计算机硬件/半导体',
  '能源/化工',
  '物流',
  '政府/公共事业/非营利',
  '其他'
]

Page({
  data: {
    endWorkingYear: new Date().getFullYear() + '-01-01',
    workingYear: 1960,
    industryIndex: 0,
    industryRange: industryList,
    industry: '选择行业',
    job: '',
    region: '请选择地区',
    realName: '',
    marriedIndex: 0,
    marriedRange: ['已婚', '未婚有对象', '单身'],
    married: '以便参加脱单群等活动',
    receiveAddress: '',
    receiver: ''
  },
  onLoad: function() {
    loadPersonProfile().then(res => {
      if(res.code === 200) {
        let msg = res.msg
        this.setData({
          workingYear: msg.workingYear,
          industry: msg.industry,
          job: msg.function,
          region: msg.province + ' ' + msg.city,
          realName: msg.realName,
          married: msg.married,
          receiveAddress: msg.address,
          receiver: msg.receiver
        })
      }
    })
  },
  handleWoringYearPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      workingYear: value
    })
  },
  handleIndustryPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      industryIndex: value,
      industry: industryList[value]
    })
  },
  handleJobChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      job: value
    })
  },
  handleRegionPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      region: value.join(' ')
    })
  },
  handleRealNameInputChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      realName: value
    })
  },
  handleMarriedPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      married: this.data.marriedRange[value]
    })
  },
  handleReceiveAddressTextAreaChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      receiveAddress: value
    })
  },
  handleReceiverChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      receiver: value
    })
  }
})

