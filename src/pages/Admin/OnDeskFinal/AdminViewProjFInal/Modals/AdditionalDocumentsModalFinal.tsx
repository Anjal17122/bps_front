import { useEffect, useState } from "react";
import { Button, Input, message, Modal, Popconfirm, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import {
  imgFolders,
  IMG_SAVE_URL,
  BASE_URL,
} from "../../../../../Services/Api";
import {
  GETadditionalDocs,
  POSTadditionalDoc,
  delAdditionalDoc,
  patchAdditionalDoc,
} from "../../../../../Services/OnDeskService";
import { GETProjectImagesBody } from "../../../../../Services/ProjectImagesServices";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import {
  dispatch,
  useStoreViewProj,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import "./AdditionalDocument.css";
import MyPopconfirm from "../../../../../Common/Popconfirm/MyPopconfirm";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";
import { copyImageFinal } from "../../OnDeskService/OnDeskService/OnDeskService";
import { isDhulikhel } from "../../../../../constants/CommonFunctions";

const AdditionalDocumentsModalFinal = () => {
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

  const [additionalDocs, setAdditionalDocs] = useState<GETProjectImagesBody[]>(
    []
  );

  const { currentPid, additionalDocsModal } = useStoreViewProj();
  const [rerender, setRerender] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  useEffect(() => {
    GETadditionalDocs(currentPid, messageApi).then((res) =>
      setAdditionalDocs(res.data)
    );
    return () => setAdditionalDocs([]);
  }, [rerender]);

  const [state, setState] = useState(initialState);

  const [description, setDescription] = useState("");

  const handleChange = ({ fileList }: UploadChangeParam) =>
    setState({ ...state, fileList: fileList });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onSubmit = () => {
    const body = state.fileList
      .filter((fdata) => fdata.status === "done")
      .map((data) => ({
        fileName: data?.response?.message,
        dir: imgFolders.additionalDocuments,
      }));
    if (!body.length) return messageApi.error("No Files uploaded!");

    copyImageFinal(body, messageApi).then(() => {
      POSTadditionalDoc(
        {
          name: JSON.stringify(
            state.fileList.map((data) => data?.response?.message)
          ),
          projectId: currentPid,
          description: description,
        },
        messageApi
      ).then(() => {
        setDescription("");
        setState(initialState);
        setRerender((prev) => !prev);
      });
    });
  };

  const handleDelFile = (
    images: GETProjectImagesBody,
    imageList: string[],
    imag: string
  ) => {
    const finalImageList = imageList.filter((img) => img !== imag);
    patchAdditionalDoc(
      { id: images.id, name: JSON.stringify(finalImageList) },
      messageApi
    ).then(() => {
      setRerender((prev) => !prev);
    });
  };

  const handleAlbumDelete = (id: number) => {
    delAdditionalDoc(id, messageApi).then(() => {
      setAdditionalDocs((prev) => prev.filter((files) => files.id !== id));
    });
  };

  return (
    <Modal
      title="Additional Documents"
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={additionalDocsModal}
      footer={false}
      maskClosable={true}
      onCancel={() =>
        dispatch({
          type: Ac.setAdditionalDocModal,
          payload: { additionalDocsModal: false, currentPid: 0 },
        })
      }
      destroyOnClose={true}
    >
      {contextHolder}
      <Upload
        action={IMG_SAVE_URL}
        listType="picture-card"
        fileList={state.fileList}
        onChange={handleChange}
      >
        {state.fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <div style={{ paddingTop: 10 }}>
        <label>Description</label>
        <Input
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

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
      <h3 style={{ textAlign: "center", paddingTop: 20, paddingBottom: 5 }}>
        File List:
      </h3>

      {additionalDocs.map((images) => {
        const imageList: string[] = JSON.parse(images.name);
        return (
          <div key={images.id} className="file-container">
            <ul style={{ paddingLeft: "4%" }}>
              {imageList.map((imag) => (
                <li key={imag}>
                  <a
                    href={
                      BASE_URL +
                      (checkIfPDF(imag ?? "") ? "/images/pdf/" : "/images/") +
                      imgFolders.additionalDocuments +
                      "/" +
                      imag
                    }
                    style={{ color: "#66c1e5" }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {imag}
                  </a>
                  {isDhulikhel() ? null : (
                    <MyPopconfirm
                      type="link"
                      disabled={disabled}
                      button={<DeleteOutlined style={{ color: "#ff8080" }} />}
                      onConfirm={() => handleDelFile(images, imageList, imag)}
                    />
                  )}
                </li>
              ))}

              <p
                style={{
                  fontSize: 13,
                  color: "#707275",
                  marginTop: 3,
                  marginBottom: 4,
                }}
              >
                {images.description}
              </p>
              <hr style={{ border: "1px solid #e6e6e6" }} />
            </ul>
            {isDhulikhel() ? null : (
              <Popconfirm
                title="Delete this Folder?"
                disabled={disabled}
                onConfirm={() => handleAlbumDelete(images.id)}
              >
                <button className="delete-button">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
            )}
          </div>
        );
      })}
    </Modal>
  );
};

export default AdditionalDocumentsModalFinal;
