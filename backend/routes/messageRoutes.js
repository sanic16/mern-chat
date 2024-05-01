const express = require('express')
const privateRoute = require('./../middleware/authMiddlware')
const {
    sendMessage,
    getMessages
} = require('./../controllers/messageController')

const router = express.Router()

router.post('/send/:id', privateRoute, sendMessage)
router.get('/:id', privateRoute, getMessages)

module.exports = router