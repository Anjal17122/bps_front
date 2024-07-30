import { useState } from "react";
import { Button, message, Modal, notification, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import {
  PlusOutlined,
  LoadingOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { RcFile } from "antd/lib/upload/interface";
import { IMG_SAVE_URL } from "../../../../../Services/Api";
import {
  POSTUploadWardBody,
  UploadWardTechnical,
} from "../../../../../Services/OnDeskService";
import { UploadNapi } from "../../../../../Services/NapiService";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { MessageInstance } from "antd/es/message/interface";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const NapiModalFinal = () => {
  const { currentPid, napiModal, napiOrTech } = useStoreViewProj();

  const [imageUrl, setImageUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      dispatch({ type: Ac.disableBtn, payload: true });
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response.message);
      // setimageUrl(info.file.name);
      dispatch({ type: Ac.disableBtn, payload: false });
    } else {
      dispatch({ type: Ac.disableBtn, payload: false });
    }
  };

  const CloseModal = () => {
    dispatch({
      type: Ac.closeNapiM,
      payload: { currentPid: 0, napiModal: false, napiOrTech: "" },
    });
  };

  const onSubmit = () => {
    if (!imageUrl) {
      return messageApi.error("Image not uploaded yet!");
    }
    if (napiOrTech === "napi" || napiOrTech === "tech") {
      UploadNapi(
        napiOrTech === "napi"
          ? `/project/perma/upload/napi?id=${currentPid}&napiFile=${imageUrl}`
          : `/project/perma/upload/technicaldepartment?technicalFile=${imageUrl}&id=${currentPid}`,
        messageApi
      ).then(() => {
        notification.success({ message: "File Uploaded Successfully!" });
        CloseModal();
      });
    } else {
      const body: POSTUploadWardBody = {
        projectId: currentPid,
        wardFileName: imageUrl,
      };

      UploadWardTechnical(body, messageApi);
    }
  };
  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={napiModal}
      footer={false}
      maskClosable={true}
      onCancel={CloseModal}
      destroyOnClose={true}
      title={
        napiOrTech === "napi" ? "Upload Napi Report" : "Upload Technical Report"
      }
    >
      {contextHolder}
      <Upload
        headers={{}}
        beforeUpload={(file) => beforeUpload(file, messageApi)}
        showUploadList={false}
        maxCount={1}
        action={IMG_SAVE_URL}
        listType="picture-card"
        onChange={handleChange}
      >
        {imageUrl ? (
          <div>
            <CheckCircleFilled style={{ color: "#52c41a", fontSize: 24 }} />
            <p>{imageUrl.substr(0, 13)}..</p>
          </div>
        ) : disabled ? (
          <LoadingOutlined />
        ) : (
          <div>
            <PlusOutlined />
            <div>Upload</div>
          </div>
        )}
      </Upload>

      <div style={{ width: "96%", textAlign: "center", paddingTop: 20 }}>
        <Button
          style={{ width: 200 }}
          loading={disabled}
          type="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default NapiModalFinal;

export function beforeUpload(file: RcFile, messageApi: MessageInstance) {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "application/pdf";
  if (!isJpgOrPng) {
    messageApi.error("You can only upload PDF/JPG/PNG/WEBP file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    messageApi.error("File must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
