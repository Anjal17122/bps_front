import { useEffect, useState } from "react";
import { Row, Col, Form, Input, message } from "antd";
import { useParams } from "react-router-dom";
import {
  submitFailed,
  ColHeight,
  FormProps,
} from "../../../Common/Form/FormData";
import { IMG_GET_URL } from "../../../Services/Api";
import { uploadImgRule } from "../../Consultant/Register/RegisterHelper";
import {
  getOrganization,
  OrgOnly,
  putOrganization,
} from "../../../Services/UserService";
import EditAvatar from "../../../Components/Common/Avatar/EditAvatar";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const EditOrganization = () => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();
  const [imgNames, setImgNames] = useState({
    regFileName: "",
    panFileName: "",
    taxClearFileName: "",
    orgLogo: "",
  });

  const [orgDetail, setOrgDetail] = useState<OrgOnly>();

  useEffect(() => {
    getOrganization(params.id).then((res) => {
      setOrgDetail(res.data);
      const { orgLogo, regFileName, panFileName, taxClearFileName } = res.data;
      setImgNames({
        orgLogo: orgLogo ?? "",
        regFileName,
        panFileName,
        taxClearFileName,
      });
    });

    return () => setOrgDetail(undefined);
  }, []);

  interface FormVal {
    orgLogo: OrgLogo[];
    nameNep: string;
    name: string;
    email: string;
    phone: string;
    regNumber: string;
    panNumber: string;
    regFileName: RegFileName[];
    panFileName: string;
    taxClearFileName: string;
  }

  interface RegFileName {
    uid: string;
    name: string;
    status: string;
    url: string;
  }

  interface OrgLogo {
    status: string;
    url: string;
  }

  const onSubmit = (val: FormVal) => {
    const orgBody = {
      id: orgDetail?.id ?? 0,
      orgLogo: imgNames.orgLogo,
      nameNep: val.nameNep,
      name: val.name,
      phone: val.phone,
      email: val.email,
      regNumber: val.regNumber,
      panNumber: val.panNumber,
      regFileName: imgNames.regFileName,
      panFileName: imgNames.panFileName,
      taxClearFileName: imgNames.taxClearFileName,
    };

    putOrganization(orgBody, messageApi);
  };

  const [form] = Form.useForm();

  return (
    <div>
      {contextHolder}
      <PageHeader
        title="Edit Organization"
        subTitle="Edit Organization Details"
      />
      <div className="CenterForm">
        {orgDetail && (
          <Form
            initialValues={orgDetail}
            onFinishFailed={submitFailed}
            form={form}
            size="middle"
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row justify="center" className="OrgReg">
              <Col {...ColHeight(24)} style={{ paddingBottom: 20 }}>
                <div className="HeadinOrgReg RadioButtons">
                  <h2>Organization Details:</h2>
                </div>
                <Form.Item
                  name="orgLogo"
                  rules={[uploadImgRule(imgNames.orgLogo)]}
                >
                  <EditAvatar
                    src={IMG_GET_URL + "/" + "temp" + `/${imgNames.orgLogo}`}
                    name="Logo"
                    getImgName={(p) => setImgNames({ ...imgNames, orgLogo: p })}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("nameNep", "संस्थाको नाम")}>
                      <Input placeholder="संस्थाको नाम" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("name", "Organization Name")}>
                      <Input placeholder="Organization Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("email", "Email")}>
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("phone", "Phone")}>
                      <Input placeholder="Phone" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="PurpleCard">
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item {...FormProps("regNumber", "Company Reg No")}>
                        <Input placeholder="Company Reg No" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item {...FormProps("panNumber", "PAN Number")}>
                        <Input placeholder="PAN Number" />
                      </Form.Item>
                    </Col>
                    <Row justify="center" style={{ width: "100%" }}>
                      <Col {...ColHeight(8)}>
                        <Form.Item
                          name="regFileName"
                          rules={[uploadImgRule(imgNames.regFileName)]}
                        >
                          <EditAvatar
                            src={
                              IMG_GET_URL +
                              "/" +
                              "temp" +
                              `/${imgNames.regFileName}`
                            }
                            name="Registration"
                            getImgName={(p) =>
                              setImgNames({ ...imgNames, regFileName: p })
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col {...ColHeight(8)}>
                        <Form.Item
                          name="panFileName"
                          rules={[uploadImgRule(imgNames.panFileName)]}
                        >
                          <EditAvatar
                            src={
                              IMG_GET_URL +
                              "/" +
                              "temp" +
                              `/${imgNames.panFileName}`
                            }
                            name="PAN"
                            getImgName={(p) =>
                              setImgNames({ ...imgNames, panFileName: p })
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col {...ColHeight(8)}>
                        <Form.Item
                          name="taxClearFileName"
                          rules={[uploadImgRule(imgNames.taxClearFileName)]}
                        >
                          <EditAvatar
                            src={
                              IMG_GET_URL +
                              "/" +
                              "temp" +
                              `/${imgNames.taxClearFileName}`
                            }
                            name="Tax Clearance"
                            getImgName={(p) =>
                              setImgNames({ ...imgNames, taxClearFileName: p })
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <SubmitBtn />
            </Row>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditOrganization;
