import React from "react";
import { Link } from "react-router-dom";
import TableButton from "../../../../Common/TableButton/TableButton";

const GoBackToProjects = () => {
  return (
    <div className="NotFound flexCenter" style={{ backgroundColor: "white" }}>
      <div style={{ paddingRight: 20 }}>Project Not Found! </div>
      <Link to={"/admin/adminpanel"}>
        <TableButton bgColor="green">Go Back</TableButton>
      </Link>
    </div>
  );
};

export default GoBackToProjects;
