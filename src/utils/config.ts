declare let wx: any

// URL 请求前缀
const DomainConfig = {
  app_domain: 'https://www.confucius.mobi',
  docker_domain: 'http://duanxf.confucius.mobi',
  local_domain: 'http://localhost:8080'
}

// 配置请求路径
const URL_PREFIX = DomainConfig.local_domain

if(URL_PREFIX === DomainConfig.app_domain) {
  wx.setStorageSync('session', {
    expireDate: 1579164870615,
    state: 'n983q0wfpt9x4uq2x300fnqyb97t4u7f'
  })
}

export { URL_PREFIX }