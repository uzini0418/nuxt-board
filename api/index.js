let express = require('express');

let app = express();

app.get('/', (req, res, next) => {
  res.send('api테스트' + Math.random())
})

app.use('/hello', require('./hello'))
app.use('/socket', require('./socket'))


module.exports = {
  path: '/api',
  handler: app
}
