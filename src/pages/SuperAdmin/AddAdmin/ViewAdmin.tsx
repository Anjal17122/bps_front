import { Col, Descriptions, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { GetAdmin, ProfileBody } from "../../../Services/ProfileService";
import { useParams } from "react-router-dom";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const ViewAdmin = () => {
  const [profile, setProfile] = useState<ProfileBody>();
  const params = useParams();

  useEffect(() => {
    GetAdmin(params.id ?? "").then((res) => setProfile(res.data));
    return () => setProfile(undefined);
  }, []);

  return (
    <div>
      <PageHeader
        // style={{ background: "white", padding: "2% 5%" }}
        // className="CenterForm10"
        // ghost={false}
        // onBack={() => window.history.back()}
        title={profile?.nameEng + "'s Profile"}
        subTitle="View Admin Details"
      />
      <Spin spinning={profile ? false : true}>
        <Descriptions title="User Info" className="ProfileView">
          <Descriptions.Item label="Name">{profile?.nameEng}</Descriptions.Item>
          <Descriptions.Item label="नाम">{profile?.nameNep}</Descriptions.Item>
          <Descriptions.Item label="Phone">
            {profile?.primaryPhone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{profile?.email}</Descriptions.Item>
          <Descriptions.Item label="Citizenship No">
            {profile?.citizenshipNo}
          </Descriptions.Item>
          <Descriptions.Item label="Issue Date">
            {profile?.citizenIssueDate}
          </Descriptions.Item>
          <Descriptions.Item label="View Citizenship">
            {profile?.citizenshipFileName}
          </Descriptions.Item>
          <Descriptions.Item label="Issue district">
            {profile?.citizenIssueDist}
          </Descriptions.Item>
          <Descriptions.Item label="Marital Status">
            {profile?.maritalStatus}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {profile?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Father's Name">
            {profile?.fatherNameEng}
          </Descriptions.Item>
          <Descriptions.Item label="बुवाको नाम">
            {profile?.fatherNameNep}
          </Descriptions.Item>
          <Descriptions.Item label="Grand Father's Name">
            {profile?.fatherNameNep}
          </Descriptions.Item>
          <Descriptions.Item label="हजुर बुवाको नाम">
            {profile?.fatherNameNep}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ display: "flex" }}>
          {profile?.addresses
            ? profile.addresses.map((address) => (
                <div className="PurpleCard EditAddDiv" key={address.id}>
                  <h3>
                    {address.type === "PERMANENT" ? "Permanent" : "Current"}{" "}
                    Address
                  </h3>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Province:</span>
                      <p>{address.province.name}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>District:</span>
                      <p>{address.district.name}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Municipality</span>
                      <p>{address.municipality.name}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Ward:</span>
                      <p>{address.ward.name}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>{"टोल​:"}</span>
                      <p>{address.toleNep}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Tole:</span>
                      <p>{address.toleEng}</p>
                    </Col>
                  </Row>
                </div>
              ))
            : null}
        </div>
      </Spin>
    </div>
  );
};

export default ViewAdmin;
