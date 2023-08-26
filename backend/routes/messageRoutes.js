const express = require('express')

const { postMessage, getMessages  } = require('../controller/messageController')
const authCheck = require( '../middleware/authCheck' )

const router = express.Router()

router.use( authCheck )

router.post('/', postMessage)

router.get( '/:chatId', getMessages )

module.exports = router