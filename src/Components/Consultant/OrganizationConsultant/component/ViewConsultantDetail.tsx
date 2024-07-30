import { Row, Col, Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
// import "../../../Assets/scss/Consultant.scss";
import "../../../../Assets/scss/Consultant.scss";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { Link } from "react-router-dom";
import ImagePopup from "../../../../Common/ImagePopup/ImagePopup";
import {
  getConSultant,
  GetPerson,
  getPersonPerma,
} from "../../../../Services/PersonService";
import React from "react";
import { Colheight } from "../../../../Common/Form/FormData";
import { IMG_GET_URL } from "../../../../Services/Api";
import ShowPDFandImage from "../../../../pages/Admin/Consultants/ShowPDFandImage";

interface Props {
  //   user: UserToVerify | undefined;
  userId: number | string;
  perma: boolean;
}

const ViewConsultantDetail = ({ userId, perma }: Props) => {
  const [ImageModal, setImageModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState<GetPerson | undefined>(undefined);

  useEffect(() => {
    if (perma) {
      getPersonPerma(userId).then((res) => {
        setUser(res.data);
      });
    } else {
      getConSultant("/person/", userId).then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <>
      <Modal
        open={modalOpen}
        width={850}
        footer={null}
        onCancel={() => setModalOpen(false)}
        title={false}
        centered={true}
      >
        {contextHolder}
        {user ? (
          <>
            <h2 style={{ paddingBottom: 10 }}>
              User Type: {user?.organization ? "Organization" : "Individual"}
            </h2>
            <div id="OrgDetail">
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>User Details:</h3>
                <Link
                  to={
                    perma
                      ? "/superadmin/edit/approved/user/" + user.id
                      : "/superadmin/edit/unapproved/user/" + user.id
                  }
                  rel="noreferrer noopener"
                  target={"_blank"}
                >
                  <Button
                    size="small"
                    style={{ background: "#00b96b", color: "white" }}
                  >
                    Edit
                  </Button>
                </Link>
              </div> */}
              <ImagePopup
                open={ImageModal}
                imgSrc={imgUrl}
                onCancel={() => setImageModal(false)}
              />
              <Row justify="space-between">
                <Col {...Colheight(10)}>
                  <div className="flexRow">
                    <Image
                      style={{ margin: "3% 2%" }}
                      width={200}
                      src={IMG_GET_URL + "/person/" + user?.photoFileName}
                    />
                  </div>
                  <div className="flexColEnd" style={{ paddingTop: 10 }}>
                    <b>
                      {user?.nameEng} / {user?.nameNep}
                    </b>
                    <p>
                      Email: <b> {user?.email} </b>
                    </p>
                    <p>
                      Phone: <b> {user?.primaryPhone} </b>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col {...Colheight(12)}>
                  <div className="paddingTop">
                    <p>
                      Citizenship No: <b> {user?.citizenshipNo}</b>
                    </p>
                    <p>
                      Citizenship Issue Date: <b> {user?.citizenIssueDate}</b>
                    </p>
                    <p>
                      Citizenship Issue District:{" "}
                      <b> {user?.citizenIssueDist}</b>
                    </p>
                  </div>
                </Col>
                <Col {...Colheight(12)}>
                  <div className="paddingTop">
                    <p>
                      Gender: <b> {user?.gender}</b>
                    </p>
                    <p>
                      Marital Status: <b> {user?.maritalStatus}</b>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col {...Colheight(24)}>
                  <div className="paddingTop">
                    <p>
                      Father Name:
                      <b>
                        {user?.fatherNameEng} / {user?.fatherNameNep}
                      </b>
                    </p>
                    <p>
                      Grandfather Name:
                      <b>
                        {user?.grandfatherNameEng} / {user?.grandfatherNameNep}
                      </b>
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
            {user?.organization ? (
              <div id="OrgDetail">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <b>Organization Details</b>
                  <Link
                    to={"/superadmin/edit/organization/" + user.organization.id}
                    rel="noreferrer noopener"
                    target={"_blank"}
                  >
                    <Button
                      size="small"
                      style={{ background: "#00b96b", color: "white" }}
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
                {/* <ShowPDFandImage
                  button="Stamp"
                  folderName="logo"
                  name={user?.organization?.orgLogo}
                  key={3}
                /> */}
                <Row>
                  <Col {...Colheight(8)}>
                    <p>
                      Name:{" "}
                      <b>
                        {user?.organization.name} /{" "}
                        {user?.organization?.nameNep}
                      </b>
                    </p>
                    <p>
                      Email: <b>{user?.organization?.email}</b>
                    </p>
                    <p>
                      Phone: <b>{user?.organization?.phone}</b>
                    </p>
                    <p>
                      Reg No: <b>{user?.organization?.regNumber}</b>
                    </p>
                    <p>
                      PAN No: <b>{user?.organization?.panNumber}</b>
                    </p>
                  </Col>
                  <Col {...Colheight(8)}>
                    <ShowPDFandImage
                      button="Tax Clearance"
                      folderName="tax"
                      name={user?.organization?.taxClearFileName ?? ""}
                      key={3}
                    />

                    <ShowPDFandImage
                      button="PAN Document"
                      folderName="pan"
                      name={user?.organization?.panFileName ?? ""}
                      key={4}
                    />

                    <ShowPDFandImage
                      button="Company Registration"
                      folderName="reg"
                      name={user?.organization?.regFileName ?? ""}
                      key={5}
                    />
                  </Col>
                  <Col {...Colheight(8)}>
                    <div>
                      <div>
                        <span>Organization Address:</span>
                        <p>
                          Province:{" "}
                          <b>
                            {" "}
                            {user?.organization?.address[0]?.province?.name}
                          </b>
                        </p>
                        <p>
                          District:{" "}
                          <b>
                            {" "}
                            {user?.organization?.address[0]?.district?.name}
                          </b>
                        </p>
                        <p>
                          Municipality:{" "}
                          <b>
                            {" "}
                            {user?.organization?.address[0]?.municipality?.name}
                          </b>
                        </p>
                        <p>
                          Ward:{" "}
                          <b> {user?.organization?.address[0]?.ward?.name}</b>
                        </p>
                        <p>
                          Tole:{" "}
                          <b> {user?.organization?.address[0]?.toleEng}</b>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
              }}
            >
              {user?.addresses
                ? user.addresses.map((add, i) => (
                    <div key={add.id} style={{ width: "45%" }}>
                      <div className="PurpleCard EditAddDiv">
                        <Link
                          target={"_blank"}
                          rel="noreferrer noopener"
                          to={
                            "/superadmin/edit/address/" +
                            (perma ? "approved" : "unapproved") +
                            `/${user.id}/${add.id}/${
                              add.type === "PERMANENT" ? 0 : 1
                            }`
                          }
                          className="EditDiv"
                        >
                          Edit
                        </Link>
                        <span>
                          {i === 0 ? "Permanent" : "Temporary"} Address:
                        </span>
                        <p>
                          Province: <b> {add.province?.name}</b>
                        </p>
                        <p>
                          District: <b> {add.district?.name}</b>
                        </p>
                        <p>
                          Municipality: <b> {add.municipality?.name}</b>
                        </p>
                        <p>
                          Ward: <b> {add.ward?.name}</b>
                        </p>
                        <p>
                          Tole: <b> {add?.toleEng}</b>
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </>
        ) : (
          <div>
            No User Found{" "}
            <Button type="primary" icon={<ArrowLeftOutlined />}>
              Go Back
            </Button>
          </div>
        )}
      </Modal>
      <Button type="link" onClick={() => setModalOpen(true)}>
        View Detail
      </Button>
    </>
  );
};

export default ViewConsultantDetail;
