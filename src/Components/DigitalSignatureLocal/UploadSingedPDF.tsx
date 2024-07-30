import { Button, Form, FormInstance, Upload } from "antd";
import { DIGI_SIGN_UPLOAD_URL } from "../../Services/Api";
import { submitFailed } from "../../Common/Form/FormDatas";
import { UploadOutlined } from "@ant-design/icons";
import { normFile } from "./DigitalSignatureLocal";

interface Props {
  uploadPDF: (values: ValuesUpload, from: FormInstance<any>) => void;
  submitting: boolean;
  type: string;
  filename: string;
}

export function UploadSingedPDF({
  uploadPDF,
  submitting,
  type,
  filename,
}: Props) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      key={3}
      onFinishFailed={submitFailed}
      size="middle"
      layout="vertical"
      onFinish={(values) => uploadPDF(values, form)}
    >
      <Form.Item
        className="UploadCertificateFormItem"
        name="filename"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        required={false}
        rules={[
          {
            required: true,
            message: "Please upload file!",
          },
        ]}
      >
        <Upload
          name="file"
          action={DIGI_SIGN_UPLOAD_URL + type + `&filename=${filename}`}
          listType="text"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" disabled={submitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export interface ValuesUpload {
  filename: Upload[];
}

interface Upload {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: Response;
  xhr: Xhr;
}

interface Xhr {}

interface Response {
  message: string;
}

interface OriginFileObj {
  uid: string;
}
