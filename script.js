async function send(){
   const input = document.getElementById("messageInput");
     const message = input.value
     const chat = document.getElementById("chat");
     
     chat.innerHTML += `
<div class="usermsg"> ${message}</div>
`;
  window.scrollTo({
   top: document.body.scrollHeight,
   behavior: "smooth"
});
   input.value = "";
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
<div class="aimsg"> ${data.reply}</div>
`;
  window.scrollTo({
   top: document.body.scrollHeight,
   
   behavior: "smooth"
});

}



document.getElementById("messageInput")
.addEventListener("keydown", function(event){
    event.preventDefault();
   if(event.key === "Enter"){
      send();
   }

});