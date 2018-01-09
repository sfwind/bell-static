import './libs/regenerator-runtime'

App({
  onLaunch: async () => {
    let result = await takeLongTime()
    console.log('bbb')
  }
})

function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('aaa')
      resolve('long_time_value')
    }, 1000)
  })
}