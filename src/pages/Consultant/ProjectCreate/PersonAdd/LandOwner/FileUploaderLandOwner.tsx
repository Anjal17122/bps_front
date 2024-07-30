import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { IMG_SAVE_URL } from "../../../../Services/Api";
import { getToken } from "../../../../Services/UserService";

interface Props {
  onUpload: (info: UploadChangeParam<UploadFile<any>>) => void;
  onDel: (data: any) => void;
  disabled: boolean;
  maxCount?: number;
}

const FileUploaderLandOwner = ({
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
      maxCount={maxCount}
      {...uploadprops}
      className="FileUploader"
      disabled={disabled}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default FileUploaderLandOwner;
