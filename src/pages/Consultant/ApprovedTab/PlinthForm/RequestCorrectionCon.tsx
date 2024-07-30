import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GETrequestCorrectionByPid,
  ReqCorrectionByPidBody,
} from "../../../../Services/RequestCorrectionService";

const RequestCorrectionModalCon = () => {
  const params = useParams();

  const [remarksReqCorrection, setRemarksReqCorrection] = useState<
    ReqCorrectionByPidBody[]
  >([]);

  useEffect(() => {
    GETrequestCorrectionByPid(params.pid ?? "0").then((res) => {
      setRemarksReqCorrection(res.data);
    });
    return () => {
      setRemarksReqCorrection([]);
    };
  }, []);

  const getSorted = (): ReqCorrectionByPidBody[] => {
    return remarksReqCorrection.filter(
      (remarks) =>
        remarks.type ===
        (params.type === "plinth" ? "Plinth" : "Superstructure")
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
      }}
    >
      <div style={{ width: 500, paddingTop: 30, padding: 20 }}>
        <h2>Corrections:</h2>

        <div className="MyTableOuter">
          <table className="MyTable" style={{ minWidth: 400, fontSize: 11.5 }}>
            <thead>
              <tr>
                <th style={{ width: 20 }}>ID</th>
                <th>Message</th>
                <th>Project Id</th>
              </tr>
            </thead>
            <tbody>
              {getSorted().map((remarksReqCorr) => (
                <tr key={remarksReqCorr.id}>
                  <td>{remarksReqCorr.id}</td>
                  <td>{remarksReqCorr.message}</td>
                  <td>{remarksReqCorr.projectPerma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestCorrectionModalCon;
