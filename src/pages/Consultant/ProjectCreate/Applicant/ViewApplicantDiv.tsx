import { Spin, Row, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditDiv from "../../../../Common/EditDiv/EditDiv";
import { ColHeight } from "../../../../Common/Form/FormData";
import ImagePopup from "../../../../Common/ImagePopup/ImagePopup";
import NotFound from "../../../../Common/NotFound";
import TableButton from "../../../../Common/TableButton/TableButton";
import { IMG_GET_URL, imgFolders, PDF_URL } from "../../../../Services/Api";
import { getApplicant } from "../../../../Services/CreateProjectService";
import { getUserTyp, getAddresses } from "../../../../Services/UserService";
import { MyStore, ActionType } from "../../../../Store/ContextApi";
import { switchUrl } from "../Project/Create/ViewCreate";
import { EyeTwoTone } from "@ant-design/icons";
import PDFapplicant from "../../../../Common/ProjectPDFs/PDFapplicant";
import { checkIfPDF } from "../Project/LandInfo/LandCard";
import MyAvatar from "../../../../Components/Common/Avatar/Avatar";

const ViewApplicantDiv = () => {
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");
  const [user, setUser] = useState<getUserTyp>();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    getApplicant(
      switchUrl(
        "/project/get/applicant?id=",
        "/project/perma/get/applicant?id="
      ),
      params.pid ?? "0"
    ).then((user) => {
      setLoading(false);
      setUser(user.data);
    });
    return () => {
      setLoading(true);
      setUser(undefined);
    };
  }, [params.pid]);

  function onViewCitizenS(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.citizenship + "/" + imgsrc);
    setModal(true);
  }
  function onViewPhoto(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.person + "/" + imgsrc);
    setModal(true);
  }
  const { dispatch } = useContext(MyStore);
  function editAddressClick(address: getAddresses) {
    dispatch({ type: ActionType.setAddress, payload: address });
  }
  return (
    <div>
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => setModal(false)}
      />
      <Spin spinning={loading}>
        <div className="CenterForm10">
          {/* {JSON.stringify(user)} */}
          <div className="EditOrAddDiv">
            {user ? null : (
              <Link to={"/project/add/applicant/" + params.pid}>
                <TableButton width="150px" bgColor="blue">
                  Add Applicant
                </TableButton>
              </Link>
            )}
          </div>
          {user ? (
            <div className="ViewApplicant">
              <div>
                <PDFapplicant data={user} projectId={params.pid ?? "0"} />
              </div>
              <Row gutter={20} style={{ padding: "2% 2% 0 2%" }}>
                <Col {...ColHeight(4)}>
                  {checkIfPDF(user.photoFileName) ? (
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={`${PDF_URL}/${imgFolders.person}/${user.photoFileName}`}
                    >
                      Person <EyeTwoTone style={{ fontSize: 14 }} />
                    </a>
                  ) : (
                    <div
                      className="hoverOnPoint"
                      onClick={() => onViewPhoto(user.photoFileName)}
                    >
                      <MyAvatar
                        src={`${IMG_GET_URL}/${imgFolders.person}/${user.photoFileName}`}
                      />
                    </div>
                  )}
                </Col>
                <Col {...ColHeight(10)} className="EditAddDiv">
                  <div className="EditDiv">
                    <Link to={"/user/edit/" + user.id} style={{ fontSize: 15 }}>
                      <button>Edit</button>
                    </Link>
                  </div>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>निबेदकको नाम:</span>
                      <p>{user.nameNep}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Applicant&apos;s Name:</span>
                      <p>{user.nameEng}</p>{" "}
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Phone:</span>
                      <p>{user.primaryPhone}</p>{" "}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Email:</span>
                      <p>{user.email}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Citizenship No:</span>
                      <p>{user.citizenshipNo}</p>{" "}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Issue Date:</span>
                      <p>{user.citizenIssueDate}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>View Citizenship:</span> :{" "}
                      {checkIfPDF(user.citizenshipFileName) ? (
                        <a
                          target="_blank"
                          rel="noreferrer noopener"
                          href={`${PDF_URL}/${imgFolders.citizenship}/${user.citizenshipFileName}`}
                        >
                          <EyeTwoTone style={{ fontSize: 14 }} />
                        </a>
                      ) : (
                        <span
                          className="hoverOnPoint"
                          onClick={() =>
                            onViewCitizenS(user.citizenshipFileName)
                          }
                        >
                          <EyeTwoTone style={{ fontSize: 18 }} />
                        </span>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Issue district:</span>
                      <p>{user.citizenIssueDist}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col {...ColHeight(12)}>
                      <span>Marital Status</span>
                      <p>{user.maritalStatus}</p>
                    </Col>
                    <Col {...ColHeight(12)}>
                      <span>Gender</span>
                      <p>{user.gender}</p>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>बुवाको नाम:</span>
                      <p>{user.fatherNameNep}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Father&apos;s Name:</span>
                      <p>{user.fatherNameEng}</p>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>हजुर बुवाको नाम:</span>
                      <p>{user.grandfatherNameNep}</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <span>Grand Father&apos;s Name:</span>
                      <p>{user.grandfatherNameEng}</p>
                    </Col>
                  </Row>
                </Col>
                <Col {...ColHeight(10)}>
                  {user.addresses
                    ? user.addresses.map((address) => (
                        <div className="PurpleCard EditAddDiv" key={address.id}>
                          <EditDiv
                            onClick={() => editAddressClick(address)}
                            url={`/address/edit/${user.id}/${address.id}/${
                              address.type === "PERMANENT" ? "0" : "1"
                            }`}
                          />
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
          ) : typeof user === undefined ? (
            <></>
          ) : (
            <NotFound text="Applicant not added yet!" />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ViewApplicantDiv;
