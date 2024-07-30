import { Button, Cascader, Col, Form, Row, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import "../../../../Assets/scss/AddAdmin.scss";
import { getAdminsToList, position } from "./AddDigitalSigners";
import "./DigitalSigners.scss";
import {
  DigitalSigner,
  getDigitalSigner,
  AddDigitalSignBody,
  addDigitalSigner,
} from "../../../../Services/DigitalSignatureService";
import { AdminBody, getAdmins } from "../../../../Services/SuperAdminService";
import PageHeader from "../../../../Components/Common/PageHeader/PageHeader";
import { submitFailedFinal } from "../../../../Common/Form/FormData";
import { filter } from "../../../../constants/antdConstants";

const DigitalSigners = () => {
  const [signers, setSigners] = useState<DigitalSigner[]>();
  const [submitting, setSubmitting] = useState(false);
  const [admins, setAdmins] = useState<AdminBody[]>([]);

  useEffect(() => {
    getDigitalSigner().then((res) => {
      setSigners(res.data);
      getAdmins(10000, messageApi).then((res) => {
        setAdmins(res.data.adminList);
      });
    });
    return () => {
      setAdmins([]);
      setSigners(undefined);
    };
  }, []);

  const [form] = Form.useForm();

  const certificateType = [
    { value: "PLINTH", label: "PLINTH" },
    { value: "SUPERSTRUCTURE", label: "SUPERSTRUCTURE" },
    { value: "NIRMAN_SAMPANNA", label: "NIRMAN_SAMPANNA" },
    { value: "ABHILEKHIKARAN", label: "ABHILEKHIKARAN" },
    { value: "NOTICE15", label: "NOTICE (15 days)" },
    { value: "NOTICE7", label: "NOTICE (7 days)" },
    { value: "DRAWING", label: "DRAWING" },
    { value: "TIPPANI_PLINTH", label: "TIPPANI_PLINTH" },
    { value: "TIPPANI_SUPERSTRUCTURE", label: "TIPPANI_SUPERSTRUCTURE" },
    { value: "TIPPANI_NIRMAN_SAMPANNA", label: "TIPPANI_NIRMAN_SAMPANNA" },
    { value: "REGULAR", label: "REGULAR" },
  ];

  const columns = [
    {
      title: "SN",
      key: "sn",
      render: (text: any, test: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      key: "name",
      render: (text: DigitalSigner) => (
        <span>{text?.signaturePerson?.nameEng ?? ""}</span>
      ),
    },
    {
      title: "Certificate Type",
      dataIndex: "certificateType",
      key: "certificateType",
    },
    {
      title: "Position",
      key: "position",
      render: (text: DigitalSigner) => <span>{text.position}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="link" style={{ marginLeft: 0 }}>
          Edit
        </Button>
      ),
    },
  ];

  interface valForm {
    certificateType: string[];
    signaturePersonId: number[];
    position: string[];
    signatureType: number[];
  }
  const onSubmit = async (val: valForm) => {
    const labelPosition = position.find(
      (data) => data.value === val.position[0]
    );
    const body: AddDigitalSignBody = {
      name: labelPosition?.label ?? "",
      certificateType: val.certificateType[0],
      signatureType: 0,
      position: val.position[0],
      signaturePersonId: val.signaturePersonId[0],
    };

    addDigitalSigner(body, setSubmitting).then(() => {
      form.resetFields();
    });
  };

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <PageHeader title="Signers List" subTitle="Admin Control Panel" />

      <div className="DigitalSigners">
        <Form
          form={form}
          className="AddSignerCard"
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <h1>Add Digital Signerss</h1>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Certificate Type"
                name="certificateType"
                rules={[
                  {
                    required: true,
                    message: "Please select Certificate Type!",
                  },
                ]}
              >
                <Cascader
                  placeholder="Certificate Type"
                  options={certificateType}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Sign Position"
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Please select Sign Position!",
                  },
                ]}
              >
                <Cascader placeholder="Sign Position" options={position} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Select Admin"
                name="signaturePersonId"
                rules={[
                  {
                    required: true,
                    message: "Please select Admin!",
                  },
                ]}
              >
                <Cascader
                  placeholder="Select Admin"
                  options={getAdminsToList(admins)}
                  showSearch={{ filter }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button htmlType="submit" type="primary" loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <h2>Digital Signers</h2>
        <Spin spinning={!signers}>
          <Table
            size="small"
            className="SignersTable"
            dataSource={
              signers ? signers.map((sign) => ({ ...sign, key: sign.id })) : []
            }
            columns={columns}
          ></Table>
        </Spin>
      </div>
    </>
  );
};

export default DigitalSigners;
