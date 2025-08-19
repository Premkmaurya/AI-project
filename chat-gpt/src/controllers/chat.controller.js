const chatModel = require("../models/chat.model.js")

const = createChat=(req,res)=>{
       const {title} = req.body;
       const user= req.user;
       const chat = await chatModel.create({
         title:title,
         user:user
       })

}

module.exports = createChat;
