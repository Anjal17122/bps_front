import { Button, Cascader, Col, Form, Row, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";

import { getAdminsToList, position } from "./AddDigitalSigners";

import "./DigitalSigners.scss";
import {
  GETdrawingsSignersBody,
  GETdrawingsSigners,
  DigitalSigner,
  POSTdrawingSignerBody,
  POSTdrawingSigner,
} from "../../../../Services/DigitalSignatureService";
import { AdminBody, getAdmins } from "../../../../Services/SuperAdminService";
import PageHeader from "../../../../Components/Common/PageHeader/PageHeader";
import { submitFailedFinal } from "../../../../Common/Form/FormData";
import { filter } from "../../../../constants/antdConstants";

const DrawingSigners = () => {
  const [submitting, setSubmitting] = useState(false);
  const [admins, setAdmins] = useState<AdminBody[]>([]);

  const [signers, setSigners] = useState<GETdrawingsSignersBody[]>();

  useEffect(() => {
    GETdrawingsSigners().then((res) => {
      setSigners(res.data);
      getAdmins(10000, setSubmitting).then((res) => {
        setAdmins(res.data.adminList);
      });
    });
    return () => {
      setAdmins([]);
      setSigners(undefined);
    };
  }, []);

  const columns = [
    {
      title: "SN",
      key: "sn",
      render: (text: DigitalSigner, test: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Name",
      key: "name",
      render: (text: DigitalSigner) => (
        <span>{text?.signaturePerson?.nameEng ?? ""}</span>
      ),
    },
    // {
    //   title: "Certificate Type",
    //   dataIndex: "certificateType",
    //   key: "certificateType",
    // },
    {
      title: "Position",
      key: "position",
      render: (text: DigitalSigner) => (
        <span>{position[text.position - 1].label}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: DigitalSigner) => (
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
  const [form] = Form.useForm();
  const onSubmit = async (val: valForm) => {
    const labelPosition = position.find(
      (data) => data.value === val.position[0]
    );
    const body: POSTdrawingSignerBody = {
      name: labelPosition?.label ?? "",
      position: parseInt(val.position[0]),
      signaturePersonId: val.signaturePersonId[0],
      isActive: true,
    };

    POSTdrawingSigner(body, setSubmitting).then(() => window.location.reload());
    // form.resetFields();
  };

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <PageHeader
        title="Drawings Signers List"
        subTitle="Admin Control Panel"
      />
      <div className="DigitalSigners">
        <Form
          form={form}
          className="AddSignerCard"
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <h2>Add Drawings Signer</h2>
          <Row gutter={20}>
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
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
        <h2>Drawings Signers</h2>

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

export default DrawingSigners;
