import React from "react";
import { useParams } from "react-router-dom";
import StepsHeader from "../../../../Common/Headers/StepsHeader";
import NoticeHeader from "../../../../Components/Consultant/NoticeHeader/NoticeHeader";
import ViewApplicantDiv from "./ViewApplicantDiv";

const ViewApplicant = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div>
      <StepsHeader
        id={params.pid ?? "0"}
        title="Applicant Information"
        step="Step 2: "
        prev={`/project/view/project/${params.pid}`}
        next={`/project/create/landinfo/${params.pid}`}
      />

      <ViewApplicantDiv />
    </div>
  );
};

export default ViewApplicant;
