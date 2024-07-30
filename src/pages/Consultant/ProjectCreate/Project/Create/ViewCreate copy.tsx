import React from "react";
import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import ConProjectFooter from "../../../../../Components/Consultant/Footers/ConProjectFooter";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import ViewProjectOnlyDiv from "./ViewProjectOnlyDiv";

const ViewProject = ({ oldData = true }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div className="ViewCreate">
      {localStorage.getItem("isPerma") === "true" ? (
        <ConProjectFooter pid={params.pid ?? "0"} />
      ) : null}
      <StepsHeader
        step="Step 1: "
        id={params.pid ?? "0"}
        title="Project Details"
        prev={null}
        next={`/project/create/applicant/${params.pid ?? "0"}`}
      />

      <ViewProjectOnlyDiv />
    </div>
  );
};

export default ViewProject;

export const switchUrl = (url: string, toUrl: string) =>
  localStorage.getItem("isPerma") === "true" ? toUrl : url;

export const checkIfNotice = (url: string, toUrl: string) =>
  localStorage.getItem("isNotice") === "true" ? toUrl : url;

export const switchIfNoticeAndPerma = (url: string, toUrl: string) =>
  localStorage.getItem("isNotice") === "true" &&
  localStorage.getItem("isPerma") === "true"
    ? toUrl
    : url;
export const checkIfNoticeAndPerma = (): boolean =>
  localStorage.getItem("isNotice") === "true" &&
  localStorage.getItem("isPerma") === "true"
    ? true
    : false;

export const switchBody = (body: any, toBody: any) =>
  localStorage.getItem("isPerma") === "true" ? toBody : body;
