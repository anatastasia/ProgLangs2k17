const hosthame = window.location.hostname;
const portNumber = window.location.port;
const wsPath = "ws://"+hosthame+":"+portNumber+"/ws";
const ws = new WebSocket(wsPath);
ws.onmessage = function(data) {
    var position = data.data.substr(5)
    var cell = document.getElementById(position)
    cell.innerText = "♞";
}

function drawField() {
    for (var i = 0; i < 10; i++) {
        var row = document.querySelector("table").insertRow(i)
        for (var j = 0; j < 10; j++) {
            var cell = row.insertCell(j);
            cell.id = String(i) + ":" + String(j);
            cell.addEventListener("click", function(event) {
                this.innerText = "♞";
                ws.send(["turn", this.id])
            });
        }
    }
}
