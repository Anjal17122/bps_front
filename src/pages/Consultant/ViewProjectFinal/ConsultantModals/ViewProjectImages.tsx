import { Button, Carousel, Input, Modal, Upload, message } from "antd";
import  { useEffect, useState } from "react";
import { IMG_SAVE_URL, PROJECT_IMAGES } from "../../../../Services/Api";
import {
  GETProjectImagesBody,
  GETProjectImagesFinal,
  POSTProjectImagesFinal,
} from "../../../../Services/ProjectImagesServices";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
import { Ac } from "../../../../Store/StoreViewProject/types";

// interface Props {
//   isVisible: boolean;
//   onClose: () => void;
//   data: GETProjectImagesBody[] | undefined;
// }

const ViewProjectImages = () => {
  const { viewProjectImages } = useStoreModalCon();
  const { currentPid, disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const [projectImages, setProjectImages] = useState<GETProjectImagesBody[]>();

  const [description, setDescription] = useState("");

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

  const [state, setState] = useState(initialState);

  useEffect(() => {
    GETProjectImagesFinal(currentPid, messageApi).then((res) => {
      setProjectImages(res.data);
    });
    return () => {
      setProjectImages(undefined);
    };
  }, []);

  const handleChange = ({ fileList }: UploadChangeParam) =>
    setState({ ...state, fileList: fileList });

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

    POSTProjectImagesFinal(
      {
        name: JSON.stringify(files),
        projectId: currentPid,
        description: description,
      },
      messageApi
    ).then(() => {
      dispatchModalCon({
        type: AcMCon.setUploadProjectImages,
        payload: false,
      });
      setState(initialState);
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="SelectUserModal"
        bodyStyle={{ borderRadius: 16 }}
        open={viewProjectImages}
        footer={false}
        maskClosable={false}
        onCancel={() => {
          dispatch({
            type: Ac.setCurrentPid,
            payload: 0,
          });
          dispatchModalCon({
            type: AcMCon.setviewProjectImages,
            payload: false,
          });
        }}
        destroyOnClose={true}
      >
        id: {currentPid}
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
        {projectImages?.map((images) => {
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
        })}
      </Modal>
    </>
  );
};

export default ViewProjectImages;
