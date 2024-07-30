import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { checkIfPDF } from "../../../pages/Consultant/ProjectCreate/Project/LandInfo/LandCard";

interface Props {
  src?: string;
  onClick?: () => void;
}

const MyAvatar = ({ src, onClick }: Props) => {
  return (
    <div className="myAvatar" onClick={onClick}>
      {checkIfPDF(src ?? "") ? (
        <p style={{ fontSize: 12 }}>
          ..
          {src?.substring(src?.length - 12)}{" "}
          <CheckCircleFilled style={{ color: "#52c41a" }} />
        </p>
      ) : (
        <img width="100px" height="100px" src={src} alt="" />
      )}
    </div>
  );
};

export default MyAvatar;
