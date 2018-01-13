import { pget } from '../../utils/request'

export function loadPersonInfo() {
  return pget('/rise/customer/account')
}