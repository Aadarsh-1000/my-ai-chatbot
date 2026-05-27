const logoutBtn=document.getElementById("logout")
const googleLogin=document.getElementById("google-login")
const mode=document.getElementById("modes")

window.onload = function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user){
        document.getElementById("google-login").style.display="none";
       
        document.getElementById("logout").style.display="block";

    }
     else{
       
        document.getElementById("logout").style.display="none";
          document.getElementById("google-login").style.display="block";
     }
    google.accounts.id.initialize({
          client_id: "1066541156045-her69mn6bh1av8eo2rin0n2o6n0t5c73.apps.googleusercontent.com",
        callback: handleCredentialResponse,
         auto_select: false,
           cancel_on_tap_outside: true
    });

   google.accounts.id.renderButton(
document.getElementById("google-login"),
{
    theme: "filled_white",
size: "large",
    shape: "circle",

    width: 200
}
);

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
      
       document.getElementById("google-login").style.display= "none";

    document.getElementById("logout").style.display="block";
 }

}
const user = JSON.parse(localStorage.getItem("user"));



async function send() {

   
    const user = JSON.parse(localStorage.getItem("user"));

     const chat = document.getElementById("chat");
if (!user){

       

        chat.innerHTML += `<div class=aimsg> Please login to use Zoe AI</div>`
        return;
}
    const input = document.getElementById("messageInput");
    const message = input.value.trim()
    if (!message) return;
    

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
    message,
    mode: document.getElementById("modes").value
})
    });

    const data = await response.json();

    
const aiMsg = document.createElement("div");
aiMsg.className="aimsg";
aiMsg.innerHTML = marked.parse(data.reply);
chat.appendChild(aiMsg);

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
 
document.getElementById("google-login").style.display="block"

  window.location.reload();

 }
