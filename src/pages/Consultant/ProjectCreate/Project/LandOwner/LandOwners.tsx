import React from "react";
import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import "../../../../../Assets/scss/Project.scss";

import { ProjectType } from "../../SelectProjectType";
import LandOwnersDiv from "./LandOwnersDiv";

const LandOwners = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();
  // const nextLink =
  //   localStorage.getItem("showBothBtns") === "true"
  //     ? `/project/edit/designfloor/${params.pid}`
  //     : undefined;
  const nextLinkNotice =
    localStorage.getItem("showBothBtns") === "true"
      ? `/project/edit/designfloor/${params.pid}/${params.tempId}`
      : undefined;
  const checkStorey =
    localStorage.getItem("ProjectType") === ProjectType.e
      ? `/project/create/storey/designfloor/${params.pid}`
      : `/project/edit/designfloor/${params.pid}`;
  return (
    <div style={{ paddingBottom: 20 }}>
      <StepsHeader
        id={params.pid ?? "0"}
        step="Step 5: "
        title="Land Owners Information"
        prev={`/project/create/charkilla/${params.pid ?? "0"}`}
        next={checkStorey}
      />
      <LandOwnersDiv />
    </div>
  );
};

export default LandOwners;
