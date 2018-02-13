import { pget, ppost } from './request'

export function loadSession(code) {
  return pget('/wx/oauth/mini/code', { code: code })
}

/** 页面打点 */
export function mark(param: {module: string, func: string, action: string, memo?: string}) {
  let markParams = {
    module: param.module,
    function: param.func,
    action: param.action,
    memo: param.memo
  }
  return ppost('/rise/b/mark', param)
}