import { useState } from "react";
import "./ViewDigitalSignatureLocal.scss";
import { Button, Cascader, Image, message, Modal, Result } from "antd";
import Title from "antd/lib/typography/Title";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import { FormOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { SignDocument } from "../Admin/DigitalSignature/DigitalSign";
import { getCoordinates } from "../../constants/coordinates";
import { sN } from "../../Services/ProjectService";
import { getFileUploads, setSTyp } from "../../Services/CreateProjectService";
import { Base64toPDF } from "../../Services/DigitalSignatureService";
import { BASE_URL, imgFolders, PDF_URL } from "../../Services/Api";
import { addFile } from "../../Services/TechnicalService";
import { copyImage } from "../../Services/AddressService";
import { getBase64fromResp } from "./DigitalSignatureLocal";
import SampleRef from "../../Assets/Images/sampleReference.webp";
import MyUpload from "../Upload";
import TableButton from "../../Common/TableButton/TableButton";

export const ConsultantCoordinates = `462,100,580,145`;

const DigitalSignConsultantLocal = () => {
  const [submitting, setSubmitting] = useState(false);
  const [filename, setFilename] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);

  const [fileType, setFileType] = useState<
    | "soilTestReport"
    | "architectural"
    | "structural"
    | "electrical"
    | "sanitation"
    | "analysisfile"
    | "analysisreport"
    | "notice-7"
    | "notice-15"
    | ""
  >("");

  const [pdfType, setPdfType] = useState<"a1" | "a3">("a1");

  const [messageApi, contextHolder] = message.useMessage();

  const { pid } = useParams();

  const signPDF = () => {
    if (!fileType) return messageApi.error("Select File Type");

    getFileUploads(
      pid ?? 0,

      localStorage.getItem("isPerma") === "true"
        ? "/file/perma?id="
        : "/file/by/project?id="
    ).then(() => {
      setSubmitting(true);

      const coordina = getCoordinates(pdfType, 100);

      if (!coordina) return message.error("Coordinates not found!");

      const successCallback = (respData: string, pid: sN, setSub: setSTyp) => {
        Base64toPDF(
          {
            base64: getBase64fromResp(respData),
            filename: generateFileNameUid(fileType, pid),
          },
          localStorage.getItem("isPerma") === "true"
            ? imgFolders.drawings
            : imgFolders.temp,
          setSubmitting
        ).then((res) => {
          setFilename(res.data as string);
          const body = {
            fileName: res.data as string,
            title: res.data as string,
            projectId: pid,
            fileType: fileType,
            fileSize: pdfType,
          };
          addFile(
            body,
            messageApi,
            localStorage.getItem("isNotice") === "true" &&
              localStorage.getItem("isPerma") === "true"
              ? "/file/perma"
              : "/file/add"
          ).then(() => {
            setModalOpen(true);
            if (localStorage.getItem("isPerma") === "true") {
              copyImage(
                [{ fileName: filename ?? "", dir: imgFolders.drawings }],
                setSubmitting
              ).then(() => {
                message.success("File Copied!");
              });
            }
          });
          message.success("Signed PDF!");
        });
      };
      SignDocument(coordina, pid ?? "0", setSubmitting, successCallback);
    });
  };

  const uploadSuccess = (data: string) => {
    messageApi.info("File Uploaded!");
    // const finalFileName = fileNameGenerator(fileType, pid ?? "0", "");
    setFilename(data);
    window.open(
      BASE_URL + "/a1pdf/download?filename=" + data,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={modalOpen}
        footer={null}
        width={700}
        onCancel={() => setModalOpen(false)}
        destroyOnClose={true}
      >
        <h4>View Pdf</h4>
        <embed
          style={{
            width: "100%",
            height: "600px",
          }}
          type="application/pdf"
          src={
            PDF_URL +
            `/${
              localStorage.getItem("isPerma") === "true"
                ? imgFolders.drawings
                : "temp"
            }/${filename}`
          }
        />
      </Modal>
      <CommonHeader />
      <div className="ViewDigitalSignature">
        <div className="SignData" style={{ width: "100%", padding: "0 15%" }}>
          <div className="TitleWrapper">
            <div>
              <span>Project Id: {pid}</span>
            </div>
            <Title level={3}>
              <span>Consultant: </span>
            </Title>
          </div>
          <Result
            style={{ paddingTop: 15, paddingBottom: 10 }}
            icon={<FormOutlined style={{ fontSize: 32 }} />}
            status="info"
            title="Sign Pdf"
            subTitle={""}
            extra={[]}
          ></Result>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <label htmlFor="PDF Type">PDF Type: &nbsp;</label>
              <Cascader
                defaultValue={["a1"]}
                options={optionsPdfSize}
                onChange={(e) => setPdfType(e[0])}
                placeholder="a1, a3"
              />
            </div>
            <div>
              <label htmlFor="PDF Type">File Type: &nbsp;</label>
              <Cascader
                onChange={(e) => setFileType(e[0])}
                options={optionsDrawingsFolders}
                placeholder="eg. Soil Test Report,  Architectural, Structural"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 20,
              marginBottom: 20,
              marginTop: 40,
            }}
          >
            <div>
              <MyUpload
                pdfType={pdfType}
                fileName={`${fileType}_${pid}`}
                pid={pid != undefined ? pid : 0}
                handleUpload={uploadSuccess}
              />
              <div style={{ color: "green", fontSize: 15 }}>Stamp PDF</div>
            </div>
            {/* <Button htmlType="submit" type="primary" disabled={submitting}> */}
            <Button type="primary" onClick={signPDF} disabled={submitting}>
              2. Sign After Stamp
            </Button>
          </div>

          {filename ? (
            <TableButton bgColor="green">
              <a
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
                href={BASE_URL + "/a1pdf/download?filename=" + filename}
                download={filename}
              >
                Download
              </a>
            </TableButton>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              background: "white",
              padding: "10px 0px",
            }}
          >
            <div style={{ width: 500, textAlign: "left", paddingLeft: 80 }}>
              <div style={{ color: "red" }}>Notes:</div>
              <div>* Stamp PDF and Sign the stamped file.</div>
              <div>* Only Upload Drawings here (supported: A1/A3).</div>
              <div>* Use Landscape mode to upload pdf.</div>
              <div>
                * Do not provide right vertical line on the Official column.
              </div>
              <div>
                * Leave at least (A1 : 1530 px/ A3: 990px) on the Official
                column.
              </div>
              <div>* Put compass on bottom. </div>
              <div>
                View Sample:{" "}
                <Image
                  style={{ border: "1px solid grey" }}
                  src={SampleRef}
                  width={80}
                  height={60}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalSignConsultantLocal;

export const generateFileNameUid = (
  type:
    | "architectural"
    | "structural"
    | "electrical"
    | "sanitation"
    | "analysisfile"
    | "analysisreport"
    | "soilTestReport"
    | "notice-7"
    | "notice-15",
  pid: sN
) => {
  // const uid = Date.now();
  return `${type}_${pid}_`;
};

export const optionsPdfSize = [
  { label: "a1", value: "a1" },
  { label: "a3", value: "a3" },
];

export const optionsDrawingsFolders = [
  { label: "Soil Test Report", value: "soilTestReport" },
  { label: "Architectural", value: "architectural" },
  { label: "Structural", value: "structural" },
  { label: "Electrical", value: "electrical" },
  { label: "Sanitation", value: "sanitation" },
  { label: "Analysis File", value: "analysisfile" },
  { label: "Analysis Report", value: "analysisreport" },
];

export type fileTypee =
  | "soilTestReport"
  | "architectural"
  | "structural"
  | "electrical"
  | "sanitation"
  | "analysisfile"
  | "analysisreport";
// | "architectural"
// | "structural"
// | "electrical"
// | "sanitation"
// | "analysisreport"
// | "analysisfile"
// | "soilTestReport"
