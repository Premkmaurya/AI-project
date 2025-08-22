const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });
  return response.text;
}

async function createVector(content) {

    const response = await ai.models.embedContent({
        model: 'models/embedding-001',
        contents: { 
          parts: [{ text: content }] 
        },
        outputDimensionality: 768,
    });
    
    
    return response.embeddings[0].values ;
}

module.exports = {
    generateResponse,
    createVector
}