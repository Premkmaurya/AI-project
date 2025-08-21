const express = require('express')
const authUser = require('../middleware/auth.user')
const chatController = require('../controllers/chat.controller')


const router = express.Router();


router.post('/',authUser,chatController)


module.exports = router