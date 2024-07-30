import React from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import {
  PDF_URL,
  IMG_GET_URL,
  DRAWINGS_URL,
} from "../../../../../Services/Api";
import { getToken } from "../../../../../Services/UserService";
import { checkIfPDF } from "../../Project/LandInfo/LandCard";

interface Props {
  onUpload: (info: UploadChangeParam<UploadFile>) => void;
  onDel: (data: any) => void;
  disabled: boolean;
  maxCount?: number;
  filename: string;
}

const FileUploader = ({
  onUpload,
  onDel,
  disabled,
  maxCount,
  filename,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const uploadprops = {
    name: "file",
    action: DRAWINGS_URL("temp", filename),
    headers: {
      authorization: getToken(),
    },
    onChange: (info: UploadChangeParam<UploadFile>) => onUpload(info),
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng =
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        messageApi.error(`Only PDF/JPEG/WEBP/PNG files allowed.`);
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        messageApi.error("File must smaller than 5MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onPreview: (info: UploadFile<any>) => {
      const fileUrl = checkIfPDF(info.response.message ?? "")
        ? PDF_URL + "/temp/" + info.response.message
        : IMG_GET_URL + "/temp/" + info.response.message;
      if (checkIfPDF(info.response.message ?? "")) {
        window.open(fileUrl, "_blank");
      } else {
        window.open(fileUrl, "_blank");
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    onRemove: (data: any) => onDel(data),
  };
  return (
    <>
      {contextHolder}
      <Upload
        listType="picture"
        maxCount={maxCount}
        {...uploadprops}
        className="FileUploader"
        disabled={disabled}
      >
        <button>
          <UploadOutlined /> Upload
        </button>
      </Upload>
    </>
  );
};

export default FileUploader;
