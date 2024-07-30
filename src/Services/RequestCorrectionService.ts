import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get } from "./Api";
import { setSTyp } from "./CreateProjectService";

export interface POSTreqCorrectionBody {
  type: "Plinth" | "Superstructure";
  message: string;
  projectPerma: number;
}

export const POSTrequestCorrection = (
  body: POSTreqCorrectionBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<POSTrequestCorrectionBody, POSTreqCorrectionBody>(
    "/supervision",
    body,
    messageApi
  );

interface ResPOSTrequestCorrection {
  data: POSTrequestCorrectionBody;
  message: string;
}

export interface POSTrequestCorrectionBody {
  id: number;
  type: "Plinth" | "Superstructure";
  message: string;
  entryBy: number;
  entryDate: string;
  projectPerma: number;
}

export const GETrequestCorrectionByPid = (id: string) =>
  get<ResGETrequestCorrectionByPid>("/supervision/project/" + id);

interface ResGETrequestCorrectionByPid {
  data: ReqCorrectionByPidBody[];
  message: string;
}

export interface ReqCorrectionByPidBody {
  id: number;
  type: "Plinth" | "Superstructure";
  message: string;
  entryBy: number;
  entryDate: string;
  projectPerma: number;
}
