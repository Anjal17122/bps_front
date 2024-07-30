import React from "react";
import { useParams } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import BuildingByLawsDiv from "./BuildingByLawsDiv";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConByLawsFooter from "../../../../../Components/Consultant/Footers/ConByLawsFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

const BuildingByLaws = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();
  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConByLawsFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        step="Step 7: "
        title="By Laws"
        prev={`/project/edit/designfloor/${params.pid}`}
        next={`/project/create/architectural/${params.pid}`}
      />
      <BuildingByLawsDiv />
    </div>
  );
};

export function checkIfFilled(test: boolean) {
  if (test) {
    return <CheckCircleFilled style={{ color: "#52c41a" }} />;
  } else {
    return null;
  }
}
export default BuildingByLaws;

export const getPerma = () => localStorage.getItem("isPerma");
