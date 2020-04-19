const express = require('express')

const ChatController = require('./controllers/ChatController')

const routes = express.Router()

routes.get('/', ChatController.index)


module.exports = routes