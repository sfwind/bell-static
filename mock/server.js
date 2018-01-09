let express = require('express')
let app = express()

app.use(require('./router'))

let ip = '0.0.0.0'
let port = 5000

app.get('/', (req, res) => {
  res.send('Mock 启动成功！')
})

app.listen(port, ip, (err) => {
  if(err) {
    console.error(err)
    return
  }
  console.log('==> Mock 启动成功，地址为：http://%s:%s/', ip, port)
})