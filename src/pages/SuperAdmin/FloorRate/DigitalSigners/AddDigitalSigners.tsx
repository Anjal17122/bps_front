import { useEffect, useState } from "react";
import { Button, Cascader, Col, Form, Row } from "antd";
import "../../../../Assets/scss/AddAdmin.scss";
import { DefaultOptionType } from "antd/lib/cascader";
import { AdminBody, getAdmins } from "../../../../Services/SuperAdminService";
import { AddDrawingSignersBody } from "../../../../Services/DigitalSignatureService";
import { submitFailed } from "../../../../Common/Form/FormData";

export const position = [
  { value: "1", label: "1" }, //window.globalConfig.drawingSignP1 ?? "फाट वाला" },
  { value: "2", label: "2" }, //window.globalConfig.drawingSignP2 ?? "इन्जिनियर​" },
  { value: "3", label: "3" }, //window.globalConfig.drawingSignP3 ?? "सिफारिश गर्ने" },
  { value: "4", label: "4" }, //window.globalConfig.drawingSignP4 ?? "स्वीकृत गर्ने" },
];

const AddDigitalSigners = () => {
  const [submitting, setSubmitting] = useState(false);
  const [admins, setAdmins] = useState<AdminBody[]>([]);

  useEffect(() => {
    getAdmins(10000, setSubmitting).then((res) => {
      setAdmins(res.data.adminList);
    });
    return () => {
      setAdmins([]);
    };
  }, []);

  const [form] = Form.useForm();

  const certificateType = [
    { value: "PLINTH", label: "PLINTH" },
    { value: "SUPERSTRUCTURE", label: "SUPERSTRUCTURE" },
    { value: "NIRMAN_SAMPANNA", label: "NIRMAN_SAMPANNA" },
    { value: "NOTICE15", label: "NOTICE (15 days)" },
    { value: "NOTICE7", label: "NOTICE (7 days)" },
    { value: "DRAWING", label: "DRAWING" },
    { value: "TIPPANI_PLINTH", label: "TIPPANI_PLINTH" },
    { value: "TIPPANI_SUPERSTRUCTURE", label: "TIPPANI_SUPERSTRUCTURE" },
  ];

  // const signatureType = [
  //   { value: 0, label: "PLINTH" },
  //   { value: 1, label: "PLINTH" },
  //   { value: 2, label: "SUPERSTRUCTURE" },
  //   { value: 3, label: "NIRMAN_SAMPANNA" },
  //   { value: 4, label: "NOTICE (15 days)" },
  //   { value: 5, label: "NOTICE (7 days)" },
  //   { value: 6, label: "DRAWING" },
  // ];

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
    const body: AddDrawingSignersBody = {
      name: labelPosition?.label ?? "",
      position: val.position[0],
      signaturePersonId: val.signaturePersonId[0],
    };
    try {
      // await addDigitalSigner(body, setSubmitting);
      form.resetFields();
    } catch (error) {}
  };

  function filter(inputValue: string, path: DefaultOptionType[]) {
    return path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <div className="AddAdminWrap">
      <Form
        form={form}
        className="AddAdmin"
        onFinishFailed={submitFailed}
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
    </div>
  );
};

export default AddDigitalSigners;

export const getAdminsToList = (
  admins: AdminBody[]
): { value: number; label: string }[] => {
  const data = admins.map((admin) => ({
    value: admin.id,
    label: `${admin.nameEng} (${admin.personRole.name}) ${admin.email}`,
  }));
  return data;
};
