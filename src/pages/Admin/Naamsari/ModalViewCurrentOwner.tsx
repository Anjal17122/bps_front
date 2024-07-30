import { Modal } from "antd";
import React from "react";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import { Land } from "../../../Services/ProjectService";
import { Image } from "antd";
import "../../../Assets/scss/NewNaamSari.scss";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  landNaamsari: Land | undefined;
  type: "owner" | "houseOwner";
  //   pId: sN;
  //   ownerId: sN;
}

const ModalViewCurrentOwner = ({
  isOpen,
  onCancel,
  landNaamsari,
  type,
}: //   pId,
//   ownerId,
Props) => {
  const Owner = landNaamsari?.[type];

  return (
    <Modal
      open={isOpen}
      width={800}
      footer={null}
      onCancel={() => onCancel()}
      title={false}
      centered={true}
    >
      <div className="OldDetails">
        {landNaamsari ? (
          <div>
            <h2>{type === "owner" ? "Land" : "Home"} Details:</h2>
            {/* <div className="idDetails">
              Project Id: <b>{pId}</b>
              &nbsp;&nbsp;&nbsp; {type === "owner" ? "Land" : "Home"} Id:{" "}
              <b>{ownerId}</b>
            </div> */}
            <div className="landownerdiv">
              <div>
                <Image
                  width={200}
                  src={
                    IMG_GET_URL +
                    `/${imgFolders.person}/` +
                    Owner?.photoFileName
                  }
                />
              </div>
              <div className="textContent">
                <div>
                  <div>
                    <b>Name: </b> {Owner?.nameEng}
                  </div>
                  <div>
                    <b>Phone: </b> {Owner?.primaryPhone}
                  </div>
                  <div>
                    <b>Citizenship No: </b> {Owner?.citizenshipNo}
                  </div>
                  <div>
                    <b>View Citizenship: </b>
                    <div>
                      <Image
                        width={80}
                        src={
                          IMG_GET_URL +
                          `/${imgFolders.citizenship}/` +
                          Owner?.citizenshipFileName
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <b>Gender: </b> {Owner?.gender}
                  </div>
                  <div>
                    <b>Father name: </b> {Owner?.fatherNameEng}
                  </div>
                  <div>
                    <b>Grand Father name: </b> {Owner?.grandfatherNameEng}
                  </div>
                </div>
                <div>
                  <div>
                    <b>नाम: </b> {Owner?.nameNep}
                  </div>
                  <div>
                    <b>Email: </b> {Owner?.email}
                  </div>
                  <div>
                    <b>Citizenship Issue Date: </b> {Owner?.citizenIssueDate}
                  </div>
                  <div>
                    <b>Citizenship Issue District: </b>{" "}
                    {Owner?.citizenIssueDist}
                  </div>
                  <div>
                    <b>Marital Status: </b> {Owner?.maritalStatus}
                  </div>
                  <div>
                    <b>बुवाको नाम: </b> {Owner?.fatherNameNep}
                  </div>
                  <div>
                    <b>हजुर बुवाको नाम: </b> {Owner?.grandfatherNameNep}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default ModalViewCurrentOwner;
