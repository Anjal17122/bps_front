import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import {
  IMG_SAVE_URL,
  PDF_URL,
  IMG_GET_URL,
} from "../../../../../Services/Api";
import { getToken } from "../../../../../Services/UserService";
import { checkIfPDF } from "../../Project/LandInfo/LandCard";

interface Props {
  onUpload: (info: UploadChangeParam<UploadFile<any>>) => void;
  onDel: (data: any) => void;
  disabled: boolean;
  maxCount?: number;
}

const ManjurinamaUploader = ({
  onUpload,
  onDel,
  disabled,
  maxCount,
}: Props) => {
  const uploadprops = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
    onChange: (info: UploadChangeParam<UploadFile<any>>) => onUpload(info),
    onPreview: (info: UploadFile<any>) => {
      const fileUrl = checkIfPDF(info.response.message ?? "")
        ? PDF_URL + "/temp/" + info.response.message
        : IMG_GET_URL + "/temp/" + info.response.message;
      if (checkIfPDF(info.response.message ?? "")) {
        let pdfWindow = window.open("");
        pdfWindow?.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(fileUrl) +
            "'></iframe>"
        );
        setTimeout(function () {
          pdfWindow?.stop();
        }, 1500);
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
  );
};

export default ManjurinamaUploader;
