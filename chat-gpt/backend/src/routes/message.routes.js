const express = require('express')
const authUser = require('../middleware/auth.user')
const getMessages = require('../controllers/message.controller')


const router = express.Router();


router.post('/:id',authUser,getMessages)


module.exports = router