export default async function handler(req, res){
  const {message} =  req.body 
    const ai = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
      res.json({
    reply: data.candidates[0].content.parts[0].text
  });

}
