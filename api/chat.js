import "dotenv/config";

import { ChatGroq } from "@langchain/groq";

import {
RunnableWithMessageHistory
}
from "@langchain/core/runnables";

import {
HumanMessage
}
from "@langchain/core/messages";

import { ChatMessageHistory }
from "langchain/stores/message/in_memory";

const memoryStore = {};

function getSessionHistory(sessionId){

if(!memoryStore[sessionId]){

memoryStore[sessionId] =
new ChatMessageHistory();

}

return memoryStore[sessionId];

}

const model = new ChatGroq({

apiKey: process.env.GROQ_API_KEY,

model: "llama-3.3-70b-versatile",

temperature: 0.7

});

const chain = new RunnableWithMessageHistory({

runnable: model,

getMessageHistory: async(sessionId)=>{

return getSessionHistory(sessionId);

},

inputMessagesKey: "input"

});

export default async function handler(req, res){

try{

const { message, conversationId } = req.body;

const response = await chain.invoke(

{
input: [
new HumanMessage(message)
]
},

{
configurable: {
sessionId: conversationId
}
}

);

res.json({

reply: response.content

});

}

catch(error){

console.log("FULL ERROR:");
console.log(error);

res.status(500).json({
reply: "Backend crashed"
});

}

}