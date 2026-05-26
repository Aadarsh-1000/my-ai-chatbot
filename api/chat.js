import "dotenv/config";

import { ChatGroq } from "@langchain/groq";

import {
  HumanMessage,
  AIMessage
} from "@langchain/core/messages";

const memoryStore = {};

export default async function handler(req, res) {

  try {

    const { message, userId } = req.body;

    // create user memory
    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    // get conversation history
    const history = memoryStore[userId];

    // add user message
    history.push(
      new HumanMessage(message)
    );

    // create model
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.1
    });

    // invoke model with history
    const result = await model.invoke(history);

    // save ai response
    history.push(
      new AIMessage(result.content)
    );

    // send response
    res.status(200).json({
      reply: result.content
    });

  }

  catch (error) {

    console.log("FULL ERROR:", error);

    res.status(500).json({
      reply: "Something went wrong"
    });

  }

}