import React from "react";
import { LogoContainer } from "../../../Common/HomeNav/LogoContainer";
import AddAdmin from "../../SuperAdmin/AddAdmin/AddAdmin";
import NepalFlag from "../../../Assets/gif/flag.webp";

const RegisterAdmin = () => {
  return (
    <div>
      <div className="NavBarMain">
        <div className="flexcontainer">
          <LogoContainer text={"Register Admin"} />

          <div className="NavBarLinks">
            <div className="flag" style={{ paddingLeft: "20px" }}>
              <img src={NepalFlag} alt="" height="30px" width="auto" />
            </div>
          </div>
        </div>
      </div>
      <AddAdmin url="/person/perma/admin/unapproved" />
    </div>
  );
};

export default RegisterAdmin;
