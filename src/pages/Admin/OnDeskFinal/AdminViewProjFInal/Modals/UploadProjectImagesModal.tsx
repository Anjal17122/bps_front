import { Button, Divider, Input, message, Modal, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import {
  BASE_URL,
  imgFolders,
  IMG_SAVE_URL,
} from "../../../../../Services/Api";
import {
  GETProjectImages,
  GETProjectImagesBody,
  POSTProjectImages,
} from "../../../../../Services/ProjectImagesServices";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { copyImageFinal } from "../../OnDeskService/OnDeskService/OnDeskService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const UploadProjectImagesModal = () => {
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
  const [data, setData] = useState<GETProjectImagesBody[]>([]);

  const { currentPid, imagesModal } = useStoreViewProj();
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  useEffect(() => {
    GETProjectImages(currentPid, messageApi).then((res) => setData(res.data));
    return () => setData([]);
  }, []);

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
      .filter((filte) => filte.status === "done")
      .map((data) => {
        return {
          fileName: data?.response?.message,
          dir: imgFolders.additionalDocuments,
        };
      });
    if (!body.length) return messageApi.error("No Files uploaded!");

    copyImageFinal(body, messageApi).then(() => {
      const body = {
        name: JSON.stringify(
          state.fileList
            .filter((filte) => filte.status === "done")
            .map((data) => {
              if (data.status === "done") data?.response?.message;
            })
        ),
        projectId: currentPid,
        description: description,
      };

      // return;
      POSTProjectImages(body, messageApi).then(() => {
        setState(initialState);
      });
    });
  };

  const onClose = () => {
    dispatch({
      type: Ac.setImagesModal,
      payload: { imagesModal: false, currentPid: 0 },
    });
  };

  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={imagesModal}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
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
      {data ? (
        data.map((images) => {
          const imageList: string[] = JSON.parse(images.name);
          return (
            <div
              className="ProjectImagesCarousel"
              key={images.id}
              style={{ paddingLeft: "4%" }}
            >
              {imageList.map((imag, index) => (
                <div key={index}>
                  <a
                    href={
                      BASE_URL +
                      (checkIfPDF(imag) ? "/images/pdf/" : "/images/") +
                      imgFolders.additionalDocuments +
                      "/" +
                      imag
                    }
                    style={{ color: "#66c1e5" }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {JSON.stringify(imag.substring(14, imag.length))}
                  </a>
                </div>
              ))}

              <p style={{ fontSize: 12, color: "#707275" }}>
                {images.description}
              </p>
              <Divider orientationMargin={2} type="horizontal"></Divider>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default UploadProjectImagesModal;
