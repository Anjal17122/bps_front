import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message } from "antd";
import "../../../../Assets/scss/AddSuperStructure.scss";
import { submitFailedFinal } from "../../../../Common/Form/FormData";
import {
  PDF_URL,
  imgFolders,
  IMG_GET_URL,
  IMG_SAVE_URL,
} from "../../../../Services/Api";
import { ParsedPlinth } from "../../../../Services/ProjectService";
import { useParams } from "react-router-dom";
import { checkIfPDF } from "../Project/LandInfo/LandCard";
import { normFile } from "../../../../constants/antdConstants";

const ViewSuperSt = () => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const pid = params.pid ?? "";
  const superst = localStorage.getItem("superst") || "{}";
  // const getItem = (): string => {
  //   if (superst === null || superst === "null") {
  //     return `{"id":0,"description":null,"uploadedAt":"2021-03-29T09:16:24.136+00:00","projectId":0,"requestForm":"","images":"","status":"VERIFIED"}`;
  //   } else {
  //     return superst;
  //   }
  // };
  const allData = JSON.parse(superst);

  const plinth: ParsedPlinth = {
    ...allData,
    requestForm: "",
    images: allData === null ? [] : JSON.parse(allData.images),
    // images: superst === "null" ? [] : JSON.parse(allData.images),
  };

  const defaultFileList: any = plinth?.images?.map((img, index) => ({
    uid: img.imageUrl,
    name: img.imageName,
    url: checkIfPDF(img?.imageUrl)
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
            <span className="title">View Files</span>
          </h1>
          <div></div>
        </div>
        <div className="AddSuperStructure">
          {superst ? (
            <Form
              className="AddSuperStForm"
              size="middle"
              onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
            >
              <Form.Item
                className="uploadDiv"
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                initialValue={defaultFileList}
              >
                <Upload disabled name="file" action={IMG_SAVE_URL}>
                  <Button disabled size="small" icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewSuperSt;
