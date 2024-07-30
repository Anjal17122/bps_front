import {
  Col,
  Descriptions,
  Row,
  Image,
  message,
  Button,
  Card,
  Upload,
  UploadFile,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import { Common, ImageNotFound } from "../../../constants/constants";
import {
  BASE_URL,
  IMG_GET_URL,
  PERSON_URL,
  imgFolders,
} from "../../../Services/Api";
import { getProfile, ProfileBody } from "../../../Services/ProfileService";
import {
  genRandomNum,
  POSTRegRadiant,
  POSTRegRadiantBody,
  POSTReRegRadiant,
  SignStatus,
  SignStatusBody,
} from "../../../Services/RegRadiantService";
import CommonHeader from "../../Admin/ProjectActionsAdmin/UploadCertificate/CommonHeader";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import {
  CheckCircleFilled,
  CloseCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { setSTyp } from "../../../Services/CreateProjectService";
import { RegUserRadiant } from "../../../Components/Admin/DigitalSignature/DigitalSignReg";
import axios from "axios";
import SignDocument from "../../../Components/TestWebsocket";
import "./ViewProfile.scss";
import { isNagarjun } from "../../../constants/CommonFunctions";
import LeftBorderBtn from "../../../Common/TableButton/LeftBorderBtn";
import {
  delSwikriti,
  getToken,
  uploadSwikriti,
} from "../../../Services/UserService";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { useSwikriti } from "./useProfile";

export const beforeUploadJpeg1 = (file: RcFile) => {
  const isJpg = file.type === "image/jpeg";
  if (!isJpg) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("Image must smaller than 1MB!");
  }
  return isJpg && isLt2M;
};
const ViewProfile = () => {
  const [profile, setProfile] = useState<ProfileBody>();
  const [messageApi, contextHolder] = message.useMessage();

  const [submitting, setSubmitting] = useState(false);

  const [signStatus, setSignStatus] = useState<SignStatusBody>();

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data);
      SignStatus().then((res) => {
        setSignStatus(res.data);
      });
    });
    return () => {
      setSignStatus(undefined);
      setProfile(undefined);
    };
  }, []);

  const RegtoRadiant = (isReg: boolean) => {
    if (!profile?.email || !profile.email.length) {
      return messageApi.error("Email not Found!");
    }
    if (!profile?.primaryPhone || !profile.primaryPhone.length) {
      return messageApi.error("Phone No not Found!");
    }
    genRandomNum(setSubmitting).then((res) => {
      const successCallback = (respData: string, setsub: setSTyp) => {
        const index = respData.indexOf(Common);
        const base64 = respData.substring(10, index);

        const body: POSTRegRadiantBody = {
          email: profile.email,
          phoneNo: profile.primaryPhone,
          signDataBase64Encoded: base64,
        };
        {
          isReg
            ? POSTRegRadiant(body, setSubmitting)
            : POSTReRegRadiant(body, setSubmitting);
        }
      };

      RegUserRadiant(
        res.data.return.substring(8),
        setSubmitting,
        successCallback
      );
    });
  };
  const GetSignStatus = (status: "Active" | "Disable" | "Inactive") => {
    if (status === "Active") {
      return (
        <span>
          <CheckCircleFilled style={{ color: "rgb(82, 196, 26)" }} /> {status}
        </span>
      );
    } else if (status === "Disable") {
      return (
        <span>
          <CloseCircleOutlined style={{ color: "#ff4d4d" }} /> {status}
        </span>
      );
    } else {
      return (
        <span>
          <CloseCircleOutlined style={{ color: "#ff4d4d" }} /> {status}
        </span>
      );
    }
  };

  const testStatus = () => {
    const successCallback = (respData: string) => {
      axios.post(BASE_URL + "/emsigner/authenticate", {
        uniqueId: profile?.id,
        signDataBase64Encoded: respData,
      });
    };
    SignDocument((profile?.id).toString(), 1212, successCallback);
  };

  const { swikritis, refetch } = useSwikriti(
    profile?.id ?? 0,
    messageApi,
    Boolean(profile?.id)
  );

  const onChange = (info: UploadChangeParam<UploadFile<any>>, dId: number) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      uploadSwikriti(
        {
          description: "",
          name: info.file.response.message,
          documentId: dId,
          personId: profile?.id ?? 0,
        },
        messageApi
      ).then(() => {
        refetch();
      });
      messageApi.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <CommonHeader />
      {contextHolder}

      <PageHeader title="Profile" subTitle={"User Details:"} />
      <div className="profile-div">
        <div className="profile-wrapper">
          <div className="ViewProfileDiv1">
            <Image
              width={120}
              fallback={ImageNotFound}
              src={PERSON_URL + profile?.photoFileName}
            ></Image>
            {isNagarjun() && (
              <div
                style={{
                  background: "#e2e8f0",
                  height: 150,
                  padding: 20,
                  width: "auto",
                }}
              >
                <h3 style={{ color: "#f59e0b" }}>स्वीकृति</h3>
                {swikritis?.length ? (
                  <div>
                    {swikritis?.map((item, index) => (
                      <div key={item.id}>
                        <Image
                          width={75}
                          height={80}
                          src={
                            IMG_GET_URL +
                            `/${imgFolders.consultantDetail}/` +
                            item.name
                          }
                        />{" "}
                        &nbsp;&nbsp;&nbsp;
                        <Popconfirm
                          title="Delete file"
                          description="Are you sure to delete this?"
                          onConfirm={() =>
                            delSwikriti(item.id, messageApi).then(() =>
                              refetch()
                            )
                          }
                          onCancel={() => messageApi.error("Cancelled")}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="link" style={{ padding: 0 }}>
                            <DeleteOutlined style={{ color: "red" }} />
                          </Button>
                        </Popconfirm>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Upload
                    maxCount={1}
                    name="file"
                    headers={{ authorization: getToken() }}
                    beforeUpload={(e) => beforeUploadJpeg1(e)}
                    onChange={(e) => onChange(e, 1)}
                    action={
                      BASE_URL +
                      `/images/digitalsignatureupload?dir=consultantDetail&filename=${profile?.nameEng.replaceAll(
                        " ",
                        "_"
                      )}_swikriti_${Date.now()}.jpeg`
                    }
                  >
                    <LeftBorderBtn color="amber">
                      <UploadOutlined />
                      &nbsp; Upload
                    </LeftBorderBtn>
                  </Upload>
                )}
              </div>
            )}
            <div className="DigiSignCard">
              <Card
                style={{ width: 300 }}
                title="Digital Signature Status:"
                actions={[
                  // <SettingOutlined key="setting" />,
                  <Button
                    type="link"
                    onClick={() => RegtoRadiant(true)}
                    disabled={submitting}
                  >
                    Register
                  </Button>,
                  <Button
                    type="link"
                    onClick={() => testStatus()}
                    disabled={submitting}
                  >
                    Check Status
                  </Button>,
                  <Button
                    type="link"
                    onClick={() => RegtoRadiant(false)}
                    disabled={submitting}
                  >
                    Re-Register
                  </Button>,
                  // <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                {GetSignStatus(signStatus?.status ?? "Inactive")}
                <p style={{ color: "grey", fontSize: 11, paddingLeft: 10 }}>
                  Expire Date: {signStatus?.expiry_date.substring(0, 10)}
                </p>
              </Card>
            </div>
          </div>

          <Descriptions title="User Info" className="ProfileView" style={{}}>
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="Mun No"
            >
              {profile?.id}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="User Type"
            >
              {profile?.organization ? "Organization" : "Individual"}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="NEC"
            >
              {profile?.nec}
            </Descriptions.Item>

            <Image
              width={120}
              fallback={ImageNotFound}
              src={PERSON_URL + profile?.photoFileName}
            ></Image>
          </Descriptions>
          <Descriptions title={"User Info"} className="ProfileView">
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="Mun No"
            >
              {profile?.id}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="User Type"
            >
              {profile?.organization ? "Organization" : "Individual"}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ paddingBottom: 5 }}
              className="PurpleCard"
              label="NEC"
            >
              {profile?.nec}
            </Descriptions.Item>

            <Descriptions.Item label="Name">
              {profile?.nameEng}
            </Descriptions.Item>
            <Descriptions.Item label="नाम">
              {profile?.nameNep}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {profile?.primaryPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {profile?.email}
            </Descriptions.Item>
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
                  <div
                    style={{ width: "min(100vh, 400px)" }}
                    className="PurpleCard EditAddDiv"
                    key={address.id}
                  >
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
        </div>
      </div>
    </div>
  );
};
export default ViewProfile;
