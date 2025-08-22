const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
  apiKey: process.env.PINCONE_API_KEY,
});

const chatGptIndex = pc.index('chat-gpt');

async function createMemory({vectors,metadata,messageId}){
  await chatGptIndex.upsert([{
    id:messageId,
    values:vectors,
    metadata
  }])
}

async function queryMemory({queryVector,limit=5,metadata}) {
  const data = await chatGptIndex.query({
      vector:queryVector,
      topk:limit,
      filter:metadata?metadata:undefined,
      inclueMetadata:true
    })
  return data.matches
}

module.exports = {createMemory,queryMemory}