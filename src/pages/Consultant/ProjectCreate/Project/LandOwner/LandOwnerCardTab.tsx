import React from "react";
import { Link } from "react-router-dom";
import { EyeTwoTone } from "@ant-design/icons";
import EditDiv from "../../../../../Common/EditDiv/EditDiv";
import MyAvatar from "../../../../../Components/Common/Avatar/Avatar";
import { IMG_GET_URL, PDF_URL, imgFolders } from "../../../../../Services/Api";
import OrgOwnerDiv from "./OrgOwnerDiv";
import { checkIfPDF } from "../LandInfo/LandCard";
import { Owner2 } from "../../../../../Services/CreateProjectService";
import { getAddresses } from "../../../../../Services/UserService";

type Props = {
  landowner: Owner2;
  onViewPhoto: (imgsrc: string) => void;
  onViewCitizenS: (imgsrc: string) => void;
  editAddressClick: (address: getAddresses) => void;
};

export function LandOwnerCardTab({
  landowner,
  onViewPhoto,
  onViewCitizenS,
  editAddressClick,
}: Props) {
  return (
    <div>
      {landowner.type === "organization" ? (
        <OrgOwnerDiv
          landowner={landowner}
          onViewPhoto={onViewPhoto}
          onViewCitizenS={onViewCitizenS}
          editAddressClick={editAddressClick}
        />
      ) : (
        <div className="landownerdiv">
          <div>
            <p>
              <b>Name: </b> {landowner.owner?.nameEng}
            </p>
            <p>
              <b>Phone: </b> {landowner.owner?.primaryPhone}
            </p>
            <p>
              <b>Citizenship No: </b> {landowner.owner?.citizenshipNo}
            </p>
            <p>
              <b>View Citizenship: </b>
              {checkIfPDF(landowner.owner?.citizenshipFileName || "") ? (
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={
                    PDF_URL +
                    `/${imgFolders.citizenship}/` +
                    landowner.owner?.citizenshipFileName
                  }
                >
                  <EyeTwoTone
                    style={{
                      fontSize: 14,
                    }}
                  />
                </a>
              ) : (
                <span
                  className="hoverOnPoint"
                  onClick={() =>
                    onViewCitizenS(landowner.owner?.citizenshipFileName || "")
                  }
                >
                  <EyeTwoTone
                    style={{
                      fontSize: 18,
                    }}
                  />
                </span>
              )}
            </p>
            <p>
              <b>Gender: </b> {landowner.owner?.gender}
            </p>
            <p>
              <b>Father name: </b> {landowner.owner?.fatherNameEng}
            </p>
            <p>
              <b>Grand Father name: </b> {landowner.owner?.grandfatherNameEng}
            </p>
          </div>
          <div className="EditAddDiv">
            <div className="EditDiv">
              <Link to={"/user/edit/" + landowner.owner?.id}>
                <button className="NoStyleBtnSm">Edit</button>
              </Link>
            </div>
            <p>
              <b>नाम: </b> {landowner.owner?.nameNep}
            </p>
            <p>
              <b>Email: </b> {landowner.owner?.email}
            </p>
            <p>
              <b>Citizenship Issue Date: </b>{" "}
              {landowner.owner?.citizenIssueDate}
            </p>
            <p>
              <b>Citizenship Issue District: </b>{" "}
              {landowner.owner?.citizenIssueDist}
            </p>
            <p>
              <b>Marital Status: </b> {landowner.owner?.maritalStatus}
            </p>
            <p>
              <b>बुवाको नाम: </b> {landowner.owner?.fatherNameNep}
            </p>
            <p>
              <b>हजुर बुवाको नाम: </b> {landowner.owner?.grandfatherNameNep}
            </p>
          </div>
          {landowner.owner?.address
            ? landowner.owner?.address.map((add: any, index: number) => (
                <div key={add.id}>
                  <div className="addressdiv EditAddDiv">
                    <EditDiv
                      onClick={() => editAddressClick(add)}
                      url={`/address/edit/${landowner.owner?.id}/${add.id}/${
                        add.type === "PERMANENT" ? "0" : "1"
                      }`}
                    />
                    <h4>{index === 0 ? "Permanent" : "Temporary"} Address:</h4>
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
          {checkIfPDF(landowner.owner?.photoFileName || "") ? (
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={
                PDF_URL +
                `/${imgFolders.person}/` +
                landowner.owner?.photoFileName
              }
            >
              LandOwner Photo
            </a>
          ) : (
            <div
              className="hoverOnPoint"
              onClick={() => onViewPhoto(landowner.owner?.photoFileName || "")}
            >
              <MyAvatar
                src={
                  IMG_GET_URL +
                  `/${imgFolders.person}/` +
                  landowner.owner?.photoFileName
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
