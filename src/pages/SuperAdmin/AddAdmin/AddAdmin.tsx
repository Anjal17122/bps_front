import { useContext, useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Upload,
  message,
} from "antd";
import {
  FormNReq,
  FormProps,
  toList,
  InputDateValid,
  ColHeight,
  submitFailedFinal,
} from "../../../Common/Form/FormData";
import {
  CommonType,
  copyImageFinal,
  getDistrictsAll,
  getProvinces,
  getWardsForLand,
} from "../../../Services/AddressService";
import { sN } from "../../../Services/ProjectService";
import {
  getAdminType,
  postAdminFinal,
} from "../../../Services/SuperAdminService";
import "../../../Assets/scss/AddAdmin.scss";
import { IMG_SAVE_URL } from "../../../Services/Api";
import { UploadOutlined } from "@ant-design/icons";
import NewAddress from "../../../Common/NewAddress/NewAddress";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { AddAdminFormVal } from "./AddAdminTypes";
import { checkEmailFn, emailValid } from "../../Consultant/Register/Register";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { filter, normFile } from "../../../constants/antdConstants";

const AddAdmin = ({ url }: { url?: string }) => {
  const [uniqueEmail, setUniqueEmail] = useState(2);
  const [uniquePhone, setUniquePhone] = useState(2);
  const [uniqueUsername, setUniqueUsername] = useState(2);
  const [type, setType] = useState<CommonType[]>();
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedAdmin, setSelectedAdmin] = useState<sN>();

  const [wards, setWards] = useState<CommonType[]>();
  const [allDistricts, setAllDistricts] = useState<
    { label: string; value: string }[]
  >([]);
  const { state, dispatch } = useContext(MyStore);

  useEffect(() => {
    if (!state.provincePerma.length) {
      getProvinces().then((province) =>
        dispatch({ type: ActionType.setProviPerma, payload: province.data })
      );
    }
    getAdminType().then((res) => setType(res.data));
    getWardsForLand().then((res) => setWards(res.data));
    getDistrictsAll().then((res) => {
      setAllDistricts(
        res.data?.map((dist) => ({
          label: dist.name.replace(" District", ""),
          value: dist.name.replace(" District", ""),
        }))
      );
    });
    return () => {
      setType(undefined);
      setWards(undefined);
      setAllDistricts([]);
    };
  }, []);

  const [form] = Form.useForm();

  interface UserTyp111 {
    username: string;
    password: string;
    wardId?: number;
  }

  const onSubmit = (val: AddAdminFormVal) => {
    const same = state.sameTempAndPermaAdd;

    const user: UserTyp111 = {
      username: val.Username,
      password: val.password,
    };
    if (selectedAdmin === 5 || selectedAdmin === 11) {
      user.wardId = val.wardId ? val.wardId[0] : 0;
    }
    // localStorage.setItem("Test", JSON.stringify(val));
    const body = {
      nameEng: val.nameEng,
      // nameNep: val.nameNep,
      email: val.email,
      primaryPhone: val.phone,
      personRoleId: val.personRoleId[0],
      // secondaryPhone: val.phone,
      citizenshipNo: val.cNo,
      citizenIssueDist: val.cIDistrict[0],
      citizenIssueDate: val.cDate,
      fatherNameNep: val.fatherNep,
      fatherNameEng: val.fatherEng,
      grandfatherNameEng: val.gfName,
      grandfatherNameNep: val.gfNep,
      gender: val.gender,
      maritalStatus: val.maritalStatus,
      panNo: val.panNo,
      user: user,
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
        {
          provinceId: same ? val.provinceIdPerma[0] : val.provinceIdTemp[0],
          districtId: same ? val.districtIdPerma[0] : val.districtIdTemp[0],
          municipalityId: same
            ? val.municipalityIdPerma[0]
            : val.municipalityIdTemp[0],
          wardId: same ? val.wardIdPerma[0] : val.wardIdTemp[0],
          type: 1,
          toleNep: same ? val.toleNepPerma : val.toleNepTemp,
          toleEng: same ? val.toleEngPerma : val.toleEngTemp,
        },
      ],
      citizenshipFileName: val.citizenshipImage[0]?.response?.message,
      photoFileName: val.personImage[0]?.response?.message,
    };

    copyImageFinal(
      [
        { dir: "person", fileName: val.personImage[0]?.response?.message },
        {
          dir: "citizenship",
          fileName: val.citizenshipImage[0]?.response?.message,
        },
      ],
      messageApi
    ).then(() => {
      postAdminFinal(body, messageApi, url).then(() => form.resetFields());
    });
  };

  const checkEmail = checkEmailFn(
    setUniqueEmail,
    setUniquePhone,
    setUniqueUsername
  );

  return (
    <div className="AddAdminWrap">
      {contextHolder}
      <Form
        form={form}
        className="AddAdmin"
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Add Admin</h1>

        <Form.Item
          label="User Photo"
          name="personImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Pls upload User Photo" }]}
        >
          <Upload name="file" action={IMG_SAVE_URL} listType="picture">
            <Button icon={<UploadOutlined />}>upload</Button>
          </Upload>
        </Form.Item>
        <Row gutter={20}>
          {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("nameNep", "नाम नेपालीमा")}>
              <Input placeholder="नाम नेपालीमा" />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item {...FormProps("nameEng", "Name in English")}>
              <Input placeholder="Name in English" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              validateTrigger={["onBlur"]}
              validateStatus={emailValid(uniqueEmail)}
              label="E-mail"
              required={false}
              name="email"
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
              validateTrigger={["onBlur"]}
              validateStatus={emailValid(uniquePhone)}
              label="Phone"
              required={false}
              name="phone"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Cannot be empty!",
                },
                checkEmail("/person/phone?phone=", 1, "Phone"),
              ]}
            >
              <Input placeholder="98.... / 014..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              validateTrigger={["onBlur"]}
              validateStatus={emailValid(uniqueUsername)}
              label="Username"
              required={false}
              name="Username"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Cannot be empty!",
                },
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
                      getFieldValue("password") === getFieldValue("confirm")
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("personRoleId", "Select Admin Type")}>
              <Cascader
                options={type?.map((val) => {
                  if (val.name === "Consultant") {
                    return { value: "", label: "" };
                  } else {
                    return {
                      value: val.id,
                      label: val.name,
                    };
                  }
                })}
                placeholder="Select..."
                onChange={(val) => setSelectedAdmin(val[0])}
              />
            </Form.Item>
          </Col>
          {selectedAdmin === 5 || selectedAdmin === 11 ? (
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item {...FormProps("wardId", "Select Ward No.")}>
                <Cascader
                  allowClear={false}
                  placeholder="Ward No."
                  options={wards ? toList(wards) : []}
                />
              </Form.Item>
            </Col>
          ) : null}
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormNReq("panNo", "PAN")}>
              <Input placeholder="PAN No" />
            </Form.Item>
          </Col>
        </Row>

        <div className="PurpleCard">
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item {...FormProps("cNo", "Citizenship No")}>
                <Input placeholder="Citizenship No." />
              </Form.Item>
            </Col>
            <Col {...ColHeight(12)}>
              <Form.Item
                {...FormProps("cIDistrict", "Citizenship Issue District")}
              >
                <Cascader
                  options={allDistricts}
                  placeholder="Please select"
                  showSearch={{ filter }}
                />
              </Form.Item>
            </Col>
            <Col {...ColHeight(12)}>
              <Form.Item
                {...InputDateValid("cDate", "Citizenship Issue Date (in B.S.)")}
              >
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col {...ColHeight(12)}>
              <Form.Item
                label="Citizenship"
                name="citizenshipImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "Pls upload Citizenship" }]}
              >
                <Upload name="file" action={IMG_SAVE_URL} listType="picture">
                  <Button icon={<UploadOutlined />}>upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item {...FormNReq("gender", "Gender:")} className="RadioButtons">
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="others">Others</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...FormNReq("maritalStatus", "Marital Status:")}
          className="RadioButtons"
        >
          <Radio.Group>
            <Radio value="married">Married</Radio>
            <Radio value="unmarried">Unmarried</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormNReq("fatherNep", "बुवाको नाम")}>
              <Input placeholder="बुवाको नाम" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormNReq("fatherEng", "Father's Name")}>
              <Input placeholder="Father's Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormNReq("gfNep", "हजुर बुवाको नाम")}>
              <Input placeholder="हजुर बुवाको नाम" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormNReq("gfName", "Grand Father's Name")}>
              <Input placeholder="Grand Father's Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("sabik", "साबिक Address")}>
              <Input placeholder="साबिक Address" />
            </Form.Item>
          </Col>
        </Row>
        {NewAddress(dispatch, state)}
        <SubmitBtn />
      </Form>
    </div>
  );
};

export default AddAdmin;
