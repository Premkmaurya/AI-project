const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { generateResponse, createVector } = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const getToken = cookie.parse(socket.handshake.headers.cookie || "");
    if (!getToken.token) {
      return next(new Error("unautharised."));
    }

    try {
      const decoded = jwt.verify(getToken.token, process.env.JWT_SECRET);
      const user = await userModel.findOne({
        _id: decoded.id,
      });
      socket.user = user;
      next();
    } catch (err) {
      console.log("error occured", err);
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      const [userMessage, vectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chatId,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        }),
        createVector(messagePayload.content),
      ]);
      await createMemory({
        messageId: userMessage._id,
        vectors,
        metadata: {
          chat: messagePayload.chatId,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });
      const [memory, chatHistory] = await Promise.all([
        queryMemory({
          queryVector: vectors,
          limit: 3,
          metadata: {},
        }),
        messageModel
          .find({ chat: messagePayload.chatId })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((results) => results.reverse()),
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `these are some previous messags from the chat,use them to generate a response
               ${memory.map((item) => item.metadata.text).join("\n")}
					`,
            },
          ],
        },
      ];

      const response = await generateResponse([...ltm, ...stm]);

      socket.emit("ai-response", {
        content: response,
        chatId: messagePayload.chatId,
      });

      const [responseMessage, responseVector] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chatId,
          user: socket.user._id,
          content: response,
          role: "model",
        }),
        createVector(response),
      ]);
      await createMemory({
        vectors: responseVector,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chatId,
          user: socket.user._id,
          text: response,
        },
      });
    });

    socket.on("disconnect", (socket) => {
      console.log("server is disconnected.");
    });
  });
}

module.exports = setupSocketServer;
