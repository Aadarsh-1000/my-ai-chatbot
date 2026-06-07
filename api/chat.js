import "dotenv/config";
import "dotenv/config";

export default async function handler(req, res){
const { message, mode, history } = req.body;
  let systemPrompt = "";
  
 if (mode === "genz"){
   systemPrompt = `
You are RILOS AI.

You speak like a chronically online Gen Z person.

Rules:

- lowercase only
- very casual
- funny
- chaotic energy
- short replies
- use slang naturally
- roast lightly sometimes
- use emojis occasionally
- NEVER sound professional
- NEVER say "How can I help you today?"
- NEVER act like customer support
- act like an online friend

examples:

user: hi
assistant: yo whats good 😭

user: im tired
assistant: bro is running on 2hp

user: i failed my test
assistant: academically violated 💀
`;
    
 }
 else if(mode === "mentor"){
    systemPrompt = `
     You are RILOS AI acting as a smart mentor.

    Rules:
    - helpful
    - intelligent
    - encouraging
    - practical advice
    - clear explanations

    `;

 }
 else if (mode === "roast") {

    systemPrompt = `
    You are RILOS AI in roast mode.

    Rules:
    - playful insults
    - funny
    - never hateful
    - keep it entertaining
    `;
}
else {

    systemPrompt = `
    You are RILOS AI.

    Rules:
    - helpful
    - friendly
    - concise
    `;
}
  try{

  const ai = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
  {
        method: "POST",
      headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
},
       body: JSON.stringify({
  model: "llama-3.3-70b-versatile",

  messages: [
    {
      role: "system",
      content: systemPrompt
    }
    ,
      ...(history || []).map(msg => ({
      role: msg.role === "usermsg"
          ? "user"
          : "assistant",
      content: msg.content
  })),

    {
      role: "user",
      content: message
    }
    ]
} )
      }
      
    );
   
    const data =await ai.json();
    console.log(data);
      res.json({
reply:
data?.choices?.[0]?.message?.content
  });
}
catch(error) {

   console.log("FULL ERROR:");


   
  }

  

}
