import { UploadOutlined } from "@ant-design/icons";
import "../../../../Assets/scss/AddSuperStructure.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { checkIfPDF } from "../Project/LandInfo/LandCard";
import { Button, Form, Upload, message } from "antd";
import { submitFailedFinal } from "../../../../Common/Form/FormData";
import {
  imgFolders,
  PDF_URL,
  IMG_GET_URL,
  IMG_SAVE_URL,
} from "../../../../Services/Api";
import { PUTplinthReq, putSuperSt } from "../../../../Services/PlinthService";
import { ParsedPlinth } from "../../../../Services/ProjectService";
import { useParams } from "react-router-dom";
import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";
import { normFile } from "../../../../constants/antdConstants";

export const clickonFile = {
  title: "Click on File to download",
  icon: <InfoCircleOutlined />,
};
const EditSuperSt = () => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (val) => {
    const filterImage = { ...val };
    delete filterImage.upload;
    const imagesOnly: {
      imageName: string;
      imageUrl: string;
    }[] = val.upload.map((val) => {
      if (val.status === "done") {
        return { imageName: val.name, imageUrl: val.response.message };
      } else {
        return {};
      }
    });
    const body: PUTplinthReq = {
      id: params.superstid ?? "",
      projectId: params.pid ?? "",
      requestForm: JSON.stringify(filterImage),
      images: JSON.stringify(imagesOnly),
    };

    copyImageFinal(
      imagesOnly.map((data) => ({
        fileName: data.imageUrl,
        dir: imgFolders.superstructure,
      })),
      messageApi
    ).then(() => {
      putSuperSt(body).then(() => {
        const newPlinth = JSON.parse(JSON.stringify(plinth));
        newPlinth.images = JSON.stringify(imagesOnly);
        localStorage.setItem("superst", JSON.stringify(newPlinth));
      });
    });
  };

  const getItem = localStorage.getItem("superst") || "{}";
  const allData = JSON.parse(getItem);
  const plinth: ParsedPlinth = {
    ...allData,
    requestForm: "",
    images: JSON.parse(allData.images),
  };

  const defaultFileList = plinth?.images?.map((img) => ({
    uid: img.imageUrl,
    name: img.imageName,
    url: checkIfPDF(img?.imageUrl || "")
      ? PDF_URL + `/${imgFolders.superstructure}/${img.imageUrl}`
      : IMG_GET_URL + `/${imgFolders.superstructure}/${img.imageUrl}`,
    status: "done",
    response: { message: img.imageUrl },
  }));

  return (
    <div>
      {contextHolder}
      <div>
        <div className="HeadBar">
          <div></div>
          <h1>
            <span className="title">Edit SuperStructure Files</span>
          </h1>
          <div></div>
        </div>
        <div className="AddSuperStructure">
          <Form
            layout="vertical"
            className="AddSuperStForm"
            size="middle"
            onFinish={onSubmit}
            onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          >
            <Form.Item
              label="Upload"
              className="uploadDiv"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              initialValue={defaultFileList}
              tooltip={clickonFile}
            >
              <Upload name="file" action={IMG_SAVE_URL}>
                <Button size="large" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
            <div className="formSubmitDiv">
              <SubmitBtn />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditSuperSt;
