import React, { useState } from "react";
import { EyeTwoTone } from "@ant-design/icons";
import ImagePopup from "../../../../../../Common/ImagePopup/ImagePopup";
import { imgFolders, IMG_GET_URL } from "../../../../../../Services/Api";
import { LandsWithOwner } from "../../../../../../Services/CreateProjectService";
// import MyAvatar from "../../../../Common/Avatar/Avatar";
// import TableButton from "../../../../Common/TableButton/TableButton";
// import { LandsWithOwner } from "../../../../Services/CreateProjectService";
// import ImagePopup from "../../../../Common/ImagePopup/ImagePopup";
// import { BASE_URL } from "../../../../Services/Api";
// import EditDiv from "../../../../Common/EditDiv/EditDiv";
interface Props {
  data: LandsWithOwner;
  // key: string | number;
}

const LandOwnerCard = ({ data }: Props) => {
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");

  function onViewCitizenS(imgsrc: string) {
    setImgsrc(IMG_GET_URL + `/${imgFolders.citizenship}/` + imgsrc);
    setModal(true);
  }
  function onViewPhoto(imgsrc: string) {
    setImgsrc(IMG_GET_URL + `/${imgFolders.person}/` + imgsrc);
    setModal(true);
  }
  // const { dispatch } = useContext(MyStore);
  // function editAddressClick(address: getAddresses) {
  //   dispatch({ type: ActionType.setAddress, payload: address });
  // }
  return (
    <div
      // key={key}
      className="marginAll20 withShadow"
      style={{ background: "white" }}
    >
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => setModal(false)}
      />
      <div className="bluehead" style={{ padding: "5px 2%" }}>
        <h2>Kitta No: {data.landParcelNo}</h2>
        <div></div>
      </div>
      {data.owner ? (
        <div className="landownerdiv">
          <div>
            <p>
              <b>Name: </b> {data.owner.nameEng}
            </p>
            <p>
              <b>Phone: </b> {data.owner.primaryPhone}
            </p>
            <p>
              <b>Citizenship No: </b> {data.owner.citizenshipNo}
            </p>
            <p>
              <b>View Citizenship: </b>
              <span
                className="hoverOnPoint"
                onClick={() => onViewCitizenS(data.owner.citizenshipFileName)}
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </span>
            </p>
            <p>
              <b>Gender: </b> {data.owner.gender}
            </p>
            <p>
              <b>Father name: </b> {data.owner.fatherNameEng}
            </p>
            <p>
              <b>Grand Father name: </b> {data.owner.grandfatherNameEng}
            </p>
          </div>
          <div className="EditAddDiv">
            <p>
              <b>नाम: </b> {data.owner.nameNep}
            </p>
            <p>
              <b>Email: </b> {data.owner.email}
            </p>
            <p>
              <b>Citizenship Issue Date: </b> {data.owner.citizenIssueDate}
            </p>
            <p>
              <b>Citizenship Issue District: </b> {data.owner.citizenIssueDist}
            </p>
            <p>
              <b>Marital Status: </b> {data.owner.maritalStatus}
            </p>
            <p>
              <b>बुवाको नाम: </b> {data.owner.fatherNameNep}
            </p>
            <p>
              <b>हजुर बुवाको नाम: </b> {data.owner.grandfatherNameNep}
            </p>
          </div>
          {data.owner.address
            ? data.owner.address.map((add, i) => (
                <div key={add.id}>
                  <div className="addressdiv EditAddDiv">
                    <h4>{i === 0 ? "Permanent" : "Temporary"} Address:</h4>
                    <p>
                      <b>Province: </b> {add.province.name}
                    </p>
                    <p>
                      <b>District: </b> {add.district.name}
                    </p>
                    <p>
                      <b>Municipality: </b> {add.municipality.name}
                    </p>
                    <p>
                      <b>Ward: </b> {add.ward.name}
                    </p>
                    <p>
                      <b>Tole: </b> {add.toleEng}
                    </p>
                  </div>
                </div>
              ))
            : null}
          <div
            className="hoverOnPoint"
            onClick={() => onViewPhoto(data.owner.photoFileName)}
          >
            {/* <MyAvatar
              src={BASE_URL + "/images/person/" + data.owner.photoFileName}
            /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LandOwnerCard;
