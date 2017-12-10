const hosthame = window.location.hostname;
const portNumber = window.location.port;
const wsPath = "ws://"+hosthame+":"+portNumber+"/ws";
const ws = new WebSocket(wsPath);
var ownMark = "Z";

ws.onmessage = function(messageData) {
    var parsedData = JSON.parse(messageData.data);

    if ("position" in parsedData) {
        var position = parsedData["position"];
        var opponentMark = parsedData["opponentMark"]
        var cell = document.getElementById(position);
        cell.innerText = opponentMark;
    } else if ("initMark" in parsedData) {
        ownMark = parsedData["initMark"];
    }
}

function drawField() {
    for (var i = 0; i < 10; i++) {
        var row = document.querySelector("table").insertRow(i);

        for (var j = 0; j < 10; j++) {
            var cell = row.insertCell(j);
            cell.id = String(i) + ":" + String(j);

            cell.addEventListener("click", function(event) {
                this.innerText = ownMark;
                ws.send(JSON.stringify(
                    {
                        "position": this.id,
                        "opponentMark": ownMark
                    }
                ));
            });
        }
    }
}
