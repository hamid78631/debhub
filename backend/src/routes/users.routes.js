const express = require('express')
const router = express.Router()
const { getProfile } = require('../controllers/user.controller')

router.get('/:username', getProfile)

module.exports= router