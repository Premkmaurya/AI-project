const { GoogleGenAI } =  require("@google/genai")


const ai = new GoogleGenAI({});

async function createCaption(imagePath) {
 const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: imagePath,
    },
  },
  { text: "Caption should be short and consise most probably in one line.It should be according to isntagram or facebook.Don't explain the image generate create caption.Use popular hastag and emojis for the image,like #aesthetic,#instagram,#popular.Ex- Travel = peace of mind ❤️✨❤️..#mountains #travelvibes❤️ #trending" },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
});
 return (response.text);
}


module.exports = createCaption;
