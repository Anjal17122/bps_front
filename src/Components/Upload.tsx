import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { getToken } from "../Services/UserService";
import { BASE_URL } from "../Services/Api";

type Props = {
  fileName: string;
  pdfType: "a1" | "a3";
  pid: number | string;
  handleUpload: (file: string) => void;
};

const MyUpload: React.FC<Props> = ({
  fileName,
  pdfType,
  pid,
  handleUpload,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    name: "file",
    action:
      BASE_URL +
      (pdfType === "a1" ? "/a1pdf" : "/a3pdf") +
      "/upload/file?filename=" +
      fileName +
      "&projectId=" +
      pid +
      "&isPerma=" +
      (localStorage.getItem("isPerma") === "true" ? "true" : "false"),
    headers: {
      authorization: getToken(),
    },
  };

  return (
    <Upload
      onChange={(info) => {
        if (info.file.status !== "uploading") {
          //   console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          handleUpload(info.file.response.data);
          messageApi.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          messageApi.error(`${info.file.name} file upload failed.`);
        }
      }}
      {...props}
    >
      {contextHolder}
      <Button type="primary" ghost>
        1. <UploadOutlined /> Upload {JSON.stringify(pdfType)}
      </Button>
    </Upload>
  );
};

export default MyUpload;
