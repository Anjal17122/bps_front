const ListeningPort = 8080;
let index = 0;
const WebSocketClient = require("websocket").client;

function SetConnectionPort() {
  index++;
  if ("WebSocket" in window) {
    setTimeout(function () {
      var ws = new WebSocket("wss://127.0.0.1:" + port);
      ws.onopen = function () {
        console.log("Connection Opened");
      };

      ws.onmessage = function (evt) {
        try {
          connection = ws;
          // alert("first "+evt.data);
          console.log("Connectiion set . calling back");
          connectionSet();
        } catch (err) {
          alert("error catched");
        }
      };

      ws.onerror = function (err) {
        errorCount++;
        if (index == 5 && errorCount == 5) {
          alert("Kindly check the server connection.");
          failedToConnect();
        }
      };
    }, 1);
  }
}

SetConnectionPort();

// curl --include \
// --no-buffer \
// --header "Connection: Upgrade" \
// --header "Upgrade: websocket" \
// --header "Host: localhost:8080" \
// --header "Origin: http://localhost:8080" \
// --header "Sec-WebSocket-Version: 13" \
// http://localhost:8080
