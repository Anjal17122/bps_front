import { useEffect, useState } from "react";
import "./ViewDigitalSignatureLocal.scss";
import { useParams } from "react-router-dom";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import "./DigitalSignatureDrawings.scss";
import {
  DocumentSignDto,
  GetDrawingsSignPosition,
  GetDrawingsSignPositionBody,
  GetFilesWithSign,
  GetFilesWithSignBody,
  GetTypeByProjectId,
  getLatestPDFLog,
  patchSignedDrawings,
  signType,
} from "../../Services/DigitalSignatureService";
import {
  CheckCircleTwoTone,
  FormOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { imgFolders, PDF_URL } from "../../Services/Api";
import { Divider, Popconfirm, Popover, message } from "antd";
import { checkIfPDF } from "../../pages/Consultant/ProjectCreate/Project/LandInfo/LandCard";
import MyInfoBtn from "../../Common/InfoIcon/MyInfoBtn";
import { useStoreGlobal } from "../../Store/StoreGlobal/StoreGlobal";
import DrawingsSignLogs from "./DrawingsSignLogs";
import { municipalityDetails } from "../../constants/constants";
import { isMandandeupur, isNagarjun } from "../../constants/CommonFunctions";

const DigitalSignatureDrawings = () => {
  const params = useParams();

  const [files, setFiles] = useState<GetFilesWithSignBody[]>();

  const [messageApi, contextHolder] = message.useMessage();

  const { disabled: submitting } = useStoreGlobal();

  const [reRender, setReRender] = useState(false);

  const [positionData, setPositionData] =
    useState<GetDrawingsSignPositionBody[]>();

  const [projectType, setProjectType] = useState<string>("");

  useEffect(() => {
    GetFilesWithSign(params.pid ?? 0, messageApi).then((res) => {
      setFiles(res.data);
      GetDrawingsSignPosition(messageApi).then((res) => {
        setPositionData(res.data);
      });
    });
    GetTypeByProjectId(params.pid ?? 0, messageApi).then((res) => {
      setProjectType(res.data);
    });
    return () => {
      setFiles(undefined);
    };
  }, [reRender]);

  const positionList = positionData?.map((positi) => positi.position);

  const getCurrentPosition = (myrole: "1" | "2" | "3" | "4") => {
    if (positionList?.includes(myrole)) {
      return true;
    } else {
      return false;
    }
  };

  const handleViewPDF = (name: string) => {
    getLatestPDFLog(name, messageApi).then((res) => {
      const url = PDF_URL + `/${imgFolders.drawings}/${res.data}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  };

  const getSignedOrNot = (
    file: GetFilesWithSignBody,
    type: signType,
    signer: keyof DocumentSignDto,
    folderType:
      | "architectural"
      | "structural"
      | "electrical"
      | "sanitation"
      | "analysisreport"
      | "analysisfile"
      | "soilTestReport",
    disabled: boolean
  ): React.ReactNode => {
    const fileName = file.fileName.replaceAll(".", "/");
    return file.documentSignDtos.length ? (
      checkIfDrawingSigned(file, type, signer) ? (
        <>
          {/* <a
            href={PDF_URL + `/${imgFolders.drawings}/${file.fileName}`}
            target={"_blank"}
            rel="noreferrer noopener"
          > */}
          <button
            className="GreyButton"
            style={{ padding: "4px 4px" }}
            onClick={() => handleViewPDF(file.fileName)}
          >
            <CheckCircleTwoTone twoToneColor="#52c41a" /> View
          </button>{" "}
          {/* </a> */}
          <Popconfirm
            disabled={submitting}
            title={
              <div style={{ color: "grey" }}>
                This signed data will be removed.
                <br />
                Are you sure?
              </div>
            }
            onConfirm={() => {
              const id = file.documentSignDtos.filter(
                (doc) => doc.signType === type
              )[0].id;
              handleReset(id, signer);
            }}
            onCancel={() => messageApi.error("Cancelled!")}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="GreyButton"
              style={{ padding: "4px 4px", color: "#fb7185" }}
            >
              <RedoOutlined style={{ color: "#fb7185" }} /> Undo
            </button>
          </Popconfirm>
        </>
      ) : file.documentSignDtos.length ? (
        disabled ? (
          <Link
            target={"_blank"}
            rel="noreferrer noopener"
            to={`/sign/drawings/${params.pid}/${type}/${file.id}/${signer}/${folderType}/${fileName}/${file.fileSize}`}
          >
            <button className="GreyButton">
              <FormOutlined style={{ fontSize: 10 }} /> Sign
            </button>
          </Link>
        ) : null
      ) : null
    ) : !disabled ? null : (
      <Link
        target={"_blank"}
        rel="noreferrer noopener"
        to={`/sign/drawings/${params.pid}/${type}/${file.id}/${signer}/${folderType}/${fileName}/${file.fileSize}`}
      >
        <button className="GreyButton">
          <FormOutlined style={{ fontSize: 10 }} /> Sign
        </button>
      </Link>
    );
  };

  const handleReset = (id: number, signer: keyof DocumentSignDto) => {
    patchSignedDrawings({ id: id, [signer]: 0 }, messageApi).then(() => {
      messageApi.success("Signed data removed!");
      setReRender((prev) => !prev);
    });
  };

  function renderTableRows(
    file: GetFilesWithSignBody,
    type:
      | "architectural"
      | "structural"
      | "electrical"
      | "sanitation"
      | "analysisreport"
      | "analysisfile"
      | "soilTestReport"
  ) {
    if (projectType === "Already Build Building(Regular)" && isNagarjun()) {
      return (
        <tr>
          <td>नियमित</td>
          <td>
            {getSignedOrNot(
              file,
              "Regular",
              "examinerSignBy",
              type,
              getCurrentPosition("1")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Regular",
              "engineerSignBy",
              type,
              getCurrentPosition("2")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Regular",
              "recommenderSignBy",
              type,
              getCurrentPosition("3")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Regular",
              "approvedSignId",
              type,
              getCurrentPosition("4")
            )}
          </td>
        </tr>
      );
    } else if (projectType === "Already Build Building" && isMandandeupur()) {
      return (
        <tr>
          <td>अभिलेखीकरण</td>
          <td>
            {getSignedOrNot(
              file,
              "Plinth",
              "examinerSignBy",
              type,
              getCurrentPosition("1")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Abhilekhikaran",
              "engineerSignBy",
              type,
              getCurrentPosition("2")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Plinth",
              "recommenderSignBy",
              type,
              getCurrentPosition("3")
            )}
          </td>
          <td>
            {getSignedOrNot(
              file,
              "Plinth",
              "approvedSignId",
              type,
              getCurrentPosition("4")
            )}
          </td>
        </tr>
      );
    } else {
      return (
        <>
          <tr>
            <td>प्लिन्थ</td>
            <td>
              {getSignedOrNot(
                file,
                "Plinth",
                "examinerSignBy",
                type,
                getCurrentPosition("1")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "Plinth",
                "engineerSignBy",
                type,
                getCurrentPosition("2")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "Plinth",
                "recommenderSignBy",
                type,
                getCurrentPosition("3")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "Plinth",
                "approvedSignId",
                type,
                getCurrentPosition("4")
              )}
            </td>
          </tr>
          <tr>
            <td>सुपर स्ट्रकचर</td>
            <td>
              {getSignedOrNot(
                file,
                "SuperStructure",
                "examinerSignBy",
                type,
                getCurrentPosition("1")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "SuperStructure",
                "engineerSignBy",
                type,
                getCurrentPosition("2")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "SuperStructure",
                "recommenderSignBy",
                type,
                getCurrentPosition("3")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "SuperStructure",
                "approvedSignId",
                type,
                getCurrentPosition("4")
              )}
            </td>
          </tr>
          <tr>
            <td>निर्माण सम्पन्न</td>
            <td>
              {getSignedOrNot(
                file,
                "NirmanSampanna",
                "examinerSignBy",
                type,
                getCurrentPosition("1")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "NirmanSampanna",
                "engineerSignBy",
                type,
                getCurrentPosition("2")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "NirmanSampanna",
                "recommenderSignBy",
                type,
                getCurrentPosition("3")
              )}
            </td>
            <td>
              {getSignedOrNot(
                file,
                "NirmanSampanna",
                "approvedSignId",
                type,
                getCurrentPosition("4")
              )}
            </td>
          </tr>
        </>
      );
    }
  }

  const mapData = (
    type:
      | "architectural"
      | "structural"
      | "electrical"
      | "sanitation"
      | "analysisreport"
      | "analysisfile"
      | "soilTestReport"
  ) => {
    return files?.map((file) => {
      if (file.fileType === type) {
        return (
          <div className="DrawingSignersDiv MyTableOuter" key={file.id}>
            <div
              style={{
                marginBottom: 5,
                paddingLeft: 5,
                paddingBottom: 10,
                paddingTop: 5,
              }}
            >
              <div style={{ position: "absolute", top: 5, right: 10 }}>
                <Popover
                  content={<DrawingsSignLogs name={file.fileName} />}
                  title="Old Signed Logs"
                  trigger="click"
                >
                  <button className="NoStyleBtnTiny">logs</button>
                </Popover>
                |
                {checkIfPDF(file.fileName) ? (
                  <a
                    href={PDF_URL + `/${imgFolders.drawings}/${file.fileName}`}
                    target={"_blank"}
                    rel="noreferrer noopener"
                  >
                    <button className="NoStyleBtnTiny"> old file</button>
                  </a>
                ) : null}
                {/* <button className="NoStyleBtnTiny">old</button> */}
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: "#bfbfbf" }}>File: </span>
                <b style={{ fontWeight: 400, color: "rgba(52, 65, 97, 0.5)" }}>
                  {file.fileName}
                </b>{" "}
                <Divider type="vertical"></Divider>{" "}
                {checkIfPDF(file.fileName) ? (
                  <button
                    className="NoStyleBtnSm"
                    onClick={
                      () => handleViewPDF(file.fileName)
                      // PDF_URL + `/${imgFolders.drawings}/${file.fileName}`
                    }
                  >
                    » view pdf
                  </button>
                ) : null}
              </div>
              {/* <div>
                <span style={{ color: "#bfbfbf" }}>Stamp: </span>
                <button
                  className="PlinthBtn StampBtn"
                  onClick={() => {
                    file.fileSize === "a3"
                      ? StampA3(file.fileName, "first", messageApi).then(() => {
                          message.success("Stamped Pdf Successfully!");
                        })
                      : StampA1(file.fileName, "first", messageApi).then(() => {
                          message.success("Stamped Pdf Successfully!");
                        });
                  }}
                >
                  Plinth
                </button>{" "}
                <button
                  className="SuperStBtn StampBtn"
                  onClick={() => {
                    getLatestPDFLog(file.fileName, messageApi).then(
                      (res: { data: string }) => {
                        file.fileSize === "a3"
                          ? StampA3(res.data, "second", messageApi).then(() => {
                              message.success("Stamped Pdf Successfully!");
                            })
                          : StampA1(res.data, "second", messageApi).then(() => {
                              message.success("Stamped Pdf Successfully!");
                            });
                      }
                    );
                  }}
                >
                  SuperStructure
                </button>{" "}
                <button
                  className="BuildingComBtn StampBtn"
                  onClick={() => {
                    file.fileSize === "a3"
                      ? StampA3(file.fileName, "third", messageApi).then(() => {
                          message.success("Stamped Pdf Successfully!");
                        })
                      : StampA1(file.fileName, "third", messageApi).then(() => {
                          message.success("Stamped Pdf Successfully!");
                        });
                  }}
                >
                  Building Complete
                </button>
              </div> */}
            </div>
            {file.fileName.slice(-3) === "pdf" ? (
              <table
                className="MyTable"
                style={{ minWidth: "100%", border: "1px solid #c39bf8e8" }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: 4 }}>Document</th>
                    <th style={{ padding: 4 }}>फाट वाला</th>
                    {/* eslint-disable-next-line no-irregular-whitespace */}
                    <th style={{ padding: 4 }}>
                      {municipalityDetails.address1 ===
                      "Mandandeupur, Kavrepalanchok"
                        ? "सब-इन्जिनियर​"
                        : "इन्जिनियर​"}
                    </th>
                    <th style={{ padding: 4 }}>
                      {municipalityDetails.address1 ===
                      "Mandandeupur, Kavrepalanchok"
                        ? "सिफरिस गर्ने  इन्जिनियर​"
                        : " सिफरिस गर्ने"}
                    </th>
                    <th style={{ padding: 4 }}>स्विकृत गर्ने</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows(file, type)}

                  {/* <tr>
                    <td>आम्सिक</td>
                    <td>
                      {getSignedOrNot(
                        file,
                        "Amsik",
                        "examinerSignBy",
                        type,
                        getCurrentPosition("1")
                      )}
                    </td>
                    <td>
                      {getSignedOrNot(
                        file,
                        "Amsik",
                        "engineerSignBy",
                        type,
                        getCurrentPosition("2")
                      )}
                    </td>
                    <td>
                      {getSignedOrNot(
                        file,
                        "Amsik",
                        "recommenderSignBy",
                        type,
                        getCurrentPosition("3")
                      )}
                    </td>
                    <td>
                      {getSignedOrNot(
                        file,
                        "Amsik",
                        "approvedSignId",
                        type,
                        getCurrentPosition("4")
                      )}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            ) : null}
          </div>
        );
      }
      return undefined;
    });
  };

  return (
    <>
      <CommonHeader />
      {contextHolder}
      <div style={{ background: "#f2f2f2", paddingTop: 15 }}>
        <div
          className="uploadFWrapper"
          style={{ borderTop: "3px solid skyblue", background: "#f2f2f2" }}
        >
          <p style={{ marginBottom: 0, fontSize: 16 }}>
            Project Id: {params.pid} <MyInfoBtn info="Sign Drawings here" />
          </p>
          <h2 style={{ color: "#b3b3b3", fontSize: "1.5rem", width: "100%" }}>
            Sign Drawings
          </h2>
          <div></div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Soil Test Report</h3>
            </div>
            {mapData("soilTestReport")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Architectural Drawing</h3>
            </div>
            {mapData("architectural")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Structural Drawing</h3>
            </div>
            {mapData("structural")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Electrical Drawing</h3>
            </div>
            {mapData("electrical")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Sanitation</h3>
            </div>
            {mapData("sanitation")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Analysis File</h3>
            </div>
            {mapData("analysisfile")}
          </div>
          <div className="UploadDiv">
            <div className="uploadFiles">
              <h3>Analysis Report</h3>
            </div>
            {mapData("analysisreport")}
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalSignatureDrawings;

export function checkIfDrawingSigned(
  file: GetFilesWithSignBody,
  type: signType,
  signer: keyof DocumentSignDto
) {
  return file.documentSignDtos
    .filter((data) => data.signType === type)
    .filter((second) => second[signer]).length;
}
