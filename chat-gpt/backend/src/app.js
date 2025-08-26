const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')
const authUser = require('./middleware/auth.user')
const getMessages = require('./controllers/message.controller')

const app = express();


app.use(cors({
	origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/chat',chatRoutes);
app.get("/api/message/:_id",authUser,getMessages)

module.exports = app;