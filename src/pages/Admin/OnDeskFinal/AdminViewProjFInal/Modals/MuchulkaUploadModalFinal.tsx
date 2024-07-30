import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload, UploadFile } from "antd";
import { imgFolders, IMG_SAVE_URL } from "../../../../../Services/Api";
import { uploadMuchulkaNoValid } from "../../OnDeskService/MuchulkaServiceFinal/MuchulkaServiceFinal";
import { UploadChangeParam } from "antd/lib/upload";
import { beforeUpload } from "./NapiModalFinal";
import {
  useStoreViewProj,
  dispatch,
  delProjById,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { copyImageFinal } from "../../OnDeskService/OnDeskService/OnDeskService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const MuchulkaUploadModalFinal = () => {
  const initialState: {
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
    fileList: UploadFile[];
  } = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  const { currentPid, muchulkaModal } = useStoreViewProj();

  const [state, setState] = useState(initialState);

  const { disabled } = useStoreGlobal();

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = ({ fileList }: UploadChangeParam) =>
    setState({ ...state, fileList: fileList });

  const onSubmit = () => {
    const body = state.fileList
      .filter((filte) => filte.status === "done")
      .map((data) => {
        return {
          fileName: data?.response?.message,
          dir: imgFolders.additionalDocuments,
        };
      });
    if (!body.length) return messageApi.error("No Files uploaded!");

    copyImageFinal(body, messageApi).then(() => {
      // return;
      uploadMuchulkaNoValid(
        currentPid,
        state.fileList[0].response.message,
        messageApi
      ).then(() => {
        delProjById();
        setState(initialState);
      });
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      className="SelectUserModal"
      open={muchulkaModal}
      footer={false}
      maskClosable={true}
      width={400}
      onCancel={() =>
        dispatch({
          type: Ac.muchulkaModal,
          payload: { muchulkaModal: false, currentPid: 0 },
        })
      }
      destroyOnClose={true}
      title={"Upload Muchulka"}
    >
      {contextHolder}
      <Upload
        maxCount={1}
        beforeUpload={(file) => beforeUpload(file, messageApi)}
        action={IMG_SAVE_URL}
        listType="picture-card"
        fileList={state.fileList}
        onChange={handleChange}
      >
        {state.fileList.length >= 8 ? null : uploadButton}
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

export default MuchulkaUploadModalFinal;
