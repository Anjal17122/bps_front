import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import {
  ColHeight,
  FormNReq,
  submitFailed,
} from "../../../Common/Form/FormData";
import { IMG_SAVE_URL, imgFolders } from "../../../Services/Api";
import { UploadOutlined } from "@ant-design/icons";
import { postNotice } from "../../../Services/AdminService";
import { UploadFiletyp } from "../../Consultant/ProjectCreate/Technical/UploadFiles/CreateUploadFiles";
import { normFile } from "../../../constants/antdConstants";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { copyImageFinal } from "../OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";

interface AddDownload {
  description: string;
  title: string;
  upload: UploadFiletyp[];
}

const AddNotice = () => {
  // const [necImg, setNecImg] = useState("");

  // const [tinymce, setTinymce] = useState("");
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
      noticeDetails: fileDetails,
    };
    const copyBody: {
      fileName: string;
      dir: string;
    }[] = fileDetails.map((x) => ({
      fileName: x?.fileName ?? "",
      dir: imgFolders.downloads,
    }));
    copyImageFinal(copyBody, messageApi).then(() => {
      postNotice(body, messageApi);
    });
  }

  // const [noticeType, setNoticeType] = useState("");

  // const handleEditorChange = (e: { target: { getContent: () => string } }) => {
  //   setTinymce(e.target.getContent());
  // };

  return (
    <div>
      {contextHolder}
      <Form
        onFinishFailed={submitFailed}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormNReq("title", "Title")}>
          <Input placeholder="Title" />
        </Form.Item>
        <Row gutter={24}>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormNReq("date", "Date")}>
              <Input placeholder="Date" />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormNReq("time", "Time")}>
              <Input placeholder="Time" />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            {/* <Form.Item {...FormNReq("type", "Type")}>
              <Cascader
                placeholder="Type"
                options={[
                  { value: "text", label: "Text with Image" },
                  { value: "image", label: "Image Only" },
                ]}
                onChange={(val: SingleValueType) =>
                  setNoticeType(val[0].toString())
                }
              />
            </Form.Item> */}
          </Col>
        </Row>
        {/* {noticeType === "text" && (
          <>
            <TinyMCE handleEditorChange={handleEditorChange} />
          </>
        )} */}
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

export default AddNotice;
