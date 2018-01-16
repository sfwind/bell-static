import { pget } from '../../utils/request'

export function loadBaseUserInfo() {
  return pget('/rise/customer/info')
}

export function loadPersonAccount() {
  return pget('/rise/customer/account')
}

export function loadPersonProfile() {
  return pget('/rise/customer/profile')
}