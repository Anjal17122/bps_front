import { Upload, Button, Tooltip, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MyAvatar from "./Avatar";
import { IMG_SAVE_URL } from "../../../Services/Api";
import { getToken } from "../../../Services/UserService";

interface Props {
  src: string;
  name: string;
  getImgName: (x: string) => void;
}

const EditAvatar = ({ src, name, getImgName }: Props) => {
  const [myMessageApi, content] = message.useMessage();
  const props = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken() || "",
    },
    showUploadList: false,

    onChange(info: any) {
      if (info.file.status !== "uploading") {
        myMessageApi.info(`Uploading ${info.file.name}`);
      }
      if (info.file.status === "done") {
        getImgName(info.fileList[0].response.message);
        myMessageApi.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        myMessageApi.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="EditAvatar">
      <MyAvatar src={src} />
      <Upload {...props} style={{ marginBottom: 5 }}>
        <Tooltip title={"Upload New " + name}>
          <Button type="primary" icon={<UploadOutlined />}>
            {name}
          </Button>
        </Tooltip>
      </Upload>
    </div>
  );
};

export default EditAvatar;
