const chatModel = require("../models/chat.model.js")

const getMessages = async (req,res)=>{
       const {id} = req.params.id;
       const user= req.user;

       const chat = await chatModel.find({
         _id:id
       })
       console.log(chat)
       res.status(201).json({
        message:'chat created successfully.',
        chat:{
          title:chat.title,
          id:chat._id
        }
       })

}

module.exports = getMessages;