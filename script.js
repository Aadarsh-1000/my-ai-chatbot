async function send(){
   const input = document.getElementById("messageInput");
   chat.innerHTML += `
<div class="usermsg"><b>You:</b> ${message}</div>
`;
     const message = input.value
     const response = await fetch("/api/chat", {
        headers: {
    "Content-Type": "application/json"
  },

  method: "POST",
  body: JSON.stringify({
    message
  })
});



const data = await response.json();

chat.innerHTML += `
<div class="aimsg"><b>AI:</b> ${data.reply}</div>
`;
}