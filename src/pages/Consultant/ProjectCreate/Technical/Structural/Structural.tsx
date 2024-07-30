import React from "react";
import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConStructuralFooter from "../../../../../Components/Consultant/Footers/ConStructuralFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import StructuralDiv from "./StructuralDiv";

const Structural = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();
  return (
    <div>
      {localStorage.getItem("isPerma") === "true" ? (
        <ConStructuralFooter pid={params.pid ?? ""} />
      ) : null}

      <StepsHeader
        id={params.pid ?? ""}
        step="Step 9: "
        title="Structural"
        prev={`/project/create/architectural/${params.pid}`}
        next={`/project/create/electrical/${params.pid}`}
      />

      <StructuralDiv />
    </div>
  );
};

export default Structural;
