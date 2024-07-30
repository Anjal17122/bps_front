import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message } from "antd";
import "../../../../Assets/scss/AddSuperStructure.scss";
import { submitFailedFinal } from "../../../../Common/Form/FormData";
import { copyImage } from "../../../../Services/AddressService";
import { imgFolders, IMG_SAVE_URL } from "../../../../Services/Api";
import { POSTplinthReq, postSuperSt } from "../../../../Services/PlinthService";
import { useParams } from "react-router-dom";
import { normFile } from "../../../../constants/antdConstants";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";
import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";

const AddSuperStructure = () => {
  const params = useParams();

  const pid = params.pid ?? "";

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (val: any) => {
    const filterImage = { ...val };
    delete filterImage.upload;
    const imagesOnly: {
      imageName: string;
      imageUrl: string;
    }[] = val.upload.map((val: any) => {
      if (val.status === "done") {
        return { imageName: val.name, imageUrl: val.response.message };
      } else {
        return {};
      }
    });
    const body: POSTplinthReq = {
      projectId: pid,
      images: JSON.stringify(imagesOnly),
      requestForm: "",
    };
    copyImageFinal(
      imagesOnly.map((data) => ({
        fileName: data.imageUrl,
        dir: imgFolders.superstructure,
      })),
      messageApi
    ).then(() => {
      postSuperSt(body, messageApi);
    });
  };

  return (
    <div>
      {contextHolder}
      <div>
        <div className="HeadBar">
          <div></div>
          <h1>
            <span className="title">Add SuperStructure Files</span>
          </h1>
          <div></div>
        </div>
        <div className="AddSuperStructure">
          <Form
            className="AddSuperStForm"
            size="middle"
            onFinish={onSubmit}
            onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          >
            <Form.Item
              className="uploadDiv"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
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

export default AddSuperStructure;
