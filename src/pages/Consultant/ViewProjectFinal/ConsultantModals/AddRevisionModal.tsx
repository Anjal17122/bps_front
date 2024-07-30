import { Button, Cascader, Divider, Input, message, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { imgFolders, IMG_SAVE_URL } from "../../../../Services/Api";
import { getToken } from "../../../../Services/UserService";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { sN } from "../../../../Services/ProjectService";
import {
  GETrevisionFileTypeFinal,
  POSTrevisionBody,
  POSTrevisionFinal,
  RevisionFileTyp,
} from "../../../../Services/RevisionService";
import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { AcMCon } from "../../../../Store/StoreModalCon/types";

const AddRevisionModal = () => {
  const [remarks, setRemarks] = useState("");
  const [remarksFileType, setRemarksFileType] = useState<RevisionFileTyp[]>();

  const [messageApi, contextHolder] = message.useMessage();

  const { addRevisionModal } = useStoreModalCon();
  const { currentPid } = useStoreViewProj();

  const initialFile = { id: 0, fileName: "", fileType: 0, revisionId: 0 };

  useEffect(() => {
    GETrevisionFileTypeFinal(messageApi).then((res) => {
      setRemarksFileType(res.data);
    });

    return () => {
      setRemarksFileType(undefined);
    };
  }, []);

  interface remarksFileType {
    id: number;
    fileName: string;
    fileType: sN;
    revisionId: number;
  }

  const [remarksFiles, setRemarksFiles] = useState<remarksFileType[]>([
    { id: 0, fileName: "", fileType: 0, revisionId: 0 },
  ]);

  const props = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
  };

  const onSubmitRemarks = () => {
    const body: POSTrevisionBody = {
      project: currentPid,
      remarks: remarks,
      docs: remarksFiles.map((remarfi) => ({
        filename: remarfi.fileName,
        fileType: remarfi.fileType,
      })),
    };
    POSTrevisionFinal(body, messageApi).then(() => {
      const filesN = remarksFiles.map((remarksf) => ({
        dir: imgFolders.revision,
        fileName: remarksf.fileName,
      }));
      copyImageFinal(filesN, messageApi).then(() => {
        dispatchModalCon({
          type: AcMCon.setAddRevisionModal,
          payload: false,
        });
      });
    });
  };

  return (
    <div>
      {contextHolder}
      <Modal
        bodyStyle={{ borderRadius: 16 }}
        open={addRevisionModal}
        footer={false}
        maskClosable={true}
        onCancel={() => {
          dispatch({ type: Ac.setCurrentPid, payload: 0 });
          dispatchModalCon({
            type: AcMCon.setAddRevisionModal,
            payload: false,
          });
        }}
        destroyOnClose={true}
      >
        <div>
          <h4>Remarks</h4>
          <Input.TextArea
            rows={4}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <Divider type="horizontal"></Divider>
        <div style={{ paddingBottom: 20 }}>
          <h3>Upload Remarks Files</h3>
          {remarksFiles.map((_remarks, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <div>
                <Cascader
                  options={remarksFileType?.map((fileTyp) => ({
                    label: fileTyp.documentType,
                    value: fileTyp.id,
                  }))}
                  onChange={(val) => {
                    const init = [...remarksFiles];

                    const row2 = { ...init[index], fileType: val[0] };
                    init[index] = row2;
                    setRemarksFiles(init);
                  }}
                ></Cascader>
              </div>
              <div style={{ width: 200 }}>
                <Upload
                  {...props}
                  maxCount={1}
                  onChange={(info: UploadChangeParam<UploadFile>) => {
                    if (info.file.status === "done") {
                      const init = [...remarksFiles];
                      const row2 = {
                        ...init[index],
                        fileName: info.file.response.message,
                      };
                      init[index] = row2;
                      setRemarksFiles(init);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
              <Button
                danger
                onClick={() => {
                  setRemarksFiles((prev) =>
                    prev.filter((_, index2) => index2 !== index)
                  );
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ))}
          <div style={{ paddingTop: 10 }}>
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => {
                setRemarksFiles((prev) => [
                  ...prev,
                  { ...initialFile, id: remarksFiles.length + 1 },
                ]);
              }}
            >
              + Add
            </Button>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ width: 150 }}
            type="primary"
            onClick={onSubmitRemarks}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddRevisionModal;
