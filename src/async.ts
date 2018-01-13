import { pget, ppost } from './utils/request'

export const loadSession = (code) => {
  return pget('/wx/oauth/mini/code', { code: code })
}

export const initWeMiniUserInfo = (param: {unionId: string, nickName: string, avatarUrl: string, gender: number}) => {
  return ppost('/account/init', param)
}