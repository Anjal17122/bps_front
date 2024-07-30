import { Button, Form, Input, Upload, message } from "antd";
import { FormNReq, submitFailedFinal } from "../../../Common/Form/FormData";
import { IMG_SAVE_URL, imgFolders } from "../../../Services/Api";
import { UploadOutlined } from "@ant-design/icons";
import { postDownload } from "../../../Services/AdminService";
import { copyImageFinal } from "../../../Services/AddressService";
import { UploadFiletyp } from "../../Consultant/ProjectCreate/Technical/UploadFiles/CreateUploadFiles";
import { normFile } from "../../../constants/antdConstants";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface AddDownload {
  description: string;
  title: string;
  upload: UploadFiletyp[];
}

const AddDownloads = () => {
  const [messageApi, contextHolder] = message.useMessage();

  function onSubmit(val: AddDownload) {
    const fileDetails = val.upload.map((x) => {
      if (x.status === "done") {
        return { fileName: x.response.message, title: x.name };
      } else {
        return null;
      }
    });
    const body = {
      title: val.title,
      description: val.description,
      publicFileDetails: fileDetails,
    };
    const copyBody: {
      fileName: string;
      dir: string;
    }[] = fileDetails.map((x) => ({
      fileName: x?.fileName!,
      dir: imgFolders.downloads,
    }));
    copyImageFinal(copyBody, messageApi).then(() => {
      postDownload(body, messageApi);
    });
  }

  return (
    <div>
      {contextHolder}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormNReq("title", "Title")}>
          <Input />
        </Form.Item>
        <Form.Item {...FormNReq("description", "Description")}>
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload files!" }]}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="file" action={IMG_SAVE_URL} listType="text">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <SubmitBtn />
      </Form>
    </div>
  );
};

export default AddDownloads;
