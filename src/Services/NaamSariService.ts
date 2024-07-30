import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { putWres } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const putNaamsariLand = (body: PUTnaamsariLand) =>
  putWres("/person/perma/owner", body);

export const getNaamsariLog = (id: sN, messageApi: MessageInstance) =>
  MyApi.get<GETNaamsariLogRes>("/owner/history?id=" + id, messageApi);

export interface PUTnaamsariLand {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  nec?: string;
  necFileName?: string;
  personRole?: string;
  addresses: Address[];
  userStatus?: string;
}

interface Address {
  id: number;
  provinceId: number;
  districtId: number;
  municipalityId: number;
  wardId: number;
  type: string;
  toleNep: string;
  toleEng: string;
}

interface GETNaamsariLogRes {
  data: NaamsariLog[];
  message: string;
}

export interface NaamsariLog {
  id: number;
  owner: Owner;
  houseOwner?: Owner;
  updatedBy: UpdatedBy;
  land?: string;
  updatedAt: string;
}

interface UpdatedBy {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep?: string;
  grandfatherNameEng?: string;
  gender: string;
  maritalStatus: string;
  nec: string;
  necFileName: string;
  addresses: string[];
}

interface Owner {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  nec?: string;
  necFileName?: string;
  addresses: string[];
}
