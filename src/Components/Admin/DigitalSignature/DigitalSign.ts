import { message } from "antd";
import { municipalityDetails } from "../../../constants/constants";
import { setSTyp } from "../../../Services/CreateProjectService";
import { sN } from "../../../Services/ProjectService";

let connection: any;
let errorCount = 0;
let index = 0;
let port = 8080;
const PortList = [8080, 1645, 1812, 2083, 2948];
const WEBSOCKET = "wss://127.0.0.1:";
const WEBSOCKET_URL = WEBSOCKET + port;

// function SetConnectionPort(
//   port: number,
//   connectionSet: () => void,
//   failedToConnect: () => void
// ) {
//   index++;
//   if ("WebSocket" in window) {
//     setTimeout(function () {
//       var ws = new WebSocket("wss://127.0.0.1:" + port);
//       ws.onopen = function () {
//         console.log("Connection Opened");
//       };

//       ws.onmessage = function (evt) {
//         try {
//           connection = ws;
//           // alert("first "+evt.data);
//           console.log("Connectiion set . calling back");
//           connectionSet();
//         } catch (err) {
//          throw alert("error catched");
//         }
//       };

//       ws.onerror = function (err) {
//         errorCount++;
//         if (index == 5 && errorCount == 5) {
//          throw alert("Kindly check the server connection.");
//           failedToConnect();
//         }
//       };
//     }, 1);
//   }
// }

// function startConnection() {
//   for (var i = 0; i < PortList.length; i++) {
//     SetConnectionPort(PortList[i], connectionSet, failedToConnect);
//   }
// }

//applet function
//connection function
export function SignDocument(
  coordinate: string,
  pid: sN,
  setSub: setSTyp,
  successCallback: (respData: string, id: sN, setSub: setSTyp) => void
) {
  index++;
  if ("WebSocket" in window) {
    setTimeout(function () {
      const ws = new WebSocket(WEBSOCKET_URL);
      ws.onopen = function () {
        console.log("Connection Opened");
      };

      ws.onmessage = function (evt) {
        try {
          connection = ws;

          getSignature(coordinate, pid, setSub, successCallback);
        } catch (err) {
          throw message.error("error catched" + err);
        }
      };

      ws.onerror = function (err) {
        errorCount++;
        port = PortList[1];
        ws.onopen;
        throw message.error("cannot create websocket connection!");
        if (errorCount === 1) {
          console.log({ port });
        } else if (errorCount === 2) {
          port = PortList[2];
          console.log({ port });
        } else if (errorCount === 3) {
          port = PortList[3];
          console.log({ port });
        } else if (errorCount === 4) {
          port = PortList[4];
          console.log({ port });
        } else if (index == 5 && errorCount == 5) {
          throw alert("Kindly check the server connection.");
        }
      };
    }, 1000);
  }
}

//get signature from emsigner
function getSignature(
  coordinate: string,
  pid: sN,
  setSub: setSTyp,
  successCallback: (respData: any, id: sN, setSub: setSTyp) => void
) {
  const signParams =
    "emsigneraction=pdfsign\ntbs=" +
    "" +
    "\noutputpath=" +
    "" +
    "\nsignaction=4\ncerttype=ALL\nexpirycheck=true\nissuername=\nsigntype=detached\ncoordinate=" +
    coordinate +
    "\npageno=1\nreason=sign\nlocation=" +
    municipalityDetails.address1;
  callApplet(signParams, pid, setSub, successCallback);
}

function callApplet(
  msgTxt: string,
  pid: sN,
  setSub: setSTyp,
  successCallback: (respData: any, id: sN, setSub: setSTyp) => void
) {
  if (connection == null) {
    message.error("Please check the server connection2");
    return;
  }
  connection.send(msgTxt);

  connection.onerror = function (error: any) {
    message.error("Please check the server connection: " + error);
    (document as any).getElementById("signData").value = error;
    return failureCallback(error);
  };
  connection.onmessage = function (e: any) {
    const msg = "signing canceled";
    if (e.data === msg) {
      return failureCallback(new Error(msg));
    }
    if (e.data.indexOf("subProtocol") == -1) {
      const respData = e.data;
      return successCallback(respData, pid, setSub);
    }
  };
}

const failureCallback = (error: any) => {
  message.error("Failed to sign pdf");
  throw Error("Failed");
};
