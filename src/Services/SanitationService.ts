import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get, putWres } from "./Api";
import { sN } from "./ProjectService";

export const getSanitation = (id: sN, url = "/sanitation/project?id=") =>
  get<SanitationGet>(url + id);

export const postSanitation = (
  body: SanitationPost,
  messageApi: MessageInstance
) =>
  MyApi.postWres<SanitationPost, SanitationPost>(
    "/sanitation",
    body,
    messageApi
  );

export const putSanitation = (body: PUTSanitation, url = "/sanitation") =>
  putWres<SanitationGet>(url, body);

export interface SanitationType {
  id?: number;
  capacity: string;
  capacityRemark: string;
  waterCap: string;
  waterCapRemark: string;
  waterPerDay: string;
  waterPerDayRemark: string;
}
export interface PUTSanitation extends SanitationPost {
  id: sN;
}
export interface SanitationPost {
  projectId: sN;
  underWaterTank: string;
}

export interface SanitationGet {
  data: SanitationPost;
  message: string;
}
