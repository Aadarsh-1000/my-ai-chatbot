import "dotenv/config";
import "dotenv/config";
export default async function handler(req, res){
  const {message} =  req.body 
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
   console.log(error);

   console.log(error);
   console.log(error.message);

   res.status(500).json({
      reply: "Backend crashed"
   });
  }
}
  
