let express = require('express')
let router = express.Router()

router.get('/test', (req, res) => {
  res.status(200).json({
    'code': 200,
    'msg': 'hello world'
  })
})

module.exports = router