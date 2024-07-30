import { MessageInstance } from "antd/es/message/interface";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { BASE_URL, get } from "./Api";
import { sN } from "./ProjectService";

const MyApi = new ApiService(BASE_URL);

export const DelAutocadFile = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/autocad/file/id/" + id, messageApi);

export const DelAutocadFileFinal = (id: sN, messageApi: MessageInstance) =>
  MyApi.delNoRes("/autocad/file/id/" + id, messageApi);

export const POSTautocadFinal = (
  body: POSTautocadBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<ResPostAutocadT, POSTautocadBody>(
    "/autocad/file",
    body,
    messageApi
  );

export const POSTautocad = (
  body: POSTautocadBody,
  messageApi: MessageInstance
) =>
  MyApi.postWres<AutocadFilesBody, POSTautocadBody>(
    "/autocad/file",
    body,
    messageApi
  );

export const AutocadChangeStatus = (
  id: sN,
  status: AutocadStatus,
  messageApi: MessageInstance
) => MyApi.get(`/autocad/file/status/?id=${id}&status=${status}`, messageApi);

type AutocadStatus =
  | "Unchecked"
  | "Checked"
  | "Resubmit"
  | "Correction_request";

export interface POSTautocadBody {
  fileTypeId: sN;
  filename: string;
  projectId: sN;
  removeStatus: AutocadStatus;
  status: "Unchecked" | "Checked" | "Resubmit" | "Correction_request";
}

export const GetAutocadTypes = () => get<ResGetAutocadT>("/autocad/type");

export const GetAutocadFiles = (id: sN) =>
  get<ResGetAutocadF>("/autocad/file/project/" + id);

interface ResPostAutocadT {
  data: AutocadFilesBody;
  message: string;
}

interface ResGetAutocadT {
  data: AutocadFileTBody[];
  message: string;
}

export interface AutocadFileTBody {
  id: number;
  name: string;
}

interface ResGetAutocadF {
  data: AutocadFilesBody[];
  message: string;
}

export interface AutocadFilesBody {
  id: number;
  projectId: number;
  filename: string;
  fileTypeId: number;
  status: AutocadStatus;
  entryBy: number;
  entryDateTime: string;
  removeStatus: AutocadStatus;
}
