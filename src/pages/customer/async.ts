import { pget, ppost } from '../../utils/request'
import * as regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js'

export function loadBaseUserInfo() {
  return pget('/rise/customer/info')
}

export function loadPersonAccount() {
  return pget('/rise/customer/account')
}

export function loadPersonProfile() {
  return pget('/rise/customer/profile')
}

export function loadStudyNotifyStatus() {
  return pget('/rise/message/status/learning/notify')
}

export function openLearningNotify() {
  return ppost('/rise/message/open/learning/notify')
}

export function closeLearningNotify() {
  return ppost('/rise/message/close/learning/notify')
}

export function loadRegionList() {
  return pget('/rise/customer/region')
}

export function updateProfile(params) {
  return ppost('/rise/customer/profile', params)
}