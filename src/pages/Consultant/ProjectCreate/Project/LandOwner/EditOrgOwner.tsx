import { UploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Upload, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColHeight,
  FormProps,
  submitFailed,
} from "../../../../../Common/Form/FormData";
import { getProvinces } from "../../../../../Services/AddressService";
import {
  imgFolders,
  IMG_GET_URL,
  IMG_SAVE_URL,
} from "../../../../../Services/Api";
import { editOrgOwner } from "../../../../../Services/CreateProjectService";
import { ActionType, MyStore } from "../../../../../Store/ContextApi";
import CommonHeader from "../../../../Admin/ProjectActionsAdmin/UploadCertificate/CommonHeader";
import { RequiredRule } from "../../../../common/forgot_password/ForgotPassword2";
import { getUser, getUserTyp } from "../../../../../Services/UserService";
import RollingLoading from "../../../../../Common/Loading/RollingLoading";
import PageHeader from "../../../../../Components/Common/PageHeader/PageHeader";
import { normFile } from "../../../../../constants/antdConstants";
import { copyImageFinal } from "../../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

const EditOrgOwner = () => {
  const [user, setUser] = useState<getUserTyp>();
  const [messageApi, contextHolder] = message.useMessage();

  const params = useParams();
  const history = useNavigate();

  const { state, dispatch } = useContext(MyStore);

  useEffect(() => {
    if (!state.provincePerma.length) {
      getProvinces().then((province) =>
        dispatch({ type: ActionType.setProviPerma, payload: province.data })
      );
    }
    getUser(params.personid ?? "0").then((user) => setUser(user.data));
    return () => {
      setUser(undefined);
    };
  }, []);

  interface Vals {
    nameNep: string;
    nameEng: string;
    email: string;
    primaryPhone: string;
    panNo: string;
    citizenshipNo: string;
    photoFileName: PhotoFileName[];
    citizenshipFileName: PhotoFileName[];
  }

  interface PhotoFileName {
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
    thumbUrl: string;
  }

  interface Response {
    message: string;
  }

  interface OriginFileObj {
    uid: string;
  }

  const onSubmit = (val: Vals) => {
    const citizenshipFileName = val.citizenshipFileName[0].response.message;
    const photoFileName = val.photoFileName[0].response.message;
    const body = {
      id: params.personid ?? "0",
      nameEng: val.nameEng,
      nameNep: val.nameNep,
      email: val.email,
      primaryPhone: val.primaryPhone,
      panNo: val.panNo,
      citizenshipNo: val.citizenshipNo,
      citizenshipFileName,
      photoFileName,
    };

    copyImageFinal(
      [
        { dir: imgFolders.person, fileName: photoFileName },
        {
          dir: imgFolders.citizenship,
          fileName: citizenshipFileName,
        },
      ],
      messageApi
    ).then(() => {
      editOrgOwner(body, messageApi).then(() => history(-1));
    });
  };

  return (
    <div style={{ background: "#B2BEB5" }}>
      {contextHolder}
      <CommonHeader />
      <PageHeader
        title="Add Organization Owner"
        subTitle="Add Organization Owner Details"
      />
      <div className="CenterForm">
        {!user ? (
          <RollingLoading />
        ) : (
          <Form
            initialValues={{
              ...user,
              citizenshipFileName: [
                {
                  uid: user.citizenshipFileName,
                  name: user.citizenshipFileName,
                  thumbUrl:
                    IMG_GET_URL +
                    `/${imgFolders.citizenship}/${user.citizenshipFileName}`,
                  status: "done",
                  response: { message: user.citizenshipFileName },
                },
              ],
              photoFileName: [
                {
                  uid: user.photoFileName,
                  name: user.photoFileName,
                  thumbUrl:
                    IMG_GET_URL + `/${imgFolders.person}/${user.photoFileName}`,
                  status: "done",
                  response: { message: user.photoFileName },
                },
              ],
            }}
            size="middle"
            onFinishFailed={submitFailed}
            layout="vertical"
            onFinish={onSubmit}
          >
            <div className="PurpleCard">
              <Row gutter={24} style={{ padding: "2%" }}>
                <Col {...ColHeight(12)}>
                  <Form.Item
                    name="photoFileName"
                    label="Stamp"
                    valuePropName="fileList"
                    rules={RequiredRule("Stamp")}
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      maxCount={1}
                      name="file"
                      action={IMG_SAVE_URL}
                      listType="picture"
                    >
                      <button
                        className="GreenBtn"
                        style={{ padding: "4px 10px" }}
                      >
                        <UploadOutlined /> Stamp
                      </button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col {...ColHeight(12)}>
                  <Form.Item
                    name="citizenshipFileName"
                    label="Company Reg."
                    valuePropName="fileList"
                    rules={RequiredRule("Company Reg.")}
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      maxCount={1}
                      name="file"
                      action={IMG_SAVE_URL}
                      listType="picture"
                    >
                      <button
                        className="GreenBtn"
                        style={{ padding: "4px 10px" }}
                      >
                        <UploadOutlined /> Registration
                      </button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row gutter={24} style={{ padding: "2%" }}>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("nameNep", "संस्थाको नाम")}>
                  <Input placeholder="संस्थाको नाम (नेपालीमा)" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("nameEng", "Organization Name")}>
                  <Input placeholder="Organization Name" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("email", "Email")}>
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("primaryPhone", "Phone")}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("panNo", "Pan No")}>
                  <Input placeholder="Pan No" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("citizenshipNo", "Company Reg No")}>
                  <Input placeholder="Company Reg No" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={"end"}>
              <SubmitBtn />
            </Row>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditOrgOwner;
