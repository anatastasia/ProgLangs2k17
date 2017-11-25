const hosthame = window.location.hostname;
const portNumber = window.location.port;
const wsPath = "ws://"+hosthame+":"+portNumber+"/ws";
const ws = new WebSocket(wsPath);
ws.addEventListener("message", function (event) {
    const messages = document.getElementById("messages");
    const msg = document.createElement("div");
    const data = JSON.parse(event.data);
    msg.innerText = "From [" + data.browser + "]: "+ data.text;
    messages.appendChild(msg);
});

function sendMessage() {
    const input = document.getElementById("input");
    const text = input.innerHTML;
    const messageToSend = {
        text: text,
        browser: navigator.userAgent
    };
    ws.send(JSON.stringify(messageToSend));
    const myMsg = document.createElement("div");
    myMsg.innerText = text;
    myMsg.classList.add("myself");
    messages.appendChild(myMsg);
}

function drawField() {
    for (var i = 0; i < 10; i++) {
        var row = document.querySelector("table").insertRow(i)
        for (var j = 0; j < 10; j++) {
            var cell = row.insertCell(j);
            cell.id = String(i) + ":" + String(j);
            cell.addEventListener("click", function(event) {
                cell.innerText = "♞";
            });
        }
    }
}