import { Form, Modal, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import { getToken } from "../../../Services/UserService";
import { BASE_URL } from "../../../Services/Api";
import { UploadOutlined } from "@ant-design/icons";
import LeftBorderBtn from "../../../Common/TableButton/LeftBorderBtn";
import { submitFailedFinal } from "../../../Common/Form/FormData";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { normFile } from "../../../constants/antdConstants";

type Props = {
  name: string;
  onClose: () => void;
};

const UserFilesModal = ({ name, onClose }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const beforeUpload = (file: RcFile) => {
    const isJpg = file.type === "image/jpeg";
    if (!isJpg) {
      messageApi.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      messageApi.error("Image must smaller than 1MB!");
    }
    return isJpg && isLt2M;
  };

  const onSubmit = (values) => {
    messageApi.success("Successfully Submitted");
  };

  return (
    <Modal
      open={true}
      width={"auto"}
      footer={null}
      onCancel={onClose}
      title={false}
      centered={true}
    >
      {contextHolder}
      <h1>User Files</h1>
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload files!" }]}
        >
          <Upload
            maxCount={1}
            name="file"
            headers={{ authorization: getToken() }}
            beforeUpload={(e) => beforeUpload(e)}
            // onChange={(e) => onChange(e)}
            action={
              BASE_URL +
              `/images/digitalsignatureupload?dir=consultantDetail&filename=${name.replaceAll(
                " ",
                "_"
              )}_swikriti_${Date.now()}.jpeg`
            }
          >
            <LeftBorderBtn color="amber">
              <UploadOutlined />
              &nbsp; Upload
            </LeftBorderBtn>
          </Upload>
        </Form.Item>

        <SubmitBtn />
      </Form>
    </Modal>
  );
};

export default UserFilesModal;
