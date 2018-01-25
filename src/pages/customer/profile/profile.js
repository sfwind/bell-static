import { loadPersonProfile, loadRegionList, updateProfile } from '../async'
import { alertMsg } from '../../../utils/weiXinUtil'

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
    industry: '',
    job: '',
    region: '',
    regionList: {},
    regionProvinceList: [],
    regionCityList: [],
    realName: '',
    marriedIndex: 0,
    marriedRange: ['已婚', '未婚有对象', '单身'],
    married: '',
    receiveAddress: '',
    receiver: '',
    enableSubmit: false
  },
  onLoad: function() {
    loadPersonProfile().then(res => {
      if(res.code === 200) {
        let msg = res.msg
        this.setData({
          workingYear: msg.workingYear || '请选择',
          industry: msg.industry || '请选择',
          job: msg.function || '',
          region: msg.province ? msg.province + ' ' + msg.city : '请选择',
          realName: msg.realName || '',
          married: msg.married || '以便参加脱单群等活动',
          receiveAddress: msg.address || '',
          receiver: msg.receiver || ''
        }, () => {
          this.checkSubmitDisable()
        })
      }
    })
    let regionList = wx.getStorageSync('region')
    if(!regionList) {
      loadRegionList().then(res => {
        wx.setStorageSync('region', res.msg)
        this.setData({
          regionList: res.msg,
          regionProvinceList: res.msg.provinceList,
          regionCityList: res.msg.cityList.filter(city => city.parentId == '1')
        })
      })
    } else {
      this.setData({
        regionList: regionList,
        regionProvinceList: regionList.provinceList,
        regionCityList: regionList.cityList.filter(city => city.parentId == '1')
      })
    }
  },
  handleWoringYearPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      workingYear: value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleIndustryPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      industryIndex: value,
      industry: industryList[value]
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleJobChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      job: value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleRegionPickerChange: function(ev) {
    const { regionProvinceList, regionCityList } = this.data
    const { value } = ev.detail
    this.setData({
      region: regionProvinceList[value[0]].value + ' ' + regionCityList[value[1]].value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleRegionColumnChange: function(ev) {
    const { regionList, regionProvinceList } = this.data
    const { column: column, value: value } = ev.detail
    if(column == 0) {
      let parentId = regionProvinceList[value].id
      this.setData({
        regionCityList: regionList.cityList.filter(city => city.parentId == parentId)
      })
    }
  },
  handleRealNameInputChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      realName: value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleMarriedPickerChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      married: this.data.marriedRange[value]
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleReceiveAddressTextAreaChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      receiveAddress: value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleReceiverChange: function(ev) {
    const { value } = ev.detail
    this.setData({
      receiver: value
    }, () => {
      this.checkSubmitDisable()
    })
  },
  handleSubmit: function() {
    const { workingYear, industry, job, region, realName, married, receiveAddress, receiver } = this.data
    let params = {
      address: receiveAddress,
      province: region.split(' ')[0],
      city: region.split(' ')[1],
      function: job,
      industry: industry,
      married: married,
      realName: realName,
      receiver: receiver,
      workingYear: workingYear
    }
    updateProfile(params).then(res => {
      if(res.code === 200) {
        alertMsg('提交成功')
      }
    })
  },
  checkSubmitDisable: function() {
    const { workingYear, industry, job, region, realName, married, receiveAddress, receiver } = this.data
    const enableSubmit = (
      workingYear !== '请选择' && workingYear &&
      industry !== '请选择' && workingYear &&
      job !== '' && job &&
      region !== '请选择' && region &&
      realName !== '' && realName &&
      married !== '以便参加脱单群等活动' && married &&
      receiveAddress !== '' && receiveAddress &&
      receiver !== '' && receiver
    )
    this.setData({ enableSubmit: enableSubmit })
  }
})

