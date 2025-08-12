const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('database connected.')
    })
    .catch((err)=>{
        console.log("server is not connected to db.");
    })
}

module.exports = connectDB;