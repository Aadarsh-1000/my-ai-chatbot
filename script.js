const logoutBtn=document.getElementById("logout")
const googleLogin=document.getElementById("googlelogin")
const mode=document.getElementById("modes")
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
window.onload = function () {
      
    const user = JSON.parse(localStorage.getItem("user"));

    if (user){
        document.getElementById("googlelogin").style.display="none";
       
        document.getElementById("logout").style.display="block";

    }
     else{
       
        document.getElementById("logout").style.display="none";
          document.getElementById("googlelogin").style.display="block";
     }
    google.accounts.id.initialize({
          client_id: "1066541156045-her69mn6bh1av8eo2rin0n2o6n0t5c73.apps.googleusercontent.com",
        callback: handleCredentialResponse,
         auto_select: false,
           cancel_on_tap_outside: true,
           context: "signin", 
            itp_support: true,
           
    });
    google.accounts.id.renderButton(
        document.getElementById("googlelogin"),
        { theme: "outline", size: "large", text: "signin_with" }
    );


    if (!user) {
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.warn("One Tap suppressed by browser:", notification.getNotDisplayedReason());
            } else if (notification.isSkippedMoment()) {
                console.warn("One Tap skipped:", notification.getSkippedMomentReason());
            }
        });
    }
    const chat= document.getElementById("chat");
     history.forEach(msg =>{
        chat.innerHTML += `
        <div class="${msg.role}">
        ${msg.content}
        </div>
        `;

     });
};

   




async function handleCredentialResponse(response) {

    const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: response.credential })

})

    const data = await res.json();

    console.log(data);

    localStorage.setItem("user", JSON.stringify(data.user));
      if (data.success){
      
       document.getElementById("googlelogin").style.display= "none";

    document.getElementById("logout").style.display="block";
 }

}
const user = JSON.parse(localStorage.getItem("user"));



async function send() {

   
    const user = JSON.parse(localStorage.getItem("user"));

     const chat = document.getElementById("chat");
if (!user){

       

        chat.innerHTML += `<div class=aimsg> Please login to use RILOS AI</div>`
        return;
}
    const input = document.getElementById("messageInput");
    const message = input.value.trim()
    if (!message) return;
    

    chat.innerHTML += `
<div class="usermsg"> ${message}</div>
`;
history.push({
    role: "usermsg",
    content: message
});

localStorage.setItem(
    "chatHistory",
    JSON.stringify(history)
);
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
    message,
    mode: document.getElementById("modes").value,
    history
})
    });

    const data = await response.json();

    
const aiMsg = document.createElement("div");
aiMsg.className="aimsg";
aiMsg.innerHTML = marked.parse(data.reply);
chat.appendChild(aiMsg);
history.push({
    role: "aimsg",
    content: data.reply
});

if(history.length > 40){
    history = history.slice(-40);
}

localStorage.setItem(
    "chatHistory",
    JSON.stringify(history)
);
document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
});            

    window.scrollTo({
        top: document.body.scrollHeight,

        behavior: "smooth"
    });

}

document.addEventListener("keydown", function (event) {

    if (event.target.id === "messageInput" && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }

});




 function logout(){
    localStorage.removeItem("user");
   google.accounts.id.disableAutoSelect(); 
    google.accounts.id.cancel();
 document.getElementById("logout").style.display="none"
 
document.getElementById("googlelogin").style.display="block"

  window.location.reload();

 }


function Login(){

    google.accounts.id.prompt();

}