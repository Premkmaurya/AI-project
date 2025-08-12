const postModel = require("../model/post.model");
const createCaption = require("../services/ai.services");
const uploadImage = require("../services/storage.services");
const { v4: uuidv4 } = require("uuid");

const createPostController = async (req, res) => {
    const file = req.file;
    const optFir = req.file;
    const optSec = req.file;
    console.log(file);
    const base64ImageData = new Buffer.from(file.buffer).toString("base64");
    const imageCaption = await createCaption(optFir,optSec,base64ImageData);

    const result = await uploadImage(file.buffer, `${uuidv4()}`);

    const createPost = await postModel.create({
        image:result.url,
        caption:imageCaption,
        user:req.user._id
    })

    res.status(201).json({
     createPost
    });
};

module.exports = createPostController;
