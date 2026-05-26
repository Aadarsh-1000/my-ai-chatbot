import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

  const memoryStore={};

  export default async function handler(req, res){

    try{

  const {message, userId}= req.body;
  if (!memoryStore[userId]){
    memoryStore[userId] = new BufferMemory({
  returnMessages: true,
  memoryKey:  "history"

    });

  }

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.1
  });
    const chain = new ConversationChain({
        llm: model,
        memory: memoryStore[userId]
      });
  const result = await chain.call({
    input: message
  });

  result.response
  res.json({
    reply: result.response
  });



  }
  catch(error) {

    console.log("FULL ERROR:");

    }
  }
    
