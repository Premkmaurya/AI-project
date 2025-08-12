const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})

const userModel = mongoose.model('user',userData);

module.exports = userModel;