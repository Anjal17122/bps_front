import { useEffect, useState } from "react";
import {
  FormNoLabel,
  FormProps,
  getWard,
  toList,
} from "../../../Common/Form/FormData";
import { Row, Col, Form, Input, Radio, Cascader } from "antd";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import { IMG_GET_URL } from "../../../Services/Api";
import { getProfile, ProfileBody } from "../../../Services/ProfileService";
import { CommonType, getProvinces } from "../../../Services/AddressService";
import "../../../Assets/scss/EditProfile.scss";
import { getDist, getMun } from "../../Consultant/Register/RegisterHelper";
import EditAvatar from "../../../Components/Common/Avatar/EditAvatar";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const EditUserProfile = () => {
  const [img, setImgNames] = useState({
    person: "",
    citizenship: "",
  });
  const [profile, setProfile] = useState<ProfileBody>();

  const [province, setProvince] = useState<CommonType[]>([]);
  const [districts, setDistricts] = useState<CommonType[]>([]);
  const [munis, setMunis] = useState<CommonType[]>([]);
  const [wards, setWards] = useState<CommonType[]>([]);

  const initialAdds = { state: "", district: "", muni: "", ward: "" };
  const [selected, setSelected] = useState(initialAdds);

  const fetchDists = getDist(setSelected, selected);
  const getMunis = getMun(selected, setSelected);
  const getWards = getWard(selected);

  useEffect(() => {
    getProvinces().then((province) => setProvince(province.data));
    return () => setProvince([]);
  }, []);

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data));
    return () => setProfile(undefined);
  }, []);

  // const onSubmit = (_: {
  //   nameEng: string;
  //   nameNep: string;
  //   email: string;
  //   phone: string;
  //   citizenshipNo: string;
  //   citizenIssueDist: string;
  //   citizenIssueDate: string;
  //   fatherNameNep: string;
  //   fatherNameEng: string;
  //   grandfatherNameEng: string;
  //   grandfatherNameNep: string;
  //   gender: string;
  //   maritalStatus: string;
  //   Username: string;
  //   password: string;
  // }) => {
  // const body = {
  //   // pId,
  //   nameEng: val.nameEng,
  //   nameNep: val.nameNep,
  //   email: val.email,
  //   primaryPhone: val.phone,
  //   secondaryPhone: val.phone,
  //   citizenshipNo: val.citizenshipNo,
  //   citizenIssueDist: val.citizenIssueDist,
  //   citizenIssueDate: val.citizenIssueDate,
  //   fatherNameNep: val.fatherNameNep,
  //   fatherNameEng: val.fatherNameEng,
  //   grandfatherNameEng: val.grandfatherNameEng,
  //   grandfatherNameNep: val.grandfatherNameNep,
  //   gender: val.gender,
  //   maritalStatus: val.maritalStatus,
  //   // user: {
  //   //   username: val.Username,
  //   //   password: val.password,
  //   // },
  //   citizenshipFileName: img.citizenship,
  //   photoFileName: img.person,
  // };
  // copyImage(
  //   [
  //     { destinationDirectory: "person", imageName: imgNames.person },
  //     {
  //       destinationDirectory: "citizenship",
  //       imageName: imgNames.citizenship,
  //     },
  //   ],
  // );
  // };

  return (
    <div className="CenterForm">
      {!profile ? (
        <RollingLoading height="70vh" />
      ) : (
        <Form size="middle" layout="vertical">
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <EditAvatar
                src={
                  img.person
                    ? IMG_GET_URL + "/temp/" + img.person
                    : IMG_GET_URL + "/person/" + profile.photoFileName
                }
                name="Profile Image"
                getImgName={(p) => setImgNames({ ...img, person: p })}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <EditAvatar
                src={
                  img.citizenship
                    ? IMG_GET_URL + "/temp/" + img.citizenship
                    : IMG_GET_URL +
                      "/citizenship/" +
                      profile.citizenshipFileName
                }
                name="Citizenship"
                getImgName={(p) => setImgNames({ ...img, citizenship: p })}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.nameNep}
                {...FormNoLabel("nameNep", "निबेदकको नाम")}
              >
                <Input placeholder="निबेदकको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.nameEng}
                {...FormNoLabel("nameEng", "Applicant Name")}
              >
                <Input placeholder="Applicant Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.primaryPhone}
                {...FormNoLabel("phone", "Phone")}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.email}
                {...FormNoLabel("email", "Email")}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.citizenshipNo}
                {...FormNoLabel("citizenshipNo", "Citizenship No")}
              >
                <Input placeholder="Citizenship No" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.citizenIssueDate}
                {...FormNoLabel("citizenIssueDate", "Citizenship Issue Date")}
              >
                <Input placeholder="Issue Date" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.citizenIssueDist}
                {...FormNoLabel(
                  "citizenIssueDist",
                  "Citizenship Issue District"
                )}
              >
                <Input placeholder="Citizenship Issue District" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            initialValue={profile.gender}
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
            initialValue={profile.maritalStatus}
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
              <Form.Item
                initialValue={profile.fatherNameNep}
                {...FormNoLabel("fatherNameNep", "बुवाको नाम")}
              >
                <Input placeholder="बुवाको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.fatherNameNep}
                {...FormNoLabel("fatherNameEng", "Father's Name")}
              >
                <Input placeholder="Father's Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.grandfatherNameNep}
                {...FormNoLabel("grandfatherNameNep", "हजुर बुवाको नाम")}
              >
                <Input placeholder="हजुर बुवाको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={profile.grandfatherNameEng}
                {...FormNoLabel("grandfatherNameEng", "Grand Father's Name")}
              >
                <Input placeholder="Grand Father's Name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Edit Address */}

          <div className="AddressWrapper">
            <div className="AddressDivs">
              <h2>Permanent Address</h2>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...FormProps("provinceId", "Province")}
                    initialValue={[]}
                  >
                    <Cascader
                      placeholder="Province"
                      options={toList(province)}
                      onChange={(val) => fetchDists(val, setDistricts)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item {...FormProps("districtId", "District")}>
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
                  <Form.Item {...FormProps("wardId", "Ward")}>
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

            <div className="AddressDivs">
              <h2>Temporary Address</h2>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...FormProps("tempprovinceId", "Province")}
                    initialValue={[]}
                  >
                    <Cascader
                      placeholder="Province"
                      options={toList(province)}
                      onChange={(val) => fetchDists(val, setDistricts)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item {...FormProps("tempdistrictId", "District")}>
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
                  <Form.Item {...FormProps("tempmuni", "Municipality")}>
                    <Cascader
                      placeholder="Municipality"
                      options={toList(munis)}
                      onChange={(val) => getWards(val, setWards)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item {...FormProps("tempwardId", "Ward")}>
                    <Cascader placeholder="Ward" options={toList(wards)} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item {...FormProps("temptoleNep", "टोल​")}>
                    <Input placeholder="टोल​" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item {...FormProps("temptoleEng", "Tole")}>
                    <Input placeholder="Tole" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <Row justify="end">
            <SubmitBtn />
          </Row>
        </Form>
      )}
    </div>
  );
};

export default EditUserProfile;
