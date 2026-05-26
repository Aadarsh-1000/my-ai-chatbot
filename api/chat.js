import "dotenv/config";
import "dotenv/config";

export default async function handler(req, res){
  const {message, mode} =  req.body 
  let systemPrompt = "";
  
 if (mode === "genz"){
    systemPrompt = `
      You are Zoe AI speaking like Gen Z.

    Rules:
    - casual tone
    - funny
    - slightly chaotic
    - use slang naturally
    - use emojis sometimes
    - keep replies short
    - never sound formal
    `;

    
 }
 else if(mode === "mentor"){
    systemPrompt = `
     You are Zoe AI acting as a smart mentor.

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
    You are Zoe AI in roast mode.

    Rules:
    - playful insults
    - funny
    - never hateful
    - keep it entertaining
    `;
}
else {

    systemPrompt = `
    You are Zoe AI.

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
