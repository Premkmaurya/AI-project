const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req,res) {
	const {fullName:{firstName,lastName},email,password} = req.body;

	const isUserExist = await userModel.findOne({email});

	if(isUserExist){
		res.status(400).json({
			message:"user already exist."
		})
	}

	const hashPassword = await bcrypt.hash(password,10);

	const user = await userModel.create({
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
    })

}

async function loginUser(req,res) {
	const {email,password} = req.body;

	const user = await userModel.findOne({email});
	if (!user) {
		return res.status(401).json({
			message:"email id is incorrect."
		})
	}

	const isPasswordCorrect = await bcrypt.compare(password,user.password);
	if (!isPasswordCorrect) {
		return res.status(401).json({
			message:"password is incorrect."
		})
	}

	const token = await jwt.sign({id:user._id},process.env.JWT_SECRET);
	res.cookie("token",token)

	res.status(201).json({
		message:"user logged in successfully.",
		_id:user._id
	})

}

module.exports = {
    registerUser,
    loginUser
}