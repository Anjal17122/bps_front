import { message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import {
  addFile,
  delUploadByName,
} from "../../../../../Services/TechnicalService";
import { copyImageFinal } from "../../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import FileUploader from "./FileUploader";
import { fileNameGenAnalysis } from "./EditUploads";
import { FilesUploaded } from "../../../../../Services/CreateProjectService";
import { useState } from "react";

interface Props {
  pid: string;
  files: FilesUploaded[] | undefined;
  onUploadSuccess: () => void;
}

export interface UploadFiletyp {
  error?: {
    method: "post";
    status: number;
    url: string;
    message: string;
    stack: string;
  };
  lastModified: Date;
  lastModifiedDate: Date;
  name: string;
  originFileObj: {
    uid: string;
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    webkitRelativePath: string;
    size: number;
  };
  percent: number;
  response: {
    imageName?: string;
    timestamp?: string;
    status?: number;
    error?: string;
    message?: string;
    path?: string;
  };
  size: number;
  status: string;
  type: string;
  uid: string;
}
const CreateUploadFiles = ({ pid, files, onUploadSuccess }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.success(`${info.file.name} file uploaded successfully`);
      const body = {
        fileName: info.file.response.message,
        title: info.file.response.message,
        projectId: pid,
        fileType: type,
        fileSize: "",
      };
      addFile(
        body,
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
          ).then(() => onUploadSuccess());
        }
        onUploadSuccess();
      });
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  }

  // const fileslength = files ? files.length + 1 : 1;
  return (
    <div>
      <div className="uploadFWrapper">
        {contextHolder}
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Soil Test Report</h3>
          </div>
          <FileUploader
            filename={fileNameGenAnalysis("soilTestReport", pid)}
            disabled={submitting}
            onDel={(data) => onDel(data)}
            onUpload={(info) => onUpload(info, "soilTestReport")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Architectural Drawing</h3>
          </div>
          {/* <FileUploader
            filename={fileNameGenerator("architectural", pid, fileslength)}
            disabled={submitting}
            onDel={(data) => onDel(data, )}
            onUpload={(info) => onUpload(info, "architectural")}
          /> */}
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Structural Drawing</h3>
          </div>
          {/* <FileUploader
            filename={fileNameGenerator("structural", pid, fileslength)}
            disabled={submitting}
            onDel={(data) => onDel(data, )}
            onUpload={(info: any) => onUpload(info, "structural")}
          /> */}
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Electrical Drawing</h3>
          </div>
          {/* <FileUploader
            filename={fileNameGenerator("electrical", pid, fileslength)}
            disabled={submitting}
            onDel={(data) => onDel(data, )}
            onUpload={(info: any) => onUpload(info, "electrical")}
          /> */}
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Sanitation</h3>
          </div>
          <FileUploader
            filename={fileNameGenAnalysis("sanitation", pid)}
            disabled={submitting}
            onDel={(data) => onDel(data)}
            onUpload={(info: any) => onUpload(info, "sanitation")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Analysis File</h3>
          </div>
          <FileUploader
            filename={fileNameGenAnalysis("analysisfile", pid)}
            disabled={submitting}
            onDel={(data) => onDel(data)}
            onUpload={(info: any) => onUpload(info, "analysisfile")}
          />
        </div>
        <div className="UploadDiv">
          <div className="uploadFiles">
            <h3>Analysis Report</h3>
          </div>
          <FileUploader
            filename={fileNameGenAnalysis("analysisreport", pid)}
            disabled={submitting}
            onDel={(data) => onDel(data)}
            onUpload={(info: any) => onUpload(info, "analysisreport")}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUploadFiles;

export const onDel = (data: any) => {
  if (data.status === "error") {
    return;
  } else {
    delUploadByName(data.response.message);
  }
};
