import { useState } from "react";
import MyUpload from "../Upload";
import { Cascader, Input, message } from "antd";
import { BASE_URL } from "../../Services/Api";
import {
  optionsDrawingsFolders,
  optionsPdfSize,
} from "./DigitalSignConsultantLocal";
import CommonHeader from "../Admin/DigitalSignature/CommonHeader";
import TableButton from "../../Common/TableButton/TableButton";

type Props = {};

const StampPdfOnly = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [filename, setFilename] = useState<string>();
  const [pid, setPid] = useState("");
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

  const uploadSuccess = (data: string) => {
    messageApi.info("File Uploaded!");
    setFilename(data);
    window.open(
      BASE_URL + "/a1pdf/download?filename=" + data,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div>
      <CommonHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {contextHolder}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 5%",
            minHeight: 600,
          }}
        >
          <h1 style={{ marginTop: 50, marginBottom: 30 }}>Stamp PDF</h1>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex" }}>
              <label htmlFor="pid">ProjectId: &nbsp;</label>
              <Input
                style={{ height: 30 }}
                onChange={(e) => setPid(e.target.value)}
              />
            </div>
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
                // defaultValue={["architectural"]}
                onChange={(e) => setFileType(e[0])}
                options={optionsDrawingsFolders}
                placeholder="eg. Soil Test Report,  Architectural, Structural"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 50 }}>
            <div>
              <MyUpload
                pdfType={pdfType}
                fileName={`${fileType}_${pid}`}
                handleUpload={uploadSuccess}
              />
              <div style={{ color: "green", fontSize: 15 }}>Stamp PDF</div>
            </div>
            <div>
              {filename ? (
                <TableButton bgColor="green">
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href={BASE_URL + "/a1pdf/download?filename=" + filename}
                    download={filename}
                  >
                    Download
                  </a>
                </TableButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampPdfOnly;
