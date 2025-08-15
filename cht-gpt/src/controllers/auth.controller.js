const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req,res) {
	const {fullName,email,password} = req.body;

	const isUserExist = userModel.findOne({email});

	if(isUserExist){
		res.status(400).json({
			message:"user already exist."
		})
	}

	const hashPassword = bcrypt.hash(password,10);

	const user = userModel.create({
		fullName:{
			firstName,lastName
		},
		email,
		password:hashPassword
	})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token);

    res.status(201).json({
    	message:"user registered successfully.",
    	_id:user._id,
    	email:email,
    	fullName:fullName
    })

}


module.exports = {
    registerUser
}