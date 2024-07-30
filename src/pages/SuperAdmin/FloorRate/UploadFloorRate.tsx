import { Divider, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { PDF_FLOOR_RATE, UPLOAD_FLOOR_RATE } from "../../../Services/Api";
import { getToken } from "../../../Services/UserService";
type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const UploadFloorRate = ({ isVisible, onClose }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      messageApi.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Modal
      bodyStyle={{
        justifyContent: "center",
        display: "flex",
        minHeight: 250,
        alignItems: "center",
        flexFlow: "column",
      }}
      title={
        <span style={{ fontSize: 16, fontWeight: 500 }}>Upload Floor Rate</span>
      }
      width={350}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      destroyOnClose={true}
    >
      {contextHolder}
      <a href={PDF_FLOOR_RATE} target={"_blank"} rel="noreferrer noopener">
        <Button type="primary">view</Button>
      </a>
      <Divider></Divider>
      <Upload
        listType="picture"
        maxCount={1}
        name="file"
        action={UPLOAD_FLOOR_RATE}
        headers={{ authorization: getToken() }}
        onChange={onChange}
      >
        <Button type="primary" ghost icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
    </Modal>
  );
};

export default UploadFloorRate;
