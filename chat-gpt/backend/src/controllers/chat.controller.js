const chatModel = require("../models/chat.model.js")

const createChat = async (req,res)=>{
       const {title} = req.body;
       const user= req.user;

       const chat = await chatModel.create({
         title:title,
         user:user._id
       })
       res.status(201).json({
        message:'chat created successfully.',
        chat:{
          title:chat.title,
          id:chat._id
        }
       })

}
const getChat = async (req,res)=>{
       const user= req.user;

       const chat = await chatModel.find({
         user:user._id
       })
       res.status(201).json({
        message:'chat find successfully.',
        chat:{
          title:[...chat],
          id:chat._id
        }
       })

}

module.exports = {
  createChat,
  getChat
};
