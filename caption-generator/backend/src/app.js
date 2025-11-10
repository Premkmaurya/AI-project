const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth.routes')
const postRoutes = require('./src/routes/post.routes')
const cors = require('cors')
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)


app.use(express.static(path.join(__dirname, "../public")));

app.get("*name",(req,res)=>{
	res.sendFile(path.join(__dirname,"../public/index.html"))
})

module.exports = app;