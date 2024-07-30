import { message } from "antd";
import { WEBSOCKET_URL } from "../../../Services/Api";
import { setSTyp } from "../../../Services/CreateProjectService";
import { sN } from "../../../Services/ProjectService";

let connection: any;
let errorCount = 0;
let index = 0;

//applet function
//connection function
export function RegUserRadiant(
  randomNum: string,
  setSub: setSTyp,
  successCallback: (respData: any, setSub: setSTyp) => void
) {
  index++;
  if ("WebSocket" in window) {
    setTimeout(function () {
      const ws = new WebSocket(WEBSOCKET_URL);
      ws.onopen = function () {
        // console.log("Connection Opened");
      };

      ws.onmessage = function (evt) {
        try {
          connection = ws;
          // console.log("Connectiion set . calling back");
          getSignature(
            randomNum,

            setSub,
            successCallback
          );
        } catch (err) {
          alert("error catched" + err);
        }
      };

      ws.onerror = function (err) {
        errorCount++;
        if (index == 5 && errorCount == 5) {
          alert("Kindly check the server connection.");
        }
      };
    }, 1);
  }
}

//get signature from emsigner
function getSignature(
  randomNum: string,
  setSub: setSTyp,
  successCallback: (respData: any, setSub: setSTyp) => void
) {
  const signParams = `emsigneraction=sign\ndatatosign=${randomNum}\n
  signaction=sign\nfilepath=\npanNumberParam=\nexpirycheck=false\n
  issuername=\ncertclass=1|2|3\ncerttype=ALL\n`;

  callApplet(signParams, setSub, successCallback);
}

function callApplet(
  signParams: string,
  setSub: setSTyp,
  successCallback: (respData: any, setSub: setSTyp) => void
) {
  if (connection == null) {
    alert("Please check the server connection2");
    return;
  }
  connection.send(signParams);

  connection.onerror = function (error: any) {
    alert("Please check the server connection: " + error);
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
      console.log({ respData });

      return successCallback(respData, setSub);
    }
  };
}

// const successCallback = (fileName: string) => {
//   alert("Your file is signed and replaced to same location and name!");
// };

const failureCallback = (error: any) => {
  message.error("Failed to sign pdf");
  throw Error("Failed");
};
