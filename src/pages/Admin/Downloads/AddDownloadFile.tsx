import { Button, Form, Upload, message } from "antd";
import { useState } from "react";
import { submitFailedFinal } from "../../../Common/Form/FormData";
import { IMG_SAVE_URL } from "../../../Services/Api";
import { UploadOutlined } from "@ant-design/icons";
import { normFile } from "../../../constants/antdConstants";

const AddDownloadFile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading] = useState(false);

  function onSubmit() {
    // addDownloadFile({fileName: val.})
  }
  return (
    <Form
      onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
      size="middle"
      layout="vertical"
      onFinish={onSubmit}
    >
      {contextHolder}
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
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDownloadFile;
