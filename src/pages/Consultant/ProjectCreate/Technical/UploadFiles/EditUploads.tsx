import FileUploader from "./FileUploader";
import { message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { onDel } from "./CreateUploadFiles";

import { checkIfPDF } from "../../Project/LandInfo/LandCard";
import MyPopconfirm from "../../../../../Common/Popconfirm/MyPopconfirm";
import { PDF_URL, IMG_GET_URL, imgFolders } from "../../../../../Services/Api";
import { FilesUploaded } from "../../../../../Services/CreateProjectService";
import {
  delFilePerma,
  delFile,
  addFile,
} from "../../../../../Services/TechnicalService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { copyImageFinal } from "../../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { sN } from "../../../../../Services/ProjectService";

interface Props {
  data: FilesUploaded[];
  projectId: string;
  uploadDelSuccess: (id: number) => void;
  onUploadSuccess: () => void;
}

const EditUploads = ({
  data,
  projectId,
  uploadDelSuccess,
  onUploadSuccess,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  function delfile(id: number) {
    localStorage.getItem("isPerma") === "true"
      ? delFilePerma(id, messageApi).then(() => {
          uploadDelSuccess(id);
        })
      : delFile(id, messageApi).then(() => {
          uploadDelSuccess(id);
        });
  }

  const mapData = (
    type:
      | "architectural"
      | "structural"
      | "electrical"
      | "sanitation"
      | "analysisfile"
      | "analysisreport"
      | "soilTestReport"
  ) => {
    return data.map((file, index) => {
      if (file.fileType === type) {
        return (
          <div
            className="viewUploadCard"
            key={file.id}
            style={{
              background:
                (index + 1) % 2 === 0 ? "white" : "rgba(211, 211, 211, 0.2)",
            }}
          >
            {file.title || "Sample"}{" "}
            <div>
              <a
                rel="noopener noreferrer"
                href={
                  checkIfPDF(file.fileName)
                    ? PDF_URL +
                      (localStorage.getItem("isPerma") === "true"
                        ? `/${imgFolders.drawings}/${file.fileName}`
                        : "/temp/" + file.fileName)
                    : IMG_GET_URL +
                      (localStorage.getItem("isPerma") === "true"
                        ? `/${imgFolders.drawings}/${file.fileName}`
                        : "/temp/" + file.fileName)
                }
                target="_blank"
              >
                <button className="NoStyleBtnSm">
                  <DownloadOutlined />
                </button>
              </a>
              <MyPopconfirm
                disabled={disabled}
                onConfirm={() => delfile(file.id)}
                button={<DeleteOutlined style={{ color: "red" }} />}
              />
            </div>
          </div>
        );
      }
      return null;
    });
  };

  function onUpload(
    info: UploadChangeParam<UploadFile>,
    type:
      | "architectural"
      | "structural"
      | "electrical"
      | "sanitation"
      | "analysisreport"
      | "analysisfile"
      | "soilTestReport"
  ) {
    if (info.file.status === "done") {
      addFile(
        {
          fileName: info.file.response.message,
          title: info.file.response.message,
          fileType: type,
          projectId,
          fileSize: "",
        },
        messageApi,
        localStorage.getItem("isNotice") === "true" &&
          localStorage.getItem("isPerma") === "true"
          ? "/file/perma"
          : "/file/add"
      ).then(() => {
        if (localStorage.getItem("isPerma") === "true") {
          copyImageFinal(
            [{ fileName: info.file.response.message, dir: type }],
            messageApi
          );
        }
        onUploadSuccess();
      });
      messageApi.success(
        `${info.file.response.message} file uploaded successfully`
      );
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <div>
      <div className="uploadFWrapper">
        {contextHolder}
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Soil Test Report</h3>
          </div>
          {mapData("soilTestReport")}
          <FileUploader
            filename={fileNameGenAnalysis("soilTestReport", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "soilTestReport")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Architectural Drawing</h3>
          </div>
          {mapData("architectural")}
          <FileUploader
            filename={fileNameGenAnalysis("architectural", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "architectural")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Structural Drawing</h3>
          </div>
          {mapData("structural")}
          <FileUploader
            filename={fileNameGenAnalysis("structural", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "structural")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Electrical Drawing</h3>
          </div>
          {mapData("electrical")}
          <FileUploader
            filename={fileNameGenAnalysis("electrical", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "electrical")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Sanitation</h3>
          </div>
          {mapData("sanitation")}
          <FileUploader
            filename={fileNameGenAnalysis("electrical", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "sanitation")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Analysis File</h3>
          </div>
          {mapData("analysisfile")}
          <FileUploader
            filename={fileNameGenAnalysis("analysisfile", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "analysisfile")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Analysis Report</h3>
          </div>
          {mapData("analysisreport")}
          <FileUploader
            filename={fileNameGenAnalysis("analysisreport", projectId)}
            disabled={disabled}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "analysisreport")}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUploads;

export const fileNameGenerator = (
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
  pid: sN,
  SN: sN
) => `${type}_${pid}_${SN}`;

export const fileNameGenAnalysis = (
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
) => `${type}_${pid}_${Date.now()}`;
