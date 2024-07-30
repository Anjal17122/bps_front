import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { get, getWLoad } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const GetForwardedReceiver = () =>
  get<ResGetForwardedReceiver>("/global/current/role");
export const GetFinalApprover = () =>
  get<ResGetForwardedReceiver>("/person/role/current/final/aproval");

interface ResGetForwardedReceiver {
  data: ForwardedReceiver;
  message: string;
}

export interface ForwardedReceiver {
  id: number;
  name: string;
  mandatoryApproval: boolean;
  active: boolean;
}

export const ChangeProjectReceiver = (id: sN, messageApi: MessageInstance) =>
  MyApi.get("/global/update/role/" + id, messageApi);

export const ChangeFinalApprover = (id: sN, messageApi: MessageInstance) =>
  MyApi.get("/person/role/final/approval/" + id, messageApi);

export const GetTransferSetting = () =>
  get<ResGetTransferSetting>("/person/role");

interface ResGetTransferSetting {
  data: GetTransferSettingBody[];
  message: string;
}

export interface GetTransferSettingBody {
  id: number;
  name: string;
  mandatoryApproval: boolean;
  active: boolean;
}

export const PATCHForwardedReceiver = (id: sN, setsub: setSTyp) =>
  getWLoad("/global/update/role/" + id, setsub);

export const PATCHMandatoryApprovals = (id: sN, messageApi: MessageInstance) =>
  MyApi.get("/person/role/mandatory/" + id, messageApi);

export const PATCHTransferSetting = (id: sN, messageApi: MessageInstance) =>
  MyApi.get("/person/role/" + id, messageApi);
