import { useEffect, useState } from "react";
import { Button, Carousel, Input, message, Modal, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { IMG_SAVE_URL, PROJECT_IMAGES } from "../../../../../Services/Api";
import {
  GETProjectImagesBody,
  POSTProjectImages,
} from "../../../../../Services/ProjectImagesServices";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { GETProjectImagesFinal } from "../../OnDeskService/OnDeskService/OnDeskService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const ImagesProjModal = () => {
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
  const { currentPid, imagesModal } = useStoreViewProj();
  const [ProjectImages, setProjectImages] = useState<GETProjectImagesBody[]>();

  const [state, setState] = useState(initialState);

  const { disabled } = useStoreGlobal();

  const [description, setDescription] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = ({ fileList }: UploadChangeParam) =>
    setState({ ...state, fileList: fileList });

  useEffect(() => {
    GETProjectImagesFinal(currentPid, messageApi).then((res: any) =>
      setProjectImages(res.data)
    );

    return () => {
      setProjectImages(undefined);
    };
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onSubmit = () => {
    const files = state.fileList
      .filter((fdata) => fdata.status === "done")
      .map((data) => data?.response?.message);

    if (!files.length) return messageApi.error("No Files uploaded!");

    POSTProjectImages(
      {
        name: JSON.stringify(files),
        projectId: currentPid,
        description: description,
      },
      messageApi
    ).then(() => {
      setState(initialState);
    });
  };

  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={imagesModal}
      footer={false}
      maskClosable={true}
      onCancel={() =>
        dispatch({
          type: Ac.setImagesModal,
          payload: { imagesModal: false, currentPid: 0 },
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
        {ProjectImages ? (
          ProjectImages.map((images) => {
            const imageList: string[] = JSON.parse(images.name);
            return (
              <div className="ProjectImagesCarousel" key={images.id}>
                <Carousel
                  className=""
                  style={{ height: 400, marginBottom: 15 }}
                  autoplay
                  key={images.id}
                >
                  {imageList.map((imag, index) => (
                    <div key={index} className="">
                      <img
                        style={{ objectFit: "fill" }}
                        src={PROJECT_IMAGES + imag}
                        alt=""
                        width="auto"
                        height="400px"
                      />
                    </div>
                  ))}
                </Carousel>
                <p style={{ fontSize: 14 }}>{images.description}</p>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Modal>
  );
};

export default ImagesProjModal;
