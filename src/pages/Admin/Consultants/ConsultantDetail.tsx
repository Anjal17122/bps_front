import { Row, Col, Button, Modal, message } from "antd";
import { useState } from "react";
import { ColHeight } from "../../../Common/Form/FormData";
import TableButton from "../../../Common/TableButton/TableButton";
import "../../../Assets/scss/Consultant.scss";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import ImagePopup from "../../../Common/ImagePopup/ImagePopup";
import {
  disableUser,
  UserToVerify,
  verifyUser,
} from "../../../Services/UserService";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { Link } from "react-router-dom";
import ShowPDFandImage from "./ShowPDFandImage";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";
import { useSwikriti } from "../../common/Profile/useProfile";

interface Props {
  user: UserToVerify | undefined;
  isOpen: boolean;
  onCancel: () => void;
  perma?: boolean;
}

const ConsultantDetail = ({ user, isOpen, onCancel, perma = false }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  function onVerifyUser(id: number) {
    if (window.confirm("Are you sure?")) {
      {
        perma
          ? disableUser(id, "enabled", messageApi).then(() => {
              messageApi.success("User Disabled!");
              window.location.reload();
            })
          : verifyUser(id, messageApi).then(() => {
              messageApi.success("Verified User!");
              window.location.reload();
            });
      }
    } else {
      messageApi.error("Cancelled!");
    }
  }

  function onChangeUserStatus(id: number, type: "disabled" | "enabled") {
    if (window.confirm("Are you sure?")) {
      disableUser(id, type, messageApi).then(() => {
        messageApi.success("User Disabled!");
        window.location.reload();
      });
    } else {
      messageApi.error("Cancelled!");
    }
  }

  const { swikritis } = useSwikriti(
    user?.id ?? 0,
    messageApi,
    Boolean(user?.id)
  );

  return (
    <Modal
      open={isOpen}
      width={850}
      footer={null}
      onCancel={() => onCancel()}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            </div>
            <ImagePopup
              open={modalOpen}
              imgSrc={imgUrl}
              onCancel={() => setModalOpen(false)}
            />
            <Row justify="space-between">
              <Col {...ColHeight(10)}>
                <div className="flexRow">
                  <Image
                    style={{ margin: "3% 2%" }}
                    width={200}
                    height={200}
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
              <Col {...ColHeight(10)} className="paddingTop">
                <p>
                  status: <b>{user?.userStatus ?? "Unapproved"}</b>
                </p>
                <div
                  className="flexSpaceB"
                  style={{ justifyContent: "flex-start" }}
                >
                  {user.userStatus ? (
                    user.userStatus === "disabled" ? (
                      <TableButton
                        bgColor="green"
                        onClick={() => onChangeUserStatus(user?.id, "enabled")}
                        disabled={disabled}
                      >
                        Enable
                      </TableButton>
                    ) : (
                      <TableButton
                        bgColor="red"
                        onClick={() => onChangeUserStatus(user?.id, "disabled")}
                        disabled={disabled}
                      >
                        Disable
                      </TableButton>
                    )
                  ) : (
                    <TableButton
                      bgColor="green"
                      onClick={() => onVerifyUser(user?.id)}
                      disabled={disabled}
                    >
                      Approve
                    </TableButton>
                  )}
                </div>
                <div className="paddingTop">
                  <div className="paddingBot10">
                    Nepal Engineering Council No: <b> {user?.nec} </b>
                  </div>
                  <ShowPDFandImage
                    button="View NEC Certificate"
                    folderName="nec"
                    name={user?.necFileName ?? ""}
                    key={1}
                  />
                  <hr style={{ border: "1px solid skyblue" }} />
                  <ShowPDFandImage
                    button="View Citizenship"
                    folderName="citizenship"
                    name={user?.citizenshipFileName ?? ""}
                    key={2}
                  />
                  <hr style={{ border: "1px solid skyblue" }} />{" "}
                  <div>
                    <h4>स्वीकृति</h4>
                    {swikritis?.map((item) => (
                      <div key={item.id}>
                        <Image
                          width={80}
                          height={60}
                          src={
                            IMG_GET_URL +
                            `/${imgFolders.consultantDetail}/` +
                            item.name
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col {...ColHeight(12)}>
                <div className="paddingTop">
                  <p>
                    Citizenship No: <b> {user?.citizenshipNo}</b>
                  </p>
                  <p>
                    Citizenship Issue Date: <b> {user?.citizenIssueDate}</b>
                  </p>
                  <p>
                    Citizenship Issue District: <b> {user?.citizenIssueDist}</b>
                  </p>
                </div>
              </Col>
              <Col {...ColHeight(12)}>
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
              <Col {...ColHeight(24)}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <ShowPDFandImage
                button="Stamp"
                folderName="logo"
                name={user?.organization?.orgLogo}
                key={3}
              />
              <Row>
                <Col {...ColHeight(8)}>
                  <p>
                    Name:{" "}
                    <b>
                      {user?.organization.name} / {user?.organization?.nameNep}
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
                <Col {...ColHeight(8)}>
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
                <Col {...ColHeight(8)}>
                  <div>
                    <div>
                      <span>Organization Address:</span>
                      <p>
                        Province:{" "}
                        <b> {user?.organization?.address[0]?.province?.name}</b>
                      </p>
                      <p>
                        District:{" "}
                        <b> {user?.organization?.address[0]?.district?.name}</b>
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
                        Tole: <b> {user?.organization?.address[0]?.toleEng}</b>
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
  );
};

export default ConsultantDetail;
