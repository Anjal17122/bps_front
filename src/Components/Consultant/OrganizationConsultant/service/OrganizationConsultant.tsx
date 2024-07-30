import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../../../../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

export const saveOrgConsultantPerma = (
  body: any,
  messageApi: MessageInstance
) => MyApi.post("/org/consultant/save-perma", body, messageApi);

export const saveOrgConsultantNonPerma = (
  body: any,
  messageApi: MessageInstance
) => MyApi.post("/org/consultant/save-non-perma", body, messageApi);

export const approveNonPerma = (
  id: number,
  consultantId: number,
  messageApi: MessageInstance
) =>
  MyApi.post(
    `/org/consultant/approve-non-perma?id=${id}&consultantId=${consultantId}`,
    null,
    messageApi
  );

export const approvePerma = (
  id: number,
  consultantId: number,
  messageApi: MessageInstance
) =>
  MyApi.post(
    `/org/consultant/approve-perma?id=${id}&consultantId=${consultantId}`,
    null,
    messageApi
  );

export const getRequested = (messageApi: MessageInstance) =>
  MyApi.get<GetOrgConsultantList>("/org/consultant/requested", messageApi);

export const getByStatus = (
  status: OrgConsultantStatus,
  messageApi: MessageInstance
) =>
  MyApi.get<GetOrgConsultantList>(
    `/org/consultant/by-status/${status}`,
    messageApi
  );

export interface Consultant {
  id: number;
  name: string;
  phoneNo: string;
  gender: string;
  citizenshipNo: string;
}
export type OrgConsultantStatus = "requested" | "unapproved" | "approved";

export interface OrgConsultantBody {
  id: number;
  consultant: Consultant;
  status: OrgConsultantStatus;
  consultantId: number;
  organizationId: number;
}

export interface GetOrgConsultant {
  data: OrgConsultantBody;
  message: string;
}

export interface GetOrgConsultantList {
  data: OrgConsultantBody[];
  message: string;
}
