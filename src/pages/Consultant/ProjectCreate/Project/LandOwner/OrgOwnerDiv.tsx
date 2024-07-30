import { EyeTwoTone } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import EditDiv from "../../../../../Common/EditDiv/EditDiv";
import MyAvatar from "../../../../../Components/Common/Avatar/Avatar";
import { PDF_URL, imgFolders, IMG_GET_URL } from "../../../../../Services/Api";
import { Owner2 } from "../../../../../Services/CreateProjectService";
import { checkIfPDF } from "../LandInfo/LandCard";

type Props = {
  landowner: Owner2;
  onViewCitizenS: (name: string) => void;
  editAddressClick: (name: any) => void;
  onViewPhoto: (name: string) => void;
};

const OrgOwnerDiv = ({
  landowner,
  onViewCitizenS,
  editAddressClick,
  onViewPhoto,
}: Props) => {
  return (
    <div>
      <h4>Organization Details:</h4>
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
                <EyeTwoTone style={{ fontSize: 14 }} />
              </a>
            ) : (
              <span
                className="hoverOnPoint"
                onClick={() =>
                  onViewCitizenS(landowner.owner?.citizenshipFileName || "")
                }
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </span>
            )}
          </p>
        </div>
        <div className="EditAddDiv" style={{ paddingRight: 30 }}>
          <div className="EditDiv">
            <Link to={"/org/edit/" + landowner.owner?.id}>
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
            <b>Phone: </b> {landowner.owner?.primaryPhone}
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
    </div>
  );
};

export default OrgOwnerDiv;
