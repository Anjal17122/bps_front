import { Row, Col } from "antd";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ColHeight } from "../../../../../Common/Form/FormData";
import ImagePopup from "../../../../../Common/ImagePopup/ImagePopup";
import { imgFolders, IMG_GET_URL } from "../../../../../Services/Api";
import { EyeTwoTone } from "@ant-design/icons";
import { MyStore } from "../../../../../Store/ContextApi";
import GoBackToProjects from "../GoBackToProjects";
import FooterBarAdmin from "../../../../../Common/FooterAction/FooterAction";
import { getUserTyp } from "../../../../../Services/UserService";
import ViewProjectHeader from "../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../Project/ViewProject/ViewProject";
import PDFapplicant from "../../../../../Common/ProjectPDFs/PDFapplicant";
import AdProjectFooter from "../../../../../Components/Admin/Footers/AdProjectFooter";
import MyAvatar from "../../../../../Components/Common/Avatar/Avatar";

interface Props {
  admin: boolean;
}
const ViewApplicantAdmin = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);
  const myuser = state.project.applicant;
  const params = useParams();

  const pid = params.pid ?? "";

  return (
    <div>
      {admin ? (
        <FooterBarAdmin
          projectId={pid}
          myComponent={<ApplicantCommon myuser={state.editLogData} pid={pid} />}
        />
      ) : null}
      <ViewProjectHeader
        id={pid}
        title="Applicant Information"
        step="Step 2: "
        prev={
          admin
            ? `/admin/view/project/projectdetails/${pid}`
            : `/user/view/project/projectdetails/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/land/${pid}`
            : `/user/viewproject/land/${pid}`
        }
      />
      {/* <ProjectNavAdmin
        id={pid}
        title="Applicant Information"
        step="Step 2: "
        prev={`/admin/viewproject/projectdetails/${pid}`}
        next={`/admin/viewproject/land/${pid}`}
      /> */}
      <ApplicantCommon myuser={myuser} pid={pid} />
    </div>
  );
};
export default ViewApplicantAdmin;

interface MyProps {
  myuser: getUserTyp;
  pid: string;
}
export const ApplicantCommon = ({ myuser, pid }: MyProps) => {
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");

  function onViewCitizenS(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.citizenship + "/" + imgsrc);
    setModal(true);
  }
  function onViewPhoto(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.person + "/" + imgsrc);
    setModal(true);
  }

  return (
    <>
      {ifCon() ? null : <AdProjectFooter pid={pid} />}
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => setModal(false)}
      />
      <div className="CenterForm10">
        {myuser ? (
          <div className="ViewApplicant">
            <PDFapplicant data={myuser as any} projectId={pid} />
            <Row gutter={20} style={{ padding: "2% 2% 0 2%" }}>
              <Col {...ColHeight(4)}>
                <div
                  className="hoverOnPoint"
                  onClick={() => onViewPhoto(myuser.photoFileName)}
                >
                  <MyAvatar
                    src={`${IMG_GET_URL}/${imgFolders.person}/${myuser.photoFileName}`}
                  />
                </div>
              </Col>
              <Col {...ColHeight(10)} className="EditAddDiv">
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>निबेदकको नाम:</span>
                    <p>{myuser.nameNep}</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Applicant&apos;s Name:</span>
                    <p>{myuser.nameEng}</p>{" "}
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Phone:</span>
                    <p>{myuser.primaryPhone}</p>{" "}
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Email:</span>
                    <p>{myuser.email}</p>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Citizenship No:</span>
                    <p>{myuser.citizenshipNo}</p>{" "}
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Issue Date:</span>
                    <p>{myuser.citizenIssueDate}</p>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>View Citizenship:</span> :{" "}
                    <span
                      className="hoverOnPoint"
                      onClick={() => onViewCitizenS(myuser.citizenshipFileName)}
                    >
                      <EyeTwoTone style={{ fontSize: 18 }} />
                    </span>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Issue district:</span>
                    <p>{myuser.citizenIssueDist}</p>
                  </Col>
                </Row>
                <span>Marital Status</span>
                <p>{myuser.maritalStatus}</p>

                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>बुवाको नाम:</span>
                    <p>{myuser.fatherNameNep}</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Father&apos;s Name:</span>
                    <p>{myuser.fatherNameEng}</p>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>हजुर बुवाको नाम:</span>
                    <p>{myuser.grandfatherNameNep}</p>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <span>Grand Father&apos;s Name:</span>
                    <p>{myuser.grandfatherNameEng}</p>
                  </Col>
                </Row>
              </Col>
              <Col {...ColHeight(10)}>
                {myuser.addresses
                  ? myuser.addresses.map((address) => (
                      <div className="PurpleCard EditAddDiv" key={address.id}>
                        <h3>
                          {address.type === "PERMANENT"
                            ? "Permanent"
                            : "Current"}{" "}
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
              </Col>
            </Row>
          </div>
        ) : myuser === undefined ? (
          <GoBackToProjects />
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </>
  );
};
