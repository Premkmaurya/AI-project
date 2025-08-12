const userModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs')



async function registerController(req, res) {
  const { email , password } = req.body;
  let isUserExist = await userModel.findOne({
    email: email
  });
  if (isUserExist) {
    return res.status(400).json({
      message: "user already registered.",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    password: hashPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  res.cookie("token", token,{
    sameSite:"none",
    secure:true
  });
  res.status(201).json({
    message: "user registered successfully.",
    user,
    token,
  });
}
async function loginController(req, res) {
  const { email, password } = req.body;
  let user = await userModel.findOne({
    email: email,
  });
  if (!user) {
    return res.status(400).json({ message: "User not registered." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect." });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  res.cookie("token", token);
  res.status(201).json({
    message: "user login successfully.",
    email: user.email,
    id: user._id,
    token
  });
}

module.exports = {
  registerController,
  loginController,
};
