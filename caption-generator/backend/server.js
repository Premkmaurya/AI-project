require('dotenv').config();
const app = require('./src/app')
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/db/db');
const authRoutes = require('./src/routes/auth.routes')
const postRoutes = require('./src/routes/post.routes')
const cors = require('cors')



connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)


app.listen(3000,()=>{
    console.log('server is listen at port 3000.');
})