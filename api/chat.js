import "dotenv/config";
import "dotenv/config";
export default async function handler(req, res){
  const {message} =  req.body 
  try{

  const ai = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
      
    );
   
    const data =await ai.json();
    console.log(data);
      res.json({
reply: data?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data)
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
  
