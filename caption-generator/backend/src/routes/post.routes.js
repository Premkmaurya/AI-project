const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const createPostController = require("../controllers/post.controller")
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()})


const router = express.Router();

router.post("/", authMiddleWare,upload.single('image'), createPostController);

module.exports = router;
