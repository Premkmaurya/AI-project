const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({});

async function main(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: chatHistory
  });
  return response.text;
}

module.exports = main;