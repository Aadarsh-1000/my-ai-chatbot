window.onload = function () {

    google.accounts.id.initialize({
        client_id: "1066541156045-her69mn6bh1av8eo2rin0n2o6n0t5c73.apps.googleusercontent.com",
        callback: handleCredentialResponse
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
        body: JSON.stringify({
            token: response.credential
        })
    });

    const data = await res.json();

    console.log(data);

    localStorage.setItem("user", JSON.stringify(data.user));

}
const user = JSON.parse(localStorage.getItem("user"));



async function send() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim()
    if (!message) return;
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

document.addEventListener("keydown", function (event) {

    if (event.target.id === "messageInput" && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }

});




 function logout(){
    localStorage.removeItem("user");
    window.location.reload();
    window.alert("your logged out!!")

 }