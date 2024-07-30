import { Button, Cascader, Col, Form, Row, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

import { FormInstance } from "antd/es/form/Form";
import { BASE_URL } from "../../../Services/Api";
import { normFile } from "../../../constants/antdConstants";
import { CommonBody } from "../../../Services/OldPermitService";
import { toList } from "../../../Common/Form/FormData";

type Props = {
  handleFileSubmit: (values: UploadFormVals, form: FormInstance<any>) => void;
  docTypes: CommonBody[];
  submitting: boolean;
};

export function UploadForm({ handleFileSubmit, docTypes, submitting }: Props) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={(e) => handleFileSubmit(e, form)}
      name="uploadFileForm"
      layout="vertical"
    >
      <Row
        gutter={10}
        style={{
          backgroundColor: "white",
          marginBottom: 20,
          padding: 10,
        }}
      >
        <Col span={10}>
          <Form.Item
            name="docType"
            rules={[
              {
                required: true,
              },
            ]}
            label="Category"
          >
            <Cascader
              style={{
                width: 180,
              }}
              placeholder="Category"
              options={toList(docTypes)}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="File"
            name="fileName"
            rules={[
              {
                required: true,
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              action={BASE_URL + "/files"}
              listType="text"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export interface UploadFormVals {
  docType: string[];
  fileName: FileName[];
}

interface FileName {
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
  data?: any;
  message: string;
}

interface OriginFileObj {
  uid: string;
}
