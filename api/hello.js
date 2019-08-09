const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('socket!' + Math.random())
})


module.exports = router
