const userModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");


async function authMiddleWare(req, res,next){
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "user unauthoried",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "unauthoried user.",
    });
  }
}

module.exports=authMiddleWare