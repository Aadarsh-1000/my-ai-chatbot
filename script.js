async function send(){
    const input = document.getElementById('input')
     const message = input.value
     const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({
    message
  })
});


const data = await response.json();
document.getElementById("chat").innerHTML += `
  <p><b>You:</b> ${message}</p>
  <p><b>AI:</b> ${data.reply}</p>
`;
}