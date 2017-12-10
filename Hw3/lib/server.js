const http = require("http");
const nodeStatic = require("node-static");
const path = require("path");
const ws = require("ws");


function handleWsConnection(clientWebSocket) {
    const allClients = this.clients;
    console.log("Connected some client via web socket");
    clientWebSocket.on("message", function (turnData) {
       console.log("Got message: " + turnData);
       for (var i=0; i<allClients.length; ++i) {
           var client = allClients[i];
           if (client != clientWebSocket) {
               client.send(turnData);
           }
       }
   });
}


function startService(port) {
    const contentsRoot = path.resolve(__dirname, "../public");
    const staticHandler = new (nodeStatic.Server)(contentsRoot);
    const httpServer = http.createServer(function (req, resp) {
        /* Here might be some condition to decide how to serve request ... */
        req.addListener("end", function () {
            staticHandler.serve(req, resp);
        }).resume();
    });
    httpServer.listen(port);
    const wserver = ws.createServer({
        server: httpServer,
        path: "/ws"
    });
    wserver.on('connection', handleWsConnection);
}


exports.start = startService;
