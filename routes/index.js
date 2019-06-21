const express = require('express')

const note = require('./note')
const router = express.Router()

router.get('/health', (req, res) => {
    res.send('OK')
  })

// Note api
router.use('/note', note)
module.exports = router