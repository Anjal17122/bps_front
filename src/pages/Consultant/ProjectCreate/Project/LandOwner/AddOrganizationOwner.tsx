import { UploadOutlined } from "@ant-design/icons";
import { Cascader, Col, Form, Input, Row, Upload, message } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColHeight,
  FormProps,
  submitFailedFinal,
  toList,
} from "../../../../../Common/Form/FormData";
import {
  copyImageFinal,
  getDistricts,
  getMunis,
  getProvinces,
  getWards,
} from "../../../../../Services/AddressService";
import { imgFolders, IMG_SAVE_URL } from "../../../../../Services/Api";
import { POSTOrgOwnerFinal } from "../../../../../Services/CreateProjectService";
import { ActionType, MyStore } from "../../../../../Store/ContextApi";
import CommonHeader from "../../../../Admin/ProjectActionsAdmin/UploadCertificate/CommonHeader";
import { RequiredRule } from "../../../../common/forgot_password/ForgotPassword2";
import PageHeader from "../../../../../Components/Common/PageHeader/PageHeader";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { filter, normFile } from "../../../../../constants/antdConstants";

const AddOrganizationOwner = ({ houseOwner = false }) => {
  console.log({ houseOwner });

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
  }, []);

  interface Vals {
    nameNep: string;
    nameEng: string;
    email: string;
    primaryPhone: string;
    panNo: string;
    citizenshipNo: string;
    provinceIdPerma: string[];
    districtIdPerma: string[];
    municipalityIdPerma: string[];
    wardIdPerma: string[];
    toleEngPerma: string;
    toleNepPerma: string;
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
    const citizenshipFileName =
      val.citizenshipFileName[0].response?.message ?? "";
    const photoFileName = val.photoFileName[0].response?.message ?? "";
    const body = {
      type: "organization",
      landId: parseInt(params.landid ?? "0"),
      nameEng: val.nameEng,
      nameNep: val.nameNep,
      email: val.email,
      primaryPhone: val.primaryPhone,
      panNo: val.panNo,
      citizenshipNo: val.citizenshipNo,
      addresses: [
        {
          provinceId: val.provinceIdPerma[0],
          districtId: val.districtIdPerma[0],
          municipalityId: val.municipalityIdPerma[0],
          wardId: val.wardIdPerma[0],
          type: 0,
          toleNep: val.toleNepPerma,
          toleEng: val.toleEngPerma,
        },
      ],
      citizenshipFileName,
      photoFileName,
    };

    POSTOrgOwnerFinal(
      localStorage.getItem("isPerma") === "true"
        ? houseOwner
          ? "/person/perma/house/owner?perma=true"
          : "/person/perma/owner/perma"
        : undefined,
      body,
      messageApi
    ).then(() => {
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
        history(-1);
      });
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
        <Form
          size="middle"
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
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
          <div className="PurpleCard">
            <h3>Organization Address</h3>
            <Row gutter={20}>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("provinceIdPerma", "Province")}>
                  <Cascader
                    options={toList(state.provincePerma)}
                    placeholder="Please select"
                    showSearch={{ filter }}
                    onChange={(val) => {
                      const myId = val[0].toString() ?? "";
                      getDistricts({ id: myId }).then((res) => {
                        dispatch({
                          type: ActionType.setDistPerma,
                          payload: res.data,
                        });
                        dispatch({
                          type: ActionType.setSelectedAddress,
                          payload: { type: "province", value: myId },
                        });
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("districtIdPerma", "District")}>
                  <Cascader
                    options={toList(state.districtsPerma)}
                    placeholder="Please select"
                    showSearch={{ filter }}
                    onChange={(val) => {
                      const myId = val[0].toString() ?? "";
                      getMunis({
                        provinceid: state.selectedAddress.province,
                        districtid: myId,
                      }).then((res) => {
                        dispatch({
                          type: ActionType.setMunisPerma,
                          payload: res.data,
                        });
                        dispatch({
                          type: ActionType.setSelectedAddress,
                          payload: { type: "district", value: myId },
                        });
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item
                  {...FormProps("municipalityIdPerma", "Municipality")}
                >
                  <Cascader
                    options={toList(state.munisPerma)}
                    placeholder="Please select"
                    showSearch={{ filter }}
                    onChange={(val) => {
                      const myId = val[0].toString() ?? "";
                      getWards({
                        districtid: state.selectedAddress.district,
                        provinceid: state.selectedAddress.province,
                        municipalityid: myId,
                      }).then((res) => {
                        dispatch({
                          type: ActionType.setWardsPerma,
                          payload: res.data,
                        });
                        dispatch({
                          type: ActionType.setSelectedAddress,
                          payload: { type: "muni", value: myId },
                        });
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("wardIdPerma", "Ward")}>
                  <Cascader
                    options={toList(state.wardsPerma)}
                    placeholder="Please select"
                    showSearch={{ filter }}
                  />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("toleEngPerma", "Tole")}>
                  <Input placeholder="Tole" />
                </Form.Item>
              </Col>
              <Col {...ColHeight(12)}>
                <Form.Item {...FormProps("toleNepPerma", "टोल")}>
                  <Input placeholder="टोल" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row justify={"end"}>
            <SubmitBtn />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddOrganizationOwner;
