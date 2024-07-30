import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Cascader,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { UploadButton } from "../../../Common/Upload/Upload";
import * as getA from "../../../Services/AddressService";
import { BASE_URL, IMG_SAVE_URL } from "../../../Services/Api";
import "../../../Assets/scss/Register.scss";
import { getDist, getMun, onRegSubmit, uploadImgRule } from "./RegisterHelper";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import NewAddress, {
  handleFormValuesChangeRegister,
} from "../../../Common/NewAddress/NewAddress";
import {
  ColHeight,
  flexCenter,
  FormProps,
  getWard,
  InputDateValid,
  submitFailedFinal,
  toList,
} from "../../../Common/Form/FormData";
import { filter } from "../../../constants/antdConstants";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

export const emailValid = (data: number) => {
  if (data === 2) {
    return "";
  } else if (data === 0) {
    return "error";
  } else if (data === 1) {
    return "success";
  }
};

const Register = () => {
  const [orgDist, setOrgDist] = useState<getA.CommonType[]>([]);
  const [orgMunis, setOrgMunis] = useState<getA.CommonType[]>([]);
  const [orgWard, setOrgWard] = useState<getA.CommonType[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [necImg, setNecImg] = useState("");

  const [userOrg, setUserOrg] = useState(0);
  const [imgNames, setImgNames] = useState({
    person: "",
    citizenship: "",
    orgReg: "",
    orgPAN: "",
    orgTax: "",
    necImg: "",
    orgLogo: "",
  });

  const initialAdds = { state: "", district: "", muni: "", ward: "" };
  const [selected, setSelected] = useState(initialAdds);
  const [allDistricts, setAllDistricts] = useState<{ name: string }[]>([]);

  const { state, dispatch } = useContext(MyStore);

  useEffect(() => {
    if (!state.provincePerma.length) {
      getA
        .getProvinces()
        .then((province) =>
          dispatch({ type: ActionType.setProviPerma, payload: province.data })
        );
    }
    getA.getDistrictsAll().then((res) => {
      setAllDistricts(
        res.data?.map((dist) => ({ name: dist.name.replace(" District", "") }))
      );
    });

    return () => setAllDistricts([]);
  }, []);

  const [form] = Form.useForm();

  const onSubmit = onRegSubmit(
    imgNames,
    userOrg,
    messageApi,
    form,
    state.sameTempAndPermaAdd
  );

  const getDistricts = getDist(setSelected, selected);
  const getMunis = getMun(selected, setSelected);
  const getWards = getWard(selected);

  const normFile = (e: {
    fileList: {
      name: string;
      status: string;
      response: { message: string };
    }[];
  }) => {
    setNecImg("Uploading...");
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList[0].status === "done") {
      setImgNames({ ...imgNames, necImg: e.fileList[0].response.message });
      return setNecImg(e.fileList[0].name);
    }
    return e && e.fileList;
  };
  // function onValuesChange(changed: any) {
  //   if (!changed.nameNep || !changed) {
  //     return;
  //   } else {
  //     form.setFieldsValue({ nameNep: preeti(changed.nameNep) });
  //   }
  // }
  const [uniqueEmail, setUniqueEmail] = useState(2);
  const [uniquePhone, setUniquePhone] = useState(2);
  const [uniqueUsername, setUniqueUsername] = useState(2);

  const checkEmail = checkEmailFn(
    setUniqueEmail,
    setUniquePhone,
    setUniqueUsername
  );

  return (
    <div>
      {contextHolder}
      <div
        className="CenterForm"
        style={{ padding: "1%", background: "#253241", textAlign: "center" }}
      >
        <h2 style={{ color: "white" }}>
          नक्सा पास सेवा प्रदान गर्नको लागि तलको फारम भरि सुचिकृतको लागि पठाउनु
          होस |
        </h2>
      </div>
      <div className="CenterForm Register">
        <Form
          autoComplete="dwq"
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          form={form}
          onValuesChange={(val) =>
            handleFormValuesChangeRegister(
              val,
              form,
              dispatch,
              setOrgDist,
              setOrgMunis,
              setOrgWard
            )
          }
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Row justify="center">
            <Col {...ColHeight(16)} className="flexEnd">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  className="RadioButtons"
                  {...FormProps("consultantType", "Consultant Type:")}
                >
                  <Radio.Group onChange={(e) => setUserOrg(e.target.value)}>
                    <Radio value={1}>Organization</Radio>
                    <Radio value={0}>Individual</Radio>
                  </Radio.Group>
                </Form.Item>
                {/* <Form.Item {...FormProps("usertype", "User Type")}>
                <Cascader
                  placeholder="Select User Type"
                  options={toList(usertype)}
                />
              </Form.Item> */}
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("nameNep", "नाम नेपालीमा")}>
                      <Input autoComplete="off" placeholder="नाम नेपालीमा" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("nameEng", "Name in English")}>
                      <Input placeholder="Name in English" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      // style={{ marginBottom: 12 }}
                      validateTrigger={["onBlur"]}
                      validateStatus={emailValid(uniqueEmail)}
                      label="E-mail"
                      required={false}
                      name="email"
                      // hasFeedback
                      rules={[
                        checkEmail("/person/email?email=", 0, "Email"),
                        // {
                        //   required: true,
                        //   type: "email",
                        //   message: "Please enter valid Email!",
                        // },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      // style={{ marginBottom: 12 }}
                      validateTrigger={["onBlur"]}
                      validateStatus={emailValid(uniquePhone)}
                      label="Phone"
                      required={false}
                      name="phone"
                      hasFeedback
                      rules={[checkEmail("/person/phone?phone=", 1, "Phone")]}
                    >
                      <Input placeholder="98.... / 014..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // style={{ marginBottom: 12 }}
                      validateTrigger={["onBlur"]}
                      validateStatus={emailValid(uniqueUsername)}
                      label="Username"
                      required={false}
                      name="Username"
                      hasFeedback
                      rules={[
                        checkEmail("/user/username?username=", 2, "Username"),
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      required={false}
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "min length: 6",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      required={false}
                      name="confirm"
                      label="Confirm Password"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(value) {
                            if (
                              !value ||
                              getFieldValue("password") ===
                                getFieldValue("confirm")
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject("Passwords do not match!");
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Form.Item {...FormProps("panNo", "PAN")}>
                      <Input placeholder="panNo" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Form.Item {...FormProps("NEC", "NEC")}>
                      <Input placeholder="NEC" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Form.Item
                      rules={[uploadImgRule(imgNames.necImg)]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      extra={necImg}
                      label="Upload NEC Certificate"
                      required={false}
                      name="uploadNEC"
                    >
                      <Upload
                        name="file"
                        action={IMG_SAVE_URL}
                        showUploadList={false}
                      >
                        <Button>
                          <UploadOutlined /> Click to upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="PurpleCard">
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                      <Form.Item {...FormProps("cNo", "Citizenship No")}>
                        <Input placeholder="Citizenship No." />
                      </Form.Item>
                      <Form.Item
                        {...FormProps(
                          "cIDistrict",
                          "Citizenship Issue District"
                        )}
                      >
                        <Select
                          showSearch
                          placeholder="Select..."
                          optionFilterProp="children"
                          filterOption={(input, option: any) =>
                            (option?.children as string)
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {allDistricts.map((dist, index) => (
                            <Select.Option key={index} value={dist.name}>
                              {dist.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...InputDateValid(
                          "cDate",
                          "Citizenship Issue Date (in B.S.)"
                        )}
                      >
                        <Input placeholder="YYYY-MM-DD" />
                      </Form.Item>
                    </Col>
                    <Col {...ColHeight(10)} style={flexCenter}>
                      <Form.Item
                        name="cship11"
                        rules={[uploadImgRule(imgNames.citizenship)]}
                      >
                        <UploadButton
                          label="Upload Citizenship"
                          uploadURL={IMG_SAVE_URL}
                          getImgName={(x) =>
                            setImgNames({ ...imgNames, citizenship: x })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Form.Item
                  {...FormProps("gender", "Gender:")}
                  className="RadioButtons"
                >
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="others">Others</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  {...FormProps("maritalStatus", "Marital Status:")}
                  className="RadioButtons"
                >
                  <Radio.Group>
                    <Radio value="married">Married</Radio>
                    <Radio value="unmarried">Unmarried</Radio>
                  </Radio.Group>
                </Form.Item>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("fatherNep", "बुवाको नाम")}>
                      <Input placeholder="बुवाको नाम" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("fatherEng", "Father's Name")}>
                      <Input placeholder="Father's Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("gfNep", "हजुर बुवाको नाम")}>
                      <Input placeholder="हजुर बुवाको नाम" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("gfName", "Grand Father's Name")}>
                      <Input placeholder="Grand Father's Name" />
                    </Form.Item>
                  </Col>
                </Row>
                {NewAddress(dispatch, state)}
                {/* {PermaAddress(
                states,
                getDistricts,
                setDistricts,
                districts,
                getMunis,
                setMunis,
                munis,
                getWards,
                setWards,
                wards
              )} */}
                {/* <div className="PurpleCard">
                <h3>Current Address</h3>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cState", "State")}>
                      <Cascader
                        placeholder="State"
                        options={toList(states)}
                        onChange={() => getDistricts(v, setCDistricts)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cDistrict", "District")}>
                      <Cascader
                        placeholder="District"
                        options={toList(cDistricts)}
                        onChange={() => getMunis(v, setcMunis)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cMuni", "Municipality")}>
                      <Cascader
                        placeholder="Municipality"
                        options={toList(cmunis)}
                        onChange={() => getWards(v, setcWards)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cward", "ward")}>
                      <Cascader placeholder="ward" options={toList(cwards)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cToleNep", "टोल​")}>
                      <Input placeholder="टोल​" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item {...FormProps("cToleEng", "Tole")}>
                      <Input placeholder="Tole" />
                    </Form.Item>
                  </Col>
                </Row>
              </div> */}
              </Col>
            </Col>
            <Col {...ColHeight(6)} style={{ paddingBottom: 20 }}>
              <Form.Item
                name="personimg"
                rules={[uploadImgRule(imgNames.person)]}
              >
                <UploadButton
                  label="Upload User Photo"
                  uploadURL={IMG_SAVE_URL}
                  getImgName={(x) => setImgNames({ ...imgNames, person: x })}
                />
              </Form.Item>
            </Col>
          </Row>
          {userOrg === 1 ? null : (
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name={"orgId"}
                  label="Organization ID (Note: Please provide only if you are affiliated with an organization)"
                  required={false}
                >
                  <Input placeholder="OrganizationID" />
                </Form.Item>
              </Col>
            </Row>
          )}
          {userOrg === 0 ? null : (
            <div className="OrgRegWrapper">
              <Row justify="center" className="OrgReg">
                <Col {...ColHeight(24)} style={{ paddingBottom: 20 }}>
                  <div className="HeadinOrgReg RadioButtons">
                    <h2>Organization Details:</h2>
                  </div>
                  <Form.Item
                    name="orglogo12"
                    rules={[uploadImgRule(imgNames.orgLogo)]}
                  >
                    <UploadButton
                      uploadURL={IMG_SAVE_URL}
                      label="Upload Logo"
                      getImgName={(x) =>
                        setImgNames({ ...imgNames, orgLogo: x })
                      }
                    />
                  </Form.Item>
                </Col>
                {/* <Col {...Colheight(16)} style={flexCenter}> */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item {...FormProps("orgnameNep", "संस्थाको नाम")}>
                        <Input placeholder="संस्थाको नाम" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...FormProps("orgnameEng", "Organization Name")}
                      >
                        <Input placeholder="Organization Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item {...FormProps("orgEmail", "Email")}>
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item {...FormProps("orgPhone", "Phone")}>
                        <Input placeholder="Phone" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="PurpleCard">
                    <Row gutter={20}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...FormProps("Companyreg", "Company Reg No")}
                        >
                          <Input placeholder="Company Reg No" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("pan", "PAN Number")}>
                          <Input placeholder="PAN Number" />
                        </Form.Item>
                      </Col>
                      <Row justify="center" style={{ width: "100%" }}>
                        <Col {...ColHeight(8)}>
                          <Form.Item
                            name="orgClogo"
                            rules={[uploadImgRule(imgNames.orgReg)]}
                          >
                            <UploadButton
                              uploadURL={IMG_SAVE_URL}
                              getImgName={(x) =>
                                setImgNames({ ...imgNames, orgReg: x })
                              }
                              label="Company Registration"
                            />
                          </Form.Item>
                        </Col>
                        <Col {...ColHeight(8)}>
                          <Form.Item
                            name="panimg11"
                            rules={[uploadImgRule(imgNames.orgPAN)]}
                          >
                            <UploadButton
                              getImgName={(x) =>
                                setImgNames({ ...imgNames, orgPAN: x })
                              }
                              label="PAN Number"
                              uploadURL={IMG_SAVE_URL}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...ColHeight(8)}>
                          <Form.Item
                            name="taxc1"
                            rules={[uploadImgRule(imgNames.orgTax)]}
                          >
                            <UploadButton
                              getImgName={(x) =>
                                setImgNames({ ...imgNames, orgTax: x })
                              }
                              label="Tax Clearance"
                              uploadURL={IMG_SAVE_URL}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Row>
                  </div>
                  <div className="PurpleCard">
                    <h3>Current Address</h3>
                    <Row gutter={20}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("orgState", "State")}>
                          <Cascader
                            popupClassName="orgStateList"
                            options={toList(state.provincePerma)}
                            placeholder="Please select"
                            showSearch={{ filter }}
                            onChange={(v) => getDistricts(v, setOrgDist)}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("orgDistrict", "District")}>
                          <Cascader
                            popupClassName="orgDistrictList"
                            options={toList(orgDist)}
                            placeholder="Please select"
                            onChange={(v) => getMunis(v, setOrgMunis)}
                            showSearch={{ filter }}
                          />
                          {/* <Select
                          showSearch
                          placeholder="District..."
                          optionFilterProp="children"
                          onChange={(v: valueType) => getMunis(v, setOrgMunis)}
                          filterOption={(input, option: any) =>
                            (option?.children as string)
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {orgDist.map((prov) => (
                            <Select.Option value={prov.id}>
                              {prov.name}
                            </Select.Option>
                          ))}
                        </Select> */}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...FormProps("orgMunicipality", "Municipality")}
                        >
                          <Cascader
                            popupClassName="orgMunicipalityList"
                            options={toList(orgMunis)}
                            placeholder="Please select"
                            onChange={(v) => getWards(v[0], setOrgWard)}
                            showSearch={{ filter }}
                          />
                          {/* <Select
                          showSearch
                          placeholder="Municipality..."
                          optionFilterProp="children"
                          onChange={(v: valueType) => getWards(v, setOrgWard)}
                          filterOption={(input, option: any) =>
                            (option?.children as string)
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {orgMunis.map((prov) => (
                            <Select.Option value={prov.id}>
                              {prov.name}
                            </Select.Option>
                          ))}
                        </Select> */}
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("orgWard", "ward")}>
                          <Cascader
                            popupClassName="orgWardList"
                            options={toList(orgWard)}
                            placeholder="Please select"
                            showSearch={{ filter }}
                          />
                          {/* <Select
                          showSearch
                          placeholder="ward..."
                          optionFilterProp="children"
                          onChange={(v: valueType) => getWards(v, setOrgWard)}
                          filterOption={(input, option: any) =>
                            (option?.children as string)
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {orgWard.map((prov) => (
                            <Select.Option value={prov.id}>
                              {prov.name}
                            </Select.Option>
                          ))}
                        </Select> */}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("orgToleNep", "टोल​")}>
                          <Input placeholder="टोल​" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item {...FormProps("orgToleEng", "Tole")}>
                          <Input placeholder="Tole" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          <div className="paddingLeft50 paddingTop20">
            <SubmitBtn />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;

function PermaAddress(
  states: getA.CommonType[],
  getDistricts: any,
  setDistricts: React.Dispatch<React.SetStateAction<getA.CommonType[]>>,
  districts: getA.CommonType[],
  getMunis: any,
  setMunis: React.Dispatch<React.SetStateAction<getA.CommonType[]>>,
  munis: getA.CommonType[],
  getWards: any,
  setWards: React.Dispatch<React.SetStateAction<getA.CommonType[]>>,
  wards: getA.CommonType[]
) {
  return (
    <div className="PurpleCard">
      <h3>Permanent Address</h3>
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("state", "State")}>
            <Cascader
              placeholder="State"
              options={toList(states)}
              onChange={(val) => getDistricts(val, setDistricts)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("district", "District")}>
            <Cascader
              placeholder="District"
              options={toList(districts)}
              onChange={(val) => getMunis(val, setMunis)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("muni", "Municipality")}>
            <Cascader
              placeholder="Municipality"
              options={toList(munis)}
              onChange={(val) => getWards(val, setWards)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("ward", "Ward")}>
            <Cascader placeholder="Ward" options={toList(wards)} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("toleNep", "टोल​")}>
            <Input placeholder="टोल​" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item {...FormProps("toleEng", "Tole")}>
            <Input placeholder="Tole" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export function checkEmailFn(
  setUniqueEmail: React.Dispatch<React.SetStateAction<number>>,
  setUniquePhone: React.Dispatch<React.SetStateAction<number>>,
  setUniqueUsername: React.Dispatch<React.SetStateAction<number>>
) {
  return (url: string, type: 0 | 1 | 2, label: string) => {
    return {
      async validator(_: any, value: string) {
        if (type === 0) setUniqueEmail(2);
        if (type === 1) setUniquePhone(2);
        if (type === 2) setUniqueUsername(2);
        if (!value) return Promise.reject();
        if (value.includes(" ")) {
          return Promise.reject(
            new Error(
              "No spaces allowed in " +
                (type === 0 ? "Email" : type === 1 ? "Phone" : "Username")
            )
          );
        }
        try {
          const data = await Axios.get(BASE_URL + url + value);
          if (data.data) {
            if (type === 0) setUniqueEmail(1);
            if (type === 1) setUniquePhone(1);
            if (type === 2) setUniqueUsername(1);
            return Promise.resolve();
          } else {
            if (type === 0) setUniqueEmail(0);
            if (type === 1) setUniquePhone(0);
            if (type === 2) setUniqueUsername(0);
            return Promise.reject(label + " taken! Pls use another.");
          }
        } catch (e) {
          return Promise.reject("Failed to validate Email");
        }
      },
    };
  };
}
