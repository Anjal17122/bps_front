import React from "react";
import { Link } from "react-router-dom";
import { LogoContainer } from "../../../../Common/HomeNav/LogoContainer";
import NepalFlag from "../../../../Assets/gif/flag.webp";

const CommonHeader = () => {
  let HeaderTitle = "";
  const role = localStorage.getItem("role");
  if (role === "ROLE_Ward") {
    HeaderTitle = "Ward Department";
  } else if (role === "ROLE_Registration") {
    HeaderTitle = "Registration Department";
  } else if (role === "ROLE_Technical_Department") {
    HeaderTitle = "Technical Committee";
  } else if (role === "ROLE_Engineer") {
    HeaderTitle = "Engineer Department";
  } else if (role === "ROLE_Executive") {
    HeaderTitle = "Executive Department";
  } else if (role === "ROLE_Revenue") {
    HeaderTitle = "Revenue Department";
  } else if (role === "ROLE_Napi") {
    HeaderTitle = "Napi Department";
  } else if (role === "ROLE_Consultant") {
    HeaderTitle = "Consultant";
  } else if (role === "ROLE_Sub_Engineer") {
    HeaderTitle = "Sub Engineer";
  } else if (role === "ROLE_Asst_Sub_Engineer") {
    HeaderTitle = "Asst Sub Engineer";
  }

  const toUrl = () => {
    if (
      localStorage.getItem("role") === "ROLE_Technical" ||
      localStorage.getItem("role") === "ROLE_Ward" ||
      localStorage.getItem("role") === "ROLE_Executive"
    ) {
      return "/admin/adminpanel/technical";
    } else if (localStorage.getItem("role") === "ROLE_Consultant") {
      return "";
    } else {
      return "/admin/adminpanel/ondesk";
    }
  };

  return (
    <div className="NavBarMain">
      <div className="flexcontainer">
        <Link style={{ textDecoration: "none" }} to={toUrl()}>
          <LogoContainer text={HeaderTitle} />
        </Link>
        <div className="NavBarLinks">
          <div className="flag" style={{ paddingLeft: "20px" }}>
            <img src={NepalFlag} alt="" height="30px" width="auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
